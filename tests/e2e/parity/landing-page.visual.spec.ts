import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("landing page visual parity", () => {
  test("matches the current landing baseline", async ({ page }, testInfo) => {
    if (testInfo.project.name === "chromium-desktop") {
      await page.setViewportSize({ width: 1440, height: 1100 });
    }

    await page.goto(publicRoutes.home);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("landing-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
