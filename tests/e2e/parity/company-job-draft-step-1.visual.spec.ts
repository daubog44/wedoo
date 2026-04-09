import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company job draft step 1 visual parity", () => {
  test("matches the current step 1 baseline for Figma frame 258:847", async ({
    page,
  }, testInfo) => {
    if (testInfo.project.name === "chromium-desktop") {
      await page.setViewportSize({ width: 1440, height: 1200 });
    }

    await page.goto(portalRoutes.companyJobDraftStep1);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("company-job-draft-step-1.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
