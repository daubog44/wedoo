import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("login page", () => {
  test("matches the missing fields state for Figma frame 658:667", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";

    await page.goto(publicRoutes.login);
    await waitForWedooPageReady(page);

    const loginLayout = page.locator(
      `[data-login-layout="${isMobile ? "mobile" : "desktop"}"]`,
    );

    await expect(
      loginLayout.getByRole("heading", { level: 1, name: publicCopy.login.heading }),
    ).toBeVisible();
    await expect(
      loginLayout.getByRole("heading", { level: 2, name: publicCopy.login.subtitle }),
    ).toBeVisible();

    const emailField = loginLayout.getByLabel(publicCopy.login.emailLabel);
    const passwordField = loginLayout.getByLabel(publicCopy.login.passwordLabel);
    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();

    await expect(loginLayout.getByText(publicCopy.login.emailError, { exact: true })).toBeVisible();
    await expect(loginLayout.getByText(publicCopy.login.passwordError, { exact: true })).toBeVisible();
    await expect(
      loginLayout.getByRole("button", { name: publicCopy.login.forgotPassword }),
    ).toBeVisible();

    const termsCheckbox = loginLayout.getByRole("checkbox", { name: publicCopy.login.termsLabel });
    await expect(termsCheckbox).toBeVisible();
    await expect(termsCheckbox).toHaveAttribute("aria-checked", "true");
    await termsCheckbox.click();
    await expect(termsCheckbox).toHaveAttribute("aria-checked", "false");
    await termsCheckbox.click();
    await expect(termsCheckbox).toHaveAttribute("aria-checked", "true");

    await expect(
      loginLayout.getByRole("button", { name: publicCopy.login.providerGoogle, exact: true }),
    ).toBeVisible();
    await expect(
      loginLayout.getByRole("button", { name: publicCopy.login.providerApple, exact: true }),
    ).toBeVisible();
    await expect(
      loginLayout.getByRole("link", { name: publicCopy.login.registerPromptLink }),
    ).toHaveAttribute("href", "/registrati");

    await emailField.fill("giulia@wedoo.it");
    await passwordField.fill("supersegreta");
    await loginLayout
      .getByRole("button", { name: publicCopy.login.ctaLabel, exact: true })
      .click();

    await expect(page).toHaveURL(/\/portale\/candidato$/);
  });
});
