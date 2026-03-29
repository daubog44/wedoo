import { routeMap } from "../../data/core";
import { AppIcon } from "../../lib/icons";
import { assetPath, referencePath } from "../../lib/site-utils";
import { ButtonLink, PreviewFrame, StatCard, Surface } from "../ui/index";

export function HomeHeroSection() {
  return (
    <section className="section-card relative overflow-hidden">
      <div className="spot-orb -left-10 top-10 h-40 w-40 bg-brand-violet/15" />
      <div className="spot-orb -right-8 bottom-0 h-48 w-48 bg-brand-mint/20" />
      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-violet/10 px-4 py-2 text-sm font-semibold text-brand-violet">
            <AppIcon className="text-lg" name="sparkles-line" />
            <span>No hype. No frasi fatte. Solo realta sostenibili.</span>
          </div>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl leading-tight sm:text-5xl lg:text-6xl">
              Opportunita leggibili, aziende credibili, matching piu umano.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Wedoo aiuta la Gen Z a trovare stage e primi ruoli in aziende che
              mostrano davvero il proprio impatto, con segnali chiari su SDG,
              trasparenza e qualita dell annuncio.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink
              external
              icon="file-download-line"
              to="/manifest.webmanifest"
              tone="violet"
            >
              Scarica l app
            </ButtonLink>
            <ButtonLink
              icon="briefcase-line"
              to={routeMap.candidate.showcase}
              tone="mint"
            >
              Scopri i percorsi
            </ButtonLink>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              icon="chart-bar-line"
              label="Obiettivi Agenda 2030 letti con chiarezza"
              value="17 SDG"
            />
            <StatCard
              icon="user-line"
              label="Esperienze progettate per chi cerca e per chi assume"
              value="2 percorsi"
            />
            <StatCard
              icon="check-circle-line"
              label="Annunci impostati per evitare rumore e washing"
              value="Verifica"
            />
          </div>
        </div>

        <div className="grid gap-4">
          <PreviewFrame
            alt="Wedoo preview"
            className="aspect-[16/10]"
            priority
            src={assetPath("pausa.webp")}
          />
          <div className="grid gap-4 md:grid-cols-[1fr_0.92fr]">
            <Surface className="pattern-grid bg-brand-violet text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/70">
                Come funziona
              </p>
              <p className="mt-3 text-2xl leading-tight">
                Un unica piattaforma, due protagonisti: chi cerca un lavoro con
                impatto autentico e chi vuole pubblicare senza sembrare finto.
              </p>
            </Surface>
            <PreviewFrame
              alt="Bozza Wedoo"
              className="aspect-[4/3]"
              src={referencePath("bozza-wedoo.png")}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
