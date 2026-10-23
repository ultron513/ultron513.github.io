# Design system rules (spec §2)

Applies to every file under `src/`. The full rationale is in `docs/spec/redesign-v1.md` §2.

## Colour

- All colour comes from CSS custom properties defined in `src/design/tokens.css`. Components reference tokens only, for example `bg-[var(--bg-elevated)]`, `text-[var(--text-muted)]` or a Tailwind theme alias mapped to a token.
- **Forbidden in components:**
    - hex, `rgb()`, `hsl()` or `oklch()` literals;
    - Tailwind palette colour classes (`zinc-*`, `slate-*`, `white`, `black`, `neutral-*`, …);
    - opacity tricks on white or black, such as `bg-white/[0.03]`.
- **Themes.** `:root[data-theme="dark"]` is Deep Space. `:root[data-theme="light"]` is Daylight Orbit. Both define every token. Never style one theme only.
- **Contrast.** The lowest text token is `--text-faint`. Nothing smaller or dimmer is allowed for readable text. `pnpm check:contrast` must pass.

### Core tokens (values are fixed by the spec)

| Token | Deep Space | Daylight Orbit |
| --- | --- | --- |
| `--bg` | `oklch(0.15 0.025 272)` | `oklch(0.975 0.008 250)` |
| `--bg-elevated` | `oklch(0.20 0.03 272)` | `oklch(1 0 0)` |
| `--text` | `oklch(0.96 0.01 250)` | `oklch(0.22 0.035 265)` |
| `--text-muted` | `oklch(0.76 0.025 260)` | `oklch(0.44 0.035 262)` |
| `--text-faint` | `oklch(0.64 0.03 262)` | `oklch(0.52 0.03 262)` |
| `--accent` | `oklch(0.83 0.13 210)` | `oklch(0.52 0.09 225)` |
| `--accent-2` | `oklch(0.74 0.14 295)` | `oklch(0.50 0.19 295)` |
| `--border` | `--text` at 12% alpha | `--text` at 12% alpha |
| `--glass` | `--bg-elevated` at 55% alpha + 16px blur | white at 65% alpha + 16px blur |

### Job-space accents

Each space's root element sets `data-space="race|lab|bi|search|campus|terminal"`. That swaps only `--space-accent` (and `--space-accent-2` for race). Base tokens never change per space.

| `data-space` | Deep Space | Daylight Orbit |
| --- | --- | --- |
| `race` | `oklch(0.72 0.16 305)` / `oklch(0.80 0.20 145)` | `oklch(0.48 0.21 305)` / `oklch(0.50 0.15 145)` |
| `lab` | `oklch(0.82 0.14 175)` | `oklch(0.50 0.085 180)` |
| `bi` | `oklch(0.84 0.15 95)` | `oklch(0.52 0.105 80)` |
| `search` | `oklch(0.76 0.11 250)` | `oklch(0.50 0.16 255)` |
| `campus` | `oklch(0.80 0.09 85)` | `oklch(0.50 0.09 70)` |
| `terminal` | `oklch(0.86 0.18 145)` | `oklch(0.50 0.14 145)` |

## Theme mechanics

- Use the custom provider in `src/lib/theme/`. Do not add `next-themes`.
- An inline script in `<head>` sets `data-theme` before first paint, so there is no flash:
    - it reads the saved choice;
    - if there is none, it reads `prefers-color-scheme`.
- Save the choice in `localStorage`, and wrap every access in try/catch.
- The toggle is the orbit dial in the command bar.

## Typography

- **Display:** Space Grotesk. **Body:** Inter. **Data and HUD:** JetBrains Mono Variable. All three are self-hosted from `public/fonts/`.
- **Scale:** fluid `clamp()` steps reaching 12 / 14 / 16 / 20 / 28 / 40 / 64 / 112 px at desktop.
- **Minimum size is 12 px.** No `text-[9px]` or `text-[10px]`.

## Shape and depth

- **Radii:** 8 / 16 / 28 px. **Borders:** 1 px using `--border`. **Spacing:** a 4 px base grid.
- **Signature motif:** HUD corner brackets and glass panels.
- **Depth:** glow in Deep Space, soft shadow in Daylight Orbit.
