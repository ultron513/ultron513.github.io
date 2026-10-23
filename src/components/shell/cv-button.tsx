"use client";

import { cn } from "@/lib/utils";

import { useShell } from "./shell-context";

/** Opens the CV console overlay. Falls back to the /cv page link when rendered without JS. */
export function CvButton({
  className,
  children = "Get the CV",
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { openCv } = useShell();
  return (
    <a
      href="/cv/"
      onClick={(event) => {
        if (event.metaKey || event.ctrlKey || event.shiftKey) return;
        event.preventDefault();
        openCv();
      }}
      className={cn(className)}
    >
      {children}
    </a>
  );
}
