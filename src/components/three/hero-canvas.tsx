"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

import { useLowPower, usePrefersReducedMotion } from "@/lib/motion";
import { resolveColor } from "@/lib/resolve-color";
import { useTheme } from "@/lib/theme/theme-provider";
import { cn } from "@/lib/utils";

import type { SceneColors } from "./hero-scene";
import { StaticStarfield } from "./static-starfield";

// three.js loads only after first paint and never on low-power devices (spec §7).
const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

function readColors(): SceneColors {
  const star = resolveColor("--scene-star");
  const line = resolveColor("--scene-line");
  const planet = resolveColor("--scene-planet");
  const limb = resolveColor("--scene-limb");
  return {
    star: [star[0], star[1], star[2]],
    line,
    planet: [planet[0], planet[1], planet[2]],
    limb: [limb[0], limb[1], limb[2]],
  };
}

/**
 * Hero 3D layer: static starfield first (also the fallback), then the WebGL scene once the
 * browser is idle. Renders only while on screen and while the tab is visible.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const lowPower = useLowPower();
  const reduced = usePrefersReducedMotion();
  const { theme } = useTheme();
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [colors, setColors] = useState<SceneColors | null>(null);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    if (lowPower !== false) return;
    const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200));
    const handle = idle(() => setReady(true));
    return () => (window.cancelIdleCallback ?? window.clearTimeout)(handle as number);
  }, [lowPower]);

  useEffect(() => {
    setColors(readColors());
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setCompact(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let onScreen = true;
    const update = () => setVisible(onScreen && document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      update();
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", update);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

  const showScene = ready && colors && lowPower === false;
  const frameloop = reduced ? "demand" : visible ? "always" : "never";

  return (
    <div ref={ref} aria-hidden="true" className={cn("pointer-events-none", className)}>
      <StaticStarfield
        className={cn(
          "absolute inset-0 size-full transition-opacity duration-700",
          showScene ? "opacity-0" : "opacity-100",
        )}
      />
      {showScene ? (
        <div className="absolute inset-0 animate-[fade-in_900ms_ease-out_both]">
          <HeroScene
            colors={colors}
            day={theme === "light"}
            frameloop={frameloop}
            compact={compact}
          />
        </div>
      ) : null}
    </div>
  );
}
