import { candidateProfileSummariesMock } from "./candidate-profile-summary";
import type { CandidateCvResponse } from "./types";

const primaryCandidate = candidateProfileSummariesMock[0];

export const candidateCvResponseMock = {
  backPath: "/portale/candidato",
  candidate: {
    avatar: primaryCandidate.headline.avatar,
    fullName: primaryCandidate.headline.fullName,
    goalLabel: "candidati al tuo primo lavoro",
  },
  mobileDockLabel: "Navigazione rapida candidato",
  photoHint:
    "l'opzione di aggiungere la foto profilo e nel riquadro apposta, se non e caricata, altrimenti basta schiacciarci sopra e si puo cambiare",
  sections: {
    agendaItems: [
      "5 - Parita di genere",
      "10 - Ridurre le disuguaglianze",
      "12 - Consumo e produzione responsabili",
      "13 - Lotta contro il cambiamento climatico",
    ],
    agendaTitle: "obiettivi Agenda 2030",
    personalDataItems: [
      `${primaryCandidate.contact.city};`,
      `${primaryCandidate.contact.email};`,
      primaryCandidate.contact.phone,
    ],
    personalDataTitle: "dati personali",
    workPreferenceItems: [
      "Lavoro ibrido, full remote;",
      "Zona Roma citta;",
      "Aziende B-Corp, PMI con impatto sostenibile;",
      "Full time (9-18);",
      "Contratto a tempo indeterminato, contratto di stage retribuito con possibilita di estensione a tempo indeterminato.",
    ],
    workPreferenceTitle: "preferenze di lavoro",
  },
  sidebar: {
    activityItems: [
      "candidature effettuate",
      "annunci salvati",
      "annunci eliminati",
      "calendario colloqui",
    ],
    activityLabel: "attivita",
    backHelperLabel: "riporta alla schermata home",
    editLabel: "modifica",
    editSecondaryLabel: "modifica annuncio",
    editTitleLabel: "dati personali",
    uploadCvLabel: "carica CV",
  },
} as const satisfies CandidateCvResponse;
