type ProjectTechStackProps = {
  technologies: readonly string[];
};

export function ProjectTechStack({
  technologies,
}: ProjectTechStackProps) {
  return (
    <section className="border-t border-white/10 pt-10">
      <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
        Technology
      </p>

      <div className="mt-6 flex flex-wrap gap-2.5">
        {technologies.map((technology) => (
          <span
            key={technology}
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-zinc-400 transition-colors hover:border-white/20 hover:text-zinc-200"
          >
            {technology}
          </span>
        ))}
      </div>
    </section>
  );
}