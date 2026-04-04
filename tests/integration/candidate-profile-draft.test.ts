import { describe, expect, it } from "vitest";
import {
  candidateProfileDraftMock,
  createCandidateRegistrationWizardSteps,
} from "../../src/data/candidate-profile";
import { candidateWizardSteps } from "../../src/data/wizards";

describe("CandidateProfileDraft", () => {
  it("captures contacts, education, experiences and skills in one server-like draft", () => {
    expect(candidateProfileDraftMock.contact.fullName).toBe("Giulia Rossi");
    expect(candidateProfileDraftMock.education).toHaveLength(2);
    expect(candidateProfileDraftMock.experiences[0]?.company).toBe("Impact Hub Milano");
    expect(candidateProfileDraftMock.skills.hardSkills).toContain("Copywriting");
  });

  it("derives the candidate registration wizard steps from the draft", () => {
    const steps = createCandidateRegistrationWizardSteps(candidateProfileDraftMock);

    expect(steps).toHaveLength(2);
    expect(steps[0]?.fields[0]).toMatchObject({
      key: "fullName",
      placeholder: "Giulia Rossi",
      type: "text",
    });
    expect(steps[1]?.fields[0]).toMatchObject({
      key: "sdgFocus",
      options: ["Parita di genere", "Consumo responsabile", "Clima"],
      type: "chips",
    });
  });

  it("keeps exported candidate wizard steps aligned with the draft-backed factory", () => {
    expect(candidateWizardSteps).toEqual(
      createCandidateRegistrationWizardSteps(candidateProfileDraftMock),
    );
  });
});
