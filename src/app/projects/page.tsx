import type { Metadata } from "next";
import Link from "next/link";

import { ProjectGrid } from "@/components/projects/project-grid";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata(
  "Projects",
  "Selected software engineering, artificial intelligence, machine learning, data analytics, computer vision, business intelligence, and NLP projects by Ashish Kumar Patra.",
);

export default function ProjectsPage() {
  const projectCards = projects.map((project) => ({
    slug: project.slug,
    title: project.title,
    category: project.category,
    description: project.description,
  }));

  return (
    <main className="min-h-screen bg-[var(--background)] px-6 pb-24 pt-36 text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="text-sm text-zinc-600 transition-colors hover:text-white"
        >
          ← Back home
        </Link>

        <header className="mt-14">
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Selected Work
          </p>

          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">
            Projects
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
            Software engineering, artificial intelligence, machine learning,
            data analytics, computer vision, business intelligence, and NLP
            projects.
          </p>
        </header>

        <section className="mt-16">
          <ProjectGrid projects={projectCards} />
        </section>
      </div>
    </main>
  );
}