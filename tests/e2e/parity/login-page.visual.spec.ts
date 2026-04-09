import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("login page visual parity", () => {
  test("matches the current login baseline for Figma frame 658:667", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.login);
    await waitForWedooPageReady(page);

    const loginLayout = page.locator(
      `[data-login-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );
    await expect(loginLayout).toHaveScreenshot("login-page.png", {
      animations: "disabled",
    });
  });
});
