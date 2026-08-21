type ExperienceCardProps = {
  organization: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  featured?: boolean;
};

export function ExperienceCard({
  organization,
  role,
  period,
  location,
  description,
  featured = false,
}: ExperienceCardProps) {
  return (
    <article
      className={`group relative overflow-hidden rounded-[1.75rem] border p-7 transition-all duration-500 sm:p-9 ${
        featured
          ? "border-white/[0.14] bg-white/[0.035] hover:border-white/[0.2] hover:bg-white/[0.045]"
          : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.12] hover:bg-white/[0.025]"
      }`}
    >
      {featured ? (
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/35 to-transparent"
        />
      ) : null}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-medium tracking-[-0.025em] text-zinc-200">
              {organization}
            </span>

            {featured ? (
              <span className="rounded-full border border-white/[0.08] px-2.5 py-1 text-[9px] uppercase tracking-[0.25em] text-zinc-500">
                Featured
              </span>
            ) : null}
          </div>

          <p className="mt-2 text-sm text-zinc-400">{role}</p>

          {location ? (
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-zinc-700">
              {location}
            </p>
          ) : null}
        </div>

        <p className="shrink-0 text-sm text-zinc-600">{period}</p>
      </div>

      <p className="mt-8 max-w-3xl text-sm leading-7 text-zinc-500 sm:text-base">
        {description}
      </p>

      <div
        aria-hidden="true"
        className="mt-8 h-px w-10 bg-white/10 transition-all duration-500 group-hover:w-16 group-hover:bg-white/25"
      />
    </article>
  );
}