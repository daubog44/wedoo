import { sdgs } from "./core";
import {
  candidateContactProvinceOptions,
  candidateProfileDraftMock,
  getCandidateContactCityOptions,
  type CandidateContactOption,
  type CandidateProfileDraft,
} from "./candidate-profile";

export type CandidateOnboardingOption = CandidateContactOption;

export type CandidateOnboardingAccountDraft = {
  confirmPassword: string;
  email: string;
  fullName: string;
  password: string;
  phone: string;
  privacyAccepted: boolean;
};

export type CandidateOnboardingPreferencesDraft = {
  city: string;
  postalCode: string;
  province: string;
  roleInterests: readonly string[];
  sdgFocus: readonly string[];
};

export type CandidateOnboardingDraft = {
  account: CandidateOnboardingAccountDraft;
  preferences: CandidateOnboardingPreferencesDraft;
};

export type CandidateOnboardingPreferencesInput = {
  city: string;
  postalCode: string;
  province: string;
  roleInterest: string;
  sdgFocus: string;
};

const candidateProvinceCodeByLabel = {
  Milano: "MI",
  Roma: "RM",
  Torino: "TO",
} as const satisfies Record<string, string>;

export const candidateOnboardingDraftMock: CandidateOnboardingDraft = {
  account: {
    confirmPassword: "",
    email: "",
    fullName: "",
    password: "",
    phone: "",
    privacyAccepted: true,
  },
  preferences: {
    city: "",
    postalCode: "",
    province: "",
    roleInterests: [],
    sdgFocus: [],
  },
};

export const candidateOnboardingProvinceOptions =
  candidateContactProvinceOptions;

export const candidateOnboardingSdgOptions = Object.values(sdgs).map(
  ({ label }) => ({
    label,
    value: label,
  }),
) satisfies readonly CandidateOnboardingOption[];

export const candidateOnboardingRoleSuggestions = [
  ...candidateProfileDraftMock.motivations.preferredRoles,
  "Sostenibilita",
  "Risorse umane",
  "Business development",
].map((value) => ({ label: value, value })) satisfies readonly CandidateOnboardingOption[];

export function getCandidateOnboardingCityOptions(
  province: string,
): readonly CandidateOnboardingOption[] {
  return getCandidateContactCityOptions(province);
}

export function applyCandidateAccountStep(
  draft: CandidateOnboardingDraft,
  values: CandidateOnboardingAccountDraft,
): CandidateOnboardingDraft {
  return {
    ...draft,
    account: {
      ...values,
    },
  };
}

export function applyCandidatePreferencesStep(
  draft: CandidateOnboardingDraft,
  values: CandidateOnboardingPreferencesInput,
): CandidateOnboardingDraft {
  const roleInterest = values.roleInterest.trim();

  return {
    ...draft,
    preferences: {
      city: values.city,
      postalCode: values.postalCode,
      province: values.province,
      roleInterests: roleInterest ? [roleInterest] : [],
      sdgFocus: values.sdgFocus ? [values.sdgFocus] : [],
    },
  };
}

export function createCandidateProfileDraftFromOnboarding(
  baseDraft: CandidateProfileDraft,
  onboardingDraft: CandidateOnboardingDraft,
): CandidateProfileDraft {
  const provinceCode =
    candidateProvinceCodeByLabel[
      onboardingDraft.preferences.province as keyof typeof candidateProvinceCodeByLabel
    ] ?? baseDraft.contact.provinceCode;

  return {
    ...baseDraft,
    contact: {
      ...baseDraft.contact,
      city: onboardingDraft.preferences.city || baseDraft.contact.city,
      email: onboardingDraft.account.email || baseDraft.contact.email,
      fullName: onboardingDraft.account.fullName || baseDraft.contact.fullName,
      phone: onboardingDraft.account.phone || baseDraft.contact.phone,
      postalCode:
        onboardingDraft.preferences.postalCode || baseDraft.contact.postalCode,
      province: onboardingDraft.preferences.province || baseDraft.contact.province,
      provinceCode,
    },
    motivations: {
      ...baseDraft.motivations,
      preferredRoles:
        onboardingDraft.preferences.roleInterests.length > 0
          ? onboardingDraft.preferences.roleInterests
          : baseDraft.motivations.preferredRoles,
      sdgFocus:
        onboardingDraft.preferences.sdgFocus.length > 0
          ? onboardingDraft.preferences.sdgFocus
          : baseDraft.motivations.sdgFocus,
    },
    privacyAccepted: onboardingDraft.account.privacyAccepted,
  };
}
