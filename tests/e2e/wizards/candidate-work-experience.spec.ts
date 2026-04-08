import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate work experience step", () => {
  test("matches the work experience modal flow for Figma frame 280:860", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";

    await page.goto(publicRoutes.candidateWorkExperience);
    await waitForWedooPageReady(page);

    const workExperienceStep = page.getByTestId("candidate-work-experience-step");
    await expect(
      workExperienceStep.getByRole("heading", {
        level: 1,
        name: publicCopy.candidateWorkExperience.heading,
      }),
    ).toBeVisible();
    await expect(
      workExperienceStep.getByRole("link", {
        name: publicCopy.candidateWorkExperience.closeLabel,
      }),
    ).toHaveAttribute("href", "/registrati/candidato/3");
    await expect(
      workExperienceStep.getByText(publicCopy.candidateWorkExperience.companyHelper, {
        exact: true,
      }),
    ).toBeVisible();

    const countryField = workExperienceStep.getByLabel(
      publicCopy.candidateWorkExperience.countryLabel,
    );
    const cityField = workExperienceStep.getByLabel(
      publicCopy.candidateWorkExperience.cityLabel,
    );
    const companyField = workExperienceStep.getByLabel(
      publicCopy.candidateWorkExperience.companyLabel,
      { exact: true },
    );
    const startYearField = workExperienceStep.getByLabel("da anno");
    const endYearField = workExperienceStep.getByLabel("ad anno");
    const activitiesField = workExperienceStep.getByLabel(
      publicCopy.candidateWorkExperience.activitiesHeading,
    );

    await expect(countryField).toHaveValue("Italia");
    await expect(cityField).toHaveValue("Roma");
    await expect(companyField).toHaveValue(
      publicCopy.candidateWorkExperience.companySummary,
    );
    await expect(startYearField).toHaveValue("2020");
    await expect(endYearField).toHaveValue("2020");
    await expect(activitiesField).toHaveValue(
      publicCopy.candidateWorkExperience.activitiesSummary,
    );

    await countryField.selectOption("Spagna");
    await cityField.selectOption("Barcellona");
    await companyField.selectOption("Agencia Creativa BCN");

    const toolbarButtons = workExperienceStep
      .getByTestId("candidate-work-experience-toolbar")
      .getByRole("button");
    await expect(toolbarButtons).toHaveCount(3);

    const [startYearBox, endYearBox] = await Promise.all([
      startYearField.boundingBox(),
      endYearField.boundingBox(),
    ]);
    expect(startYearBox).not.toBeNull();
    expect(endYearBox).not.toBeNull();

    if (isMobile) {
      expect(endYearBox!.y).toBeGreaterThan(startYearBox!.y + 40);
    } else {
      expect(Math.abs(startYearBox!.y - endYearBox!.y)).toBeLessThan(16);
      expect(endYearBox!.x).toBeGreaterThan(startYearBox!.x + 180);
    }

    await workExperienceStep
      .getByRole("button", {
        name: publicCopy.candidateWorkExperience.saveCta,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/registrati\/candidato\/5$/);
  });
});
