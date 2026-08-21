type ExperienceDetailsProps = {
  organization: string;
  role: string;
  period: string;
  location?: string;
  responsibilities: string[];
};

export function ExperienceDetails({
  organization,
  role,
  period,
  location,
  responsibilities,
}: ExperienceDetailsProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-7 sm:p-9">
      <div className="flex flex-col gap-5 border-b border-white/10 pb-8 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
            Experience
          </p>

          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            {organization}
          </h1>

          <p className="mt-2 text-zinc-400">{role}</p>

          {location ? (
            <p className="mt-2 text-xs uppercase tracking-[0.2em] text-zinc-600">
              {location}
            </p>
          ) : null}
        </div>

        <p className="text-sm text-zinc-600">{period}</p>
      </div>

      <div className="mt-8">
        <p className="text-xs uppercase tracking-[0.3em] text-zinc-600">
          Responsibilities
        </p>

        <div className="mt-6 divide-y divide-white/10 border-y border-white/10">
          {responsibilities.map((responsibility, index) => (
            <div key={responsibility} className="flex gap-5 py-5">
              <span className="shrink-0 text-xs tracking-[0.2em] text-zinc-700">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-7 text-zinc-400">
                {responsibility}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}