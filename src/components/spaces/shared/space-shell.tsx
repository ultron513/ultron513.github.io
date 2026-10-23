import Link from "next/link";

import { formatPeriod, getProject, moduleId, neighbours, type Experience } from "@/content";

/*
 * Shared shell for every job space (spec §5): header with module ID, the space's own interior,
 * the CV bullets as a plain semantic list, the stack, related projects, Undock and module navigation.
 */
export function SpaceShell({
  item,
  children,
  aside,
}: {
  item: Experience;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  const { previous, next } = neighbours(item.slug);
  const related = item.links.map(getProject).filter((p) => p !== undefined);

  return (
    <article data-space={item.space} className="relative">
      <header className="mx-auto max-w-6xl px-5 pb-10 pt-28 sm:pt-32">
        <Link
          href="/experience/"
          className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-space hover:text-ink"
        >
          <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5">
            <path d="M10 3 5 8l5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
          </svg>
          Undock to route map
        </Link>
        <p className="mt-8 font-mono text-xs text-faint">
          <span className="text-space">{moduleId(item.slug)}</span> · {item.start} → {item.end}
        </p>
        <h1 className="mt-3 font-display text-3xl text-ink">{item.organization}</h1>
        <dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3 text-sm">
          <div>
            <dt className="font-mono text-xs text-faint">Role</dt>
            <dd className="mt-1 text-ink">{item.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-faint">Period</dt>
            <dd className="mt-1 text-ink">{formatPeriod(item)}</dd>
          </div>
          <div>
            <dt className="font-mono text-xs text-faint">Location</dt>
            <dd className="mt-1 text-ink">{item.location}</dd>
          </div>
        </dl>
      </header>

      <div className="relative">{children}</div>

      <section aria-labelledby="log-title" className="mx-auto max-w-6xl px-5 py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_20rem]">
          <div>
            <h2 id="log-title" className="font-display text-xl text-ink">
              Mission log
            </h2>
            <p className="mt-2 text-sm text-muted">
              Every line below is taken word for word from the CV.
            </p>
            <ul aria-label="CV highlights" className="mt-6 space-y-4">
              {item.cvBullets.map((bullet) => (
                <li key={bullet} className="flex gap-4 border-t border-line pt-4 text-muted">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 size-1.5 shrink-0 rounded-full bg-space"
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
          <aside className="space-y-8">
            {aside}
            <div>
              <h2 className="font-mono text-xs text-faint">Stack</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-sm border border-line px-2.5 py-1 font-mono text-xs text-ink"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
            {related.length ? (
              <div>
                <h2 className="font-mono text-xs text-faint">Related projects</h2>
                <ul className="mt-3 space-y-2">
                  {related.map((project) => (
                    <li key={project.slug}>
                      <Link
                        href={`/projects/${project.slug}/`}
                        className="link-quiet text-sm text-ink"
                      >
                        {project.shortTitle}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      <nav aria-label="Modules" className="border-t border-line">
        <div className="mx-auto grid max-w-6xl gap-4 px-5 py-10 sm:grid-cols-2">
          {previous ? (
            <Link
              href={`/experience/${previous.slug}/`}
              data-space={previous.space}
              className="group rounded-md border border-line p-5 transition-colors hover:border-space"
            >
              <span className="font-mono text-xs text-faint">Newer module</span>
              <span className="mt-1 block font-display text-lg text-ink group-hover:text-space">
                {previous.organization}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/experience/${next.slug}/`}
              data-space={next.space}
              className="group rounded-md border border-line p-5 text-right transition-colors hover:border-space"
            >
              <span className="font-mono text-xs text-faint">Earlier module</span>
              <span className="mt-1 block font-display text-lg text-ink group-hover:text-space">
                {next.organization}
              </span>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}
