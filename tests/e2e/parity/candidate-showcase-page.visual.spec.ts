import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate showcase page visual parity", () => {
  test("matches the current candidate showcase baseline", async ({ page }) => {
    await page.goto(publicRoutes.candidateShowcase);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("candidate-showcase-page.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
