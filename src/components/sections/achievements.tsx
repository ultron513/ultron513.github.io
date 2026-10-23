import { achievements } from "@/content";

import { Section } from "./section";

export function Achievements() {
  return (
    <Section id="achievements" title="Readouts" intro="Competitive programming and mentoring.">
      <dl className="grid gap-px overflow-hidden rounded-md border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
        {achievements.map((item) => (
          <div key={item.title} className="bg-bg p-6">
            <dt className="text-sm text-muted">{item.title}</dt>
            <dd className="mt-2 font-display text-2xl text-ink">{item.metric}</dd>
            <dd className="mt-3 text-sm text-faint">{item.description}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
