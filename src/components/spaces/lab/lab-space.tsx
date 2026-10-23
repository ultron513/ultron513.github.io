"use client";

import type { Experience } from "@/content";
import { cn } from "@/lib/utils";

import { useSpaceProgress } from "../shared/use-space-progress";

/*
 * Lab space: the research bench (spec §5). A signal pulse travels a four-stage pipeline
 * (raw data → features → model → evaluation) as you scroll; each stage lights up and shows the
 * matching words from the two CV bullets, quoted exactly. The oscilloscope is decorative.
 */

type Stage = { name: string; quote: string; from: 0 | 1 };

function stagesFor(item: Experience): Stage[] {
  const [first, second] = item.cvBullets;
  const pick = (text: string, phrase: string) => (text.includes(phrase) ? phrase : text);
  return [
    {
      name: "Raw data",
      quote: pick(first, "designing end-to-end data processing pipelines"),
      from: 0,
    },
    { name: "Features", quote: pick(first, "performing feature engineering"), from: 0 },
    {
      name: "Model",
      quote: pick(first, "optimizing predictive models using Python and Scikit-learn"),
      from: 0,
    },
    {
      name: "Evaluation",
      quote: pick(
        second ?? first,
        "Conducted applied research through data analysis, model evaluation, and technical documentation",
      ),
      from: 1,
    },
  ];
}

function Oscilloscope({ phase, energy }: { phase: number; energy: number }) {
  const points = Array.from({ length: 121 }, (_, i) => {
    const x = (i / 120) * 400;
    const t = i / 120;
    const y =
      60 +
      Math.sin(t * Math.PI * 6 + phase * 12) *
        (12 + energy * 26) *
        Math.exp(-(((t - 0.5) * 2.2) ** 2)) +
      Math.sin(t * 61 + phase * 30) * 2;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 400 120" className="h-28 w-full" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => (
        <line key={`v${i}`} x1={i * 50} x2={i * 50} y1="0" y2="120" stroke="var(--border)" />
      ))}
      {Array.from({ length: 5 }, (_, i) => (
        <line key={`h${i}`} x1="0" x2="400" y1={i * 30} y2={i * 30} stroke="var(--border)" />
      ))}
      <polyline points={points} fill="none" stroke="var(--space-accent)" strokeWidth="2" />
    </svg>
  );
}

export default function LabSpace({ item }: { item: Experience }) {
  const { ref, progress, reduced } = useSpaceProgress<HTMLDivElement>(["start start", "end end"]);
  const stages = stagesFor(item);
  const position = Math.min(0.999, progress) * stages.length;
  const active = Math.floor(position);

  return (
    <section aria-label="Research bench" className="mx-auto max-w-6xl px-5">
      <div ref={ref} className={cn(reduced ? "" : "lg:h-[220vh]")}>
        <div className="top-24 lg:sticky">
          <div className="hud glass rounded-md p-5 shadow-depth sm:p-7" aria-hidden="true">
            <div className="flex items-center justify-between font-mono text-xs text-faint">
              <span>Bench readout</span>
              <span className="text-space">
                Stage {Math.min(stages.length, active + 1)} of {stages.length}
              </span>
            </div>
            <Oscilloscope phase={progress} energy={reduced ? 1 : (position % 1) * 0.6 + 0.4} />

            {/* Pipeline */}
            <div className="relative mt-6">
              <div className="absolute left-[12.5%] right-[12.5%] top-5 h-px bg-line-strong max-lg:hidden" />
              <div
                className="absolute left-[12.5%] top-5 h-px bg-space transition-[width] duration-150 max-lg:hidden"
                style={{ width: `${Math.min(1, progress) * 75}%` }}
              />
              <div
                className="absolute top-[14px] size-3 -translate-x-1/2 rounded-full bg-space shadow-[0_0_16px_var(--space-accent)] max-lg:hidden"
                style={{ left: `${12.5 + Math.min(1, progress) * 75}%` }}
              />
              <ol className="grid gap-4 lg:grid-cols-4">
                {stages.map((stage, i) => {
                  const lit = reduced || i <= active;
                  return (
                    <li
                      key={stage.name}
                      className="flex flex-col items-start lg:items-center lg:text-center"
                    >
                      <span
                        className={cn(
                          "relative z-10 grid size-10 place-items-center rounded-full border font-mono text-xs transition-colors duration-300",
                          lit
                            ? "border-space bg-elevated text-space"
                            : "border-line-strong bg-elevated text-faint",
                        )}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2
                        className={cn(
                          "mt-3 font-display text-lg transition-colors",
                          lit ? "text-ink" : "text-faint",
                        )}
                      >
                        {stage.name}
                      </h2>
                      <p
                        className={cn(
                          "mt-2 text-sm transition-opacity duration-500",
                          lit ? "text-muted opacity-100" : "opacity-0",
                        )}
                      >
                        “{stage.quote}”
                      </p>
                    </li>
                  );
                })}
              </ol>
            </div>
            <p className="mt-6 font-mono text-xs text-faint">
              Quotes are taken from the CV bullets. The waveform is decorative.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
