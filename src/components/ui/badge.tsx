import * as React from "react";

import { cn } from "@/lib/utils";

type BadgeProps = React.HTMLAttributes<HTMLSpanElement> & {
  variant?: "default" | "outline";
};

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-full px-3 py-1.5 text-xs",
        variant === "default"
          ? "bg-white/[0.06] text-zinc-300"
          : "border border-white/10 text-zinc-500",
        className,
      )}
      {...props}
    />
  );
}