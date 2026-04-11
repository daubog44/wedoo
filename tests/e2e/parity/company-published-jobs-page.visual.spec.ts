import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";

test.describe("company published jobs page visual parity", () => {
  test("matches the current published jobs baseline", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(portalRoutes.companyPublishedJobs);
    await page.waitForLoadState("domcontentloaded");
    await expect(
      page.locator(
        `[data-company-published-jobs-layout="${isMobile ? "mobile" : "desktop"}"]`,
      ),
    ).toBeVisible();

    await expect(page).toHaveScreenshot("company-published-jobs-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
