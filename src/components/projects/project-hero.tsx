type ProjectHeroProps = {
  category: string;
  title: string;
  description: string;
  image?: string;
};

export function ProjectHero({
  category,
  title,
  description,
  image,
}: ProjectHeroProps) {
  return (
    <header className="relative overflow-hidden border-b border-white/[0.08] pt-32 sm:pt-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 pb-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:pb-20">
          <div className="max-w-5xl">
            <p className="text-[10px] font-medium uppercase tracking-[0.35em] text-zinc-600">
              {category}
            </p>

            <h1 className="mt-6 text-5xl font-medium leading-[0.95] tracking-[-0.05em] text-white sm:text-7xl lg:text-8xl">
              {title}
            </h1>
          </div>

          <div className="lg:pb-2">
            <p className="max-w-2xl text-base leading-8 text-zinc-500 sm:text-lg">
              {description}
            </p>
          </div>
        </div>

        {image ? (
          <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-black">
            <img
              src={image}
              alt={`${title} visual overview`}
              className="aspect-[16/8.5] w-full object-cover"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}