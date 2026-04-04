import type { RoleShowcase } from "./types";

export type CompanyProfileMetric = {
  id: string;
  label: string;
  value: string;
};

export type CompanyProfileSlide = {
  description: string;
  id: string;
  image: string;
  title: string;
};

export type CompanyProfileSummary = {
  audience: string;
  badge: string;
  description: string;
  headline: string;
  id: string;
  metrics: readonly CompanyProfileMetric[];
  onboarding: {
    firstJobDraftSteps: number;
    portalPath: string;
    registrationPath: string;
  };
  slides: readonly CompanyProfileSlide[];
};

export const companyProfileSummaryMock = {
  audience: "Team HR, startup e PMI che vogliono parlare in modo credibile con la Gen Z.",
  badge: "Percorso azienda",
  description:
    "Per team HR, startup e PMI che vogliono parlare in modo credibile con la Gen Z.",
  headline: "Target ultra preciso: Gen Z\norientati alla sostenibilita",
  id: "wedoo-company-profile",
  metrics: [
    {
      id: "first-job-draft-steps",
      label: "Passi per pubblicare il primo annuncio",
      value: "5 step",
    },
    {
      id: "main-audience",
      label: "Target principale",
      value: "Gen Z",
    },
    {
      id: "positioning",
      label: "Posizionamento",
      value: "ESG first",
    },
  ],
  onboarding: {
    firstJobDraftSteps: 5,
    portalPath: "/portale/azienda",
    registrationPath: "/registrati/azienda/1",
  },
  slides: [
    {
      description: "Parli con una community in cerca di senso, impatto e futuro.",
      id: "gen-z-audience",
      image: "azienda_1.png",
      title: "Target ultra preciso: Gen Z\norientati alla sostenibilita",
    },
    {
      description:
        "I candidati vogliono coerenza, e noi ti guidiamo a mostrarla al meglio.",
      id: "job-review",
      image: "azienda_2.png",
      title: "Verifica degli annunci\ne trasparenza",
    },
    {
      description:
        "Il nostro sistema suggerisce solo candidati in linea, evitando candidature poco rilevanti (sempre con la possibilita di poterle ricercare manualmente).",
      id: "matching",
      image: "azienda_3.png",
      title: "Matching profilato,\nrisultati reali",
    },
    {
      description:
        "Badge, dati, certificazioni:\nracconta chi sei davvero,\nnoi ti aiutiamo.",
      id: "employer-branding",
      image: "azienda_4.png",
      title: "Employer Branding guidato",
    },
    {
      description:
        "Non serve essere grandi:\nse fai le cose per bene, qui\nsei nel posto giusto.",
      id: "startup-pmi",
      image: "azienda_5.png",
      title: "Soluzioni anche per\nstartup e PMI",
    },
    {
      description:
        "In futuro prevediamo di inserire funzioni a pagamento per aiutare le aziende ad aumentare la propria visibilita.",
      id: "base-plan",
      image: "azienda_6.png",
      title: "Contenuti gratuiti\nper la versione base",
    },
  ],
} as const satisfies CompanyProfileSummary;

export function mapCompanyProfileSummaryToShowcase(
  summary: CompanyProfileSummary,
): RoleShowcase {
  return {
    badge: summary.badge,
    cta: summary.onboarding.registrationPath,
    description: summary.description,
    metrics: summary.metrics.map((metric) => ({
      label: metric.label,
      value: metric.value,
    })),
    slides: summary.slides.map((slide) => ({
      description: slide.description,
      image: slide.image,
      title: slide.title,
    })),
    title: summary.headline,
  };
}
