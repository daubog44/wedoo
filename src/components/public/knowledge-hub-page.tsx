import { knowledgeContent, routeMap } from "../../data/core";
import type { KnowledgeKind } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteFooter, SiteIcon, TopLogoBar } from "../site";
import { ButtonLink, Surface } from "../ui/index";

const hubConfig = {
  articles: {
    backgroundClass:
      "bg-[radial-gradient(circle_at_top,_rgba(189,178,232,0.35),_rgba(255,255,255,0.96)_45%,_white_100%)]",
    chips: ["letture rapide", "candidati", "aziende"],
    description:
      "Guide brevi, checklist e casi d'uso per leggere annunci, valutare il livello di trasparenza di un brand e capire se un ruolo ti assomiglia davvero.",
    eyebrow: "Articoli Wedoo",
    featureBody:
      "Qui trovi il lato editoriale del progetto: contesto prima della candidatura, esempi concreti e un linguaggio pensato per togliere rumore invece di aggiungerne.",
    featureEyebrow: "perche leggerli",
    featureImage: "obiettivi.jpg",
    featureImageAlt: "Obiettivi e metriche di impatto",
    featureTitle: "Impatto, matching e trasparenza spiegati bene",
    heroPanelClass: "pattern-grid bg-brand-violet-deep text-white",
    metricToneClass: "border-white/15 bg-white/10 text-white",
    notesClass: "bg-brand-gold/18",
    notesDescription:
      "Apri questi contenuti quando vuoi capire meglio come leggere un'offerta, non solo quando stai gia per cliccare candidati.",
    notesTitle: "Come usare questa sezione",
    outline: [
      "Leggi le checklist prima di confrontare due offerte simili.",
      "Usa gli articoli per riconoscere claim deboli o informazioni mancanti.",
      "Passa poi alla bacheca e verifica quanto il ruolo mantiene la promessa.",
    ],
    relatedCardLabel: "Podcast",
    relatedHref: "/podcast",
    relatedLabel: "Podcast",
    relatedPanelClass: "bg-white/88",
    switchTone: "gold" as const,
    title:
      "Contenuti pratici per leggere lavoro, impatto e sostenibilita senza fuffa.",
  },
  podcasts: {
    backgroundClass:
      "bg-[radial-gradient(circle_at_top,_rgba(105,242,196,0.32),_rgba(255,255,255,0.96)_42%,_white_100%)]",
    chips: ["episodi brevi", "ascolto mobile", "prime esperienze"],
    description:
      "Una raccolta audio pensata per chi vuole sentire voci, dubbi e decisioni reali su primi ruoli, recruiting e impatto raccontato senza slogan.",
    eyebrow: "Podcast Wedoo",
    featureBody:
      "Gli episodi sono corti, chiari e utili anche mentre scorri annunci o sistemi il CV: meno teoria astratta, piu segnali concreti da portarti dietro.",
    featureEyebrow: "cosa aspettarti",
    featureImage: "pausa.webp",
    featureImageAlt: "Preview di un episodio Wedoo",
    featureTitle: "Ascolta il lato piu umano del matching",
    heroPanelClass: "bg-brand-mint-200 text-brand-ink",
    metricToneClass: "border-black/10 bg-white/75 text-brand-ink",
    notesClass: "bg-brand-violet-deep text-white",
    notesDescription:
      "I podcast non sostituiscono la bacheca: la preparano. Ti aiutano a leggere tono, aspettative e segnali deboli prima di scegliere dove investire tempo.",
    notesTitle: "Come usare questa sezione",
    outline: [
      "Ascolta un episodio mentre confronti aziende o filtri annunci.",
      "Segnati strumenti, domande e formule che puoi riusare nei colloqui.",
      "Alterna audio e articoli per passare da ispirazione a azione.",
    ],
    relatedCardLabel: "Articolo",
    relatedHref: "/articoli",
    relatedLabel: "Articoli",
    relatedPanelClass: "bg-white/88",
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
    metricToneClass: string;
    notesClass: string;
    notesDescription: string;
    notesTitle: string;
    outline: string[];
    relatedCardLabel: string;
    relatedHref: string;
    relatedLabel: string;
    relatedPanelClass: string;
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
} as const satisfies Record<
  KnowledgeKind,
  ReadonlyArray<{ label: string; value: string }>
>;

const relatedEyebrow = {
  articles: "ascolta anche",
  podcasts: "leggi anche",
} as const satisfies Record<KnowledgeKind, string>;

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
} as const satisfies Record<
  KnowledgeKind,
  ReadonlyArray<{ label: string; value: string }>
>;

