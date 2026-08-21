import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section className="relative border-t border-white/[0.08] px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="h-px w-8 bg-white/30"
                />

                <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-600">
                  04 / Skills
                </p>
              </div>

              <h2 className="mt-6 max-w-2xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
                A broad engineering
                <span className="text-zinc-600">
                  {" "}
                  toolkit.
                </span>
              </h2>
            </div>

            <p className="max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
              A combination of programming fundamentals, software engineering,
              cloud infrastructure, machine learning, and analytical tooling.
            </p>
          </div>
        </FadeIn>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-2">
          {skills.map((group, index) => (
            <StaggerItem key={group.category}>
              <article className="group relative h-full overflow-hidden rounded-[1.9rem] border border-white/[0.08] bg-white/[0.015] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.15] hover:bg-white/[0.025] sm:p-9">
                <div
                  aria-hidden="true"
                  className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rounded-full bg-white/[0.025] opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />

                <div className="relative">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
                        Discipline
                      </p>

                      <h3 className="mt-3 text-xl font-medium tracking-[-0.02em] text-zinc-200 sm:text-2xl">
                        {group.category}
                      </h3>
                    </div>

                    <span className="font-['Space_Grotesk'] text-3xl font-medium tracking-[-0.05em] text-zinc-800 transition-colors duration-300 group-hover:text-zinc-700">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-5 max-w-xl text-sm leading-7 text-zinc-600">
                    {group.description}
                  </p>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full border border-white/[0.07] bg-black/20 px-3.5 py-2 text-xs text-zinc-500 transition-all duration-200 hover:border-white/[0.14] hover:bg-white/[0.025] hover:text-zinc-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  <div
                    aria-hidden="true"
                    className="mt-9 h-px w-8 bg-white/[0.08] transition-all duration-500 group-hover:w-16 group-hover:bg-white/20"
                  />
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}