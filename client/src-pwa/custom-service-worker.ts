/*
 * This file (which will be your service worker)
 * is picked up by the build system ONLY if
 * quasar.config.js > pwa > workboxMode is set to "injectManifest"
 */
declare const self: ServiceWorkerGlobalScope & typeof globalThis & { skipWaiting: () => void }

import { clientsClaim } from 'workbox-core'
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'
import { CacheableResponsePlugin } from 'workbox-cacheable-response'

self.skipWaiting()
clientsClaim()

// Use with precache injection
precacheAndRoute(self.__WB_MANIFEST)

cleanupOutdatedCaches()

// Inspired by this tutorial: https://medium.com/simform-engineering/building-the-future-with-quasar-a-vue-js-framework-revolution-74b09723a91d

// Cache first, falling back to network
registerRoute(
  ({ url }) => url.host.startsWith('fonts.googleapi.com'),
  new CacheFirst({
    cacheName: 'google-fonts',
    plugins: [
      new ExpirationPlugin({
        maxEntries: 30,
      }),
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  }),
)

// Network first, falling back to cache
registerRoute(({ url }) => url.pathname.startsWith('/channels'), new NetworkFirst())

// Stale-while-revalidate
registerRoute(({ url }) => url.protocol === 'http:' || url.protocol === 'https:', new StaleWhileRevalidate())
