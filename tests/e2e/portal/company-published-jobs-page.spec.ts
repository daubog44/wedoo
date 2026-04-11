import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

function getLayoutName(projectName: string) {
  return projectName === "chromium-mobile" ? "mobile" : "desktop";
}

async function openPublishedJobsPage(
  page: import("@playwright/test").Page,
  layoutName: "desktop" | "mobile",
  route: string = portalRoutes.companyPublishedJobs,
) {
  await page.goto(route);
  await page.waitForLoadState("domcontentloaded");

  const layout = page.locator(`[data-company-published-jobs-layout="${layoutName}"]`);
  await expect(layout).toBeVisible();
  await expect(page.locator("footer")).toHaveCount(0);

  return layout;
}

test.describe("company published jobs page", () => {
  test("renders the figma-aligned published jobs list without the legacy portal navbar", async ({
    page,
  }, testInfo) => {
    const layoutName = getLayoutName(testInfo.project.name);
    const layout = await openPublishedJobsPage(page, layoutName);

    await expect(
      layout.getByText(portalCopy.companyPublishedJobs.helper, { exact: true }),
    ).toBeVisible();
    await expect(
      layout.getByRole("heading", { name: portalCopy.companyPublishedJobs.firstCardTitle }),
    ).toBeVisible();
    await expect(
      layout.getByRole("heading", { name: portalCopy.companyPublishedJobs.secondCardTitle }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: /Navigazione portale azienda/i }),
    ).toHaveCount(0);

    if (layoutName === "desktop") {
      await expect(layout.getByLabel("localita")).toBeVisible();
      await expect(
        layout.getByRole("button", {
          name: portalCopy.companyPublishedJobs.resetFiltersCta,
        }),
      ).toBeVisible();
    } else {
      await expect(
        layout.getByRole("navigation", { name: portalCopy.companyJob.mobileDockLabel }),
      ).toBeVisible();
    }
  });

  test("routes the company shell viewJobs CTA to the published jobs state", async ({
    page,
  }, testInfo) => {
    const layoutName = getLayoutName(testInfo.project.name);
    test.skip(layoutName === "mobile", "Il CTA visualizza annunci esiste solo nel shell desktop.");
    await page.goto(portalRoutes.companyJobs);
    await waitForWedooPageReady(page);

    const management = page.locator(`[data-company-jobs-layout="${layoutName}"]`);
    await expect(management).toBeVisible();

    await management
      .getByRole("button", { name: portalCopy.companyJobs.viewJobsCta })
      .click();

    await expect(page).toHaveURL(portalRoutes.companyPublishedJobs);
    await expect(
      page.locator(`[data-company-published-jobs-layout="${layoutName}"]`),
    ).toBeVisible();
  });

  test("opens the preview route from the first published job card", async ({
    page,
  }, testInfo) => {
    const layoutName = getLayoutName(testInfo.project.name);
    test.skip(layoutName === "mobile", "La navigazione mobile verso la preview e gia coperta dalla spec dedicata della preview.");
    const layout = await openPublishedJobsPage(page, layoutName);

    await layout.getByRole("button", { name: "visualizza" }).first().click();

    await expect(page).toHaveURL(portalRoutes.companyJob);
    await expect(
      page.locator('[data-portal-page="company-job-preview"]'),
    ).toBeVisible();
  });
});
