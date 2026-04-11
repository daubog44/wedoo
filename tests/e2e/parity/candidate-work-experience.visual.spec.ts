import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate work experience visual parity", () => {
  test(
    "matches the current work experience baseline for Figma frame 280:860",
    async ({ page }, testInfo) => {
      if (testInfo.project.name === "chromium-desktop") {
        await page.setViewportSize({ width: 1440, height: 1200 });
      }

      await page.goto(publicRoutes.candidateWorkExperience);
      await waitForWedooPageReady(page);

      await expect(page.getByTestId("candidate-work-experience-step")).toHaveScreenshot("candidate-work-experience-step.png", {
        animations: "disabled",
      });
    },
  );
});
