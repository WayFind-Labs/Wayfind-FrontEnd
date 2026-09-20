/// <reference lib="webworker" />

/**
 * Wayfind PWA Service Worker (Foundational)
 *
 * This service worker provides the foundational lifecycle events for PWA installability
 * and prepares the architecture for future offline caching and sync capabilities.
 */

const CACHE_NAME = "wayfind-cache-v1";
const PRECACHE_ASSETS = [
  "/",
  "/manifest.webmanifest",
  "/icons/icon-192.png",
  "/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        // Pre-cache core shell resources if available
        return cache.addAll(PRECACHE_ASSETS).catch((err) => {
          console.warn("[SW] Pre-caching non-critical asset error:", err);
        });
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => {
        return Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  // Only handle GET requests for navigation and same-origin assets
  if (event.request.method !== "GET") return;

  // Let browser handle standard fetch by default; offline caching strategy will be plugged in here
  event.respondWith(
    fetch(event.request).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      return new Response("Offline - Service temporarily unavailable", {
        status: 503,
        statusText: "Service Unavailable",
        headers: new Headers({ "Content-Type": "text/plain" })
      });
    })
  );
});
