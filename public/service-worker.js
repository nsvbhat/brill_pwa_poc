// Ultra-minimal Service Worker
self.addEventListener('install', () => {
  console.log('✅ SW installed');
  self.skipWaiting();
});

self.addEventListener('activate', () => {
  console.log('✅ SW activated');
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Network only - no caching, no cloning
  if (event.request.method !== 'GET') return;
  event.respondWith(fetch(event.request));
});
