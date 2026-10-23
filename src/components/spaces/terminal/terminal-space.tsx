"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import type { Experience } from "@/content";
import { usePrefersReducedMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

/*
 * Terminal space: the AI eval console (spec §5). Each CV bullet streams in token by token as a
 * "response", then a validation pass ticks it off. No real prompts or customer data; the
 * scorecard is illustrative.
 */

const CHECKS = ["Faithful to source", "Format", "Safety"];

export default function TerminalSpace({ item }: { item: Experience }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const reduced = usePrefersReducedMotion();
  const tokens = item.cvBullets.map((bullet) => bullet.split(/(\s+)/));
  const total = tokens.reduce((sum, t) => sum + t.length, 0);
  const [streamed, setStreamed] = useState(0);
  const [validated, setValidated] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setStreamed(total);
      setValidated(item.cvBullets.length);
      return;
    }
    let count = 0;
    let done = 0;
    const boundaries = tokens.map((_, i) =>
      tokens.slice(0, i + 1).reduce((s, t) => s + t.length, 0),
    );
    const timer = window.setInterval(() => {
      count += 2;
      setStreamed(count);
      while (done < boundaries.length && count >= boundaries[done]) {
        const index = done + 1;
        window.setTimeout(() => setValidated((v) => Math.max(v, index)), 260);
        done++;
      }
      if (count >= total) window.clearInterval(timer);
    }, 26);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduced, total]);

  let remaining = streamed;

  return (
    <section aria-label="Evaluation console" className="mx-auto max-w-6xl px-5">
      <div ref={ref} className="grid gap-6 lg:grid-cols-[1fr_18rem]" aria-hidden="true">
        <div className="hud overflow-hidden rounded-md border border-line bg-bg shadow-depth">
          <div className="flex items-center justify-between border-b border-line bg-elevated px-4 py-2.5 font-mono text-xs text-faint">
            <span>eval-console</span>
            <span className="text-space">
              {validated}/{item.cvBullets.length} validated
            </span>
          </div>
          <div className="space-y-6 p-5 font-mono text-sm leading-relaxed sm:p-6">
            <p className="text-muted">
              <span className="text-space">$</span> eval run --task role-summary --source cv
            </p>
            {tokens.map((parts, i) => {
              const shown = parts.slice(0, Math.max(0, remaining)).join("");
              const streaming = remaining > 0 && remaining < parts.length;
              remaining -= parts.length;
              const started = shown.length > 0;
              return (
                <div
                  key={i}
                  className={cn("transition-opacity", started ? "opacity-100" : "opacity-30")}
                >
                  <p className="text-faint">response[{i + 1}]</p>
                  <p className="mt-1 min-h-[1.5rem] whitespace-pre-wrap text-ink">
                    {shown}
                    {streaming ? (
                      <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-space" />
                    ) : null}
                  </p>
                  <p
                    className={cn(
                      "mt-1 text-xs transition-opacity duration-300",
                      validated > i ? "text-space opacity-100" : "opacity-0",
                    )}
                  >
                    ✓ output validated
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <aside className="h-fit rounded-md border border-line p-5">
          <p className="font-mono text-xs text-faint">Scorecard</p>
          <p className="mt-2 font-display text-3xl text-ink">
            {validated}
            <span className="text-faint">/{item.cvBullets.length}</span>
          </p>
          <p className="text-sm text-muted">responses validated</p>
          <ul className="mt-5 space-y-2 text-sm">
            {CHECKS.map((check) => (
              <li
                key={check}
                className="flex items-center justify-between border-t border-line pt-2"
              >
                <span className="text-muted">{check}</span>
                <span
                  className={cn(
                    "font-mono text-xs",
                    validated >= item.cvBullets.length ? "text-space" : "text-faint",
                  )}
                >
                  {validated >= item.cvBullets.length ? "pass" : "pending"}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-5 font-mono text-xs text-faint">
            Illustrative console. The responses are the CV bullets.
          </p>
        </aside>
      </div>
    </section>
  );
}
