import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company registration wizard visual parity", () => {
  test("matches the step 1 baseline for the public company registration flow", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.companyRegistration);
    await waitForWedooPageReady(page);

    const layout = page.locator(
      `[data-company-wizard-layout="${isMobile ? "mobile" : "desktop"}"][data-company-wizard-step="1"]`,
    );
    await expect(layout).toHaveScreenshot("company-registration-step-1.png", {
      animations: "disabled",
    });
  });

  test("matches the final step baseline for the public company registration flow", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.companySustainability);
    await waitForWedooPageReady(page);

    const layout = page.locator(
      `[data-company-wizard-layout="${isMobile ? "mobile" : "desktop"}"][data-company-wizard-step="5"]`,
    );
    await expect(layout).toHaveScreenshot("company-registration-step-5.png", {
      animations: "disabled",
    });
  });
});
