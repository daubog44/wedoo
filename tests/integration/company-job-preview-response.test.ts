import { afterEach, describe, expect, it, vi } from "vitest";
import { jobDraftMock } from "../../src/data/job-draft";
import {
  companyJobPreviewResponseMock,
  getCompanyJobPreviewResponse,
} from "../../src/data/company-job-preview";
import { jobDraftStorageKey } from "../../src/data/mock-services";

describe("CompanyJobPreviewResponse", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("maps the legacy company preview route to the figma-aligned standalone shell", () => {
    expect(companyJobPreviewResponseMock).toMatchObject({
      closePath: "/portale/azienda/annunci",
      company: {
        name: "Agenzia Creativa S.r.l.",
        sectorLabel: "servizi di consulenza",
      },
      ctas: {
        certificationsLabel: "visualizza certificazioni",
        contactLabel: "contatta",
        primaryLabel: "invia",
      },
      id: "addetto-comunicazione",
      mobileDockLabel: "Navigazione rapida azienda",
      requirementsLabel: "Non e richiesta esperienza pregressa",
      sections: {
        companyBody: "",
        offerItems: expect.arrayContaining([
          "Contratto: Stage di 6 mesi con possibilita di rinnovo",
          "Retribuzione: 700-900 euro al mese",
        ]),
        summaryItems: expect.arrayContaining([
          "Milano (3 giorni in sede)",
          "Lavoro ibrido",
        ]),
      },
      title: "Addetto comunicazione",
    });
    expect(companyJobPreviewResponseMock.footnotes).toHaveLength(2);
  });

  it("hydrates the preview from the persisted company draft when available", () => {
    vi.stubGlobal("window", {
      sessionStorage: {
        getItem: (key: string) =>
          key === jobDraftStorageKey ? JSON.stringify(jobDraftMock) : null,
        setItem: () => undefined,
      },
    });

    const preview = getCompanyJobPreviewResponse("addetto-comunicazione");

    expect(preview.company).toMatchObject({
      name: "Agenzia Creativa S.r.l.",
      sectorLabel: "Comunicazione",
    });
    expect(preview.sections.offerItems).toEqual([
      "Contratto: stage",
      "Modalita: ibrido",
      "Orari: full time",
      "Retribuzione: 700-900 euro/mese",
      "Localita: Milano (MI) - 20124",
    ]);
    expect(preview.skills.hardItems).toEqual([
      "Teamwork",
      "SEO",
      "Canva",
      "Google Workspace",
    ]);
  });
});
