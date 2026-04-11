import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company showcase page visual parity", () => {
  test("matches the current company showcase baseline", async ({ page }) => {
    await page.goto(publicRoutes.companyShowcase);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("company-showcase-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
