"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { REVEAL_VARIANTS } from "@/lib/animations";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function Reveal({
  children,
  delay = 0,
  ...props
}: RevealProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={REVEAL_VARIANTS}
      transition={{
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}