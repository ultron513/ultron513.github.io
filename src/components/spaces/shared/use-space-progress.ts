"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/motion";

/**
 * Scroll progress (0–1) through a space's scrolling column, driven by native scroll (no scroll-jacking).
 * With reduced motion it is pinned at 1, so the space renders its final, settled state.
 */
export function useSpaceProgress<T extends HTMLElement>(
  offset:
    ["start center", "end center"] | ["start end", "end start"] | ["start end", "center center"] = [
    "start center",
    "end center",
  ],
) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset });
  const [progress, setProgress] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (value) => setProgress(value));
  return { ref, progress: reduced ? 1 : progress, reduced };
}
