import type { Metadata } from "next";
import Link from "next/link";

import { SocialLinks } from "@/components/shared/social-links";
import { profile } from "@/data/profile";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Contact",
  "Contact Ashish Kumar Patra for software engineering, AI/ML, data, research, and technical collaboration opportunities.",
);

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] px-6 pb-24 pt-36 text-[var(--foreground)]">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-white"
        >
          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            ←
          </span>
          Back home
        </Link>

        <header className="mt-14 max-w-5xl">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/30"
            />

            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-600">
              Contact
            </p>
          </div>

          <h1 className="mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.05em] text-white sm:text-7xl">
            Let&apos;s talk.
          </h1>

          <p className="mt-7 max-w-3xl text-base leading-8 text-zinc-500 sm:text-lg">
            {profile.availability}
          </p>
        </header>

        <section className="mt-16 grid gap-4 md:grid-cols-2">
          <a
            href={`mailto:${profile.contact.email}`}
            className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.015] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.025] sm:p-8"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
              Email
            </span>

            <p className="mt-5 break-all text-xl font-medium tracking-[-0.02em] text-zinc-300 transition-colors group-hover:text-white">
              {profile.contact.email}
            </p>

            <span
              aria-hidden="true"
              className="absolute right-7 top-7 text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            >
              ↗
            </span>

            <div
              aria-hidden="true"
              className="mt-10 h-px w-8 bg-white/[0.08] transition-all duration-500 group-hover:w-14 group-hover:bg-white/20"
            />
          </a>

          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.015] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.025] sm:p-8"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
              LinkedIn
            </span>

            <p className="mt-5 text-xl font-medium tracking-[-0.02em] text-zinc-300 transition-colors group-hover:text-white">
              Connect professionally
            </p>

            <span
              aria-hidden="true"
              className="absolute right-7 top-7 text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            >
              ↗
            </span>

            <div
              aria-hidden="true"
              className="mt-10 h-px w-8 bg-white/[0.08] transition-all duration-500 group-hover:w-14 group-hover:bg-white/20"
            />
          </a>

          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            className="group relative overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.015] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.025] sm:p-8"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
              GitHub
            </span>

            <p className="mt-5 text-xl font-medium tracking-[-0.02em] text-zinc-300 transition-colors group-hover:text-white">
              Explore the work
            </p>

            <span
              aria-hidden="true"
              className="absolute right-7 top-7 text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            >
              ↗
            </span>

            <div
              aria-hidden="true"
              className="mt-10 h-px w-8 bg-white/[0.08] transition-all duration-500 group-hover:w-14 group-hover:bg-white/20"
            />
          </a>

          <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.015] p-7 sm:p-8">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
              Based in
            </span>

            <p className="mt-5 text-xl font-medium tracking-[-0.02em] text-zinc-300">
              {profile.location}
            </p>

            <div
              aria-hidden="true"
              className="mt-10 h-px w-8 bg-white/[0.08]"
            />
          </div>
        </section>

        <div className="mt-16 border-t border-white/[0.08] pt-8">
          <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-zinc-700">
            Elsewhere
          </p>

          <SocialLinks />
        </div>
      </div>
    </main>
  );
}