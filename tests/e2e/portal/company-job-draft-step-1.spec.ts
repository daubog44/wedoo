import { expect, test } from "@playwright/test";
import { portalCopy, portalRoutes } from "../../fixtures/portal-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company job draft step 1", () => {
  test("matches the geography and description flow for Figma frame 258:847", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const layout = page.locator(
      `[data-job-draft-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await page.goto(portalRoutes.companyJobs);
    await waitForWedooPageReady(page);

    await expect(
      page.getByRole("heading", {
        name: portalCopy.companyJobs.createCardHeading,
      }),
    ).toBeVisible();

    await page
      .getByRole("link", { name: portalCopy.companyJobs.createCta, exact: true })
      .click();
    await waitForWedooPageReady(page);

    await expect(page).toHaveURL(portalRoutes.companyJobDraftStep1);

    const step = layout.getByTestId("company-job-draft-step-1");
    await expect(
      step.getByRole("heading", {
        level: 1,
        name: portalCopy.companyJobDraftStep1.heading,
      }),
    ).toBeVisible();
    await expect(
      step.getByRole("heading", {
        level: 2,
        name: portalCopy.companyJobDraftStep1.geographyHeading,
      }),
    ).toBeVisible();
    await expect(
      step.getByRole("heading", {
        level: 2,
        name: portalCopy.companyJobDraftStep1.descriptionHeading,
      }),
    ).toBeVisible();
    await expect(
      step.getByText("una volta scelta la provincia", { exact: false }),
    ).toBeVisible();

    const provinceField = step.getByLabel(
      portalCopy.companyJobDraftStep1.provinceLabel,
    );
    const cityField = step.getByLabel("citt\u00E0");
    const capField = step.getByLabel("CAP");
    const sectorField = step.getByLabel(portalCopy.companyJobDraftStep1.sectorLabel);
    const skillsField = step.getByLabel(portalCopy.companyJobDraftStep1.skillsLabel);
    const experienceField = step.getByLabel(
      portalCopy.companyJobDraftStep1.experienceLabel,
    );
    const descriptionField = step.getByLabel("job description");

    const [provinceBox, cityBox, capBox] = await Promise.all([
      provinceField.boundingBox(),
      cityField.boundingBox(),
      capField.boundingBox(),
    ]);
    expect(provinceBox).not.toBeNull();
    expect(cityBox).not.toBeNull();
    expect(capBox).not.toBeNull();

    if (isMobile) {
      expect(cityBox!.y).toBeGreaterThan(provinceBox!.y + 30);
      expect(capBox!.y).toBeGreaterThan(cityBox!.y + 30);
    } else {
      expect(Math.abs(provinceBox!.y - cityBox!.y)).toBeLessThan(14);
      expect(Math.abs(cityBox!.y - capBox!.y)).toBeLessThan(14);
      expect(cityBox!.x).toBeGreaterThan(provinceBox!.x + 120);
      expect(capBox!.x).toBeGreaterThan(cityBox!.x + 120);
    }

    await provinceField.selectOption("rm");
    await expect(cityField).toHaveValue("roma");
    await expect(capField).toHaveValue("00100");

    await descriptionField.fill(
      "Supporterai il team comunicazione tra social, contenuti e storytelling ESG.",
    );
    await sectorField.selectOption("communication");
    await skillsField.selectOption("canva");
    await experienceField.selectOption("stage");

    await expect(descriptionField).toHaveValue(
      "Supporterai il team comunicazione tra social, contenuti e storytelling ESG.",
    );
    await expect(sectorField).toHaveValue("communication");
    await expect(skillsField).toHaveValue("canva");
    await expect(experienceField).toHaveValue("stage");

    await step
      .getByRole("button", {
        name: portalCopy.companyJobDraftStep1.continueCta,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(portalRoutes.companyJobs);
  });
});
