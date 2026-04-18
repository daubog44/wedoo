import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

const landingSections = [
  "header",
  "hero",
  "impact",
  "features",
  "video",
  "patronage",
  "footer",
] as const;

test.describe("landing page visual parity", () => {
  test("matches the current landing baseline", async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";

    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1100 });
    }

    await page.goto(publicRoutes.home);
    await waitForWedooPageReady(page);

    const layout = page.locator(
      isMobile ? '[data-home-layout="mobile"]' : '[data-home-layout="desktop"]',
    );

    await expect(layout).toBeVisible();

    for (const sectionName of landingSections) {
      const section = layout.locator(`[data-home-section="${sectionName}"]`);
      await expect(section).toBeVisible();
      await expect(section).toHaveScreenshot(`${sectionName}.png`, {
        animations: "disabled",
        timeout: 20_000,
      });
    }
  });
});
