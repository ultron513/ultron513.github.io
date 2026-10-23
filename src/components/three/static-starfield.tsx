import { seeded } from "@/lib/seeded";

/**
 * Static starfield image (spec §7 low-power and reduced-motion fallback). Deterministic SVG:
 * stars in Deep Space, constellation lines in Daylight Orbit (via [data-theme] CSS).
 */
export function StaticStarfield({
  className,
  density = 160,
}: {
  className?: string;
  density?: number;
}) {
  const rand = seeded(1729);
  const stars = Array.from({ length: density }, () => ({
    x: rand() * 1600,
    y: rand() * 900,
    r: 0.4 + Math.pow(rand(), 5) * 2.2,
    o: 0.25 + rand() * 0.65,
  }));
  const bright = stars.filter((s) => s.r > 1.1).slice(0, 26);
  const lines = bright.flatMap((s, i) => {
    const next = bright
      .filter((_, j) => j !== i)
      .sort((a, b) => Math.hypot(a.x - s.x, a.y - s.y) - Math.hypot(b.x - s.x, b.y - s.y))[0];
    return next && Math.hypot(next.x - s.x, next.y - s.y) < 320 ? [[s, next] as const] : [];
  });
  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className={className}
    >
      <g
        className="opacity-0 [[data-theme=light]_&]:opacity-100"
        stroke="var(--scene-line)"
        strokeWidth="1"
      >
        {lines.map(([a, b], i) => (
          <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
        ))}
      </g>
      <g fill="var(--scene-star)">
        {stars.map((s, i) => (
          <circle
            key={i}
            cx={s.x.toFixed(1)}
            cy={s.y.toFixed(1)}
            r={s.r.toFixed(2)}
            opacity={s.o.toFixed(2)}
          />
        ))}
      </g>
    </svg>
  );
}
