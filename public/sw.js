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
  "/icons/android-chrome-192x192.png",
  "/icons/android-chrome-512x512.png",
  "/icons/WayFindAppLogoWidget.jpg"
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
  // Only handle GET requests for same-origin HTTP/HTTPS assets
  if (
    event.request.method !== "GET" ||
    !event.request.url.startsWith(self.location.origin) ||
    event.request.url.includes("/_next/webpack-hmr")
  ) {
    return;
  }

  event.respondWith(
    fetch(event.request).catch(async () => {
      const cached = await caches.match(event.request);
      if (cached) return cached;
      // If offline and request is HTML navigation, could return offline page
      return new Response("", { status: 408, statusText: "Request Timeout" });
    })
  );
});
