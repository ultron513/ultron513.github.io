"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type TooltipProps = {
  content: React.ReactNode;
  children: React.ReactNode;
  side?: "top" | "bottom";
  className?: string;
};

export function Tooltip({
  content,
  children,
  side = "top",
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}

      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute left-1/2 z-50 w-max max-w-xs -translate-x-1/2 rounded-lg border border-white/10 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 shadow-xl transition-all duration-150",
          side === "top"
            ? "bottom-full mb-2"
            : "top-full mt-2",
          isVisible
            ? "translate-y-0 opacity-100"
            : side === "top"
              ? "translate-y-1 opacity-0"
              : "-translate-y-1 opacity-0",
          className,
        )}
      >
        {content}
      </span>
    </span>
  );
}