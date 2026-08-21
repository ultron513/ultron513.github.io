"use client";

import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";

type MagneticProps = {
  children: ReactNode;
  strength?: number;
  disabled?: boolean;
  className?: string;
};

export function Magnetic({
  children,
  strength = 0.18,
  disabled = false,
  className,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const reducedMotion = useReducedMotion();
  const isDisabled = disabled || reducedMotion;

  const handleMouseMove = (
    event: MouseEvent<HTMLDivElement>,
  ) => {
    if (isDisabled) {
      return;
    }

    const element = ref.current;

    if (!element) {
      return;
    }

    const bounds = element.getBoundingClientRect();

    const relativeX =
      event.clientX -
      bounds.left -
      bounds.width / 2;

    const relativeY =
      event.clientY -
      bounds.top -
      bounds.height / 2;

    setPosition({
      x: relativeX * strength,
      y: relativeY * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({
      x: 0,
      y: 0,
    });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={
        isDisabled
          ? {
              x: 0,
              y: 0,
            }
          : {
              x: position.x,
              y: position.y,
            }
      }
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 24,
        mass: 0.45,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}