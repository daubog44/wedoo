import { knowledgeContent } from "../../data/core";
import type { KnowledgeKind } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteFooter, SiteIcon, TopLogoBar } from "../site";
import { ButtonLink, Surface } from "../ui/index";

const hubConfig = {
  articles: {
    backgroundClass:
      "bg-[radial-gradient(circle_at_top,_rgba(189,178,232,0.28),_rgba(255,255,255,0.98)_40%,_white_100%)]",
    chips: ["letture rapide", "candidati", "aziende"],
    description:
      "Guide e checklist per leggere annunci, brand e impatto senza rumore.",
    eyebrow: "Articoli Wedoo",
    featureBody:
      "Contesto prima della candidatura, esempi concreti e strumenti riusabili subito.",
    featureEyebrow: "perche leggerli",
    featureImage: "obiettivi.jpg",
    featureImageAlt: "Obiettivi e metriche di impatto",
    featureTitle: "Impatto, matching e trasparenza spiegati bene",
    heroPanelClass: "bg-brand-violet-deep text-white",
    heroSecondaryClass: "bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(248,244,255,0.92))]",
    metricToneClass: "border-white/15 bg-white/10 text-white",
    notesClass: "bg-brand-gold/16",
    notesDescription:
      "Usali per capire un'offerta prima di investire tempo su candidatura o screening.",
    notesTitle: "Come usare questa sezione",
    outline: [
      "Apri le checklist prima di confrontare due offerte simili.",
      "Usa gli articoli per scovare claim deboli o informazioni mancanti.",
      "Poi passa alla bacheca e controlla se il ruolo regge davvero.",
    ],
    relatedCardLabel: "Podcast",
    relatedHref: "/podcast",
    relatedLabel: "Podcast",
    switchTone: "gold" as const,
    title:
      "Contenuti pratici per leggere lavoro, impatto e sostenibilita senza fuffa.",
  },
  podcasts: {
    backgroundClass:
      "bg-[radial-gradient(circle_at_top,_rgba(105,242,196,0.24),_rgba(255,255,255,0.98)_42%,_white_100%)]",
    chips: ["episodi brevi", "ascolto mobile", "prime esperienze"],
    description:
      "Episodi brevi su primi ruoli, recruiting e impatto raccontati senza slogan.",
    eyebrow: "Podcast Wedoo",
    featureBody:
      "Episodi corti, chiari e utili mentre scorri annunci o sistemi il CV.",
    featureEyebrow: "cosa aspettarti",
    featureImage: "pausa.webp",
    featureImageAlt: "Preview di un episodio Wedoo",
    featureTitle: "Ascolta il lato piu umano del matching",
    heroPanelClass: "bg-brand-mint-200 text-brand-ink",
    heroSecondaryClass: "bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(239,252,247,0.92))]",
    metricToneClass: "border-black/10 bg-white/75 text-brand-ink",
    notesClass: "bg-brand-violet-deep text-white",
    notesDescription:
      "Non sostituiscono la bacheca: la preparano. Ti aiutano a leggere tono, aspettative e segnali deboli.",
    notesTitle: "Come usare questa sezione",
    outline: [
      "Ascolta mentre confronti aziende o filtri annunci.",
      "Segnati domande e formule da riusare nei colloqui.",
      "Alterna audio e articoli per passare da ispirazione a azione.",
    ],
    relatedCardLabel: "Articolo",
    relatedHref: "/articoli",
    relatedLabel: "Articoli",
    switchTone: "mint" as const,
    title:
      "Episodi brevi per capire come si costruisce un lavoro credibile gia dal primo contatto.",
  },
} as const satisfies Record<
  KnowledgeKind,
  {
    backgroundClass: string;
    chips: string[];
    description: string;
    eyebrow: string;
    featureBody: string;
    featureEyebrow: string;
    featureImage: string;
    featureImageAlt: string;
    featureTitle: string;
    heroPanelClass: string;
    heroSecondaryClass: string;
    metricToneClass: string;
    notesClass: string;
    notesDescription: string;
    notesTitle: string;
    outline: string[];
    relatedCardLabel: string;
    relatedHref: string;
    relatedLabel: string;
    switchTone: "gold" | "mint";
    title: string;
  }
