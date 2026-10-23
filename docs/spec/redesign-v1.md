# Portfolio Redesign Spec — Deep Space Mission Control

> **Frozen copy — v1.0, approved by Ashish on 2026-10-23.** This file is the immutable source of truth for the redesign. Do not edit it. Any change requires a new version (`redesign-v2.md`) approved by Ashish.
> Exported from the approved Claude Doc. The only difference is §10: the roadmap diagram is written out as a table here, because Markdown cannot embed it.

Oct 23, 2026 · Ashish

## Status and locked decisions

v1.0, approved by Ashish on 23 Oct 2026 and frozen as docs/spec/redesign-v1.md. It replaces the Phase 1–5.5 specs as the single source of truth. Any change from here needs a new version.

| Decision | Your answer | What it means in this spec |
| --- | --- | --- |
| Antigravity | Google Antigravity IDE | Antigravity is the build tool. §9 adds `AGENTS.md`, rules and per-phase workflows so its agent follows this spec. No zero-gravity physics engine. |
| Job spaces | All six | Each experience gets its own themed route and interior (§5). |
| Themes | Keep dark and light, equally polished | Two full token sets: **Deep Space** (dark) and **Daylight Orbit** (light) (§2). |
| First deliverable | Written spec only | Approve, or change, this doc first. Phases run one at a time after that (§10). |

This also settles the design-system gap from the audit: the hex, dark-only colour variables are replaced by OKLCH tokens that support both themes.

## Creative direction: Mission Control

The portfolio becomes a ground station that tracks one engineer's career as an orbital network. The space theme sets the world, and futuristic tech provides the instruments: HUD readouts, telemetry type, holographic panels, coordinates.

| Site element | In the metaphor |
| --- | --- |
| Home page | Mission Control: the bridge you launch from |
| Each job | A docked module, or "job space", with its own interior (race pit wall, campus, search office…) |
| Projects | Satellites in orbit, each with its own telemetry card |
| Certificates | Mission patches |
| CV download | A search-engine terminal that "transmits" the file |
| Route changes | A short warp jump between modules |

**Principles**

- **Real content inside the effects.** Every effect frames real CV text. No invented metrics, data or claims.
- **One signature moment per screen.** Each page gets one hero interaction, and everything else stays calm.
- **Quiet chrome, loud content.** HUD details are thin lines and small mono type, never competing with the copy.
- **Readable without effects.** Every word is real DOM text, and reduced-motion users get the full content.

**Brand guardrails.** Spaces are *inspired by* each workplace, never imitations of it. The public site recruiters see must not look like it impersonates an organisation.

- No logos, seals, wordmarks or mascots of McLaren, Stanford, Google, Microsoft or Power BI, ISTA, Outlier or IIT Guwahati.
- No signature trade dress: no papaya-orange livery as the dominant colour, no Stanford cardinal-and-tree, no Google four-colour lettering, no Power BI interface chrome.
- Organisation names appear only as plain text in the site's own typefaces.
- No real team data (McLaren telemetry, internal tools). All visual data is synthetic and labelled "illustrative".
- Your own photos (for example `mclaren-racing.webp`) are fine if you hold the rights.

## Design system

All colour lives in semantic OKLCH tokens, with one set per theme. Components never use raw colours or Tailwind palette classes like `zinc-600`. Every text token below was checked with a script (OKLCH → sRGB → WCAG ratio). Each one is in the sRGB gamut and reaches at least 4.5:1 on both the page background and elevated surfaces.

**Themes**

- **Deep Space (dark).** Indigo-black void, a parallax starfield, cyan plasma accents and soft glows.
- **Daylight Orbit (light).** A white spacecraft interior in sunlight: pale ceramic panels, deep navy ink, an Earth-limb gradient on the horizon, and stars drawn as faint constellation lines. It is not an inverted dark theme.
- **Default and persistence.** The first visit follows the OS setting, and the choice is saved per visitor. A custom ~40-line theme provider plus an inline pre-paint script prevent a theme flash, and `next-themes` is removed.
- **The toggle** is a small orbit dial that rotates between the night side and the day side.

**Core tokens**

