import { education } from "@/content";

import { Section } from "./section";

/** Education as a vertical trajectory, newest waypoint first (spec §4 item 7). */
export function FlightTraining() {
  const ordered = [...education].sort((a, b) => Number(b.year) - Number(a.year));
  return (
    <Section
      id="training"
      title="Flight training"
      intro="Dual undergraduate degrees, running in parallel."
    >
      <ol className="relative ml-2 border-l border-line-strong">
        {ordered.map((item) => (
          <li key={item.qualification} className="relative pb-10 pl-8 last:pb-0">
            <span
              aria-hidden="true"
              className={`absolute -left-[7px] top-1.5 size-3.5 rounded-full border-2 border-bg ${item.level === "Undergraduate" ? "bg-accent" : "bg-line-strong"}`}
            />
            <div className="grid gap-1 sm:grid-cols-[7rem_1fr_auto] sm:gap-6">
              <p className="font-mono text-sm text-faint">{item.year}</p>
              <div>
                <h3 className="font-display text-lg text-ink">{item.qualification}</h3>
                <p className="text-sm text-muted">
                  {item.institution}
                  {item.board !== item.institution ? `, ${item.board}` : ""}
                </p>
              </div>
              <p className="font-mono text-sm text-ink">{item.score}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
