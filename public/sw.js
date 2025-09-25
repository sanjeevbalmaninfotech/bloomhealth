// This is a minimal service worker for testing PWA
self.addEventListener('install', event => {
  console.log('Service Worker installed ✅');
});

self.addEventListener('activate', event => {
  console.log('Service Worker activated ✅');
});

self.addEventListener('fetch', event => {
  // For now, just try to fetch everything from the network
  event.respondWith(
    fetch(event.request).catch(() => {
      // If offline, return a simple fallback response
      return new Response("You are offline. Please try again later.");
    })
  );
});
