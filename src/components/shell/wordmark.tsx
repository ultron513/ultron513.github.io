import Link from "next/link";

import { profile } from "@/content";

/** Personal wordmark (spec open question 4): `ashish`, lowercase, Space Grotesk, with an orbit glyph. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link href="/" aria-label={`${profile.name}, home`} className={className}>
      <span className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink">
        <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5">
          <ellipse
            cx="10"
            cy="10"
            rx="8.5"
            ry="3.6"
            transform="rotate(-24 10 10)"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.45"
            strokeWidth="1.2"
          />
          <circle cx="10" cy="10" r="3.2" className="fill-accent" />
        </svg>
        {profile.wordmark}
      </span>
    </Link>
  );
}
