import type {
  FaqGroup,
  ImpactCard,
  KnowledgeEntry,
  LegalDocument,
  PortalRole,
  SdgEntry,
} from "./types";
import {
  articlePreviewsMock,
  mapArticlePreviewToKnowledgeEntry,
  mapPodcastPreviewToKnowledgeEntry,
  podcastPreviewsMock,
} from "./content-preview";

export const documents = [
  {
    file: "Informativa privacy per sito.pdf",
    label: "Privacy Policy",
  },
  {
    file: "Cookie policy per sito.pdf",
    label: "Cookie Policy",
  },
  {
    file: "Termini di servizio per sito.pdf",
    label: "Termini d'uso",
  },
] as const satisfies ReadonlyArray<LegalDocument>;

export const sdgs: Record<string, SdgEntry> = {
  climate: {
    id: "climate",
    icon: "lotta_contro_il_cambiamento_climatico.png",
    label: "Lotta al cambiamento climatico",
  },
  equality: {
    id: "equality",
    icon: "parità_di_genere.png",
    label: "Parita di genere",
  },
  inclusion: {
    id: "inclusion",
    icon: "ridurre_le_disuguaglianze.png",
    label: "Ridurre le disuguaglianze",
  },
  responsible: {
    id: "responsible",
    icon: "consumo_responsabile.png",
    label: "Consumo responsabile",
  },
};

export const impactCards = [
  {
    description:
      "Due studenti di digital marketing, uno stage a Milano e la sensazione che il lavoro debba avere senso, non solo un contratto.",
    href: "/info#noixnoi",
    image: "noixnoi.jpg",
    label: "Noi x noi",
    tone: "gold",
  },
  {
    description:
      "Le aziende vengono valutate sia per l'impegno ESG sia per l'impatto reale della mansione sugli obiettivi Agenda 2030.",
    href: "/info#obiettivi",
    image: "obiettivi.jpg",
    label: "17 obiettivi per il futuro",
    tone: "rose",
  },
  {
    description:
      "Domande su annunci, algoritmo, verifica e candidatura: il prodotto e pensato per essere chiaro prima ancora che futuristico.",
    href: "/info#dubbi",
    image: "FAQ.jpg",
    label: "FAQ e dubbi ricorrenti",
    tone: "violet",
  },
] as const satisfies ReadonlyArray<ImpactCard>;

export const faqGroups = [
  {
    id: "annunci",
    label: "sugli annunci",
    tone: "mint",
    items: [
      {
        answer:
          "Ogni offerta viene letta da un team editoriale e poi classificata con indicatori chiari: tipo di contratto, modalita di lavoro, obiettivi SDG e livello di trasparenza del brand.",
        question:
          "come posso essere sicuro che un'opportunita sia davvero in linea con i miei valori?",
      },
      {
        answer:
          "Alle aziende chiediamo certificazioni, report ESG o evidenze misurabili. Se il brand e coerente ma il ruolo e piu neutro, lo segnaliamo apertamente invece di nasconderlo dietro claim generici.",
        question: "come fate a verificare che un'azienda sia davvero sostenibile?",
      },
    ],
  },
  {
    id: "applicazione",
    label: "sull'applicazione",
    tone: "gold",
    items: [
      {
        answer:
          "No. Wedoo e pensato proprio per stage, tirocini e primi ruoli: conta la direzione che vuoi prendere, non aver gia lavorato anni nel settore.",
        question:
          "bisogna gia avere esperienza nel settore della sostenibilita per candidarsi?",
      },
      {
        answer:
          "Si. Nel profilo puoi dichiarare aree di interesse, mansioni e obiettivi che ti rappresentano. Il sistema poi ti mostra offerte compatibili senza bloccarti in un solo percorso.",
        question:
          "Wedoo funziona anche se non so ancora che tipo di lavoro voglio fare?",
      },
    ],
  },
  {
    id: "matching",
    label: "sull'algoritmo",
    tone: "violet",
    items: [
      {
        answer:
          "Il matching combina preferenze, competenze, SDG, tipologia di contratto e disponibilita. Il risultato non sostituisce la scelta umana: serve a togliere rumore e far emergere le opportunita piu sensate.",
        question: "come funziona il sistema di matching?",
      },
    ],
  },
] as const satisfies ReadonlyArray<FaqGroup>;

export const knowledgeContent = {
  articles: articlePreviewsMock.map(mapArticlePreviewToKnowledgeEntry),
  podcasts: podcastPreviewsMock.map(mapPodcastPreviewToKnowledgeEntry),
} as const satisfies Record<"articles" | "podcasts", readonly KnowledgeEntry[]>;

export const routeMap = {
  company: {
    portal: "/portale/azienda",
    register: "/registrati/azienda/1",
    showcase: "/azienda",
  },
  candidate: {
    portal: "/portale/candidato",
    register: "/registrati/candidato/1",
    showcase: "/candidato",
  },
} as const satisfies Record<
  PortalRole,
  { portal: string; register: string; showcase: string }
>;
