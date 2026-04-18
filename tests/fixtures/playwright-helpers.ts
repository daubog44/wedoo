import type { Page } from "@playwright/test";

export async function waitForWedooPageReady(page: Page) {
  await page.waitForLoadState("domcontentloaded");

  const routeLoader = page.getByTestId("route-loader");
  await routeLoader.waitFor({ state: "attached", timeout: 10_000 }).catch(() => {
    return undefined;
  });
  await routeLoader.waitFor({ state: "hidden", timeout: 15_000 }).catch(() => {
    return undefined;
  });

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      await page.evaluate(async () => {
        const MAX_ASSET_WAIT_MS = 8_000;
        const PER_ASSET_WAIT_MS = 4_000;

        function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
          return Promise.race([
            promise,
            new Promise<T | void>((resolve) => {
              window.setTimeout(resolve, timeoutMs);
            }),
          ]);
        }

        if ("fonts" in document) {
          await withTimeout(document.fonts.ready, PER_ASSET_WAIT_MS);
        }

        const waitForDomImages = Array.from(document.images)
          .filter((image) => !image.complete)
          .map(
            (image) =>
              withTimeout(
                new Promise<void>((resolve) => {
                  image.addEventListener("load", () => resolve(), { once: true });
                  image.addEventListener("error", () => resolve(), { once: true });
                }),
                PER_ASSET_WAIT_MS,
              ),
          );

        const backgroundUrls = Array.from(document.querySelectorAll<HTMLElement>("*"))
          .flatMap((element) => {
            const backgroundImage = window.getComputedStyle(element).backgroundImage;
            return Array.from(backgroundImage.matchAll(/url\((['"]?)(.*?)\1\)/g), (match) => match[2]);
          })
          .filter(Boolean);

        const uniqueBackgroundUrls = Array.from(new Set(backgroundUrls));
        const waitForBackgroundImages = uniqueBackgroundUrls.map(
          (url) =>
            withTimeout(
              new Promise<void>((resolve) => {
                const image = new Image();
                image.onload = () => resolve();
                image.onerror = () => resolve();
                image.src = url;
                if (image.complete) {
                  resolve();
                }
              }),
              PER_ASSET_WAIT_MS,
            ),
        );

        await Promise.race([
          Promise.all([...waitForDomImages, ...waitForBackgroundImages]),
          new Promise<void>((resolve) => {
            window.setTimeout(resolve, MAX_ASSET_WAIT_MS);
          }),
        ]);
      });
      return;
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (!message.includes("Execution context was destroyed") || attempt === 2) {
        throw error;
      }

      await page.waitForLoadState("domcontentloaded");
      await page.waitForTimeout(250);
    }
  }
}