>;

const cardMeta = {
  articles: [
    { label: "Guida", value: "7 min" },
    { label: "Checklist", value: "5 punti" },
    { label: "Approfondimento", value: "3 segnali" },
    { label: "Toolkit", value: "Subito utile" },
  ],
  podcasts: [
    { label: "Episodio", value: "12 min" },
    { label: "Talk", value: "9 min" },
    { label: "Note vocali", value: "8 min" },
    { label: "Roundtable", value: "14 min" },
  ],
} as const;

const metricCopy = {
  articles: [
    { label: "contenuti editoriali", value: `${knowledgeContent.articles.length}` },
    { label: "audience servite", value: "2" },
    { label: "claim inutili", value: "0" },
  ],
  podcasts: [
    { label: "episodi mock", value: `${knowledgeContent.podcasts.length}` },
    { label: "durata media", value: "10 min" },
    { label: "tone of voice", value: "diretto" },
  ],
} as const;

const relatedEyebrow = {
  articles: "ascolta anche",
  podcasts: "leggi anche",
} as const satisfies Record<KnowledgeKind, string>;

function toExcerpt(text: string, limit = 92) {
  if (text.length <= limit) {
    return text;
  }

  const slice = text.slice(0, limit).trimEnd();
  const safe = slice.includes(" ") ? slice.slice(0, slice.lastIndexOf(" ")) : slice;
  return `${safe}...`;
}

function HubChipRow({
  chips,
  kind,
}: {
  chips: readonly string[];
  kind: KnowledgeKind;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span
          className={cn(
            "inline-flex rounded-full border px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
            kind === "articles"
              ? "border-white/12 bg-white/10 text-white/74"
              : "border-black/8 bg-white/84 text-brand-ink/72",
          )}
          key={chip}
        >
          {chip}
        </span>
      ))}
    </div>
  );
}

