import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { projects } from "@/data/projects";

export function ProjectsPreview() {
  const featuredProjects = projects.filter(
    (project) => project.featured,
  );

  return (
    <section className="relative border-t border-white/[0.08] px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-white/30"
                />

                <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-600">
                  03 / Selected Work
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
                Projects that turn
                <span className="text-zinc-600">
                  {" "}
                  ideas into systems.
                </span>
              </h2>
            </div>

            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-white"
            >
              View all projects

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </FadeIn>

        <Stagger className="mt-16 grid gap-5 md:grid-cols-2">
          {featuredProjects.slice(0, 4).map((project) => (
            <StaggerItem key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="group block overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-white/[0.015] transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.025]"
              >
                <div className="relative overflow-hidden border-b border-white/[0.07]">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    loading="lazy"
                    className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                  />

                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
                  />

                  <span className="absolute left-5 top-5 rounded-full border border-white/[0.1] bg-black/35 px-3 py-1.5 text-[9px] uppercase tracking-[0.25em] text-white/60 backdrop-blur-sm">
                    {project.category}
                  </span>

                  <span
                    aria-hidden="true"
                    className="absolute right-5 top-5 text-zinc-300 opacity-70 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </div>

                <div className="p-7 sm:p-8">
                  <p className="text-[10px] tracking-[0.3em] text-zinc-700">
                    {String(
                      featuredProjects.indexOf(project) + 1,
                    ).padStart(2, "0")}
                  </p>

                  <h3 className="mt-4 max-w-xl text-2xl font-medium leading-tight tracking-[-0.025em] text-zinc-200 sm:text-3xl">
                    {project.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-zinc-600">
                    {project.description}
                  </p>

                  <div
                    aria-hidden="true"
                    className="mt-7 h-px w-8 bg-white/10 transition-all duration-500 group-hover:w-14 group-hover:bg-white/25"
                  />
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}