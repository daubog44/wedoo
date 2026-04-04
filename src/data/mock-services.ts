import type { AuthViewModel } from "./auth";
import {
  candidateRegistrationAuthViewModel,
  companyRegistrationAuthViewModel,
  loginAuthViewModel,
} from "./auth";
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
import { jobDraftMock } from "./job-draft";
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

export function getJobDraftMock(): Promise<JobDraft> {
  return Promise.resolve(cloneMock(jobDraftMock));
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
  getCandidateProfileDraftMock,
  getCandidateProfileSummariesMock,
  getCandidateProfileSummaryMock,
  getCompanyProfileSummaryMock,
  getJobDetailMock,
  getJobDetailsMock,
  getJobDraftMock,
  getJobListingMock,
  getJobListingsMock,
  getPodcastPreviewsMock,
  getPublicHomeMock,
} as const;
