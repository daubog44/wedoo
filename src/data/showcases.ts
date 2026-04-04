import {
  companyProfileSummaryMock,
  mapCompanyProfileSummaryToShowcase,
} from "./company-profile";
import type { PortalRole, RoleShowcase } from "./types";

export const roleShowcases = {
  candidate: {
    badge: "Percorso candidato",
    cta: "/registrati/candidato/1",
    description:
      "Per chi cerca il primo ruolo senza perdere settimane su annunci vuoti o fuori target.",
    metrics: [
      { label: "Flusso rapido di onboarding", value: "2 step" },
      { label: "Aree SDG monitorate", value: "17" },
      { label: "Costo per chi cerca lavoro", value: "0 euro" },
    ],
    slides: [
      {
        description:
          "Collaboriamo con ITS e atenei per un lavoro giusto e sostenibile, in linea con i 17 obiettivi dell'Agenda 2030.",
        image: "candidato_1.png",
        title: "Pensato per chi cerca.\nE fatica a trovare.",
      },
      {
        description:
          "Basta perdite di tempo con annunci non in linea con la tua ricerca, l'AI ti propone solo offerte coerenti con le tue richieste. Il tutto sempre sotto il tuo controllo.",
        image: "candidato_2.png",
        title: "Matching intelligente\nma umano.",
      },
      {
        description: "Wedoo è gratuito per chi cerca lavoro. Sempre.",
        image: "candidato_3.png",
        title: "Zero costi, zero dubbi",
      },
      {
        description:
          "Bastano poche informazioni per partire. Poi puoi aggiungere dettagli con calma, al tuo ritmo.",
        image: "candidato_4.png",
        title: "Profilo snello,\nniente fronzoli",
      },
      {
        description:
          "Ogni annuncio viene esaminato da un team di esperti, per garantirti la maggiore trasparenza e affidabilità.",
        image: "candidato_5.png",
        title: "Niente washing,\nsolo coerenza e certificazioni.",
      },
    ],
    title: "Pensato per chi cerca.\nE fatica a trovare.",
  },
  company: mapCompanyProfileSummaryToShowcase(companyProfileSummaryMock),
} satisfies Record<PortalRole, RoleShowcase>;
