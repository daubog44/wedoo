import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("info page", () => {
  test("renders the current sections with the shared public footer", async ({ page }, testInfo) => {
    const layoutRoot = page.locator(
      `[data-info-layout="${testInfo.project.name === "chromium-mobile" ? "mobile" : "desktop"}"]`,
    );

    await page.goto(publicRoutes.info);
    await waitForWedooPageReady(page);

    await expect(page.getByRole("heading", { name: publicCopy.info.aboutHeading })).toBeVisible();
    await expect(page.getByRole("heading", { name: publicCopy.info.goalsHeading })).toBeVisible();
    await expect(page.getByRole("heading", { name: publicCopy.info.faqHeading })).toBeVisible();

    for (const groupLabel of publicCopy.info.faqGroupLabels) {
      await expect(layoutRoot.getByText(groupLabel, { exact: true })).toBeVisible();
    }

    await expect(page.getByText(publicCopy.home.footerRightsLine)).toBeVisible();
  });

  test("reveals faq answers on demand", async ({ page }) => {
    await page.goto(publicRoutes.info);
    await waitForWedooPageReady(page);

    await expect(page.getByText(publicCopy.info.firstAnswer)).toHaveCount(0);
    await page.getByRole("button", { name: publicCopy.info.firstQuestion }).click();
    await expect(page.getByText(publicCopy.info.firstAnswer)).toBeVisible();
  });
});
