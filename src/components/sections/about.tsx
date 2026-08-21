import { FadeIn } from "@/components/motion/fade-in";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <FadeIn>
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
              About
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
              Engineering with a data-first mindset.
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="space-y-6 text-base leading-8 text-zinc-400 sm:text-lg">
            <p>{profile.summary}</p>

            <p>{profile.introduction}</p>

            <p>{profile.availability}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}