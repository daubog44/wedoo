import type { JobDetail, JobEntry, JobListing } from "./types";

export const jobListingsMock = [
  {
    company: {
      logo: "logo-azienda2.png",
      name: "Agenzia Creativa S.r.l.",
    },
    employment: {
      contractLabel: "Stage di 6 mesi con possibilita di rinnovo",
      salaryLabel: "700-900 euro al mese",
      scheduleLabel: "Full time - Lun-Ven, 9:00-18:00",
    },
    id: "addetto-comunicazione",
    role: {
      location: "20124 - Milano (MI)",
      previewDescription:
        "Cerchiamo una persona curiosa e proattiva da inserire nel team comunicazione. Lavorerai su social, contenuti visual e copy a supporto di progetti legati a sostenibilita, innovazione e persone.",
      previewTags: ["stage", "ibrido", "full time", "10.000EUR - 12.000EUR"],
      sdgIds: ["equality", "responsible", "climate"],
      title: "Addetto comunicazione",
    },
  },
  {
    company: {
      logo: "logo-azienda1.png",
      name: "Stabilimenti Roma S.p.A.",
    },
    employment: {
      contractLabel: "Tempo determinato di 12 mesi",
      salaryLabel: "20.000-25.000 euro annui",
      scheduleLabel: "Full time con due giorni da remoto",
    },
    id: "copywriter-junior",
    role: {
      location: "00100 - Roma (RM)",
      previewDescription:
        "Un ruolo junior per scrivere contenuti digitali, newsletter, landing page e micro-copy, affiancando il team marketing e HR su progetti di employer branding.",
      previewTags: ["deter.", "smart", "full time", "20.000EUR - 25.000EUR"],
      sdgIds: ["responsible", "climate", "inclusion"],
      title: "Copywriter junior",
    },
  },
  {
    company: {
      logo: "logo-azienda2.png",
      name: "Northway Consulting",
    },
    employment: {
      contractLabel: "Apprendistato",
      salaryLabel: "24.000 euro annui",
      scheduleLabel: "Ibrido, lun-ven",
    },
    id: "seo-specialist",
    role: {
      location: "Milano",
      previewDescription:
        "SEO specialist junior con forte attenzione a contenuti, intenti di ricerca e metriche. Il ruolo ha una componente editoriale e una di analisi.",
      previewTags: ["apprendistato", "ibrido", "analytics", "24k euro"],
      sdgIds: ["equality", "responsible"],
      title: "SEO specialist",
    },
  },
  {
    company: {
      logo: "logo-azienda1.png",
      name: "Data River Labs",
    },
    employment: {
      contractLabel: "Stage extracurriculare",
      salaryLabel: "900 euro al mese",
      scheduleLabel: "Hybrid, 4 giorni su 5 in remoto",
    },
    id: "data-analyst",
    role: {
      location: "Bologna",
      previewDescription:
        "Ruolo entry level su analisi dati, data cleaning e visualizzazioni. Il lavoro affianca il team di prodotto su KPI di sostenibilita e reporting.",
      previewTags: ["stage", "dati", "ibrido", "900 euro"],
      sdgIds: ["responsible", "climate"],
      title: "Data analyst",
    },
  },
  {
    company: {
      logo: "logo-azienda2.png",
      name: "Studio Verde Comune",
    },
    employment: {
      contractLabel: "Collaborazione iniziale di 9 mesi",
      salaryLabel: "18.000 euro annui",
      scheduleLabel: "Part time verticale estendibile",
    },
    id: "social-media-manager",
    role: {
      location: "Torino",
      previewDescription:
        "Social media manager junior per piano editoriale, community management, presidio delle rubriche e supporto a campagne di sensibilizzazione.",
      previewTags: ["social", "ibrido", "9 mesi", "18k euro"],
      sdgIds: ["equality", "inclusion", "responsible"],
      title: "Social media manager",
    },
  },
] as const satisfies readonly JobListing[];

