import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate job detail page", () => {
  test("renders the figma-aligned candidate detail shell without the legacy portal navbar", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const layout = page.locator(
      `[data-candidate-job-detail-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await page.goto(portalRoutes.candidateJob);
    await waitForWedooPageReady(page);

    await expect(page.locator('[data-portal-page="candidate-job-detail"]')).toBeVisible();
    await expect(
      layout.getByRole("heading", { name: portalCopy.candidateJob.title }),
    ).toBeVisible();
    await expect(
      layout.getByText(portalCopy.candidateJob.sector, { exact: true }),
    ).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.candidateJob.certificationsCta }),
    ).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.candidateJob.contactCta }),
    ).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.candidateJob.primaryCta }),
    ).toBeVisible();
    await expect(
      layout.getByText(portalCopy.candidateJob.requirements, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: portalCopy.candidateDashboard.activeSection }),
    ).toHaveCount(0);

    if (isMobile) {
      await expect(
        layout.getByRole("navigation", { name: portalCopy.candidateJob.mobileDockLabel }),
      ).toBeVisible();
    } else {
      await expect(layout).toBeVisible();
    }
  });

  test("closes back to the candidate dashboard", async ({ page }) => {
    await page.goto(portalRoutes.candidateJob);
    await waitForWedooPageReady(page);

    await page.getByRole("button", { name: portalCopy.candidateJob.closeLabel }).click();

    await expect(page).toHaveURL(portalRoutes.candidateDashboard);
    await expect(
      page.getByRole("heading", { name: portalCopy.candidateDashboard.firstJobTitle }),
    ).toBeVisible();
  });
});
