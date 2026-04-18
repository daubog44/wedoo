export type PasswordRecoveryField = {
  id: "current-password" | "new-password" | "confirm-password";
  label: string;
  placeholder: string;
};

export type PasswordRecoveryViewModel = {
  consentLabel: string;
  ctaLabel: string;
  fields: readonly PasswordRecoveryField[];
  redirectTo: string;
  reloginNote: string;
  supportPrompt: {
    intro: string;
    linkLabel: string;
    linkTo: string;
    outro: string;
  };
  title: string;
};

export type CustomerSupportChannel = {
  href: string;
  icon: "mail" | "phone";
  id: "email" | "phone";
  label: string;
};

export type CustomerSupportAudience = {
  channels: readonly CustomerSupportChannel[];
  description: string;
  id: "candidate" | "company";
  title: string;
  tone: "mint" | "violet";
};

export type CustomerSupportViewModel = {
  title: string;
  audiences: readonly CustomerSupportAudience[];
};

export const passwordRecoveryViewModel = {
  consentLabel: "accetto i termini e le condizioni",
  ctaLabel: "salva",
  fields: [
    {
      id: "current-password",
      label: "inserisci vecchia password",
      placeholder: "inserisci la vecchia password",
    },
    {
      id: "new-password",
      label: "inserisci nuova password",
      placeholder: "inserisci la nuova password",
    },
    {
      id: "confirm-password",
      label: "conferma password",
      placeholder: "conferma la tua password",
    },
  ],
  redirectTo: "/accedi",
  reloginNote: "al salvataggio sara necessario accedere nuovamente alla piattaforma",
  supportPrompt: {
    intro: "non riesci ad effettuare il cambio della password?",
    linkLabel: "assistenza clienti",
    linkTo: "/assistenza-clienti",
    outro: ", saremo felici di aiutarti!",
  },
  title: "Password dimenticata",
} as const satisfies PasswordRecoveryViewModel;

// `660:1217` mixes support copy between candidate/company cards; the desktop
// frame `660:725` is the more coherent source of truth, so the support labels
// are normalized by audience and reused on both viewports.
export const customerSupportViewModel = {
  audiences: [
    {
      channels: [
        {
          href: "tel:+390280000001",
          icon: "phone",
          id: "phone",
          label: "supporto aziende",
        },
        {
          href: "mailto:aziende@wedoo.it",
          icon: "mail",
          id: "email",
          label: "invia una mail",
        },
      ],
      description:
        "chiama il numero gratuito dedicato alle aziende o invia una mail spiegando il tuo problema, saremo felici di aiutarti!",
      id: "company",
      title: "Azienda",
      tone: "violet",
    },
    {
      channels: [
        {
          href: "tel:+390280000002",
          icon: "phone",
          id: "phone",
          label: "supporto candidati",
        },
        {
          href: "mailto:candidati@wedoo.it",
          icon: "mail",
          id: "email",
          label: "invia una mail",
        },
      ],
      description:
        "chiama il numero gratuito o invia una mail spiegando il tuo problema, saremo felici di aiutarti!",
      id: "candidate",
      title: "Candidato",
      tone: "mint",
    },
  ],
  title: "Assistenza clienti",
} as const satisfies CustomerSupportViewModel;
