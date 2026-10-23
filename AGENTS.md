# AGENTS.md — ashish-patra-portfolio

Workspace rules for AI coding agents (Google Antigravity reads this file). Detailed rules live in `.agents/rules/`. Saved procedures live in `.agents/workflows/`.

## What this project is

The personal portfolio of Ashish Kumar Patra, live at https://ultron513.github.io.

- **Stack:** Next.js 15 (App Router, `output: "export"`), React 19, TypeScript (strict), Tailwind CSS v4 and pnpm.
- **Deploy:** `.github/workflows/deploy.yml` builds `out/` and publishes it to GitHub Pages on every push to `main`. **A push to `main` is a production deploy.**

## Source of truth

- **`docs/spec/redesign-v1.md`** is the approved "Deep Space Mission Control" redesign spec, v1.0, approved 2026-10-23.
- **It is read-only.** Never edit, reinterpret or "improve" it.
- If the spec is unclear, contradictory or silent on something you need, **stop and ask Ashish**. Do not improvise.
- References like §5 mean sections of that spec. Read the sections relevant to your task before planning.

## Current phase

**Phase 1: Foundation.** The Phase 0 gate (spec approval) passed on 2026-10-23.

Change this line only after Ashish approves a phase gate.

| Phase | Scope (spec §10)                                                                                                 |
| ----- | ---------------------------------------------------------------------------------------------------------------- |
| 0     | Spec approval: **done**                                                                                          |
| 1     | Foundation: OKLCH tokens and both themes, Zod content model, audit cleanup (§8), public CV, verification tooling |
| 2     | Shell and Mission Control home: command bar, theme dial, 3D hero, orbit map, warp jump                           |
| 3     | CV search and download flow, Ctrl/Cmd+K palette                                                                  |
| 4     | Job spaces A: McLaren (race), ISTA (search), Stanford (campus)                                                   |
| 5     | Job spaces B: IIT Guwahati (lab), Microsoft Elevate (bi), Outlier (terminal)                                     |
| 6     | Projects, certificates, contact and 404 restyle                                                                  |
| 7     | QA and launch                                                                                                    |

## Hard rules

1. **Spec is immutable.** See above. A change needs a new spec version that Ashish approves.
2. **One phase at a time.**
   - Work only inside the current phase's scope.
   - When it is done, run the `phase-gate` workflow and **stop**.
   - Never begin the next phase without Ashish's explicit approval.
3. **Plan first.** Use Planning Mode for each phase and get the plan approved before writing code. Fast Mode is only for small fixes inside an approved phase.
4. **Dependencies.**
   - Add no package without approval.
   - Approved by the spec:
     - **Removals:** `gsap`, `lenis`, `@react-three/drei`, `class-variance-authority`, `next-themes`.
     - **Additions:** `eslint` + `eslint-config-next`, `@playwright/test`, `sharp` (dev, for image scripts), a Lighthouse CLI, and self-hosted JetBrains Mono Variable font files.
   - Anything else, ask first.
5. **Custom over convenience.** Prefer small hand-written implementations (theme provider, shaders, tilt, text scramble, helpers) over new libraries.
6. **Colour only through tokens.**
   - No hex, `rgb()` or `oklch()` literals in components.
   - No Tailwind palette colour classes (`zinc-*`, `white`, `black`, etc.).
   - See `.agents/rules/design-system.md`.
7. **Both themes, always.** Deep Space (dark) and Daylight Orbit (light) are equally polished. Every UI change is checked in both.
8. **Brand guardrails.** No logos, seals, wordmarks, mascots or trade dress of any organisation. See `.agents/rules/brand-guardrails.md`.
9. **Real content only.**
   - All CV text comes from `src/content/` and is copied verbatim from the CV.
   - Never invent metrics, data, quotes or achievements.
   - Any decorative data is synthetic and labelled "illustrative".
