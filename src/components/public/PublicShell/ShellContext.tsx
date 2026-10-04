"use client";

import { createContext, useContext, useState, useCallback } from "react";

/**
 * ShellContext allows child pages to signal layout preferences to the
 * PublicShell without prop-drilling through the Next.js layout boundary.
 */
interface ShellContextValue {
  contentClass: string;
  setContentClass: (cls: string) => void;
}

const ShellContext = createContext<ShellContextValue>({
  contentClass: "",
  setContentClass: () => {},
});

export function ShellProvider({ children }: { children: React.ReactNode }) {
  const [contentClass, setContentClassState] = useState("");
  const setContentClass = useCallback((cls: string) => setContentClassState(cls), []);

  return (
    <ShellContext.Provider value={{ contentClass, setContentClass }}>
      {children}
    </ShellContext.Provider>
  );
}

export function useShell() {
  return useContext(ShellContext);
}
