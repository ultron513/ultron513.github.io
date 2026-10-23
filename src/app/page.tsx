import { profile, stats } from "@/content";

/* Phase 1 placeholder: verifies tokens and both themes. Replaced by Mission Control in Phase 2. */
export default function HomePage() {
  return (
    <main id="main" className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="font-display text-3xl text-ink">{profile.name}</h1>
      <p className="mt-4 text-muted">{profile.introduction}</p>
      <p className="mt-2 font-mono text-sm text-faint">
        {stats.experiences} experiences, {stats.projects} projects, LeetCode {stats.leetcodeSolved}
      </p>
      <p className="mt-6 text-accent">Accent</p>
    </main>
  );
}
