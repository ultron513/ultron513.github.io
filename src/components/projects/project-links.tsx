import Link from "next/link";

type ProjectLinksProps = {
  github?: string;
  live?: string;
};

export function ProjectLinks({ github, live }: ProjectLinksProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {github ? (
        <a
          href={github}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-80"
        >
          View on GitHub
        </a>
      ) : null}

      {live ? (
        <a
          href={live}
          target="_blank"
          rel="noreferrer"
          className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
        >
          Live Demo
        </a>
      ) : null}

      <Link
        href="/projects"
        className="inline-flex rounded-full border border-white/10 px-6 py-3 text-sm text-zinc-300 transition-colors hover:bg-white hover:text-black"
      >
        All Projects
      </Link>
    </div>
  );
}