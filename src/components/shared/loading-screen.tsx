"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function LoadingScreen() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: 0,
        pointerEvents: "none",
      }}
      transition={{
        duration: 0.6,
        delay: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
      aria-hidden="true"
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-zinc-600">
          Ashish Patra
        </p>

        <div className="mx-auto mt-5 h-px w-24 overflow-hidden bg-white/10">
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: "0%" }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full w-full bg-white/70"
          />
        </div>
      </div>
    </motion.div>
  );
}