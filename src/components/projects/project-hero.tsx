type ProjectHeroProps = {
  category: string;
  title: string;
  description: string;
};

export function ProjectHero({
  category,
  title,
  description,
}: ProjectHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/10 px-6 pb-20 pt-36 sm:pb-28 sm:pt-44">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-white/[0.025] blur-3xl" />
      </div>

      <div className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">
          {category}
        </p>

        <h1 className="mt-6 max-w-5xl text-5xl font-semibold leading-[0.95] tracking-[-0.04em] sm:text-7xl">
          {title}
        </h1>

        <p className="mt-8 max-w-3xl text-base leading-8 text-zinc-400 sm:text-lg">
          {description}
        </p>
      </div>
    </header>
  );
}