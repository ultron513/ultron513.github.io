"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { EASE_OUT } from "@/lib/motion";

const KEY = "mission-control-booted";
const CHECKS = ["Navigation", "Telemetry", "Comms"];

/**
 * 600 ms "systems check" (spec §4): once per session, skippable with any key, never blocks content.
 * It is a small corner readout rather than a full-screen loader, so the page is usable underneath.
 */
export function BootSequence() {
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const [step, setStep] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
      sessionStorage.setItem(KEY, "1");
    } catch {}
    if (seen || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("done");
      return;
    }
    setState("running");
    const timers = CHECKS.map((_, i) => window.setTimeout(() => setStep(i + 1), 150 * (i + 1)));
    timers.push(window.setTimeout(() => setState("done"), 900));
    const skip = () => setState("done");
    window.addEventListener("keydown", skip, { once: true });
    return () => {
      timers.forEach(window.clearTimeout);
      window.removeEventListener("keydown", skip);
    };
  }, []);

  if (state !== "running") return null;

  return (
    <motion.div
      aria-hidden="true"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: EASE_OUT }}
      className="glass pointer-events-none fixed bottom-4 left-4 z-[60] rounded-sm px-4 py-3 font-mono text-xs text-muted"
    >
      <p className="text-ink">Systems check</p>
      <ul className="mt-1.5 space-y-0.5">
        {CHECKS.map((check, i) => (
          <li key={check} className="flex justify-between gap-6">
            <span>{check}</span>
            <span className={i < step ? "text-accent" : "text-faint"}>
              {i < step ? "ok" : "··"}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
