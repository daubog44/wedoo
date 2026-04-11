import {
  createEmptyJobDraft,
  type JobDraft,
  jobDraftMock,
} from "./job-draft";

export type CompanyRegistrationDraft = {
  company: string;
  email: string;
  phone: string;
  privacyAccepted: boolean;
  vat: string;
};

export type CompanyRecruiterStepInput = {
  cityId: string;
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phone: string;
  provinceId: string;
  publicContact: boolean;
  titleId: string;
};

export type CompanyDetailsStepInput = {
  logoFileName: string;
  maximum: string;
  minimum: string;
  overview: string;
  publicSalary: boolean;
  salaryUnitId: string;
};

export const companyRegistrationDraftMock: CompanyRegistrationDraft = {
  company: "",
  email: "",
  phone: "",
  privacyAccepted: true,
  vat: "",
};

export function createBlankCompanyOnboardingDraft(
  baseDraft: JobDraft = jobDraftMock,
): JobDraft {
  const emptyDraft = createEmptyJobDraft(baseDraft);

  return {
    ...emptyDraft,
    company: {
      ...emptyDraft.company,
      legalName: "",
      logoAsset: "",
      overview: "",
      vatNumber: "",
    },
    compensation: {
      ...emptyDraft.compensation,
      maximum: "",
      minimum: "",
      publicSalary: true,
      unitId: "",
    },
    geography: {
      ...emptyDraft.geography,
      remoteAllowed: true,
      travelRequired: true,
    },
    recruiter: {
      ...emptyDraft.recruiter,
      email: "",
      firstName: "",
      lastName: "",
      message: "",
      phone: "",
      publicContact: true,
    },
    role: {
      ...emptyDraft.role,
      certificationLabel: "",
      contractTypeId: "",
      description: "",
      experienceLevelId: "",
      hoursId: "",
      sdgIds: [],
      sectorId: "",
      skillIds: [],
      titleId: "",
      workModeId: "",
    },
  };
}

export function applyCompanyRecruiterStep(
  draft: JobDraft,
  values: CompanyRecruiterStepInput,
): JobDraft {
  return {
    ...draft,
    geography: {
      ...draft.geography,
      cityId: values.cityId,
      provinceId: values.provinceId,
    },
    recruiter: {
      ...draft.recruiter,
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      message: values.message,
      phone: values.phone,
      publicContact: values.publicContact,
    },
    role: {
      ...draft.role,
      titleId: values.titleId,
    },
  };
}

export function applyCompanyDetailsStep(
  draft: JobDraft,
  values: CompanyDetailsStepInput,
): JobDraft {
  return {
    ...draft,
    company: {
      ...draft.company,
      legalName: draft.company.legalName,
      logoAsset: values.logoFileName,
      overview: values.overview,
      vatNumber: draft.company.vatNumber,
    },
    compensation: {
      ...draft.compensation,
      maximum: values.maximum,
      minimum: values.minimum,
      publicSalary: values.publicSalary,
      unitId: values.salaryUnitId,
    },
  };
}
