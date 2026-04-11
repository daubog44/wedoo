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
        { text: "Quando arriva una nuova offerta, prima di tutto verifichiamo che l'azienda abbia un " },
        { emphasis: true, text: "impegno concreto verso la sostenibilita" },
        { text: "." },
      ],
      [
        { text: "Se l'azienda e allineata, valutiamo poi la mansione proposta: deve contribuire " },
        { emphasis: true, text: "almeno a uno dei 17 Obiettivi di Sviluppo Sostenibile dell'Agenda 2030" },
        { text: "." },
      ],
      [
        { text: "Se invece l'" },
        { emphasis: true, text: "azienda e sostenibile ma il ruolo non lo e completamente" },
        { text: ", l'annuncio " },
        { emphasis: true, text: "resta valido" },
        { text: ", ma segnaliamo chiaramente che quella posizione e meno in linea con i valori che vogliamo promuovere." },
      ],
      [
        { text: "Per garantire che l'" },
        { emphasis: true, text: "impegno sia autentico e verificabile" },
        { text: ", chiediamo alle aziende di caricare " },
        { emphasis: true, text: "certificazioni" },
        { text: " o, in mancanza, il loro " },
        { emphasis: true, text: "report di sostenibilita" },
        { text: "." },
      ],
    ],
  },
  story: {
    blocks: [
      {
        id: "story-outline",
        paragraphs: [
          [
            { text: "Siamo due ragazzi, studenti di digital marketing, partiti da uno stage a Milano, con una cosa ben chiara in testa: il lavoro serve, ma non a qualsiasi costo." },
          ],
          [
            { emphasis: true, text: "Sostenibilita, clima, diritti:" },
            { text: " vogliamo contesti che " },
            { emphasis: true, text: "riconoscano i nostri valori" },
            { text: ", e non offrano solo ruoli da riempire." },
          ],
        ],
        tone: "outline",
      },
      {
        id: "story-plain",
        paragraphs: [
          [
            { text: "Durante il nostro percorso ci siamo scontrati con la " },
            { emphasis: true, text: "realta" },
            { text: ": trovare uno " },
            { emphasis: true, text: "stage" },
            { text: " e complicato, spesso piu del lavoro stesso." },
          ],
          [
            { text: "Le aziende cercano giovani con " },
            { emphasis: true, text: "esperienza" },
            { text: "... ma se nessuno te la da, come fai?" },
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
            { text: ": un'app pensata per " },
            { emphasis: true, text: "facilitare il passaggio dalla scuola al lavoro" },
            { text: "." },
          ],
          [
            { text: "Con il supporto di " },
            { emphasis: true, text: "Universita e ITS" },
            { text: ", aiutiamo i ragazzi della " },
            { emphasis: true, text: "GenZ" },
            { text: " a trovare stage, tirocini e opportunita in linea con i loro valori, non solo con un titolo di studio." },
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
