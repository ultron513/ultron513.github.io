import Link from "next/link";

import { SatelliteCard } from "@/components/projects/satellite-card";
import { featuredProjects, projects } from "@/content";

import { Section } from "./section";

export function Satellites() {
  return (
    <Section
      id="satellites"
      title="Satellites in orbit"
      intro="Selected projects across telemetry, audio, fraud detection and computer vision."
      aside={
        <Link href="/projects/" className="link-quiet text-sm text-muted hover:text-ink">
          All {projects.length} projects
        </Link>
      }
    >
      <ul className="grid gap-5 md:grid-cols-2">
        {featuredProjects.map((project) => (
          <li key={project.slug}>
            <SatelliteCard project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