| Token | Deep Space | Contrast on bg | Daylight Orbit | Contrast on bg |
| --- | --- | --- | --- | --- |
| `--bg` | `oklch(0.15 0.025 272)` | — | `oklch(0.975 0.008 250)` | — |
| `--bg-elevated` | `oklch(0.20 0.03 272)` | — | `oklch(1 0 0)` | — |
| `--text` | `oklch(0.96 0.01 250)` | 17.6:1 | `oklch(0.22 0.035 265)` | 16.2:1 |
| `--text-muted` | `oklch(0.76 0.025 260)` | 9.2:1 | `oklch(0.44 0.035 262)` | 7.2:1 |
| `--text-faint` (lowest allowed) | `oklch(0.64 0.03 262)` | 5.9:1 | `oklch(0.52 0.03 262)` | 5.1:1 |
| `--accent` (plasma) | `oklch(0.83 0.13 210)` | 12.2:1 | `oklch(0.52 0.09 225)` | 5.0:1 |
| `--accent-2` (nebula) | `oklch(0.74 0.14 295)` | 8.2:1 | `oklch(0.50 0.19 295)` | 6.1:1 |
| `--border` | `--text` at 12% alpha | — | `--text` at 12% alpha | — |
| `--glass` | `--bg-elevated` at 55% alpha + 16px blur | — | white at 65% alpha + 16px blur | — |

**Job-space accents.** Each space sets `data-space="…"` on its root, which swaps only `--space-accent`. The base tokens and the contrast rules stay the same.

| Space | Accent idea | Deep Space | Daylight Orbit |
| --- | --- | --- | --- |
| Race (McLaren) | Timing-screen "fastest sector" purple, with personal-best green as second | `oklch(0.72 0.16 305)` / `oklch(0.80 0.20 145)` | `oklch(0.48 0.21 305)` / `oklch(0.50 0.15 145)` |
| Lab (IIT Guwahati) | Oscilloscope teal | `oklch(0.82 0.14 175)` | `oklch(0.50 0.085 180)` |
| BI room (Microsoft Elevate) | Data amber | `oklch(0.84 0.15 95)` | `oklch(0.52 0.105 80)` |
| Search office (ISTA) | Compiler blue (one hue only) | `oklch(0.76 0.11 250)` | `oklch(0.50 0.16 255)` |
| Campus (Stanford) | Library brass on chalkboard | `oklch(0.80 0.09 85)` | `oklch(0.50 0.09 70)` |
| Terminal (Outlier) | Phosphor green | `oklch(0.86 0.18 145)` | `oklch(0.50 0.14 145)` |

**Typography**

- **Display:** Space Grotesk (already self-hosted).
- **Body:** Inter (already self-hosted).
- **Data and HUD:** JetBrains Mono Variable, self-hosted and OFL-licensed. Used for coordinates, timestamps, telemetry labels and the CV search box.
- **Scale:** fluid `clamp()` steps, 12 / 14 / 16 / 20 / 28 / 40 / 64 / 112 px at desktop. Minimum text size is 12 px, so the current 9 px labels go away.

**Shape and depth.** Radii are 8 / 16 / 28 px. Panels use 1 px borders, glass surfaces and an inner HUD corner-bracket motif. In dark mode, depth comes from glow. In light mode it comes from soft shadow. Spacing uses a 4 px base grid.

## Information architecture

Six new job-space routes and a `/cv` route are added. Every existing URL stays, so current links and the sitemap keep working.

| Route | Purpose | Status |
| --- | --- | --- |
| `/` | Mission Control home (§4) | Redesigned |
| `/experience` | Orbit map of all six spaces, plus a plain timeline view | Redesigned |
| `/experience/mclaren-racing` | Race space: pit wall | New |
| `/experience/iit-guwahati` | Lab space: research bench | New |
| `/experience/microsoft-elevate` | BI space: control room | New |
| `/experience/ista` | Search space: search office | New |
| `/experience/stanford-code-in-place` | Campus space: lecture hall | New |
| `/experience/outlier-ai` | Terminal space: AI eval console | New |
| `/projects`, `/projects/[slug]` | Satellite catalogue and detail pages | Restyled |
| `/certificates` | Mission patches | Restyled |
| `/cv` | Search-style CV page and download flow (§6) | New |
| `/contact` | "Open comms channel" | Restyled |
| 404 | "Signal lost": drifting debris field with a route home | Restyled |

