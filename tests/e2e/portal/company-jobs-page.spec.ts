import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

function getLayoutName(projectName: string) {
  return projectName === "chromium-mobile" ? "mobile" : "desktop";
}

async function openCompanyJobsPage(
  page: import("@playwright/test").Page,
  layoutName: "desktop" | "mobile",
  route: string = portalRoutes.companyJobs,
) {
  await page.goto(route);
  await waitForWedooPageReady(page);

  const layout = page.locator(`[data-company-jobs-layout="${layoutName}"]`);
  await expect(layout).toBeVisible();
  await expect(page.locator("footer")).toHaveCount(0);

  return layout;
}

async function clearCompanyJobsSession(page: import("@playwright/test").Page) {
  await page.goto(portalRoutes.companyJobs);
  await waitForWedooPageReady(page);
  await page.evaluate(() => {
    window.sessionStorage.clear();
  });
}

test.describe("company jobs page", () => {
  test.beforeEach(async ({ page }) => {
    await clearCompanyJobsSession(page);
  });

  test("switches across the standalone annuncio sections from Figma 185:1738 and 267:442", async ({
    page,
  }, testInfo) => {
    const layoutName = getLayoutName(testInfo.project.name);
    const layout = await openCompanyJobsPage(page, layoutName);

    await expect(
      layout.getByRole("heading", {
        level: 1,
        name: portalCopy.companyJobs.heading,
      }),
    ).toBeVisible();
    await expect(
      layout.getByRole("button", { name: portalCopy.companyJobs.previewCta }),
    ).toBeVisible();
    await expect(
      layout.getByRole("heading", { name: portalCopy.companyJobs.recruiterHeading }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: /Navigazione portale azienda/i }),
    ).toHaveCount(0);

    if (layoutName === "desktop") {
      await expect(layout.getByText(portalCopy.companyJobs.companyName)).toBeVisible();
      await expect(
        layout.getByRole("button", { name: portalCopy.companyJobs.createCta }),
      ).toBeVisible();
      await expect(
        layout.getByRole("button", { name: portalCopy.companyJobs.viewJobsCta }),
      ).toBeVisible();
      await expect(
        layout.getByRole("button", { name: portalCopy.companyJobs.viewApplicationsCta }),
      ).toBeVisible();
    } else {
      await expect(
        page.getByRole("navigation", {
          name: /Navigazione rapida azienda/i,
        }),
      ).toBeVisible();
    }

    const companyLayout = await openCompanyJobsPage(
      page,
      layoutName,
      `${portalRoutes.companyJobs}?section=company-details`,
    );
    await expect(
      companyLayout.getByRole("heading", { name: portalCopy.companyJobs.companyHeading }),
    ).toBeVisible();
    await expect(companyLayout.getByLabel("importo minimo")).toBeVisible();

    const offerLayout = await openCompanyJobsPage(
      page,
      layoutName,
      `${portalRoutes.companyJobs}?section=offer-details`,
    );
    await expect(
      offerLayout.getByRole("heading", { name: portalCopy.companyJobs.offerHeading }),
    ).toBeVisible();
    await expect(
      offerLayout.getByLabel(portalCopy.companyJobDraftStep1.remoteLabel),
    ).toBeVisible();
    await expect(
      offerLayout.getByRole("heading", {
        name: portalCopy.companyJobDraftStep1.descriptionHeading,
      }),
    ).toBeVisible();

    const publishingLayout = await openCompanyJobsPage(
      page,
      layoutName,
      `${portalRoutes.companyJobs}?section=publishing`,
    );
    await expect(
      publishingLayout.getByLabel(portalCopy.companyJobDraftStep2.contractLabel),
    ).toBeVisible();
    await expect(
      publishingLayout.getByRole("button", {
        name: portalCopy.companyJobs.saveDraftCta,
      }),
    ).toBeVisible();
    await expect(
      publishingLayout.getByRole("button", {
        name: portalCopy.companyJobs.submitCta,
      }),
    ).toBeVisible();
  });

  test("saves, resets and previews the company annuncio management shell", async ({
    page,
  }, testInfo) => {
    const layoutName = getLayoutName(testInfo.project.name);
    let layout = await openCompanyJobsPage(
      page,
      layoutName,
      `${portalRoutes.companyJobs}?section=publishing`,
    );

    await layout
      .getByLabel(portalCopy.companyJobDraftStep2.contractLabel)
      .selectOption("stage");
    await layout
      .getByLabel(portalCopy.companyJobDraftStep2.modeLabel)
      .selectOption("smart");
    await layout
      .getByLabel(portalCopy.companyJobDraftStep2.sdgLabel)
      .selectOption("climate-action");

    await layout
      .getByRole("button", { name: portalCopy.companyJobs.saveDraftCta })
      .click();

    await page.reload();
    await waitForWedooPageReady(page);

    layout = page.locator(`[data-company-jobs-layout="${layoutName}"]`);

    await expect(
      layout.getByLabel(portalCopy.companyJobDraftStep2.contractLabel),
    ).toHaveValue("stage");
    await expect(
      layout.getByRole("button", {
        name: "Lotta al cambiamento climatico",
      }),
    ).toBeVisible();

    await layout
      .getByRole("button", { name: portalCopy.companyJobs.removeCta })
      .click();

    await expect(page).toHaveURL(portalRoutes.companyJobs);
    await expect(
      page
        .locator(`[data-company-jobs-layout="${layoutName}"]`)
        .getByRole("heading", {
          name: portalCopy.companyJobs.recruiterHeading,
        }),
    ).toBeVisible();

    layout = await openCompanyJobsPage(
      page,
      layoutName,
      `${portalRoutes.companyJobs}?section=publishing`,
    );
    await expect(
      layout.getByLabel(portalCopy.companyJobDraftStep2.contractLabel),
    ).toHaveValue("");

    await layout
      .getByLabel(portalCopy.companyJobDraftStep2.contractLabel)
      .selectOption("stage");
    await layout
      .getByRole("button", {
        exact: true,
        name: portalCopy.companyJobDraftStep2.previewCta,
      })
      .click();

    await expect(page).toHaveURL(/\/portale\/azienda\/annunci\/addetto-comunicazione$/);
    await expect(
      page.locator('[data-portal-page="company-job-preview"]'),
    ).toBeVisible();
    await expect(
      page.getByRole("button", {
        name: portalCopy.companyJob.primaryCta,
      }),
    ).toBeVisible();
  });
});
