import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { projects } from "@/data/projects";

export function ProjectsPreview() {
  const featuredProjects = projects.filter(
    (project) => project.featured,
  );

  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Selected Work
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Projects that ship ideas.
              </h2>
            </div>

            <Link
              href="/projects"
              className="text-sm text-zinc-500 transition-colors hover:text-white"
            >
              View all projects →
            </Link>
          </div>
        </FadeIn>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 md:grid-cols-2">
          {featuredProjects.slice(0, 4).map((project, index) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block bg-[var(--background)] p-7 transition-colors hover:bg-white/[0.03] sm:p-9"
              >
                <div className="flex items-start justify-between">
                  <span className="text-xs tracking-[0.25em] text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="text-zinc-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white">
                    ↗
                  </span>
                </div>

                <h3 className="mt-12 max-w-md text-2xl font-medium tracking-tight sm:text-3xl">
                  {project.title}
                </h3>

                <p className="mt-4 text-sm text-zinc-500">
                  {project.category}
                </p>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}