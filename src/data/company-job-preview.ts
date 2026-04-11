import { getJobDraftMockSnapshot, jobDraftStorageKey } from "./mock-services";
import { getJobDetailById, getJobListingById } from "./jobs";
import type { JobDraft } from "./job-draft";
import type { CompanyJobPreviewResponse } from "./types";

const companyJobPreviewFootnotes = [
  "*Questo annuncio si riferisce agli obiettivi n. 1, 2, 3 dell'Agenda 2030.",
  "**L'annuncio e stato approvato dal controllo sostenibilita previsto alla pubblicazione.",
] as const;

function getDraftOptionLabel(
  options: readonly { id: string; label: string }[],
  value: string,
): string | undefined {
  return options.find((option) => option.id === value)?.label;
}

function formatLocationLabel(draft: JobDraft): string | undefined {
  const cityLabel = getDraftOptionLabel(draft.catalogs.cities, draft.geography.cityId);
  const provinceLabel = getDraftOptionLabel(
    draft.catalogs.provinces,
    draft.geography.provinceId,
  );
  const capLabel = draft.geography.capId || undefined;

  if (!cityLabel && !provinceLabel && !capLabel) {
    return undefined;
  }

  const provinceCode = draft.geography.provinceId.toUpperCase();
  const cityWithProvince =
    cityLabel && provinceCode ? `${cityLabel} (${provinceCode})` : cityLabel ?? provinceLabel;

  if (cityWithProvince && capLabel) {
    return `${cityWithProvince} - ${capLabel}`;
  }

  return cityWithProvince ?? capLabel;
}

function formatSalaryLabel(draft: JobDraft): string | undefined {
  if (!draft.compensation.publicSalary) {
    return undefined;
  }

  const minimum = draft.compensation.minimum.trim();
  const maximum = draft.compensation.maximum.trim();
  const unitLabel = getDraftOptionLabel(draft.catalogs.salaryUnits, draft.compensation.unitId);

  if (!minimum && !maximum && !unitLabel) {
    return undefined;
  }

  const range = minimum && maximum ? `${minimum}-${maximum}` : minimum || maximum;
  const unit =
    unitLabel === "mensile"
      ? "euro/mese"
      : unitLabel === "annuale"
        ? "euro/anno"
        : unitLabel === "oraria"
          ? "euro/ora"
          : unitLabel;

  return [range, unit].filter(Boolean).join(" ");
}

function buildSummaryItemsFromDraft(draft: JobDraft): readonly string[] {
  const items = [
    formatLocationLabel(draft),
    getDraftOptionLabel(draft.catalogs.workModes, draft.role.workModeId),
    getDraftOptionLabel(draft.catalogs.hoursOptions, draft.role.hoursId),
    formatSalaryLabel(draft),
    getDraftOptionLabel(draft.catalogs.contractTypes, draft.role.contractTypeId)
      ? `Contratto: ${getDraftOptionLabel(draft.catalogs.contractTypes, draft.role.contractTypeId)}`
      : undefined,
  ].filter((item): item is string => Boolean(item));

  return items;
}

function buildOfferItemsFromDraft(draft: JobDraft): readonly string[] {
  const contractLabel = getDraftOptionLabel(
    draft.catalogs.contractTypes,
    draft.role.contractTypeId,
  );
  const workModeLabel = getDraftOptionLabel(draft.catalogs.workModes, draft.role.workModeId);
  const hoursLabel = getDraftOptionLabel(draft.catalogs.hoursOptions, draft.role.hoursId);
  const salaryLabel = formatSalaryLabel(draft);
  const locationLabel = formatLocationLabel(draft);

  return [
    contractLabel ? `Contratto: ${contractLabel}` : undefined,
    workModeLabel ? `Modalita: ${workModeLabel}` : undefined,
    hoursLabel ? `Orari: ${hoursLabel}` : undefined,
    salaryLabel ? `Retribuzione: ${salaryLabel}` : undefined,
    locationLabel ? `Localita: ${locationLabel}` : undefined,
  ].filter((item): item is string => Boolean(item));
}

