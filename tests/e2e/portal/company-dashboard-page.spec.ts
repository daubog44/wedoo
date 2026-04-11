import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company dashboard page", () => {
  test("renders the Figma-aligned company dashboard shell without the legacy footer", async ({
    page,
  }, testInfo) => {
    await page.goto(portalRoutes.companyDashboard);
    await waitForWedooPageReady(page);

    if (testInfo.project.name === "chromium-mobile") {
      await page.getByRole("button", { name: "Apri navigazione portale azienda" }).click();
    }

    await expect(page.locator('[data-portal-page="company-dashboard"]')).toBeVisible();
    await expect(
      page.getByRole("link", { name: portalCopy.companyDashboard.activeSection }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      page.getByRole("heading", { name: portalCopy.companyDashboard.profileName }),
    ).toBeVisible();
    await expect(page.locator("[data-company-dashboard-card]")).toHaveCount(4);
    await expect(page.getByText("Tutti i diritti riservati")).toHaveCount(0);
  });

  test("opens the mobile company navigation and keeps the dashboard actions visible", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-mobile", "Mobile-only navigation check.");

    await page.goto(portalRoutes.companyDashboard);
    await waitForWedooPageReady(page);

    await expect(page.getByRole("button", { name: "Cerca opportunità" })).toBeVisible();
    await page.getByRole("button", { name: "Apri navigazione portale azienda" }).click();
    await expect(
      page.getByRole("link", { name: portalCopy.companyDashboard.companyJobsSection }),
    ).toBeVisible();
  });

  test("routes the primary CTA to the company candidate detail", async ({ page }) => {
    await page.goto(portalRoutes.companyDashboard);
    await waitForWedooPageReady(page);

    await page.locator("[data-company-dashboard-card]").first().getByRole("link").click();

    await expect(page).toHaveURL(/\/portale\/azienda\/candidati\/azzurra-signorelli$/);
    await expect(
      page.getByRole("heading", { name: /Azzurra Signorelli/i }),
    ).toBeVisible();
  });
});
