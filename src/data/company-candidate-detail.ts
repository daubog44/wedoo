import { candidateProfileSummariesMock } from "./candidate-profile-summary";
import type { CompanyCandidateDetailResponse } from "./types";

type CompanyCandidateDetailPresentation = {
  availabilityLabel: string;
  certificationsItems: readonly string[];
  descriptionBody: string;
  experienceItems: readonly string[];
  footnote: string;
};

const companyCandidateDetailPresentation = {
  "azzurra-signorelli": {
    availabilityLabel: "Disponibile per trasferte",
    certificationsItems: ["Digital Marketing e Comunicazione"],
    descriptionBody:
      "Comunicatrice neolaureata appassionata di sostenibilita. Cerco un'azienda in cui fare la differenza, non solo comunicarla. Valori, trasparenza e impatto sono le mie bussole.",
    experienceItems: [
      "Stage curricolare di 3 mesi in agenzia di comunicazione locale (supporto gestione social, creazione contenuti per PMI)",
      "Volontariato in associazioni sociali e ambientali",
    ],
    footnote:
      "*Questo annuncio si riferisce agli obiettivi n. 5, 10, 12, 13 dell'Agenda 2030",
  },
  "riccardo-stagni": {
    availabilityLabel: "Disponibile a trasferte brevi e stage curricolari",
    certificationsItems: ["Workshop KPI ESG e reporting di sostenibilita"],
    descriptionBody:
      "Studente orientato ai dati, con forte attenzione a precisione, processi e progetti ad impatto misurabile. Cerco un contesto in cui imparare con metodo e portare ordine nei flussi di lavoro.",
    experienceItems: [
      "Supporto a un laboratorio universitario su KPI ESG e lettura di report aziendali",
      "Tesoriere e project support in associazione studentesca con coordinamento eventi",
    ],
    footnote:
      "*Questo profilo si riferisce agli obiettivi n. 8, 12, 13 dell'Agenda 2030",
  },
  "sofia-martinelli": {
    availabilityLabel: "Disponibile a lavoro ibrido e progetti editoriali",
    certificationsItems: ["Corso intensivo in accessible content design"],
    descriptionBody:
      "Junior content designer con interesse per inclusione, linguaggio chiaro e accessibilita delle interfacce. Porto rigore editoriale, ascolto e cura del dettaglio nei flussi digitali.",
    experienceItems: [
      "Portfolio di micro-copy e UX writing per servizi digitali a vocazione sociale",
      "Workshop facilitati su linguaggio chiaro e accessibilita per team di prodotto junior",
    ],
    footnote:
      "*Questo profilo si riferisce agli obiettivi n. 5, 10 dell'Agenda 2030",
  },
  "marco-galli": {
    availabilityLabel: "Disponibile a trasferte e ruoli junior operations",
    certificationsItems: ["Corso intensivo su supply chain sostenibile"],
    descriptionBody:
      "Profilo junior tra project support e operations, con interesse per processi, organizzazione e sostenibilita operativa. Mi muovo bene tra task strutturati, allineamento team e miglioramento continuo.",
    experienceItems: [
      "Tirocinio curriculare in operations con supporto a KPI e avanzamento attivita",
      "Affiancamento a progetti di mappatura processi e coordinamento fornitori",
    ],
    footnote:
      "*Questo profilo si riferisce agli obiettivi n. 9, 12, 13 dell'Agenda 2030",
  },
} as const satisfies Record<string, CompanyCandidateDetailPresentation>;

function buildFallbackPresentation(
  candidateId: string,
): CompanyCandidateDetailPresentation {
  const profile =
    candidateProfileSummariesMock.find((entry) => entry.id === candidateId) ??
    candidateProfileSummariesMock[0];

  return {
    availabilityLabel: "Disponibile a valutare nuove opportunita",
    certificationsItems: ["Certificazioni in aggiornamento"],
    descriptionBody: profile.headline.bio,
    experienceItems: [
      "Esperienze, progetti e collaborazioni saranno condivisi nel profilo completo.",
    ],
    footnote:
      "*Questo profilo resta allineato agli obiettivi di sostenibilita selezionati nel percorso Wedoo.",
  };
}

export function getCompanyCandidateDetailResponse(
  candidateId?: string,
): CompanyCandidateDetailResponse {
  const profile =
    candidateProfileSummariesMock.find((entry) => entry.id === candidateId) ??
    candidateProfileSummariesMock[0];
  const presentation =
    companyCandidateDetailPresentation[profile.id] ??
    buildFallbackPresentation(profile.id);

  return {
    availabilityLabel: presentation.availabilityLabel,
    candidate: {
      avatar: profile.headline.avatar,
      fullName: profile.headline.fullName,
      id: profile.id,
      statusLabel: profile.headline.status,
    },
    closePath: "/portale/azienda",
    contactItems: [
      `${profile.contact.city};`,
      `${profile.contact.email};`,
      profile.contact.phone,
    ],
    ctas: {
      cancelLabel: "cancella",
      certificationLabel: "visualizza certificazione",
      closeLabel: "Chiudi dettaglio candidato",
      primaryLabel: "richiedi colloquio",
      resumeLabel: "visualizza CV",
      saveDraftLabel: "salva in bozza",
    },
    editorToolbarLabel: "formattazione",
    footnote: presentation.footnote,
    id: profile.id,
    mobileDockLabel: "Navigazione rapida azienda",
    sections: {
      certificationsItems: presentation.certificationsItems,
      certificationsTitle: "Licenze e certificazioni",
      descriptionBody: presentation.descriptionBody,
      descriptionTitle: "Descrizione personale",
      educationItems: [...profile.education],
      educationTitle: "Formazione",
      experienceItems: presentation.experienceItems,
      experienceTitle: "Esperienze lavorative",
      hardSkillItems: [...profile.skills.hardSkills],
      hardSkillsTitle: "Competenze - Hard skills",
      softSkillItems: [...profile.skills.softSkills],
      softSkillsTitle: "Competenze - Soft skills",
    },
  };
}

export const companyCandidateDetailResponseMock =
  getCompanyCandidateDetailResponse("azzurra-signorelli");
