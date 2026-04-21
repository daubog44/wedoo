import { NavLink } from "react-router-dom";
import type { CandidateCvResponse } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { Button } from "../ui/actions";
import { Surface } from "../ui/surfaces";

function CandidateCvSection({
  items,
  title,
}: {
  items: readonly string[];
  title: string;
}) {
  return (
    <Surface>
      <h2 className="text-2xl leading-tight text-[var(--wedoo-ink-strong)]">{title}</h2>
      <ul className="mt-5 space-y-3 text-sm leading-7 text-[var(--wedoo-ink-muted)] sm:text-[0.98rem]">
        {items.map((item) => (
          <li className="flex gap-3" key={item}>
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--wedoo-mint-700)]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </Surface>
  );
}

function CandidateCvDock({ label }: { label: string }) {
  return (
    <nav
      aria-label={label}
      className="mt-6 flex items-center justify-between rounded-[1.5rem] border border-white/12 bg-[rgba(9,14,24,0.96)] px-4 py-3"
    >
      <NavLink
        aria-label="Apri dashboard candidato"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        to="/portale/candidato"
      >
        <AppIcon className="h-5 w-5" name="home-line" />
      </NavLink>
      <button
        aria-label="Salvataggi candidati in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="star-line" />
      </button>
      <button
        aria-label="Annunci candidati in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="briefcase-line" />
      </button>
      <NavLink
        aria-label="Apri profilo candidato"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        to="/portale/candidato/cv"
      >
        <AppIcon className="h-5 w-5" name="user-line" />
      </NavLink>
    </nav>
  );
}

function CandidateCvHero({ response }: { response: CandidateCvResponse }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(145deg,rgba(13,18,30,0.98),rgba(26,34,52,0.94))] p-6 text-white shadow-[0_34px_90px_-58px_rgba(0,0,0,0.72)]">
      <div className="grid gap-6 lg:grid-cols-[8.5rem_minmax(0,1fr)] lg:items-start">
        <div className="flex h-[8.5rem] w-[8.5rem] items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-white/95">
          <AppImage
            alt={response.candidate.fullName}
            className="h-full w-full object-cover"
            priority
            src={assetPath(response.candidate.avatar)}
          />
        </div>

        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/46">candidate workspace</p>
            <h1 className="font-wedoo-heading text-[2.9rem] leading-[0.88] text-white sm:text-[3.6rem]">
              {response.candidate.fullName}
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-white/66 sm:text-[0.98rem]">{response.photoHint}</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button className="min-h-[3.35rem] min-w-[15rem]" tone="mint">
              {response.candidate.goalLabel}
            </Button>
            <Button className="min-h-[3.25rem] min-w-[10rem]" tone="ghost">
              {response.sidebar.editLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function CandidateCvSidebar({ response }: { response: CandidateCvResponse }) {
  return (
    <div className="space-y-5">
      <Surface>
        <p className="wedoo-kicker">{response.sidebar.editTitleLabel}</p>
        <p className="mt-4 text-sm leading-7 text-[var(--wedoo-ink-muted)]">{response.sidebar.backHelperLabel}</p>
        <div className="mt-5 grid gap-3">
          <Button className="min-h-[3.25rem] w-full" tone="ghost">
            {response.sidebar.uploadCvLabel}
          </Button>
          <p className="text-sm leading-7 text-[var(--wedoo-ink-muted)]">{response.sidebar.editSecondaryLabel}</p>
        </div>
      </Surface>

      <Surface className="bg-[linear-gradient(180deg,rgba(238,255,249,0.9),rgba(255,255,255,0.95))]">
        <p className="wedoo-kicker">{response.sidebar.activityLabel}</p>
        <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--wedoo-ink-muted)]">
          {response.sidebar.activityItems.map((item) => (
            <div className="flex gap-3" key={item}>
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--wedoo-mint-700)]" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </Surface>
    </div>
  );
}

export function CandidateCvView({ response }: { response: CandidateCvResponse }) {
  return (
    <>
      <section className="hidden xl:block" data-candidate-cv-layout="desktop">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-8 pb-8 pt-7 shadow-[0_48px_120px_-72px_rgba(0,0,0,0.85)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <NavLink
              aria-label="Torna alla dashboard candidato"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition hover:bg-white/10"
              to={response.backPath}
            >
              <AppIcon className="h-5 w-5" name="arrow-left-line" />
            </NavLink>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/42">Wedoo profile</p>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_22rem]">
            <div className="space-y-5">
              <CandidateCvHero response={response} />
              <div className="grid gap-5 lg:grid-cols-3">
                <CandidateCvSection items={response.sections.personalDataItems} title={response.sections.personalDataTitle} />
                <CandidateCvSection items={response.sections.workPreferenceItems} title={response.sections.workPreferenceTitle} />
                <CandidateCvSection items={response.sections.agendaItems} title={response.sections.agendaTitle} />
              </div>
            </div>

            <CandidateCvSidebar response={response} />
          </div>
        </div>
      </section>

      <section className="xl:hidden" data-candidate-cv-layout="mobile">
        <div className="mx-auto max-w-[390px] px-4 pb-6 pt-4">
          <div className="rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-4 pb-4 pt-4 shadow-[0_40px_100px_-70px_rgba(0,0,0,0.8)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Wedoo profile</p>
              <div className="flex items-center gap-2">
                <button
                  aria-label="Notifiche candidato in arrivo"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72"
                  type="button"
                >
                  <AppIcon className="h-5 w-5" name="bell-line" />
                </button>
                <button
                  aria-label="Altro menu candidato in arrivo"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72"
                  type="button"
                >
                  <AppIcon className="h-5 w-5" name="more-menu-line" />
                </button>
              </div>
            </div>

            <div className="space-y-5">
              <CandidateCvHero response={response} />
              <CandidateCvSection items={response.sections.personalDataItems} title={response.sections.personalDataTitle} />
              <CandidateCvSection items={response.sections.workPreferenceItems} title={response.sections.workPreferenceTitle} />
              <CandidateCvSection items={response.sections.agendaItems} title={response.sections.agendaTitle} />
              <CandidateCvSidebar response={response} />
            </div>

            <CandidateCvDock label={response.mobileDockLabel} />
          </div>
        </div>
      </section>
    </>
  );
}