**Navigation**

- A floating glass command bar holds Home, Experience, Projects, Certificates and Contact, plus a **CV** button and the theme dial.
- **Ctrl/Cmd + K** opens a station-wide search palette built on the same component as the CV search (§6). It jumps to any space, project or section.
- Each job space has **Undock** (back to the orbit map) and previous/next-module links in date order.

**Content model changes**

- One source of truth per entity in `src/content/`. Each file is validated by a Zod schema at build time, and types come from `z.infer`. This replaces the unused hand-written `src/types/`, and the `zod` dependency finally gets used.
- `Experience` gains these fields:
    - `slug`
    - `space`: one of `race | lab | bi | search | campus | terminal`
    - `start` and `end` as ISO months
    - `cvBullets`: copied verbatim from the CV
    - `stack`: tools named in those bullets
    - `links`: related project slugs
- Hero counters (degrees, experiences, projects) are computed from the content files instead of typed by hand.
- A single navigation definition replaces the duplicate in `lib/constants.ts`.
- `sitemap.xml` is generated from the content at build, so new spaces and projects are listed automatically.

## Home page: Mission Control

The home page is one continuous descent from deep orbit to ground. Each section is a station on the way down, in this order:

1. **Launch hero**
    - Full-viewport 3D scene: a custom-shader starfield with pointer parallax, a procedural wireframe planet and two slow orbit rings.
    - A HUD overlay shows the mission name, Bhubaneswar coordinates (20.30° N, 85.82° E), a live UTC clock and your three roles typed out one by one.
    - The headline and intro come from `profile`. Buttons: Explore Projects, Enter Orbit Map, CV.
    - In Daylight Orbit, the planet becomes a sunlit limb and the stars become constellation lines.
2. **Boot sequence.** This replaces the current loading screen with a 600 ms "systems check". It runs once per session, can be skipped with any key, and never blocks content.
3. **Telemetry strip.** Computed stats: degrees, experiences, projects, LeetCode rank, Codeforces rating. Numbers count up when they enter view.
4. **Orbit map.** The six job spaces orbit a central core, and their ring order follows dates (most recent on the inner ring).
    - Hover or focus shows role and period. Click warps into that space.
    - On mobile it becomes a vertical "launch manifest" list.
5. **Satellites (projects).** The four featured projects appear as holographic cards with pointer tilt, a category readout and their tech stack as telemetry chips.
6. **Systems panel (skills).** The four skill categories become instrument clusters, with chips that light up on hover.
7. **Flight training (education).** A vertical trajectory with IIT Guwahati, IIIT Bhubaneswar, Class XII and Class X as waypoints.
8. **Mission patches (certificates).** Five original patch badges, one shape per category with no issuer logos. Clicking one opens the certificate image.
9. **Achievements.** A short readout row.
10. **CV console and comms.** The search-style CV box (§6) sits beside "Open a channel" (email, LinkedIn, GitHub).

The 3D scene loads only after first paint and stops rendering once the hero leaves the viewport (§7).

## The six job spaces

Each experience gets its own interior, but all six share one shell, so they feel like modules of the same station.

**Shared shell (every space)**

- **Arrival.** A warp transition docks into the space (§7).
- **Header.** Organisation, role, dates and location as plain text, plus a "module ID" readout such as `MOD-03 · 2025-05 → 2025-06`.
- **Content.** Every CV bullet appears verbatim, both inside the space's metaphor and as a semantic `<ul>`, so screen readers and search engines get clean text.
- **Stack and links.** A tools strip, links to related projects, Undock, and previous/next module.
- **Reduced motion.** Each space renders its final, settled state with no scroll-linked animation. The page scrolls normally and is never scroll-jacked.

| Space | Route slug | Metaphor | Signature moment | CV bullets |
| --- | --- | --- | --- | --- |
| McLaren Racing | `mclaren-racing` | Pit wall and timing screen | Scrolling drives a car marker round a circuit, sector by sector | 6 |
| IIT Guwahati | `iit-guwahati` | Research lab bench | A data pipeline lights up stage by stage | 2 |
| Microsoft Elevate / AICTE | `microsoft-elevate` | BI control room | The dashboard assembles itself panel by panel | 3 |
| IST Austria | `ista` | Search office | A query types itself, then the results load | 5 |
| Stanford Code in Place | `stanford-code-in-place` | Lecture hall | 100 seats fill as students arrive | 2 |
| Outlier.AI | `outlier-ai` | AI eval terminal | Responses stream, then get validated | 3 |

