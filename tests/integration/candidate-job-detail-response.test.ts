import { describe, expect, it } from "vitest";
import {
  candidateJobDetailResponseMock,
  getCandidateJobDetailResponse,
} from "../../src/data/candidate-job-detail";

describe("CandidateJobDetailResponse", () => {
  it("maps the tracked candidate detail route to a figma-aligned response", () => {
    expect(candidateJobDetailResponseMock).toMatchObject({
      closePath: "/portale/candidato",
      company: {
        name: "Agenzia Creativa S.r.l.",
        sectorLabel: "servizi di consulenza",
      },
      ctas: {
        certificationsLabel: "visualizza certificazioni",
        contactLabel: "contatta",
        primaryLabel: "invia candidatura",
      },
      id: "addetto-comunicazione",
      requirementsLabel: "Non e richiesta esperienza pregressa",
      sections: {
        companyBody: "",
        offerItems: expect.arrayContaining([
          "Contratto: Stage (minimo 6 mesi)",
          "Modalita: Ibrido (3 giorni in sede, 2 in smart working)",
        ]),
        summaryItems: expect.arrayContaining([
          "Milano (3 giorni in sede)",
          "Lavoro ibrido",
        ]),
      },
      title: "Addetto comunicazione",
    });
    expect(candidateJobDetailResponseMock.footnotes).toHaveLength(2);
  });

  it("falls back to a generic candidate detail presentation for other jobs", () => {
    const seoDetail = getCandidateJobDetailResponse("seo-specialist");

    expect(seoDetail.company).toMatchObject({
      name: "Northway Consulting",
      sectorLabel: "consulenza digitale e SEO",
    });
    expect(seoDetail.sections.offerItems).toEqual([
      "Contratto: Apprendistato",
      "Retribuzione: 24.000 euro annui",
      "Orari: Ibrido, lun-ven",
      "Localita: Milano",
    ]);
    expect(seoDetail.footnotes[0]).toContain("SDG");
  });
});
