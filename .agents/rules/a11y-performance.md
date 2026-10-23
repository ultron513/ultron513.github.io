# Accessibility and performance rules (spec §7)

## Budgets (checked at every phase gate by running the tools)

| Metric | Target |
| --- | --- |
| Home first-load JS (from `pnpm build` output) | ≤ 300 kB |
| Every other route's first-load JS, including space routes | ≤ 150 kB |
| Each project image | ≤ 250 kB, delivered at 1600 w and 800 w |
| Lighthouse mobile performance (home and each space) | ≥ 90 |
| Lighthouse accessibility | 100 |
| Largest Contentful Paint (mobile, simulated) | ≤ 2.5 s |
| Text contrast, both themes | ≥ 4.5:1 (`pnpm check:contrast`) |

Baseline before the redesign: home 386 kB, other routes 103–146 kB, project images 1.7–2.0 MB each.

## Accessibility (WCAG 2.2 AA, both themes)

- All text, including text shown inside effects, is real DOM text. Decorative canvases and SVG flourishes are `aria-hidden="true"`.
- Each job space renders its CV bullets as a semantic `<ul>` as well as inside its metaphor.
- **Keyboard:**
    - everything interactive is reachable;
    - in the orbit map, arrow keys move between stations and Enter docks;
    - Ctrl/Cmd+K opens the palette and Esc closes it.
- Focus rings use `--accent` and are always visible. Never remove an outline without a replacement.
- The CV search is a real `<form role="search">`. Download is a real `<a href download>`, and it works without JavaScript. Announce status changes through `aria-live`.
- Minimum text size is 12 px.

## Motion

- Every animation has a `prefers-reduced-motion: reduce` path that shows the final state instantly (see the spec §7 table).
- No scroll-jacking. Native scroll only; use scroll-linked effects through Framer Motion `useScroll`.
- Nothing flashes more than 3 times a second.
- The boot sequence lasts 600 ms or less, runs once per session, is skippable, and never blocks content.
- The CV download fires immediately. The animation (1.6 s or less) is cosmetic and never delays the file.
- No sound.

## 3D and rendering

- Load the R3F canvas after first paint with `next/dynamic` and `ssr: false`.
- Render only while the section is on screen (IntersectionObserver). Pause when `document.hidden`.
- Cap device pixel ratio at 1.5. Use `frameloop="demand"` wherever the scene is idle.
- **Low-power fallback** to a static starfield image when any of these hold:
    - WebGL is unavailable;
    - `navigator.connection?.saveData` is on;
    - `navigator.hardwareConcurrency <= 4`.
- Shaders are hand-written GLSL in `src/components/three/shaders/*.glsl.ts`. No drei.
- Each job space is its own lazy-loaded module, so it ships no code to other routes.

## Images

- Use `pnpm images` (sharp) to produce re-encoded WebP at 1600 w and 800 w. Serve them with `srcset` and `sizes`, plus explicit `width` and `height` to avoid layout shift.
- Use `loading="lazy"` below the fold. The hero's Largest Contentful Paint element is never lazy.
