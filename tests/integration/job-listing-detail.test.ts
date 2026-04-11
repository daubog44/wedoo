import { describe, expect, it } from "vitest";
import {
  getJobDetailById,
  getJobEntryById,
  jobDetailsMock,
  jobListingsMock,
  jobs,
  mapJobListingDetailToEntry,
} from "../../src/data/jobs";

describe("JobListing and JobDetail", () => {
  it("models the candidate job board and detail route with separate server-like payloads", () => {
    expect(jobListingsMock).toHaveLength(5);
    expect(jobListingsMock[0]).toMatchObject({
      company: {
        name: "Agenzia Creativa S.r.l.",
        sectorLabel: "servizi di consulenza",
      },
      employment: {
        contractLabel: "Stage di 6 mesi con possibilita di rinnovo",
        salaryLabel: "700-900 euro al mese",
      },
      id: "addetto-comunicazione",
      role: {
        location: "20124 - Milano (MI)",
        title: "Addetto comunicazione",
      },
    });
    expect(jobDetailsMock[1]).toMatchObject({
      contact: {
        email: "talent@stabilimentiroma.it",
        name: "Marta Giannini",
      },
      id: "copywriter-junior",
      qualifications: {
        requirementsLabel:
          "Richiesta una base di scrittura e portfolio anche accademico",
      },
    });
  });

  it("maps listing and detail payloads to the legacy JobEntry shape used by the current UI", () => {
    const jobEntry = mapJobListingDetailToEntry(
      jobListingsMock[2],
      getJobDetailById("seo-specialist"),
    );

    expect(jobEntry).toMatchObject({
      company: "Northway Consulting",
      contract: "Apprendistato",
      id: "seo-specialist",
      location: "Milano",
      title: "SEO specialist",
    });
    expect(jobEntry.hardSkills).toEqual([
      "SEO fundamentals",
      "GA4",
      "Search Console",
      "CMS",
    ]);
  });

  it("keeps exported helpers and the legacy jobs array aligned with the source payloads", () => {
    expect(getJobEntryById("social-media-manager")).toEqual(
      mapJobListingDetailToEntry(
        jobListingsMock[4],
        getJobDetailById("social-media-manager"),
      ),
    );
    expect(getJobEntryById("missing-job")).toEqual(jobs[0]);
    expect(jobs).toEqual(
      jobListingsMock.map((listing) =>
        mapJobListingDetailToEntry(listing, getJobDetailById(listing.id)),
      ),
    );
  });
});
