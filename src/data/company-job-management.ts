import { companyDashboardResponseMock } from "./company-dashboard";
import type { JobDraft } from "./job-draft";
import { jobListingsMock } from "./jobs";
import type {
  CompanyJobManagementResponse,
  CompanyJobManagementSectionId,
} from "./types";

export const companyJobManagementSectionOptions = [
  { id: "recruiter", label: "dettagli recruiter" },
  { id: "company-details", label: "dettagli azienda" },
  { id: "offer-details", label: "dettagli area geografica" },
  { id: "publishing", label: "tipologia di contratto" },
] as const satisfies CompanyJobManagementResponse["sectionOptions"];

export function isCompanyJobManagementSectionId(
  value: string | null,
): value is CompanyJobManagementSectionId {
  return (
    value === "published-jobs" ||
    companyJobManagementSectionOptions.some((option) => option.id === value)
  );
}

export function createCompanyJobManagementResponse(
  draft: JobDraft,
): CompanyJobManagementResponse {
  return {
    backPath: "/portale/azienda",
    company: {
      activityLabel: "attivita",
      candidateInterestLabel: "candidati di interesse",
      certificationLabels: [
        "certificazione 1",
        "certificazione 2",
        "certificazione 3",
      ],
      createNewLabel: "crea nuovo annuncio",
      editLabel: "modifica annuncio",
      legalName:
        draft.company.legalName ||
        companyDashboardResponseMock.profile.companyName,
      logo:
        draft.company.logoAsset ||
        companyDashboardResponseMock.profile.companyLogo,
      publishedJobsLabel: "annunci pubblicati",
      uploadCertificationsLabel: "carica certificazioni",
      viewApplicationsLabel: "visualizza candidature",
      viewJobsLabel: "visualizza annunci",
    },
    ctas: {
      nextLabel: "avanti",
      previewLabel: "visualizza anteprima",
      removeLabel: "cancella",
      saveDraftLabel: "salva in bozza",
      submitLabel: "invia",
    },
    draft,
    mobileDockLabel: "Navigazione rapida azienda",
    publishedJobCards: jobListingsMock.slice(0, 2).map((listing) => ({
      companyLogo: listing.company.logo,
      companyName: listing.company.name,
      id: listing.id,
      locationLabel: listing.role.location,
      previewPath: `/portale/azienda/annunci/${listing.id}`,
      sdgIds: [...listing.role.sdgIds],
      tagLabels: listing.role.previewTags.slice(0, 3),
      title: listing.role.title.toUpperCase(),
    })),
    publishedJobs: jobListingsMock.slice(0, 4).map((listing) => ({
      id: listing.id,
      label: listing.role.title,
      previewPath: `/portale/azienda/annunci/${listing.id}`,
    })),
    sectionOptions: companyJobManagementSectionOptions,
  };
}
