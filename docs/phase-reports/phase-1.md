# Phase 1: Foundation

Status: complete, 2026-10-23. Built continuously under amendment A3.

## Built

- `src/design/tokens.css`: OKLCH tokens for Deep Space and Daylight Orbit (spec §2 values), job-space accents through `data-space`, and a no-JS `prefers-color-scheme` fallback.
- `src/app/globals.css`: Tailwind v4 `@theme` maps utilities to the tokens only. The default palette is removed (`--color-*: initial`), so classes like `zinc-600` cannot compile.
- `src/lib/theme/`: a custom theme provider plus an inline pre-paint script. `next-themes` is gone.
- `src/content/`:
    - Zod schemas in `schema.ts`; types come from `z.infer`.
    - Content files, with CV bullets copied verbatim from the CV.
    - Helpers and computed counters in `index.ts`.
    - Zod runs only at build time (`validate:content`), so it never ships to the browser.
- Cleanup:
    - Removed `gsap`, `lenis`, `@react-three/drei`, `class-variance-authority` and `next-themes`.
    - Removed the old `src/types`, `data`, `hooks` and `components`, plus `tailwind.config.ts`, `components.json`, the hand-written sitemap and `robots.txt`.
- Tooling:
    - ESLint 9 flat config (`eslint .`).
    - `scripts/check-contrast.mts`, `optimise-images.mts`, `validate-content.mts`, `generate-og.mts` and `serve-out.mjs`.
    - Playwright config and visual tests.
- SEO:
    - `sitemap.ts` and `robots.ts` generated from content.
    - Per-page canonical URL and `og:url`.
    - 18 Open Graph PNG cards in `public/og/`.
- Fonts: JetBrains Mono Variable is self-hosted (OFL licence in `public/fonts/`).

## Deviation from spec §8 (recorded, not a spec change)

- **Open Graph images.** Next.js `opengraph-image` routes export as extension-less files, which GitHub Pages serves as `application/octet-stream`. Spec §8 anticipated this case ("fallback of static files if not"), so the cards are generated as static PNGs by `pnpm og`.
- **Script extensions.** Scripts use `.mts` rather than `.ts`, so Node's built-in type stripping runs them without adding a TypeScript runner dependency.

## Measured

| Check | Result |
| --- | --- |
| `pnpm check:contrast` | Passed: 50 pairs, all ≥ 4.5:1 and in gamut |
| `pnpm validate:content` | 6 experiences, 6 projects, 5 certifications valid |
| `pnpm images` | Project images reduced from 1671–1986 kB to 101–153 kB at full width, plus 35–51 kB at 800 w |
| `pnpm typecheck` / `pnpm lint` / `pnpm format:check` | Clean |
| `pnpm build` | Green; placeholder home at 102 kB first-load JS |
