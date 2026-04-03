import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("register page visual parity", () => {
  test("matches the current register page baseline", async ({ page }) => {
    await page.goto(publicRoutes.register);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("register-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
