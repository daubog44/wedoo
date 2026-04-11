import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company dashboard page visual parity", () => {
  test("matches the current company dashboard baseline", async ({ page }) => {
    await page.goto(portalRoutes.companyDashboard);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("company-dashboard-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
