# Phase 2: Shell and Mission Control home

Status: complete, 2026-10-23.

## Built

- **Shell:**
    - Floating glass command bar: wordmark, navigation, Ctrl/Cmd+K button, CV button and the orbit theme dial.
    - Mobile menu built on a native `<dialog>`.
    - Station palette (Ctrl/Cmd+K) on the shared `SearchCombobox`, which follows the ARIA combobox pattern.
    - Warp jump: a raw WebGL star-streak shader that runs for 450 ms on routes into and out of job spaces, with a 150 ms cross-fade under reduced motion.
    - Boot sequence: a corner readout, 600 ms or less, once per session, skippable with any key, and never blocking content.
    - Backdrop with horizon glow, scan lines and grain; footer.
- **3D hero:**
    - R3F scene with a custom-shader starfield (twinkle, size attenuation), a procedural wireframe planet (lat/long grid, fresnel rim, terminator) and orbit rings with a satellite.
    - Pointer parallax on desktop.
    - Daylight Orbit switches to a sunlit limb and constellation lines.
    - The scene lazy-loads on idle, renders only when on screen and visible, and caps DPR at 1.5.
    - Static SVG starfield fallback for low-power devices and as the first paint.
- **Home sections, in spec §4 order:**
    - Hero HUD: coordinates, live UTC clock, role ticker.
    - Telemetry strip: computed counts.
    - Orbit map: three rings, keyboard arrows, live readout, mobile launch manifest.
    - Satellites: tilt cards.
    - Systems panel, flight training, mission patches (original SVG badges with a certificate dialog), readouts, comms.

## Measured

| Check | Result |
| --- | --- |
| Home first-load JS | **173 kB** (budget ≤ 300 kB; three.js loads after first paint) |
| Screenshots | Reviewed at 1440 px and 390 px in both themes. The planet was moved off the text on both widths |
| `pnpm lint` / `pnpm typecheck` / `pnpm format:check` | Clean |

## Known

- three 0.185 logs a deprecation warning for `THREE.Clock`, which R3F 9.8 still creates internally. It is a warning, not an error, and has no effect on the page.
