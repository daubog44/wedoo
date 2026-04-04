import {
  candidateRegistrationAuthViewModel,
  companyRegistrationAuthViewModel,
  loginAuthViewModel,
  type AuthFieldViewModel,
  type AuthTone,
  type AuthViewModel,
} from "./auth";

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
      label: "hai giÃ  un account?",
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
            label: "cittÃ ",
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
              "ParitÃ  di genere",
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
  {
    background: "formaziende2.png",
    ctaLabel: "continua",
    ctaTo: "/registrati/azienda/3",
    rows: [
      {
        columns: 2,
        fields: [
          {
            id: "provincia",
            kind: "select",
            label: "provincia*",
            options: ["Milano", "Roma", "Torino"],
            placeholder: "scegli",
            size: "sm",
          },
          {
            id: "citta",
            kind: "select",
            label: "citta*",
            options: ["Milano", "Roma", "Torino"],
            placeholder: "scegli",
            size: "sm",
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            id: "job-title",
            kind: "select",
            label: "job title*",
            options: [
              "Addetto comunicazione",
              "SEO Specialist",
              "Data Analyst",
              "Social Media Manager",
            ],
            placeholder: "scegli",
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            id: "recruiter-heading",
            kind: "heading",
            label: "dettagli recruiter",
          },
          {
            id: "show-contacts",
            kind: "checkbox",
            label: "pubblica informazioni di contatto",
          },
        ],
      },
      {
        columns: 2,
        fields: [
          {
            id: "name",
            inputType: "text",
            kind: "input",
            label: "nome*",
            placeholder: "inserisci nome",
            size: "sm",
          },
          {
            id: "surname",
            inputType: "text",
            kind: "input",
            label: "cognome*",
            placeholder: "inserisci cognome",
            size: "sm",
          },
        ],
      },
      {
        columns: 2,
        fields: [
          {
            id: "contact-email",
            inputType: "email",
            kind: "input",
            label: "e-mail*",
            placeholder: "inserisci la mail",
            size: "sm",
          },
          {
            id: "contact-phone",
            inputType: "tel",
            kind: "input",
            label: "numero di telefono*",
            placeholder: "inserisci n. telefono",
            size: "sm",
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            id: "message",
            kind: "textarea",
            label: "lascia un messaggio",
            rows: 3,
          },
        ],
      },
    ],
    title: "Crea il tuo annuncio",
    tone: "violet",
  },
  {
    background: "formaziende3.png",
    ctaLabel: "continua",
    ctaTo: "/registrati/azienda/4",
    rows: [
      {
        columns: 1,
        fields: [
          {
            id: "company-details-heading",
            kind: "heading",
            label: "dettagli azienda",
          },
          {
            id: "details",
            kind: "textarea",
            label: "lascia un messaggio",
            rows: 3,
          },
          {
            id: "logo",
            kind: "file",
            label: "carica il tuo logo",
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            id: "salary-heading",
            kind: "heading",
            label: "dettagli retribuzione",
          },
          {
            id: "salary-public",
            kind: "checkbox",
            label: "pubblica informazioni di retribuzione",
          },
        ],
      },
      {
        columns: 2,
        fields: [
          {
            id: "salary-min",
            inputType: "text",
            kind: "input",
            label: "importo minimo",
            placeholder: "inserisci importo min",
            size: "sm",
          },
          {
            id: "salary-max",
            inputType: "text",
            kind: "input",
            label: "importo massimo",
            placeholder: "inserisci importo max",
            size: "sm",
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            id: "salary-unit",
            kind: "select",
            label: "unita di retribuzione",
            options: ["mensile", "annuale", "oraria"],
            placeholder: "scegli",
          },
        ],
      },
    ],
    title: "Crea il tuo annuncio",
    tone: "violet",
  },
  {
    background: "formaziende4.png",
    ctaLabel: "continua",
    ctaTo: "/registrati/azienda/5",
    rows: [
      {
        columns: 1,
        fields: [
          {
            id: "geography-heading",
            kind: "heading",
            label: "dettagli area geografica",
          },
        ],
      },
      {
        columns: 2,
        fields: [
          {
            id: "smart-working",
            kind: "checkbox",
            label: "smart working",
          },
          {
            id: "trasferte",
            kind: "checkbox",
            label: "trasferte",
          },
        ],
      },
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
            label: "cittÃ ",
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
            id: "description-heading",
            kind: "heading",
            label: "descrizione offerta",
          },
          {
            id: "job-description",
            kind: "textarea",
            label: "job description",
            rows: 3,
          },
          {
            id: "sector",
            kind: "select",
            label: "settore operativo aziendale",
            options: ["Marketing", "Comunicazione", "Data", "Operations"],
            placeholder: "scegli",
          },
          {
            id: "skills",
            kind: "select",
            label: "competenze richieste",
            options: ["Teamwork", "SEO", "Canva", "Google Workspace"],
            placeholder: "scegli",
          },
          {
            id: "experience",
            kind: "select",
            label: "esperienze richieste",
            options: ["nessuna", "accademica", "stage", "junior"],
            placeholder: "scegli",
          },
        ],
      },
    ],
    title: "Crea il tuo annuncio",
    tone: "violet",
  },
  {
    background: "formaziende5.png",
    ctaLabel: "continua",
    ctaTo: "/portale/azienda",
    rows: [
      {
        columns: 2,
        fields: [
          {
            id: "contract",
            kind: "select",
            label: "tipologia di contratto",
            options: ["stage", "determinato", "apprendistato"],
            placeholder: "scegli",
            size: "sm",
          },
          {
            id: "hours",
            kind: "select",
            label: "orari di lavoro",
            options: ["full time", "part time", "flessibile"],
            placeholder: "scegli",
            size: "sm",
          },
        ],
      },
      {
        columns: 1,
        fields: [
          {
            id: "mode",
            kind: "select",
            label: "modalitÃ  di lavoro",
            options: ["ibrido", "smart", "in presenza"],
            placeholder: "scegli",
          },
          {
            id: "sdg",
            kind: "select",
            label: "SDGs di riferimento",
            options: [
              "ParitÃ  di genere",
              "Consumo responsabile",
              "Lotta al cambiamento climatico",
              "Ridurre le disuguaglianze",
            ],
            placeholder: "scegli",
          },
          {
            id: "certifications",
            kind: "file",
            label:
              "carica le tue certificazioni sostenibili o, in assenza, il report di sostenibilitÃ ",
          },
        ],
      },
    ],
    title: "Crea il tuo annuncio",
    tone: "violet",
  },
];
