"use client";

import { useInView } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { getProject, type Experience } from "@/content";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Campus space: the lecture hall (spec §5). A chalkboard writes a few lines of Python by stroke
 * animation; a tiered hall of 100 seats fills up to "100+ students" (the only figure the CV states);
 * the bullets appear as course-catalogue cards. Generic campus feel: no seal, tree, cardinal red or Karel.
 */

const CODE = [
  "def main():",
  '    print("Hello, section!")',
  "",
  'if __name__ == "__main__":',
  "    main()",
];
/** Seats per row, front to back. Sums to 100. */
const ROWS = [8, 10, 11, 12, 13, 14, 15, 17];

function Chalkboard() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = usePrefersReducedMotion();
  const drawn = reduced || inView;
  return (
    <div className="rounded-md border-[6px] border-line-strong bg-bg p-5 sm:p-7">
      <svg
        ref={ref}
        viewBox="0 0 520 170"
        className="w-full"
        role="img"
        aria-label="Python on a chalkboard: def main(), print Hello, section!"
      >
        {CODE.map((line, i) => (
          <text
            key={i}
            x="8"
            y={30 + i * 32}
            fontFamily="var(--font-mono)"
            fontSize="22"
            fill={drawn ? "var(--text)" : "transparent"}
            stroke="var(--text)"
            strokeWidth="0.6"
            strokeDasharray="600"
            strokeDashoffset={drawn ? 0 : 600}
            style={{
              transition: reduced
                ? undefined
                : `stroke-dashoffset 1.1s ease-out ${i * 0.35}s, fill 0.6s ease-out ${i * 0.35 + 0.6}s`,
              whiteSpace: "pre",
            }}
          >
            {line}
          </text>
        ))}
        <path
          d="M8 162 C120 156 260 166 380 158"
          fill="none"
          stroke="var(--space-accent)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
      </svg>
    </div>
  );
}

function LectureHall() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = usePrefersReducedMotion();
  const [filled, setFilled] = useState(0);
  const total = ROWS.reduce((a, b) => a + b, 0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setFilled(total);
      return;
    }
    let n = 0;
    const timer = window.setInterval(() => {
      n += 2;
      setFilled(Math.min(total, n));
      if (n >= total) window.clearInterval(timer);
    }, 22);
    return () => window.clearInterval(timer);
  }, [inView, reduced, total]);

  // Tiered rows curving around the stage at the top; each row's arc is clamped to the frame width.
  const seats: { x: number; y: number; i: number }[] = [];
  let index = 0;
  ROWS.forEach((count, row) => {
    const radius = 310 + row * 24;
    const half = Math.asin((100 + row * 19) / radius);
    for (let s = 0; s < count; s++) {
      const theta = -half + (2 * half * s) / (count - 1);
      seats.push({
        x: 260 + Math.sin(theta) * radius,
        y: -250 + Math.cos(theta) * radius,
        i: index++,
      });
    }
  });

  return (
    <div ref={ref} className="rounded-md border border-line p-5 sm:p-6">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-lg text-ink">The section</h3>
        <p className="font-mono text-sm text-ink" aria-live="polite">
          <span className="text-space tabular-nums">{filled >= total ? "100+" : filled}</span>{" "}
          students
        </p>
      </div>
      <svg viewBox="0 0 520 270" className="mt-4 w-full" aria-hidden="true">
        <rect
          x="200"
          y="6"
          width="120"
          height="10"
          rx="3"
          fill="var(--space-accent)"
          opacity="0.8"
        />
        <text
          x="260"
          y="34"
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="11"
          fill="var(--text-faint)"
        >
          section leader
        </text>
        {seats.map((seat) => (
          <rect
            key={seat.i}
            x={seat.x - 6}
            y={seat.y - 5}
            width="12"
            height="10"
            rx="3"
            fill={seat.i < filled ? "var(--space-accent)" : "transparent"}
            stroke={seat.i < filled ? "var(--space-accent)" : "var(--border-strong)"}
            style={{ transition: "fill 200ms ease-out, stroke 200ms ease-out" }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function CampusSpace({ item }: { item: Experience }) {
  const dream = getProject("dream-decoder");
  const codes = ["CIP 2025, section leading", "CIP 2025, project work"];
  return (
    <section aria-label="Lecture hall" className="mx-auto max-w-6xl px-5">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Chalkboard />
        <LectureHall />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr_18rem]">
        {item.cvBullets.map((bullet, i) => (
          <article
            key={bullet}
            className="hud glass rounded-md p-6 shadow-depth"
            aria-hidden="true"
          >
            <p className="font-mono text-xs text-space">{codes[i] ?? "CIP 2025"}</p>
            <p className="mt-3 text-ink">{bullet}</p>
          </article>
        ))}
        {dream ? (
          <Link
            href={`/projects/${dream.slug}/`}
            className={cn(
              "group rounded-md border border-line p-6 transition-colors hover:border-space",
            )}
          >
            <p className="font-mono text-xs text-faint">Built during the course</p>
            <p className="mt-2 font-display text-xl text-ink group-hover:text-space">
              {dream.title}
            </p>
            <p className="mt-2 text-sm text-muted">{dream.description}</p>
          </Link>
        ) : null}
      </div>
    </section>
  );
}
