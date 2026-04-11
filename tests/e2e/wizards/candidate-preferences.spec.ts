import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate preferences step", () => {
  test("matches the public onboarding preferences flow for Figma frames 273:1384 and 234:813", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const preferencesStep = page.locator(
      `[data-candidate-onboarding-layout="${isMobile ? "mobile" : "desktop"}"][data-candidate-onboarding-step="2"]`,
    );

    await page.goto(publicRoutes.candidatePreferences);
    await waitForWedooPageReady(page);

    await expect(
      preferencesStep.getByRole("heading", {
        name: publicCopy.candidatePreferences.heading,
      }),
    ).toBeVisible();
    await expect(
      preferencesStep.getByRole("button", {
        name: publicCopy.candidatePreferences.providerGoogle,
      }),
    ).toBeVisible();
    await expect(
      preferencesStep.getByRole("button", {
        name: publicCopy.candidatePreferences.providerApple,
      }),
    ).toBeVisible();
    await expect(
      preferencesStep.getByRole("link", {
        name: publicCopy.candidatePreferences.loginPromptLink,
      }),
    ).toHaveAttribute("href", "/accedi");

    const provinceField = preferencesStep.getByLabel(
      publicCopy.candidatePreferences.provinceLabel,
      { exact: true },
    );
    const cityField = preferencesStep.getByLabel(
      publicCopy.candidatePreferences.cityLabel,
      { exact: true },
    );
    const postalCodeField = preferencesStep.getByLabel(
      publicCopy.candidatePreferences.postalCodeLabel,
      { exact: true },
    );
    const sdgField = preferencesStep.getByLabel(
      publicCopy.candidatePreferences.projectMatchLabel,
      { exact: true },
    );
    const roleInterestField = preferencesStep.getByLabel(
      publicCopy.candidatePreferences.projectRoleLabel,
      { exact: true },
    );

    await provinceField.selectOption(publicCopy.candidatePreferences.projectProvince);
    await cityField.selectOption(publicCopy.candidatePreferences.cityOption);
    await postalCodeField.fill("00012");
    await sdgField.selectOption(publicCopy.candidatePreferences.projectSdgOption);
    await roleInterestField.fill(publicCopy.candidatePreferences.projectRoleInterest);

    const [provinceBox, cityBox, postalCodeBox] = await Promise.all([
      provinceField.boundingBox(),
      cityField.boundingBox(),
      postalCodeField.boundingBox(),
    ]);
    expect(provinceBox).not.toBeNull();
    expect(cityBox).not.toBeNull();
    expect(postalCodeBox).not.toBeNull();

    if (isMobile) {
      expect(cityBox!.y).toBeGreaterThan(provinceBox!.y + 40);
      expect(postalCodeBox!.y).toBeGreaterThan(cityBox!.y + 40);
    } else {
      expect(Math.abs(provinceBox!.y - cityBox!.y)).toBeLessThan(16);
      expect(Math.abs(cityBox!.y - postalCodeBox!.y)).toBeLessThan(16);
      expect(cityBox!.x).toBeGreaterThan(provinceBox!.x + 70);
      expect(postalCodeBox!.x).toBeGreaterThan(cityBox!.x + 70);
    }

    await preferencesStep
      .getByRole("button", {
        name: publicCopy.candidatePreferences.ctaLabel,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/registrati\/candidato\/3$/);
  });
});
