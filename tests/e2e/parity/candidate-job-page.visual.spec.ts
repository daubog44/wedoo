import { expect, test } from "@playwright/test";
import { portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate job page visual parity", () => {
  test("matches the current candidate job detail baseline", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const layout = page.locator(
      `[data-candidate-job-detail-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(portalRoutes.candidateJob);
    await waitForWedooPageReady(page);

    await expect(layout).toHaveScreenshot("candidate-job-page.png", {
      animations: "disabled",
    });
  });
});
