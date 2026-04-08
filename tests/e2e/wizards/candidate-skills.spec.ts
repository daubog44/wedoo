import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate skills step", () => {
  test("matches the skills modal flow for Figma frame 280:951", async ({
    page,
  }) => {
    await page.goto(publicRoutes.candidateSkills);
    await waitForWedooPageReady(page);

    const skillsStep = page.getByTestId("candidate-skills-step");
    await expect(
      skillsStep.getByRole("heading", {
        level: 1,
        name: publicCopy.candidateSkills.heading,
      }),
    ).toBeVisible();
    await expect(
      skillsStep.getByRole("link", {
        name: publicCopy.candidateSkills.closeLabel,
      }),
    ).toHaveAttribute("href", "/registrati/candidato/4");

    await expect(
      skillsStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateSkills.softSkillsHeading,
      }),
    ).toBeVisible();
    for (const item of publicCopy.candidateSkills.softSkillsSummary) {
      await expect(skillsStep.getByText(item, { exact: true })).toBeVisible();
    }

    await expect(
      skillsStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateSkills.hardSkillsHeading,
      }),
    ).toBeVisible();
    for (const item of publicCopy.candidateSkills.hardSkillsSummary) {
      await expect(skillsStep.getByText(item, { exact: true })).toBeVisible();
    }

    const softSkillField = skillsStep.getByLabel(
      publicCopy.candidateSkills.softSkillsHeading,
      { exact: true },
    );
    const hardSkillField = skillsStep.getByLabel(
      publicCopy.candidateSkills.hardSkillsHeading,
      { exact: true },
    );

    await softSkillField.selectOption(publicCopy.candidateSkills.softSkillOptions[0]!);
    await hardSkillField.selectOption(publicCopy.candidateSkills.hardSkillOptions[0]!);

    await skillsStep
      .getByRole("button", {
        name: publicCopy.candidateSkills.saveCta,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/portale\/candidato$/);
  });
});
