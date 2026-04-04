import { describe, expect, it } from "vitest";
import {
  authViewModels,
  candidateRegistrationAuthViewModel,
  companyRegistrationAuthViewModel,
  loginAuthViewModel,
} from "../../src/data/auth";
import { candidateForms, companyForms, loginForm } from "../../src/data/forms";

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
    expect(companyRegistrationAuthViewModel.fields.map((field) => field.id)).toEqual([
      "vat",
      "company",
      "email",
      "password",
      "confirm-password",
      "privacy",
    ]);
  });

  it("keeps the existing form configs aligned with the auth view models", () => {
    expect(loginForm.rows[0]?.fields).toEqual([...loginAuthViewModel.fields]);
    expect(candidateForms[0]?.rows[0]?.fields).toEqual([
      ...candidateRegistrationAuthViewModel.fields,
    ]);
    expect(companyForms[0]?.rows[0]?.fields).toEqual([
      ...companyRegistrationAuthViewModel.fields,
    ]);
    expect(authViewModels.login.footerPrompt?.linkTo).toBe("/registrati");
  });
});
