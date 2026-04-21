import { describe, expect, it } from "vitest";
import {
  customerSupportViewModel,
  passwordRecoveryViewModel,
} from "../../src/data/auth-recovery";

describe("auth recovery view models", () => {
  it("defines the password recovery form fields and the support route", () => {
    expect(passwordRecoveryViewModel.fields.map((field) => field.id)).toEqual([
      "current-password",
      "new-password",
      "confirm-password",
    ]);
    expect(passwordRecoveryViewModel.redirectTo).toBe("/accedi");
    expect(passwordRecoveryViewModel.supportPrompt.linkTo).toBe("/assistenza-clienti");
  });

  it("keeps company and candidate support channels normalized by audience", () => {
    expect(customerSupportViewModel.audiences).toEqual([
      expect.objectContaining({
        id: "company",
        title: "Azienda",
        channels: [
          expect.objectContaining({
            href: "tel:+390280000001",
            label: "supporto aziende",
          }),
          expect.objectContaining({
            href: "mailto:aziende@wedoo.it",
            label: "invia una mail",
          }),
        ],
      }),
      expect.objectContaining({
        id: "candidate",
        title: "Candidato",
        channels: [
          expect.objectContaining({
            href: "tel:+390280000002",
            label: "supporto candidati",
          }),
          expect.objectContaining({
            href: "mailto:candidati@wedoo.it",
            label: "invia una mail",
          }),
        ],
      }),
    ]);
  });
});
