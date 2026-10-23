"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Experience } from "@/content";
import { noise1d, seeded } from "@/lib/seeded";
import { cn } from "@/lib/utils";

import { useSpaceProgress } from "../shared/use-space-progress";

/*
 * Race space: the pit wall (spec §5). Scrolling drives a car marker round an original, fictional
 * circuit; each of the six sectors reveals one CV bullet and flips its sector time to fastest-sector
 * purple or personal-best green. Telemetry traces are synthetic (seeded) and labelled illustrative.
 */

const CIRCUIT =
  "M70 214 C44 214 32 192 44 170 L96 78 C108 56 136 52 152 70 L186 110 C196 122 212 122 222 110 L262 58 C276 40 304 42 314 60 L372 160 C386 186 372 214 344 214 L262 214 C246 214 238 200 230 192 C218 180 200 180 190 192 C180 204 170 214 152 214 Z";

const SAMPLES = 160;

function useTraces() {
  return useMemo(() => {
    const base = noise1d(2026, SAMPLES, 9);
    const wobble = noise1d(5, SAMPLES, 4);
    const corners = [0.08, 0.27, 0.41, 0.58, 0.72, 0.9];
    const throttle = base.map((_, i) => {
      const t = i / SAMPLES;
      const dip = Math.max(...corners.map((c) => Math.exp(-((t - c) ** 2) / 0.0012)));
      return Math.min(1, Math.max(0.05, 0.96 - dip * (0.7 + base[i] * 0.3)));
    });
    const brake = throttle.map((v, i) =>
      v < 0.55 ? Math.min(1, (0.6 - v) * 1.9 + wobble[i] * 0.1) : 0,
    );
    const steering = base.map((_, i) => {
      const t = i / SAMPLES;
      return 0.5 + 0.38 * Math.sin(t * Math.PI * 12 + 0.6) * (0.6 + wobble[i] * 0.4);
    });
    const rand = seeded(17);
    const sectorTimes = Array.from({ length: 6 }, () => 18 + rand() * 9);
    const fastest = sectorTimes.indexOf(Math.min(...sectorTimes.map((t, i) => t - (i % 2) * 0.4)));
    return { throttle, brake, steering, sectorTimes, fastest };
  }, []);
}

function polyline(values: number[], height: number) {
  return values
    .map(
      (v, i) =>
        `${((i / (values.length - 1)) * 400).toFixed(1)},${(height - v * (height - 4) - 2).toFixed(1)}`,
    )
    .join(" ");
}

