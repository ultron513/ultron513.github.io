type ProjectDetailsProps = {
  overview: string;
  highlights: readonly string[];
};

export function ProjectDetails({
  overview,
  highlights,
}: ProjectDetailsProps) {
  return (
    <section className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
          Overview
        </p>

        <p className="mt-5 text-lg leading-8 text-zinc-300">{overview}</p>
      </div>

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
          Highlights
        </p>

        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {highlights.map((highlight, index) => (
            <div
              key={highlight}
              className="flex gap-5 py-5"
            >
              <span className="shrink-0 text-xs tracking-[0.2em] text-zinc-700">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-6 text-zinc-400">{highlight}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}