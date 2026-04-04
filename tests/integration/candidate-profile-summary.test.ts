import { describe, expect, it } from "vitest";
import {
  candidateProfileSummariesMock,
  mapCandidateProfileSummaryToEntry,
} from "../../src/data/candidate-profile-summary";
import { candidates } from "../../src/data/candidates";

describe("CandidateProfileSummary", () => {
  it("captures the candidate card and profile detail payload in one server-like summary", () => {
    expect(candidateProfileSummariesMock).toHaveLength(4);
    expect(candidateProfileSummariesMock[0]).toMatchObject({
      contact: {
        city: "00012 - Guidonia Montecelio (RM)",
        email: "azzurra.signorelli@email.com",
      },
      headline: {
        fullName: "Azzurra Signorelli",
        status: "Neolaureata",
      },
      id: "azzurra-signorelli",
    });
    expect(candidateProfileSummariesMock[1]?.skills.sdgIds).toEqual([
      "responsible",
      "climate",
      "inclusion",
    ]);
  });

  it("maps the summary to the candidate entry shape consumed by the existing UI", () => {
    const candidateEntry = mapCandidateProfileSummaryToEntry(
      candidateProfileSummariesMock[2],
    );

    expect(candidateEntry).toMatchObject({
      city: "00100 - Roma (RM)",
      id: "sofia-martinelli",
      name: "Sofia Martinelli",
      skills: ["content design", "accessibilita", "copy"],
      status: "Neolaureata",
    });
    expect(candidateEntry.hardSkills).toEqual([
      "UX writing",
      "Research synthesis",
      "Figma",
    ]);
  });

  it("keeps the exported candidates array aligned with the summary mapper", () => {
    expect(candidates).toEqual(
      candidateProfileSummariesMock.map(mapCandidateProfileSummaryToEntry),
    );
  });
});
