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

    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .catch((err) => {
        console.warn("[PWA] Service Worker registration failed:", err);
      });
  }, []);

  return null;
}
