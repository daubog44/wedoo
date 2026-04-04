import type { CandidateEntry } from "./types";

export type CandidateProfileHeadline = {
  avatar: string;
  bio: string;
  fullName: string;
  status: string;
  summary: string;
};

export type CandidateProfileContact = {
  city: string;
  email: string;
  phone: string;
};

export type CandidateProfileSkills = {
  hardSkills: readonly string[];
  keywords: readonly string[];
  sdgIds: readonly string[];
  softSkills: readonly string[];
};

export type CandidateProfileSummary = {
  contact: CandidateProfileContact;
  education: readonly string[];
  headline: CandidateProfileHeadline;
  id: string;
  skills: CandidateProfileSkills;
};

export const candidateProfileSummariesMock = [
  {
    contact: {
      city: "00012 - Guidonia Montecelio (RM)",
      email: "azzurra.signorelli@email.com",
      phone: "+39 3201234567",
    },
    education: [
      "Laurea magistrale in Comunicazione",
      "Erasmus+ e project work su comunicazione e sostenibilita",
      "Corso su employer branding ESG",
      "Certificazione in digital marketing e social media",
    ],
    headline: {
      avatar: "Azzurra Signorelli.jpg",
      bio: "Comunicatrice neolaureata appassionata di sostenibilita. Cerca un azienda in cui fare la differenza, non solo comunicarla.",
      fullName: "Azzurra Signorelli",
      status: "Neolaureata",
      summary:
        "Sono una ragazza intraprendente e molto interessata a tutto cio che riguarda la sostenibilita. Cerco un occupazione che sostenga questi obiettivi in modo concreto.",
    },
    id: "azzurra-signorelli",
    skills: {
      hardSkills: ["Social media", "Canva", "Meta Business Suite"],
      keywords: ["comunicazione", "erasmus+", "branding"],
      sdgIds: ["equality", "responsible", "climate"],
      softSkills: [
        "Creativita",
        "Adattabilita",
        "Precisione",
        "Teamwork",
        "Proattivita",
      ],
    },
  },
  {
    contact: {
      city: "20124 - Milano (MI)",
      email: "riccardo.stagni@email.com",
      phone: "+39 3457739011",
    },
    education: [
      "Laurea triennale in Economia e management",
      "Laboratorio universitario su KPI ESG",
      "Esperienza in associazione studentesca",
    ],
    headline: {
      avatar: "Edoardo Filippi.jpg",
      bio: "Studente orientato ai dati, con forte attenzione a precisione, processi e progetti ad impatto misurabile.",
      fullName: "Riccardo Stagni",
      status: "Studente",
      summary:
        "Cerco un primo ruolo in cui imparare a leggere dati e processi senza perdere il contatto con le persone e con il senso del lavoro.",
    },
    id: "riccardo-stagni",
    skills: {
      hardSkills: ["Sheets", "Presentazioni", "Ricerca desk"],
      keywords: ["teamwork", "precisione", "analisi"],
      sdgIds: ["responsible", "climate", "inclusion"],
      softSkills: ["Precisione", "Costanza", "Ascolto", "Organizzazione"],
    },
  },
  {
    contact: {
      city: "00100 - Roma (RM)",
      email: "sofia.martinelli@email.com",
      phone: "+39 3519035540",
    },
    education: [
      "Master in UX writing",
      "Corso su accessible design",
      "Portfolio di micro-copy",
    ],
    headline: {
      avatar: "Azzurra Signorelli.jpg",
      bio: "Junior content designer con interesse per inclusione, linguaggio chiaro e accessibilita delle interfacce.",
      fullName: "Sofia Martinelli",
      status: "Neolaureata",
      summary:
        "Voglio lavorare su prodotti digitali utili, leggibili e trasparenti. Il mio focus e il linguaggio che rende comprensibile la complessita.",
    },
    id: "sofia-martinelli",
    skills: {
      hardSkills: ["UX writing", "Research synthesis", "Figma"],
      keywords: ["content design", "accessibilita", "copy"],
      sdgIds: ["equality", "inclusion"],
      softSkills: ["Empatia", "Curiosita", "Chiarezza", "Collaborazione"],
    },
  },
  {
    contact: {
      city: "40100 - Bologna (BO)",
      email: "marco.galli@email.com",
      phone: "+39 3882201459",
    },
    education: [
      "Laurea in management",
      "Corso intensivo su supply chain sostenibile",
      "Tirocinio curriculare in operations",
    ],
    headline: {
      avatar: "Edoardo Filippi.jpg",
      bio: "Profilo junior tra project support e operations, con interesse per processi, organizzazione e sostenibilita operativa.",
      fullName: "Marco Galli",
      status: "Junior operations",
      summary:
        "Mi interessa il lato operativo della sostenibilita: rendere piu chiari processi, dati e responsabilita all interno dei team.",
    },
    id: "marco-galli",
    skills: {
      hardSkills: ["Project tracking", "Excel", "Process mapping"],
      keywords: ["operations", "precisione", "processi"],
      sdgIds: ["responsible", "climate"],
      softSkills: ["Affidabilita", "Teamwork", "Problem solving", "Metodo"],
    },
  },
] as const satisfies readonly CandidateProfileSummary[];

export function mapCandidateProfileSummaryToEntry(
  summary: CandidateProfileSummary,
): CandidateEntry {
  return {
    avatar: summary.headline.avatar,
    bio: summary.headline.bio,
    city: summary.contact.city,
    education: [...summary.education],
    email: summary.contact.email,
    hardSkills: [...summary.skills.hardSkills],
    id: summary.id,
    name: summary.headline.fullName,
    phone: summary.contact.phone,
    sdgs: [...summary.skills.sdgIds],
    skills: [...summary.skills.keywords],
    softSkills: [...summary.skills.softSkills],
    status: summary.headline.status,
    summary: summary.headline.summary,
  };
}
