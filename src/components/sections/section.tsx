import { cn } from "@/lib/utils";

/** Page section with a left-aligned heading block. `id` doubles as the in-page anchor. */
export function Section({
  id,
  title,
  intro,
  className,
  children,
  aside,
}: {
  id: string;
  title: string;
  intro?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28", className)}
    >
      <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
        <div className="max-w-2xl">
          <h2 id={`${id}-title`} className="font-display text-2xl text-ink">
            {title}
          </h2>
          {intro ? <p className="mt-4 text-lg text-muted">{intro}</p> : null}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}
