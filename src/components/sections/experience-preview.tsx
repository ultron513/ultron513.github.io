import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { experience } from "@/data/experience";

export function ExperiencePreview() {
  const featuredExperience = experience.filter(
    (item) => item.featured,
  );

  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
                Experience
              </p>

              <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
                Where I&apos;ve worked.
              </h2>
            </div>

            <Link
              href="/experience"
              className="text-sm text-zinc-500 transition-colors hover:text-white"
            >
              View full experience →
            </Link>
          </div>
        </FadeIn>

        <Stagger className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {featuredExperience.slice(0, 4).map((item, index) => (
            <StaggerItem
              key={`${item.organization}-${item.role}`}
            >
              <div className="grid gap-4 py-7 md:grid-cols-[80px_1fr_auto] md:items-center">
                <p className="text-xs tracking-[0.2em] text-zinc-600">
                  {String(index + 1).padStart(2, "0")}
                </p>

                <div>
                  <h3 className="text-xl font-medium tracking-tight">
                    {item.organization}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-500">
                    {item.role}
                  </p>
                </div>

                <p className="text-sm text-zinc-600">
                  {item.period}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}