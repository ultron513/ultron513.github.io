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
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-sm text-zinc-600 transition-colors hover:text-white"
        >
          ← Back home
        </Link>

        <header className="mt-14">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Connect
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">
            Let&apos;s talk.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
            {profile.availability}
          </p>
        </header>

        <section className="mt-16 grid gap-5 md:grid-cols-2">
          <a
            href={`mailto:${profile.contact.email}`}
            className="group rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              Email
            </p>

            <p className="mt-5 break-all text-lg text-zinc-300 transition-colors group-hover:text-white">
              {profile.contact.email}
            </p>
          </a>

          <a
            href={profile.contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              LinkedIn
            </p>

            <p className="mt-5 text-lg text-zinc-300 transition-colors group-hover:text-white">
              Connect professionally ↗
            </p>
          </a>

          <a
            href={profile.contact.github}
            target="_blank"
            rel="noreferrer"
            className="group rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20"
          >
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              GitHub
            </p>

            <p className="mt-5 text-lg text-zinc-300 transition-colors group-hover:text-white">
              Explore my work ↗
            </p>
          </a>

          <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-7">
            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              Based in
            </p>

            <p className="mt-5 text-lg text-zinc-300">
              {profile.location}
            </p>
          </div>
        </section>

        <div className="mt-10 border-t border-white/10 pt-8">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-zinc-600">
            Social
          </p>

          <SocialLinks />
        </div>
      </div>
    </main>
  );
}