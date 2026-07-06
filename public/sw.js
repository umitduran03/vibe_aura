self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (e) => {
  // Passthrough: all requests go to the network as normal.
  // A real respondWith is required to avoid the Chrome "no-op handler" warning.
  e.respondWith(fetch(e.request));
});
