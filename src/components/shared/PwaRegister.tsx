"use client";

import { useEffect } from "react";

/**
 * PwaRegister
 *
 * Silently registers the foundational service worker in the browser
 * if supported, enabling PWA installability and background capabilities.
 */
export function PwaRegister() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

    if (process.env.NODE_ENV === "production") {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .catch((err) => {
          console.warn("[PWA] Service Worker registration failed:", err);
        });
    } else {
      // In development, ensure existing service workers are cleaned up so HMR and dev reloads aren't intercepted
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  }, []);

  return null;
}
