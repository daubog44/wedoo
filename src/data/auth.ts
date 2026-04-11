export type AuthTone = "mint" | "violet" | "lilac";

export type AuthFieldViewModel =
  | {
      defaultChecked?: boolean;
      id: string;
      kind: "checkbox";
      label: string;
      linkHref?: string;
      linkLabel?: string;
      required?: boolean;
    }
  | {
      errorText?: string;
      id: string;
      kind: "input";
      inputType: "email" | "password" | "tel" | "text";
      label: string;
      placeholder: string;
      required?: boolean;
      size?: "lg" | "md" | "sm";
    };

export type AuthErrorViewModel = {
  description: string;
  fieldIds: readonly string[];
  id: string;
  title: string;
};

export type AuthViewModel = {
  background: string;
  ctaLabel: string;
  ctaTo: string;
  dividerLabel?: string;
  errors: readonly AuthErrorViewModel[];
  fields: readonly AuthFieldViewModel[];
  footerPrompt?: {
    label: string;
    linkLabel: string;
    linkTo: string;
  };
  forgotPasswordLabel?: string;
  id: "login" | "register-candidate" | "register-company";
  providerOptions?: readonly {
    id: "apple" | "google";
    label: string;
  }[];
  providerButtons?: boolean;
  showMissingFieldErrorsByDefault?: boolean;
  subtitle?: string;
  title: string;
  tone: AuthTone;
};

const privacyField = {
  id: "privacy",
  kind: "checkbox",
  label: "ho preso visione dell'informativa sulla",
  linkHref: "/assets/documenti/Informativa%20privacy%20per%20sito.pdf",
  linkLabel: "privacy",
  required: true,
} as const satisfies AuthFieldViewModel;

export const loginAuthViewModel = {
  background: "accedi.png",
  ctaLabel: "accedi",
  ctaTo: "/portale/candidato",
  dividerLabel: "oppure",
  errors: [
    {
      description: "Inserisci email e password prima di continuare.",
      fieldIds: ["email", "password"],
      id: "missing-fields",
      title: "Campi mancanti",
    },
  ],
  fields: [
    {
      errorText: "*email mancante",
      id: "email",
      inputType: "email",
      kind: "input",
      label: "email",
      placeholder: "inserisci qui la tua mail",
      required: true,
    },
    {
      errorText: "*password mancante",
      id: "password",
      inputType: "password",
      kind: "input",
      label: "password",
      placeholder: "inserisci la password",
      required: true,
    },
    {
      defaultChecked: true,
      id: "terms",
      kind: "checkbox",
      label: "accetto i termini e le condizioni",
      required: true,
    },
  ],
  footerPrompt: {
    label: "non hai un account?",
    linkLabel: "registrati",
    linkTo: "/registrati",
  },
  forgotPasswordLabel: "password dimenticata",
  id: "login",
  providerButtons: true,
  providerOptions: [
    {
      id: "google",
      label: "accedi con Google",
    },
    {
      id: "apple",
      label: "accedi con Apple",
    },
  ],
  showMissingFieldErrorsByDefault: true,
  subtitle: "Accedi",
  title: "Bentornat*!",
  tone: "lilac",
} as const satisfies AuthViewModel;

export const candidateRegistrationAuthViewModel = {
  background: "formcandidati1.png",
  ctaLabel: "continua",
  ctaTo: "/registrati/candidato/2",
  errors: [
    {
      description: "Completa dati anagrafici, contatti, password e consenso privacy.",
      fieldIds: [
        "full-name",
        "email",
        "phone",
        "password",
        "confirm-password",
        "privacy",
      ],
      id: "missing-fields",
      title: "Registrazione incompleta",
    },
  ],
  fields: [
    {
      id: "full-name",
      inputType: "text",
      kind: "input",
      label: "nome e cognome*",
      placeholder: "inserisci nome e cognome",
      required: true,
    },
    {
      id: "email",
      inputType: "email",
      kind: "input",
      label: "email*",
      placeholder: "inserisci la mail",
      required: true,
    },
    {
      id: "phone",
      inputType: "tel",
      kind: "input",
      label: "numero di telefono*",
      placeholder: "inserisci il numero di telefono",
      required: true,
    },
    {
      id: "password",
      inputType: "password",
      kind: "input",
      label: "password*",
      placeholder: "inserisci una password",
      required: true,
    },
    {
      id: "confirm-password",
      inputType: "password",
      kind: "input",
      label: "conferma password*",
      placeholder: "re-inserisci la password",
      required: true,
    },
    privacyField,
  ],
  footerPrompt: {
    label: "hai gi\u00E0 un account?",
    linkLabel: "accedi",
    linkTo: "/accedi",
  },
  id: "register-candidate",
  providerButtons: true,
  subtitle: "Registrati",
  title: "Benvenut*!",
  tone: "mint",
} as const satisfies AuthViewModel;

export const companyRegistrationAuthViewModel = {
  background: "formaziende1.png",
  ctaLabel: "continua",
  ctaTo: "/registrati/azienda/2",
  errors: [
    {
      description:
        "Compila dati azienda, credenziali e consenso privacy prima di creare il primo annuncio.",
      fieldIds: ["vat", "company", "email", "password", "confirm-password", "privacy"],
      id: "missing-fields",
      title: "Registrazione incompleta",
    },
  ],
  fields: [
    {
      id: "vat",
      inputType: "text",
      kind: "input",
      label: "partita IVA*",
      placeholder: "inserisci p. IVA",
      required: true,
    },
    {
      id: "company",
      inputType: "text",
      kind: "input",
      label: "ragione sociale*",
      placeholder: "inserisci ragione sociale",
      required: true,
    },
    {
      id: "email",
      inputType: "email",
      kind: "input",
      label: "email*",
      placeholder: "inserisci la mail",
      required: true,
    },
    {
      id: "password",
      inputType: "password",
      kind: "input",
      label: "password*",
      placeholder: "inserisci una password",
      required: true,
    },
    {
      id: "confirm-password",
      inputType: "password",
      kind: "input",
      label: "conferma password*",
      placeholder: "re-inserisci la password",
      required: true,
    },
    privacyField,
  ],
  footerPrompt: {
    label: "hai gi\u00E0 un account?",
    linkLabel: "accedi",
    linkTo: "/accedi",
  },
  id: "register-company",
  providerButtons: true,
  subtitle: "Compila il tuo primo annuncio per registrarti",
  title: "Benvenut*!",
  tone: "violet",
} as const satisfies AuthViewModel;

export const authViewModels = {
  candidateRegistration: candidateRegistrationAuthViewModel,
  companyRegistration: companyRegistrationAuthViewModel,
  login: loginAuthViewModel,
} as const;
