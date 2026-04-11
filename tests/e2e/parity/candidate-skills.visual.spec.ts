import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate skills visual parity", () => {
  test("matches the current skills baseline for Figma frame 280:951", async ({
    page,
  }, testInfo) => {
    if (testInfo.project.name === "chromium-desktop") {
      await page.setViewportSize({ width: 1440, height: 1200 });
    }

    await page.goto(publicRoutes.candidateSkills);
    await waitForWedooPageReady(page);

    await expect(page.getByTestId("candidate-skills-step")).toHaveScreenshot("candidate-skills-step.png", {
      animations: "disabled",
    });
  });
});
