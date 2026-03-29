export type HomeFeatureTone = "gold" | "rose" | "violet";

export type PublicHomeNavigationCopy = {
  authDialogDescription: string;
  companyPrompt: string;
  languageLabel: string;
  signInLabel: string;
  signUpLabel: string;
};

export type PublicHomeHeroCopy = {
  downloadLabel: string;
  subtitle: string;
  title: string;
};

export type PublicHomeHowItWorksCopy = {
  candidateLabel: string;
  companyLabel: string;
  desktopDescription: string;
  eyebrow: string;
  mobileDescription: string;
  mobileTitle: string;
  title: string;
};

export type PublicHomeFeatureCard = {
  href: string;
  id: string;
  image: string;
  title: string;
  tone: HomeFeatureTone;
};

export type PublicHomeVideoCopy = {
  previewAlt: string;
  previewImage: string;
  title: string;
};

export type PublicHomePatronageCopy = {
  image: string;
  imageAlt: string;
  title: string;
};

export type PublicHomeFooterCopy = {
  contactEmail: string;
  contactLabel: string;
  disclaimers: readonly string[];
  projectStatus: string;
  rightsLine: string;
};

export type PublicHomeContent = {
  featureCards: readonly PublicHomeFeatureCard[];
  footer: PublicHomeFooterCopy;
  hero: PublicHomeHeroCopy;
  howItWorks: PublicHomeHowItWorksCopy;
  impactStatement: {
    desktop: string;
    mobile: string;
  };
  navigation: PublicHomeNavigationCopy;
  patronage: PublicHomePatronageCopy;
  video: PublicHomeVideoCopy;
};

/**
 * Mock content for the public landing page.
 *
 * Replace this object with a CMS/API payload when the public content endpoint
 * exists. The intended contract is a single "public home" response with copy,
 * CTA labels and card metadata, while routes stay owned by the frontend.
 */
export const publicHomeMock = {
  navigation: {
    authDialogDescription:
      "Apri la schermata dedicata per entrare in Wedoo o creare un nuovo profilo.",
    companyPrompt: "sei un'azienda?",
    languageLabel: "ita",
    signInLabel: "accedi",
    signUpLabel: "registrati",
  },
  hero: {
    downloadLabel: "scarica l'app",
    subtitle:
      "Ogni annuncio \u00E8 una promessa verificata.\nPerch\u00E9 il cambiamento non pu\u00F2 essere una bugia.",
    title: "No hype. No frasi fatte. Solo realt\u00E0 sostenibili.",
  },
  howItWorks: {
    candidateLabel: "candidato",
    companyLabel: "azienda",
    desktopDescription:
      "Un'unica piattaforma, due protagonisti: chi cerca un lavoro con impatto autentico, e chi lo offre. Ti spieghiamo come funziona, semplice e chiaro, per entrambe le parti.",
    eyebrow: "Scopri come funziona",
    mobileDescription: "Chiara, semplice, per entrambi.",
    mobileTitle:
      "Una piattaforma unica per chi cerca lavoro con impatto e chi lo offre.",
    title:
      "Wedoo \u00E8 dove il talento e la sostenibilit\u00E0 si incontrano per davvero",
  },
  impactStatement: {
    desktop:
      "Wedoo aiuta la GenZ a trovare stage e tirocini in aziende realmente sostenibili, valutando sia l'impegno dell'azienda sia l'impatto della mansione sugli Obiettivi Agenda 2030.",
    mobile:
      "Wedoo aiuta la GenZ a trovare stage e tirocini in aziende davvero sostenibili, valutando azienda e ruolo sugli Obiettivi Agenda 2030.",
  },
  featureCards: [
    {
      href: "/info#noixnoi",
      id: "about-us",
      image: "noixnoi.jpg",
      title: "noi x noi",
      tone: "gold",
    },
    {
      href: "/info#obiettivi",
      id: "sdg-goals",
      image: "obiettivi.jpg",
      title: "17 Obiettivi per il futuro",
      tone: "rose",
    },
    {
      href: "/info#dubbi",
      id: "faq",
      image: "FAQ.jpg",
      title: "dubbi? le FAQ ti aiutano",
      tone: "violet",
    },
  ],
  video: {
    previewAlt: "Wedoo spiegato in un click",
    previewImage: "home-video-placeholder-desktop.png",
    title: "Wedoo spiegato in un click",
  },
  patronage: {
    image: "patrocinio.png",
    imageAlt: "Patrocinio Wedoo",
    title: "Con il patrocinio di...",
  },
  footer: {
    contactEmail: "help@wedoo.com",
    contactLabel: "Contatti",
    disclaimers: [
      "Alcune funzionalit\u00E0 e contenuti sono a scopo dimostrativo.",
      "Le aziende e le opportunit\u00E0 presenti sono a puro scopo dimostrativo.",
    ],
    projectStatus: "Wedoo \u00E8 un progetto in fase di sviluppo.",
    rightsLine: "2025 Wedoo \u2013 Tutti i diritti riservati",
  },
} as const satisfies PublicHomeContent;

export const publicHomeFeatureCardsMock = publicHomeMock.featureCards;
