import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { achievements } from "@/data/achievements";

export function Achievements() {
  const primaryAchievements = achievements.slice(0, 4);

  return (
    <section className="relative border-t border-white/[0.08] px-6 py-28 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-white/30"
            />

            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-600">
              07 / Achievements
            </p>
          </div>

          <h2 className="mt-6 max-w-4xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
            Competitive problem solving meets
            <span className="text-zinc-600">
              {" "}
              applied engineering.
            </span>
          </h2>
        </FadeIn>

        <Stagger className="mt-16 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {primaryAchievements.map((achievement, index) => (
            <StaggerItem key={achievement.title}>
              <article className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.015] p-7 transition-all duration-500 hover:-translate-y-0.5 hover:border-white/[0.14] hover:bg-white/[0.025] sm:p-8">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] tracking-[0.25em] text-zinc-700">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span
                    aria-hidden="true"
                    className="size-1.5 rounded-full bg-zinc-800 transition-colors duration-300 group-hover:bg-white"
                  />
                </div>

                <p className="mt-12 font-['Space_Grotesk'] text-4xl font-medium tracking-[-0.05em] text-white">
                  {achievement.metric}
                </p>

                <p className="mt-5 text-sm font-medium leading-6 text-zinc-300">
                  {achievement.title}
                </p>

                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {achievement.description}
                </p>

                <div
                  aria-hidden="true"
                  className="mt-8 h-px w-8 bg-white/[0.08] transition-all duration-500 group-hover:w-14 group-hover:bg-white/20"
                />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}