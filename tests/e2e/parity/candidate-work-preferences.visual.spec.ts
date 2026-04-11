import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate work preferences visual parity", () => {
  test("matches the current work preferences baseline for Figma frame 280:1000", async ({
    page,
  }, testInfo) => {
    if (testInfo.project.name === "chromium-desktop") {
      await page.setViewportSize({ width: 1440, height: 1400 });
    }

    await page.goto(publicRoutes.candidateWorkPreferences);
    await waitForWedooPageReady(page);

    await expect(page.getByTestId("candidate-work-preferences-step")).toHaveScreenshot(
      "candidate-work-preferences-step.png",
      {
        animations: "disabled",
      },
    );
  });
});
