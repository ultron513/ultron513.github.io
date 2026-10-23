/*
 * Reads src/design/tokens.css and fails if any text/background token pair drops below
 * WCAG 4.5:1 in either theme, or if a token falls outside the sRGB gamut (spec §2, §7).
 * Run: pnpm check:contrast
 */
import {
  oklchToLinearSrgb,
  parseOklch,
  relativeLuminance,
  themeBlock,
  type Oklch,
} from "./lib/tokens.mts";

function ratio(a: Oklch, b: Oklch): number {
  const la = relativeLuminance(oklchToLinearSrgb(a).rgb);
  const lb = relativeLuminance(oklchToLinearSrgb(b).rgb);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

const TEXT = [
  "text",
  "text-muted",
  "text-faint",
  "accent",
  "accent-2",
  "space-race",
  "space-race-2",
  "space-lab",
  "space-bi",
  "space-search",
  "space-campus",
  "space-terminal",
];
const SURFACES = ["bg", "bg-elevated"];
const MIN = 4.5;

let failures = 0;
let checks = 0;

for (const [theme, label] of [
  ["dark", "Deep Space"],
  ["light", "Daylight Orbit"],
] as const) {
  const vars = themeBlock(theme);
  const rows: string[] = [];
  const get = (name: string) => {
    const v = parseOklch(vars[name] ?? "");
    if (!v) throw new Error(`${label}: --${name} is missing or not a plain oklch() value`);
    return v;
  };
  for (const name of [...TEXT, ...SURFACES, "on-accent"]) {
    if (!oklchToLinearSrgb(get(name)).inGamut) {
      failures++;
      rows.push(`  FAIL --${name} is outside the sRGB gamut`);
    }
  }
  for (const fg of TEXT) {
    for (const bg of SURFACES) {
      checks++;
      const r = ratio(get(fg), get(bg));
      if (r < MIN) failures++;
      rows.push(`  ${r >= MIN ? "ok  " : "FAIL"} --${fg} on --${bg}: ${r.toFixed(2)}:1`);
    }
  }
  checks++;
  const onAccent = ratio(get("on-accent"), get("accent"));
  if (onAccent < MIN) failures++;
  rows.push(
    `  ${onAccent >= MIN ? "ok  " : "FAIL"} --on-accent on --accent: ${onAccent.toFixed(2)}:1`,
  );
  console.log(`${label}\n${rows.join("\n")}\n`);
}

if (failures) {
  console.error(`Contrast check failed: ${failures} problem(s).`);
  process.exit(1);
}
console.log(`Contrast check passed: ${checks} pairs, all ≥ ${MIN}:1 and in gamut.`);
