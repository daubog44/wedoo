import { expect, test } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate contacts visual parity", () => {
  test("matches the current contacts baseline for Figma frame 281:1207", async ({
    page,
  }, testInfo) => {
    if (testInfo.project.name === "chromium-desktop") {
      await page.setViewportSize({ width: 1440, height: 1200 });
    }

    await page.goto(publicRoutes.candidateContacts);
    await waitForWedooPageReady(page);

    await expect(page.getByTestId("candidate-contacts-step")).toHaveScreenshot("candidate-contacts-step.png", {
      animations: "disabled",
    });
  });
});
