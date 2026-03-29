import type {
  FaqGroup,
  ImpactCard,
  KnowledgeEntry,
  KnowledgeKind,
  LegalDocument,
  PortalRole,
  SdgEntry,
} from "./types";

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
    label: "Sugli annunci",
    tone: "mint",
    items: [
      {
        answer:
          "Ogni offerta viene letta da un team editoriale e poi classificata con indicatori chiari: tipo di contratto, modalita di lavoro, obiettivi SDG e livello di trasparenza del brand.",
        question:
          "Come posso essere sicuro che un'opportunita sia davvero in linea con i miei valori?",
      },
      {
        answer:
          "Alle aziende chiediamo certificazioni, report ESG o evidenze misurabili. Se il brand e coerente ma il ruolo e piu neutro, lo segnaliamo apertamente invece di nasconderlo dietro claim generici.",
        question: "Come fate a verificare che un'azienda sia davvero sostenibile?",
      },
    ],
  },
  {
    id: "applicazione",
    label: "Sull'applicazione",
    tone: "gold",
    items: [
      {
        answer:
          "No. Wedoo e pensato proprio per stage, tirocini e primi ruoli: conta la direzione che vuoi prendere, non aver gia lavorato anni nel settore.",
        question:
          "Bisogna gia avere esperienza nel settore della sostenibilita per candidarsi?",
      },
      {
        answer:
          "Si. Nel profilo puoi dichiarare aree di interesse, mansioni e obiettivi che ti rappresentano. Il sistema poi ti mostra offerte compatibili senza bloccarti in un solo percorso.",
        question:
          "Posso usare Wedoo anche se non so ancora che tipo di lavoro voglio fare?",
      },
    ],
  },
  {
    id: "matching",
    label: "Sull'algoritmo",
    tone: "violet",
    items: [
      {
        answer:
          "Il matching combina preferenze, competenze, SDG, tipologia di contratto e disponibilita. Il risultato non sostituisce la scelta umana: serve a togliere rumore e far emergere le opportunita piu sensate.",
        question: "Come funziona il sistema di matching?",
      },
    ],
  },
] as const satisfies ReadonlyArray<FaqGroup>;

export const knowledgeContent = {
  articles: [
    {
      description:
        "Come scrivere offerte che parlano di impatto senza scivolare nel greenwashing e senza nascondere salario o aspettative.",
      id: "employer-branding-esg",
      title: "Employer branding ESG senza facciata",
    },
    {
      description:
        "Una checklist pratica per leggere un annuncio sostenibile: range economico, modello di lavoro, obiettivi e responsabilita.",
      id: "leggere-annuncio",
      title: "Come leggere un annuncio prima di candidarti",
    },
    {
      description:
        "Perche un buon matching non promette magia ma riduce rumore, frizione e candidature poco rilevanti.",
      id: "matching-credibile",
      title: "Matching credibile: meno hype, piu contesto",
    },
    {
      description:
        "Dal CV ai primi colloqui: segnali utili per capire se un'opportunita ti fara crescere oppure ti terra solo occupato.",
      id: "segnali-primo-ruolo",
      title: "Primo ruolo, primi segnali da leggere bene",
    },
  ],
  podcasts: [
    {
      description:
        "Conversazioni brevi su primi ruoli, recruiting trasparente e nuove aspettative della Gen Z nel mercato del lavoro.",
      id: "no-hype",
      title: "No hype: lavoro, impatto, realta",
    },
    {
      description:
        "PMI, startup e team HR raccontano cosa significa pubblicare offerte piu leggibili e piu concrete.",
      id: "aziende-credibili",
      title: "Aziende credibili",
    },
    {
      description:
        "Un formato piu operativo dedicato a portfolio, CV, colloqui e segnali deboli per chi cerca il primo stage.",
      id: "first-role",
      title: "First role notes",
    },
    {
      description:
        "HR, founder e team di prodotto raccontano cosa rende un annuncio leggibile gia prima del colloquio.",
      id: "hiring-senza-fuffa",
      title: "Hiring senza fuffa",
    },
  ],
} as const satisfies Record<KnowledgeKind, readonly KnowledgeEntry[]>;

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
