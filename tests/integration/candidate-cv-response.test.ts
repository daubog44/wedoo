import { describe, expect, it } from "vitest";
import { candidateCvResponseMock } from "../../src/data/candidate-cv";

describe("candidate cv response", () => {
  it("maps the candidate profile into the standalone cv shell payload", () => {
    expect(candidateCvResponseMock.candidate.fullName).toBe("Azzurra Signorelli");
    expect(candidateCvResponseMock.candidate.goalLabel).toBe(
      "candidati al tuo primo lavoro",
    );
    expect(candidateCvResponseMock.sections.personalDataItems).toEqual([
      "00012 - Guidonia Montecelio (RM);",
      "azzurra.signorelli@email.com;",
      "+39 3201234567",
    ]);
    expect(candidateCvResponseMock.sections.workPreferenceItems).toEqual([
      "Lavoro ibrido, full remote;",
      "Zona Roma citta;",
      "Aziende B-Corp, PMI con impatto sostenibile;",
      "Full time (9-18);",
      "Contratto a tempo indeterminato, contratto di stage retribuito con possibilita di estensione a tempo indeterminato.",
    ]);
    expect(candidateCvResponseMock.sidebar.activityItems).toContain(
      "calendario colloqui",
    );
  });
});
