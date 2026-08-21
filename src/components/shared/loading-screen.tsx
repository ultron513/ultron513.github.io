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
      initial={{
        opacity: 1,
      }}
      animate={{
        opacity: 0,
      }}
      transition={{
        duration: 0.55,
        delay: 0.25,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="pointer-events-none fixed inset-0 z-[200] flex items-center justify-center bg-[#050505]"
      aria-hidden="true"
    >
      <div className="w-40 text-center">
        <p className="font-['Space_Grotesk'] text-sm font-medium tracking-[-0.02em] text-zinc-400">
          Ashish Patra
        </p>

        <div className="mt-5 h-px w-full overflow-hidden bg-white/[0.08]">
          <motion.div
            initial={{
              x: "-100%",
            }}
            animate={{
              x: "0%",
            }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full w-full bg-white/60"
          />
        </div>
      </div>
    </motion.div>
  );
}