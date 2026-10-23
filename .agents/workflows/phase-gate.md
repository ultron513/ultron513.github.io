---
description: Close the current redesign phase — run every check, write the phase report, then stop for Ashish's approval.
---

# Phase gate

Run this when the current phase's scope (see `AGENTS.md` → Current phase, and spec §10) is complete. Never skip a step. If a step cannot run, record why in the report. Do not estimate results.

1. **Clean install and static checks.** Run each command and capture its output.
    - `pnpm install --frozen-lockfile`
    - `pnpm typecheck`
    - `pnpm lint`
    - `pnpm format:check`

    All must exit 0.
2. **Production build.** Run `pnpm build`. It must exit 0.
    - Copy the route table from the output into the report.
    - Compare first-load JS against `.agents/rules/a11y-performance.md`.
3. **Contrast.** Run `pnpm check:contrast`. It must pass for both themes.
4. **Visual tests.** Run `pnpm test:visual`.
    - It covers home, the job spaces built so far and `/cv`.
    - Both themes, at 390 px and 1440 px.
    - Attach or link the screenshots.
5. **Lighthouse.** Serve `out/` locally and run Lighthouse (mobile) on home and on each page changed in this phase. Record performance, accessibility and LCP against the budgets.
6. **Reduced motion.** With `prefers-reduced-motion: reduce` emulated, confirm every changed page shows its final state, with no motion and nothing missing.
7. **Browser walk-through.** Use the browser agent to walk every changed page in Deep Space and Daylight Orbit. Look for:
    - contrast or legibility problems;
    - layout breaks;
    - brand-guardrail violations (`.agents/rules/brand-guardrails.md`).
8. **Spec conformance.** Re-read the spec sections for this phase. List each requirement as met, or as a deviation with its reason. Deviations need Ashish's approval. The spec itself is never edited.
9. **Phase report.** Write `docs/phase-reports/phase-<n>.md` with:
    - what was built;
    - the command outputs from steps 1–5;
    - the spec checklist from step 8;
    - known issues;
    - any open questions.
10. **Stop.**
    - Commit to branch `redesign/phase-<n>`. Do not push to `main`.
    - Tell Ashish the gate is ready for review.
    - Do not start the next phase until he explicitly approves. After approval, update "Current phase" in `AGENTS.md`.
