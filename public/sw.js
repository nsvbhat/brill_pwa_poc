// Service Worker with Version Control and Cache Busting
let CACHE_VERSION = 'ambetter-v1.0.0';

// Fetch version from API on install
const fetchCacheVersion = () => {
  return fetch('/api/version')
    .then(res => res.json())
    .then(data => {
      CACHE_VERSION = data.version;
      console.log('📦 Cache version loaded:', CACHE_VERSION);
      return CACHE_VERSION;
    })
    .catch(err => {
      console.error('⚠️ Failed to fetch cache version:', err);
      return CACHE_VERSION; // Use fallback
    });
};

self.addEventListener('install', () => {
  console.log('✅ SW installing...');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('✅ SW activated');
  
  // Fetch latest version
  fetchCacheVersion().then((currentVersion) => {
    // Delete ALL old cache versions
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== currentVersion) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    });
  });
  
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network first strategy with cache fallback
  if (event.request.method !== 'GET') return;
  
  // For HTML files, always check network first (no cache)
  if (event.request.mode === 'navigate' || event.request.url.includes('.html')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Fallback if offline - serve from cache
        return caches.open(CACHE_VERSION).then((cache) => {
          return cache.match(event.request);
        });
      })
    );
    return;
  }
  
  // For other requests, network only
  event.respondWith(fetch(event.request));
});

// Periodic Sync - Background update checks (at regular intervals)
self.addEventListener('periodicsync', (event) => {
  console.log('🔄 Periodic Sync triggered:', event.tag);
  
  // Check for correct tag on the periodicsync event
  if (event.tag === 'update-check') {
    // Execute the desired behavior with waitUntil()
    event.waitUntil(
      fetch('/').then((response) => {
        console.log('✅ Periodic sync: App state checked');
        return response;
      }).catch((err) => {
        console.log('❌ Periodic sync failed:', err);
        throw err; // Retry later if failed
      })
    );
  }
});

// Background Sync - Retry failed requests when connection restored
self.addEventListener('sync', (event) => {
  console.log('🔄 Background Sync triggered:', event.tag);
  
  // Check for correct tag on the sync event
  if (event.tag === 'sync-health-data') {
    // Execute the desired behavior with waitUntil()
    event.waitUntil(
      fetch('/', { method: 'POST', body: JSON.stringify({ action: 'sync' }) })
        .then((response) => {
          console.log('✅ Background sync: Data synced successfully');
          return response;
        })
        .catch((err) => {
          console.log('❌ Background sync failed:', err);
          throw err; // Retry later if failed
        })
    );
  }
});

// Push Notifications - Handle incoming push events
self.addEventListener('push', (event) => {
  console.log('📢 Push notification received');
  
  let notificationData = {
    title: 'Ambetter Health',
    body: 'You have a new notification',
    icon: '/ambetter-logo-192.png',
    badge: '/ambetter-logo-192.png'
  };
  
  // Try to parse JSON from push event
  try {
    if (event.data) {
      notificationData = { ...notificationData, ...event.data.json() };
    }
  } catch (e) {
    console.log('⚠️ Failed to parse push data:', e);
  }
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, {
      body: notificationData.body,
      icon: notificationData.icon,
      badge: notificationData.badge,
      tag: notificationData.tag || 'ambetter-notification'
    })
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('👆 Notification clicked:', event.notification.tag);
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Check if app is already open
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      // Otherwise open new window
      if (clients.openWindow) {
        return clients.openWindow('/');
      }
    })
  );
});
