import { FadeIn } from "@/components/motion/fade-in";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section className="relative border-t border-white/[0.08] px-6 py-28 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-px w-1/3 bg-gradient-to-r from-white/[0.12] to-transparent"
      />

      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-28">
        <FadeIn>
          <div className="lg:sticky lg:top-32 lg:self-start">
            <div className="flex items-center gap-3">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-white/30"
              />

              <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-zinc-600">
                01 / About
              </p>
            </div>

            <h2 className="mt-6 max-w-lg text-4xl font-medium leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl">
              Engineering with a
              <span className="text-zinc-600">
                {" "}
                data-first mindset.
              </span>
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.08}>
          <div className="max-w-3xl">
            <p className="text-2xl font-medium leading-[1.45] tracking-[-0.02em] text-zinc-200 sm:text-3xl">
              {profile.summary}
            </p>

            <div className="mt-10 space-y-6 text-base leading-8 text-zinc-500 sm:text-lg">
              <p>{profile.introduction}</p>

              <p>{profile.availability}</p>
            </div>

            <div className="mt-14 grid grid-cols-2 border-t border-white/[0.08] pt-6">
              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-700">
                  Based in
                </p>

                <p className="mt-3 text-sm text-zinc-300">
                  {profile.location}
                </p>
              </div>

              <div>
                <p className="text-[11px] uppercase tracking-[0.25em] text-zinc-700">
                  Focus
                </p>

                <p className="mt-3 text-sm text-zinc-300">
                  Software · AI · Data
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}