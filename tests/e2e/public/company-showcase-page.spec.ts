import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company showcase page", () => {
  test("renders the current company showcase shell without the legacy footer", async ({ page }, testInfo) => {
    const layoutRoot = page.locator(
      `[data-showcase-layout="${testInfo.project.name === "chromium-mobile" ? "mobile" : "desktop"}"]`,
    );

    await page.goto(publicRoutes.companyShowcase);
    await waitForWedooPageReady(page);

    await expect(
      layoutRoot.getByRole("heading", { name: publicCopy.companyShowcase.firstTitle }),
    ).toBeVisible();
    await expect(layoutRoot.getByRole("button", { name: "Lingua italiana" })).toBeVisible();
    await expect(page.getByText("Tutti i diritti riservati")).toHaveCount(0);
  });

  test("moves to the next slide in the company showcase", async ({ page }, testInfo) => {
    const layoutRoot = page.locator(
      `[data-showcase-layout="${testInfo.project.name === "chromium-mobile" ? "mobile" : "desktop"}"]`,
    );

    await page.goto(publicRoutes.companyShowcase);
    await waitForWedooPageReady(page);

    await layoutRoot.getByRole("button", { name: "Slide successiva" }).click();
    await expect(
      layoutRoot.getByRole("heading", { name: publicCopy.companyShowcase.secondTitle }),
    ).toBeVisible();
  });

  test("reveals the register CTA on the last desktop slide", async ({ page }, testInfo) => {
    test.skip(testInfo.project.name === "chromium-mobile", "Il frame mobile export non mostra la CTA finale.");

    const layoutRoot = page.locator('[data-showcase-layout="desktop"]');

    await page.goto(publicRoutes.companyShowcase);
    await waitForWedooPageReady(page);

    for (let index = 0; index < 5; index += 1) {
      await layoutRoot.getByRole("button", { name: "Slide successiva" }).click();
    }

    await expect(
      layoutRoot.getByRole("heading", { name: publicCopy.companyShowcase.lastTitle }),
    ).toBeVisible();
    await expect(
      layoutRoot.getByRole("link", { name: publicCopy.companyShowcase.registerCta }),
    ).toHaveAttribute("href", publicRoutes.companyRegistration);
  });
});
