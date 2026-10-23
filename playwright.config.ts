import { defineConfig, devices } from "@playwright/test";

/*
 * Visual tests (spec §8): home, the six job spaces and /cv, both themes, 390 px and 1440 px.
 * Run after `pnpm build`: `pnpm test:visual`. Screenshots land in tests/__screenshots__/.
 * CHROMIUM_PATH lets a machine reuse a preinstalled Chromium instead of downloading one.
 */
const executablePath = process.env.CHROMIUM_PATH;

export default defineConfig({
  testDir: "tests",
  timeout: 60_000,
  fullyParallel: true,
  reporter: [["list"]],
  use: {
    baseURL: "http://localhost:4173",
    launchOptions: executablePath ? { executablePath } : undefined,
  },
  webServer: {
    command: "node scripts/serve-out.mjs 4173",
    url: "http://localhost:4173",
    reuseExistingServer: true,
  },
  projects: [
    {
      name: "mobile",
      use: {
        ...devices["Pixel 7"],
        viewport: { width: 390, height: 844 },
        browserName: "chromium",
      },
    },
    { name: "desktop", use: { viewport: { width: 1440, height: 900 }, browserName: "chromium" } },
  ],
});
