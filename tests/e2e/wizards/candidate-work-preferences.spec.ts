import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate work preferences step", () => {
  test("matches the work preferences modal flow for Figma frame 280:1000", async ({
    page,
  }) => {
    await page.goto(publicRoutes.candidateWorkPreferences);
    await waitForWedooPageReady(page);

    const workPreferencesStep = page.getByTestId("candidate-work-preferences-step");
    await expect(
      workPreferencesStep.getByRole("heading", {
        level: 1,
        name: publicCopy.candidateWorkPreferences.heading,
      }),
    ).toBeVisible();
    await expect(
      workPreferencesStep.getByRole("link", {
        name: publicCopy.candidateWorkPreferences.closeLabel,
      }),
    ).toHaveAttribute("href", "/registrati/candidato/6");

    const sections = workPreferencesStep.locator("section");
    const workModeSection = sections.nth(0);
    await expect(workModeSection).toBeVisible();
    await expect(
      workModeSection.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateWorkPreferences.workModeHeading,
      }),
    ).toBeVisible();
    for (const item of publicCopy.candidateWorkPreferences.workModeSummary) {
      await expect(workModeSection.locator("ul").getByText(item, { exact: true })).toBeVisible();
    }

    const locationSection = sections.nth(1);
    await expect(locationSection).toBeVisible();
    await expect(
      locationSection.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateWorkPreferences.locationHeading,
      }),
    ).toBeVisible();
    await expect(
      locationSection
        .locator("ul")
        .getByText(publicCopy.candidateWorkPreferences.locationSummary[0]!, {
          exact: true,
        }),
    ).toBeVisible();

    const companyTypesSection = sections.nth(2);
    await expect(companyTypesSection).toBeVisible();
    await expect(
      companyTypesSection.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateWorkPreferences.companyTypesHeading,
      }),
    ).toBeVisible();
    for (const item of publicCopy.candidateWorkPreferences.companyTypesSummary) {
      await expect(
        companyTypesSection.locator("ul").getByText(item, { exact: true }),
      ).toBeVisible();
    }

    const scheduleSection = sections.nth(3);
    await expect(scheduleSection).toBeVisible();
    await expect(
      scheduleSection.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateWorkPreferences.scheduleHeading,
      }),
    ).toBeVisible();
    await expect(
      scheduleSection
        .locator("ul")
        .getByText(publicCopy.candidateWorkPreferences.scheduleSummary[0]!, {
          exact: true,
        }),
    ).toBeVisible();

    const contractTypesSection = sections.nth(4);
    await expect(contractTypesSection).toBeVisible();
    await expect(
      contractTypesSection.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateWorkPreferences.contractTypesHeading,
      }),
    ).toBeVisible();
    for (const item of publicCopy.candidateWorkPreferences.contractTypesSummary) {
      await expect(
        contractTypesSection.locator("ul").getByText(item, { exact: true }),
      ).toBeVisible();
    }

    await workPreferencesStep
      .getByLabel(publicCopy.candidateWorkPreferences.workModeHeading, { exact: true })
      .selectOption(publicCopy.candidateWorkPreferences.workModeOptions[0]!);
    await workPreferencesStep
      .getByLabel(publicCopy.candidateWorkPreferences.locationHeading, { exact: true })
      .selectOption(publicCopy.candidateWorkPreferences.locationSummary[0]!);
    await workPreferencesStep
      .getByLabel(publicCopy.candidateWorkPreferences.companyTypesHeading, {
        exact: true,
      })
      .selectOption(publicCopy.candidateWorkPreferences.companyTypesSummary[0]!);
    await workPreferencesStep
      .getByLabel(publicCopy.candidateWorkPreferences.scheduleHeading, { exact: true })
      .selectOption(publicCopy.candidateWorkPreferences.scheduleSummary[0]!);
    await workPreferencesStep
      .getByLabel(publicCopy.candidateWorkPreferences.contractTypesHeading, {
        exact: true,
      })
      .selectOption(publicCopy.candidateWorkPreferences.contractTypesSummary[0]!);

    await workPreferencesStep
      .getByRole("button", {
        name: publicCopy.candidateWorkPreferences.saveCta,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/portale\/candidato$/);
  });
});
