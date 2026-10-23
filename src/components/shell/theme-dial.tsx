"use client";

import { useTheme } from "@/lib/theme/theme-provider";
import { cn } from "@/lib/utils";

/**
 * Orbit dial theme toggle (spec §2): a small planet whose satellite swings between the
 * night side (Deep Space) and the day side (Daylight Orbit).
 */
export function ThemeDial({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "Daylight Orbit (light)" : "Deep Space (dark)";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next}`}
      className={cn(
        "group grid size-9 place-items-center rounded-full border border-line text-muted transition-colors hover:border-line-strong hover:text-ink",
        className,
      )}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5">
        <circle
          cx="12"
          cy="12"
          r="9.5"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.35"
          strokeDasharray="1.5 2.5"
        />
        <circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M12 7.5a4.5 4.5 0 0 1 0 9z"
          fill="currentColor"
          className={cn(
            "origin-center transition-transform duration-500",
            theme === "light" && "rotate-180",
          )}
        />
        <g
          className={cn(
            "origin-center transition-transform duration-500 ease-out",
            theme === "light" ? "rotate-0" : "rotate-180",
          )}
        >
          <circle cx="12" cy="2.5" r="2" className="fill-accent" />
        </g>
      </svg>
    </button>
  );
}
