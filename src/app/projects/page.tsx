import type { Metadata } from "next";

import { SatelliteCard } from "@/components/projects/satellite-card";
import { PageHeader } from "@/components/sections/page-header";
import { projects } from "@/content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Projects by Ashish Kumar Patra: F1 telemetry analytics, sound classification, fraud detection, road damage detection, an AQI dashboard and Dream Decoder.",
  path: "/projects",
  og: "projects",
});

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:pt-32">
      <PageHeader
        context={`${projects.length} satellites in orbit`}
        title="Projects"
        lead="Machine learning, computer vision, telemetry and business intelligence. Every project links to its source on GitHub."
      />
      <ul className="mt-12 grid gap-5 md:grid-cols-2">
        {projects.map((project, i) => (
          <li key={project.slug}>
            <SatelliteCard project={project} priority={i < 2} />
          </li>
        ))}
      </ul>
    </div>
  );
}
