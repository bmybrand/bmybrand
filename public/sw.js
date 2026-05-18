// Lightweight service worker that immediately unregisters itself.
// This prevents repeated 404 requests for /sw.js without changing app behavior.

self.addEventListener('install', () => {
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys()
      await Promise.all(keys.map(k => caches.delete(k)))
    } catch (e) {
      // ignore
    }
    try {
      await self.registration.unregister()
    } catch (e) {
      // ignore
    }
  })())
})

// Keep fetch handler minimal to satisfy some browsers that expect a response.
self.addEventListener('fetch', (event) => {
  // noop: let network handle requests
})
