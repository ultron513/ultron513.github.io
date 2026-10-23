import type { MetadataRoute } from "next";

import { experience, projects } from "@/content";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

/** Generated from content so new spaces and projects are listed automatically (spec §3). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/experience", "/projects", "/certificates", "/contact", "/cv"];
  return [
    ...pages.map((path) => ({ url: absoluteUrl(path), priority: path === "/" ? 1 : 0.8 })),
    ...experience.map((item) => ({ url: absoluteUrl(`/experience/${item.slug}`), priority: 0.7 })),
    ...projects.map((item) => ({ url: absoluteUrl(`/projects/${item.slug}`), priority: 0.6 })),
  ];
}
