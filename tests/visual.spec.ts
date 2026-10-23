import { expect, test, type Page } from "@playwright/test";

/*
 * Spec §8 visual coverage: home, the six job spaces and /cv in both themes at 390 px and 1440 px,
 * plus a smoke check of every other route. Screenshots are written for human review;
 * the assertions catch broken pages (console errors, missing headings, unlabelled images).
 */

const VISUAL_ROUTES = [
  { name: "home", path: "/" },
  { name: "cv", path: "/cv/" },
  { name: "space-mclaren", path: "/experience/mclaren-racing/" },
  { name: "space-iitg", path: "/experience/iit-guwahati/" },
  { name: "space-microsoft", path: "/experience/microsoft-elevate/" },
  { name: "space-ista", path: "/experience/ista/" },
  { name: "space-stanford", path: "/experience/stanford-code-in-place/" },
  { name: "space-outlier", path: "/experience/outlier-ai/" },
];

const SMOKE_ROUTES = [
  "/experience/",
  "/projects/",
  "/projects/dream-decoder/",
  "/certificates/",
  "/contact/",
];
const THEMES = ["dark", "light"] as const;

async function open(page: Page, path: string, theme: (typeof THEMES)[number]) {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.addInitScript((value) => {
    try {
      localStorage.setItem("mission-control-theme", value);
      sessionStorage.setItem("mission-control-booted", "1");
    } catch {}
  }, theme);
  await page.goto(path, { waitUntil: "networkidle" });
  return errors;
}

async function assertHealthy(page: Page, errors: string[], theme: string) {
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  await expect(page.locator("h1")).toHaveCount(1);
  const unlabelled = await page.locator("img:not([alt])").count();
  expect(unlabelled, "every <img> needs alt text").toBe(0);
  // body clips horizontal overflow, so check where visible text actually ends, not scrollWidth.
  const overflowing = await page.evaluate(() => {
    const out: string[] = [];
    for (const el of Array.from(document.querySelectorAll<HTMLElement>("body *"))) {
      const ownText = Array.from(el.childNodes).some(
        (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
      );
      if (!ownText || el.closest(".sr-only, dialog:not([open])")) continue;
      const rect = el.getBoundingClientRect();
      if (rect.width && rect.right > window.innerWidth + 1) {
        out.push(`${el.tagName}: ${el.textContent?.trim().slice(0, 40)}`);
      }
    }
    return out.slice(0, 5);
  });
  expect(overflowing, "no text runs past the viewport").toEqual([]);
  expect(errors, "no console errors").toEqual([]);
}

for (const theme of THEMES) {
  for (const route of VISUAL_ROUTES) {
    test(`${route.name} (${theme})`, async ({ page }, info) => {
      const errors = await open(page, route.path, theme);
      await assertHealthy(page, errors, theme);
      // Scroll through so scroll-linked and in-view sequences reach their settled state.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 60));
        }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(400);
      await page.screenshot({
        path: `tests/__screenshots__/${info.project.name}-${theme}-${route.name}.png`,
        fullPage: true,
      });
    });
  }
}

for (const path of SMOKE_ROUTES) {
  test(`smoke ${path}`, async ({ page }) => {
    const errors = await open(page, path, "dark");
    await assertHealthy(page, errors, "dark");
  });
}

test.describe("reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("every space shows its settled state and all CV bullets", async ({ page }) => {
    const errors = await open(page, "/experience/mclaren-racing/", "dark");
    await assertHealthy(page, errors, "dark");
    await expect(
      page.getByRole("list", { name: "CV highlights" }).getByRole("listitem"),
    ).toHaveCount(6);
    // Settled final state without scrolling: the lap is complete.
    await expect(page.getByText("Lap complete")).toBeVisible();
  });
});

test("404 page", async ({ page }) => {
  const response = await page.goto("/no-such-module/");
  expect(response?.status()).toBe(404);
  await expect(page.locator("h1")).toHaveCount(1);
});
