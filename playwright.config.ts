import { defineConfig, devices } from "@playwright/test";

const devPort = Number(process.env.WEDOO_DEV_PORT ?? 4600);
const baseURL = `http://127.0.0.1:${devPort}`;

export default defineConfig({
  testDir: "./tests/e2e",
  timeout: 45_000,
  snapshotPathTemplate: "__screenshots__{/projectName}/{testFilePath}/{arg}{ext}",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 4 : 4,
  outputDir: "test-results/playwright",
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL,
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium-desktop",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "chromium-mobile",
      use: { ...devices["Pixel 7"] },
    },
  ],
  webServer: {
    command: `npm run dev -- --host=127.0.0.1 --port=${devPort}`,
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
});
