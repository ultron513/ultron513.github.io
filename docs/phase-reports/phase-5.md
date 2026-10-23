# Phase 5: Job spaces B (IIT Guwahati, Microsoft Elevate, Outlier)

Status: complete, 2026-10-23.

## Built

- **Lab (IIT Guwahati).**
    - A sticky research bench with a decorative oscilloscope and a four-stage pipeline (raw data → features → model → evaluation).
    - A signal pulse travels the pipeline with native scroll.
    - Each stage lights up with its exact quote from the two CV bullets.
- **BI control room (Microsoft Elevate / AICTE).**
    - Panels assemble one by one: KPI cards, monthly trend, a stylised pollution map, city rankings and filter chips. Every panel type is named in the CV.
    - The numbers are seeded synthetic data, labelled "Illustrative data".
    - The three bullets annotate the wall, and Ashish's own project screenshot links to the dashboard project.
    - No Power BI logo or interface chrome.
- **Terminal (Outlier.AI).**
    - An eval console streams each bullet token by token as `response[n]`, then ticks it "output validated".
    - Scorecard checks are labelled illustrative. No real prompts or Outlier branding.
- **Reduced motion.** Every interior shows its final state: all stages lit, panels in place, all responses validated.

## Measured

| Check | Result |
| --- | --- |
| `/experience/[slug]` first-load JS | 107 kB; each interior loads as its own chunk |
| Screenshots | Lab, BI and terminal at 1440 px dark; BI light |
| `pnpm lint` / `pnpm typecheck` / `pnpm format:check` | Clean |
