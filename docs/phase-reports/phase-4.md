# Phase 4: Job spaces A (McLaren, ISTA, Stanford)

Status: complete, 2026-10-23.

## Built

- **`/experience/[slug]`.** Six statically generated routes, each with its own metadata and Open Graph card.
- **`SpaceShell`.**
    - Undock link, `MOD-0n · start → end` readout, organisation, role, period and location.
    - The space interior.
    - A "Mission log" with every CV bullet verbatim, as a semantic `<ul aria-label="CV highlights">`.
    - Stack, related projects, and newer/earlier module navigation.
- **`SpaceLoader`.** Uses `next/dynamic` per space key, so each interior is its own chunk and still prerenders to HTML.
- **`/experience`.** The orbit map plus a plain timeline.
- **Race (McLaren):**
    - Sticky pit-wall screen: timing-tower line, an original fictional circuit split into six sectors, a car marker driven by native scroll, and a progress trace on the circuit.
    - Throttle, brake and steering traces: seeded synthetic data, labelled "Illustrative traces, synthetic data".
    - Sector cards reveal the six bullets; sector times flip to fastest-sector purple or personal-best green; "Lap complete" with chequered flag.
    - Ashish's own photo (cleared at approval) sits beside the mission log.
- **Search (ISTA):**
    - A search-engine-style page with the `ashish` wordmark. The query "optimal code block design" types itself, skeleton results load, and the result count shows a really measured time.
    - The five bullets appear as results with `ashish › ista › …` breadcrumbs, plus a knowledge panel (Klosterneuburg, May–Jun 2025, Prof. Marco Mondelli, tools).
    - An illustrative control-flow graph reorders its basic blocks with scroll, so the hot path falls through.
- **Campus (Stanford):**
    - A chalkboard writes Python with a stroke animation.
    - A tiered lecture hall of 100 seats fills to "100+ students".
    - Course-catalogue cards and a Dream Decoder card.
- **Reduced motion.** Every space renders its settled final state: lap complete, results shown, blocks reordered, seats filled.

## Measured

| Check | Result |
| --- | --- |
| `/experience/[slug]` first-load JS | 107 kB (budget ≤ 150 kB) |
| `/experience` first-load JS | 122 kB |
| Screenshots | Race at 1440 px (dark and light) and 390 px; ISTA and Stanford at 1440 px. The control-flow graph was checked before and after reordering |
| Fixes from review | Lecture-hall seats reshaped into tiered arcs; mobile pit-wall panel made opaque for legibility; graph scroll mapping moved so the before state is visible on entry |
| `pnpm lint` / `pnpm typecheck` / `pnpm format:check` | Clean |
