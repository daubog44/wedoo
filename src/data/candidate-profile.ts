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
  activities: readonly string[];
  course: string;
  current: boolean;
  degreeType: string;
  endYear?: string;
  erasmus: {
    city: string;
    country: string;
    institution: string;
  };
  id: string;
  institution: string;
  projectWorkDescription: string;
  specificCourses: readonly string[];
  startYear: string;
};

export type CandidateWorkExperienceDraftEntry = {
  city: string;
  company: string;
  country: string;
  current: boolean;
  description: string;
  endYear?: string;
  id: string;
  startYear: string;
};

export type CandidateSkillsDraft = {
  hardSkills: readonly string[];
  languages: readonly string[];
  softSkills: readonly string[];
  tools: readonly string[];
};

export type CandidateWorkPreferenceFieldKey =
  | "companyTypes"
  | "contractTypes"
  | "locations"
  | "schedules"
  | "workModes";

export type CandidateWorkPreferencesDraft = {
  companyTypes: readonly string[];
  contractTypes: readonly string[];
  locations: readonly string[];
  schedules: readonly string[];
  workModes: readonly string[];
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
  workPreferences: CandidateWorkPreferencesDraft;
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
      activities: ["erasmus+", "project work", "corsi specifici"],
      course: "comunicazione pubblica d'impresa",
      current: false,
      degreeType: "laurea magistrale",
      endYear: "2021",
      erasmus: {
        city: "",
        country: "",
        institution: "",
      },
      id: "edu-sapienza",
      institution: "università della Sapienza - Roma",
      projectWorkDescription: "",
      specificCourses: ["Employer branding ESG"],
      startYear: "2016",
    },
    {
      activities: [],
      course: "comunicazione e media digitali",
      current: false,
      degreeType: "laurea triennale",
      endYear: "2023",
      erasmus: {
        city: "",
        country: "",
        institution: "",
      },
      id: "edu-roma-tre",
      institution: "Università Roma Tre",
      projectWorkDescription: "",
      specificCourses: [],
      startYear: "2021",
    },
  ],
  experiences: [
    {
      city: "Roma",
      company: "agenzia creativa srl",
      country: "Italia",
      current: false,
      description: "supporto gestione social, creazione contenuti per PMI",
      endYear: "2020",
      id: "exp-agenzia-creativa",
      startYear: "2020",
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
    hardSkills: [
      "Social Media (Instagram, Facebook)",
      "Canva (conoscenza base)",
      "Meta Business Suite",
    ],
    languages: ["Italiano C2", "Inglese B2"],
    softSkills: [
      "Creativit\u00E0",
      "Adattabilit\u00E0",
      "Precisione",
      "Teamwork",
      "Proattivit\u00E0",
    ],
    tools: ["Notion", "Figma", "Google Workspace"],
  },
  workPreferences: {
    companyTypes: ["B-Corp", "PMI"],
    contractTypes: ["tempo indeterminato", "stage retribuito"],
    locations: ["Roma"],
    schedules: ["full time (9-18)"],
    workModes: ["ibrido", "full remote"],
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

export const candidateWorkModeOptions = [
  "ibrido",
  "full remote",
  "in presenza",
  "smart working flessibile",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export const candidateWorkLocationOptions = [
  "Roma",
  "Milano",
  "Torino",
  "Bologna",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export const candidateWorkCompanyTypeOptions = [
  "B-Corp",
  "PMI",
  "startup",
  "cooperativa",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export const candidateWorkScheduleOptions = [
  "full time (9-18)",
  "part time",
  "turni flessibili",
  "settimana corta",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export const candidateWorkContractTypeOptions = [
  "tempo indeterminato",
  "stage retribuito",
  "apprendistato",
  "tempo determinato",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export const candidateWorkPreferenceSections = [
  {
    key: "workModes",
    options: candidateWorkModeOptions,
    title: "modalita",
  },
  {
    key: "locations",
    options: candidateWorkLocationOptions,
    title: "localita",
  },
  {
    key: "companyTypes",
    options: candidateWorkCompanyTypeOptions,
    title: "tipologia di azienda",
  },
  {
    key: "schedules",
    options: candidateWorkScheduleOptions,
    title: "orari",
  },
  {
    key: "contractTypes",
    options: candidateWorkContractTypeOptions,
    title: "tipologia di contratto",
  },
] as const satisfies readonly {
  key: CandidateWorkPreferenceFieldKey;
  options: readonly CandidateContactOption[];
  title: string;
}[];

function joinPreferenceValues(values: readonly string[]) {
  return values.join(", ");
}

function capitalizeLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatContractPreference(values: readonly string[]) {
  if (values.length === 0) {
    return null;
  }

  const normalizedValues = values.map((value) => {
    if (value === "tempo indeterminato") {
      return "a tempo indeterminato";
    }

    if (value === "stage retribuito") {
      return "di stage retribuito con possibilita di estensione a tempo indeterminato";
    }

    return value;
  });

  const [firstValue, ...otherValues] = normalizedValues;
  const extraValues = otherValues.map((value) => `contratto ${value}`);

  return `Contratto ${[firstValue, ...extraValues].join(", ")}.`;
}

function formatCompanyPreference(values: readonly string[]) {
  if (values.length === 0) {
    return null;
  }

  const normalizedValues = values.map((value) =>
    value === "PMI" ? "PMI con impatto sostenibile" : value,
  );

  return `Aziende ${joinPreferenceValues(normalizedValues)};`;
}

function formatLocationPreference(values: readonly string[]) {
  if (values.length === 0) {
    return null;
  }

  if (values.length === 1) {
    return `Zona ${values[0]} citta;`;
  }

  return `Zone ${joinPreferenceValues(values)};`;
}

export function formatCandidateWorkPreferenceItemsForCv(
  workPreferences: CandidateWorkPreferencesDraft,
) {
  const items = [
    workPreferences.workModes.length > 0
      ? `Lavoro ${joinPreferenceValues(workPreferences.workModes)};`
      : null,
    formatLocationPreference(workPreferences.locations),
    formatCompanyPreference(workPreferences.companyTypes),
    workPreferences.schedules.length > 0
      ? `${capitalizeLabel(joinPreferenceValues(workPreferences.schedules))};`
      : null,
    formatContractPreference(workPreferences.contractTypes),
  ].filter((value): value is string => Boolean(value));

  return items;
}

export const candidateEducationDegreeOptions = [
  "laurea triennale",
  "laurea magistrale",
  "master",
  "diploma scuola superiore",
  "specializzazione post-diploma",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export const candidateEducationExtracurricularOptions = [
  "erasmus+",
  "project work",
  "corsi specifici",
  "corsi di lingue",
  "informatica",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export const candidateEducationYearOptions = [
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "in corso",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export const candidateEducationCountryOptions = [
  "Italia",
  "Spagna",
  "Francia",
  "Germania",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

const candidateEducationCityOptionsByCountry = {
  Francia: [
    { label: "Parigi", value: "Parigi" },
    { label: "Lione", value: "Lione" },
  ],
  Germania: [
    { label: "Berlino", value: "Berlino" },
    { label: "Monaco", value: "Monaco" },
  ],
  Italia: [
    { label: "Roma", value: "Roma" },
    { label: "Milano", value: "Milano" },
  ],
  Spagna: [
    { label: "Barcellona", value: "Barcellona" },
    { label: "Madrid", value: "Madrid" },
  ],
} as const satisfies Record<string, readonly CandidateContactOption[]>;

const candidateEducationInstituteOptionsByCity = {
  Barcellona: [
    { label: "Universitat de Barcelona", value: "Universitat de Barcelona" },
    { label: "Pompeu Fabra University", value: "Pompeu Fabra University" },
  ],
  Berlino: [
    { label: "Humboldt-Universität zu Berlin", value: "Humboldt-Universität zu Berlin" },
  ],
  Lione: [
    { label: "Université Lumière Lyon 2", value: "Université Lumière Lyon 2" },
  ],
  Madrid: [
    { label: "Universidad Complutense de Madrid", value: "Universidad Complutense de Madrid" },
  ],
  Milano: [
    { label: "Università Cattolica del Sacro Cuore", value: "Università Cattolica del Sacro Cuore" },
  ],
  Monaco: [
    { label: "Ludwig-Maximilians-Universität München", value: "Ludwig-Maximilians-Universität München" },
  ],
  Parigi: [
    { label: "Sorbonne Université", value: "Sorbonne Université" },
  ],
  Roma: [
    { label: "università della Sapienza - Roma", value: "università della Sapienza - Roma" },
    { label: "Università Roma Tre", value: "Università Roma Tre" },
  ],
} as const satisfies Record<string, readonly CandidateContactOption[]>;

export const candidateEducationSpecificCourseOptions = [
  "Employer branding ESG",
  "Digital storytelling",
  "Social media strategy",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export function getCandidateEducationCityOptions(
  country: string,
): readonly CandidateContactOption[] {
  const countryOptions =
    candidateEducationCityOptionsByCountry[
      country as keyof typeof candidateEducationCityOptionsByCountry
    ];

  if (countryOptions) {
    return countryOptions;
  }

  return Object.values(candidateEducationCityOptionsByCountry).flat();
}

export function getCandidateEducationInstituteOptions(
  city: string,
): readonly CandidateContactOption[] {
  const cityOptions =
    candidateEducationInstituteOptionsByCity[
      city as keyof typeof candidateEducationInstituteOptionsByCity
    ];

  if (cityOptions) {
    return cityOptions;
  }

  return Object.values(candidateEducationInstituteOptionsByCity).flat();
}

export const candidateWorkExperienceCountryOptions =
  candidateEducationCountryOptions;

export const candidateWorkExperienceYearOptions = candidateEducationYearOptions;

const candidateWorkExperienceCompanyOptionsByCity = {
  Barcellona: [
    { label: "Agencia Creativa BCN", value: "Agencia Creativa BCN" },
    { label: "Impact Studio Barcelona", value: "Impact Studio Barcelona" },
  ],
  Berlino: [
    { label: "Sustain Berlin Media", value: "Sustain Berlin Media" },
  ],
  Lione: [
    { label: "Atelier Impact Lyon", value: "Atelier Impact Lyon" },
  ],
  Madrid: [
    { label: "Impacto Studio Madrid", value: "Impacto Studio Madrid" },
  ],
  Milano: [
    { label: "Impact Hub Milano", value: "Impact Hub Milano" },
    { label: "ESG Story Lab", value: "ESG Story Lab" },
  ],
  Monaco: [
    { label: "Green Signals Munich", value: "Green Signals Munich" },
  ],
  Parigi: [
    { label: "Studio Impact Paris", value: "Studio Impact Paris" },
  ],
  Roma: [
    { label: "agenzia creativa srl", value: "agenzia creativa srl" },
    { label: "studio comunicazione sostenibile", value: "studio comunicazione sostenibile" },
  ],
} as const satisfies Record<string, readonly CandidateContactOption[]>;

export function getCandidateWorkExperienceCityOptions(
  country: string,
): readonly CandidateContactOption[] {
  return getCandidateEducationCityOptions(country);
}

export function getCandidateWorkExperienceCompanyOptions(
  city: string,
): readonly CandidateContactOption[] {
  const cityOptions =
    candidateWorkExperienceCompanyOptionsByCity[
      city as keyof typeof candidateWorkExperienceCompanyOptionsByCity
    ];

  if (cityOptions) {
    return cityOptions;
  }

  return Object.values(candidateWorkExperienceCompanyOptionsByCity).flat();
}

export const candidateSoftSkillOptions = [
  ...candidateProfileDraftMock.skills.softSkills,
  "Ascolto attivo",
  "Leadership inclusiva",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];

export const candidateHardSkillOptions = [
  ...candidateProfileDraftMock.skills.hardSkills,
  "Copywriting",
  "Content strategy",
].map((value) => ({ label: value, value })) satisfies readonly CandidateContactOption[];
