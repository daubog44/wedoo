import type { WizardStep } from "./types";

export type CandidateContactDraft = {
  city: string;
  email: string;
  fullName: string;
  linkedinUrl?: string;
  postalCode: string;
  phone: string;
  portfolioUrl?: string;
  province: string;
  provinceCode: string;
};

export type CandidateContactOption = {
  label: string;
  value: string;
};

export type CandidateEducationDraftEntry = {
  course: string;
  current: boolean;
  endYear?: string;
  id: string;
  institution: string;
  startYear: string;
};

export type CandidateWorkExperienceDraftEntry = {
  company: string;
  current: boolean;
  description: string;
  id: string;
  location: string;
  role: string;
  startMonth: string;
  startYear: string;
};

export type CandidateSkillsDraft = {
  hardSkills: readonly string[];
  languages: readonly string[];
  softSkills: readonly string[];
  tools: readonly string[];
};

export type CandidateProfileDraft = {
  contact: CandidateContactDraft;
  education: readonly CandidateEducationDraftEntry[];
  experiences: readonly CandidateWorkExperienceDraftEntry[];
  motivations: {
    pitch: string;
    preferredRoles: readonly string[];
    sdgFocus: readonly string[];
  };
  privacyAccepted: boolean;
  skills: CandidateSkillsDraft;
};

export const candidateProfileDraftMock = {
  contact: {
    city: "Guidonia Montecelio",
    email: "azzurra.signorelli@email.com",
    fullName: "Azzurra Signorelli",
    linkedinUrl: "https://www.linkedin.com/in/azzurra-signorelli-wedoo",
    phone: "+39 3201234567",
    portfolioUrl: "https://portfolio.wedoo.dev/azzurra-signorelli",
    postalCode: "00012",
    province: "Roma",
    provinceCode: "RM",
  },
  education: [
    {
      course: "Laurea magistrale in Design della comunicazione",
      current: true,
      id: "edu-polimi",
      institution: "Politecnico di Milano",
      startYear: "2024",
    },
    {
      course: "Laurea triennale in Scienze della comunicazione",
      current: false,
      endYear: "2023",
      id: "edu-statale",
      institution: "Universita degli Studi di Milano",
      startYear: "2021",
    },
  ],
  experiences: [
    {
      company: "Impact Hub Milano",
      current: true,
      description:
        "Supporto a community events, newsletter e contenuti social per startup a impatto.",
      id: "exp-impact-hub",
      location: "Milano",
      role: "Junior community & content assistant",
      startMonth: "Settembre",
      startYear: "2025",
    },
  ],
  motivations: {
    pitch:
      "Cerco un primo ruolo in cui contenuto, employer branding e sostenibilita siano parte dello stesso lavoro.",
    preferredRoles: ["Comunicazione", "Marketing", "UX writing"],
    sdgFocus: ["Parita di genere", "Consumo responsabile", "Clima"],
  },
  privacyAccepted: true,
  skills: {
    hardSkills: ["Content strategy", "Copywriting", "Social media", "Canva"],
    languages: ["Italiano C2", "Inglese B2"],
    softSkills: ["Teamwork", "Organizzazione", "Ascolto"],
    tools: ["Notion", "Figma", "Google Workspace"],
  },
} as const satisfies CandidateProfileDraft;

export const candidateContactProvinceOptions = [
  { label: "Roma", value: "Roma" },
  { label: "Milano", value: "Milano" },
  { label: "Torino", value: "Torino" },
] as const satisfies readonly CandidateContactOption[];

const candidateContactCityOptionsByProvince = {
  Milano: [
    { label: "Milano", value: "Milano" },
    { label: "Sesto San Giovanni", value: "Sesto San Giovanni" },
    { label: "Rho", value: "Rho" },
  ],
  Roma: [
    { label: "Guidonia Montecelio", value: "Guidonia Montecelio" },
    { label: "Roma", value: "Roma" },
    { label: "Tivoli", value: "Tivoli" },
  ],
  Torino: [
    { label: "Torino", value: "Torino" },
    { label: "Moncalieri", value: "Moncalieri" },
    { label: "Rivoli", value: "Rivoli" },
  ],
} as const satisfies Record<string, readonly CandidateContactOption[]>;

export function getCandidateContactCityOptions(
  province: string,
): readonly CandidateContactOption[] {
  const provinceOptions =
    candidateContactCityOptionsByProvince[
      province as keyof typeof candidateContactCityOptionsByProvince
    ];

  if (provinceOptions) {
    return provinceOptions;
  }

  return Object.values(candidateContactCityOptionsByProvince).flat();
}

export function formatCandidateContactLocation(contact: CandidateContactDraft) {
  return `${contact.postalCode} - ${contact.city} (${contact.provinceCode})`;
}

export function createCandidateRegistrationWizardSteps(
  draft: CandidateProfileDraft,
): WizardStep[] {
  return [
    {
      description:
        "Parti dalle info essenziali e vai online con un onboarding molto piu leggero di un form HR tradizionale.",
      eyebrow: "Step 1",
      fields: [
        {
          key: "fullName",
          label: "Nome e cognome",
          placeholder: draft.contact.fullName,
          type: "text",
        },
        {
          key: "email",
          label: "Email",
          placeholder: draft.contact.email,
          type: "email",
        },
        {
          key: "phone",
          label: "Numero di telefono",
          placeholder: draft.contact.phone,
          type: "tel",
        },
        {
          key: "password",
          label: "Password",
          placeholder: "Crea una password",
          type: "password",
        },
        {
          key: "confirmPassword",
          label: "Conferma password",
          placeholder: "Ripeti la password",
          type: "password",
        },
        {
          helper: draft.privacyAccepted
            ? "Consenso privacy gia raccolto nella simulazione del draft candidato."
            : "Il consenso privacy e richiesto per proseguire.",
          key: "privacy",
          label: "Ho preso visione dell informativa privacy",
          type: "checkbox",
        },
      ],
      image: "formcandidati1.png",
      index: 1,
      title: "Registrati come candidato",
    },
    {
      description:
        "Seleziona gli SDG che ti rappresentano e le mansioni da cui vuoi partire: il matching usera soprattutto questi due segnali.",
      eyebrow: "Step 2",
      fields: [
        {
          key: "sdgFocus",
          label: "In quali SDG rispecchi il tuo impegno?",
          options: [...draft.motivations.sdgFocus],
          type: "chips",
        },
        {
          key: "roles",
          label: "Quali mansioni ti interessano?",
          options: [...draft.motivations.preferredRoles],
          type: "chips",
        },
        {
          key: "message",
          label: "Racconta in due righe cosa cerchi",
          placeholder: draft.motivations.pitch,
          type: "textarea",
        },
      ],
      image: "formcandidati2.png",
      index: 2,
      title: "Dicci qualcosa in piu",
    },
  ];
}
