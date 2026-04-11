import { describe, expect, it } from "vitest";
import {
  candidateDashboardResponseMock,
  getCandidateDashboardListingById,
} from "../../src/data/candidate-dashboard";

describe("CandidateDashboardResponse", () => {
  it("captures the candidate portal shell with profile, search affordance and four job cards", () => {
    expect(candidateDashboardResponseMock.profile).toMatchObject({
      fullName: "Azzurra Signorelli",
      id: "azzurra-signorelli",
    });
    expect(candidateDashboardResponseMock.searchPlaceholder).toBe("cerca opportunita");
    expect(candidateDashboardResponseMock.listings).toHaveLength(4);
  });

  it("normalizes dashboard tags for the hero cards shown in the candidate board", () => {
    expect(getCandidateDashboardListingById("copywriter-junior")).toMatchObject({
      locationLabel: "00100 - Roma (RM)",
      tagLabels: ["tempo det.", "presenza", "full time"],
      title: "Copywriter junior",
    });
  });
});
