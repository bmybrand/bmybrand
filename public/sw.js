// Temporary self-unregistering service worker
// Purpose: when a browser still has an old registration it will request /sw.js.
// This worker immediately unregisters itself and clears caches so the browser
// stops requesting the file and the 404s disappear.

self.addEventListener('install', (event) => {
  self.skipWaiting()
  console.log('[sw.js] install - skipping waiting')
})

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    try {
      console.log('[sw.js] activate - unregistering...')
      // Unregister this service worker
      await self.registration.unregister()

      // Clear all caches created by previous workers
      if (typeof caches !== 'undefined') {
        const keys = await caches.keys()
        await Promise.all(keys.map((k) => caches.delete(k)))
        console.log('[sw.js] cleared caches:', keys)
      }

      // Claim clients so we can reload them if needed
      if (self.clients && self.clients.matchAll) {
        const all = await self.clients.matchAll({ includeUncontrolled: true })
        for (const client of all) {
          try {
            client.postMessage({ type: 'SW_UNREGISTERED' })
          } catch (e) {
            // ignore
          }
        }
      }

      console.log('[sw.js] unregistered and cleaned up')
    } catch (err) {
      console.error('[sw.js] error during activate:', err)
    }
  })())
})

// Also respond to fetch with network fallback so the request doesn't 404 noisily
self.addEventListener('fetch', (event) => {
  // let the default network handling happen; do nothing special
})
