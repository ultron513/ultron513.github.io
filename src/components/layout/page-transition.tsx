"use client";

import {
  AnimatePresence,
  motion,
} from "framer-motion";
import { usePathname } from "next/navigation";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type PageTransitionProps = {
  children: React.ReactNode;
};

export function PageTransition({
  children,
}: PageTransitionProps) {
  const pathname = usePathname();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          y: 8,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -8,
        }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}