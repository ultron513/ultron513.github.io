"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { formatPeriod, profile, type Experience } from "@/content";
import { cn } from "@/lib/utils";

import { useSpaceProgress } from "../shared/use-space-progress";

/*
 * Search space: the search office (spec §5). A search-engine *style* page with Ashish's own
 * wordmark (no real engine's logo, colours or layout). The query types itself, results load,
 * and "About 5 results" reports a real measured time. Below, an illustrative control-flow graph
 * reorders its basic blocks as you scroll, so the hot path falls through.
 */

const QUERY = "optimal code block design";
const TITLES = [
  "Optimal Code Block Design, under Prof. Marco Mondelli",
  "International exchange: ISTA and Google Zurich",
  "Prototype optimization workflows",
  "Compiler diagnostics and optimization trade-offs",
  "Technical reports and presentations",
];
const CRUMBS = ["research", "exchange", "prototypes", "experiments", "reports"];

type Stage = "idle" | "typing" | "loading" | "done";

function ResultsPanel({ item }: { item: Experience }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [stage, setStage] = useState<Stage>("idle");
  const [typed, setTyped] = useState("");
  const [elapsed, setElapsed] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTyped(QUERY);
      setStage("done");
      return;
    }
    setStage("typing");
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setTyped(QUERY.slice(0, i));
      if (i >= QUERY.length) {
        window.clearInterval(timer);
        const started = performance.now();
        setStage("loading");
        window.setTimeout(() => {
          setStage("done");
          requestAnimationFrame(() =>
            requestAnimationFrame(() => setElapsed((performance.now() - started) / 1000)),
          );
        }, 420);
      }
    }, 38);
    return () => window.clearInterval(timer);
  }, [inView]);

  return (
    <div ref={ref} className="grid gap-8 lg:grid-cols-[1fr_18rem]">
      <div>
        <div className="flex items-center gap-4 border-b border-line pb-5">
          <span className="font-display text-2xl font-semibold tracking-tight text-ink">
            {profile.wordmark}
            <span className="text-space">.</span>
          </span>
          <div className="flex h-11 min-w-0 flex-1 items-center gap-3 rounded-full border border-line-strong bg-bg px-4">
            <svg viewBox="0 0 20 20" className="size-4 shrink-0 text-faint" aria-hidden="true">
              <circle
                cx="8.5"
                cy="8.5"
                r="5.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            <span className="truncate font-mono text-sm text-ink">
              {typed}
              {stage === "typing" ? (
                <span className="ml-px inline-block h-4 w-[2px] translate-y-0.5 bg-space" />
              ) : null}
            </span>
          </div>
        </div>

        <p className="mt-4 font-mono text-xs text-faint" aria-live="polite">
          {stage === "done"
            ? `About ${item.cvBullets.length} results${elapsed !== null ? ` (${elapsed.toFixed(3)} seconds)` : ""}`
            : stage === "idle"
              ? " "
              : "Searching…"}
        </p>

        <ol className="mt-5 space-y-7">
          {item.cvBullets.map((bullet, i) => (
            <li key={bullet} className="relative">
              {/* The real result always holds its space (no layout shift); the skeleton sits on top until loaded. */}
              <div
                className={cn(
                  stage === "done" ? "animate-[fade-in_400ms_ease-out_both]" : "invisible",
                )}
                style={stage === "done" ? { animationDelay: `${i * 70}ms` } : undefined}
              >
                <p className="font-mono text-xs text-muted">
                  ashish › ista › {CRUMBS[i] ?? "compiler-research"}
                </p>
                <h2 className="mt-1 font-display text-lg text-space">{TITLES[i] ?? item.role}</h2>
                <p className="mt-1 text-muted">{bullet}</p>
              </div>
              {stage !== "done" ? (
                <div className="absolute inset-0 space-y-2" aria-hidden="true">
                  <div className="h-3 w-48 rounded-sm bg-line" />
                  <div className="h-4 w-80 max-w-full rounded-sm bg-line-strong" />
                  <div className="h-3 w-full rounded-sm bg-line" />
                  <div className="h-3 w-2/3 rounded-sm bg-line" />
                </div>
              ) : null}
            </li>
          ))}
        </ol>
      </div>

      <aside className="h-fit rounded-md border border-line p-5" aria-label="Knowledge panel">
        <h2 className="font-display text-lg text-ink">{item.organization}</h2>
        <p className="text-sm text-muted">{item.role}</p>
        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex justify-between gap-4 border-t border-line pt-3">
            <dt className="text-faint">Where</dt>
            <dd className="text-right text-ink">{item.location}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-line pt-3">
            <dt className="text-faint">When</dt>
            <dd className="text-right text-ink">{formatPeriod(item)}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-line pt-3">
            <dt className="text-faint">Supervisor</dt>
            <dd className="text-right text-ink">Prof. Marco Mondelli</dd>
          </div>
          <div className="border-t border-line pt-3">
            <dt className="text-faint">Tools</dt>
            <dd className="mt-2 flex flex-wrap gap-1.5">
              {item.stack.map((tool) => (
                <span
                  key={tool}
                  className="rounded-sm border border-line px-2 py-0.5 font-mono text-xs text-ink"
                >
                  {tool}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  );
}

/* ---------- Illustrative control-flow graph: basic-block layout ---------- */

const BLOCKS = ["entry", "B1", "B2", "B3", "B4", "B5", "B6", "exit"];
/** Edges: [from, to, hot?] */
const EDGES: [number, number, boolean][] = [
  [0, 1, true],
  [1, 2, false],
  [1, 3, true],
  [3, 4, true],
  [2, 5, false],
  [4, 6, true],
  [5, 6, false],
  [6, 7, true],
];
/** Source order (as written) and optimised order (hot path falls through). */
const SOURCE_ORDER = [0, 1, 2, 5, 3, 4, 6, 7];
const OPTIMISED_ORDER = [0, 1, 3, 4, 6, 7, 2, 5];

function ControlFlowGraph() {
  const { ref, progress } = useSpaceProgress<HTMLDivElement>(["start end", "center center"]);
  const t = Math.min(1, Math.max(0, (progress - 0.45) / 0.5));
  const ease = t * t * (3 - 2 * t);
  const W = 640;
  const row = 52;
  const x = (index: number) => {
    const optimised = OPTIMISED_ORDER.indexOf(index);
    const cold = optimised >= 6;
    return cold ? 160 + ease * 260 : 160;
  };
  const y = (index: number) => {
    const a = SOURCE_ORDER.indexOf(index);
    const b = OPTIMISED_ORDER.indexOf(index);
    const target = b >= 6 ? 2 + (b - 6) * 1.5 : b;
    return 30 + (a + (target - a) * ease) * row;
  };
  return (
    <div ref={ref} className="mt-10 rounded-md border border-line p-5 sm:p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="font-display text-lg text-ink">Block layout, before and after</h2>
        <p className="font-mono text-xs text-faint">
          {ease < 0.5 ? "Source order" : "Hot path falls through"}
        </p>
      </div>
      <p className="mt-1 text-sm text-muted">
        Scroll to reorder. Hot blocks move into one straight line and cold blocks move aside.
        Illustrative example.
      </p>
      <svg viewBox={`0 0 ${W} 440`} className="mt-4 w-full" aria-hidden="true">
        <defs>
          <marker
            id="cfg-arrow"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10z" fill="var(--text-faint)" />
          </marker>
          <marker
            id="cfg-arrow-hot"
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M0 0L10 5L0 10z" fill="var(--space-accent)" />
          </marker>
        </defs>
        {EDGES.map(([from, to, hot]) => {
          const x1 = x(from) + 50;
          const y1 = y(from) + 16;
          const x2 = x(to) + 50;
          const y2 = y(to) - 16;
          const bend = Math.abs(x1 - x2) < 2 && y2 > y1 ? 0 : 60;
          return (
            <path
              key={`${from}-${to}`}
              d={`M${x1} ${y1} C${x1 + bend} ${y1 + 24}, ${x2 + bend} ${y2 - 24}, ${x2} ${y2}`}
              fill="none"
              stroke={hot ? "var(--space-accent)" : "var(--text-faint)"}
              strokeWidth={hot ? 1.8 : 1.2}
              strokeDasharray={hot ? undefined : "3 4"}
              markerEnd={`url(#${hot ? "cfg-arrow-hot" : "cfg-arrow"})`}
            />
          );
        })}
        {BLOCKS.map((label, index) => {
          const hot = OPTIMISED_ORDER.indexOf(index) < 6;
          return (
            <g key={label} transform={`translate(${x(index)} ${y(index) - 16})`}>
              <rect
                width="100"
                height="32"
                rx="8"
                fill="var(--bg-elevated)"
                stroke={hot ? "var(--space-accent)" : "var(--border-strong)"}
              />
              <text
                x="50"
                y="21"
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="13"
                fill="var(--text)"
              >
                {label}
              </text>
            </g>
          );
        })}
        <text
          x="440"
          y="60"
          fontFamily="var(--font-mono)"
          fontSize="12"
          fill="var(--text-faint)"
          opacity={ease}
        >
          cold blocks
        </text>
      </svg>
    </div>
  );
}

export default function SearchSpace({ item }: { item: Experience }) {
  return (
    <section aria-label="Search office" className="mx-auto max-w-6xl px-5">
      <div className={cn("hud rounded-md border border-line bg-elevated p-5 shadow-depth sm:p-8")}>
        <ResultsPanel item={item} />
        <ControlFlowGraph />
      </div>
    </section>
  );
}
