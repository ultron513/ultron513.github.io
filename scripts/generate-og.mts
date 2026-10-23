/*
 * Generates the Open Graph cards in public/og/ (spec §8: per-page OG images).
 * GitHub Pages serves files by extension, so cards are plain .png files rather than
 * extension-less Next.js image routes. Colours come from the Deep Space tokens.
 * Re-run after changing content: pnpm og  (validate:content checks every card exists).
 */
import { mkdirSync } from "node:fs";
import sharp from "sharp";

import { experience } from "../src/content/experience.ts";
import { projects } from "../src/content/projects.ts";
import { tokenHex } from "./lib/tokens.mts";

const OUT = "public/og";
mkdirSync(OUT, { recursive: true });

const C = {
  bg: tokenHex("dark", "bg"),
  ink: tokenHex("dark", "text"),
  muted: tokenHex("dark", "text-muted"),
  accent: tokenHex("dark", "accent"),
};
const spaceHex: Record<string, string> = Object.fromEntries(
  ["race", "lab", "bi", "search", "campus", "terminal"].map((key) => [
    key,
    tokenHex("dark", `space-${key}`),
  ]),
);

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(" ")) {
    if ((line + " " + word).trim().length > max) {
      lines.push(line.trim());
      line = word;
    } else line += ` ${word}`;
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}

function card({
  kicker,
  title,
  detail,
  accent,
}: {
  kicker: string;
  title: string;
  detail: string;
  accent: string;
}) {
  let seed = 7;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const stars = Array.from({ length: 90 }, () => {
    const r = rand() * 1.6 + 0.4;
    return `<circle cx="${(rand() * 1200).toFixed(1)}" cy="${(rand() * 630).toFixed(1)}" r="${r.toFixed(2)}" fill="${C.ink}" opacity="${(0.2 + rand() * 0.6).toFixed(2)}"/>`;
  }).join("");
  const titleLines = wrap(title, 30).slice(0, 3);
  const detailLines = wrap(detail, 62).slice(0, 2);
  const titleY = 330 - (titleLines.length - 1) * 38;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${C.bg}"/>
  ${stars}
  <circle cx="1040" cy="640" r="320" fill="none" stroke="${accent}" stroke-opacity="0.55" stroke-width="2"/>
  <circle cx="1040" cy="640" r="250" fill="none" stroke="${accent}" stroke-opacity="0.25" stroke-width="1.5" stroke-dasharray="4 10"/>
  <path d="M80 70 h22 M80 70 v22" stroke="${accent}" stroke-width="3" fill="none"/>
  <text x="80" y="128" font-family="Inter, DejaVu Sans, sans-serif" font-size="28" fill="${accent}">${escape(kicker)}</text>
  ${titleLines
    .map(
      (l, i) =>
        `<text x="80" y="${titleY + i * 76}" font-family="Inter, DejaVu Sans, sans-serif" font-weight="700" font-size="66" letter-spacing="-1.5" fill="${C.ink}">${escape(l)}</text>`,
    )
    .join("")}
  ${detailLines
    .map(
      (l, i) =>
        `<text x="80" y="${titleY + titleLines.length * 76 + 20 + i * 40}" font-family="Inter, DejaVu Sans, sans-serif" font-size="28" fill="${C.muted}">${escape(l)}</text>`,
    )
    .join("")}
  <line x1="80" y1="548" x2="1120" y2="548" stroke="${C.ink}" stroke-opacity="0.14"/>
  <text x="80" y="588" font-family="Inter, DejaVu Sans, sans-serif" font-size="24" fill="${C.muted}">Ashish Kumar Patra</text>
  <text x="1120" y="588" text-anchor="end" font-family="Inter, DejaVu Sans, sans-serif" font-size="24" fill="${C.muted}">ultron513.github.io</text>
</svg>`;
}

const cards: { file: string; kicker: string; title: string; detail: string; accent: string }[] = [
  {
    file: "home",
    kicker: "Mission Control",
    title: "Ashish Kumar Patra",
    detail: "Software engineer, data scientist and AI/ML engineer.",
    accent: C.accent,
  },
  {
    file: "experience",
    kicker: "Orbit map",
    title: "Six modules, six workplaces",
    detail: "McLaren Racing, IIT Guwahati, Microsoft Elevate, ISTA, Stanford and Outlier.AI.",
    accent: C.accent,
  },
  {
    file: "projects",
    kicker: "Satellites",
    title: "Projects in orbit",
    detail: "Machine learning, computer vision, telemetry and business intelligence.",
    accent: C.accent,
  },
  {
    file: "certificates",
    kicker: "Mission patches",
    title: "Certifications",
    detail: "Google, Amazon Web Services and geospatial analysis.",
    accent: C.accent,
  },
  {
    file: "contact",
    kicker: "Comms channel",
    title: "Get in touch",
    detail: "Open to software, AI/ML, data and research opportunities.",
    accent: C.accent,
  },
  {
    file: "cv",
    kicker: "CV",
    title: "Download Ashish's CV",
    detail: "Experience, projects, education and skills in one PDF.",
    accent: C.accent,
  },
  ...experience.map((e) => ({
    file: `experience-${e.slug}`,
    kicker: e.organization,
    title: e.role,
    detail: `${e.location}. ${e.stack.slice(0, 4).join(", ")}.`,
    accent: spaceHex[e.space],
  })),
  ...projects.map((p) => ({
    file: `project-${p.slug}`,
    kicker: p.category,
    title: p.shortTitle,
    detail: p.technologies.slice(0, 6).join(", "),
    accent: C.accent,
  })),
];

for (const c of cards) {
  await sharp(Buffer.from(card(c)))
    .png({ compressionLevel: 9, palette: true, quality: 90 })
    .toFile(`${OUT}/${c.file}.png`);
}
console.log(`Generated ${cards.length} Open Graph cards in ${OUT}/`);
