import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate dashboard page visual parity", () => {
  test("matches the current candidate dashboard baseline", async ({ page }) => {
    await page.goto(portalRoutes.candidateDashboard);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("candidate-dashboard-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