export const jobDetailsMock = [
  {
    companyOverview: {
      paragraphs: [
        "Agenzia Creativa lavora tra branding, contenuti e marketing digitale con un focus esplicito su progetti ad alto impatto reputazionale.",
        "Il team e composto da designer, strategist e marketer che mescolano creativita e analisi per costruire narrazioni credibili.",
        "Per Wedoo il valore aggiunto e la chiarezza: range retributivo, aspettative, obiettivi e contatti sono tutti dichiarati.",
      ],
    },
    contact: {
      email: "l.ferrari@agcreativa.it",
      name: "Lucia Ferrari",
      phone: "+39 3461327478",
    },
    description:
      "Cerchiamo una persona curiosa e proattiva da inserire nel team comunicazione. Lavorerai su social, contenuti visual e copy a supporto di progetti legati a sostenibilita, innovazione e persone.",
    id: "addetto-comunicazione",
    qualifications: {
      hardSkills: [
        "Canva, Figma o Adobe Creative Suite",
        "Google Workspace",
        "WordPress, mailing list o CRM",
        "SEO e copywriting base",
        "Familiarita con LinkedIn e Instagram",
      ],
      requirementsLabel: "Non e richiesta esperienza pregressa",
      softSkills: [
        "Spirito di iniziativa",
        "Teamwork",
        "Adattabilita",
        "Precisione",
        "Interesse per sostenibilita e impatto sociale",
      ],
    },
    summaryBullets: [
      "Milano (3 giorni in sede)",
      "Lavoro ibrido",
      "Full time - Lun-Ven, 9:00-18:00",
      "Stipendio: 700-900 euro/mese",
      "Contratto: stage di 6 mesi con possibilita di rinnovo a tempo indeterminato",
    ],
  },
  {
    companyOverview: {
      paragraphs: [
        "Stabilimenti Roma e un gruppo industriale che sta ripensando processi e comunicazione intorno ai temi di economia circolare e inclusione.",
        "Il reparto marketing vuole rafforzare il racconto del brand con contenuti piu consistenti e meno corporate.",
      ],
    },
    contact: {
      email: "talent@stabilimentiroma.it",
      name: "Marta Giannini",
      phone: "+39 3338099031",
    },
    description:
      "Un ruolo junior per scrivere contenuti digitali, newsletter, landing page e micro-copy, affiancando il team marketing e HR su progetti di employer branding.",
    id: "copywriter-junior",
    qualifications: {
      hardSkills: [
        "Scrittura web e content design",
        "Editing base in CMS",
        "Conoscenze SEO on-page",
        "Buona cultura digitale e tool collaborativi",
      ],
      requirementsLabel:
        "Richiesta una base di scrittura e portfolio anche accademico",
      softSkills: [
        "Precisione",
        "Curiosita",
        "Capacita di sintesi",
        "Ascolto",
      ],
    },
    summaryBullets: [
      "Roma con modalita smart",
      "Full time",
      "Tempo determinato",
      "Team marketing e employer branding",
    ],
  },
  {
    companyOverview: {
      paragraphs: [
        "Northway accompagna PMI e corporate in percorsi di trasformazione digitale e sostenibile.",
        "Il team SEO lavora su contenuti editoriali, analisi keyword e governance della knowledge base interna.",
      ],
    },
    contact: {
      email: "jobs@northway.consulting",
      name: "Sara Pavesi",
      phone: "+39 3423358801",
    },
    description:
      "SEO specialist junior con forte attenzione a contenuti, intenti di ricerca e metriche. Il ruolo ha una componente editoriale e una di analisi.",
    id: "seo-specialist",
    qualifications: {
      hardSkills: ["SEO fundamentals", "GA4", "Search Console", "CMS"],
      requirementsLabel:
        "Preferibile una prima esperienza universitaria o personale su progetti SEO",
      softSkills: ["Metodo", "Teamwork", "Autonomia", "Chiarezza"],
    },
    summaryBullets: [
      "Milano",
      "Ibrido",
      "Apprendistato",
      "Percorso in analytics e contenuti",
    ],
  },
  {
    companyOverview: {
      paragraphs: [
        "Data River Labs costruisce dashboard e infrastrutture leggere per aziende che vogliono leggere meglio i propri dati operativi.",
        "Il team prodotto sta integrando KPI ESG in una suite analytics rivolta a business team e operation manager.",
      ],
    },
    contact: {
      email: "people@datariverlabs.io",
      name: "Paolo Leoni",
      phone: "+39 3516671200",
    },
    description:
      "Ruolo entry level su analisi dati, data cleaning e visualizzazioni. Il lavoro affianca il team di prodotto su KPI di sostenibilita e reporting.",
    id: "data-analyst",
    qualifications: {
      hardSkills: [
        "Excel o Sheets avanzato",
        "SQL base",
        "Tool BI",
        "Pensiero analitico",
      ],
      requirementsLabel: "Preferibile formazione STEM o economica",
      softSkills: [
        "Precisione",
        "Responsabilita",
        "Comunicazione",
        "Curiosita",
      ],
    },
    summaryBullets: [
      "Bologna",
      "Hybrid",
      "Stage",
      "Analytics ESG e reporting",
    ],
  },
  {
    companyOverview: {
      paragraphs: [
        "Studio Verde Comune supporta enti e organizzazioni ibride nella comunicazione di campagne civiche e progetti territoriali.",
        "Il team social lavora su contenuti editoriali, community management e rubriche educational.",
      ],
    },
    contact: {
      email: "selezione@studioverde.it",
      name: "Elena Bassi",
      phone: "+39 3391884501",
    },
    description:
      "Social media manager junior per piano editoriale, community management, presidio delle rubriche e supporto a campagne di sensibilizzazione.",
    id: "social-media-manager",
    qualifications: {
      hardSkills: [
        "Calendar editoriale",
        "Meta Suite",
        "Copy social",
        "Canva",
      ],
      requirementsLabel:
        "Richiesta esperienza anche progettuale o universitaria su social media",
      softSkills: ["Empatia", "Scrittura", "Reattivita", "Teamwork"],
    },
    summaryBullets: [
      "Torino",
      "Ibrido",
      "Part time",
      "Campagne civiche e community",
    ],
  },
] as const satisfies readonly JobDetail[];

