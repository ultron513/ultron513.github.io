type ExperienceDetailsProps = {
  organization: string;
  role: string;
  period: string;
  location?: string;
  responsibilities: readonly string[];
};

export function ExperienceDetails({
  organization,
  role,
  period,
  location,
  responsibilities,
}: ExperienceDetailsProps) {
  return (
    <section className="overflow-hidden rounded-[2rem] border border-white/[0.1] bg-white/[0.02]">
      <div className="border-b border-white/[0.08] p-7 sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-600">
              Experience
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.035em] text-white sm:text-5xl">
              {organization}
            </h1>

            <p className="mt-3 text-base text-zinc-400">
              {role}
            </p>

            {location ? (
              <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-zinc-700">
                {location}
              </p>
            ) : null}
          </div>

          <p className="text-sm text-zinc-600">{period}</p>
        </div>
      </div>

      <div className="p-7 sm:p-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
          Responsibilities
        </p>

        <div className="mt-6 divide-y divide-white/[0.07] border-y border-white/[0.07]">
          {responsibilities.map((responsibility, index) => (
            <div
              key={responsibility}
              className="grid gap-4 py-5 sm:grid-cols-[40px_1fr]"
            >
              <span className="text-[10px] tracking-[0.25em] text-zinc-700">
                {String(index + 1).padStart(2, "0")}
              </span>

              <p className="text-sm leading-7 text-zinc-500">
                {responsibility}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}