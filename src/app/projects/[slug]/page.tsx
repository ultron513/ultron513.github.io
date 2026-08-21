import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProjectDetails } from "@/components/projects/project-details";
import { ProjectHero } from "@/components/projects/project-hero";
import { ProjectLinks } from "@/components/projects/project-links";
import { ProjectTechStack } from "@/components/projects/project-tech-stack";
import { projects } from "@/data/projects";
import { createMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug,
  );

  if (!project) {
    return createMetadata("Project Not Found");
  }

  return createMetadata(
    project.title,
    project.description,
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug,
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <ProjectHero
        category={project.category}
        title={project.title}
        description={project.description}
        image={project.image}
      />

      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        <div className="mb-10">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-white"
          >
            <span
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-1"
            >
              ←
            </span>
            Back to projects
          </Link>
        </div>

        <ProjectDetails
          overview={project.description}
          highlights={project.highlights}
        />

        <div className="mt-14">
          <ProjectTechStack
            technologies={project.technologies}
          />
        </div>

        <div className="mt-12">
          <ProjectLinks github={project.github} />
        </div>
      </div>
    </main>
  );
}