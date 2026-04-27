import { describe, expect, it } from "vitest";
import {
  getArticlePreviewsMock,
  getAuthViewModelMock,
  getCandidateDashboardMock,
  getCandidateProfileDraftMock,
  getCandidateProfileSummaryMock,
  getCompanyDashboardMock,
  getCompanyProfileSummaryMock,
  getJobDetailMock,
  getJobDraftMock,
  getJobListingsMock,
  getPodcastPreviewsMock,
  getPublicHomeMock,
  mockDataService,
  resetJobDraftMock,
  saveJobDraftMock,
} from "../../src/data/mock-services";
import {
  articlePreviewsMock,
  podcastPreviewsMock,
} from "../../src/data/content-preview";
import { publicHomeResponseMock } from "../../src/data/mocks/public-home";

describe("mock data services", () => {
  it("returns cloned public home and auth payloads through async helpers", async () => {
    const [home, login] = await Promise.all([
      getPublicHomeMock(),
      getAuthViewModelMock("login"),
    ]);

    expect(home).toEqual(publicHomeResponseMock);
    expect(home).not.toBe(publicHomeResponseMock);
    expect(login).toMatchObject({
      id: "login",
      providerButtons: true,
      title: "Accedi a Wedoo",
    });
  });

  it("returns cloned candidate and company contracts for downstream consumers", async () => {
    const [
      candidateDashboard,
      candidateDraft,
      candidateSummary,
      companyDashboard,
      companySummary,
    ] =
      await Promise.all([
        getCandidateDashboardMock(),
        getCandidateProfileDraftMock(),
        getCandidateProfileSummaryMock("riccardo-stagni"),
        getCompanyDashboardMock(),
        getCompanyProfileSummaryMock(),
      ]);

    expect(candidateDashboard.profile.fullName).toBe("Azzurra Signorelli");
    expect(candidateDraft.contact.fullName).toBe("Azzurra Signorelli");
    expect(candidateSummary.id).toBe("riccardo-stagni");
    expect(companyDashboard.profile.companyName).toBe("Agenzia Creativa S.r.l.");
    expect(companySummary.onboarding.firstJobDraftSteps).toBe(5);
  });

  it("returns async knowledge preview and job payloads with safe copies", async () => {
    const [articles, podcasts, jobDraft, listings, jobDetail] = await Promise.all([
      getArticlePreviewsMock(),
      getPodcastPreviewsMock(),
      getJobDraftMock(),
      getJobListingsMock(),
      getJobDetailMock("copywriter-junior"),
    ]);

    expect(articles).toEqual(articlePreviewsMock);
    expect(articles).not.toBe(articlePreviewsMock);
    expect(podcasts).toEqual(podcastPreviewsMock);
    expect(podcasts).not.toBe(podcastPreviewsMock);
    expect(jobDraft.flow.totalSteps).toBe(5);
    expect(listings[0]?.id).toBe("addetto-comunicazione");
    expect(jobDetail.id).toBe("copywriter-junior");
  });

  it("persists and resets the company job draft through the mock service", async () => {
    const emptyDraft = await resetJobDraftMock();
    const savedDraft = await saveJobDraftMock({
      ...emptyDraft,
      geography: {
        ...emptyDraft.geography,
        capId: "00100",
        cityId: "roma",
        provinceId: "rm",
      },
      role: {
        ...emptyDraft.role,
        certificationLabel: "Informativa privacy per sito.pdf",
        contractTypeId: "stage",
        description: "Supporterai il team comunicazione tra social e contenuti ESG.",
        experienceLevelId: "stage",
        hoursId: "full-time",
        sdgIds: ["climate-action", "responsible-consumption"],
        sectorId: "communication",
        skillIds: ["canva"],
        workModeId: "smart",
      },
    });
    const resumedDraft = await getJobDraftMock();

    expect(savedDraft).toMatchObject({
      geography: {
        capId: "00100",
        cityId: "roma",
        provinceId: "rm",
      },
      role: {
        certificationLabel: "Informativa privacy per sito.pdf",
        contractTypeId: "stage",
        description: "Supporterai il team comunicazione tra social e contenuti ESG.",
        hoursId: "full-time",
        sdgIds: ["climate-action", "responsible-consumption"],
        workModeId: "smart",
      },
    });
    expect(resumedDraft).toEqual(savedDraft);
    expect(resumedDraft).not.toBe(savedDraft);

    const resetDraft = await resetJobDraftMock();

    expect(resetDraft.geography.provinceId).toBe("");
    expect(resetDraft.role.contractTypeId).toBe("");
    expect(resetDraft.role.sdgIds).toEqual([]);
  });

  it("exposes the same async helpers through the aggregated mockDataService", async () => {
    const [articleList, candidateDashboard, companyDashboard] = await Promise.all([
      mockDataService.getArticlePreviewsMock(),
      mockDataService.getCandidateDashboardMock(),
      mockDataService.getCompanyDashboardMock(),
    ]);

    expect(articleList[2]).toMatchObject({
      id: "matching-credibile",
      title: "Matching credibile: meno hype, piu contesto",
    });
    expect(candidateDashboard.listings).toHaveLength(4);
    expect(companyDashboard.candidates).toHaveLength(4);
  });
});
