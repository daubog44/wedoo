import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";

test.describe("candidate cv page visual parity", () => {
  test("matches the current candidate cv baseline", async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const layout = page.locator(
      `[data-candidate-cv-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(portalRoutes.candidateCv);
    await page.waitForLoadState("domcontentloaded");
    await expect(layout).toBeVisible();

    await expect(layout).toHaveScreenshot("candidate-cv-page.png", {
      animations: "disabled",
    });
  });
});
