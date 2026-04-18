import { expect, test, type Locator, type Page } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

async function getBoundingBox(locator: Locator) {
  const box = await locator.boundingBox();
  expect(box).not.toBeNull();
  return box!;
}

async function openLandingPage(page: Page, isMobile: boolean) {
  if (!isMobile) {
    await page.setViewportSize({ width: 1280, height: 1100 });
  }

  await page.goto(publicRoutes.home);
  await waitForWedooPageReady(page);
}

function activeLandingLayout(page: Page, isMobile: boolean) {
  return page.locator(
    isMobile ? '[data-home-layout="mobile"]' : '[data-home-layout="desktop"]',
  );
}

test.describe("landing page", () => {
  test("matches the section structure of Figma frame 143:1822", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    await openLandingPage(page, isMobile);
    const layout = activeLandingLayout(page, isMobile);

    const heroTitle = layout.getByRole("heading", {
      level: 1,
      name: publicCopy.home.heroTitle,
    });
    await expect(heroTitle).toBeVisible();
    await expect(
      layout.locator("p:visible").filter({
        hasText: publicCopy.home.heroSubtitleLines[0],
      }).first(),
    ).toBeVisible();
    await expect(
      layout.locator("p:visible").filter({
        hasText: publicCopy.home.heroSubtitleLines[1],
      }).first(),
    ).toBeVisible();

    const companyPromptLink = page.getByRole("link", {
      name: publicCopy.home.companyPrompt,
    });
    await expect(companyPromptLink).toBeVisible();
    await expect(companyPromptLink).toHaveAttribute(
      "href",
      publicCopy.home.companyPromptHref,
    );

    const howItWorksHeading = layout.getByRole("heading", {
      name: isMobile
        ? publicCopy.home.howItWorksMobileTitle
        : publicCopy.home.howItWorksTitle,
    });
    await expect(howItWorksHeading).toBeVisible();
    await expect(
      layout.locator("p:visible").filter({
        hasText: isMobile
          ? publicCopy.home.howItWorksMobileDescription
          : publicCopy.home.howItWorksEyebrow,
      }).first(),
    ).toBeVisible();

    const candidateRoleLink = layout.getByRole("link", {
      name: publicCopy.home.candidateCta,
      exact: true,
    });
    const companyRoleLink = layout.getByRole("link", {
      name: publicCopy.home.companyCta,
      exact: true,
    });
    await expect(candidateRoleLink).toBeVisible();
    await expect(companyRoleLink).toBeVisible();

    const impactStatement = layout.locator("p:visible").filter({
      hasText: publicCopy.home.impactStatement,
    }).first();
    await expect(impactStatement).toBeVisible();

    const featureHeadings = publicCopy.home.featureCardTitles.map((title) =>
      layout.getByRole("heading", { name: title, exact: true }),
    );
    for (const featureHeading of featureHeadings) {
      await expect(featureHeading).toBeVisible();
    }

    const videoHeading = layout.getByRole("heading", {
      name: publicCopy.home.videoTitle,
    });
    await expect(videoHeading).toBeVisible();
    await expect(
      layout.getByRole("img", { name: publicCopy.home.videoTitle }),
    ).toBeVisible();

    const patronageHeading = layout.getByRole("heading", {
      name: publicCopy.home.patronageTitle,
    });
    await expect(patronageHeading).toBeVisible();
    const patronageSection = layout.locator("section").filter({
      has: patronageHeading,
    });
    await expect(patronageSection.locator("img")).toHaveCount(0);

    const footerRights = page.locator("p:visible").filter({
      hasText: publicCopy.home.footerRightsLine,
    }).first();
    const footerContact = page.locator("p:visible").filter({
      hasText: publicCopy.home.contactEmail,
    }).first();
    await expect(footerRights).toBeVisible();
    await expect(footerContact).toBeVisible();

    const orderedSections = [
      heroTitle,
      howItWorksHeading,
      impactStatement,
      featureHeadings[0],
      videoHeading,
      patronageHeading,
      footerContact,
    ];
    let previousBox = await getBoundingBox(orderedSections[0]);
    for (const locator of orderedSections.slice(1)) {
      const currentBox = await getBoundingBox(locator);
      expect(currentBox.y).toBeGreaterThan(previousBox.y + 20);
      previousBox = currentBox;
    }

    const [candidateRoleBox, companyRoleBox] = await Promise.all([
      getBoundingBox(candidateRoleLink),
      getBoundingBox(companyRoleLink),
    ]);

    if (isMobile) {
      expect(companyRoleBox.y).toBeGreaterThan(candidateRoleBox.y + 40);
    } else {
      expect(Math.abs(candidateRoleBox.y - companyRoleBox.y)).toBeLessThan(30);
      expect(companyRoleBox.x).toBeGreaterThan(candidateRoleBox.x + 120);
    }
  });

  test("keeps the CTA map and auth flow from Figma frame 143:1822", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    await openLandingPage(page, isMobile);
    const layout = activeLandingLayout(page, isMobile);

    const downloadLink = layout.getByRole("link", {
      name: publicCopy.home.downloadCta,
    });
    await expect(downloadLink).toBeVisible();
    await expect(downloadLink).toHaveAttribute("href", "/manifest.webmanifest");
    await expect(downloadLink).toHaveAttribute(
      "download",
      "wedoo.webmanifest",
    );
    await expect(downloadLink.locator("svg")).toHaveCount(1);

    const authButtonGroup = layout.getByRole("group", {
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

    const candidateRoleLink = layout.getByRole("link", {
      name: publicCopy.home.candidateCta,
      exact: true,
    });
    await expect(candidateRoleLink).toHaveAttribute("href", "/candidato");

    const companyRoleLink = layout.getByRole("link", {
      name: publicCopy.home.companyCta,
      exact: true,
    });
    await expect(companyRoleLink).toHaveAttribute(
      "href",
      publicCopy.home.companyPromptHref,
    );

    await expect(
      page.getByRole("link", {
        name: publicCopy.home.privacyPolicy,
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: publicCopy.home.cookiePolicy,
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", {
        name: publicCopy.home.termsOfUse,
        exact: true,
      }),
    ).toBeVisible();

    const discoverLinks = publicCopy.home.discoverTargets.map((target) =>
      layout
        .locator(`a[href="${target}"]:visible`)
        .getByText(publicCopy.home.discoverCta, {
          exact: true,
        })
        .first(),
    );
    await expect(
      layout.getByRole("link", { name: publicCopy.home.discoverCta }),
    ).toHaveCount(3);
    for (const discoverLink of discoverLinks) {
      await expect(discoverLink).toBeVisible();
    }

    const [firstDiscoverBox, secondDiscoverBox, thirdDiscoverBox] =
      await Promise.all(discoverLinks.map((locator) => getBoundingBox(locator)));

    if (isMobile) {
      expect(secondDiscoverBox.y).toBeGreaterThan(firstDiscoverBox.y + 80);
      expect(thirdDiscoverBox.y).toBeGreaterThan(secondDiscoverBox.y + 80);
    } else {
      expect(Math.abs(firstDiscoverBox.y - secondDiscoverBox.y)).toBeLessThan(
        30,
      );
      expect(Math.abs(secondDiscoverBox.y - thirdDiscoverBox.y)).toBeLessThan(
        30,
      );
      expect(secondDiscoverBox.x).toBeGreaterThan(firstDiscoverBox.x + 120);
      expect(thirdDiscoverBox.x).toBeGreaterThan(secondDiscoverBox.x + 120);
    }

    await authButtonGroup
      .getByRole("button", { name: publicCopy.home.signInCta })
      .click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    await expect(
      dialog.getByRole("heading", { name: publicCopy.home.signInDialogTitle }),
    ).toBeVisible();
    await expect(
      dialog.getByRole("link", { name: publicCopy.home.signUpCta }),
    ).toBeVisible();

    await dialog
      .getByRole("button", { name: publicCopy.home.authDialogCloseLabel })
      .click();
    await expect(dialog).toBeHidden();

    await authButtonGroup
      .getByRole("button", { name: publicCopy.home.signUpCta })
      .click();
    await expect(
      page.getByRole("dialog").getByRole("heading", {
        name: publicCopy.home.signUpDialogTitle,
      }),
    ).toBeVisible();
  });
});
