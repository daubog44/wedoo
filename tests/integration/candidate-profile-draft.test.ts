import { describe, expect, it } from "vitest";
import {
  candidateProfileDraftMock,
  createCandidateRegistrationWizardSteps,
  formatCandidateContactLocation,
} from "../../src/data/candidate-profile";
import { candidateWizardSteps } from "../../src/data/wizards";

describe("CandidateProfileDraft", () => {
  it("captures contacts, education, experiences and skills in one server-like draft", () => {
    expect(candidateProfileDraftMock.contact.fullName).toBe("Azzurra Signorelli");
    expect(candidateProfileDraftMock.contact.postalCode).toBe("00012");
    expect(candidateProfileDraftMock.contact.provinceCode).toBe("RM");
    expect(candidateProfileDraftMock.education).toHaveLength(2);
    expect(candidateProfileDraftMock.education[0]).toMatchObject({
      activities: ["erasmus+", "project work", "corsi specifici"],
      course: "comunicazione pubblica d'impresa",
      degreeType: "laurea magistrale",
      institution: "università della Sapienza - Roma",
      specificCourses: ["Employer branding ESG"],
      startYear: "2016",
    });
    expect(candidateProfileDraftMock.experiences[0]).toMatchObject({
      city: "Roma",
      company: "agenzia creativa srl",
      country: "Italia",
      description: "supporto gestione social, creazione contenuti per PMI",
      endYear: "2020",
      startYear: "2020",
    });
    expect(candidateProfileDraftMock.skills.hardSkills).toContain("Meta Business Suite");
    expect(candidateProfileDraftMock.skills.softSkills).toContain("Creativit\u00E0");
  });

  it("derives the candidate registration wizard steps from the draft", () => {
    const steps = createCandidateRegistrationWizardSteps(candidateProfileDraftMock);

    expect(steps).toHaveLength(2);
    expect(steps[0]?.fields[0]).toMatchObject({
      key: "fullName",
      placeholder: "Azzurra Signorelli",
      type: "text",
    });
    expect(steps[1]?.fields[0]).toMatchObject({
      key: "sdgFocus",
      options: ["Parita di genere", "Consumo responsabile", "Clima"],
      type: "chips",
    });
  });

  it("formats the saved contact location for the contact step summary", () => {
    expect(formatCandidateContactLocation(candidateProfileDraftMock.contact)).toBe(
      "00012 - Guidonia Montecelio (RM)",
    );
  });

  it("keeps exported candidate wizard steps aligned with the draft-backed factory", () => {
    expect(candidateWizardSteps).toEqual(
      createCandidateRegistrationWizardSteps(candidateProfileDraftMock),
    );
  });
});
