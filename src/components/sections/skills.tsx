import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              Skills
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              A broad engineering toolkit.
            </h2>
          </div>
        </FadeIn>

        <Stagger className="mt-14 grid gap-5 md:grid-cols-2">
          {skills.map((group) => (
            <StaggerItem key={group.category}>
              <article className="h-full rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
                <h3 className="text-lg font-medium">
                  {group.category}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {group.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/10 px-3 py-2 text-xs text-zinc-400"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}