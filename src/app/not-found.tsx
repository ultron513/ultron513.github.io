import type { Metadata } from "next";
import Link from "next/link";

import { StaticStarfield } from "@/components/three/static-starfield";

export const metadata: Metadata = { title: "Signal lost", robots: { index: false } };

/** 404 (spec §3): drifting debris field with a route home. */
export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-[100svh] items-center overflow-hidden">
      <StaticStarfield className="absolute inset-0 -z-10 size-full" density={120} />
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {[
          { left: "12%", top: "22%", size: 18, rotate: 20, delay: "0s" },
          { left: "78%", top: "30%", size: 26, rotate: -35, delay: "-4s" },
          { left: "64%", top: "72%", size: 14, rotate: 60, delay: "-8s" },
          { left: "24%", top: "70%", size: 22, rotate: -10, delay: "-2s" },
        ].map((piece, i) => (
          <span
            key={i}
            className="absolute animate-[drift_14s_ease-in-out_infinite] border border-line-strong"
            style={{
              left: piece.left,
              top: piece.top,
              width: piece.size,
              height: piece.size * 0.6,
              rotate: `${piece.rotate}deg`,
              animationDelay: piece.delay,
            }}
          />
        ))}
      </div>
      <div className="mx-auto w-full max-w-6xl px-5 py-32">
        <p className="font-mono text-xs text-faint">Error 404</p>
        <h1 className="mt-3 font-display text-4xl text-ink">Signal lost.</h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          This page drifted out of orbit, or never existed. Head back to Mission Control or jump
          straight to the job spaces.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent"
          >
            Back to Mission Control
          </Link>
          <Link
            href="/experience/"
            className="rounded-full border border-line-strong px-5 py-3 text-sm text-ink hover:border-accent"
          >
            Open the orbit map
          </Link>
        </div>
      </div>
    </div>
  );
}
