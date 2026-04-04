import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("landing page", () => {
  test("matches the public baseline flow for Figma frame 143:1822", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    if (!isMobile) {
      await page.setViewportSize({ width: 1440, height: 1100 });
    }

    await page.goto(publicRoutes.home);
    await waitForWedooPageReady(page);

    await expect(
      page.getByRole("heading", {
        level: 1,
        name: publicCopy.home.heroTitle,
      }),
    ).toBeVisible();
    await expect(
      page.locator("p:visible").filter({
        hasText: publicCopy.home.heroSubtitle,
      }),
    ).toBeVisible();

    const downloadLink = page.getByRole("link", {
      name: publicCopy.home.downloadCta,
    });
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute("href", "/manifest.webmanifest");
    await expect(downloadLink).toHaveAttribute("download", "wedoo.webmanifest");
    await expect(downloadLink.locator("svg")).toBeVisible();

    const authButtonGroup = page.getByRole("group", {
      name: publicCopy.home.authButtonGroupLabel,
    });
    await expect(authButtonGroup).toBeVisible();
    await expect(
      authButtonGroup.getByRole("button", {
        name: publicCopy.home.signInCta,
      }),
    ).toBeVisible();
    await expect(
      authButtonGroup.getByRole("button", {
        name: publicCopy.home.signUpCta,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("link", {
        name: publicCopy.home.companyPrompt,
      }),
    ).toBeVisible();
    await expect(
      page.locator(isMobile ? "p:visible" : "h2:visible").filter({
        hasText: isMobile
          ? publicCopy.home.howItWorksMobile
          : publicCopy.home.howItWorksTitle,
      }),
    ).toBeVisible();
    const candidateRoleLink = page.getByRole("link", {
      name: publicCopy.home.candidateCta,
      exact: true,
    });
    await expect(candidateRoleLink).toBeVisible();
    await expect(candidateRoleLink).toHaveAttribute("href", "/candidato");

    const companyRoleLink = page.getByRole("link", {
      name: publicCopy.home.companyCta,
      exact: true,
    });
    await expect(companyRoleLink).toBeVisible();
    await expect(companyRoleLink).toHaveAttribute("href", "/azienda");

    await expect(
      page.locator("p:visible").filter({
        hasText: publicCopy.home.impactStatement,
      }),
    ).toBeVisible();

    await expect(
      page.getByRole("heading", {
        name: publicCopy.home.videoTitle,
      }),
    ).toBeVisible();
    await expect(
      page.locator("h2:visible, h4:visible").filter({
        hasText: publicCopy.home.patronageTitle,
      }),
    ).toBeVisible();
    await expect(
      page.locator("p:visible").filter({
        hasText: publicCopy.home.contactEmail,
      }),
    ).toBeVisible();

    const discoverLinks = page.getByRole("link", { name: publicCopy.home.discoverCta });
    await expect(discoverLinks).toHaveCount(3);
    await expect(
      page.locator('a[href="/info#noixnoi"]:visible').getByText(publicCopy.home.discoverCta, {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/info#obiettivi"]:visible').getByText(publicCopy.home.discoverCta, {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.locator('a[href="/info#dubbi"]:visible').getByText(publicCopy.home.discoverCta, {
        exact: true,
      }),
    ).toBeVisible();

    await page.getByRole("button", { name: publicCopy.home.signInCta }).click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: publicCopy.home.signInDialogTitle }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: publicCopy.home.signUpCta }),
    ).toBeVisible();
  });
});
