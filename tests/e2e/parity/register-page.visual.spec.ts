import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("register page visual parity", () => {
  test("matches the current register baseline for Figma frames 336:593 and 336:643", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.register);
    await waitForWedooPageReady(page);

    const registerLayout = page.locator(
      `[data-register-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );
    await expect(registerLayout).toHaveScreenshot("register-page.png", {
      animations: "disabled",
    });
  });
});
