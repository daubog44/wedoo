import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("public routes", () => {
  test("role choice page is reachable from the public flow", async ({ page }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const expectedHeading = isMobile
      ? publicCopy.register.mobileHeading
      : publicCopy.register.desktopHeading;

    await page.goto(publicRoutes.register);
    await waitForWedooPageReady(page);

    await expect(
      page.getByRole("heading", { name: expectedHeading }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: publicCopy.register.candidateCta }),
    ).toHaveAttribute("href", publicRoutes.candidateRegistration);
    await expect(
      page.getByRole("link", { name: publicCopy.register.companyCta, exact: true }),
    ).toHaveAttribute("href", "/registrati/azienda/1");
  });

  test("candidate registration step 1 remains reachable from the public flow", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const stepOne = page.locator(
      `[data-candidate-onboarding-layout="${isMobile ? "mobile" : "desktop"}"][data-candidate-onboarding-step="1"]`,
    );

    await page.goto(publicRoutes.register);
    await waitForWedooPageReady(page);

    await page.getByRole("link", { name: publicCopy.register.candidateCta }).click();
    await waitForWedooPageReady(page);

    await expect(page).toHaveURL(publicRoutes.candidateRegistration);
    await expect(
      stepOne.getByRole("heading", {
        name: isMobile
          ? publicCopy.candidateRegistration.mobileHeading
          : publicCopy.candidateRegistration.desktopHeading,
      }),
    ).toBeVisible();
    await expect(
      stepOne.getByText(publicCopy.candidateRegistration.subtitle, { exact: true }),
    ).toBeVisible();

    for (const label of publicCopy.candidateRegistration.fieldLabels) {
      await expect(stepOne.getByLabel(label, { exact: true })).toBeVisible();
    }

    await expect(
      stepOne.getByRole("button", {
        name: publicCopy.candidateRegistration.providerGoogle,
      }),
    ).toBeVisible();
    await expect(
      stepOne.getByRole("button", {
        name: publicCopy.candidateRegistration.providerApple,
      }),
    ).toBeVisible();

    if (isMobile) {
      await expect(
        stepOne.getByRole("link", {
          name: publicCopy.candidateRegistration.loginPromptLink,
        }),
      ).toHaveAttribute("href", "/accedi");
    }

    await stepOne.getByLabel(publicCopy.candidateRegistration.fieldLabels[0]!).fill(
      "Azzurra Signorelli",
    );
    await stepOne.getByLabel(publicCopy.candidateRegistration.fieldLabels[1]!).fill(
      "azzurra@email.com",
    );
    await stepOne.getByLabel(publicCopy.candidateRegistration.fieldLabels[2]!).fill(
      "+39 3201234567",
    );
    await stepOne.locator('[id$="candidate-register-password"]').fill("Password123");
    await stepOne
      .locator('[id$="candidate-register-confirm-password"]')
      .fill("Password123");
    await stepOne
      .getByRole("button", {
        name: publicCopy.candidateRegistration.ctaLabel,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(publicRoutes.candidatePreferences);
  });

  test("company registration step 1 remains reachable from the public flow", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const stepOne = page.locator(
      `[data-company-wizard-layout="${isMobile ? "mobile" : "desktop"}"][data-company-wizard-step="1"]`,
    );

    await page.goto(publicRoutes.register);
    await waitForWedooPageReady(page);

    await page.getByRole("link", { name: publicCopy.register.companyCta, exact: true }).click();
    await waitForWedooPageReady(page);

    await expect(page).toHaveURL(publicRoutes.companyRegistration);
    await expect(
      stepOne.getByRole("heading", {
        name: publicCopy.companyRegistration.firstTitle,
      }),
    ).toBeVisible();
    await expect(
      stepOne.getByText(publicCopy.companyRegistration.firstSubtitle, { exact: true }),
    ).toBeVisible();
    await expect(
      stepOne.getByRole("link", {
        name: publicCopy.companyRegistration.loginPromptLink,
      }),
    ).toHaveAttribute("href", "/accedi");
  });

  test("info page exposes the main sections", async ({ page }) => {
    await page.goto(publicRoutes.info);
    await waitForWedooPageReady(page);

    await expect(
      page.getByRole("heading", { name: publicCopy.info.aboutHeading }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: publicCopy.info.goalsHeading }),
    ).toBeVisible();
  });
});
