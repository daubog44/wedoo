import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("candidate contacts step", () => {
  test("matches the contact modal flow for Figma frame 281:1207", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";

    await page.goto(publicRoutes.candidateContacts);
    await waitForWedooPageReady(page);

    const contactsStep = page.getByTestId("candidate-contacts-step");
    await expect(
      contactsStep.getByRole("heading", {
        level: 1,
        name: publicCopy.candidateContacts.heading,
      }),
    ).toBeVisible();
    await expect(
      contactsStep.getByRole("link", {
        name: publicCopy.candidateContacts.closeLabel,
      }),
    ).toHaveAttribute("href", "/registrati/candidato/2");

    await expect(
      contactsStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateContacts.locationHeading,
      }),
    ).toBeVisible();
    await expect(
      contactsStep.getByText(publicCopy.candidateContacts.locationSummary, {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      contactsStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateContacts.emailHeading,
      }),
    ).toBeVisible();
    await expect(
      contactsStep.getByText(publicCopy.candidateContacts.emailSummary, {
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      contactsStep.getByRole("heading", {
        level: 2,
        name: publicCopy.candidateContacts.phoneHeading,
      }),
    ).toBeVisible();
    await expect(
      contactsStep.getByText(publicCopy.candidateContacts.phoneSummary, {
        exact: true,
      }),
    ).toBeVisible();

    const provinceField = contactsStep.getByLabel(
      publicCopy.candidateContacts.provinceLabel,
    );
    const cityField = contactsStep.getByLabel(publicCopy.candidateContacts.cityLabel);
    const postalCodeField = contactsStep.getByLabel(
      publicCopy.candidateContacts.postalCodeLabel,
    );
    const emailField = contactsStep.getByLabel(
      publicCopy.candidateContacts.emailLabel,
    );
    const phoneField = contactsStep.getByLabel(
      publicCopy.candidateContacts.phoneLabel,
    );

    await provinceField.selectOption("Roma");
    await cityField.selectOption("Guidonia Montecelio");
    await postalCodeField.fill("00118");
    await emailField.fill("azzurra+nuova@email.com");
    await phoneField.fill("+39 333 000 9911");

    const [provinceBox, cityBox, postalCodeBox] = await Promise.all([
      provinceField.boundingBox(),
      cityField.boundingBox(),
      postalCodeField.boundingBox(),
    ]);
    expect(provinceBox).not.toBeNull();
    expect(cityBox).not.toBeNull();
    expect(postalCodeBox).not.toBeNull();

    if (isMobile) {
      expect(cityBox!.y).toBeGreaterThan(provinceBox!.y + 40);
      expect(postalCodeBox!.y).toBeGreaterThan(cityBox!.y + 40);
    } else {
      expect(Math.abs(provinceBox!.y - cityBox!.y)).toBeLessThan(16);
      expect(Math.abs(cityBox!.y - postalCodeBox!.y)).toBeLessThan(16);
      expect(cityBox!.x).toBeGreaterThan(provinceBox!.x + 110);
      expect(postalCodeBox!.x).toBeGreaterThan(cityBox!.x + 110);
    }

    await contactsStep
      .getByRole("button", {
        name: publicCopy.candidateContacts.saveCta,
        exact: true,
      })
      .click();

    await expect(page).toHaveURL(/\/registrati\/candidato\/4$/);
  });
});
