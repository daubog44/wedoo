import {
  candidateRegistrationAuthViewModel,
  companyRegistrationAuthViewModel,
  loginAuthViewModel,
  type AuthFieldViewModel,
  type AuthTone,
  type AuthViewModel,
} from "./auth";
import {
  createCompanyJobDraftFormConfigs,
  jobDraftMock,
} from "./job-draft";

export type FormTone = "mint" | "violet" | "lilac";

export type FormField =
  | {
      id: string;
      kind: "checkbox";
      label: string;
      linkHref?: string;
      linkLabel?: string;
    }
  | {
      id: string;
      kind: "heading";
      label: string;
    }
  | {
      id: string;
      kind: "file";
      label: string;
      helper?: string;
    }
  | {
      id: string;
      kind: "input";
      inputType: "email" | "password" | "tel" | "text";
      label: string;
      placeholder: string;
      size?: "lg" | "md" | "sm";
    }
  | {
      id: string;
      kind: "select";
      label: string;
      options: string[];
      placeholder?: string;
      size?: "lg" | "md" | "sm" | "xs";
    }
  | {
      id: string;
      kind: "textarea";
      label: string;
      placeholder?: string;
      rows?: number;
    };

export type FormRow = {
  columns: 1 | 2 | 3;
  fields: FormField[];
};

export type FormPageConfig = {
  background: string;
  ctaLabel: string;
  ctaTo: string;
  footerPrompt?: {
    label: string;
    linkLabel: string;
    linkTo: string;
  };
  providerButtons?: boolean;
  rows: FormRow[];
  subtitle?: string;
  title: string;
  tone: FormTone;
};

function mapAuthToneToFormTone(tone: AuthTone): FormTone {
  return tone;
}

function mapAuthFieldToFormField(field: AuthFieldViewModel): FormField {
  return field;
}

function buildAuthFormConfig(viewModel: AuthViewModel): FormPageConfig {
  return {
    background: viewModel.background,
    ctaLabel: viewModel.ctaLabel,
    ctaTo: viewModel.ctaTo,
    footerPrompt: viewModel.footerPrompt,
    providerButtons: viewModel.providerButtons,
    rows: [
      {
        columns: 1,
        fields: viewModel.fields.map(mapAuthFieldToFormField),
      },
    ],
    subtitle: viewModel.subtitle,
    title: viewModel.title,
    tone: mapAuthToneToFormTone(viewModel.tone),
  };
}

export const loginForm: FormPageConfig = buildAuthFormConfig(loginAuthViewModel);

export const candidateForms: FormPageConfig[] = [
  buildAuthFormConfig(candidateRegistrationAuthViewModel),
  {
    background: "formcandidati2.png",
    ctaLabel: "conferma",
    ctaTo: "/portale/candidato",
    footerPrompt: {
      label: "hai giÃƒÂ  un account?",
      linkLabel: "accedi",
      linkTo: "/accedi",
    },
    providerButtons: true,
    rows: [
      {
        columns: 3,
        fields: [
          {
            id: "provincia",
            kind: "select",
            label: "provincia",
            options: ["Milano", "Roma", "Torino"],
            placeholder: "scegli",
            size: "xs",
          },
          {
            id: "citta",
            kind: "select",
            label: "cittÃƒÂ ",
            options: ["Milano", "Roma", "Torino"],
            placeholder: "scegli",
            size: "xs",
          },
          {
            id: "cap",
            kind: "select",
            label: "CAP",
            options: ["20124", "00100", "10121"],
            placeholder: "scegli",
            size: "xs",
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            id: "sdgs",
            kind: "select",
            label: "in quale/i SDGs rispecchi il tuo impegno?",
            options: [
              "ParitÃƒÂ  di genere",
              "Consumo responsabile",
              "Clima",
              "Ridurre le disuguaglianze",
            ],
            placeholder: "scegli",
          },
          {
            id: "mansioni",
            kind: "select",
            label: "quali mansioni ti interessano?",
            options: [
              "Comunicazione",
              "SEO Specialist",
              "Data Analyst",
              "Social Media Manager",
            ],
            placeholder: "scegli",
          },
        ],
      },
    ],
    subtitle: "Registrazione",
    title: "Dicci qualcosa in piu",
    tone: "mint",
  },
];

export const companyForms: FormPageConfig[] = [
  buildAuthFormConfig(companyRegistrationAuthViewModel),
  ...createCompanyJobDraftFormConfigs(jobDraftMock),
];
