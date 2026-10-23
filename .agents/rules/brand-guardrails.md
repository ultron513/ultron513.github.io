# Brand guardrails (spec §1, §5)

The job spaces are *inspired by* each workplace and never imitate it. The site is public and read by recruiters, so it must never look like it impersonates an organisation or uses its brand assets.

## Never

- Logos, seals, crests, wordmarks, mascots or app icons of McLaren, Stanford, Google, Microsoft or Power BI, ISTA, Outlier or IIT Guwahati, even redrawn, simplified or recoloured.
- Signature trade dress:
    - **McLaren:** papaya-orange livery as the dominant colour; any car likeness or livery.
    - **Stanford:** cardinal red as the dominant colour, the tree, the seal, the Karel robot.
    - **Google:** the four-colour lettering or logo, or a pixel copy of its search page layout.
    - **Microsoft / Power BI:** the Power BI logo or interface chrome.
    - **Outlier:** any Outlier branding.
- Real team or customer data: McLaren telemetry, internal tools, real prompts.
- Fake URLs on real organisations' domains. Breadcrumbs use the site's own paths, for example `ashish › ista › compiler-research`.

## Always

- Organisation names appear only as plain text, in the site's own typefaces and token colours.
- Visual data inside spaces (telemetry traces, AQI panels, eval scores) is synthetic, generated deterministically from a seeded function, and visibly labelled "illustrative".
- Circuits, campuses, offices and terminals are original, fictional designs.
- **Allowed photos:** Ashish's own. `mclaren-racing.webp` is cleared for the race space.

## Per space

| Space | Allowed feel | Do not |
| --- | --- | --- |
| race (McLaren) | Pit wall, timing tower, sector purple and green, chequered "lap complete" | Logo, livery, real circuit data, papaya-dominant palette |
| lab (IIT Guwahati) | Bench, oscilloscope, pipeline | Institute logo or seal |
| bi (Microsoft Elevate / AICTE) | Generic control-room dashboard panels | Power BI UI chrome or logo |
| search (ISTA, with Google Zurich) | Clean search-engine style with the `ashish` wordmark | Google logo, colours, exact layout. "Google Zurich" appears only inside the CV bullet text |
| campus (Stanford Code in Place) | Chalkboard, lecture-hall seats, course cards | Seal, tree, cardinal red, Karel |
| terminal (Outlier.AI) | Eval console, streaming tokens, scorecard | Outlier branding, real prompts |

If you are unsure whether something crosses the line, leave it out and ask Ashish.
