import { FadeIn } from "@/components/motion/fade-in";
import { Stagger, StaggerItem } from "@/components/motion/stagger";
import { education } from "@/data/education";

export function Education() {
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
                  05 / Education
                </p>
              </div>

              <h2 className="mt-6 max-w-3xl text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">
                Two degrees.
                <span className="text-zinc-600">
                  {" "}
                  One engineering path.
                </span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-zinc-600 sm:text-right">
              Data Science, Artificial Intelligence, and Electronics &
              Telecommunication Engineering form the academic foundation behind
              the work shown here.
            </p>
          </div>
        </FadeIn>

        <Stagger className="mt-16 space-y-4">
          {education.map((item, index) => {
            const isDegree = item.type === "Undergraduate";

            return (
              <StaggerItem
                key={`${item.degree}-${item.institution}`}
              >
                <article
                  className={`group relative overflow-hidden rounded-[1.9rem] border p-7 transition-all duration-500 sm:p-9 ${
                    isDegree
                      ? "border-white/[0.12] bg-white/[0.025] hover:border-white/[0.18] hover:bg-white/[0.035]"
                      : "border-white/[0.07] bg-white/[0.012] hover:border-white/[0.12] hover:bg-white/[0.02]"
                  }`}
                >
                  {isDegree ? (
                    <div
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    />
                  ) : null}

                  <div className="grid gap-7 md:grid-cols-[84px_1fr_auto] md:items-center">
                    <div>
                      <span className="text-[10px] tracking-[0.25em] text-zinc-700">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="mt-3 text-[9px] uppercase tracking-[0.25em] text-zinc-800">
                        {item.type}
                      </p>
                    </div>

                    <div>
                      <h3
                        className={`text-xl font-medium leading-tight tracking-[-0.02em] sm:text-2xl ${
                          isDegree
                            ? "text-zinc-200"
                            : "text-zinc-400"
                        }`}
                      >
                        {item.degree}
                      </h3>

                      <p className="mt-3 text-sm text-zinc-500">
                        {item.institution}
                      </p>

                      <p className="mt-1 text-xs text-zinc-700">
                        {item.university}
                      </p>
                    </div>

                    <div className="md:text-right">
                      <p className="font-['Space_Grotesk'] text-3xl font-medium tracking-[-0.04em] text-zinc-300">
                        {item.year}
                      </p>

                      <p className="mt-2 text-sm text-zinc-600">
                        {item.score}
                      </p>
                    </div>
                  </div>

                  <div className="mt-7 border-t border-white/[0.06] pt-5">
                    <p className="max-w-3xl text-sm leading-7 text-zinc-700">
                      {item.description}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}