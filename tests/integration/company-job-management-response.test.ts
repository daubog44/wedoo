import { describe, expect, it } from "vitest";
import { createCompanyJobManagementResponse } from "../../src/data/company-job-management";
import { createBlankCompanyOnboardingDraft } from "../../src/data/company-onboarding";
import { jobDraftMock } from "../../src/data/job-draft";

describe("company job management response", () => {
  it("builds the standalone annuncio shell payload with fallback company identity", () => {
    const blankDraft = createBlankCompanyOnboardingDraft(jobDraftMock);
    const response = createCompanyJobManagementResponse(blankDraft);

    expect(response.company.legalName).toBe("Agenzia Creativa S.r.l.");
    expect(response.company.logo).toBe("logo-azienda2.png");
    expect(response.company.createNewLabel).toBe("crea nuovo annuncio");
    expect(response.sectionOptions.map((option) => option.id)).toEqual([
      "recruiter",
      "company-details",
      "offer-details",
      "publishing",
    ]);
    expect(response.publishedJobs[0]).toMatchObject({
      id: "addetto-comunicazione",
      label: "Addetto comunicazione",
      previewPath: "/portale/azienda/annunci/addetto-comunicazione",
    });
    expect(response.publishedJobCards[0]).toMatchObject({
      companyName: "Agenzia Creativa S.r.l.",
      locationLabel: "20124 - Milano (MI)",
      previewPath: "/portale/azienda/annunci/addetto-comunicazione",
      title: "ADDETTO COMUNICAZIONE",
    });
  });

  it("prefers the current draft company data when the annuncio was already started", () => {
    const response = createCompanyJobManagementResponse({
      ...jobDraftMock,
      company: {
        ...jobDraftMock.company,
        legalName: "Impresa Clima S.r.l.",
        logoAsset: "impresa-clima.png",
      },
    });

    expect(response.company.legalName).toBe("Impresa Clima S.r.l.");
    expect(response.company.logo).toBe("impresa-clima.png");
    expect(response.draft.company.logoAsset).toBe("impresa-clima.png");
  });
});
