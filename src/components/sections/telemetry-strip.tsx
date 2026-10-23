import { CountUp } from "@/components/hud/count-up";
import { stats } from "@/content";

/** Computed stats (spec §4 item 3). Every number comes from content, never typed by hand. */
export function TelemetryStrip() {
  const items = [
    { label: "Undergraduate degrees", value: String(stats.degrees) },
    { label: "Job spaces", value: String(stats.experiences) },
    { label: "Projects in orbit", value: String(stats.projects) },
    { label: "LeetCode problems", value: stats.leetcodeSolved },
    { label: "LeetCode global rank", value: stats.leetcodeRank },
    { label: "Codeforces", value: stats.codeforces },
  ];
  return (
    <section aria-label="Telemetry" className="border-y border-line">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="border-line px-5 py-6 [&:not(:last-child)]:border-b sm:[&:not(:last-child)]:border-b-0 lg:border-r lg:last:border-r-0"
          >
            <dt className="font-mono text-xs text-faint">{item.label}</dt>
            <dd className="mt-2 whitespace-nowrap font-display text-xl text-ink lg:text-2xl">
              <CountUp value={item.value} />
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
