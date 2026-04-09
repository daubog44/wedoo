import path from "node:path";
import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

async function openCompanyJobDraftStepTwo(
  page: import("@playwright/test").Page,
  layoutName: "desktop" | "mobile",
) {
  await page.goto(portalRoutes.companyJobDraftStep1);
  await waitForWedooPageReady(page);

  await page
    .locator(`[data-job-draft-layout="${layoutName}"]`)
    .getByRole("button", {
      name: portalCopy.companyJobDraftStep1.continueCta,
      exact: true,
    })
    .click();
  await waitForWedooPageReady(page);

  await expect(page).toHaveURL(portalRoutes.companyJobDraftStep2);

  const layout = page.locator(`[data-job-draft-layout="${layoutName}"]`);
  const step = layout.getByTestId("company-job-draft-step-2");

  await expect(
    step.getByRole("heading", {
      level: 1,
      name: portalCopy.companyJobDraftStep2.heading,
    }),
  ).toBeVisible();

  return { layout, step };
}

test.describe("company job draft step 2", () => {
  test("supports multi-select SDGs plus reset and save draft CTAs for Figma frame 259:1050", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const layoutName = isMobile ? "mobile" : "desktop";
    const documentPath = path.join(
      process.cwd(),
      "public",
      "assets",
      "documenti",
      "Informativa privacy per sito.pdf",
    );
    const { step } = await openCompanyJobDraftStepTwo(page, layoutName);

    await expect(
      step.getByText("full time, part-time, turni, stage, ecc.", { exact: true }),
    ).toBeVisible();

    const contractField = step.getByLabel(portalCopy.companyJobDraftStep2.contractLabel);
    const hoursField = step.getByLabel(portalCopy.companyJobDraftStep2.hoursLabel);
    const modeField = step.getByLabel(portalCopy.companyJobDraftStep2.modeLabel);
    const sdgField = step.getByLabel(portalCopy.companyJobDraftStep2.sdgLabel);

    const [contractBox, hoursBox] = await Promise.all([
      contractField.boundingBox(),
      hoursField.boundingBox(),
    ]);
    expect(contractBox).not.toBeNull();
    expect(hoursBox).not.toBeNull();

    if (isMobile) {
      expect(hoursBox!.y).toBeGreaterThan(contractBox!.y + 30);
    } else {
      expect(Math.abs(contractBox!.y - hoursBox!.y)).toBeLessThan(14);
      expect(hoursBox!.x).toBeGreaterThan(contractBox!.x + 180);
    }

    await contractField.selectOption("stage");
    await hoursField.selectOption("full-time");
    await modeField.selectOption("smart");
    await sdgField.selectOption("climate-action");
    await expect(sdgField).toHaveValue("");
    await sdgField.selectOption("responsible-consumption");

    await expect(contractField).toHaveValue("stage");
    await expect(hoursField).toHaveValue("full-time");
    await expect(modeField).toHaveValue("smart");
    await expect(sdgField).toHaveValue("");
    const sdgList = step.getByTestId("company-job-draft-sdg-list");
    await expect(sdgList).toBeVisible();
    await expect(
      sdgList.getByRole("button", {
        name: "Rimuovi SDG Lotta al cambiamento climatico",
      }),
    ).toBeVisible();
    await expect(
      sdgList.getByRole("button", {
        name: "Rimuovi SDG Consumo responsabile",
      }),
    ).toBeVisible();

    const fileInput = step.locator('input[type="file"]').first();
    await fileInput.setInputFiles(documentPath);
    await expect(
      step.getByText("Informativa privacy per sito.pdf", { exact: true }).first(),
    ).toBeVisible();

    await expect(
      step.getByRole("button", {
        name: portalCopy.companyJobDraftStep2.removeCta,
      }),
    ).toBeVisible();
    await expect(
      step.getByRole("button", {
        name: portalCopy.companyJobDraftStep2.saveDraftCta,
      }),
    ).toBeVisible();

    await step
      .getByRole("button", {
        name: portalCopy.companyJobDraftStep2.removeCta,
      })
      .click();

    await expect(contractField).toHaveValue("");
    await expect(hoursField).toHaveValue("");
    await expect(modeField).toHaveValue("");
    await expect(sdgField).toHaveValue("");
    await expect(step.getByTestId("company-job-draft-sdg-list")).toHaveCount(0);
    await expect(
      step.getByText("Informativa privacy per sito.pdf", { exact: true }),
    ).toHaveCount(0);

    await step
      .getByRole("button", {
        name: portalCopy.companyJobDraftStep2.saveDraftCta,
      })
      .click();

    await expect(page).toHaveURL(portalRoutes.companyJobs);
    await expect(
      page.getByRole("heading", {
        name: portalCopy.companyJobs.createCardHeading,
      }),
    ).toBeVisible();
  });

  test("routes preview and submit CTAs for Figma frame 259:1050", async ({
    page,
  }, testInfo) => {
    const layoutName = testInfo.project.name === "chromium-mobile" ? "mobile" : "desktop";
    const { step } = await openCompanyJobDraftStepTwo(page, layoutName);

    await step
      .getByRole("button", {
        name: portalCopy.companyJobDraftStep2.previewCta,
      })
      .click();

    await expect(page).toHaveURL(/\/portale\/azienda\/annunci\/addetto-comunicazione$/);
    await expect(
      page.getByRole("heading", {
        name: "anteprima dell'annuncio di:",
      }),
    ).toBeVisible();

    await page.goto(portalRoutes.companyJobDraftStep2);
    await waitForWedooPageReady(page);

    const layout = page.locator(`[data-job-draft-layout="${layoutName}"]`);
    const refreshedStep = layout.getByTestId("company-job-draft-step-2");

    await refreshedStep
      .getByRole("button", {
        name: portalCopy.companyJobDraftStep2.submitCta,
      })
      .click();

    await expect(page).toHaveURL("/portale/azienda");
    await expect(
      page.getByRole("heading", {
        name: "bacheca candidati",
      }),
    ).toBeVisible();
  });
});
