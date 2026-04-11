import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate dashboard page", () => {
  test("renders the Figma-aligned candidate dashboard shell without the legacy footer", async ({
    page,
  }, testInfo) => {
    await page.goto(portalRoutes.candidateDashboard);
    await waitForWedooPageReady(page);

    if (testInfo.project.name === "chromium-mobile") {
      await page.getByRole("button", { name: "Apri navigazione portale" }).click();
    }

    await expect(page.locator('[data-portal-page="candidate-dashboard"]')).toBeVisible();
    await expect(
      page.getByRole("link", { name: portalCopy.candidateDashboard.activeSection }),
    ).toHaveAttribute("aria-current", "page");
    await expect(
      page.getByRole("heading", { name: portalCopy.candidateDashboard.profileName }),
    ).toBeVisible();
    await expect(page.locator("[data-candidate-dashboard-card]")).toHaveCount(4);
    await expect(page.getByText("Tutti i diritti riservati")).toHaveCount(0);
  });

  test("opens the mobile candidate navigation and keeps the dashboard actions visible", async ({
    page,
  }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium-mobile", "Mobile-only navigation check.");

    await page.goto(portalRoutes.candidateDashboard);
    await waitForWedooPageReady(page);

    await expect(page.getByRole("button", { name: "Cerca opportunita" })).toBeVisible();
    await page.getByRole("button", { name: "Apri navigazione portale" }).click();
    await expect(
      page.getByRole("link", { name: portalCopy.candidateDashboard.cvSection }),
    ).toBeVisible();
  });

  test("routes the primary CTA to the candidate job detail", async ({ page }) => {
    await page.goto(portalRoutes.candidateDashboard);
    await waitForWedooPageReady(page);

    await page.locator("[data-candidate-dashboard-card]").first().getByRole("link").click();

    await expect(page).toHaveURL(/\/portale\/candidato\/annuncio\/addetto-comunicazione$/);
    await expect(
      page.getByRole("heading", { name: /Addetto comunicazione/i }),
    ).toBeVisible();
  });
});
