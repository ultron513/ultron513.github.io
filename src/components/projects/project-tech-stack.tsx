type ProjectTechStackProps = {
  technologies: readonly string[];
};

export function ProjectTechStack({
  technologies,
}: ProjectTechStackProps) {
  return (
    <section className="border-t border-white/[0.08] pt-10">
      <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
        Technology
      </p>

      <div className="mt-6 flex max-w-5xl flex-wrap gap-2">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-white/[0.08] bg-white/[0.015] px-4 py-2.5 text-xs text-zinc-500 transition-colors duration-200 hover:border-white/[0.15] hover:text-zinc-300"
          >
            {technology}
          </span>
        ))}
      </div>
    </section>
  );
}