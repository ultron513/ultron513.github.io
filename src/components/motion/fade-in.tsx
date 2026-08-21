"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { FADE_IN_VARIANTS } from "@/lib/animations";

type FadeInProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export function FadeIn({
  children,
  delay = 0,
  ...props
}: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      variants={FADE_IN_VARIANTS}
      transition={{
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}