### McLaren Racing: the pit wall

- **Layout:** a timing-tower header (your role as the driver line, May–July 2026 as the session clock). Below it is an original, fictional circuit outline split into six sectors, with a telemetry panel showing throttle, brake and steering traces.
- **Signature:** scrolling moves a car marker round the lap. Each sector reveals one CV bullet, and its sector time flips to fastest-sector purple or personal-best green. Finishing the lap shows a chequered "lap complete" banner.
- **Content:** all 6 bullets, one per sector. Stack: Python, SQL, statistical methods, ML, time-series analysis. Links to the F1 Telemetry Analytics Platform project.
- **Guardrails:**
    - Traces are synthetic, generated from a seeded function and labelled "illustrative". No team data.
    - No logo, livery or car likeness, and papaya is not the dominant colour.

### IIT Guwahati: the research lab

- **Layout:** a lab bench with an oscilloscope-style panel and a four-stage pipeline: raw data → features → model → evaluation.
- **Signature:** a signal pulse travels the pipeline as you scroll. Each stage lights up and shows the matching part of the two bullets.
- **Content:** both bullets. Stack: Python, Scikit-learn.

### Microsoft Elevate / AICTE: the BI control room

- **Layout:** a dark control-room wall of panels: KPI cards, a trend line, city rankings, a stylised map and filter chips. All of these elements are named in your CV.
- **Signature:** panels slide in and populate one by one, and each of the three bullets annotates the panels it describes.
- **Content:** 3 bullets. Stack: Power BI, Power Query, DAX. Links to the Air Quality Monitoring Dashboard project and uses your own project screenshot.
- **Guardrails:** synthetic, labelled AQI-style data. No Power BI logo or interface chrome.

### IST Austria: the search office

- **Layout:** a clean search-engine page with your own wordmark. The query "optimal code block design" types itself in.
    - The results list shows each of the 5 bullets as a result: a title, a breadcrumb like `ashish › ista › compiler-research`, and the bullet as the snippet.
    - A knowledge panel on the right lists Klosterneuburg, May–June 2025, supervisor Prof. Marco Mondelli, and the stack.
- **Signature:** "About 5 results (0.0x seconds)" uses a real measured time. Further down, a control-flow graph of code blocks reorders itself as you scroll, nodding to the research topic.
- **Content:** all 5 bullets. Stack: C++, Python, LLVM, Graphviz, Git, performance profiling.
- **Guardrails:**
    - Search-engine *style*, not a copy of Google: no Google logo, four-colour lettering or exact layout.
    - "Google Zurich" appears only as plain text inside your bullet.

### Stanford Code in Place: the lecture hall

- **Layout:** a chalkboard header writes a few lines of Python by hand-drawn stroke animation. Below it is a tiered lecture-hall seat map with 100 seats, and the bullets appear as course-catalogue cards.
- **Signature:** the seats fill one by one up to "100+ students", the only figure your CV states. A side card links to the Dream Decoder project.
- **Content:** both bullets. Stack: Python, CS106A curriculum.
- **Guardrails:** no seal, tree, cardinal red or Karel robot. A generic campus feel only.

### Outlier.AI: the AI eval terminal

- **Layout:** a terminal console with a prompt pane, a response pane and an evaluation scorecard.
- **Signature:** each bullet streams in token by token as a "response". A validation pass then ticks it off with "output validated".
- **Content:** 3 bullets. Stack: prompt engineering, NLP, model evaluation.
- **Guardrails:** no Outlier branding, and no real prompts or customer data.

## CV download flow

The CV is fetched through a search-engine-style console, and the download starts the instant you ask. The animation plays alongside it and never delays the file.

**Where it appears:** the `/cv` page, the CV button in the nav (opens it as an overlay), the home page's final section, and Ctrl/Cmd + K.

