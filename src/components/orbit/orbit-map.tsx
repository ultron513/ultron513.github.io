"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import { experience, formatPeriod, moduleId, type Experience } from "@/content";
import { cn } from "@/lib/utils";

/*
 * Orbit map (spec §4): six job spaces on three rings around a central core.
 * Ring order follows dates: the two most recent modules sit on the inner ring.
 * Stations are real links placed over the SVG, so they get native focus, keyboard and screen-reader support;
 * arrow keys also move between stations.
 */

const VIEW = { w: 640, h: 440, cx: 320, cy: 220 };
const RINGS = [
  { rx: 118, ry: 62 },
  { rx: 196, ry: 116 },
  { rx: 276, ry: 172 },
];
/** Angle (degrees) for each station, newest first, two per ring. */
const ANGLES = [205, 25, 150, 330, 255, 75];

function position(index: number) {
  const ring = RINGS[Math.floor(index / 2)];
  const angle = (ANGLES[index] * Math.PI) / 180;
  return { x: VIEW.cx + ring.rx * Math.cos(angle), y: VIEW.cy + ring.ry * Math.sin(angle) };
}

function Readout({ item }: { item: Experience }) {
  return (
    <div
      data-space={item.space}
      className="hud glass flex h-full flex-col rounded-md p-6 shadow-depth"
      aria-live="polite"
    >
      <p className="font-mono text-xs text-faint">
        {moduleId(item.slug)} · {item.start} → {item.end}
      </p>
      <h3 className="mt-3 font-display text-xl text-ink">{item.organization}</h3>
      <p className="mt-1 text-muted">{item.role}</p>
      <dl className="mt-5 grid grid-cols-2 gap-4 text-sm">
        <div>
          <dt className="font-mono text-xs text-faint">Period</dt>
          <dd className="mt-1 text-ink">{formatPeriod(item)}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-faint">Location</dt>
          <dd className="mt-1 text-ink">{item.location}</dd>
        </div>
      </dl>
      <p className="mt-5 line-clamp-4 text-sm text-muted">{item.cvBullets[0]}</p>
      <div className="mt-auto pt-6">
        <Link
          href={`/experience/${item.slug}/`}
          tabIndex={-1}
          className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-space hover:text-space"
        >
          Dock with {item.shortName}
        </Link>
      </div>
    </div>
  );
}

export function OrbitMap({ headingId }: { headingId: string }) {
  const [active, setActive] = useState(0);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);

  function onKeyDown(event: React.KeyboardEvent) {
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + experience.length) % experience.length;
    setActive(next);
    links.current[next]?.focus();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
      {/* Desktop and tablet: the map */}
      <div className="relative hidden md:block" style={{ aspectRatio: `${VIEW.w} / ${VIEW.h}` }}>
        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          aria-hidden="true"
          className="absolute inset-0 size-full"
        >
          <defs>
            <radialGradient id="orbit-core">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="60%" stopColor="var(--accent)" stopOpacity="0.15" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          {RINGS.map((ring, i) => (
            <ellipse
              key={i}
              cx={VIEW.cx}
              cy={VIEW.cy}
              rx={ring.rx}
              ry={ring.ry}
              fill="none"
              stroke="var(--border-strong)"
              strokeDasharray={i === 0 ? "none" : "2 7"}
              className={i === 0 ? undefined : "animate-[orbit-drift_90s_linear_infinite]"}
            />
          ))}
          <circle cx={VIEW.cx} cy={VIEW.cy} r="46" fill="url(#orbit-core)" />
          <circle cx={VIEW.cx} cy={VIEW.cy} r="9" fill="var(--accent)" />
          {experience.map((item, i) => {
            const p = position(i);
            return (
              <line
                key={item.slug}
                x1={VIEW.cx}
                y1={VIEW.cy}
                x2={p.x}
                y2={p.y}
                stroke="var(--accent)"
                strokeOpacity={i === active ? 0.6 : 0}
                strokeDasharray="3 5"
                className="transition-[stroke-opacity] duration-300"
              />
            );
          })}
        </svg>

        <ul aria-labelledby={headingId} onKeyDown={onKeyDown} className="absolute inset-0">
          {experience.map((item, i) => {
            const p = position(i);
            const selected = i === active;
            return (
              <li
                key={item.slug}
                data-space={item.space}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${(p.x / VIEW.w) * 100}%`, top: `${(p.y / VIEW.h) * 100}%` }}
              >
                <Link
                  ref={(node) => {
                    links.current[i] = node;
                  }}
                  href={`/experience/${item.slug}/`}
                  tabIndex={selected ? 0 : -1}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-describedby={selected ? "orbit-readout" : undefined}
                  className="group flex flex-col items-center gap-2 rounded-md p-2"
                >
                  <span
                    className={cn(
                      "relative grid size-7 place-items-center rounded-full border transition-transform duration-300",
                      selected
                        ? "scale-125 border-space"
                        : "border-line-strong group-hover:border-space",
                    )}
                  >
                    <span className="size-2.5 rounded-full bg-space" />
                    {selected ? (
                      <span className="absolute inset-[-6px] rounded-full border border-space opacity-40" />
                    ) : null}
                  </span>
                  <span
                    className={cn(
                      "whitespace-nowrap rounded-full px-2 py-0.5 text-xs transition-colors",
                      selected ? "bg-elevated text-ink" : "text-muted",
                    )}
                  >
                    {item.shortName}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div id="orbit-readout" className="hidden md:block">
        <Readout item={experience[active]} />
      </div>

      {/* Mobile: launch manifest */}
      <ol aria-labelledby={headingId} className="flex flex-col gap-3 md:hidden">
        {experience.map((item) => (
          <li key={item.slug} data-space={item.space}>
            <Link
              href={`/experience/${item.slug}/`}
              className="hud glass flex items-center gap-4 rounded-md p-4"
            >
              <span className="size-2.5 shrink-0 rounded-full bg-space" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-ink">{item.organization}</span>
                <span className="block truncate text-sm text-muted">{item.role}</span>
              </span>
              <span className="shrink-0 font-mono text-xs text-faint">
                {item.start.slice(0, 4)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
