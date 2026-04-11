import { describe, expect, it } from "vitest";
import {
  companyCandidateDetailResponseMock,
  getCompanyCandidateDetailResponse,
} from "../../src/data/company-candidate-detail";

describe("CompanyCandidateDetailResponse", () => {
  it("maps the tracked company candidate detail route to a figma-aligned response", () => {
    expect(companyCandidateDetailResponseMock).toMatchObject({
      availabilityLabel: "Disponibile per trasferte",
      candidate: {
        fullName: "Azzurra Signorelli",
        id: "azzurra-signorelli",
        statusLabel: "Neolaureata",
      },
      closePath: "/portale/azienda",
      ctas: {
        closeLabel: "Chiudi dettaglio candidato",
        primaryLabel: "richiedi colloquio",
        resumeLabel: "visualizza CV",
      },
      id: "azzurra-signorelli",
      mobileDockLabel: "Navigazione rapida azienda",
      sections: {
        certificationsItems: ["Digital Marketing e Comunicazione"],
        educationItems: expect.arrayContaining([
          "Laurea magistrale in Comunicazione",
          "Certificazione in digital marketing e social media",
        ]),
      },
    });
    expect(companyCandidateDetailResponseMock.contactItems).toHaveLength(3);
    expect(companyCandidateDetailResponseMock.footnote).toContain("Agenda 2030");
  });

  it("falls back to the requested candidate when a different company profile is opened", () => {
    const detail = getCompanyCandidateDetailResponse("sofia-martinelli");

    expect(detail.candidate).toMatchObject({
      fullName: "Sofia Martinelli",
      statusLabel: "Neolaureata",
    });
    expect(detail.sections.certificationsItems[0]).toContain("accessible");
    expect(detail.sections.experienceItems).toHaveLength(2);
    expect(detail.sections.hardSkillItems).toContain("UX writing");
  });
});
