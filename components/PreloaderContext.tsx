"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

/** True once the GSAP preloader has finished and fired "preloaderDone" */
const PreloaderContext = createContext(false);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Always wait for the preloaderDone event on every page load
    const handler = () => setReady(true);
    window.addEventListener("preloaderDone", handler);
    return () => window.removeEventListener("preloaderDone", handler);
  }, []);

  return (
    <PreloaderContext.Provider value={ready}>
      {children}
    </PreloaderContext.Provider>
  );
}

export const usePreloaderReady = () => useContext(PreloaderContext);
