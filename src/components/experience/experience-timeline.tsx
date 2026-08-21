import { Stagger, StaggerItem } from "@/components/motion/stagger";

import { ExperienceCard } from "./experience-card";

export type ExperienceTimelineItem = {
  organization: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  featured?: boolean;
};

type ExperienceTimelineProps = {
  items: readonly ExperienceTimelineItem[];
};

export function ExperienceTimeline({
  items,
}: ExperienceTimelineProps) {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute bottom-10 left-[19px] top-8 hidden w-px bg-gradient-to-b from-white/20 via-white/[0.08] to-transparent md:block"
      />

      <Stagger className="space-y-8">
        {items.map((item, index) => (
          <StaggerItem
            key={`${item.organization}-${item.role}`}
          >
            <div className="relative md:pl-16">
              <div
                aria-hidden="true"
                className="absolute left-0 top-9 hidden size-10 items-center justify-center rounded-full border border-white/[0.1] bg-[var(--background)] md:flex"
              >
                <span
                  className={`size-2 rounded-full ${
                    item.featured
                      ? "bg-white"
                      : "bg-zinc-700"
                  }`}
                />
              </div>

              <div className="mb-3 flex items-center gap-3 md:hidden">
                <span className="text-[10px] tracking-[0.25em] text-zinc-700">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span
                  aria-hidden="true"
                  className="h-px flex-1 bg-white/[0.06]"
                />
              </div>

              <ExperienceCard {...item} />
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}