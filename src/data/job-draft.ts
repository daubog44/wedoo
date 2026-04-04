import type { FormField, FormPageConfig, FormRow } from "./forms";

export type JobDraftOption = {
  id: string;
  label: string;
};

export type JobDraftFlow = {
  completionPath: string;
  draftStartStep: number;
  previewPath: string;
  registrationPath: string;
  totalSteps: number;
};

export type JobDraftRecruiter = {
  email: string;
  firstName: string;
  lastName: string;
  message: string;
  phone: string;
  publicContact: boolean;
};

export type JobDraftCompanyProfile = {
  legalName: string;
  logoAsset: string;
  overview: string;
  vatNumber: string;
};

export type JobDraftCompensation = {
  maximum: string;
  minimum: string;
  publicSalary: boolean;
  unitId: string;
};

export type JobDraftGeography = {
  capId: string;
  cityId: string;
  provinceId: string;
  remoteAllowed: boolean;
  travelRequired: boolean;
};

export type JobDraftRole = {
  certificationAsset: string;
  certificationLabel: string;
  contractTypeId: string;
  description: string;
  experienceLevelId: string;
  hoursId: string;
  sdgIds: readonly string[];
  sectorId: string;
  skillIds: readonly string[];
  titleId: string;
  workModeId: string;
};

export type JobDraftCatalogs = {
  capCodes: readonly JobDraftOption[];
  cities: readonly JobDraftOption[];
  contractTypes: readonly JobDraftOption[];
  experienceLevels: readonly JobDraftOption[];
  hoursOptions: readonly JobDraftOption[];
  jobTitles: readonly JobDraftOption[];
  provinces: readonly JobDraftOption[];
  salaryUnits: readonly JobDraftOption[];
  sdgs: readonly JobDraftOption[];
  sectors: readonly JobDraftOption[];
  skillTags: readonly JobDraftOption[];
  workModes: readonly JobDraftOption[];
};

export type JobDraft = {
  catalogs: JobDraftCatalogs;
  company: JobDraftCompanyProfile;
  compensation: JobDraftCompensation;
  flow: JobDraftFlow;
  geography: JobDraftGeography;
  id: string;
  recruiter: JobDraftRecruiter;
  role: JobDraftRole;
};

function getOptionLabels(options: readonly JobDraftOption[]): string[] {
  return options.map((option) => option.label);
}

function findOptionLabel(
  options: readonly JobDraftOption[],
  selectedId: string,
): string | undefined {
  return options.find((option) => option.id === selectedId)?.label;
}

function createSelectField({
  fieldId,
  label,
  options,
  placeholder,
  size,
}: {
  fieldId: string;
  label: string;
  options: readonly JobDraftOption[];
  placeholder?: string;
  size?: "lg" | "md" | "sm" | "xs";
}): FormField {
  return {
    id: fieldId,
    kind: "select",
    label,
    options: getOptionLabels(options),
    placeholder,
    size,
  };
}

function createInputField({
  fieldId,
  inputType,
  label,
  placeholder,
  size,
}: {
  fieldId: string;
  inputType: "email" | "password" | "tel" | "text";
  label: string;
  placeholder: string;
  size?: "lg" | "md" | "sm";
}): FormField {
  return {
    id: fieldId,
    inputType,
    kind: "input",
    label,
    placeholder,
    size,
  };
}

