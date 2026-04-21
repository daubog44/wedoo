import { describe, expect, it } from "vitest";
import {
  authViewModels,
  candidateRegistrationAuthViewModel,
  companyRegistrationAuthViewModel,
  loginAuthViewModel,
} from "../../src/data/auth";
import {
  candidateRegistrationForm,
  companyForms,
  loginForm,
} from "../../src/data/forms";

describe("AuthViewModel", () => {
  it("defines the login error state for missing required fields", () => {
    expect(loginAuthViewModel.errors).toEqual([
      {
        description: "Inserisci email e password prima di continuare.",
        fieldIds: ["email", "password"],
        id: "missing-fields",
        title: "Campi mancanti",
      },
    ]);
    expect(loginAuthViewModel.fields.map((field) => field.id)).toEqual([
      "email",
      "password",
      "terms",
    ]);
    expect(loginAuthViewModel.providerOptions?.map((provider) => provider.id)).toEqual([
      "google",
      "apple",
    ]);
    expect(loginAuthViewModel.showMissingFieldErrorsByDefault).toBe(true);
    expect(loginAuthViewModel.footerPrompt).toEqual({
      label: "non hai un account?",
      linkLabel: "registrati",
      linkTo: "/registrati",
    });
    expect(loginAuthViewModel.forgotPasswordTo).toBe("/password-dimenticata");
  });

  it("centralizes the required fields for candidate and company registration", () => {
    expect(candidateRegistrationAuthViewModel.fields.map((field) => field.id)).toEqual([
      "full-name",
      "email",
      "phone",
      "password",
      "confirm-password",
      "privacy",
    ]);
    expect(candidateRegistrationAuthViewModel.providerOptions?.map((provider) => provider.id)).toEqual([
      "google",
      "apple",
    ]);
    expect(companyRegistrationAuthViewModel.fields.map((field) => field.id)).toEqual([
      "vat",
      "company",
      "email",
      "phone",
      "privacy",
    ]);
  });

  it("keeps the existing form configs aligned with the auth view models", () => {
    expect(loginForm.rows[0]?.fields).toEqual([...loginAuthViewModel.fields]);
    expect(candidateRegistrationForm.rows[0]?.fields).toEqual([
      ...candidateRegistrationAuthViewModel.fields,
    ]);
    expect(companyForms[0]?.rows[0]?.fields).toEqual([
      ...companyRegistrationAuthViewModel.fields,
    ]);
    expect(companyRegistrationAuthViewModel.providerOptions?.map((provider) => provider.id)).toEqual([
      "google",
      "apple",
    ]);
    expect(authViewModels.login.footerPrompt?.linkTo).toBe("/registrati");
    expect(candidateRegistrationAuthViewModel.footerPrompt?.label).toBe("hai gi\u00E0 un account?");
    expect(candidateRegistrationAuthViewModel.fields[1]?.label).toBe("e-mail*");
    expect(companyRegistrationAuthViewModel.footerPrompt?.label).toBe("hai gi\u00E0 un account?");
  });
});
