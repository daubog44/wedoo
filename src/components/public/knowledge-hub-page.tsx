import { knowledgeContent, routeMap } from "../../data/core";
import type { KnowledgeKind } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteFooter, TopLogoBar } from "../site";
import { ButtonLink } from "../ui/actions";
import { Surface } from "../ui/surfaces";

const hubConfig = {
  articles: {
    chips: ["editorial system", "candidate lens", "brand clarity"],
    description:
      "Guide brevi, checklist e casi d'uso per leggere annunci, valutare il livello di trasparenza di un brand e capire se un ruolo ti assomiglia davvero.",
    eyebrow: "Articoli Wedoo",
    featureBody:
      "Qui trovi il lato editoriale del progetto: contesto prima della candidatura, esempi concreti e un linguaggio pensato per togliere rumore invece di aggiungerne.",
    featureImage: "obiettivi.jpg",
    featureImageAlt: "Obiettivi e metriche di impatto",
    featureTitle: "Impatto, matching e trasparenza spiegati bene",
    heroClass: "bg-[linear-gradient(135deg,rgba(9,14,24,0.98),rgba(24,33,52,0.94))] text-white",
    relatedHref: "/podcast",
    relatedLabel: "podcast",
    switchTone: "gold" as const,
    title: "Contenuti pratici per leggere lavoro, impatto e sostenibilita senza fuffa.",
  },
  podcasts: {
    chips: ["audio notes", "human stories", "quick context"],
    description:
      "Una raccolta audio pensata per chi vuole sentire voci, dubbi e decisioni reali su primi ruoli, recruiting e impatto raccontato senza slogan.",
    eyebrow: "Podcast Wedoo",
    featureBody:
      "Gli episodi sono corti, chiari e utili anche mentre scorri annunci o sistemi il CV: meno teoria astratta, piu segnali concreti da portarti dietro.",
    featureImage: "pausa.webp",
    featureImageAlt: "Preview di un episodio Wedoo",
    featureTitle: "Ascolta il lato piu umano del matching",
    heroClass: "bg-[linear-gradient(135deg,rgba(12,19,28,0.98),rgba(17,58,49,0.92))] text-white",
    relatedHref: "/articoli",
    relatedLabel: "articoli",
    switchTone: "mint" as const,
    title: "Episodi brevi per capire come si costruisce un lavoro credibile gia dal primo contatto.",
  },
} as const;

const cardMeta = {
  articles: [
    { label: "Guide", value: "7 min" },
    { label: "Checklist", value: "5 punti" },
    { label: "Signals", value: "3 indicatori" },
    { label: "Toolkit", value: "Subito utile" },
  ],
  podcasts: [
    { label: "Episodio", value: "12 min" },
    { label: "Talk", value: "9 min" },
    { label: "Field note", value: "8 min" },
    { label: "Roundtable", value: "14 min" },
  ],
} as const;

const relatedHeadings = {
  articles: "Passa anche da podcast",
  podcasts: "Passa anche da articoli",
} as const;

