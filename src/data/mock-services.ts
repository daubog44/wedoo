import type { AuthViewModel } from "./auth";
import {
  candidateRegistrationAuthViewModel,
  companyRegistrationAuthViewModel,
  loginAuthViewModel,
} from "./auth";
import type { CandidateDashboardResponse } from "./types";
import { candidateDashboardResponseMock } from "./candidate-dashboard";
import type { CompanyDashboardResponse } from "./types";
import { companyDashboardResponseMock } from "./company-dashboard";
import type { CandidateProfileDraft } from "./candidate-profile";
import { candidateProfileDraftMock } from "./candidate-profile";
import type { CandidateProfileSummary } from "./candidate-profile-summary";
import { candidateProfileSummariesMock } from "./candidate-profile-summary";
import type { CompanyProfileSummary } from "./company-profile";
import { companyProfileSummaryMock } from "./company-profile";
import { articlePreviewsMock, podcastPreviewsMock } from "./content-preview";
import type { PublicHomeResponse } from "./mocks/public-home";
import { publicHomeResponseMock } from "./mocks/public-home";
import type {
  ArticlePreview,
  JobDetail,
  JobListing,
  PodcastPreview,
} from "./types";
import type { JobDraft } from "./job-draft";
import { createEmptyJobDraft, jobDraftMock } from "./job-draft";
import {
  getJobDetailById,
  getJobListingById,
  jobDetailsMock,
  jobListingsMock,
} from "./jobs";

function cloneMock<T>(value: T): T {
  if (typeof structuredClone === "function") {
    return structuredClone(value);
  }

  return JSON.parse(JSON.stringify(value)) as T;
}

export const jobDraftStorageKey = "wedoo.company-job-draft";
let persistedJobDraftMock: JobDraft | null = null;

function getDefaultJobDraftMock(): JobDraft {
  return createEmptyJobDraft(jobDraftMock);
}

function readStoredJobDraftMock(): JobDraft {
  if (persistedJobDraftMock) {
    return persistedJobDraftMock;
  }

  if (typeof window === "undefined" || !("sessionStorage" in window)) {
    persistedJobDraftMock = getDefaultJobDraftMock();
    return persistedJobDraftMock;
  }

  const storedValue = window.sessionStorage.getItem(jobDraftStorageKey);

  if (!storedValue) {
    persistedJobDraftMock = getDefaultJobDraftMock();
    return persistedJobDraftMock;
  }

  try {
    persistedJobDraftMock = JSON.parse(storedValue) as JobDraft;
  } catch {
    persistedJobDraftMock = getDefaultJobDraftMock();
  }

  return persistedJobDraftMock;
}

function writeStoredJobDraftMock(nextDraft: JobDraft): JobDraft {
  const clonedDraft = cloneMock(nextDraft);
  persistedJobDraftMock = clonedDraft;

  if (typeof window !== "undefined" && "sessionStorage" in window) {
    window.sessionStorage.setItem(jobDraftStorageKey, JSON.stringify(clonedDraft));
  }

  return clonedDraft;
}

export function getPublicHomeMock(): Promise<PublicHomeResponse> {
  return Promise.resolve(cloneMock(publicHomeResponseMock));
}

export function getAuthViewModelMock(
  viewId: AuthViewModel["id"],
): Promise<AuthViewModel> {
  const viewModelMap = {
    login: loginAuthViewModel,
    "register-candidate": candidateRegistrationAuthViewModel,
    "register-company": companyRegistrationAuthViewModel,
  } as const satisfies Record<AuthViewModel["id"], AuthViewModel>;

  return Promise.resolve(cloneMock(viewModelMap[viewId]));
}

export function getCandidateProfileDraftMock(): Promise<CandidateProfileDraft> {
  return Promise.resolve(cloneMock(candidateProfileDraftMock));
}

export function getCandidateDashboardMock(): Promise<CandidateDashboardResponse> {
  return Promise.resolve(cloneMock(candidateDashboardResponseMock));
}

export function getCompanyDashboardMock(): Promise<CompanyDashboardResponse> {
  return Promise.resolve(cloneMock(companyDashboardResponseMock));
}

export function getCandidateProfileSummariesMock(): Promise<
  readonly CandidateProfileSummary[]
> {
  return Promise.resolve(cloneMock(candidateProfileSummariesMock));
}

export function getCandidateProfileSummaryMock(
  candidateId?: string,
): Promise<CandidateProfileSummary> {
  const match =
    candidateProfileSummariesMock.find((candidate) => candidate.id === candidateId) ??
    candidateProfileSummariesMock[0];

  return Promise.resolve(cloneMock(match));
}

export function getCompanyProfileSummaryMock(): Promise<CompanyProfileSummary> {
  return Promise.resolve(cloneMock(companyProfileSummaryMock));
}

export function getArticlePreviewsMock(): Promise<readonly ArticlePreview[]> {
  return Promise.resolve(cloneMock(articlePreviewsMock));
}

export function getPodcastPreviewsMock(): Promise<readonly PodcastPreview[]> {
  return Promise.resolve(cloneMock(podcastPreviewsMock));
}

export function getJobDraftMockSnapshot(): JobDraft {
  return cloneMock(readStoredJobDraftMock());
}

export function getJobDraftMock(): Promise<JobDraft> {
  return Promise.resolve(getJobDraftMockSnapshot());
}

export function saveJobDraftMock(nextDraft: JobDraft): Promise<JobDraft> {
  return Promise.resolve(cloneMock(writeStoredJobDraftMock(nextDraft)));
}

export function resetJobDraftMock(): Promise<JobDraft> {
  return Promise.resolve(cloneMock(writeStoredJobDraftMock(getDefaultJobDraftMock())));
}

export function getJobListingsMock(): Promise<readonly JobListing[]> {
  return Promise.resolve(cloneMock(jobListingsMock));
}

export function getJobListingMock(jobId?: string): Promise<JobListing> {
  return Promise.resolve(cloneMock(getJobListingById(jobId)));
}

export function getJobDetailsMock(): Promise<readonly JobDetail[]> {
  return Promise.resolve(cloneMock(jobDetailsMock));
}

export function getJobDetailMock(jobId?: string): Promise<JobDetail> {
  return Promise.resolve(cloneMock(getJobDetailById(jobId)));
}

export const mockDataService = {
  getArticlePreviewsMock,
  getAuthViewModelMock,
  getCandidateDashboardMock,
  getCompanyDashboardMock,
  getCandidateProfileDraftMock,
  getCandidateProfileSummariesMock,
  getCandidateProfileSummaryMock,
  getCompanyProfileSummaryMock,
  getJobDetailMock,
  getJobDetailsMock,
  getJobDraftMock,
  getJobDraftMockSnapshot,
  getJobListingMock,
  getJobListingsMock,
  getPodcastPreviewsMock,
  getPublicHomeMock,
  resetJobDraftMock,
  saveJobDraftMock,
} as const;
