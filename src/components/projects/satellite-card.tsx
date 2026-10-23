import Link from "next/link";

import { projectImage, type Project } from "@/content";

import { TiltCard } from "./tilt-card";

/** Project as a satellite: image, category readout and stack as telemetry chips (spec §4 item 5). */
export function SatelliteCard({
  project,
  priority = false,
  headingLevel = 3,
}: {
  project: Project;
  priority?: boolean;
  headingLevel?: 2 | 3;
}) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <TiltCard className="h-full">
      <article className="hud glass group relative flex h-full flex-col overflow-hidden rounded-md shadow-depth">
        <div className="relative overflow-hidden border-b border-line">
          <img
            src={projectImage(project.image, 800)}
            srcSet={`${projectImage(project.image, 800)} 800w, ${projectImage(project.image, 1600)} 1536w`}
            sizes="(min-width: 1024px) 560px, 100vw"
            width={800}
            height={533}
            alt={`${project.title} preview`}
            loading={priority ? "eager" : "lazy"}
            decoding="async"
            className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-xs text-accent">{project.category}</p>
          <Heading className="mt-2 font-display text-xl text-ink">
            <Link
              href={`/projects/${project.slug}/`}
              className="after:absolute after:inset-0 focus-visible:outline-none"
            >
              {project.shortTitle}
            </Link>
          </Heading>
          <p className="mt-3 line-clamp-3 text-sm text-muted">{project.description}</p>
          <ul className="mt-auto flex flex-wrap gap-1.5 pt-5" aria-label="Tech stack">
            {project.technologies.slice(0, 5).map((tech) => (
              <li
                key={tech}
                className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs text-muted"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </article>
    </TiltCard>
  );
}
