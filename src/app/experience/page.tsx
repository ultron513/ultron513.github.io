import type { Metadata } from "next";
import Link from "next/link";

import { OrbitMap } from "@/components/orbit/orbit-map";
import { experience, formatPeriod, moduleId } from "@/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Experience",
  description:
    "Six job spaces: McLaren Racing, IIT Guwahati, Microsoft Elevate, ISTA, Stanford Code in Place and Outlier.AI.",
  path: "/experience",
  og: "experience",
});

/** Orbit map of all six spaces plus a plain timeline view (spec §3). */
export default function ExperiencePage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:pt-32">
      <header className="max-w-2xl">
        <p className="font-mono text-xs text-faint">{experience.length} modules in orbit</p>
        <h1 id="experience-title" className="mt-3 font-display text-3xl text-ink">
          Orbit map
        </h1>
        <p className="mt-4 text-lg text-muted">
          Every workplace is its own module with its own interior. Pick a station to dock, or read
          the plain timeline below.
        </p>
      </header>

      <div className="mt-12">
        <OrbitMap headingId="experience-title" />
      </div>

      <section aria-labelledby="timeline-title" className="mt-24">
        <h2 id="timeline-title" className="font-display text-xl text-ink">
          Timeline
        </h2>
        <ol className="mt-6 divide-y divide-line border-y border-line">
          {experience.map((item) => (
            <li key={item.slug} data-space={item.space}>
              <Link
                href={`/experience/${item.slug}/`}
                className="group grid gap-2 py-5 sm:grid-cols-[8rem_1fr_auto] sm:items-baseline sm:gap-6"
              >
                <span className="font-mono text-xs text-faint">{moduleId(item.slug)}</span>
                <span>
                  <span className="block font-display text-lg text-ink group-hover:text-space">
                    {item.organization}
                  </span>
                  <span className="block text-sm text-muted">{item.role}</span>
                </span>
                <span className="text-sm text-muted">{formatPeriod(item)}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
