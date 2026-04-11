import { expect, test } from "@playwright/test";
import { publicCopy, publicRoutes } from "../../fixtures/public-copy";
import { waitForWedooPageReady } from "../../fixtures/playwright-helpers";

test.describe("company registration wizard", () => {
  test("matches the public company onboarding flow across all Figma steps", async ({
    page,
  }, testInfo) => {
    const isMobile = testInfo.project.name === "chromium-mobile";
    const layoutSelector = `[data-company-wizard-layout="${isMobile ? "mobile" : "desktop"}"]`;

    await page.goto(publicRoutes.companyRegistration);
    await waitForWedooPageReady(page);

    const stepOne = page.locator(`${layoutSelector}[data-company-wizard-step="1"]`);
    await expect(stepOne.getByRole("heading", { level: 1, name: publicCopy.companyRegistration.firstTitle })).toBeVisible();
    await expect(stepOne.getByText(publicCopy.companyRegistration.firstSubtitle, { exact: true })).toBeVisible();

    await stepOne.getByLabel("partita IVA").fill("IT12345678901");
    await stepOne.getByLabel("ragione sociale*").fill("Agenzia Wedoo");
    await stepOne.getByLabel("e-mail*").fill("team@wedoo.it");
    await stepOne.getByLabel("numero di telefono*").fill("+39 3201234567");

    const privacyToggle = stepOne.getByRole("checkbox", {
      name: /privacy/i,
    });
    await expect(privacyToggle).toHaveAttribute("aria-checked", "true");
    await privacyToggle.click();
    await expect(privacyToggle).toHaveAttribute("aria-checked", "false");
    await privacyToggle.click();
    await expect(privacyToggle).toHaveAttribute("aria-checked", "true");

    await expect(
      stepOne.getByRole("button", { name: publicCopy.companyRegistration.providerGoogle, exact: true }),
    ).toBeVisible();
    await expect(
      stepOne.getByRole("button", { name: publicCopy.companyRegistration.providerApple, exact: true }),
    ).toBeVisible();

    await stepOne.getByRole("button", { name: "registrati", exact: true }).click();
    await expect(page).toHaveURL(publicRoutes.companyRecruiter);

    const stepTwo = page.locator(`${layoutSelector}[data-company-wizard-step="2"]`);
    await expect(stepTwo.getByRole("heading", { level: 1, name: publicCopy.companyRegistration.recruiterTitle })).toBeVisible();
    await stepTwo.getByLabel("provincia").selectOption("mi");
    await stepTwo.getByLabel("città").selectOption("milano");
    await stepTwo.getByLabel("job title").selectOption("communication-specialist");
    await stepTwo.getByRole("checkbox", { name: publicCopy.companyRegistration.publicContactLabel }).click();
    await stepTwo.getByRole("checkbox", { name: publicCopy.companyRegistration.publicContactLabel }).click();
    await stepTwo.getByLabel("nome", { exact: true }).fill("Lara");
    await stepTwo.getByLabel("cognome", { exact: true }).fill("Bianchi");
    await stepTwo.getByLabel("e-mail", { exact: true }).fill("lara@wedoo.it");
    await stepTwo.getByLabel("numero di telefono", { exact: true }).fill("+39 3330009911");
    await stepTwo.getByLabel("lascia un messaggio").fill("Cerchiamo una persona curiosa e proattiva.");
    await stepTwo.getByRole("button", { name: publicCopy.companyRegistration.secondContinueCta, exact: true }).click();
    await expect(page).toHaveURL(publicRoutes.companyDetails);

    const stepThree = page.locator(`${layoutSelector}[data-company-wizard-step="3"]`);
    await expect(stepThree.getByText(publicCopy.companyRegistration.stepThreeSectionHeading, { exact: true })).toBeVisible();
    await stepThree.getByLabel("descrizione azienda").fill(
      "Un team che crea opportunità sostenibili tra branding, comunicazione e impatto.",
    );
    await stepThree.getByRole("checkbox", { name: publicCopy.companyRegistration.publicSalaryLabel }).click();
    await stepThree.getByRole("checkbox", { name: publicCopy.companyRegistration.publicSalaryLabel }).click();
    await stepThree.getByLabel("importo minimo").fill("700");
    await stepThree.getByLabel("importo massimo").fill("900");
    await stepThree.getByLabel("unità di retribuzione").selectOption("mensile");
    await stepThree.getByRole("button", { name: publicCopy.companyRegistration.secondContinueCta, exact: true }).click();
    await expect(page).toHaveURL(publicRoutes.companyOffer);

    const stepFour = page.locator(`${layoutSelector}[data-company-wizard-step="4"]`);
    await expect(stepFour.getByText(publicCopy.companyRegistration.stepFourSectionHeading, { exact: true })).toBeVisible();
    await stepFour.getByLabel("provincia").selectOption("mi");
    await stepFour.getByLabel("città").selectOption("milano");
    await stepFour.getByLabel("CAP").fill("20124");
    await stepFour.getByLabel("job description").fill(
      "Supporterai contenuti, social media e campagne legate a impatto e sostenibilità.",
    );
    await stepFour.getByLabel("settore operativo aziendale").selectOption("communication");
    await stepFour.getByLabel("competenze richieste").selectOption("seo");
    await stepFour.getByLabel("esperienza richiesta").selectOption("stage");
    await stepFour.getByRole("button", { name: publicCopy.companyRegistration.secondContinueCta, exact: true }).click();
    await expect(page).toHaveURL(publicRoutes.companySustainability);

    const stepFive = page.locator(`${layoutSelector}[data-company-wizard-step="5"]`);
    await expect(stepFive.getByLabel("tipologia di contratto")).toBeVisible();
    await expect(stepFive.getByLabel(publicCopy.companyRegistration.stepFiveModeLabel)).toBeVisible();
    await stepFive.getByLabel("tipologia di contratto").selectOption("stage");
    await stepFive.getByLabel("orari di lavoro").selectOption("full-time");
    await stepFive.getByLabel(publicCopy.companyRegistration.stepFiveModeLabel).selectOption("ibrido");
    await stepFive.getByLabel("SDGs di riferimento").selectOption("gender-equality");
    await stepFive.getByLabel("SDGs di riferimento").selectOption("climate-action");
    await expect(stepFive.getByTestId("company-registration-sdg-list")).toBeVisible();
    await expect(
      stepFive.getByRole("button", { name: publicCopy.companyRegistration.outlinePreviewCta, exact: true }),
    ).toBeVisible();
    await expect(
      stepFive.getByRole("button", {
        name: isMobile
          ? publicCopy.companyRegistration.outlineSaveCta
          : publicCopy.companyRegistration.desktopSaveCta,
        exact: true,
      }),
    ).toBeVisible();
    await expect(
      stepFive.getByRole("button", { name: publicCopy.companyRegistration.outlineCancelCta, exact: true }),
    ).toBeVisible();
    await stepFive.getByRole("button", { name: publicCopy.companyRegistration.finalPrimaryCta, exact: true }).click();

    await expect(page).toHaveURL(/\/portale\/azienda$/);
  });
});
