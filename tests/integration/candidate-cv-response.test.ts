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
    expect(candidateCvResponseMock.sections.workPreferenceItems[0]).toBe(
      "Lavoro ibrido, full remote;",
    );
    expect(candidateCvResponseMock.sidebar.activityItems).toContain(
      "calendario colloqui",
    );
  });
});
