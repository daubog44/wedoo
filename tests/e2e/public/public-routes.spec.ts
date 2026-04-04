import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("public routes", () => {
  test("role choice page is reachable from the public flow", async ({ page }) => {
    await page.goto(publicRoutes.register);
    await waitForWedooPageReady(page);

    await expect(
      page.getByRole("heading", { name: publicCopy.register.heading }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: publicCopy.register.candidateCta }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: publicCopy.register.companyCta }),
    ).toBeVisible();
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
