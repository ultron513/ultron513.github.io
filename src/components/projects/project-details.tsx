type ProjectDetailsProps = {
  overview: string;
  highlights: readonly string[];
};

export function ProjectDetails({
  overview,
  highlights,
}: ProjectDetailsProps) {
  return (
    <section className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
          Overview
        </p>

        <p className="mt-6 text-xl font-medium leading-[1.55] tracking-[-0.015em] text-zinc-300 sm:text-2xl">
          {overview}
        </p>
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
          Highlights
        </p>

        <div className="mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {highlights.map((highlight, index) => (
            <div
              key={highlight}
              className="grid gap-5 py-6 sm:grid-cols-[42px_1fr]"
            >
              <span className="text-[10px] tracking-[0.25em] text-zinc-700">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-7 text-zinc-500 sm:text-base">
                {highlight}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}