import { achievements, certifications, education, navigation, skills } from "./catalog";
import { experience } from "./experience";
import { profile } from "./profile";
import { projects } from "./projects";
import type { Experience, Project } from "./schema";

export {
  achievements,
  certifications,
  education,
  experience,
  navigation,
  profile,
  projects,
  skills,
};
export type {
  Achievement,
  Certification,
  Education,
  Experience,
  NavItem,
  Profile,
  Project,
  SkillGroup,
  SpaceKey,
} from "./schema";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(iso: string): string {
  const [year, month] = iso.split("-");
  return `${MONTHS[Number(month) - 1]} ${year}`;
}

export function formatPeriod(item: Pick<Experience, "start" | "end">): string {
  const [startYear] = item.start.split("-");
  const [endYear] = item.end.split("-");
  const start =
    startYear === endYear ? MONTHS[Number(item.start.split("-")[1]) - 1] : formatMonth(item.start);
  return `${start} – ${formatMonth(item.end)}`;
}

/** Module number in date order, oldest first (MOD-01 is the earliest). */
export function moduleId(slug: string): string {
  const ordered = [...experience].sort((a, b) => a.start.localeCompare(b.start));
  const index = ordered.findIndex((item) => item.slug === slug);
  return `MOD-${String(index + 1).padStart(2, "0")}`;
}

export function getExperience(slug: string): Experience | undefined {
  return experience.find((item) => item.slug === slug);
}

export function getProject(slug: string): Project | undefined {
  return projects.find((item) => item.slug === slug);
}

/** Previous/next module in date order (newest first, as listed). */
export function neighbours(slug: string): { previous?: Experience; next?: Experience } {
  const index = experience.findIndex((item) => item.slug === slug);
  return { previous: experience[index - 1], next: experience[index + 1] };
}

export function experiencesForProject(slug: string): Experience[] {
  return experience.filter((item) => item.links.includes(slug));
}

export const featuredProjects = projects.filter((project) => project.featured);

/** Counters are computed from content, never typed by hand (spec §3). */
export const stats = {
  degrees: education.filter((item) => item.level === "Undergraduate").length,
  experiences: experience.length,
  projects: projects.length,
  leetcodeRank: profile.competitiveProgramming.leetcodeRank,
  leetcodeSolved: profile.competitiveProgramming.leetcodeSolved,
  codeforces: profile.competitiveProgramming.codeforces,
};

export function projectImage(src: string, width: 800 | 1600): string {
  return width === 1600 ? src : src.replace(/\.webp$/, "-800.webp");
}
