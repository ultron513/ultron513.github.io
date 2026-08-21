export type ProjectCategory =
  | "Full-Stack / Data Analytics"
  | "AI / Machine Learning"
  | "Machine Learning / Finance"
  | "Computer Vision"
  | "Business Intelligence"
  | "Natural Language Processing";

export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: ProjectCategory;
  description: string;
  github?: string;
  live?: string;
  featured: boolean;
  highlights: readonly string[];
  technologies: readonly string[];
};