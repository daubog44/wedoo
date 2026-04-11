import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate registration flow visual parity", () => {
  test("matches the step 1 baseline for the public candidate registration flow", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.candidateRegistration);
    await waitForWedooPageReady(page);

    const layout = page.locator(
      `[data-candidate-onboarding-layout="${isMobile ? "mobile" : "desktop"}"][data-candidate-onboarding-step="1"]`,
    );
    await expect(layout).toHaveScreenshot("candidate-registration-step-1.png", {
      animations: "disabled",
    });
  });

  test("matches the step 2 baseline for the public candidate registration flow", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.candidatePreferences);
    await waitForWedooPageReady(page);

    const layout = page.locator(
      `[data-candidate-onboarding-layout="${isMobile ? "mobile" : "desktop"}"][data-candidate-onboarding-step="2"]`,
    );
    await expect(layout).toHaveScreenshot("candidate-registration-step-2.png", {
      animations: "disabled",
    });
  });
});
