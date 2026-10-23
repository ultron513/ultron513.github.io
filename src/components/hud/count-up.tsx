"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";

/**
 * Counts the leading number in `value` up from zero when it enters view ("1900+" -> 0…1900 + "+").
 * Values without a leading number render as they are. The final value is always in the DOM.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduced = usePrefersReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (!match || !inView || reduced) return;
    const target = Number(match[1]);
    const suffix = match[2];
    const controls = animate(0, target, {
      duration: 1.1,
      ease: EASE_OUT,
      onUpdate: (v) => setShown(`${Math.round(v)}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, value]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="tabular-nums">
        {shown}
      </span>
    </span>
  );
}
