"use client";

import { useRef } from "react";

import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Holographic pointer tilt with a moving sheen (spec §7). Mouse only; no tilt with reduced motion. */
export function TiltCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  function onMove(event: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || reduced || event.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${(0.5 - y) * 7}deg`);
    el.style.setProperty("--ry", `${(x - 0.5) * 9}deg`);
    el.style.setProperty("--sx", `${x * 100}%`);
    el.style.setProperty("--sy", `${y * 100}%`);
    el.style.setProperty("--sheen", "1");
  }

  function onLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--sheen", "0");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("[perspective:900px]", className)}
    >
      <div className="relative h-full transition-transform duration-200 ease-out [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] [transform-style:preserve-3d]">
        {children}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-[var(--sheen,0)] transition-opacity duration-300"
          style={{
            background:
              "radial-gradient(420px circle at var(--sx,50%) var(--sy,50%), var(--glow), transparent 45%)",
          }}
        />
      </div>
    </div>
  );
}
