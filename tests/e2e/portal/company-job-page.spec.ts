import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

async function clearCompanyPreviewSession(page: import("@playwright/test").Page) {
  await page.goto(portalRoutes.companyJobs);
  await waitForWedooPageReady(page);
  await page.evaluate(() => {
    window.sessionStorage.clear();
  });
}

test.describe("company job preview page", () => {
  test.beforeEach(async ({ page }) => {
    await clearCompanyPreviewSession(page);
  });

  test("renders the figma-aligned company preview shell without the legacy portal navbar", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const layout = page.locator(
      `[data-company-job-preview-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await page.goto(portalRoutes.companyJob);
    await waitForWedooPageReady(page);

    await expect(page.locator('[data-portal-page="company-job-preview"]')).toBeVisible();
    await expect(
      layout.getByRole("heading", { name: portalCopy.companyJob.title }),
    ).toBeVisible();
    await expect(layout.getByText(portalCopy.companyJob.sector, { exact: true })).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.companyJob.certificationsCta }),
    ).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.companyJob.contactCta }),
    ).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.companyJob.primaryCta }),
    ).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.companyJob.saveDraftCta }),
    ).toBeVisible();
    await expect(
      layout.getByText(portalCopy.companyJob.requirements, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: /Navigazione portale azienda/i }),
    ).toHaveCount(0);

    if (isMobile) {
      await expect(
        layout.getByRole("navigation", { name: portalCopy.companyJob.mobileDockLabel }),
      ).toBeVisible();
    } else {
      await expect(layout).toBeVisible();
    }
  });

  test("closes back to the company annuncio management shell", async ({ page }) => {
    await page.goto(portalRoutes.companyJob);
    await waitForWedooPageReady(page);

    await page.getByRole("button", { name: portalCopy.companyJob.closeLabel }).click();

    await expect(page).toHaveURL(portalRoutes.companyJobs);
    await expect(
      page.getByRole("heading", { name: portalCopy.companyJobs.heading }),
    ).toBeVisible();
  });

  test("submits the preview back to the company dashboard", async ({ page }) => {
    await page.goto(portalRoutes.companyJob);
    await waitForWedooPageReady(page);

    await page.getByRole("button", { name: portalCopy.companyJob.primaryCta }).click();

    await expect(page).toHaveURL(portalRoutes.companyDashboard);
    await expect(
      page.getByRole("heading", { name: portalCopy.companyDashboard.firstCandidateName }),
    ).toBeVisible();
  });
});
