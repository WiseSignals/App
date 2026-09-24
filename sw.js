// Minimal service worker — its only job is satisfying the browser's
// installability requirement (a registered SW with a fetch handler) for the
// "Install app" / "Add to Home Screen" prompts on desktop, Android and iOS.
// Deliberately does NOT cache anything: this app shows live prices, real
// account balances, and real-money order state, so a stale cached response
// here would be actively harmful, not just a minor inconvenience — every
// request is passed straight through to the network.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});
