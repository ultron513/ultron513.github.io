/* Shared helpers for build scripts: read tokens.css and convert OKLCH to sRGB. */
import { readFileSync } from "node:fs";

export type Oklch = { l: number; c: number; h: number };

const css = readFileSync(new URL("../../src/design/tokens.css", import.meta.url), "utf8");

export function themeBlock(theme: "dark" | "light"): Record<string, string> {
  const selector = `:root[data-theme="${theme}"]`;
  const start = css.indexOf(selector);
  if (start < 0) throw new Error(`Selector not found: ${selector}`);
  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  const vars: Record<string, string> = {};
  for (const match of css.slice(open + 1, close).matchAll(/--([\w-]+):\s*([^;]+);/g))
    vars[match[1]] = match[2].trim();
  return vars;
}

export function parseOklch(value: string): Oklch | null {
  const m = value.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/);
  return m ? { l: Number(m[1]), c: Number(m[2]), h: Number(m[3]) } : null;
}

export function oklchToLinearSrgb({ l, c, h }: Oklch): {
  rgb: [number, number, number];
  inGamut: boolean;
} {
  const a = c * Math.cos((h * Math.PI) / 180);
  const b = c * Math.sin((h * Math.PI) / 180);
  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;
  const rgb: [number, number, number] = [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
  const inGamut = rgb.every((v) => v > -0.001 && v < 1.001);
  return { rgb: rgb.map((v) => Math.min(1, Math.max(0, v))) as [number, number, number], inGamut };
}

export function relativeLuminance(rgb: [number, number, number]): number {
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

export function toHex(value: Oklch): string {
  const encode = (x: number) => (x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055);
  return `#${oklchToLinearSrgb(value)
    .rgb.map((x) =>
      Math.round(encode(x) * 255)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

export function tokenHex(theme: "dark" | "light", name: string): string {
  const parsed = parseOklch(themeBlock(theme)[name] ?? "");
  if (!parsed) throw new Error(`--${name} is not a plain oklch() value in the ${theme} theme`);
  return toHex(parsed);
}