export function KnowledgeHubPage({ kind }: { kind: KnowledgeKind }) {
  const config = hubConfig[kind];
  const items = knowledgeContent[kind];
  const relatedItems =
    kind === "articles"
      ? knowledgeContent.podcasts.slice(0, 2)
      : knowledgeContent.articles.slice(0, 2);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#f3f5fb_0%,#eef2f8_28%,#ffffff_100%)]">
      <TopLogoBar />
      <main className="pb-16 pt-4">
        <div className="section-shell space-y-6">
          <section className="grid gap-6 xl:grid-cols-[1.14fr_0.86fr]">
            <div className={cn("overflow-hidden rounded-[1.75rem] border border-white/8 p-8 shadow-[0_34px_90px_-58px_rgba(0,0,0,0.28)]", config.heroClass)}>
              <div className="space-y-8 p-2">
                <div className="flex flex-wrap gap-2">
                  {config.chips.map((chip) => (
                    <span
                      className="inline-flex rounded-full border border-white/12 bg-white/6 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/72"
                      key={chip}
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="max-w-4xl space-y-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/48">
                    {config.eyebrow}
                  </p>
                  <h1 className="max-w-4xl text-4xl leading-[0.95] text-white sm:text-5xl lg:text-[4rem]">
                    {config.title}
                  </h1>
                  <p className="max-w-3xl text-base leading-8 text-white/70 sm:text-lg">
                    {config.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <ButtonLink to={config.relatedHref} tone={config.switchTone}>
                    Apri {config.relatedLabel}
                  </ButtonLink>
                  <ButtonLink to="/info" tone="ghost">
                    Vai alla pagina info
                  </ButtonLink>
                  <ButtonLink to={routeMap.candidate.portal} tone="ghost">
                    Demo candidato
                  </ButtonLink>
                  <ButtonLink to={routeMap.company.portal} tone="ghost">
                    Demo azienda
                  </ButtonLink>
                </div>
              </div>
            </div>

            <Surface className="overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,247,252,0.96))]">
              <img
                alt={config.featureImageAlt}
                className="aspect-[4/3] w-full rounded-[1.8rem] object-cover"
                src={assetPath(config.featureImage)}
              />
              <p className="mt-6 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--wedoo-violet)]">
                story framing
              </p>
              <h2 className="mt-3 text-3xl leading-tight text-[var(--wedoo-ink-strong)]">
                {config.featureTitle}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--wedoo-ink-muted)]">
                {config.featureBody}
              </p>
            </Surface>
          </section>

          <section className="grid gap-6 xl:grid-cols-[1.06fr_0.94fr]">
            <div className="grid gap-6 md:grid-cols-2">
              {items.map((item, index) => {
                const meta = cardMeta[kind][index] ?? cardMeta[kind][cardMeta[kind].length - 1];

                return (
                  <Surface className="flex h-full flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(246,248,252,0.94))]" key={item.id}>
                    <div className="flex items-center justify-between gap-4">
                      <span className="inline-flex rounded-full border border-[var(--wedoo-line)] bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wedoo-ink-muted)]">
                        {meta.label}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--wedoo-ink-muted)]">
                        {meta.value}
                      </span>
                    </div>
                    <h2 className="mt-5 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">{item.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-[var(--wedoo-ink-muted)]">
                      {item.description}
                    </p>
                    <div className="mt-auto pt-6">
                      <p className="text-sm leading-7 text-[var(--wedoo-ink-muted)]">
                        Contesto utile prima di agire, con ritmo editoriale piu pulito e meno rumore visivo.
                      </p>
                    </div>
                  </Surface>
                );
              })}
            </div>

            <div className="grid gap-6">
              <div className={cn("overflow-hidden rounded-[1.75rem] border border-white/8 p-8 shadow-[0_34px_90px_-58px_rgba(0,0,0,0.28)]", config.heroClass)}>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/48">
                  reading notes
                </p>
                <h2 className="mt-4 text-3xl leading-tight text-white">
                  Usa questa sezione per arrivare agli annunci con piu criterio.
                </h2>
                <div className="mt-6 space-y-4">
                  {[
                    "Leggi o ascolta prima di confrontare due opportunita simili.",
                    "Segnati claim deboli, dati mancanti e tono del brand.",
                    "Poi passa alla bacheca per verificare se la promessa regge.",
                  ].map((item) => (
                    <div className="flex gap-3 text-sm leading-7 text-white/72" key={item}>
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-white/80" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Surface className="bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(246,248,252,0.94))]">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--wedoo-ink-muted)]">
                  cross navigation
                </p>
                <h2 className="mt-4 text-3xl leading-tight text-[var(--wedoo-ink-strong)]">
                  {relatedHeadings[kind]}
                </h2>
                <div className="mt-5 grid gap-4">
                  {relatedItems.map((item) => (
                    <div className="rounded-[1.5rem] border border-[var(--wedoo-line)] bg-white p-4" key={item.id}>
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--wedoo-violet)]">
                        Related
                      </p>
                      <h3 className="mt-2 text-lg leading-tight text-[var(--wedoo-ink-strong)]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-[var(--wedoo-ink-muted)]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <ButtonLink to={config.relatedHref} tone={config.switchTone}>
                    Apri {config.relatedLabel}
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
