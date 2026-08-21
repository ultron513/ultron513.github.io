"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type RevealProps = {
  children?: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  delay?: number;
  duration?: number;
};

export function Reveal({
  children,
  className,
  id,
  style,
  delay = 0,
  duration = 0.8,
}: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <div
        className={className}
        id={id}
        style={style}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      id={id}
      style={style}
      initial={{
        opacity: 0,
        y: 18,
        clipPath: "inset(0 0 14% 0)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0 0 0% 0)",
      }}
      viewport={{
        once: true,
        amount: 0.15,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}