export const jobDraftMock = {
  catalogs: {
    capCodes: [
      { id: "20124", label: "20124" },
      { id: "20129", label: "20129" },
      { id: "00100", label: "00100" },
    ],
    cities: [
      { id: "milano", label: "Milano" },
      { id: "roma", label: "Roma" },
      { id: "torino", label: "Torino" },
    ],
    contractTypes: [
      { id: "stage", label: "stage" },
      { id: "determinato", label: "determinato" },
      { id: "apprendistato", label: "apprendistato" },
    ],
    experienceLevels: [
      { id: "nessuna", label: "nessuna" },
      { id: "accademica", label: "accademica" },
      { id: "stage", label: "stage" },
      { id: "junior", label: "junior" },
    ],
    hoursOptions: [
      { id: "full-time", label: "full time" },
      { id: "part-time", label: "part time" },
      { id: "flessibile", label: "flessibile" },
    ],
    jobTitles: [
      { id: "communication-specialist", label: "Addetto comunicazione" },
      { id: "seo-specialist", label: "SEO Specialist" },
      { id: "data-analyst", label: "Data Analyst" },
      { id: "social-media-manager", label: "Social Media Manager" },
    ],
    provinces: [
      { id: "mi", label: "Milano" },
      { id: "rm", label: "Roma" },
      { id: "to", label: "Torino" },
    ],
    salaryUnits: [
      { id: "mensile", label: "mensile" },
      { id: "annuale", label: "annuale" },
      { id: "oraria", label: "oraria" },
    ],
    sdgs: [
      { id: "gender-equality", label: "Parita di genere" },
      { id: "responsible-consumption", label: "Consumo responsabile" },
      { id: "climate-action", label: "Lotta al cambiamento climatico" },
      { id: "reduced-inequalities", label: "Ridurre le disuguaglianze" },
    ],
    sectors: [
      { id: "marketing", label: "Marketing" },
      { id: "communication", label: "Comunicazione" },
      { id: "data", label: "Data" },
      { id: "operations", label: "Operations" },
    ],
    skillTags: [
      { id: "teamwork", label: "Teamwork" },
      { id: "seo", label: "SEO" },
      { id: "canva", label: "Canva" },
      { id: "google-workspace", label: "Google Workspace" },
    ],
    workModes: [
      { id: "ibrido", label: "ibrido" },
      { id: "smart", label: "smart" },
      { id: "in-presenza", label: "in presenza" },
    ],
  },
  company: {
    legalName: "Agenzia Creativa S.r.l.",
    logoAsset: "logo-azienda2.png",
    overview:
      "Agenzia Creativa lavora tra branding, contenuti e marketing digitale con un focus su progetti ad alto impatto reputazionale e sostenibile.",
    vatNumber: "IT12345678901",
  },
  compensation: {
    maximum: "900",
    minimum: "700",
    publicSalary: true,
    unitId: "mensile",
  },
  flow: {
    completionPath: "/portale/azienda",
    draftStartStep: 2,
    previewPath: "/portale/azienda/annunci/addetto-comunicazione",
    registrationPath: "/registrati/azienda/1",
    totalSteps: 5,
  },
  geography: {
    capId: "20124",
    cityId: "milano",
    provinceId: "mi",
    remoteAllowed: true,
    travelRequired: false,
  },
  id: "company-job-draft",
  recruiter: {
    email: "l.ferrari@agcreativa.it",
    firstName: "Lucia",
    lastName: "Ferrari",
    message:
      "Raccontaci perche questo ruolo puo essere una porta d ingresso credibile nel vostro team.",
    phone: "+39 3461327478",
    publicContact: true,
  },
  role: {
    certificationAsset: "report-sostenibilita-2025.pdf",
    certificationLabel: "report-sostenibilita-2025.pdf",
    contractTypeId: "stage",
    description:
      "Cerchiamo una persona curiosa e proattiva da inserire nel team comunicazione. Lavorerai su social, contenuti visual e copy a supporto di progetti legati a sostenibilita, innovazione e persone.",
    experienceLevelId: "stage",
    hoursId: "full-time",
    sdgIds: ["gender-equality", "responsible-consumption", "climate-action"],
    sectorId: "communication",
    skillIds: ["teamwork", "seo", "canva", "google-workspace"],
    titleId: "communication-specialist",
    workModeId: "ibrido",
  },
} as const satisfies JobDraft;

