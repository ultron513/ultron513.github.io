"use client";

import type {
  CSSProperties,
  ReactNode,
} from "react";
import { motion, type Variants } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { STAGGER_ITEM } from "@/lib/animations";

type StaggerProps = {
  children?: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
  staggerDelay?: number;
};

export function Stagger({
  children,
  className,
  id,
  style,
  staggerDelay = 0.07,
}: StaggerProps) {
  const reducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reducedMotion
          ? 0
          : staggerDelay,
      },
    },
  };

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
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.12,
      }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children?: ReactNode;
  className?: string;
  id?: string;
  style?: CSSProperties;
};

export function StaggerItem({
  children,
  className,
  id,
  style,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      id={id}
      style={style}
      variants={STAGGER_ITEM}
    >
      {children}
    </motion.div>
  );
}