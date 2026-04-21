import { expect, test, type Page } from "@playwright/test";
import { publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

async function getVisibleThemeToggle(page: Page) {
  const toggles = page.locator("[data-testid='wedoo-theme-toggle']");
  const count = await toggles.count();

  for (let index = 0; index < count; index += 1) {
    const toggle = toggles.nth(index);
    if (await toggle.isVisible()) {
      return toggle;
    }
  }

  throw new Error("No visible Wedoo theme toggle found");
}

test.describe("wedoo theme toggle", () => {
  test("persists the selected theme across landing, auth and onboarding routes", async ({ page }, testInfo) => {
    if (testInfo.project.name !== "chromium-mobile") {
      await page.setViewportSize({ width: 1440, height: 1100 });
    }

    await page.goto(publicRoutes.home);
    await waitForWedooPageReady(page);

    const homeThemeToggle = await getVisibleThemeToggle(page);
    await expect(homeThemeToggle).toBeVisible();
    await homeThemeToggle.click();

    await expect.poll(async () => page.evaluate(() => document.documentElement.dataset.wedooTheme)).toBe("light");
    await expect(page.getByTestId("home-hero-preview-copy")).toBeVisible();

    await page.goto(publicRoutes.login);
    await waitForWedooPageReady(page);

    const loginThemeToggle = await getVisibleThemeToggle(page);
    await expect(loginThemeToggle).toBeVisible();
    await expect.poll(async () => page.evaluate(() => document.documentElement.dataset.wedooTheme)).toBe("light");

    await page.goto(publicRoutes.register);
    await waitForWedooPageReady(page);
    await expect.poll(async () => page.evaluate(() => document.documentElement.dataset.wedooTheme)).toBe("light");

    const registerThemeToggle = await getVisibleThemeToggle(page);
    await expect(registerThemeToggle).toBeVisible();
    await registerThemeToggle.click();

    await expect.poll(async () => page.evaluate(() => document.documentElement.dataset.wedooTheme)).toBe("dark");

    await page.goto(publicRoutes.companySustainability);
    await waitForWedooPageReady(page);
    await expect.poll(async () => page.evaluate(() => document.documentElement.dataset.wedooTheme)).toBe("dark");

    await page.reload();
    await waitForWedooPageReady(page);
    await expect.poll(async () => page.evaluate(() => document.documentElement.dataset.wedooTheme)).toBe("dark");
  });
});
