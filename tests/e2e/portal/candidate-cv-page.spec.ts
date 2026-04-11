import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";

function getLayoutName(projectName: string) {
  return projectName === "chromium-mobile" ? "mobile" : "desktop";
}

async function openCandidateCvPage(
  page: import("@playwright/test").Page,
  layoutName: "desktop" | "mobile",
) {
  await page.goto(portalRoutes.candidateCv);
  await page.waitForLoadState("domcontentloaded");

  const layout = page.locator(`[data-candidate-cv-layout="${layoutName}"]`);
  await expect(layout).toBeVisible();
  await expect(page.locator("footer")).toHaveCount(0);

  return layout;
}

test.describe("candidate cv page", () => {
  test("renders the figma-aligned candidate cv shell without the legacy portal navbar", async ({
    page,
  }, testInfo) => {
    const layoutName = getLayoutName(testInfo.project.name);
    const layout = await openCandidateCvPage(page, layoutName);

    await expect(
      layout.getByRole("heading", { name: portalCopy.candidateCv.name }),
    ).toBeVisible();
    await expect(layout.getByText(portalCopy.candidateCv.goalLabel, { exact: true })).toBeVisible();
    await expect(
      layout.getByRole("heading", {
        name: portalCopy.candidateCv.personalDataTitle,
      }),
    ).toBeVisible();
    await expect(
      layout.getByRole("heading", {
        name: portalCopy.candidateCv.workPreferenceTitle,
      }),
    ).toBeVisible();
    await expect(
      layout.getByRole("heading", {
        name: portalCopy.candidateCv.agendaTitle,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("navigation", { name: /Navigazione portale candidato/i }),
    ).toHaveCount(0);

    if (layoutName === "desktop") {
      await expect(
        layout.getByRole("link", { name: portalCopy.candidateCv.backLabel }),
      ).toBeVisible();
    } else {
      await expect(
        layout.getByRole("navigation", { name: portalCopy.candidateCv.mobileDockLabel }),
      ).toBeVisible();
    }
  });

  test("routes back to the candidate dashboard from the candidate cv shell", async ({
    page,
  }, testInfo) => {
    const layoutName = getLayoutName(testInfo.project.name);
    const layout = await openCandidateCvPage(page, layoutName);

    if (layoutName === "desktop") {
      await layout.getByRole("link", { name: portalCopy.candidateCv.backLabel }).click();
    } else {
      await layout.getByRole("link", { name: "Apri dashboard candidato" }).click();
    }

    await expect(page).toHaveURL(portalRoutes.candidateDashboard);
    await expect(
      page.locator('[data-portal-page="candidate-dashboard"]'),
    ).toBeVisible();
  });
});
