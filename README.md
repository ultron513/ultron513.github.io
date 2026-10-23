# Ashish Patra: Mission Control

The personal portfolio of Ashish Kumar Patra, live at **https://ultron513.github.io**.

The theme is deep space with futuristic tech. The home page is Mission Control: a 3D hero, an orbit map of six job spaces, projects as satellites and certificates as mission patches. Each workplace has its own themed space:

- a race pit wall for McLaren
- a search office for ISTA
- a lecture hall for Stanford Code in Place
- a research bench for IIT Guwahati
- a BI control room for Microsoft Elevate
- an AI eval console for Outlier

The CV downloads through a search-style console with a transmission animation. Dark (Deep Space) and light (Daylight Orbit) themes are equally supported.

- **Spec:** [`docs/spec/redesign-v1.md`](docs/spec/redesign-v1.md) (frozen) and [`docs/spec/amendments.md`](docs/spec/amendments.md)
- **Build reports:** [`docs/phase-reports/`](docs/phase-reports/)
- **Agent rules (Google Antigravity and others):** [`AGENTS.md`](AGENTS.md) and [`.agents/`](.agents/)

## Stack

Next.js 15 (App Router, static export), React 19, TypeScript, Tailwind CSS v4 with OKLCH design tokens, Framer Motion, React Three Fiber with hand-written GLSL shaders, and Zod (build-time content validation only).

## Develop

Requires Node 22.6 or newer and pnpm 11.

```bash
pnpm install
pnpm dev                 # http://localhost:3000
```

## Check and build

```bash
pnpm typecheck
pnpm lint
pnpm format:check
pnpm check:contrast      # every text token ≥ 4.5:1 in both themes
pnpm build               # validates content, then exports to out/
pnpm start               # serve out/ like GitHub Pages (http://localhost:4173)
pnpm test:visual         # Playwright screenshots and smoke tests (run after build)
```

## Edit content

All text lives in `src/content/`. CV bullets in `experience.ts` are copied word for word from `public/documents/Ashish_Patra_CV.pdf`. After changing content, run `pnpm og` to regenerate the Open Graph cards. `pnpm build` refuses to build if content is invalid or a referenced file is missing.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds `out/` and publishes it to GitHub Pages.
