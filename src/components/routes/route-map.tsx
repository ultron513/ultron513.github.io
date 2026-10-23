"use client";

import { useInView } from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

import { experience, formatPeriod, moduleId, profile, type Experience } from "@/content";
import { distanceKm, MAP, MAP_HEIGHT, project } from "@/lib/geo";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Route map (amendment A5): a flat world map with dotted routes from home base in Bhubaneswar
 * to every place the work was based. Land is a dot matrix generated from Natural Earth
 * (scripts/generate-world-map.mts) and drawn through a CSS mask, so it follows the theme.
 * Destinations are real links laid over the SVG: focusable, keyboard-navigable (arrow keys)
 * and named for screen readers. Remote programmes get hollow markers and a "Remote" tag.
 */

const HOME = profile.location;
const home = project(HOME.lat, HOME.lon);

type Side = "left" | "right" | "top" | "bottom";

/** Presentation only: label side per station, plus a nudge for stations that overlap at world scale. */
const LAYOUT: Record<string, { side: Side; nudge?: { x: number; y: number } }> = {
  "mclaren-racing": { side: "left" },
  ista: { side: "right" },
  "iit-guwahati": { side: "right" },
  "microsoft-elevate": { side: "top" },
  // Stanford and San Francisco are ~50 km apart: the same pixel on a world map. Nudge them apart.
  "stanford-code-in-place": { side: "left", nudge: { x: 0, y: 9 } },
  "outlier-ai": { side: "left", nudge: { x: 0, y: -9 } },
};

type Station = Experience & {
  point: { x: number; y: number };
  marker: { x: number; y: number };
  km: number;
  route: string;
};

function arc(from: { x: number; y: number }, to: { x: number; y: number }) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const length = Math.hypot(to.x - from.x, to.y - from.y);
  // Short and medium routes arc clearly; the long trans-Atlantic ones stay flat so they pass
  // below the European stations instead of through them.
  const lift = length < 400 ? length * 0.35 : length * 0.08;
  return `M${from.x.toFixed(1)} ${from.y.toFixed(1)} Q${mx.toFixed(1)} ${(my - lift).toFixed(1)} ${to.x.toFixed(1)} ${to.y.toFixed(1)}`;
}

const stations: Station[] = experience.map((item) => {
  const point = project(item.site.lat, item.site.lon);
  const nudge = LAYOUT[item.slug]?.nudge ?? { x: 0, y: 0 };
  const marker = { x: point.x + nudge.x, y: point.y + nudge.y };
  return { ...item, point, marker, km: distanceKm(HOME, item.site), route: arc(home, marker) };
});

/*
 * Small screens see a cropped window (130°W–105°E, 72°N–10°S): every route, about 1.5× larger.
 * From md up, the whole world is shown. The window is applied with CSS custom properties.
 */
const CROP = (() => {
  const a = project(72, -130);
  const b = project(-10, 105);
  const w = b.x - a.x;
  const h = b.y - a.y;
  return {
    ratio: w / h,
    width: (MAP.width / w) * 100,
    height: (MAP_HEIGHT / h) * 100,
    left: (-a.x / w) * 100,
    top: (-a.y / h) * 100,
  };
})();

const CROP_CSS = `
.route-frame{aspect-ratio:${CROP.ratio.toFixed(4)}}
.route-layer{width:${CROP.width.toFixed(3)}%;height:${CROP.height.toFixed(3)}%;left:${CROP.left.toFixed(3)}%;top:${CROP.top.toFixed(3)}%}
@media (min-width:768px){.route-frame{aspect-ratio:${(MAP.width / MAP_HEIGHT).toFixed(4)}}.route-layer{width:100%;height:100%;left:0;top:0}}
`;

const km = (value: number) => `${Math.round(value).toLocaleString("en-IN")} km`;
const pct = (value: number, total: number) => `${(value / total) * 100}%`;

const LABEL_POSITION: Record<Side, string> = {
  left: "right-full top-1/2 mr-1 -translate-y-1/2 text-right",
  right: "left-full top-1/2 ml-1 -translate-y-1/2",
  top: "bottom-full left-1/2 mb-0.5 -translate-x-1/2 text-center",
  bottom: "top-full left-1/2 mt-0.5 -translate-x-1/2 text-center",
};

