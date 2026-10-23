# Phase 6: Projects, certificates, contact and 404

Status: complete, 2026-10-23.

## Built

- **`/projects`.** A catalogue of all six satellites as tilt cards. The first two images load eagerly.
- **`/projects/[slug]`.** Category, title, description and "View source on GitHub", plus:
    - a full-width image with `srcset` (800 w and 1536 w);
    - highlights and the tech stack;
    - connected job spaces, worked out from the experience links;
    - a "Next satellite" link.
- **`/certificates`.** The mission-patch gallery with a certificate dialog.
- **`/contact`.** The comms channel page: the CV console and the email, LinkedIn and GitHub channels.
- **404 ("Signal lost").** A static starfield with drifting debris, plus routes back to Mission Control and the orbit map.

## Measured

| Route | First-load JS |
| --- | --- |
| `/projects` | 116 kB |
| `/projects/[slug]` | 106 kB |
| `/certificates` | 113 kB |
| `/contact` | 148 kB |

All are within the 150 kB budget. Screenshots of the project detail page (light), certificates (dark), 404 (dark) and contact (390 px light) were reviewed. `pnpm lint`, `pnpm typecheck` and `pnpm format:check` are clean.
