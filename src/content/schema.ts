import { z } from "zod";

/*
 * Content schemas (spec §3). Types are inferred from these schemas.
 * Runtime validation happens at build time (`pnpm validate:content`, run by `prebuild`),
 * so zod never ships to the browser: content files only use `import type`.
 */

const isoMonth = z.string().regex(/^\d{4}-(0[1-9]|1[0-2])$/, "Use an ISO month, e.g. 2026-05");
const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a kebab-case slug");
const url = z.url();

export const SPACE_KEYS = ["race", "lab", "bi", "search", "campus", "terminal"] as const;
export const SpaceKey = z.enum(SPACE_KEYS);

export const ProfileSchema = z.object({
  name: z.string(),
  shortName: z.string(),
  wordmark: z.string(),
  roles: z.array(z.string()).min(1),
  headline: z.string(),
  introduction: z.string(),
  location: z.object({ city: z.string(), country: z.string(), lat: z.number(), lon: z.number() }),
  contact: z.object({ email: z.email(), linkedin: url, github: url }),
  competitiveProgramming: z.object({
    leetcodeRank: z.string(),
    leetcodeSolved: z.string(),
    codeforces: z.string(),
  }),
  availability: z.string(),
  cv: z.object({ path: z.string().startsWith("/"), fileName: z.string().endsWith(".pdf") }),
});

export const ExperienceSchema = z.object({
  slug,
  space: SpaceKey,
  organization: z.string(),
  role: z.string(),
  location: z.string(),
  start: isoMonth,
  end: isoMonth,
  /** Copied verbatim from the CV. Never paraphrase. */
  cvBullets: z.array(z.string().min(20)).min(1),
  stack: z.array(z.string()).min(1),
  /** Related project slugs. */
  links: z.array(slug),
  image: z.string().startsWith("/").optional(),
});

export const ProjectSchema = z.object({
  slug,
  title: z.string(),
  shortTitle: z.string(),
  category: z.string(),
  description: z.string(),
  image: z.string().startsWith("/"),
  github: url,
  featured: z.boolean(),
  highlights: z.array(z.string()).min(1),
  technologies: z.array(z.string()).min(1),
});

export const SkillGroupSchema = z.object({
  category: z.string(),
  description: z.string(),
  skills: z.array(z.string()).min(1),
});

export const EducationSchema = z.object({
  qualification: z.string(),
  institution: z.string(),
  board: z.string(),
  year: z.string().regex(/^\d{4}$/),
  score: z.string(),
  level: z.enum(["Undergraduate", "School"]),
});

export const CertificationSchema = z.object({
  title: z.string(),
  issuer: z.string(),
  category: z.string(),
  patch: z.enum(["hex", "circle", "shield", "diamond", "chevron"]),
  image: z.string().startsWith("/"),
});

export const AchievementSchema = z.object({
  metric: z.string(),
  title: z.string(),
  description: z.string(),
});

export const NavItemSchema = z.object({ label: z.string(), href: z.string().startsWith("/") });

export type SpaceKey = z.infer<typeof SpaceKey>;
export type Profile = z.infer<typeof ProfileSchema>;
export type Experience = z.infer<typeof ExperienceSchema>;
export type Project = z.infer<typeof ProjectSchema>;
export type SkillGroup = z.infer<typeof SkillGroupSchema>;
export type Education = z.infer<typeof EducationSchema>;
export type Certification = z.infer<typeof CertificationSchema>;
export type Achievement = z.infer<typeof AchievementSchema>;
export type NavItem = z.infer<typeof NavItemSchema>;
