import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { education } from "@/data/education";

export function Education() {
  return (
    <section className="border-t border-white/10 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <FadeIn>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
            Education
          </p>

          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
            Two degrees. One engineering path.
          </h2>
        </FadeIn>

        <Stagger className="mt-14 divide-y divide-white/10 border-y border-white/10">
          {education.map((item, index) => (
            <StaggerItem
              key={`${item.degree}-${item.institution}`}
            >
              <article className="grid gap-5 py-7 md:grid-cols-[80px_1fr_auto] md:items-center">
                <span className="text-xs tracking-[0.25em] text-zinc-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div>
                  <h3 className="text-xl font-medium tracking-tight">
                    {item.degree}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {item.institution}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-sm text-zinc-400">
                    {item.year}
                  </p>

                  <p className="mt-1 text-sm text-zinc-600">
                    {item.score}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}