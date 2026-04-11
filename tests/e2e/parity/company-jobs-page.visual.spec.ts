import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company jobs page visual parity", () => {
  test("matches the current company jobs baseline for Figma frames 185:1738 and 267:442", async ({
    page,
  }, testInfo) => {
    await page.addInitScript(() => {
      window.sessionStorage.clear();
    });

    if (testInfo.project.name === "chromium-desktop") {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(portalRoutes.companyJobs);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("company-jobs-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
