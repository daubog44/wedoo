import { faqGroups } from "./core";
import type { FaqGroup } from "./types";

export type InfoTextRun = {
  emphasis?: boolean;
  text: string;
};

export type InfoTextParagraph = readonly InfoTextRun[];

export type InfoNarrativeBlock = {
  id: string;
  paragraphs: readonly InfoTextParagraph[];
  tone: "filled" | "outline" | "plain";
};

export type InfoPageResponse = {
  faq: {
    groups: readonly FaqGroup[];
    heading: string;
  };
  goals: {
    diagramAlt: string;
    heading: string;
    paragraphs: readonly InfoTextParagraph[];
  };
  story: {
    blocks: readonly InfoNarrativeBlock[];
    heading: string;
  };
  topBar: {
    languageLabel: string;
  };
};

export const infoPageResponseMock = {
  faq: {
    groups: faqGroups,
    heading: "dubbi? le FAQ ti aiutano!",
  },
  goals: {
    diagramAlt: "Matrice purpose tra azienda e mansione",
    heading: "17 obiettivi per il futuro",
    paragraphs: [
      [
        { text: "Quando arriva una nuova offerta verifichiamo prima che l'azienda abbia un " },
        { emphasis: true, text: "impegno concreto verso la sostenibilita" },
        { text: "." },
      ],
      [
        { text: "Poi leggiamo la mansione: deve contribuire " },
        { emphasis: true, text: "ad almeno uno dei 17 SDG dell'Agenda 2030" },
        { text: "." },
      ],
      [
        { text: "Se l'" },
        { emphasis: true, text: "azienda e sostenibile ma il ruolo lo e solo in parte" },
        { text: ", l'annuncio resta visibile ma lo segnaliamo con chiarezza." },
      ],
      [
        { text: "Per rendere l'impegno " },
        { emphasis: true, text: "autentico e verificabile" },
        { text: ", chiediamo certificazioni o report di sostenibilita." },
      ],
    ],
  },
  story: {
    blocks: [
      {
        id: "story-outline",
        paragraphs: [
          [
            { text: "Siamo due studenti di digital marketing partiti da uno stage a Milano con un'idea semplice: il lavoro serve, ma non a qualsiasi costo." },
          ],
          [
            { emphasis: true, text: "Sostenibilita, clima, diritti:" },
            { text: " vogliamo contesti che riconoscano i nostri valori, non solo ruoli da riempire." },
          ],
        ],
        tone: "outline",
      },
      {
        id: "story-plain",
        paragraphs: [
          [
            { text: "Nel percorso ci siamo scontrati con la realta: trovare uno " },
            { emphasis: true, text: "stage" },
            { text: " e spesso piu difficile del lavoro stesso." },
          ],
          [
            { text: "Le aziende chiedono esperienza, ma se nessuno te la da, da dove inizi?" },
          ],
        ],
        tone: "plain",
      },
      {
        id: "story-filled",
        paragraphs: [
          [
            { text: "E cosi che nasce " },
            { emphasis: true, text: "Wedoo" },
            { text: ": un'app pensata per facilitare il passaggio dalla scuola al lavoro." },
          ],
          [
            { text: "Con il supporto di Universita e ITS aiutiamo la " },
            { emphasis: true, text: "GenZ" },
            { text: " a trovare stage, tirocini e opportunita in linea con i propri valori." },
          ],
        ],
        tone: "filled",
      },
    ],
    heading: "noi x noi",
  },
  topBar: {
    languageLabel: "ita",
  },
} as const satisfies InfoPageResponse;
