import { describe, expect, it } from "vitest";
import {
  candidateProfileDraftMock,
  formatCandidateWorkPreferenceItemsForCv,
  formatCandidateContactLocation,
} from "../../src/data/candidate-profile";

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
    expect(candidateProfileDraftMock.workPreferences).toEqual({
      companyTypes: ["B-Corp", "PMI"],
      contractTypes: ["tempo indeterminato", "stage retribuito"],
      locations: ["Roma"],
      schedules: ["full time (9-18)"],
      workModes: ["ibrido", "full remote"],
    });
  });

  it("formats the saved contact location for the contact step summary", () => {
    expect(formatCandidateContactLocation(candidateProfileDraftMock.contact)).toBe(
      "00012 - Guidonia Montecelio (RM)",
    );
  });

  it("formats the structured work preferences for the candidate cv summary", () => {
    expect(
      formatCandidateWorkPreferenceItemsForCv(
        candidateProfileDraftMock.workPreferences,
      ),
    ).toEqual([
      "Lavoro ibrido, full remote;",
      "Zona Roma citta;",
      "Aziende B-Corp, PMI con impatto sostenibile;",
      "Full time (9-18);",
      "Contratto a tempo indeterminato, contratto di stage retribuito con possibilita di estensione a tempo indeterminato.",
    ]);
  });
});