**The look.** A centred personal wordmark in Space Grotesk, one rounded search box in mono type, and two buttons below it: **Download CV** and **View online**. It reads as a search engine without copying any real one.

**The flow**

1. **Idle.** The placeholder cycles through `ashish patra cv`, `f1 data scientist resume` and `ml engineer portfolio`.
2. **Typing.** An autocomplete list suggests "ashish patra cv pdf", "… experience", "… projects" and "… contact". The non-CV suggestions route to those pages.
3. **Search.** Pressing Enter or Download shows a results view: "1 result (0.0x seconds)", where the time is really measured.
    - The top result card shows `Ashish_Patra_CV.pdf`, its file size and last-updated date (both read from the file at build time), and a one-line summary.
4. **Download.** The file download fires immediately through a real `<a href download>`. At the same time:
    - the button morphs into a progress ring;
    - particles assemble into a page silhouette;
    - the page folds into a small capsule and launches along an arc towards the nav's CV icon.

    The whole sequence is 1.6 s or less.
5. **Done.** "Transmission complete" appears, with "Open in new tab" as a fallback.

**Accessibility and fallbacks**

- The box is a real `<form role="search">`. Without JavaScript it is a plain download link, which works on the static export.
- Status changes are announced through an `aria-live` region.
- With reduced motion, the state changes instantly to a check icon.

**Privacy fix (needed before launch).** The CV currently on the live site exposes your date of birth, phone number, home address and college ID. This spec publishes a *public* CV variant without those four items. Keep the full version for direct applications. The file name stays `Ashish_Patra_CV.pdf`.

## Motion, 3D and effects

Three libraries do all the work, and everything else is written by hand: Framer Motion for UI motion, React Three Fiber with three.js for 3D, and custom GLSL shaders. GSAP, Lenis and drei are removed: native scroll plus Framer's `useScroll` covers scroll-linked motion, and small custom helpers replace drei.

| Effect | Where | Built with | Reduced motion |
| --- | --- | --- | --- |
| Parallax starfield | Hero, 404, space backdrops | Custom point shader, pointer-driven | Static star image |
| Procedural planet and orbit rings | Home hero | Custom shader on a sphere, line loops | Static render |
| Warp jump | Every route change into or out of a space | Star-streak shader pass, 450 ms, then fade | Simple 150 ms cross-fade |
| Text decrypt | Section headings, HUD labels | Custom character scramble, under 600 ms | Plain text |
| Holographic tilt | Project cards, mission patches | Pointer math and a CSS transform with a sheen gradient | No tilt |
| HUD details | Panels site-wide | CSS corner brackets, scan-line and grain overlays at 3–6% opacity | Kept (static) |
| Count-up numbers | Telemetry strip | Framer Motion `animate` | Final numbers |
| Space signature moments | §5 | SVG with Framer Motion, scroll-linked | Final state |

**Rules**

- No scroll-jacking. The page always scrolls natively.
- Nothing flashes more than 3 times a second.
- Sound is off and not built.
- The 3D canvas is lazy-loaded after first paint (`dynamic(…, { ssr: false })`).
    - It renders only when its section is on screen and pauses when the tab is hidden.
    - Device pixel ratio is capped at 1.5.
- **Low-power fallback:** if WebGL is unavailable, `navigator.connection.saveData` is on, or the device has 4 or fewer CPU cores, the site uses a static starfield image instead of the canvas.

**Budgets.** The "today" values were measured in the production build I ran on the current repo. Each phase gate checks these targets by running the tools, not by estimating.

| Metric | Today | Target |
| --- | --- | --- |
| Home first-load JS | 386 kB | ≤ 300 kB |
| Other routes' first-load JS | 103–146 kB | ≤ 150 kB, space routes included |
| Project images | 1.7–2.0 MB each, 11 MB total | ≤ 250 kB each, at 1600 w and 800 w |
| Lighthouse mobile performance | Not measured | ≥ 90 on home and each space |
| Lighthouse accessibility | Not measured | 100 |
| Largest Contentful Paint (mobile, simulated) | Not measured | ≤ 2.5 s |
| Text contrast | 2.0–4.2:1 for the zinc-500/600/700 labels | ≥ 4.5:1 everywhere (tokens in §2) |