function Readout({ item }: { item: Station }) {
  return (
    <div
      data-space={item.space}
      className="hud glass grid gap-6 rounded-md p-6 shadow-depth lg:grid-cols-[1fr_1.6fr_auto] lg:items-center"
      aria-live="polite"
    >
      <div>
        <p className="font-mono text-xs text-faint">
          {moduleId(item.slug)} · {item.start} → {item.end}
        </p>
        <h3 className="mt-2 font-display text-xl text-ink">{item.organization}</h3>
        <p className="mt-1 text-sm text-muted">{item.role}</p>
      </div>
      <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
        <div>
          <dt className="font-mono text-xs text-faint">Route</dt>
          <dd className="mt-1 text-ink">
            {HOME.city} → {item.site.label}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-faint">Distance</dt>
          <dd className="mt-1 tabular-nums text-ink">{km(item.km)}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-faint">Period</dt>
          <dd className="mt-1 text-ink">{formatPeriod(item)}</dd>
        </div>
        <div>
          <dt className="font-mono text-xs text-faint">Mode</dt>
          <dd className="mt-1 text-ink">{item.site.remote ? "Remote" : "On-site"}</dd>
        </div>
      </dl>
      <Link
        href={`/experience/${item.slug}/`}
        tabIndex={-1}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-line-strong px-4 py-2 text-sm text-ink transition-colors hover:border-space hover:text-space"
      >
        Dock with {item.shortName}
      </Link>
    </div>
  );
}

