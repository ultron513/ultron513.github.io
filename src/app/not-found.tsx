import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[var(--background)] px-6 text-[var(--foreground)]">
      <section className="text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">
          404
        </p>

        <h1 className="mt-4 text-4xl font-semibold tracking-tight">
          Page not found
        </h1>

        <p className="mt-4 text-zinc-400">
          The page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex rounded-full border border-white/10 px-6 py-3 text-sm transition-colors hover:bg-white hover:text-black"
        >
          Return home
        </Link>
      </section>
    </main>
  );
}