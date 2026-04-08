import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate education step", () => {
  test("matches the education modal flow for Figma frame 280:1079", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";

    await page.goto(publicRoutes.candidateEducation);
    await waitForWedooPageReady(page);

    const educationStep = page.getByTestId("candidate-education-step");
    await expect(
      educationStep.getByRole("heading", {
        level: 1,
        name: publicCopy.candidateEducation.heading,
      }),
    ).toBeVisible();
    await expect(
      educationStep.getByRole("link", {
        name: publicCopy.candidateEducation.closeLabel,
      }),
    ).toHaveAttribute("href", "/registrati/candidato/2");

    await expect(
      educationStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateEducation.titleOfStudyHeading,
      }),
    ).toBeVisible();
    await expect(
      educationStep.getByRole("listitem").filter({
        hasText: publicCopy.candidateEducation.degreeSummary,
      }).first(),
    ).toBeVisible();
    await expect(
      educationStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateEducation.fieldOfStudyHeading,
      }),
    ).toBeVisible();
    await expect(
      educationStep.getByRole("listitem").filter({
        hasText: publicCopy.candidateEducation.fieldOfStudySummary,
      }).first(),
    ).toBeVisible();
    await expect(
      educationStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateEducation.institutionHeading,
      }),
    ).toBeVisible();
    await expect(
      educationStep.getByRole("listitem").filter({
        hasText: publicCopy.candidateEducation.institutionSummary,
      }).first(),
    ).toBeVisible();

    await expect(
      educationStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateEducation.extracurricularHeading,
      }),
    ).toBeVisible();
    for (const item of publicCopy.candidateEducation.extracurricularSummary) {
      await expect(educationStep.getByText(item, { exact: true }).first()).toBeVisible();
    }

    const startYearField = educationStep.getByLabel("da anno");
    const endYearField = educationStep.getByLabel("ad anno");
    const countryField = educationStep.getByLabel("paese");
    const cityField = educationStep.getByLabel("città");
    const institutionField = educationStep.getByLabel("istituto", { exact: true });
    const specificCourseField = educationStep.getByLabel(
      publicCopy.candidateEducation.specificCourseHeading,
    );

    await expect(startYearField).toHaveValue("2016");
    await expect(endYearField).toHaveValue("2021");
    await countryField.selectOption("Spagna");
    await cityField.selectOption("Barcellona");
    await institutionField.selectOption("Universitat de Barcelona");
    await specificCourseField.selectOption("Employer branding ESG");

    await expect(
      educationStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateEducation.projectWorkHeading,
      }),
    ).toBeVisible();
    await expect(
      educationStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateEducation.specificCourseHeading,
      }),
    ).toBeVisible();
    await expect(
      educationStep.getByRole("listitem").filter({
        hasText: publicCopy.candidateEducation.specificCourseSummary,
      }).first(),
    ).toBeVisible();

    const toolbarButtons = educationStep
      .getByTestId("candidate-education-toolbar")
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

    await educationStep
      .getByRole("button", {
        name: publicCopy.candidateEducation.saveCta,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/registrati\/candidato\/4$/);
  });
});
