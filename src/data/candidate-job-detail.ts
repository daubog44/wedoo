import type { CandidateJobDetailResponse } from "./types";
import { getJobDetailById, getJobListingById } from "./jobs";

const candidateJobDetailPresentation: Record<
  string,
  {
    companyBody: string;
    footnotes: readonly string[];
    offerItems: readonly string[];
  }
> = {
  "addetto-comunicazione": {
    companyBody: "",
    footnotes: [
      "*Questo annuncio si riferisce agli obiettivi n. 1, 2, 3 dell'Agenda 2030.",
      "**L'annuncio e stato approvato dal controllo sostenibilita previsto alla pubblicazione.",
    ],
    offerItems: [
      "Contratto: Stage (minimo 6 mesi)",
      "Modalita: Ibrido (3 giorni in sede, 2 in smart working)",
      "Orari: Lunedi-Venerdi, 9:00-18:00",
      "Retribuzione: 700-900 euro/mese",
      "Localita: Milano (MI) - 20124",
    ],
  },
};

function buildFallbackOfferItems(jobId?: string) {
  const listing = getJobListingById(jobId);

  return [
    `Contratto: ${listing.employment.contractLabel}`,
    `Retribuzione: ${listing.employment.salaryLabel}`,
    `Orari: ${listing.employment.scheduleLabel}`,
    `Localita: ${listing.role.location}`,
  ];
}

function buildFallbackFootnotes() {
  return [
    "*Questo annuncio resta tracciato nel prototipo come opportunita coerente con gli SDG selezionati.",
    "**La validazione di sostenibilita verra confermata nel flusso editoriale completo.",
  ] as const;
}

export function getCandidateJobDetailResponse(
  jobId?: string,
): CandidateJobDetailResponse {
  const listing = getJobListingById(jobId);
  const detail = getJobDetailById(listing.id);
  const presentation = candidateJobDetailPresentation[listing.id];

  return {
    closePath: "/portale/candidato",
    company: {
      logo: listing.company.logo,
      name: listing.company.name,
      sectorLabel: listing.company.sectorLabel,
    },
    contactLine: `Per maggiori informazioni contattare: (${detail.contact.name}, ${detail.contact.email}, ${detail.contact.phone})`,
    ctas: {
      cancelLabel: "cancella",
      certificationsLabel: "visualizza certificazioni",
      contactLabel: "contatta",
      primaryLabel: "invia candidatura",
      saveDraftLabel: "salva in bozza",
    },
    editorToolbarLabel: "formattazione",
    footnotes: presentation?.footnotes ?? buildFallbackFootnotes(),
    id: listing.id,
    requirementsLabel: detail.qualifications.requirementsLabel,
    sections: {
      companyBody: presentation?.companyBody ?? "",
      companyTitle: "Dettagli azienda",
      descriptionBody: detail.description,
      descriptionTitle: "Job description:",
      offerItems: presentation?.offerItems ?? buildFallbackOfferItems(listing.id),
      offerTitle: "Dettagli offerta",
      summaryItems: [...detail.summaryBullets],
      summaryTitle: "Riassunto offerta",
    },
    skills: {
      hardItems: [...detail.qualifications.hardSkills],
      hardTitle: "Competenze richieste - Hard skills",
      softItems: [...detail.qualifications.softSkills],
      softTitle: "Competenze richieste - Soft skills",
    },
    title: listing.role.title,
  };
}

export const candidateJobDetailResponseMock =
  getCandidateJobDetailResponse("addetto-comunicazione");
