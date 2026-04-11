import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("password recovery visual parity", () => {
  test("matches the password recovery baseline", async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.passwordRecovery);
    await waitForWedooPageReady(page);

    const recoveryLayout = page.locator(
      `[data-password-recovery-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await expect(recoveryLayout).toHaveScreenshot("password-recovery-page.png", {
      animations: "disabled",
    });
  });

  test("matches the customer support baseline", async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.support);
    await waitForWedooPageReady(page);

    const supportLayout = page.locator(
      `[data-customer-support-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await expect(supportLayout).toHaveScreenshot("customer-support-page.png", {
      animations: "disabled",
    });
  });
});
