# Phase 3: CV search and download

Status: complete, 2026-10-23.

## Built

- **`CvConsole`.** A search-engine-style console with the `ashish` wordmark. It has a real `<form role="search">` that submits to the PDF when JavaScript is off, idle placeholders that cycle, autocomplete suggestions (the non-CV ones route to pages), a results view, and Download CV / View online.
- **Results view.**
  - The "1 result (0.0xx seconds)" figure is measured for real: from the request until the results are painted (two animation frames).
  - File size, page count and last-updated date are read from the PDF at build time. The date comes from the PDF's own ModDate, not the file timestamp.
- **Download.**
  - A real `<a href download>` starts the file on click.
  - The transmission plays alongside it: particles assemble into a page, the page folds into a capsule, and the capsule launches along an arc to the nav's CV button, which pulses. The sequence lasts 1.6 s or less.
  - Status is announced through `aria-live`. Reduced motion skips straight to the done state.
- **Placement:**
  - the `/cv` page;
  - an overlay opened by the nav's CV button, with focus moved to the search box;
  - the home Comms section;
  - a "Download CV" action in the Ctrl/Cmd+K palette.

## Measured (Playwright, Chromium)

| Check                                                | Result                                                                          |
| ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| Download event after click                           | Fired after 86–114 ms with `Ashish_Patra_CV.pdf`, before the animation finished |
| Live status at the end                               | "Transmission complete. The CV is downloading."                                 |
| Overlay focus                                        | Focus lands on the combobox                                                     |
| `/cv` first-load JS                                  | 146 kB (budget ≤ 150 kB)                                                        |
| `pnpm lint` / `pnpm typecheck` / `pnpm format:check` | Clean                                                                           |
