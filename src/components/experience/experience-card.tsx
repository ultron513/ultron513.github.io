type ExperienceCardProps = {
  organization: string;
  role: string;
  period: string;
  location?: string;
  description: string;
};

export function ExperienceCard({
  organization,
  role,
  period,
  location,
  description,
}: ExperienceCardProps) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-colors hover:border-white/20 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-2xl font-medium tracking-tight">
            {organization}
          </h3>

          <p className="mt-2 text-sm text-zinc-400">{role}</p>

          {location ? (
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-600">
              {location}
            </p>
          ) : null}
        </div>

        <p className="shrink-0 text-sm text-zinc-600">{period}</p>
      </div>

      <p className="mt-7 max-w-3xl text-sm leading-7 text-zinc-400">
        {description}
      </p>
    </article>
  );
}