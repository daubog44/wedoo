import type {
  CandidateDashboardListing,
  CandidateDashboardResponse,
} from "./types";
import { candidateProfileSummariesMock } from "./candidate-profile-summary";
import { jobListingsMock } from "./jobs";

const candidateDashboardTagMap = {
  "addetto-comunicazione": ["stage", "ibrido", "full time"],
  "copywriter-junior": ["tempo det.", "presenza", "full time"],
  "seo-specialist": ["apprendistato", "ibrido", "full time"],
  "data-analyst": ["stage", "ibrido", "full time"],
  "social-media-manager": ["part time", "ibrido", "social"],
} as const satisfies Record<string, readonly string[]>;

function mapJobListingToCandidateDashboardListing(
  listing: (typeof jobListingsMock)[number],
): CandidateDashboardListing {
  return {
    companyLogo: listing.company.logo,
    companyName: listing.company.name,
    ctaLabel: "visualizza",
    id: listing.id,
    locationLabel: listing.role.location,
    sdgIds: [...listing.role.sdgIds],
    tagLabels: [...(candidateDashboardTagMap[listing.id] ?? listing.role.previewTags.slice(0, 3))],
    title: listing.role.title,
  };
}

const candidateHeadline = candidateProfileSummariesMock[0];

export const candidateDashboardResponseMock = {
  listings: jobListingsMock.slice(0, 4).map(mapJobListingToCandidateDashboardListing),
  profile: {
    avatar: candidateHeadline.headline.avatar,
    fullName: candidateHeadline.headline.fullName,
    id: candidateHeadline.id,
  },
  searchPlaceholder: "cerca opportunita",
} as const satisfies CandidateDashboardResponse;

export function getCandidateDashboardListingById(listingId: string) {
  return (
    candidateDashboardResponseMock.listings.find((listing) => listing.id === listingId) ??
    candidateDashboardResponseMock.listings[0]
  );
}
