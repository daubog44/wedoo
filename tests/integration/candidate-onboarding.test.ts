import { describe, expect, it } from "vitest";
import {
  applyCandidateAccountStep,
  applyCandidatePreferencesStep,
  candidateOnboardingDraftMock,
  candidateOnboardingSdgOptions,
  createCandidateProfileDraftFromOnboarding,
  getCandidateOnboardingCityOptions,
} from "../../src/data/candidate-onboarding";
import { candidateProfileDraftMock } from "../../src/data/candidate-profile";

describe("candidate onboarding", () => {
  it("starts from an empty account and preferences contract", () => {
    expect(candidateOnboardingDraftMock.account).toEqual({
      confirmPassword: "",
      email: "",
      fullName: "",
      password: "",
      phone: "",
      privacyAccepted: true,
    });
    expect(candidateOnboardingDraftMock.preferences).toEqual({
      city: "",
      postalCode: "",
      province: "",
      roleInterests: [],
      sdgFocus: [],
    });
  });

  it("maps account fields into the onboarding draft", () => {
    const updatedDraft = applyCandidateAccountStep(candidateOnboardingDraftMock, {
      confirmPassword: "Password123",
      email: "azzurra@email.com",
      fullName: "Azzurra Signorelli",
      password: "Password123",
      phone: "+39 3201234567",
      privacyAccepted: false,
    });

    expect(updatedDraft.account).toEqual({
      confirmPassword: "Password123",
      email: "azzurra@email.com",
      fullName: "Azzurra Signorelli",
      password: "Password123",
      phone: "+39 3201234567",
      privacyAccepted: false,
    });
  });

  it("maps province, city, sdg and role preferences into the onboarding draft", () => {
    const updatedDraft = applyCandidatePreferencesStep(candidateOnboardingDraftMock, {
      city: "Guidonia Montecelio",
      postalCode: "00012",
      province: "Roma",
      roleInterest: "Comunicazione",
      sdgFocus: candidateOnboardingSdgOptions[1]?.value ?? "",
    });

    expect(getCandidateOnboardingCityOptions("Roma").map((option) => option.value)).toContain(
      "Guidonia Montecelio",
    );
    expect(updatedDraft.preferences).toEqual({
      city: "Guidonia Montecelio",
      postalCode: "00012",
      province: "Roma",
      roleInterests: ["Comunicazione"],
      sdgFocus: [candidateOnboardingSdgOptions[1]?.value ?? ""],
    });
  });

  it("hydrates the candidate profile draft with the public onboarding inputs", () => {
    const hydratedProfile = createCandidateProfileDraftFromOnboarding(
      candidateProfileDraftMock,
      {
        account: {
          confirmPassword: "Password123",
          email: "azzurra@email.com",
          fullName: "Azzurra Signorelli",
          password: "Password123",
          phone: "+39 3201234567",
          privacyAccepted: true,
        },
        preferences: {
          city: "Guidonia Montecelio",
          postalCode: "00012",
          province: "Roma",
          roleInterests: ["Comunicazione"],
          sdgFocus: ["Parita di genere"],
        },
      },
    );

    expect(hydratedProfile.contact).toMatchObject({
      city: "Guidonia Montecelio",
      email: "azzurra@email.com",
      fullName: "Azzurra Signorelli",
      phone: "+39 3201234567",
      postalCode: "00012",
      province: "Roma",
      provinceCode: "RM",
    });
    expect(hydratedProfile.motivations).toMatchObject({
      preferredRoles: ["Comunicazione"],
      sdgFocus: ["Parita di genere"],
    });
    expect(hydratedProfile.privacyAccepted).toBe(true);
  });
});