export const jobListingsById = Object.fromEntries(
  jobListingsMock.map((listing) => [listing.id, listing]),
) as Record<string, JobListing>;

export const jobDetailsById = Object.fromEntries(
  jobDetailsMock.map((detail) => [detail.id, detail]),
) as Record<string, JobDetail>;

export function mapJobListingDetailToEntry(
  listing: JobListing,
  detail: JobDetail,
): JobEntry {
  return {
    company: listing.company.name,
    companyDetails: [...detail.companyOverview.paragraphs],
    contact: { ...detail.contact },
    contract: listing.employment.contractLabel,
    description: detail.description,
    hardSkills: [...detail.qualifications.hardSkills],
    id: listing.id,
    location: listing.role.location,
    logo: listing.company.logo,
    previewTags: [...listing.role.previewTags],
    requirements: detail.qualifications.requirementsLabel,
    salary: listing.employment.salaryLabel,
    schedule: listing.employment.scheduleLabel,
    sdgs: [...listing.role.sdgIds],
    softSkills: [...detail.qualifications.softSkills],
    summary: [...detail.summaryBullets],
    title: listing.role.title,
  };
}

export function getJobListingById(jobId?: string): JobListing {
  if (jobId && jobListingsById[jobId]) {
    return jobListingsById[jobId];
  }

  return jobListingsMock[0];
}

export function getJobDetailById(jobId?: string): JobDetail {
  if (jobId && jobDetailsById[jobId]) {
    return jobDetailsById[jobId];
  }

  return jobDetailsMock[0];
}

export function getJobEntryById(jobId?: string): JobEntry {
  const listing = getJobListingById(jobId);
  const detail = getJobDetailById(listing.id);

  return mapJobListingDetailToEntry(listing, detail);
}

export const jobs: JobEntry[] = jobListingsMock.map((listing) =>
  mapJobListingDetailToEntry(listing, getJobDetailById(listing.id)),
);
