import { describe, expect, it } from "vitest";
import {
  applyCompanyDetailsStep,
  applyCompanyRecruiterStep,
  companyRegistrationDraftMock,
  createBlankCompanyOnboardingDraft,
} from "../../src/data/company-onboarding";
import { jobDraftMock } from "../../src/data/job-draft";

describe("company onboarding", () => {
  it("starts from an empty job draft while preserving flow metadata", () => {
    const blankDraft = createBlankCompanyOnboardingDraft(jobDraftMock);

    expect(blankDraft.flow).toEqual(jobDraftMock.flow);
    expect(blankDraft.company).toMatchObject({
      legalName: "",
      logoAsset: "",
      overview: "",
      vatNumber: "",
    });
    expect(blankDraft.recruiter).toMatchObject({
      email: "",
      firstName: "",
      lastName: "",
      message: "",
      phone: "",
      publicContact: true,
    });
    expect(blankDraft.geography).toMatchObject({
      capId: "",
      cityId: "",
      provinceId: "",
      remoteAllowed: true,
      travelRequired: true,
    });
    expect(blankDraft.role).toMatchObject({
      contractTypeId: "",
      description: "",
      experienceLevelId: "",
      hoursId: "",
      sdgIds: [],
      sectorId: "",
      skillIds: [],
      titleId: "",
      workModeId: "",
    });
  });

  it("maps recruiter step values into the shared draft contract", () => {
    const updatedDraft = applyCompanyRecruiterStep(
      createBlankCompanyOnboardingDraft(jobDraftMock),
      {
        cityId: "milano",
        email: "team@wedoo.it",
        firstName: "Lara",
        lastName: "Bianchi",
        message: "Cerchiamo una persona curiosa e concreta.",
        phone: "+39 3311234567",
        provinceId: "mi",
        publicContact: true,
        titleId: "communication-specialist",
      },
    );

    expect(updatedDraft.geography).toMatchObject({
      cityId: "milano",
      provinceId: "mi",
    });
    expect(updatedDraft.recruiter).toMatchObject({
      email: "team@wedoo.it",
      firstName: "Lara",
      lastName: "Bianchi",
      message: "Cerchiamo una persona curiosa e concreta.",
      phone: "+39 3311234567",
      publicContact: true,
    });
    expect(updatedDraft.role.titleId).toBe("communication-specialist");
  });

  it("maps company details step values into the shared draft contract", () => {
    const updatedDraft = applyCompanyDetailsStep(
      createBlankCompanyOnboardingDraft(jobDraftMock),
      {
        logoFileName: "brand-kit.pdf",
        maximum: "1200",
        minimum: "850",
        overview: "Un team piccolo che costruisce prodotti digitali con impatto.",
        publicSalary: true,
        salaryUnitId: "mensile",
      },
    );

    expect(updatedDraft.company).toMatchObject({
      logoAsset: "brand-kit.pdf",
      overview: "Un team piccolo che costruisce prodotti digitali con impatto.",
    });
    expect(updatedDraft.compensation).toMatchObject({
      maximum: "1200",
      minimum: "850",
      publicSalary: true,
      unitId: "mensile",
    });
    expect(companyRegistrationDraftMock.privacyAccepted).toBe(true);
  });
});
