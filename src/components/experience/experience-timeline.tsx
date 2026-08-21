import { ExperienceCard } from "./experience-card";

export type ExperienceTimelineItem = {
  organization: string;
  role: string;
  period: string;
  location?: string;
  description: string;
};

type ExperienceTimelineProps = {
  items: readonly ExperienceTimelineItem[];
};

export function ExperienceTimeline({ items }: ExperienceTimelineProps) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[11px] top-0 hidden w-px bg-white/10 md:block" />

      <div className="space-y-8">
        {items.map((item, index) => (
          <div
            key={`${item.organization}-${item.role}`}
            className="relative md:pl-12"
          >
            <span className="absolute left-0 top-8 hidden size-[23px] rounded-full border border-white/20 bg-[var(--background)] md:block">
              <span className="absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white" />
            </span>

            <div className="mb-3 flex items-center gap-3 md:hidden">
              <span className="text-xs tracking-[0.25em] text-zinc-700">
                {String(index + 1).padStart(2, "0")}
              </span>

              <span className="h-px flex-1 bg-white/10" />
            </div>

            <ExperienceCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}