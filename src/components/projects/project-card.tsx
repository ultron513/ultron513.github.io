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

export function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group relative block overflow-hidden rounded-[1.5rem] border border-white/[0.08] bg-white/[0.015] transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.16] hover:bg-white/[0.025] sm:rounded-[1.75rem]"
    >
      <div className="relative overflow-hidden border-b border-white/[0.07]">
        {project.image ? (
          <>
            <img
              src={project.image}
              alt={`${project.title} project preview`}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:aspect-[16/9]"
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />
          </>
        ) : (
          <div
            aria-hidden="true"
            className="flex aspect-[16/10] items-center justify-center bg-zinc-950 sm:aspect-[16/9]"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
              Project
            </span>
          </div>
        )}
      </div>

      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <span className="max-w-[75%] rounded-full border border-white/[0.08] px-2.5 py-1.5 text-[8px] uppercase tracking-[0.2em] text-zinc-600 sm:px-3 sm:text-[9px] sm:tracking-[0.25em]">
            {project.category}
          </span>

          <span
            aria-hidden="true"
            className="shrink-0 text-zinc-700 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
          >
            ↗
          </span>
        </div>

        <h3 className="mt-5 text-xl font-medium leading-tight tracking-[-0.025em] text-zinc-200 sm:mt-7 sm:text-3xl">
          {project.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-zinc-600 sm:mt-4 sm:leading-7">
          {project.description}
        </p>

        <div
          aria-hidden="true"
          className="mt-6 h-px w-8 bg-white/10 transition-all duration-500 group-hover:w-14 group-hover:bg-white/25 sm:mt-7"
        />
      </div>
    </Link>
  );
}