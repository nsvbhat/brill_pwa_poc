// Service Worker for Ambetter PWA
const CACHE_VERSION = 'ambetter-v1.0.0';
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html',
  '/ambetter-logo-new.png',
  '/favicon.ico',
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');
  
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) => {
      console.log('[SW] Caching static assets');
      return Promise.allSettled(
        STATIC_ASSETS.map((url) =>
          fetch(url)
            .then((response) => {
              if (response.ok) {
                return cache.put(url, response);
              }
            })
            .catch(() => {
              console.log('[SW] Could not cache', url);
            })
        )
      );
    })
  );
  
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_VERSION)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    })
  );
  
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (request.method !== 'GET') {
    return;
  }

  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(
    caches.match(request).then((response) => {
      if (response) {
        console.log('[SW] Serving from cache:', url.pathname);
        return response;
      }

      return fetch(request)
        .then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          
          if (
            url.pathname === '/' ||
            url.pathname.endsWith('.html') ||
            url.pathname.startsWith('/api/')
          ) {
            caches.open(CACHE_VERSION).then((cache) => {
              cache.put(request, responseToCache);
            });
          }

          return networkResponse;
        })
        .catch(() => {
          console.log('[SW] Network failed for:', url.pathname);
          
          if (request.headers.get('accept')?.includes('text/html')) {
            return caches.match('/offline.html').then((offlineResponse) => {
              return (
                offlineResponse ||
                new Response('You are offline', {
                  status: 503,
                  statusText: 'Service Unavailable',
                  headers: new Headers({
                    'Content-Type': 'text/plain',
                  }),
                })
              );
            });
          }
          
          return new Response('Network request failed', {
            status: 408,
            statusText: 'Request Timeout',
          });
        });
    })
  );
});

// Background sync event
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync event:', event.tag);
  
  if (event.tag === 'sync-health-data') {
    event.waitUntil(
      self.clients
        .matchAll()
        .then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'SYNC_DATA',
            });
          });
        })
    );
  }
});

// Periodic sync event
self.addEventListener('periodicsync', (event) => {
  console.log('[SW] Periodic sync event:', event.tag);
  
  if (event.tag === 'update-check') {
    event.waitUntil(
      fetch('/').then(() => {
        console.log('[SW] Periodic update check complete');
      }).catch((err) => {
        console.error('[SW] Periodic update check failed:', err);
      })
    );
  }
});

// Message event
self.addEventListener('message', (event) => {
  console.log('[SW] Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('[SW] Service worker script loaded');
