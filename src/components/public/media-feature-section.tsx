import { routeMap } from "../../data/core";
import { assetPath } from "../../lib/site-utils";
import { ButtonLink, PreviewFrame, Surface } from "../ui/index";

export function MediaFeatureSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
      <Surface className="overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-violet">
              Wedoo spiegato in un click
            </p>
            <h3 className="text-3xl">
              Brand, impatto e matching stanno nello stesso racconto.
            </h3>
            <p className="text-base leading-8 text-slate-600">
              La piattaforma mostra chi sei, cosa cerchi e quanto l annuncio e
              coerente. Meno claim, piu contesto utile prima di candidarti o
              pubblicare.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                icon="play-circle-line"
                to={routeMap.candidate.portal}
                tone="ghost"
              >
                Apri demo candidato
              </ButtonLink>
              <ButtonLink
                icon="users-line"
                to={routeMap.company.portal}
                tone="ghost"
              >
                Apri demo azienda
              </ButtonLink>
            </div>
          </div>
          <PreviewFrame
            alt="Wedoo click preview"
            className="aspect-[16/10]"
            src={assetPath("pausa.webp")}
          />
        </div>
      </Surface>
      <Surface className="bg-brand-ink text-white">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
          Con il patrocinio di
        </p>
        <div className="mt-6 rounded-[1.75rem] bg-white/5 p-5">
          <PreviewFrame
            alt="Patrocinio"
            className="rounded-3xl border-none bg-transparent shadow-none"
            src={assetPath("patrocinio.png")}
          />
        </div>
        <p className="mt-5 text-sm leading-7 text-white/72">
          Anche la fascia patrocinio resta parte del linguaggio Wedoo: grande,
          leggibile e integrata nella pagina invece di sembrare un blocco
          isolato.
        </p>
      </Surface>
    </section>
  );
}
