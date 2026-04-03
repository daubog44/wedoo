import type { Page } from "@playwright/test";

export async function waitForWedooPageReady(page: Page) {
  await page.waitForLoadState("networkidle");
  await page.getByTestId("route-loader").waitFor({ state: "hidden" });
  await page.evaluate(async () => {
    if ("fonts" in document) {
      await document.fonts.ready;
    }
  });
}
