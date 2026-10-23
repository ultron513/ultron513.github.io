"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

import { getProject, projectImage, type Experience } from "@/content";
import { EASE_OUT, usePrefersReducedMotion } from "@/lib/motion";
import { noise1d, seeded } from "@/lib/seeded";
import { cn } from "@/lib/utils";

/*
 * BI space: the control room (spec §5). A wall of panels assembles itself one by one: KPI cards,
 * a trend line, city rankings, a stylised map and filter chips (all named in the CV). Every number
 * is synthetic and labelled illustrative. Each CV bullet annotates the panels it describes.
 */

const CITIES = [
  { name: "Delhi", x: 0.36, y: 0.24 },
  { name: "Kolkata", x: 0.74, y: 0.47 },
  { name: "Mumbai", x: 0.18, y: 0.6 },
  { name: "Pune", x: 0.22, y: 0.66 },
  { name: "Hyderabad", x: 0.4, y: 0.7 },
  { name: "Bhubaneswar", x: 0.64, y: 0.58 },
  { name: "Bengaluru", x: 0.34, y: 0.86 },
  { name: "Chennai", x: 0.46, y: 0.86 },
];

function useData() {
  const rand = seeded(2026_02);
  const values = CITIES.map((city) => ({ ...city, aqi: Math.round(60 + rand() * 180) })).sort(
    (a, b) => b.aqi - a.aqi,
  );
  const trend = noise1d(42, 12, 2).map(
    (v, i) => 90 + v * 110 + Math.cos((i / 12) * Math.PI * 2) * 45,
  );
  const average = Math.round(values.reduce((sum, c) => sum + c.aqi, 0) / values.length);
  return { values, trend, average, worst: values[0] };
}

function Panel({
  index,
  show,
  className,
  title,
  children,
}: {
  index: number;
  show: boolean;
  className?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={false}
      animate={show ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: 0.45, delay: show ? index * 0.12 : 0, ease: EASE_OUT }}
      className={cn("rounded-sm border border-line bg-bg p-4", className)}
    >
      <p className="font-mono text-xs text-faint">{title}</p>
      {children}
    </motion.div>
  );
}

function Annotation({
  number,
  text,
  show,
  delay,
}: {
  number: number;
  text: string;
  show: boolean;
  delay: number;
}) {
  return (
    <motion.li
      initial={false}
      animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
      transition={{ duration: 0.4, delay: show ? delay : 0, ease: EASE_OUT }}
      className="flex gap-3 border-t border-line pt-4 text-sm text-muted"
    >
      <span className="grid size-6 shrink-0 place-items-center rounded-full bg-space font-mono text-xs text-on-accent">
        {number}
      </span>
      <span>{text}</span>
    </motion.li>
  );
}

export default function BiSpace({ item }: { item: Experience }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const reduced = usePrefersReducedMotion();
  const show = reduced || inView;
  const { values, trend, average, worst } = useData();
  const max = Math.max(...trend);
  const min = Math.min(...trend);
  const project = getProject("air-quality-monitoring-dashboard");

  const trendPoints = trend
    .map((v, i) => `${(i / (trend.length - 1)) * 300},${90 - ((v - min) / (max - min)) * 80}`)
    .join(" ");

  return (
    <section aria-label="Control room" className="mx-auto max-w-6xl px-5">
      <div ref={ref} className="grid gap-6 lg:grid-cols-[1fr_20rem]">
        <div
          className="hud rounded-md border border-line bg-elevated p-4 shadow-depth sm:p-5"
          aria-hidden="true"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-display text-ink">Air quality across Indian cities</p>
            <div className="flex flex-wrap gap-1.5">
              {["2025", "All cities", "PM2.5"].map((chip, i) => (
                <span
                  key={chip}
                  className={cn(
                    "rounded-full border px-2.5 py-0.5 font-mono text-xs",
                    i === 0 ? "border-space text-space" : "border-line text-muted",
                  )}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              { label: "Average AQI", value: String(average) },
              { label: "Worst city", value: worst.name },
              { label: "Peak AQI", value: String(worst.aqi) },
              { label: "Cities tracked", value: String(CITIES.length) },
            ].map((kpi, i) => (
              <Panel key={kpi.label} index={i} show={show} title={kpi.label}>
                <p className="mt-2 font-display text-xl text-ink">{kpi.value}</p>
              </Panel>
            ))}
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-[1.4fr_1fr]">
            <Panel index={4} show={show} title="Monthly trend">
              <svg viewBox="0 0 300 100" className="mt-2 h-32 w-full" preserveAspectRatio="none">
                <polyline
                  points={`0,100 ${trendPoints} 300,100`}
                  fill="var(--space-accent)"
                  opacity="0.12"
                />
                <polyline
                  points={trendPoints}
                  fill="none"
                  stroke="var(--space-accent)"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <div className="flex justify-between font-mono text-xs text-faint">
                <span>Jan</span>
                <span>Jun</span>
                <span>Dec</span>
              </div>
            </Panel>
            <Panel index={5} show={show} title="Pollution map">
              <svg viewBox="0 0 200 160" className="mt-2 h-32 w-full">
                {Array.from({ length: 9 }, (_, r) =>
                  Array.from({ length: 12 }, (_, c) => (
                    <circle
                      key={`${r}-${c}`}
                      cx={10 + c * 16 + (r % 2) * 8}
                      cy={10 + r * 17}
                      r="1.2"
                      fill="var(--border-strong)"
                    />
                  )),
                )}
                {values.map((city) => (
                  <circle
                    key={city.name}
                    cx={city.x * 200}
                    cy={city.y * 160}
                    r={3 + (city.aqi / 240) * 7}
                    fill="var(--space-accent)"
                    opacity={0.25 + (city.aqi / 240) * 0.6}
                  />
                ))}
              </svg>
            </Panel>
          </div>

          <Panel index={6} show={show} title="City rankings" className="mt-3">
            <ol className="mt-3 space-y-1.5">
              {values.map((city) => (
                <li
                  key={city.name}
                  className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-3 text-xs"
                >
                  <span className="text-muted">{city.name}</span>
                  <span className="h-2 rounded-full bg-line">
                    <motion.span
                      className="block h-full rounded-full bg-space"
                      initial={false}
                      animate={{ width: show ? `${(city.aqi / 260) * 100}%` : "0%" }}
                      transition={{ duration: 0.7, delay: show ? 0.9 : 0, ease: EASE_OUT }}
                    />
                  </span>
                  <span className="text-right font-mono text-ink">{city.aqi}</span>
                </li>
              ))}
            </ol>
          </Panel>
          <p className="mt-3 font-mono text-xs text-faint">
            Illustrative data. The panel layout mirrors the real dashboard; the numbers are
            synthetic.
          </p>
        </div>

        <div className="space-y-6">
          <ol className="space-y-4" aria-hidden="true">
            {item.cvBullets.map((bullet, i) => (
              <Annotation
                key={bullet}
                number={i + 1}
                text={bullet}
                show={show}
                delay={1.1 + i * 0.15}
              />
            ))}
          </ol>
          {project ? (
            <Link
              href={`/projects/${project.slug}/`}
              className="group block overflow-hidden rounded-md border border-line transition-colors hover:border-space"
            >
              <img
                src={projectImage(project.image, 800)}
                alt={`${project.title} built in Power BI`}
                width={800}
                height={533}
                loading="lazy"
                className="w-full"
              />
              <span className="block p-4 text-sm text-ink group-hover:text-space">
                See the real dashboard project
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
