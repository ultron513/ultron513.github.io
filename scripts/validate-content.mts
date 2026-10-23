/*
 * Validates every content file against its Zod schema (spec §3).
 * Runs before every build (`prebuild`). Fails the build on the first invalid entry.
 * Run: node --experimental-strip-types scripts/validate-content.mts
 */
import { existsSync } from "node:fs";
import { join } from "node:path";
import { z } from "zod";

import {
  AchievementSchema,
  CertificationSchema,
  EducationSchema,
  ExperienceSchema,
  NavItemSchema,
  ProfileSchema,
  ProjectSchema,
  SkillGroupSchema,
} from "../src/content/schema.ts";
import {
  achievements,
  certifications,
  education,
  navigation,
  skills,
} from "../src/content/catalog.ts";
import { experience } from "../src/content/experience.ts";
import { profile } from "../src/content/profile.ts";
import { projects } from "../src/content/projects.ts";

const root = process.cwd();
const errors: string[] = [];

function check<T>(name: string, schema: z.ZodType<T>, value: unknown) {
  const result = schema.safeParse(value);
  if (!result.success) errors.push(`${name}:\n${z.prettifyError(result.error)}`);
}

function publicFile(path: string, owner: string) {
  if (!existsSync(join(root, "public", path))) errors.push(`${owner}: missing file public${path}`);
}

check("profile", ProfileSchema, profile);
check("experience", z.array(ExperienceSchema).length(6), experience);
check("projects", z.array(ProjectSchema).min(1), projects);
check("skills", z.array(SkillGroupSchema), skills);
check("education", z.array(EducationSchema), education);
check("certifications", z.array(CertificationSchema), certifications);
check("achievements", z.array(AchievementSchema), achievements);
check("navigation", z.array(NavItemSchema), navigation);

const slugs = new Set(projects.map((p) => p.slug));
for (const item of experience) {
  for (const link of item.links)
    if (!slugs.has(link)) errors.push(`experience/${item.slug}: unknown project "${link}"`);
  if (item.start > item.end) errors.push(`experience/${item.slug}: start is after end`);
  if (item.image) publicFile(item.image, `experience/${item.slug}`);
}
const spaces = experience.map((e) => e.space);
if (new Set(spaces).size !== spaces.length)
  errors.push("experience: each space key must be used exactly once");
for (const p of projects) {
  publicFile(p.image, `projects/${p.slug}`);
  publicFile(p.image.replace(/\.webp$/, "-800.webp"), `projects/${p.slug}`);
}
for (const c of certifications) publicFile(c.image, `certifications/${c.title}`);
publicFile(profile.cv.path, "profile.cv");
for (const card of [
  "home",
  "experience",
  "projects",
  "certificates",
  "contact",
  "cv",
  ...experience.map((e) => `experience-${e.slug}`),
  ...projects.map((p) => `project-${p.slug}`),
]) {
  publicFile(`/og/${card}.png`, "og (run pnpm og)");
}

if (errors.length) {
  console.error(`Content validation failed (${errors.length}):\n\n${errors.join("\n\n")}`);
  process.exit(1);
}
console.log(
  `Content valid: ${experience.length} experiences, ${projects.length} projects, ${certifications.length} certifications.`,
);
