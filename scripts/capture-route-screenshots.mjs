import { chromium, devices } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);

function getArg(name, fallback = "") {
  const index = args.indexOf(name);
  if (index === -1) {
    return fallback;
  }

  return args[index + 1] ?? fallback;
}

function getPositional(index, fallback = "") {
  const positional = args.filter((arg, currentIndex) => {
    if (arg.startsWith("--")) {
      return false;
    }

    const previous = args[currentIndex - 1];
    return !previous || !previous.startsWith("--");
  });

  return positional[index] ?? fallback;
}

function slugify(value) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "route";
}

async function waitForReady(page) {
  await page.waitForLoadState("domcontentloaded");

  const loader = page.getByTestId("route-loader");
  await loader.waitFor({ state: "attached", timeout: 10_000 }).catch(() => undefined);
  await loader.waitFor({ state: "hidden", timeout: 15_000 }).catch(() => undefined);

  await page.evaluate(async () => {
    if ("fonts" in document) {
      await document.fonts.ready;
    }

    const imagePromises = Array.from(document.images)
      .filter((image) => !image.complete)
      .map(
        (image) =>
          new Promise((resolve) => {
            image.addEventListener("load", resolve, { once: true });
            image.addEventListener("error", resolve, { once: true });
          }),
      );

    const backgroundUrls = Array.from(document.querySelectorAll("*"))
      .flatMap((element) => {
        const backgroundImage = window.getComputedStyle(element).backgroundImage;
        return Array.from(backgroundImage.matchAll(/url\((['"]?)(.*?)\1\)/g), (match) => match[2]);
      })
      .filter(Boolean);

    const backgroundPromises = Array.from(new Set(backgroundUrls)).map(
      (url) =>
        new Promise((resolve) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = resolve;
          image.src = url;
          if (image.complete) {
            resolve();
          }
        }),
    );

    await Promise.all([...imagePromises, ...backgroundPromises]);
  });

  await page.waitForTimeout(750);
}

const route = getArg("--route", getPositional(0, "/"));
const slug = slugify(getArg("--slug", getPositional(1, route === "/" ? "home" : route)));
const label = getArg("--label", "");
const baseUrl = process.env.WEDOO_BASE_URL ?? `http://127.0.0.1:${process.env.WEDOO_DEV_PORT ?? "4600"}`;
const now = new Date();
const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
const time = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
const outputDir = path.join(process.cwd(), "artifacts", "loop-captures", day, `${time}-${slug}`);

await fs.mkdir(outputDir, { recursive: true });

const browser = await chromium.launch({ headless: true });

try {
  const targets = [
    {
      name: "desktop",
      contextOptions: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "mobile",
      contextOptions: {
        ...devices["Pixel 7"],
      },
    },
  ];

  for (const target of targets) {
    const context = await browser.newContext(target.contextOptions);
    const page = await context.newPage();
    try {
      await page.goto(new URL(route, baseUrl).toString(), {
        waitUntil: "domcontentloaded",
        timeout: 30_000,
      });
    } catch (error) {
      throw new Error(
        `Impossibile aprire ${new URL(route, baseUrl)}. Avvia prima il dev server su ${baseUrl}. Dettaglio: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
    await waitForReady(page);
    await page.screenshot({
      animations: "disabled",
      fullPage: true,
      path: path.join(outputDir, `${target.name}.png`),
    });
    await context.close();
  }

  await fs.writeFile(
    path.join(outputDir, "meta.json"),
    JSON.stringify(
      {
        route,
        slug,
        label,
        baseUrl,
        createdAt: now.toISOString(),
      },
      null,
      2,
    ),
    "utf8",
  );

  process.stdout.write(`${outputDir}\n`);
} finally {
  await browser.close();
}