function readStoredDraft(): JobDraft | null {
  if (typeof window === "undefined" || !("sessionStorage" in window)) {
    return null;
  }

  if (!window.sessionStorage.getItem(jobDraftStorageKey)) {
    return null;
  }

  return getJobDraftMockSnapshot();
}

export function getCompanyJobPreviewResponse(
  jobId?: string,
): CompanyJobPreviewResponse {
  const listing = getJobListingById(jobId);
  const detail = getJobDetailById(listing.id);
  const storedDraft = readStoredDraft();

  const title =
    (storedDraft &&
      getDraftOptionLabel(storedDraft.catalogs.jobTitles, storedDraft.role.titleId)) ||
    listing.role.title;
  const sectorLabel =
    (storedDraft &&
      getDraftOptionLabel(storedDraft.catalogs.sectors, storedDraft.role.sectorId)) ||
    listing.company.sectorLabel;
  const companyName = storedDraft?.company.legalName || listing.company.name;
  const companyLogo = storedDraft?.company.logoAsset || listing.company.logo;
  const storedSummaryItems = storedDraft ? buildSummaryItemsFromDraft(storedDraft) : [];
  const storedOfferItems = storedDraft ? buildOfferItemsFromDraft(storedDraft) : [];
  const summaryItems =
    storedSummaryItems.length >= 3 ? storedSummaryItems : detail.summaryBullets;
  const offerItems =
    storedOfferItems.length >= 3
      ? storedOfferItems
      :
    [
      `Contratto: ${listing.employment.contractLabel}`,
      `Retribuzione: ${listing.employment.salaryLabel}`,
      `Orari: ${listing.employment.scheduleLabel}`,
      `Localita: ${listing.role.location}`,
    ];
  const hardItems =
    storedDraft?.role.skillIds.length
      ? storedDraft.role.skillIds
          .map((skillId) => getDraftOptionLabel(storedDraft.catalogs.skillTags, skillId))
          .filter((item): item is string => Boolean(item))
      : detail.qualifications.hardSkills;
  const contactLine = storedDraft
    ? `Per maggiori informazioni contattare: (${storedDraft.recruiter.firstName} ${storedDraft.recruiter.lastName}, ${storedDraft.recruiter.email}, ${storedDraft.recruiter.phone})`
    : `Per maggiori informazioni contattare: (${detail.contact.name}, ${detail.contact.email}, ${detail.contact.phone})`;

  return {
    closePath: "/portale/azienda/annunci",
    company: {
      logo: companyLogo,
      name: companyName,
      sectorLabel,
    },
    contactLine,
    ctas: {
      cancelLabel: "cancella",
      certificationsLabel: "visualizza certificazioni",
      contactLabel: "contatta",
      primaryLabel: "invia",
      saveDraftLabel: "salva in bozza",
    },
    editorToolbarLabel: "formattazione",
    footnotes: companyJobPreviewFootnotes,
    id: listing.id,
    mobileDockLabel: "Navigazione rapida azienda",
    requirementsLabel: detail.qualifications.requirementsLabel,
    sections: {
      companyBody: "",
      companyTitle: "Dettagli azienda",
      descriptionBody: storedDraft?.role.description || detail.description,
      descriptionTitle: "Job description:",
      offerItems,
      offerTitle: "Dettagli offerta",
      summaryItems,
      summaryTitle: "Riassunto offerta",
    },
    skills: {
      hardItems,
      hardTitle: "Competenze richieste - Hard skills",
      softItems: detail.qualifications.softSkills,
      softTitle: "Competenze richieste - Soft skills",
    },
    title,
  };
}

export const companyJobPreviewResponseMock =
  getCompanyJobPreviewResponse("addetto-comunicazione");