export function KnowledgeHubPage({ kind }: { kind: KnowledgeKind }) {
  const config = hubConfig[kind];
  const items = knowledgeContent[kind];
  const relatedItems =
    kind === "articles"
      ? knowledgeContent.podcasts.slice(0, 2)
      : knowledgeContent.articles.slice(0, 2);

  return (
    <div className={cn("min-h-screen bg-brand-page", config.backgroundClass)}>
      <TopLogoBar />
      <main className="pb-16 pt-4">
        <div className="section-shell space-y-6">
          <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <Surface className="overflow-hidden">
              <div
                className={cn(
                  "relative rounded-[2rem] p-6 sm:p-8",
                  config.heroPanelClass,
                )}
              >
                <div className="flex flex-wrap gap-2">
                  {config.chips.map((chip) => (
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                        kind === "articles"
                          ? "border-white/15 bg-white/10 text-white/80"
                          : "border-black/10 bg-white/80 text-brand-ink/70",
                      )}
                      key={chip}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-6 max-w-3xl space-y-4">
                  <p
                    className={cn(
                      "text-sm font-semibold uppercase tracking-[0.24em]",
                      kind === "articles"
                        ? "text-white/65"
                        : "text-brand-ink/70",
                    )}
                  >
                    {config.eyebrow}
                  </p>
                  <h1 className="text-4xl leading-tight sm:text-5xl">
                    {config.title}
                  </h1>
                  <p
                    className={cn(
                      "max-w-3xl text-base leading-7 sm:text-lg",
                      kind === "articles"
                        ? "text-white/78"
                        : "text-brand-ink/75",
                    )}
                  >
                    {config.description}
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink to={config.relatedHref} tone={config.switchTone}>
                    Apri {config.relatedLabel.toLowerCase()}
                  </ButtonLink>
                  <ButtonLink to={routeMap.candidate.portal} tone="ghost">
                    Demo candidato
                  </ButtonLink>
                  <ButtonLink to={routeMap.company.portal} tone="ghost">
                    Demo azienda
                  </ButtonLink>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {metricCopy[kind].map((metric) => (
                    <div
                      className={cn(
                        "rounded-[1.75rem] border p-4 shadow-[0_24px_55px_-35px_rgba(16,25,36,0.45)]",
                        config.metricToneClass,
                      )}
                      key={metric.label}
                    >
                      <p className="text-3xl font-bold tracking-tight">
                        {metric.value}
                      </p>
                      <p
                        className={cn(
                          "mt-2 text-sm leading-6",
                          kind === "articles"
                            ? "text-white/72"
                            : "text-brand-ink/70",
                        )}
                      >
                        {metric.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Surface>

            <Surface className="flex h-full flex-col overflow-hidden">
              <img
                alt={config.featureImageAlt}
                className="aspect-[4/3] w-full rounded-[1.8rem] object-cover"
                src={assetPath(config.featureImage)}
              />
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-brand-violet">
                {config.featureEyebrow}
              </p>
              <h2 className="mt-3 text-3xl leading-tight">
                {config.featureTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {config.featureBody}
              </p>
              <div className="mt-auto pt-6">
                <ButtonLink to="/info" tone="ghost">
                  Vai alla pagina info
                </ButtonLink>
              </div>
            </Surface>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((item, index) => {
                const meta =
                  cardMeta[kind][index] ?? cardMeta[kind][cardMeta[kind].length - 1];

                return (
                  <Surface className="flex h-full flex-col" key={item.id}>
                    <div className="flex items-center justify-between gap-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                          kind === "articles"
                            ? "bg-brand-violet/10 text-brand-violet"
                            : "bg-brand-mint/30 text-brand-mint-deep",
                        )}
                      >
                        {meta.label}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                        {meta.value}
                      </span>
                    </div>
                    <h2 className="mt-5 text-2xl leading-tight">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-500">
                      {item.description}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-6">
                      <p className="text-sm font-semibold text-slate-500">
                        Contesto utile prima di agire
                      </p>
                      <span
                        className={cn(
                          "inline-flex h-10 w-10 items-center justify-center rounded-2xl",
                          kind === "articles"
                            ? "bg-brand-violet/10 text-brand-violet"
                            : "bg-brand-mint/30 text-brand-mint-deep",
                        )}
                      >
                        <SiteIcon className="h-4 w-4" name="arrow-right" />
                      </span>
                    </div>
                  </Surface>
                );
              })}
            </div>

            <div className="grid gap-6">
              <Surface>
                <div className={cn("rounded-[2rem] p-6", config.notesClass)}>
                  <p
                    className={cn(
                      "text-sm font-semibold uppercase tracking-[0.24em]",
                      kind === "articles"
                        ? "text-brand-violet"
                        : "text-white/65",
                    )}
                  >
                    {config.notesTitle}
                  </p>
                  <p
                    className={cn(
                      "mt-4 text-sm leading-7",
                      kind === "articles"
                        ? "text-slate-600"
                        : "text-white/76",
                    )}
                  >
                    {config.notesDescription}
                  </p>
                  <div className="mt-6 grid gap-4">
                    {config.outline.map((item) => (
                      <div className="flex items-start gap-3" key={item}>
                        <span
                          className={cn(
                            "mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl",
                            kind === "articles"
                              ? "bg-white text-brand-violet"
                              : "bg-white/12 text-white",
                          )}
                        >
                          <SiteIcon className="h-4 w-4" name="document" />
                        </span>
                        <p
                          className={cn(
                            "text-sm leading-7",
                            kind === "articles"
                              ? "text-slate-700"
                              : "text-white/80",
                          )}
                        >
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Surface>

              <Surface className={config.relatedPanelClass}>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {relatedEyebrow[kind]}
                </p>
                <h2 className="mt-4 text-2xl leading-tight">
                  Passa anche da {config.relatedLabel.toLowerCase()}
                </h2>
                <div className="mt-5 grid gap-4">
                  {relatedItems.map((item) => (
                    <div
                      className="rounded-[1.5rem] border border-slate-200/80 bg-white/90 p-4"
                      key={item.id}
                    >
                      <p className="text-sm font-semibold text-brand-violet">
                        {config.relatedCardLabel}
                      </p>
                      <h3 className="mt-2 text-lg leading-tight">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <ButtonLink to={config.relatedHref} tone={config.switchTone}>
                    Apri {config.relatedLabel.toLowerCase()}
                  </ButtonLink>
                </div>
              </Surface>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter className="mt-0" />
    </div>
  );
}
