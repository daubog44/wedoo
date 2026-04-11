import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("password recovery flow", () => {
  test("starts from login and returns to sign in after saving new credentials", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.login);
    await waitForWedooPageReady(page);

    const loginLayout = page.locator(
      `[data-login-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await loginLayout.getByRole("link", { name: publicCopy.login.forgotPassword }).click();
    await waitForWedooPageReady(page);
    await expect(page).toHaveURL(new RegExp(`${publicRoutes.passwordRecovery}$`));

    const recoveryLayout = page.locator(
      `[data-password-recovery-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await expect(
      recoveryLayout.getByRole("heading", {
        level: 1,
        name: publicCopy.passwordRecovery.heading,
      }),
    ).toBeVisible();
    await expect(
      recoveryLayout.getByLabel(publicCopy.passwordRecovery.currentPasswordLabel),
    ).toHaveAttribute("placeholder", publicCopy.passwordRecovery.currentPasswordPlaceholder);
    await expect(
      recoveryLayout.getByLabel(publicCopy.passwordRecovery.newPasswordLabel),
    ).toHaveAttribute("placeholder", publicCopy.passwordRecovery.newPasswordPlaceholder);
    await expect(
      recoveryLayout.getByLabel(publicCopy.passwordRecovery.repeatPasswordLabel),
    ).toHaveAttribute("placeholder", publicCopy.passwordRecovery.repeatPasswordPlaceholder);

    const termsCheckbox = recoveryLayout.getByRole("checkbox", {
      name: publicCopy.passwordRecovery.termsLabel,
    });
    await expect(termsCheckbox).toHaveAttribute("aria-checked", "true");

    await recoveryLayout
      .getByLabel(publicCopy.passwordRecovery.currentPasswordLabel)
      .fill("VecchiaPassword123");
    await recoveryLayout
      .getByLabel(publicCopy.passwordRecovery.newPasswordLabel)
      .fill("NuovaPassword123");
    await recoveryLayout
      .getByLabel(publicCopy.passwordRecovery.repeatPasswordLabel)
      .fill("NuovaPassword123");
    await recoveryLayout
      .getByRole("button", { name: publicCopy.passwordRecovery.ctaLabel, exact: true })
      .click();

    await expect(page).toHaveURL(new RegExp(`${publicRoutes.login}$`));
    await waitForWedooPageReady(page);
  });

  test("opens the customer support page from the inline recovery prompt", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1024 });
    }

    await page.goto(publicRoutes.passwordRecovery);
    await waitForWedooPageReady(page);

    const recoveryLayout = page.locator(
      `[data-password-recovery-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await expect(
      recoveryLayout.getByRole("link", { name: publicCopy.passwordRecovery.assistanceLink }),
    ).toHaveAttribute("href", publicRoutes.support);
    await recoveryLayout
      .getByRole("link", { name: publicCopy.passwordRecovery.assistanceLink })
      .click();

    await waitForWedooPageReady(page);
    await expect(page).toHaveURL(new RegExp(`${publicRoutes.support}$`));

    const supportLayout = page.locator(
      `[data-customer-support-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await expect(
      supportLayout.getByRole("heading", { level: 1, name: publicCopy.support.heading }),
    ).toBeVisible();
    await expect(
      supportLayout.getByRole("heading", { level: 2, name: "Azienda" }),
    ).toBeVisible();
    await expect(
      supportLayout.getByRole("heading", { level: 2, name: "Candidato" }),
    ).toBeVisible();
    await expect(supportLayout.getByText(publicCopy.support.companyDescription)).toBeVisible();
    await expect(supportLayout.getByText(publicCopy.support.candidateDescription)).toBeVisible();
    await expect(
      supportLayout.locator(`a[href="tel:+390280000001"]`),
    ).toHaveText(publicCopy.support.companyPhoneLabel);
    await expect(
      supportLayout.locator(`a[href="tel:+390280000002"]`),
    ).toHaveText(publicCopy.support.candidatePhoneLabel);
    await expect(supportLayout.locator(`a[href^="mailto:"]`)).toHaveCount(2);
  });
});
