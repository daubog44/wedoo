export const publicRoutes = {
  home: "/",
  info: "/info",
  register: "/registrati",
} as const;

export const publicCopy = {
  home: {
    heroTitle: "No hype. No frasi fatte. Solo realtà sostenibili.",
    howItWorksMobile:
      "Una piattaforma unica per chi cerca lavoro con impatto e chi lo offre.",
    downloadCta: "scarica l'app",
  },
  info: {
    aboutHeading: "noi x noi",
    goalsHeading: "17 obiettivi per il futuro",
  },
  register: {
    heading: "Registrati",
    candidateCta: "candidato",
    companyCta: "azienda",
  },
} as const;