function HubHero({ kind }: { kind: KnowledgeKind }) {
  const config = hubConfig[kind];

  return (
    <section className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]">
      <Surface className="overflow-hidden">
        <div className={cn("rounded-[1.4rem] p-5 sm:p-6", config.heroPanelClass)}>
          <HubChipRow chips={config.chips} kind={kind} />

          <div className="mt-5 max-w-[34rem] space-y-3">
            <p
              className={cn(
                "text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
                kind === "articles" ? "text-white/66" : "text-brand-ink/62",
              )}
            >
              {config.eyebrow}
            </p>
            <h1 className="max-w-[12ch] text-[2.35rem] leading-[0.98] sm:text-[3.05rem]">
              {config.title}
            </h1>
            <p
              className={cn(
                "max-w-[30rem] text-[0.95rem] leading-6",
                kind === "articles" ? "text-white/78" : "text-brand-ink/72",
              )}
            >
              {config.description}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {metricCopy[kind].map((metric) => (
              <div
                className={cn(
                  "rounded-[1rem] border px-3.5 py-3 shadow-[0_18px_36px_-30px_rgba(16,25,36,0.18)]",
                  config.metricToneClass,
                )}
                key={metric.label}
              >
                <p className="text-[1.35rem] font-bold tracking-tight">{metric.value}</p>
                <p
                  className={cn(
                    "mt-1.5 text-[0.78rem] leading-5",
                    kind === "articles" ? "text-white/72" : "text-brand-ink/68",
                  )}
                >
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Surface>

      <Surface className="overflow-hidden">
        <div
          className={cn(
            "grid gap-4 rounded-[1.4rem] p-4 sm:grid-cols-[1.12fr_0.88fr] sm:p-5",
            config.heroSecondaryClass,
          )}
        >
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[1.15rem] border border-white/80 shadow-[0_18px_42px_-34px_rgba(16,25,36,0.24)]">
              <img
                alt={config.featureImageAlt}
                className="aspect-[4/3] w-full object-cover"
                src={assetPath(config.featureImage)}
              />
            </div>

            <div className="rounded-[1.1rem] border border-black/8 bg-white/84 px-4 py-4">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand-violet">
                {config.featureEyebrow}
              </p>
              <h2 className="mt-2 text-[1.35rem] leading-[1.06] text-brand-ink">
                {config.featureTitle}
              </h2>
              <p className="mt-2 text-[0.9rem] leading-6 text-slate-600">{config.featureBody}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 rounded-[1.1rem] border border-black/8 bg-white/78 px-4 py-4">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-slate-400">
                ritmo editoriale
              </p>
              <p className="mt-3 text-[1rem] leading-[1.5] text-brand-ink">
                Poche carte forti, meno testo duplicato, collegamenti chiari tra lettura, ascolto e bacheca.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink to={config.relatedHref} tone={config.switchTone}>
                Apri {config.relatedLabel.toLowerCase()}
              </ButtonLink>
              <ButtonLink to="/info" tone="ghost">
                Vai alla pagina info
              </ButtonLink>
            </div>
          </div>
        </div>
      </Surface>
    </section>
  );
}

function HubLeadCard({
  description,
  kind,
  meta,
  title,
}: {
  description: string;
  kind: KnowledgeKind;
  meta: { label: string; value: string };
  title: string;
}) {
  return (
    <Surface className="overflow-hidden">
      <div
        className={cn(
          "rounded-[1.35rem] p-5",
          kind === "articles"
            ? "bg-[linear-gradient(170deg,#f8f4ff_0%,#ffffff_100%)]"
            : "bg-[linear-gradient(170deg,#eefdf7_0%,#ffffff_100%)]",
        )}
      >
        <div className="flex items-center justify-between gap-4">
          <span
            className={cn(
              "inline-flex rounded-full px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em]",
              kind === "articles"
                ? "bg-brand-violet/10 text-brand-violet"
                : "bg-brand-mint/28 text-brand-mint-deep",
            )}
          >
            {meta.label}
          </span>
          <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
            {meta.value}
          </span>
        </div>

        <h2 className="mt-5 max-w-[18ch] text-[1.8rem] leading-[1.02] text-brand-ink">{title}</h2>
        <p className="mt-3 max-w-[34rem] text-[0.98rem] leading-6 text-slate-600">
          {toExcerpt(description, 150)}
        </p>

        <div className="mt-6 flex items-center justify-between gap-4 border-t border-black/6 pt-4">
          <p className="text-[0.82rem] font-semibold text-slate-500">Apri il contenuto</p>
          <span
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-full",
              kind === "articles"
                ? "bg-brand-violet/10 text-brand-violet"
                : "bg-brand-mint/28 text-brand-mint-deep",
            )}
          >
            <SiteIcon className="h-4 w-4" name="arrow-right" />
          </span>
        </div>
      </div>
    </Surface>
  );
}

function HubCompactCard({
  description,
  kind,
  meta,
  title,
}: {
  description: string;
  kind: KnowledgeKind;
  meta: { label: string; value: string };
  title: string;
}) {
  return (
    <article className="grid gap-3 rounded-[1.15rem] border border-black/6 bg-white/82 px-4 py-4 shadow-[0_18px_42px_-36px_rgba(16,25,36,0.18)] sm:grid-cols-[auto_1fr_auto] sm:items-start">
      <div className="flex items-center gap-2 sm:block">
        <span
          className={cn(
            "inline-flex rounded-full px-2.5 py-1 text-[0.66rem] font-semibold uppercase tracking-[0.18em]",
            kind === "articles"
              ? "bg-brand-violet/10 text-brand-violet"
              : "bg-brand-mint/28 text-brand-mint-deep",
          )}
        >
          {meta.label}
        </span>
        <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400 sm:mt-2 sm:block">
          {meta.value}
        </span>
      </div>

      <div>
        <h3 className="text-[1.04rem] leading-[1.08] text-brand-ink">{title}</h3>
        <p className="mt-2 text-[0.86rem] leading-6 text-slate-500">{toExcerpt(description, 96)}</p>
      </div>

      <span
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full self-center justify-self-start sm:justify-self-end",
          kind === "articles"
            ? "bg-brand-violet/10 text-brand-violet"
            : "bg-brand-mint/28 text-brand-mint-deep",
        )}
      >
        <SiteIcon className="h-4 w-4" name="arrow-right" />
      </span>
    </article>
  );
}

