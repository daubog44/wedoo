import path from "node:path";
import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company job draft step 2", () => {
  test("matches the contract and sustainability flow for Figma frame 259:1050", async ({
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

    await expect(contractField).toHaveValue("stage");
    await expect(hoursField).toHaveValue("full-time");
    await expect(modeField).toHaveValue("smart");
    await expect(sdgField).toHaveValue("climate-action");

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
        name: portalCopy.companyJobDraftStep2.previewCta,
      })
      .click();

    await expect(page).toHaveURL(/\/portale\/azienda\/annunci\/addetto-comunicazione$/);
  });
});
