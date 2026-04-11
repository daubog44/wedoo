import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("knowledge hub pages", () => {
  test("renders the current articles shell with its main CTA map", async ({ page }) => {
    await page.goto(publicRoutes.articles);
    await waitForWedooPageReady(page);

    await expect(
      page.getByRole("heading", { name: publicCopy.articles.title }),
    ).toBeVisible();
    await expect(page.getByText(publicCopy.articles.eyebrow, { exact: true })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: publicCopy.articles.firstCardTitle }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: publicCopy.articles.relatedHeading }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: publicCopy.articles.switchCta }).first(),
    ).toHaveAttribute("href", publicRoutes.podcasts);
    await expect(
      page.getByRole("link", { name: publicCopy.articles.infoCta }),
    ).toHaveAttribute("href", publicRoutes.info);
    await expect(page.getByText("Tutti i diritti riservati")).toBeVisible();
  });

  test("switches between articles and podcasts through the primary cross-link CTA", async ({
    page,
  }) => {
    await page.goto(publicRoutes.articles);
    await waitForWedooPageReady(page);

    await page
      .getByRole("link", { name: publicCopy.articles.switchCta })
      .first()
      .click();
    await expect(page).toHaveURL(publicRoutes.podcasts);
    await expect(
      page.getByRole("heading", { name: publicCopy.podcasts.title }),
    ).toBeVisible();
    await expect(page.getByText(publicCopy.podcasts.eyebrow, { exact: true })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: publicCopy.podcasts.firstCardTitle }),
    ).toBeVisible();

    await page
      .getByRole("link", { name: publicCopy.podcasts.switchCta })
      .first()
      .click();
    await expect(page).toHaveURL(publicRoutes.articles);
    await expect(
      page.getByRole("heading", { name: publicCopy.articles.title }),
    ).toBeVisible();
  });
});
