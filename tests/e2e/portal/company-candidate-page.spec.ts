import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company candidate detail page", () => {
  test("renders the figma-aligned company candidate shell without the legacy portal navbar", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const layout = page.locator(
      `[data-company-candidate-detail-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await page.goto(portalRoutes.companyCandidate);
    await waitForWedooPageReady(page);

    await expect(page.locator('[data-portal-page="company-candidate-detail"]')).toBeVisible();
    await expect(
      layout.getByRole("heading", { name: portalCopy.companyCandidate.title }),
    ).toBeVisible();
    await expect(
      layout.getByText(portalCopy.companyCandidate.status, { exact: true }),
    ).toBeVisible();
    await expect(
      layout.getByText(portalCopy.companyCandidate.availabilityLabel, { exact: true }),
    ).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.companyCandidate.primaryCta }),
    ).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.companyCandidate.resumeCta }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: portalCopy.companyDashboard.activeSection }),
    ).toHaveCount(0);

    if (isMobile) {
      await expect(
        layout.getByRole("navigation", { name: portalCopy.companyCandidate.mobileDockLabel }),
      ).toBeVisible();
      await expect(
        layout.getByRole("button", { name: "visualizza certificazione" }),
      ).toBeVisible();
    } else {
      await expect(
        layout.getByText("Licenze e certificazioni", { exact: true }),
      ).toBeVisible();
    }
  });

  test("closes back to the company dashboard", async ({ page }) => {
    await page.goto(portalRoutes.companyCandidate);
    await waitForWedooPageReady(page);

    await page.getByRole("button", { name: portalCopy.companyCandidate.closeLabel }).click();

    await expect(page).toHaveURL(portalRoutes.companyDashboard);
    await expect(
      page.getByRole("heading", { name: portalCopy.companyDashboard.profileName }),
    ).toBeVisible();
  });
});