function HubNotesPanel({ kind }: { kind: KnowledgeKind }) {
  const config = hubConfig[kind];

  return (
    <Surface>
      <div className={cn("rounded-[1.25rem] p-5", config.notesClass)}>
        <p
          className={cn(
            "text-[0.72rem] font-semibold uppercase tracking-[0.22em]",
            kind === "articles" ? "text-brand-violet" : "text-white/65",
          )}
        >
          {config.notesTitle}
        </p>
        <p
          className={cn(
            "mt-3 text-[0.9rem] leading-6",
            kind === "articles" ? "text-slate-600" : "text-white/78",
          )}
        >
          {config.notesDescription}
        </p>
        <div className="mt-5 grid gap-3">
          {config.outline.map((item) => (
            <div className="flex items-start gap-3" key={item}>
              <span
                className={cn(
                  "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-xl",
                  kind === "articles" ? "bg-white text-brand-violet" : "bg-white/12 text-white",
                )}
              >
                <SiteIcon className="h-4 w-4" name="document" />
              </span>
              <p
                className={cn(
                  "text-[0.88rem] leading-6",
                  kind === "articles" ? "text-slate-700" : "text-white/82",
                )}
              >
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Surface>
  );
}

function HubRelatedPanel({ kind }: { kind: KnowledgeKind }) {
  const config = hubConfig[kind];
  const relatedItems =
    kind === "articles"
      ? knowledgeContent.podcasts.slice(0, 2)
      : knowledgeContent.articles.slice(0, 2);

  return (
    <Surface>
      <div className="rounded-[1.25rem] border border-black/6 bg-white/84 p-5">
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-slate-400">
          {relatedEyebrow[kind]}
        </p>
        <h2 className="mt-3 text-[1.35rem] leading-[1.08] text-brand-ink">
          Passa anche da {config.relatedLabel.toLowerCase()}
        </h2>
        <div className="mt-4 grid gap-3">
          {relatedItems.map((item) => (
            <div className="rounded-[1rem] border border-black/6 bg-white/90 px-4 py-4" key={item.id}>
              <p className="text-[0.75rem] font-semibold uppercase tracking-[0.18em] text-brand-violet">
                {config.relatedCardLabel}
              </p>
              <h3 className="mt-2 text-[1rem] leading-[1.08] text-brand-ink">{item.title}</h3>
              <p className="mt-2 text-[0.84rem] leading-6 text-slate-500">
                {toExcerpt(item.description, 84)}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-5">
          <ButtonLink to={config.relatedHref} tone={config.switchTone}>
            Apri {config.relatedLabel.toLowerCase()}
          </ButtonLink>
        </div>
      </div>
    </Surface>
  );
}

export function KnowledgeHubPage({ kind }: { kind: KnowledgeKind }) {
  const items = knowledgeContent[kind];
  const leadItem = items[0];
  const compactItems = items.slice(1);

  return (
    <div className={cn("min-h-screen bg-brand-page", hubConfig[kind].backgroundClass)}>
      <TopLogoBar />
      <main className="pb-16 pt-4">
        <div className="section-shell space-y-5">
          <HubHero kind={kind} />

          <section className="grid gap-5 xl:grid-cols-[1.08fr_0.92fr]">
            <div className="space-y-4">
              <HubLeadCard
                description={leadItem.description}
                kind={kind}
                meta={cardMeta[kind][0]}
                title={leadItem.title}
              />

              <div className="grid gap-3">
                {compactItems.map((item, index) => (
                  <HubCompactCard
                    description={item.description}
                    key={item.id}
                    kind={kind}
                    meta={cardMeta[kind][index + 1] ?? cardMeta[kind][cardMeta[kind].length - 1]}
                    title={item.title}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              <HubNotesPanel kind={kind} />
              <HubRelatedPanel kind={kind} />
            </div>
          </section>
        </div>
      </main>
      <SiteFooter className="mt-0" />
    </div>
  );
}
