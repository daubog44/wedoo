import { routeMap } from "../../data/core";
import { ButtonLink, SectionIntro, Surface } from "../ui/index";

export function RoleTracksSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Surface className="bg-brand-violet text-white">
        <SectionIntro
          description="L onboarding e il portale sono pensati per restare semplici: pochi step, informazioni leggibili, CTA chiare e nessun tono corporate."
          eyebrow="Scopri come funziona"
          title="Un solo ecosistema, due punti di vista davvero diversi"
        />
      </Surface>
      <Surface>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl bg-brand-mint/20 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-mint-deep">
              Candidato
            </p>
            <p className="mt-3 text-lg leading-8 text-slate-700">
              Pochi step per registrarti, bacheca annunci leggibile e dettaglio
              offerta costruito per capire subito se il ruolo ti rispecchia.
            </p>
            <ButtonLink
              className="mt-5"
              to={routeMap.candidate.showcase}
              tone="mint"
            >
              Scopri il flusso
            </ButtonLink>
          </div>
          <div className="rounded-3xl bg-brand-violet/10 p-5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-violet">
              Azienda
            </p>
            <p className="mt-3 text-lg leading-8 text-slate-700">
              Registrazione guidata, preview annuncio e bacheca candidati per
              parlare alla Gen Z con dati, contesto e piu coerenza.
            </p>
            <ButtonLink
              className="mt-5"
              to={routeMap.company.showcase}
              tone="violet"
            >
              Scopri il flusso
            </ButtonLink>
          </div>
        </div>
      </Surface>
    </section>
  );
}