export function createCompanyJobDraftFormConfigs(
  draft: JobDraft,
): FormPageConfig[] {
  const recruiterStepRows: FormRow[] = [
    {
      columns: 2,
      fields: [
        createSelectField({
          fieldId: "provincia",
          label: "provincia*",
          options: draft.catalogs.provinces,
          placeholder: findOptionLabel(
            draft.catalogs.provinces,
            draft.geography.provinceId,
          ),
          size: "sm",
        }),
        createSelectField({
          fieldId: "citta",
          label: "citta*",
          options: draft.catalogs.cities,
          placeholder: findOptionLabel(draft.catalogs.cities, draft.geography.cityId),
          size: "sm",
        }),
      ],
    },
    {
      columns: 1,
      fields: [
        createSelectField({
          fieldId: "job-title",
          label: "job title*",
          options: draft.catalogs.jobTitles,
          placeholder: findOptionLabel(
            draft.catalogs.jobTitles,
            draft.role.titleId,
          ),
        }),
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
        createInputField({
          fieldId: "name",
          inputType: "text",
          label: "nome*",
          placeholder: draft.recruiter.firstName,
          size: "sm",
        }),
        createInputField({
          fieldId: "surname",
          inputType: "text",
          label: "cognome*",
          placeholder: draft.recruiter.lastName,
          size: "sm",
        }),
      ],
    },
    {
      columns: 2,
      fields: [
        createInputField({
          fieldId: "contact-email",
          inputType: "email",
          label: "e-mail*",
          placeholder: draft.recruiter.email,
          size: "sm",
        }),
        createInputField({
          fieldId: "contact-phone",
          inputType: "tel",
          label: "numero di telefono*",
          placeholder: draft.recruiter.phone,
          size: "sm",
        }),
      ],
    },
    {
      columns: 1,
      fields: [
        {
          id: "message",
          kind: "textarea",
          label: "lascia un messaggio",
          placeholder: draft.recruiter.message,
          rows: 3,
        },
      ],
    },
  ];

  const companyStepRows: FormRow[] = [
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
          placeholder: draft.company.overview,
          rows: 3,
        },
        {
          helper: `Asset mock atteso: ${draft.company.logoAsset}`,
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
        createInputField({
          fieldId: "salary-min",
          inputType: "text",
          label: "importo minimo",
          placeholder: draft.compensation.minimum,
          size: "sm",
        }),
        createInputField({
          fieldId: "salary-max",
          inputType: "text",
          label: "importo massimo",
          placeholder: draft.compensation.maximum,
          size: "sm",
        }),
      ],
    },
    {
      columns: 1,
      fields: [
        createSelectField({
          fieldId: "salary-unit",
          label: "unita di retribuzione",
          options: draft.catalogs.salaryUnits,
          placeholder: findOptionLabel(
            draft.catalogs.salaryUnits,
            draft.compensation.unitId,
          ),
        }),
      ],
    },
  ];

  const roleStepRows: FormRow[] = [
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
        createSelectField({
          fieldId: "provincia",
          label: "provincia",
          options: draft.catalogs.provinces,
          placeholder: findOptionLabel(
            draft.catalogs.provinces,
            draft.geography.provinceId,
          ),
          size: "xs",
        }),
        createSelectField({
          fieldId: "citta",
          label: "citta",
          options: draft.catalogs.cities,
          placeholder: findOptionLabel(draft.catalogs.cities, draft.geography.cityId),
          size: "xs",
        }),
        createSelectField({
          fieldId: "cap",
          label: "CAP",
          options: draft.catalogs.capCodes,
          placeholder: findOptionLabel(draft.catalogs.capCodes, draft.geography.capId),
          size: "xs",
        }),
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
          placeholder: draft.role.description,
          rows: 3,
        },
        createSelectField({
          fieldId: "sector",
          label: "settore operativo aziendale",
          options: draft.catalogs.sectors,
          placeholder: findOptionLabel(draft.catalogs.sectors, draft.role.sectorId),
        }),
        createSelectField({
          fieldId: "skills",
          label: "competenze richieste",
          options: draft.catalogs.skillTags,
          placeholder: findOptionLabel(
            draft.catalogs.skillTags,
            draft.role.skillIds[0] ?? "",
          ),
        }),
        createSelectField({
          fieldId: "experience",
          label: "esperienze richieste",
          options: draft.catalogs.experienceLevels,
          placeholder: findOptionLabel(
            draft.catalogs.experienceLevels,
            draft.role.experienceLevelId,
          ),
        }),
      ],
    },
  ];

  const sustainabilityStepRows: FormRow[] = [
    {
      columns: 2,
      fields: [
        createSelectField({
          fieldId: "contract",
          label: "tipologia di contratto",
          options: draft.catalogs.contractTypes,
          placeholder: findOptionLabel(
            draft.catalogs.contractTypes,
            draft.role.contractTypeId,
          ),
          size: "sm",
        }),
        createSelectField({
          fieldId: "hours",
          label: "orari di lavoro",
          options: draft.catalogs.hoursOptions,
          placeholder: findOptionLabel(
            draft.catalogs.hoursOptions,
            draft.role.hoursId,
          ),
          size: "sm",
        }),
      ],
    },
    {
      columns: 1,
      fields: [
        createSelectField({
          fieldId: "mode",
          label: "modalita di lavoro",
          options: draft.catalogs.workModes,
          placeholder: findOptionLabel(
            draft.catalogs.workModes,
            draft.role.workModeId,
          ),
        }),
        createSelectField({
          fieldId: "sdg",
          label: "SDGs di riferimento",
          options: draft.catalogs.sdgs,
          placeholder: findOptionLabel(
            draft.catalogs.sdgs,
            draft.role.sdgIds[0] ?? "",
          ),
        }),
        {
          helper: `Asset mock atteso: ${draft.role.certificationAsset}`,
          id: "certifications",
          kind: "file",
          label:
            "carica le tue certificazioni sostenibili o, in assenza, il report di sostenibilita",
        },
      ],
    },
  ];

  return [
    {
      background: "formaziende2.png",
      ctaLabel: "continua",
      ctaTo: "/registrati/azienda/3",
      rows: recruiterStepRows,
      title: "Crea il tuo annuncio",
      tone: "violet",
    },
    {
      background: "formaziende3.png",
      ctaLabel: "continua",
      ctaTo: "/registrati/azienda/4",
      rows: companyStepRows,
      title: "Crea il tuo annuncio",
      tone: "violet",
    },
    {
      background: "formaziende4.png",
      ctaLabel: "continua",
      ctaTo: "/registrati/azienda/5",
      rows: roleStepRows,
      title: "Crea il tuo annuncio",
      tone: "violet",
    },
    {
      background: "formaziende5.png",
      ctaLabel: "continua",
      ctaTo: draft.flow.completionPath,
      rows: sustainabilityStepRows,
      title: "Crea il tuo annuncio",
      tone: "violet",
    },
  ];
}
