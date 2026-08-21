import type { Metadata } from "next";
import Link from "next/link";

import { ExperienceTimeline } from "@/components/experience/experience-timeline";
import { experience } from "@/data/experience";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Experience",
  "Professional, research, mentoring, and applied engineering experience of Ashish Kumar Patra across software, AI, data, and performance-focused systems.",
);

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 pb-24 pt-36 text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-zinc-600 transition-colors hover:text-white"
        >
          ← Back home
        </Link>

        <header className="mt-14">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Career
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">
            Experience
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
            Industry, research, mentoring, and applied engineering experience
            across software, AI, data, and performance-focused systems.
          </p>
        </header>

        <section className="mt-16">
          <ExperienceTimeline items={experience} />
        </section>
      </div>
    </main>
  );
}