10. **Motion is accessible.**
    - Every animation has a `prefers-reduced-motion` path.
    - No scroll-jacking.
    - Nothing flashes more than 3 times a second.
    - See `.agents/rules/a11y-performance.md`.
11. **Verify by running, not by reasoning.**
    - Gate claims must quote actual command output: build, lint, typecheck, contrast, Playwright and Lighthouse.
    - If a tool cannot run, say so. Do not estimate.
12. **Git.**
    - Work on a branch named `redesign/phase-<n>`.
    - Never push to `main`, and never merge, without Ashish's approval.
    - Commit messages use the imperative mood and describe one change each.

## Commands

| Command                             | What it does                                                                             | Available from      |
| ----------------------------------- | ---------------------------------------------------------------------------------------- | ------------------- |
| `pnpm install`                      | Install dependencies (pnpm 11, lockfile v9)                                              | now                 |
| `pnpm dev`                          | Dev server                                                                               | now                 |
| `pnpm build`                        | Static export to `out/`                                                                  | now                 |
| `pnpm format` / `pnpm format:check` | Prettier                                                                                 | now                 |
| `pnpm typecheck`                    | `tsc --noEmit`                                                                           | Phase 1 adds it     |
| `pnpm lint`                         | `eslint .` (flat config). The old `next lint` is deprecated and fails today              | Phase 1 replaces it |
| `pnpm check:contrast`               | `scripts/check-contrast.ts`: fails if any text token pair is below 4.5:1 in either theme | Phase 1 adds it     |
| `pnpm test:visual`                  | Playwright screenshots: home, six spaces, `/cv`, both themes, 390 px and 1440 px         | Phase 1 adds it     |
| `pnpm images`                       | `scripts/optimise-images.ts`: re-encode project images to ≤ 250 kB at 1600 w and 800 w   | Phase 1 adds it     |

## Target structure (spec §8)

```
src/app/           routes: /, /experience, /experience/[slug] (6), /projects, /projects/[slug],
                   /certificates, /cv, /contact, not-found, sitemap.ts
src/content/       schema.ts (Zod) + profile, experience, projects, skills, education,
                   certifications, achievements (types via z.infer; replaces src/types/)
src/design/        tokens.css (OKLCH, both themes), spaces.css (data-space accents)
src/lib/theme/     custom theme provider + inline pre-paint script
src/components/    shell/ hud/ three/ spaces/{shared,race,lab,bi,search,campus,terminal}/
                   cv-search/ sections/
scripts/           check-contrast.ts, optimise-images.ts
```

## Decisions locked at approval (spec "Open questions") and amendments

Amendments to the frozen spec live in `docs/spec/amendments.md` and take precedence over the sections they name.

- **CV file (amendment A1).** `public/documents/Ashish_Patra_CV.pdf` stays exactly as Ashish supplied it. He is fine with its contact details being public. Never generate or edit the CV's content.
- **Name.** Spell it "Ashish" everywhere on the site.
- **LeetCode count.** Use "1900+" problems solved (confirmed by Ashish on 2026-10-23). The current site's "1800+" in `achievements` is out of date, and Phase 1 content migration fixes it.
- **McLaren photo.** `public/images/experience/mclaren-racing.webp` is Ashish's own photo, cleared for use in the race space.
- **Wordmark.** The search-style pages use `ashish`, lowercase, in Space Grotesk.
- **CV buttons.** Only **Download CV** and **View online**. No playful extra button.
- **Theme on first visit.** Follow the OS setting, then persist the visitor's choice.
- **Order of the job spaces.** Phase 4 builds McLaren, ISTA and Stanford. Phase 5 builds the other three.

## Environment notes

- Ashish develops on Windows. Keep scripts cross-platform: Node scripts, not bash-only.
- Static export means no server code at runtime: no API routes, no runtime `next/image` optimisation. Anything dynamic must be generated at build time or run client-side.
- Antigravity's rules folder is `.agents/`; older versions used `.agent/`. If this IDE version ignores `.agents/`, tell Ashish rather than duplicating files.
