import {
  ProjectCard,
  type ProjectCardData,
} from "./project-card";

type ProjectGridProps = {
  projects: readonly ProjectCardData[];
};

export function ProjectGrid({
  projects,
}: ProjectGridProps) {
  return (
    <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard
          key={project.slug}
          project={project}
        />
      ))}
    </div>
  );
}