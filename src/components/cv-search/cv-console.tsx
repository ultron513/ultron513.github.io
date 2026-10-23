"use client";

import { useRouter } from "next/navigation";
import { useId, useRef, useState } from "react";

import { profile } from "@/content";
import type { CvMeta } from "@/lib/cv-meta";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

import { playTransmission } from "./download-sequence";
import { filterItems, SearchCombobox, type SearchItem } from "./search-combobox";

type Suggestion = SearchItem & ({ href: string } | { result: true });

const SUGGESTIONS: Suggestion[] = [
  {
    id: "cv",
    label: "ashish patra cv pdf",
    hint: "Download",
    keywords: "resume curriculum vitae",
    result: true,
  },
  {
    id: "experience",
    label: "ashish patra experience",
    hint: "Orbit map",
    keywords: "jobs work internship",
    href: "/experience/",
  },
  {
    id: "projects",
    label: "ashish patra projects",
    hint: "Satellites",
    keywords: "portfolio github",
    href: "/projects/",
  },
  {
    id: "contact",
    label: "ashish patra contact",
    hint: "Comms",
    keywords: "email linkedin hire",
    href: "/contact/",
  },
];

type Stage = "idle" | "results" | "transmitting" | "done";

/**
 * Search-engine-style CV console (spec §6). The download is a real <a download> that fires
 * immediately; the transmission animation plays alongside it and never delays the file.
 * Without JavaScript the form submits straight to the PDF.
 */
export function CvConsole({
  meta,
  compact = false,
  autoFocus = false,
}: {
  meta: CvMeta;
  compact?: boolean;
  autoFocus?: boolean;
}) {
  const router = useRouter();
  const reduced = usePrefersReducedMotion();
  const statusId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [stage, setStage] = useState<Stage>("idle");
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [status, setStatus] = useState("");

  function search(query: string) {
    // Measured for real: from the request to the results being painted (two animation frames).
    const started = performance.now();
    filterItems(SUGGESTIONS, query || "cv");
    setStage((current) => (current === "idle" ? "results" : current));
    setElapsed(null);
    requestAnimationFrame(() =>
      requestAnimationFrame(() => setElapsed((performance.now() - started) / 1000)),
    );
    setStatus(`1 result for ${query || "the CV"}`);
  }

  async function onDownload(event: React.MouseEvent<HTMLAnchorElement>) {
    // The browser starts the download from this click; the rest is presentation.
    if (stage === "idle") search("ashish patra cv");
    setStatus(`Downloading ${meta.fileName}`);
    if (reduced) {
      setStage("done");
      setStatus("Transmission complete. The CV is downloading.");
      return;
    }
    setStage("transmitting");
    const origin = event.currentTarget.getBoundingClientRect();
    const host = rootRef.current?.closest("dialog") ?? document.body;
    await playTransmission(origin, host);
    setStage("done");
    setStatus("Transmission complete. The CV is downloading.");
  }

  const downloadButton = (label: string, primary = true) => (
    <a
      href={meta.path}
      download={meta.fileName}
      onClick={onDownload}
      className={cn(
        "relative inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full px-5 text-sm font-medium transition-[filter,background-color]",
        primary
          ? "bg-accent text-on-accent hover:brightness-110"
          : "border border-line-strong text-ink hover:border-accent",
      )}
    >
      {stage === "transmitting" ? (
        <svg viewBox="0 0 20 20" className="size-4 -rotate-90" aria-hidden="true">
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeOpacity="0.3"
            strokeWidth="2.5"
          />
          <circle
            cx="10"
            cy="10"
            r="8"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="50.3"
            className="animate-[ring-fill_900ms_ease-out_forwards]"
          />
        </svg>
      ) : stage === "done" ? (
        <svg viewBox="0 0 20 20" className="size-4" aria-hidden="true">
          <path
            d="m5 10.5 3.2 3L15 6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
      {stage === "transmitting" ? "Transmitting" : stage === "done" ? "Download again" : label}
    </a>
  );

  return (
    <div
      ref={rootRef}
      className={cn("hud glass rounded-md shadow-depth", compact ? "p-5 sm:p-7" : "p-6 sm:p-10")}
    >
      <p
        className={cn(
          "text-center font-display font-semibold tracking-tight text-ink",
          compact ? "text-3xl" : "text-[clamp(2.5rem,1.6rem+3vw,3.5rem)]",
        )}
      >
        {profile.wordmark}
        <span className="text-accent">.</span>
      </p>

      <form
        role="search"
        action={meta.path}
        method="get"
        onSubmit={(event) => {
          event.preventDefault();
          search(new FormData(event.currentTarget).get("q")?.toString() ?? "");
        }}
        className="mx-auto mt-6 max-w-xl"
      >
        <div className="rounded-[1.75rem] border border-line-strong bg-elevated transition-colors focus-within:border-accent">
          <SearchCombobox
            items={SUGGESTIONS}
            label="Search for Ashish's CV"
            placeholders={["ashish patra cv", "f1 data scientist resume", "ml engineer portfolio"]}
            autoFocus={autoFocus}
            onSelect={(item) => ("href" in item ? router.push(item.href) : search(item.label))}
            onSubmit={search}
            inputClassName="h-12 rounded-[1.75rem] px-6 text-base"
            listClassName="border-t border-line py-2"
          />
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          {downloadButton("Download CV")}
          <a
            href={meta.path}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-11 items-center rounded-full border border-line-strong px-5 text-sm text-ink transition-colors hover:border-accent"
          >
            View online
          </a>
        </div>
      </form>

      <p id={statusId} role="status" aria-live="polite" className="sr-only">
        {status}
      </p>

      {stage !== "idle" ? (
        <div className="mx-auto mt-8 max-w-xl border-t border-line pt-5 text-left">
          <p className="font-mono text-xs text-faint">
            1 result {elapsed === null ? "" : `(${elapsed.toFixed(3)} seconds)`}
          </p>
          <article className="mt-3">
            <p className="font-mono text-xs text-muted">
              ultron513.github.io › documents › {meta.fileName}
            </p>
            <h3 className="mt-1 font-display text-lg text-accent">
              <a href={meta.path} target="_blank" rel="noreferrer" className="hover:underline">
                {profile.name}: CV (PDF)
              </a>
            </h3>
            <p className="mt-1 text-sm text-muted">
              {meta.sizeLabel}
              {meta.pages ? `, ${meta.pages} pages` : ""}, updated {meta.updatedLabel}. Experience
              at McLaren Racing, ISTA, Stanford Code in Place and IIT Guwahati, six projects,
              education and skills.
            </p>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              {downloadButton("Download CV", false)}
              {stage === "done" ? (
                <p className="text-sm text-ink">
                  Transmission complete.{" "}
                  <a
                    href={meta.path}
                    target="_blank"
                    rel="noreferrer"
                    className="link-quiet text-muted"
                  >
                    Open in new tab
                  </a>
                </p>
              ) : null}
            </div>
          </article>
        </div>
      ) : null}
    </div>
  );
}
