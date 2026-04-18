import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company job preview page visual parity", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(portalRoutes.companyJobs);
    await waitForWedooPageReady(page);
    await page.evaluate(() => {
      window.sessionStorage.clear();
    });
  });

  test("matches the current company job preview baseline", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const layout = page.locator(
      `[data-company-job-preview-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(portalRoutes.companyJob);
    await waitForWedooPageReady(page);

    await expect(layout).toHaveScreenshot("company-job-page.png", {
      animations: "disabled",
    });
  });
});
