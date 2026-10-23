"use client";

import { useEffect, useState } from "react";

import { usePrefersReducedMotion } from "@/lib/motion";

/** Types each role out in turn (spec §4 hero HUD). The full list is always available to screen readers. */
export function RoleTicker({ roles }: { roles: string[] }) {
  const reduced = usePrefersReducedMotion();
  const total = roles.join("").length;
  const [typed, setTyped] = useState(total);

  useEffect(() => {
    if (reduced) return;
    setTyped(0);
    let count = 0;
    const timer = window.setInterval(() => {
      count += 1;
      setTyped(count);
      if (count >= total) window.clearInterval(timer);
    }, 28);
    return () => window.clearInterval(timer);
  }, [reduced, total]);

  let remaining = typed;
  return (
    <>
      <ul className="sr-only">
        {roles.map((role) => (
          <li key={role}>{role}</li>
        ))}
      </ul>
      <ul aria-hidden="true" className="space-y-1 font-mono text-xs text-muted sm:text-sm">
        {roles.map((role) => {
          const shown = role.slice(0, Math.max(0, remaining));
          const typing = remaining > 0 && remaining < role.length;
          remaining -= role.length;
          return (
            <li key={role} className="flex items-center gap-2">
              <span className="text-accent">›</span>
              <span className="min-h-[1.1rem]">
                {shown}
                {typing ? (
                  <span className="ml-px inline-block h-3.5 w-1.5 translate-y-0.5 bg-accent" />
                ) : null}
              </span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
