---
description: Scaffold one job space (Phases 4–5) from the shared space shell, following spec §5.
---

# New job space

Use this only inside Phase 4 or Phase 5, for a space that phase includes. Input: the space key, one of `race | lab | bi | search | campus | terminal`.

1. **Read the spec.** Read spec §5 (the shared shell, plus this space's subsection), §2 (its `data-space` accent) and `.agents/rules/brand-guardrails.md` (its row). Produce a short plan, then wait for approval in Planning Mode.
2. **Content.** Confirm the experience entry in `src/content/experience.ts` has:
    - `slug` and `space`;
    - `start` and `end`;
    - `cvBullets`, verbatim from the CV (count them against the spec's table);
    - `stack` and `links`.

    Never paraphrase the bullets.
3. **Route.** `src/app/experience/[slug]/page.tsx` already generates every slug through `generateStaticParams`. Map this space's key to its component with `next/dynamic`, so its code ships only on its own route.
4. **Component.** Create it in `src/components/spaces/<key>/`.
    - Wrap it in `SpaceShell` from `spaces/shared/`, which provides the header, module ID, semantic `<ul>` of bullets, stack strip, Undock and previous/next navigation.
    - Set `data-space="<key>"` on the root.
    - Build the signature moment from the spec. Scroll-linked motion uses Framer Motion `useScroll`, with no scroll-jacking.
    - Any data is synthetic: generate it with a seeded function and label it "illustrative".
5. **Reduced motion.** Render the final, settled state with no animation.
6. **Both themes.** Check the space in Deep Space and Daylight Orbit using only tokens.
7. **Checks.** Run `pnpm typecheck`, `pnpm lint`, `pnpm build`, and `pnpm test:visual` for this route. Confirm the route's first-load JS is 150 kB or less.
8. **Report.** Report the result in chat with screenshots. The phase-gate workflow runs once the whole phase is complete.
