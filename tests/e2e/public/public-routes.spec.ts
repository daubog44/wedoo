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
      page.getByRole("link", { name: publicCopy.register.companyCta }),
    ).toHaveAttribute("href", "/registrati/azienda/1");
  });

  test("candidate registration step 1 remains reachable from the public flow", async ({
    page,
  }) => {
    await page.goto(publicRoutes.register);
    await waitForWedooPageReady(page);

    await page.getByRole("link", { name: publicCopy.register.candidateCta }).click();
    await waitForWedooPageReady(page);

    await expect(page).toHaveURL(publicRoutes.candidateRegistration);
    await expect(
      page.getByRole("heading", {
        name: publicCopy.candidateRegistration.heading,
      }),
    ).toBeVisible();
    await expect(
      page.getByText(publicCopy.candidateRegistration.subtitle, { exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: publicCopy.candidateRegistration.ctaLabel,
      }),
    ).toHaveAttribute("href", publicRoutes.candidateContacts);
    await expect(
      page.getByRole("link", {
        name: publicCopy.candidateRegistration.loginPromptLink,
      }),
    ).toHaveAttribute("href", "/accedi");
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

    await page.getByRole("link", { name: publicCopy.register.companyCta }).click();
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