export default function RaceSpace({ item }: { item: Experience }) {
  const { ref, progress, reduced } = useSpaceProgress<HTMLOListElement>();
  const pathRef = useRef<SVGPathElement>(null);
  const [car, setCar] = useState<{ x: number; y: number } | null>(null);
  const [ticks, setTicks] = useState<{ x: number; y: number }[]>([]);
  const { throttle, brake, steering, sectorTimes, fastest } = useTraces();
  const sectors = item.cvBullets.length;
  const active = Math.min(sectors - 1, Math.floor(progress * sectors));
  const complete = progress > 0.97;

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    setTicks(
      Array.from({ length: sectors }, (_, i) => path.getPointAtLength((length * i) / sectors)),
    );
  }, [sectors]);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const point = path.getPointAtLength(path.getTotalLength() * Math.min(0.999, progress));
    setCar({ x: point.x, y: point.y });
  }, [progress]);

  return (
    <section aria-label="Pit wall" className="mx-auto max-w-6xl px-5">
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        {/* Sticky pit-wall screen */}
        <div
          className="top-24 z-10 self-start max-lg:sticky max-lg:top-20 lg:sticky"
          aria-hidden="true"
        >
          <div className="hud glass rounded-md p-4 shadow-depth max-lg:bg-elevated sm:p-5">
            <div className="flex items-center justify-between gap-3 font-mono text-xs">
              <span className="flex items-center gap-2 text-ink">
                <span className="rounded-sm bg-space px-1.5 py-0.5 text-on-accent">P1</span>
                {item.role}
              </span>
              <span className="text-faint max-sm:hidden">
                {item.start} → {item.end}
              </span>
            </div>

            <svg viewBox="0 0 410 250" className="mt-3 w-full max-lg:h-[150px]">
              <path
                d={CIRCUIT}
                fill="none"
                stroke="var(--border-strong)"
                strokeWidth="14"
                strokeLinejoin="round"
              />
              <path
                ref={pathRef}
                d={CIRCUIT}
                fill="none"
                stroke="var(--space-accent)"
                strokeWidth="3"
                strokeLinejoin="round"
                pathLength={1}
                strokeDasharray="1"
                strokeDashoffset={1 - progress}
              />
              {ticks.map((tick, i) => (
                <g key={i}>
                  <circle
                    cx={tick.x}
                    cy={tick.y}
                    r="4"
                    fill="var(--bg)"
                    stroke={i <= active ? "var(--space-accent)" : "var(--text-faint)"}
                    strokeWidth="2"
                  />
                  <text
                    x={tick.x}
                    y={tick.y - 10}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="var(--font-mono)"
                    fill="var(--text-faint)"
                  >
                    S{i + 1}
                  </text>
                </g>
              ))}
              {/* Chequered start/finish line */}
              <g transform="translate(64 204)">
                {[0, 1, 2, 3].map((r) =>
                  [0, 1].map((c) => (
                    <rect
                      key={`${r}${c}`}
                      x={c * 4}
                      y={r * 5}
                      width="4"
                      height="5"
                      fill={(r + c) % 2 ? "var(--text)" : "var(--bg)"}
                    />
                  )),
                )}
              </g>
              {car ? (
                <g transform={`translate(${car.x} ${car.y})`}>
                  <circle r="10" fill="var(--space-accent)" opacity="0.25" />
                  <circle r="5.5" fill="var(--space-accent)" stroke="var(--bg)" strokeWidth="2" />
                </g>
              ) : null}
            </svg>

            <div className="mt-2 grid grid-cols-3 gap-3 max-lg:hidden">
              {[
                { label: "Throttle", values: throttle, color: "var(--space-accent-2)" },
                { label: "Brake", values: brake, color: "var(--space-accent)" },
                { label: "Steering", values: steering, color: "var(--text-muted)" },
              ].map((trace) => (
                <div key={trace.label}>
                  <p className="font-mono text-xs text-faint">{trace.label}</p>
                  <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="mt-1 h-12 w-full">
                    <line x1="0" x2="400" y1="58" y2="58" stroke="var(--border)" />
                    <polyline
                      points={polyline(trace.values, 60)}
                      fill="none"
                      stroke={trace.color}
                      strokeWidth="1.5"
                      vectorEffect="non-scaling-stroke"
                    />
                    <line
                      x1={progress * 400}
                      x2={progress * 400}
                      y1="0"
                      y2="60"
                      stroke="var(--text)"
                      strokeWidth="1"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              ))}
            </div>
            <p className="mt-3 font-mono text-xs text-faint max-lg:hidden">
              Illustrative traces, synthetic data
            </p>

            <div
              className={cn(
                "mt-3 flex items-center justify-between rounded-sm border px-3 py-2 font-mono text-xs transition-all duration-500",
                complete ? "border-space text-ink" : "border-line text-muted",
              )}
            >
              <span>{complete ? "Lap complete" : `Sector ${active + 1} of ${sectors}`}</span>
              <span className="flex gap-0.5">
                {Array.from({ length: 8 }, (_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "size-2",
                      i % 2 ? "bg-ink" : "bg-transparent outline outline-1 outline-line-strong",
                    )}
                  />
                ))}
              </span>
            </div>
          </div>
        </div>

        {/* Sector cards scroll past the screen */}
        <ol ref={ref} className="space-y-5 pb-[20vh] lg:pt-[10vh]" aria-hidden="true">
          {item.cvBullets.map((bullet, i) => {
            const reached = reduced || i <= active;
            const isFastest = i === fastest;
            return (
              <li
                key={bullet}
                className={cn(
                  "hud glass rounded-md p-6 shadow-depth transition-[opacity,transform] duration-500 lg:min-h-[38vh]",
                  reached ? "border-line-strong" : "",
                  i === active && !reduced ? "lg:translate-x-1" : "",
                )}
              >
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-faint">Sector {i + 1}</span>
                  <span
                    className={cn(
                      "rounded-sm px-1.5 py-0.5 tabular-nums transition-colors duration-500",
                      reached
                        ? isFastest
                          ? "bg-space text-on-accent"
                          : "bg-space-2 text-on-accent"
                        : "text-faint",
                    )}
                  >
                    {reached ? sectorTimes[i].toFixed(3) : "--.---"}
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-4 text-lg transition-colors duration-500",
                    reached ? "text-ink" : "text-muted",
                  )}
                >
                  {bullet}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
