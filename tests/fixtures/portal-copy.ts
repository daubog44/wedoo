export const portalRoutes = {
  companyJobDraftStep1: "/portale/azienda/annunci/nuovo",
  companyJobDraftStep2: "/portale/azienda/annunci/nuovo?step=2",
  companyJobs: "/portale/azienda/annunci",
} as const;

export const portalCopy = {
  companyJobs: {
    createCardHeading: "Crea un nuovo annuncio",
    createCta: "crea",
  },
  companyJobDraftStep1: {
    continueCta: "avanti",
    descriptionHeading: "descrizione offerta",
    experienceLabel: "esperienza richiesta",
    geographyHeading: "dettagli area geografica",
    heading: "Crea il tuo annuncio",
    provinceLabel: "provincia",
    remoteLabel: "smart working",
    sectorLabel: "settore operativo aziendale",
    skillsLabel: "competenze richieste",
    travelLabel: "trasferte",
  },
  companyJobDraftStep2: {
    contractLabel: "tipologia di contratto",
    hoursLabel: "orari di lavoro",
    heading: "Crea il tuo annuncio",
    modeLabel: "modalit\u00E0 di lavoro",
    previewCta: "anteprima",
    removeCta: "cancella",
    saveDraftCta: "bozza",
    sdgLabel: "SDGs di riferimento",
    submitCta: "invia",
    uploadLabel:
      "carica le tue certificazioni sostenibili o, in assenza, il report di sostenibilit\u00E0",
  },
} as const;