export function RouteMap({ headingId }: { headingId: string }) {
  const [active, setActive] = useState(0);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);
  const frame = useRef<HTMLDivElement>(null);
  const inView = useInView(frame, { once: true, margin: "-10% 0px" });
  const reduced = usePrefersReducedMotion();
  const drawn = reduced || inView;

  function onKeyDown(event: React.KeyboardEvent) {
    const delta =
      event.key === "ArrowRight" || event.key === "ArrowDown"
        ? 1
        : event.key === "ArrowLeft" || event.key === "ArrowUp"
          ? -1
          : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + stations.length) % stations.length;
    setActive(next);
    links.current[next]?.focus();
  }

  return (
    <div className="space-y-6">
      <div>
        <div
          ref={frame}
          className="route-frame hud relative overflow-hidden rounded-md border border-line bg-elevated/40"
        >
          <style>{CROP_CSS}</style>
          <div className="route-layer absolute">
            {/* Land: dot matrix through a mask, coloured by the theme */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-faint opacity-40 [transform:translateZ(0)]"
              style={{
                maskImage: "url(/images/world-dots.svg)",
                WebkitMaskImage: "url(/images/world-dots.svg)",
                maskSize: "100% 100%",
                WebkitMaskSize: "100% 100%",
              }}
            />

            <svg
              viewBox={`0 0 ${MAP.width} ${MAP_HEIGHT}`}
              aria-hidden="true"
              className="absolute inset-0 size-full"
            >
              <defs>
                {stations.map((station, i) => (
                  <mask
                    key={station.slug}
                    id={`route-mask-${station.slug}`}
                    maskUnits="userSpaceOnUse"
                  >
                    <path
                      d={station.route}
                      pathLength={1}
                      fill="none"
                      stroke="white"
                      strokeWidth="12"
                      strokeDasharray="1 1"
                      strokeDashoffset={drawn ? 0 : 1}
                      style={{
                        transition: reduced
                          ? undefined
                          : `stroke-dashoffset 1.3s cubic-bezier(0.22,1,0.36,1) ${0.15 + i * 0.14}s`,
                      }}
                    />
                  </mask>
                ))}
              </defs>

              {/* Graticule every 30°, plus the equator */}
              <g stroke="var(--border)" strokeWidth="1" vectorEffect="non-scaling-stroke">
                {[-150, -120, -90, -60, -30, 0, 30, 60, 90, 120, 150].map((lon) => {
                  const { x } = project(0, lon);
                  return (
                    <line
                      key={`m${lon}`}
                      x1={x}
                      x2={x}
                      y1={0}
                      y2={MAP_HEIGHT}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
                {[60, 30, 0, -30].map((lat) => {
                  const { y } = project(lat, 0);
                  return (
                    <line
                      key={`p${lat}`}
                      x1={0}
                      x2={MAP.width}
                      y1={y}
                      y2={y}
                      strokeDasharray={lat === 0 ? undefined : "2 6"}
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </g>
              <g
                className="max-md:hidden"
                fontFamily="var(--font-mono)"
                fontSize="9"
                fill="var(--text-faint)"
              >
                {[60, 30, 0, -30].map((lat) => (
                  <text key={lat} x={6} y={project(lat, 0).y - 4}>
                    {lat === 0 ? "0°" : `${Math.abs(lat)}°${lat > 0 ? "N" : "S"}`}
                  </text>
                ))}
              </g>

              {/* Routes: dotted, drawn in from home base, the active one flows */}
              {stations.map((station, i) => {
                const selected = i === active;
                return (
                  <g
                    key={station.slug}
                    data-space={station.space}
                    mask={`url(#route-mask-${station.slug})`}
                  >
                    <path
                      d={station.route}
                      fill="none"
                      stroke="var(--space-accent)"
                      strokeWidth={selected ? 3.4 : 2.6}
                      strokeLinecap="round"
                      strokeDasharray={station.site.remote ? "0 9" : "0 6"}
                      strokeOpacity={selected ? 1 : 0.8}
                      vectorEffect="non-scaling-stroke"
                      className="transition-[stroke-opacity,stroke-width] duration-300"
                    />
                  </g>
                );
              })}

              {/* Leader lines for nudged stations */}
              {stations
                .filter((s) => s.marker.x !== s.point.x || s.marker.y !== s.point.y)
                .map((s) => (
                  <line
                    key={`lead-${s.slug}`}
                    x1={s.point.x}
                    y1={s.point.y}
                    x2={s.marker.x}
                    y2={s.marker.y}
                    stroke="var(--text-faint)"
                    strokeWidth="1"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              {stations
                .filter((s) => s.marker.x !== s.point.x || s.marker.y !== s.point.y)
                .slice(0, 1)
                .map((s) => (
                  <circle
                    key="true-point"
                    cx={s.point.x}
                    cy={s.point.y}
                    r="1.6"
                    fill="var(--text-faint)"
                  />
                ))}

              {/* Home base */}
              <g>
                <circle
                  cx={home.x}
                  cy={home.y}
                  r="4.5"
                  fill="var(--accent)"
                  stroke="var(--bg)"
                  strokeWidth="1.5"
                />
              </g>
            </svg>

            {/* Home pulse: an HTML element animated with transform/opacity only, so it runs on the compositor */}
            <span
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute size-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/30",
                !reduced && "animate-[home-pulse_2.4s_ease-out_infinite]",
              )}
              style={{ left: pct(home.x, MAP.width), top: pct(home.y, MAP_HEIGHT) }}
            />

            {/* Home label */}
            <p
              className="pointer-events-none absolute -translate-x-1/2 pt-2 text-center font-mono text-[10px] leading-tight text-ink max-sm:hidden sm:text-xs"
              style={{ left: pct(home.x, MAP.width), top: pct(home.y, MAP_HEIGHT) }}
            >
              {HOME.city}
              <span className="block text-faint">home base</span>
            </p>

            {/* Stations: real links over the map */}
            <ul aria-labelledby={headingId} onKeyDown={onKeyDown} className="absolute inset-0">
              {stations.map((station, i) => {
                const selected = i === active;
                const side = LAYOUT[station.slug]?.side ?? "right";
                return (
                  <li
                    key={station.slug}
                    data-space={station.space}
                    className="absolute"
                    style={{
                      left: pct(station.marker.x, MAP.width),
                      top: pct(station.marker.y, MAP_HEIGHT),
                    }}
                  >
                    <Link
                      ref={(node) => {
                        links.current[i] = node;
                      }}
                      href={`/experience/${station.slug}/`}
                      tabIndex={selected ? 0 : -1}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-label={`${station.organization}, ${station.site.label}${station.site.remote ? ", remote" : ""}`}
                      aria-describedby={selected ? "route-readout" : undefined}
                      className="group absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-2"
                    >
                      <span
                        className={cn(
                          "block size-2.5 rounded-full border-2 border-space transition-transform duration-300 md:size-3",
                          station.site.remote ? "bg-bg" : "bg-space",
                          selected ? "scale-150" : "group-hover:scale-125",
                        )}
                      />
                      {selected ? (
                        <span className="pointer-events-none absolute inset-0 m-auto size-6 rounded-full border border-space opacity-50" />
                      ) : null}
                      <span
                        className={cn(
                          "pointer-events-none absolute whitespace-nowrap rounded-full px-1.5 py-0.5 font-mono text-xs transition-colors max-md:hidden",
                          LABEL_POSITION[side],
                          selected ? "bg-elevated text-ink" : "bg-bg/70 text-muted",
                        )}
                      >
                        {station.shortName}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-faint">
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-accent" aria-hidden="true" /> Home base
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full bg-muted" aria-hidden="true" /> On-site
          </span>
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full border-2 border-muted" aria-hidden="true" />{" "}
            Remote
          </span>
          <span className="ml-auto max-sm:ml-0">Coastlines: Natural Earth, public domain</span>
        </div>
      </div>

      <div id="route-readout" className="max-lg:hidden">
        <Readout item={stations[active]} />
      </div>

      {/* Below the large breakpoint: every route as a list */}
      <ol aria-label="Routes from Bhubaneswar" className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {stations.map((station) => (
          <li key={station.slug} data-space={station.space}>
            <Link
              href={`/experience/${station.slug}/`}
              className="hud glass flex items-center gap-4 rounded-md p-4"
            >
              <span
                className={cn(
                  "size-3 shrink-0 rounded-full border-2 border-space",
                  station.site.remote ? "bg-bg" : "bg-space",
                )}
                aria-hidden="true"
              />
              <span className="min-w-0 flex-1">
                <span className="block font-display text-ink">{station.organization}</span>
                <span className="block truncate text-sm text-muted">
                  {station.site.label}
                  {station.site.remote ? ", remote" : ""}
                </span>
              </span>
              <span className="shrink-0 font-mono text-xs tabular-nums text-faint">
                {km(station.km)}
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
