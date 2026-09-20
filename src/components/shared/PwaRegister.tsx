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
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js", { scope: "/" })
        .then((reg) => {
          if (process.env.NODE_ENV === "development") {
            console.log("[PWA] Service Worker registered with scope:", reg.scope);
          }
        })
        .catch((err) => {
          console.warn("[PWA] Service Worker registration failed:", err);
        });
    }
  }, []);

  return null;
}
