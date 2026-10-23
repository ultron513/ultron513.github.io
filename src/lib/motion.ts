"use client";

import { useEffect, useState } from "react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;
export const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const;

/**
 * True when the visitor asked for reduced motion.
 * Hydration-safe: always `false` on the server and on the first client render, then the real value
 * after mount. (Reading matchMedia during the first render would make the client HTML differ from
 * the prerendered HTML.)
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function webglAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Low-power fallback (spec §7): no WebGL, Save-Data on, or ≤ 4 CPU cores.
 * Returns `null` until measured on the client, so callers render nothing heavy during SSR.
 */
export function useLowPower(): boolean | null {
  const [lowPower, setLowPower] = useState<boolean | null>(null);
  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } })
      .connection;
    const cores = navigator.hardwareConcurrency ?? 8;
    setLowPower(!webglAvailable() || Boolean(connection?.saveData) || cores <= 4);
  }, []);
  return lowPower;
}
