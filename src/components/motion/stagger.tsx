"use client";

import {
  motion,
  type HTMLMotionProps,
  type Variants,
} from "framer-motion";

import { STAGGER_ITEM } from "@/lib/animations";

type StaggerProps = HTMLMotionProps<"div"> & {
  staggerDelay?: number;
};

export function Stagger({
  children,
  staggerDelay = 0.08,
  ...props
}: StaggerProps) {
  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.15,
      }}
      variants={containerVariants}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<"div">;

export function StaggerItem({
  children,
  ...props
}: StaggerItemProps) {
  return (
    <motion.div
      variants={STAGGER_ITEM}
      {...props}
    >
      {children}
    </motion.div>
  );
}