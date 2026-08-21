import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { achievements } from "@/data/achievements";

export function Achievements() {
  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Achievements
          </p>

          <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Competitive problem solving meets applied engineering.
          </h2>
        </FadeIn>

        <Stagger className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.slice(0, 4).map((achievement) => (
            <StaggerItem key={achievement.title}>
              <article className="h-full bg-[var(--background)] p-7 sm:p-8">
                <p className="text-4xl font-semibold tracking-tight">
                  {achievement.metric}
                </p>

                <p className="mt-4 text-sm font-medium text-zinc-300">
                  {achievement.title}
                </p>

                <p className="mt-2 max-w-[18rem] text-sm leading-6 text-zinc-500">
                  {achievement.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}