import Link from "next/link";

import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { experience } from "@/data/experience";

export function ExperiencePreview() {
  const featuredExperience = experience.filter(
    (item) => item.featured,
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
                  02 / Experience
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
                Where experience meets
                <span className="text-zinc-600">
                  {" "}
                  performance.
                </span>
              </h2>
            </div>

            <Link
              href="/experience"
              className="group inline-flex items-center gap-2 text-sm text-zinc-600 transition-colors hover:text-white"
            >
              View full experience
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </div>
        </FadeIn>

        <div className="relative mt-16">
          <Stagger className="space-y-4">
            {featuredExperience.slice(0, 4).map((item, index) => (
              <StaggerItem
                key={`${item.organization}-${item.role}`}
              >
                <article
                  className={`group relative overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-500 sm:p-8 ${
                    index === 0
                      ? "border-white/[0.14] bg-white/[0.035] hover:border-white/[0.2] hover:bg-white/[0.045]"
                      : "border-white/[0.07] bg-white/[0.012] hover:border-white/[0.12] hover:bg-white/[0.022]"
                  }`}
                >
                  {index === 0 ? (
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
                    />
                  ) : null}

                  <div className="grid gap-6 md:grid-cols-[90px_1fr_auto] md:items-center">
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] tracking-[0.25em] text-zinc-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <span
                        aria-hidden="true"
                        className={`hidden size-2 rounded-full md:block ${
                          index === 0
                            ? "bg-white"
                            : "bg-zinc-700"
                        }`}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-medium tracking-[-0.02em] text-zinc-200 sm:text-2xl">
                        {item.organization}
                      </h3>

                      <p className="mt-1 text-sm text-zinc-500">
                        {item.role}
                      </p>

                      <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-zinc-700">
                        {item.location}
                      </p>
                    </div>

                    <p className="text-sm text-zinc-700 md:text-right">
                      {item.period}
                    </p>
                  </div>

                  <p className="mt-7 max-w-4xl text-sm leading-7 text-zinc-600 sm:text-base">
                    {item.description}
                  </p>

                  <div
                    aria-hidden="true"
                    className="mt-7 h-px w-10 bg-white/10 transition-all duration-500 group-hover:w-16 group-hover:bg-white/25"
                  />
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}