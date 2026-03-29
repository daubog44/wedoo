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
  company: {
    badge: "Percorso azienda",
    cta: "/registrati/azienda/1",
    description:
      "Per team HR, startup e PMI che vogliono parlare in modo credibile con la Gen Z.",
    metrics: [
      { label: "Passi per pubblicare il primo annuncio", value: "5 step" },
      { label: "Target principale", value: "Gen Z" },
      { label: "Posizionamento", value: "ESG first" },
    ],
    slides: [
      {
        description:
          "Parli con una community in cerca di senso, impatto e futuro.",
        image: "azienda_1.png",
        title: "Target ultra preciso: Gen Z\norientati alla sostenibilità",
      },
      {
        description:
          "I candidati vogliono coerenza, e noi ti guidiamo a mostrarla al meglio.",
        image: "azienda_2.png",
        title: "Verifica degli annunci\ne trasparenza",
      },
      {
        description:
          "Il nostro sistema suggerisce solo candidati in linea, evitando candidature poco rilevanti (sempre con la possibilità di poterle ricercare manualmente).",
        image: "azienda_3.png",
        title: "Matching profilato,\nrisultati reali",
      },
      {
        description:
          "Badge, dati, certificazioni:\nracconta chi sei davvero,\nnoi ti aiutiamo.",
        image: "azienda_4.png",
        title: "Employer Branding guidato",
      },
      {
        description:
          "Non serve essere grandi:\nse fai le cose per bene, qui\nsei nel posto giusto.",
        image: "azienda_5.png",
        title: "Soluzioni anche per\nstartup e PMI",
      },
      {
        description:
          "In futuro prevediamo di inserire funzioni a pagamento per aiutare le aziende ad aumentare la propria visibilità.",
        image: "azienda_6.png",
        title: "Contenuti gratuiti\nper la versione base",
      },
    ],
    title: "Target ultra preciso: Gen Z\norientati alla sostenibilità",
  },
} satisfies Record<PortalRole, RoleShowcase>;
