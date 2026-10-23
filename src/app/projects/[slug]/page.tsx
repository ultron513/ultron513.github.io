import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { experiencesForProject, getProject, projectImage, projects } from "@/content";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
    og: `project-${project.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length];
  const related = experiencesForProject(slug);

  return (
    <article className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:pt-32">
      <Link
        href="/projects/"
        className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-accent hover:text-ink"
      >
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5">
          <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
        </svg>
        All projects
      </Link>
      <header className="mt-8 max-w-3xl">
        <p className="font-mono text-xs text-accent">{project.category}</p>
        <h1 className="mt-3 font-display text-3xl text-ink">{project.title}</h1>
        <p className="mt-4 text-lg text-muted">{project.description}</p>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-medium text-on-accent transition-[filter] hover:brightness-110"
        >
          View source on GitHub
        </a>
      </header>

      <figure className="hud mt-12 overflow-hidden rounded-md border border-line shadow-depth">
        <img
          src={projectImage(project.image, 1600)}
          srcSet={`${projectImage(project.image, 800)} 800w, ${projectImage(project.image, 1600)} 1536w`}
          sizes="(min-width: 1200px) 1120px, 100vw"
          width={1536}
          height={1024}
          alt={`${project.title} preview`}
          className="w-full"
        />
      </figure>

      <div className="mt-14 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <section aria-labelledby="highlights-title">
          <h2 id="highlights-title" className="font-display text-xl text-ink">
            Highlights
          </h2>
          <ul className="mt-5 space-y-4">
            {project.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-4 border-t border-line pt-4 text-muted">
                <span
                  aria-hidden="true"
                  className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </section>
        <aside className="space-y-8">
          <section aria-labelledby="stack-title">
            <h2 id="stack-title" className="font-mono text-xs text-faint">
              Tech stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-sm border border-line px-2.5 py-1 font-mono text-xs text-ink"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
          {related.length ? (
            <section aria-labelledby="related-title">
              <h2 id="related-title" className="font-mono text-xs text-faint">
                Connected job spaces
              </h2>
              <ul className="mt-3 space-y-2">
                {related.map((item) => (
                  <li key={item.slug} data-space={item.space}>
                    <Link
                      href={`/experience/${item.slug}/`}
                      className="link-quiet text-sm text-ink hover:text-space"
                    >
                      {item.organization}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>

      <nav aria-label="Next project" className="mt-20 border-t border-line pt-8">
        <Link href={`/projects/${next.slug}/`} className="group block">
          <span className="font-mono text-xs text-faint">Next satellite</span>
          <span className="mt-1 block font-display text-2xl text-ink group-hover:text-accent">
            {next.shortTitle}
          </span>
        </Link>
      </nav>
    </article>
  );
}