**Accessibility.** The target is WCAG 2.2 AA in both themes.

- All effect text is real DOM text, and decorative canvases are `aria-hidden`.
- The orbit map works with the keyboard: arrow keys move between stations and Enter docks.
- Focus rings use `--accent` and are always visible.

## Technical architecture and cleanup

The stack stays the same: Next.js 15 static export to GitHub Pages, React 19, Tailwind v4 and pnpm. What changes is the structure around it. Each job space is its own lazy-loaded module, so a visitor only downloads the space they open.

```
src/
  app/                    routes (§3), incl. experience/[slug], cv, sitemap.ts
  content/                schema.ts (Zod) + profile, experience, projects, …
  design/                 tokens.css (OKLCH, both themes), spaces.css
  lib/theme/              custom theme provider + pre-paint script
  components/
    shell/                command bar, theme dial, command palette, warp transition
    hud/                  brackets, readouts, decrypt text, telemetry chips
    three/                scene, starfield, planet, shaders/*.glsl.ts
    spaces/
      shared/             space shell, undock, module nav
      race/ lab/ bi/ search/ campus/ terminal/
    cv-search/            search box, suggestions, results, download sequence
    sections/             home sections (§4)
scripts/                  check-contrast.ts, optimise-images.ts
```

**Cleanup carried over from the audit**

- [ ] Remove `gsap`, `lenis`, `@react-three/drei`, `class-variance-authority` and `next-themes`. Every later dependency addition needs your approval.
- [ ] Replace `src/types/` with Zod-inferred types, and fix the missing `image` field.
- [ ] Use one navigation source, and delete the unused `PROJECT_SLUGS`, `useScrollProgress` and unused animation variants.
- [ ] Compute the hero counters from content. This fixes "6 featured projects" when 4 are featured.
- [ ] Re-encode project images (`scripts/optimise-images.ts` using sharp, already allowed in `pnpm-workspace.yaml`).
- [ ] Decide on the unused `profile/ashish-patra.webp` and `experience/mclaren-racing.webp`. The spec proposes using both: the profile photo in the comms section, the McLaren photo in the race space.
- [ ] Replace the deprecated `next lint` with an ESLint flat config (`eslint-config-next`) and `"lint": "eslint ."`.
- [ ] Run Prettier once across the repo; 73 files are currently flagged.
- [ ] Finish the README (it currently ends inside an unclosed code block).
- [ ] Generate `sitemap.ts` and per-page `opengraph-image` at build. Both must be confirmed working with `output: "export"` by an actual build in Phase 1, with a fallback of static files if not.
- [ ] Give each page its own canonical `og:url` (today every page points to the homepage).

**Verification tooling added**

- `scripts/check-contrast.ts` reads `tokens.css` and fails the build if any text pair falls below 4.5:1.
- Playwright screenshot tests cover home, the six spaces and `/cv`, in both themes, at 390 px and 1440 px widths.
- Lighthouse runs on the built `out/` folder, and its results are checked against §7's budgets.

## Building with Google Antigravity

Antigravity's agent builds the site one phase at a time. This spec, a set of rules files and one gate workflow keep it inside the plan.

**Files added to the repo after approval**

| File | Holds | Why |
| --- | --- | --- |
| `docs/spec/redesign-v1.md` | This approved spec, exported as Markdown | The immutable source of truth. The agent never edits it. |
| `AGENTS.md` (repo root) | Project summary, commands, hard rules, links to the spec | Antigravity reads `AGENTS.md` as workspace rules from IDE 1.20.5 onward. The file limit is 12,000 characters. |
| `.agents/rules/design-system.md` | Token-only colours, typography, the `data-space` pattern | Keeps every space visually consistent |
| `.agents/rules/brand-guardrails.md` | §1's guardrails | Prevents logo or trade-dress drift |
| `.agents/rules/a11y-performance.md` | §7's budgets and accessibility rules | Gives each phase measurable targets |
| `.agents/workflows/phase-gate.md` | The steps to finish a phase (below) | A repeatable, saved procedure |
| `.agents/workflows/new-space.md` | How to scaffold a job space from the shared shell | Used in Phases 4–5 |

**Hard rules in `AGENTS.md`**

