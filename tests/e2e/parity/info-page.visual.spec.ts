import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("info page visual parity", () => {
  test("matches the current info page baseline", async ({ page }) => {
    await page.goto(publicRoutes.info);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("info-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
