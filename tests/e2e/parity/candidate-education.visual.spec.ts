import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate education visual parity", () => {
  test("matches the current education baseline for Figma frame 280:1079", async ({
    page,
  }, testInfo) => {
    if (testInfo.project.name === "chromium-desktop") {
      await page.setViewportSize({ width: 1440, height: 1200 });
    }

    await page.goto(publicRoutes.candidateEducation);
    await waitForWedooPageReady(page);

    await expect(page).toHaveScreenshot("candidate-education-step.png", {
      animations: "disabled",
      fullPage: true,
    });
  });
});
