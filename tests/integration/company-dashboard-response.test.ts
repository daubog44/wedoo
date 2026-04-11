import { describe, expect, it } from "vitest";
import {
  companyDashboardResponseMock,
  getCompanyDashboardCandidateById,
} from "../../src/data/company-dashboard";

describe("CompanyDashboardResponse", () => {
  it("captures the company portal shell with profile, search affordance and four candidate cards", () => {
    expect(companyDashboardResponseMock.profile).toMatchObject({
      companyName: "Agenzia Creativa S.r.l.",
      id: "agenzia-creativa-srl",
    });
    expect(companyDashboardResponseMock.searchPlaceholder).toBe("cerca opportunità");
    expect(companyDashboardResponseMock.candidates).toHaveLength(4);
  });

  it("normalizes candidate tags for the company board cards shown in the dashboard", () => {
    expect(getCompanyDashboardCandidateById("riccardo-stagni")).toMatchObject({
      locationLabel: "20124 - Milano (MI)",
      statusLabel: "Studente",
      tagLabels: ["erasmus+", "teamwork", "precisione"],
    });
  });
});
