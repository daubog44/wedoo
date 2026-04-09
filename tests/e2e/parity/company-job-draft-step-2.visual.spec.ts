import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company job draft step 2 visual parity", () => {
  test("matches the current step 2 baseline for Figma frame 259:1050", async ({
    page,
  }, testInfo) => {
    if (testInfo.project.name === "chromium-desktop") {
      await page.setViewportSize({ width: 1440, height: 1200 });
    }

    await page.goto(portalRoutes.companyJobDraftStep2);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("company-job-draft-step-2.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
