# Phase 7: QA and launch readiness

Status: complete on branch `redesign/mission-control`, 2026-10-23. **Not deployed**: merging to `main` publishes the live site, and that is Ashish's call.

## Fixes made during QA

- **Hydration and theme bug.** Under reduced motion, the theme attribute on `<html>` was lost.
  - Cause: reading `matchMedia` during the first render made the client HTML differ from the prerendered HTML. React then re-rendered the root and dropped the `data-theme` set by the pre-paint script.
  - Fix: `usePrefersReducedMotion` is now hydration-safe (false until mounted), and the theme provider re-asserts the attribute.
- **Contrast in the race space.** Unreached sector cards were dimmed with whole-card opacity, which fell below 4.5:1. They now use token colours (`text-muted`) instead.
- **Heading order.** Space interiors and the projects catalogue now use `h2` under the page `h1`.
- **Layout shift.**
  - Outlier terminal: the full response text reserves its final height while tokens stream (CLS 0.169 → 0.002).
  - ISTA results: the real result holds its space under the skeleton (CLS 0.021 → 0.009).
- **Overflow.** On mobile, the ISTA search row pushed text past its card. Grid items may now shrink (`min-width: 0`), and the Playwright suite checks that no text runs past the viewport.
- **Main-thread work.** The BI wall and boot readout use CSS transitions instead of Framer Motion components. The home page went from 180 kB to 156 kB first-load JS, and BI TBT from 290 ms to 70–100 ms.
- **Fonts.** Inter, Space Grotesk and JetBrains Mono are subset to Latin plus the symbols the site uses (pyftsubset, variable axes kept): 352 → 71 kB, 49 → 22 kB, 40 → 38 kB.
- **Static server.** `scripts/serve-out.mjs` now gzips text like GitHub Pages does, so Lighthouse measures realistic transfer sizes.

## Measured

### Playwright (`pnpm test:visual`, Chromium)

46 of 46 tests pass:

- 32 screenshot tests: home, `/cv` and the six spaces, in both themes, at 390 px and 1440 px.
- 10 smoke tests.
- 2 reduced-motion tests: settled state and all 6 CV bullets.
- 2 tests for the 404 status.

Each test asserts: theme applied, exactly one `h1`, no unlabelled images, no console errors, and no text past the viewport.

### Lighthouse 12 (mobile, simulated throttling; served with gzip)

| Route                                        | Performance | Accessibility (light / dark) | Best practices | SEO | LCP       | TBT        | CLS   |
| -------------------------------------------- | ----------- | ---------------------------- | -------------- | --- | --------- | ---------- | ----- |
| `/`                                          | 90–93       | 100 / 100                    | 100            | 100 | 3.2–3.5 s | 80–100 ms  | 0     |
| `/experience/`                               | 94          | 100 / 100                    | 100            | 100 | 2.9 s     | 150 ms     | 0     |
| `/experience/mclaren-racing/`                | 93          | 100 / 100                    | 100            | 100 | 3.2 s     | 70 ms      | 0     |
| `/experience/iit-guwahati/`                  | 94          | 100 / 100                    | 100            | 100 | 3.0 s     | 120 ms     | 0     |
| `/experience/microsoft-elevate/`             | 94          | 100 / 100                    | 100            | 100 | 3.0 s     | 100 ms     | 0     |
| `/experience/ista/`                          | 94–95       | 100 / 100                    | 100            | 100 | 2.9 s     | 120–130 ms | 0.009 |
| `/experience/stanford-code-in-place/`        | 92          | 100 / 100                    | 100            | 100 | 3.1 s     | 130 ms     | 0     |
| `/experience/outlier-ai/`                    | 92–96       | 100 / 100                    | 100            | 100 | 2.6–2.8 s | 100–200 ms | 0.002 |
| `/projects/`                                 | 91          | 100 / 100                    | 100            | 100 | 3.4 s     | 90 ms      | 0     |
| `/projects/f1-telemetry-analytics-platform/` | 95          | 100 / 100                    | 100            | 100 | 2.9 s     | 60 ms      | 0     |
| `/certificates/`                             | 93          | 100 / 100                    | 100            | 100 | 3.0 s     | 130 ms     | 0     |
| `/contact/`                                  | 95          | 100 / 100                    | 100            | 100 | 2.8 s     | 120 ms     | 0     |
| `/cv/`                                       | 92          | 100 / 100                    | 100            | 100 | 3.0 s     | 170 ms     | 0     |

Lighthouse with applied (DevTools) throttling:

| Route         | Performance | LCP   |
| ------------- | ----------- | ----- |
| `/`           | 95          | 1.7 s |
| McLaren space | 99          | 1.6 s |
| `/cv`         | 98          | 1.6 s |

### Budgets (spec §7)

| Budget                          | Result                                     |
| ------------------------------- | ------------------------------------------ |
| Home first-load JS ≤ 300 kB     | **156 kB**: met                            |
| Other routes ≤ 150 kB           | 106–148 kB: met                            |
| Images ≤ 250 kB each            | 101–153 kB: met                            |
| Lighthouse performance ≥ 90     | 90–96 on every route measured: met         |
| Lighthouse accessibility 100    | 100 on every route, both themes: met       |
| Text contrast ≥ 4.5:1           | `check:contrast`: 50 of 50 pairs pass: met |
| LCP ≤ 2.5 s (mobile, simulated) | **2.6–3.5 s simulated: not met**           |

On the LCP miss:

- With applied throttling, LCP is 1.6–1.7 s.
- In a real throttled Playwright run (1.6 Mbps, CPU 4×), LCP equals FCP at 948 ms: the hero `h1` paints once, with no later candidate.
- Lighthouse's simulated estimate counts the Next.js runtime JavaScript that downloads alongside the first paint (103 kB shared). The site cannot remove that without leaving Next.js.

## Known

- three 0.185 logs a deprecation warning for `THREE.Clock` from inside React Three Fiber 9.8. It is a warning only.
- Only Chromium was available here for automated tests. Firefox and Safari need a manual check before launch.
