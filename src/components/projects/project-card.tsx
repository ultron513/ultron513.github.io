import Link from "next/link";

export type ProjectCardData = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image?: string;
};

type ProjectCardProps = {
  project: ProjectCardData;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04] sm:p-8"
    >
      <div className="flex items-start justify-between gap-6">
        <span className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-zinc-500">
          {project.category}
        </span>

        <span
          aria-hidden="true"
          className="text-lg text-zinc-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-white"
        >
          ↗
        </span>
      </div>

      {project.image ? (
        <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
          <img
            src={project.image}
            alt={`${project.title} project preview`}
            loading="lazy"
            className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="mt-8 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent"
        >
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-700">
            Project
          </span>
        </div>
      )}

      <h3 className="mt-7 text-2xl font-medium tracking-tight sm:text-3xl">
        {project.title}
      </h3>

      <p className="mt-4 line-clamp-3 text-sm leading-6 text-zinc-500">
        {project.description}
      </p>
    </Link>
  );
}