import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("not found page", () => {
  test("renders the public 404 fallback and routes back to home", async ({ page }) => {
    await page.goto(publicRoutes.notFound);
    await waitForWedooPageReady(page);

    await expect(
      page.getByRole("heading", { name: publicCopy.notFound.heading }),
    ).toBeVisible();
    await expect(page.getByText(publicCopy.notFound.message)).toBeVisible();

    await page.getByRole("link", { name: publicCopy.notFound.cta }).click();
    await expect(page).toHaveURL(publicRoutes.home);
    await expect(
      page.getByRole("heading", { name: publicCopy.home.heroTitle }),
    ).toBeVisible();
  });
});
