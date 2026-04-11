import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company candidate page visual parity", () => {
  test("matches the current company candidate detail baseline", async ({
    page,
  }, testInfo) => {
    if (testInfo.project.name !== "chromium-mobile") {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(portalRoutes.companyCandidate);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("company-candidate-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
