import type { ArticlePreview, KnowledgeEntry, PodcastPreview } from "./types";

export const articlePreviewsMock = [
  {
    audienceLabel: "Per team HR e brand",
    excerpt:
      "Come scrivere offerte che parlano di impatto senza scivolare nel greenwashing e senza nascondere salario o aspettative.",
    id: "employer-branding-esg",
    readingTimeLabel: "7 min",
    title: "Employer branding ESG senza facciata",
  },
  {
    audienceLabel: "Per candidati junior",
    excerpt:
      "Una checklist pratica per leggere un annuncio sostenibile: range economico, modello di lavoro, obiettivi e responsabilita.",
    id: "leggere-annuncio",
    readingTimeLabel: "5 min",
    title: "Come leggere un annuncio prima di candidarti",
  },
  {
    audienceLabel: "Per entrambe le audience",
    excerpt:
      "Perche un buon matching non promette magia ma riduce rumore, frizione e candidature poco rilevanti.",
    id: "matching-credibile",
    readingTimeLabel: "6 min",
    title: "Matching credibile: meno hype, piu contesto",
  },
  {
    audienceLabel: "Per primi ruoli e stage",
    excerpt:
      "Dal CV ai primi colloqui: segnali utili per capire se un'opportunita ti fara crescere oppure ti terra solo occupato.",
    id: "segnali-primo-ruolo",
    readingTimeLabel: "8 min",
    title: "Primo ruolo, primi segnali da leggere bene",
  },
] as const satisfies readonly ArticlePreview[];

export const podcastPreviewsMock = [
  {
    audienceLabel: "Per candidati in orientamento",
    durationLabel: "12 min",
    excerpt:
      "Conversazioni brevi su primi ruoli, recruiting trasparente e nuove aspettative della Gen Z nel mercato del lavoro.",
    formatLabel: "Talk",
    id: "no-hype",
    title: "No hype: lavoro, impatto, realta",
  },
  {
    audienceLabel: "Per aziende e HR",
    durationLabel: "9 min",
    excerpt:
      "PMI, startup e team HR raccontano cosa significa pubblicare offerte piu leggibili e piu concrete.",
    formatLabel: "Roundtable",
    id: "aziende-credibili",
    title: "Aziende credibili",
  },
  {
    audienceLabel: "Per stage e first role",
    durationLabel: "8 min",
    excerpt:
      "Un formato piu operativo dedicato a portfolio, CV, colloqui e segnali deboli per chi cerca il primo stage.",
    formatLabel: "Note vocali",
    id: "first-role",
    title: "First role notes",
  },
  {
    audienceLabel: "Per chi legge annunci",
    durationLabel: "14 min",
    excerpt:
      "HR, founder e team di prodotto raccontano cosa rende un annuncio leggibile gia prima del colloquio.",
    formatLabel: "Episodio",
    id: "hiring-senza-fuffa",
    title: "Hiring senza fuffa",
  },
] as const satisfies readonly PodcastPreview[];

export function mapArticlePreviewToKnowledgeEntry(
  preview: ArticlePreview,
): KnowledgeEntry {
  return {
    description: preview.excerpt,
    id: preview.id,
    title: preview.title,
  };
}

export function mapPodcastPreviewToKnowledgeEntry(
  preview: PodcastPreview,
): KnowledgeEntry {
  return {
    description: preview.excerpt,
    id: preview.id,
    title: preview.title,
  };
}

