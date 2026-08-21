import Link from "next/link";

type ProjectLinksProps = {
  github?: string;
  live?: string;
};

export function ProjectLinks({
  github,
  live,
}: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-medium text-black transition-all duration-300 hover:px-7 hover:bg-zinc-200"
        >
          View on GitHub

          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
      ) : null}

      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3.5 text-sm text-zinc-300 transition-all duration-300 hover:border-white/[0.16] hover:text-white"
        >
          Live Demo

          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            ↗
          </span>
        </a>
      ) : null}

      <Link
        href="/projects"
        className="group inline-flex items-center gap-3 rounded-full border border-white/[0.08] px-6 py-3.5 text-sm text-zinc-500 transition-all duration-300 hover:border-white/[0.16] hover:text-white"
      >
        All Projects

        <span
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:-translate-x-1"
        >
          ←
        </span>
      </Link>
    </div>
  );
}