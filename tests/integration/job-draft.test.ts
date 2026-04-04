import { describe, expect, it } from "vitest";
import {
  createCompanyJobDraftFormConfigs,
  jobDraftMock,
} from "../../src/data/job-draft";
import { companyForms } from "../../src/data/forms";

describe("JobDraft", () => {
  it("models the company job draft as a reusable server-like payload", () => {
    expect(jobDraftMock.id).toBe("company-job-draft");
    expect(jobDraftMock.flow).toEqual({
      completionPath: "/portale/azienda",
      draftStartStep: 2,
      previewPath: "/portale/azienda/annunci/addetto-comunicazione",
      registrationPath: "/registrati/azienda/1",
      totalSteps: 5,
    });
    expect(jobDraftMock.company.legalName).toBe("Agenzia Creativa S.r.l.");
    expect(jobDraftMock.role.skillIds).toEqual([
      "teamwork",
      "seo",
      "canva",
      "google-workspace",
    ]);
  });

  it("derives the multi-step company job forms from the job draft payload", () => {
    const forms = createCompanyJobDraftFormConfigs(jobDraftMock);

    expect(forms).toHaveLength(4);
    expect(forms.map((form) => form.background)).toEqual([
      "formaziende2.png",
      "formaziende3.png",
      "formaziende4.png",
      "formaziende5.png",
    ]);
    expect(forms[0]?.rows[1]?.fields[0]).toMatchObject({
      id: "job-title",
      kind: "select",
      options: [
        "Addetto comunicazione",
        "SEO Specialist",
        "Data Analyst",
        "Social Media Manager",
      ],
      placeholder: "Addetto comunicazione",
    });
    expect(forms[1]?.rows[2]?.fields).toMatchObject([
      { id: "salary-min", placeholder: "700" },
      { id: "salary-max", placeholder: "900" },
    ]);
    expect(forms[3]?.rows[1]?.fields[2]).toMatchObject({
      helper: "Asset mock atteso: report-sostenibilita-2025.pdf",
      id: "certifications",
      kind: "file",
    });
  });

  it("keeps the exported company wizard forms aligned with the job draft mapper", () => {
    expect(companyForms.slice(1)).toEqual(
      createCompanyJobDraftFormConfigs(jobDraftMock),
    );
    expect(companyForms).toHaveLength(jobDraftMock.flow.totalSteps);
  });
});