- The spec is read-only. Where it is unclear, stop and ask instead of improvising.
- Work only on the current phase, and never start the next phase without explicit approval.
- Add no dependency without approval.
- Use no raw colours, only tokens. No brand assets.
- All CV text comes from `src/content/` and is copied verbatim.
- Every animation has a reduced-motion path.

**Phase-gate workflow (run at the end of every phase)**

1. `pnpm typecheck`, `pnpm lint`, `pnpm build`: all must pass with zero errors.
2. `pnpm check:contrast` and the Playwright screenshots in both themes.
3. Lighthouse on `out/` against the budgets.
4. Use the browser agent to visually walk the changed pages in both themes.
5. Write a phase report: what was built, what was measured, any deviations. Then **stop for your approval**.

**How to run it.** Use Planning Mode for each phase, so the agent produces a plan you review before it writes code. Fast Mode is only for small fixes inside an approved phase.

Antigravity has renamed its rules folder from `.agent/` to `.agents/` (the old name still works). Check the folder name against your installed version in Phase 1.

Sources: [The Prompt Shelf: Antigravity AGENTS.md and rules guide](https://thepromptshelf.dev/blog/google-antigravity-agents-md-rules-guide-2026), [AI Meets Code: Antigravity rules, workflows and MCP](https://aimeetcode.substack.com/p/antigravity-full-guide-from-install).

## Phases and gates

The work runs in eight phases, and each one ends at a gate that needs your explicit approval. Phase 1 must land before anything visible changes, because every later phase builds on its tokens and content model.

*Eight gated phases: nothing advances without your sign-off. Each gate runs the build, lint, budgets and screenshots, then stops for approval.*

| Phase | Delivers | Gate | Gate criteria |
| --- | --- | --- | --- |
| 0 · Spec approval | This doc: answer open questions, then sign off | Your sign-off | Spec frozen as redesign-v1.md |
| 1 · Foundation | OKLCH tokens, both themes, Zod content, cleanup, public CV | Build green | Contrast passes, unused deps gone |
| 2 · Shell and Mission Control home | Command bar, theme dial, 3D hero, orbit map, warp jump | Budgets met | Home JS ≤ 300 kB, Lighthouse ≥ 90 |
| 3 · CV search and download | Search console, results, download sequence, Cmd+K palette | Works without JS | Download fires instantly, a11y 100 |
| 4 · Job spaces A | McLaren pit wall, ISTA search office, Stanford lecture hall | Per-space review | Screenshots, both themes, 2 widths |
| 5 · Job spaces B | IIT Guwahati lab, Microsoft Elevate BI room, Outlier terminal | Per-space review | Same checks as Phase 4 |
| 6 · Projects, certificates, contact, 404 | Satellite cards, mission patches, comms page, signal-lost page | Full-site visual pass | Both themes, reduced motion on |
| 7 · QA and launch | Cross-browser, performance pass, deploy to GitHub Pages | Live site verified | Lighthouse on the deployed URL |

Every gate also runs the phase-gate workflow in §9. If you'd rather approve the job spaces one at a time, Phases 4 and 5 can be split into one gate per space.

## Open questions for approval

Resolved at approval: the public-CV and McLaren-photo questions were confirmed, and the bracketed default was accepted for every other question.

- [x] **Public CV.** OK to publish a version without date of birth, phone, home address and college ID? [Yes]
- [ ] **CV inconsistencies.** The CV header says "Asish" but the site says "Ashish". The synopsis says 1900+ LeetCode problems, but the achievements section and the site say 1800+. Which are correct? [Use "Ashish" and fix the CV's own count]
- [x] **McLaren photo.** Is `mclaren-racing.webp` your own photo, cleared for public use? [Use it only if yes]
- [ ] **Wordmark.** What text should the search-style pages show as the wordmark? [`ashish` in lowercase Space Grotesk]
- [ ] **Playful CV button.** Add a third, tongue-in-cheek button such as "Feeling hired?" next to Download CV? [No. Keep it clean]
- [ ] **First-visit theme.** Follow the OS setting, or always start in Deep Space? [Follow the OS]
- [ ] **Order of the job spaces.** Build the three you named first (McLaren, ISTA, Stanford) in Phase 4? [Yes]
