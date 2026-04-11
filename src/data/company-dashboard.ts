import type {
  CompanyDashboardCandidate,
  CompanyDashboardResponse,
} from "./types";
import { candidateProfileSummariesMock } from "./candidate-profile-summary";
import { jobListingsMock } from "./jobs";

const companyDashboardTagMap = {
  "azzurra-signorelli": ["comunicazione", "erasmus+"],
  "riccardo-stagni": ["erasmus+", "teamwork", "precisione"],
  "sofia-martinelli": ["content design", "accessibilita", "copy"],
  "marco-galli": ["operations", "precisione", "processi"],
} as const satisfies Record<string, readonly string[]>;

function mapCandidateProfileToCompanyDashboardCandidate(
  profile: (typeof candidateProfileSummariesMock)[number],
): CompanyDashboardCandidate {
  return {
    avatar: profile.headline.avatar,
    ctaLabel: "scopri di più",
    id: profile.id,
    locationLabel: profile.contact.city,
    name: profile.headline.fullName,
    sdgIds: [...profile.skills.sdgIds],
    statusLabel: profile.headline.status,
    tagLabels: [...(companyDashboardTagMap[profile.id] ?? profile.skills.keywords.slice(0, 3))],
  };
}

const featuredCompany = jobListingsMock[0].company;

export const companyDashboardResponseMock = {
  candidates: candidateProfileSummariesMock
    .slice(0, 4)
    .map(mapCandidateProfileToCompanyDashboardCandidate),
  profile: {
    companyLogo: featuredCompany.logo,
    companyName: featuredCompany.name,
    id: "agenzia-creativa-srl",
  },
  searchPlaceholder: "cerca opportunità",
} as const satisfies CompanyDashboardResponse;

export function getCompanyDashboardCandidateById(candidateId: string) {
  return (
    companyDashboardResponseMock.candidates.find((candidate) => candidate.id === candidateId) ??
    companyDashboardResponseMock.candidates[0]
  );
}
