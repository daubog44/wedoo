import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import type { CandidateCvResponse } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import type { MajesticonName } from "../../lib/majesticons-map";
import { assetPath, cn } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import {
  getPortalDetailToneClasses,
  PortalDetailBulletList,
  PortalDetailCanvas,
  PortalDetailCard,
  type PortalDetailTone,
} from "./detail-surface-primitives";

const tone: PortalDetailTone = "mint";

function CandidateCvActionButton({
  children,
  className,
  icon,
  toneClassName,
}: {
  children: ReactNode;
  className?: string;
  icon?: MajesticonName;
  toneClassName: string;
}) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex min-h-[58px] items-center justify-center gap-3 rounded-[1rem] px-5 text-[1.125rem] leading-none transition",
        toneClassName,
        className,
      )}
      type="button"
    >
      <span>{children}</span>
      {icon ? <AppIcon className="h-5 w-5" name={icon} /> : null}
    </button>
  );
}

function CandidateCvDesktopShell({ response }: { response: CandidateCvResponse }) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <section
      className="hidden min-[1280px]:block"
      data-candidate-cv-layout="desktop"
    >
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <PortalDetailCanvas tone={tone}>
          <div className="flex items-start justify-between gap-6">
            <NavLink
              aria-label="Torna alla dashboard candidato"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-brand-ink shadow-sm transition hover:text-brand-mint-deep"
              to={response.backPath}
            >
              <AppIcon className="h-8 w-8" name="arrow-left-line" />
            </NavLink>
            <p className="max-w-[420px] text-right font-wedoo-body text-[0.95rem] leading-[1.35] text-slate-500">
              {response.photoHint}
            </p>
          </div>

          <div className="mt-6 grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
            <PortalDetailCard
              className="flex flex-col items-center text-center"
              tone={tone}
            >
              <div className="flex h-[176px] w-[176px] items-center justify-center overflow-hidden rounded-full bg-brand-page shadow-[0_24px_55px_-35px_rgba(15,23,42,0.28)]">
                <AppImage
                  alt={response.candidate.fullName}
                  className="h-full w-full object-cover"
                  priority
                  src={assetPath(response.candidate.avatar)}
                />
              </div>

              <h1 className="pt-6 font-wedoo-heading text-[3rem] leading-none text-brand-ink">
                {response.candidate.fullName}
              </h1>

              <button
                className={cn(
                  "mt-6 inline-flex min-h-[64px] w-full items-center justify-center rounded-[1rem] px-6 font-wedoo-accent text-[1.5rem] leading-none transition",
                  toneClasses.primaryButton,
                )}
                type="button"
              >
                {response.candidate.goalLabel}
              </button>

              <p className="pt-3 font-wedoo-body text-[0.95rem] leading-[1.35] text-slate-500">
                {response.sidebar.backHelperLabel}
              </p>

              <div className="mt-6 grid w-full gap-4">
                <CandidateCvActionButton
                  icon="chevron-down-line"
                  toneClassName={toneClasses.secondaryButton}
                >
                  {response.sidebar.editLabel}
                </CandidateCvActionButton>

                <div className="rounded-[1.5rem] border border-brand-mint/25 bg-brand-mint/12 px-5 py-5">
                  <p className="font-wedoo-accent text-[1.125rem] leading-none text-brand-ink">
                    {response.sidebar.editTitleLabel}
                  </p>
                  <button
                    className="mt-4 inline-flex items-center gap-2 font-wedoo-accent text-[1.125rem] leading-none text-brand-ink transition hover:text-brand-mint-deep"
                    type="button"
                  >
                    <AppIcon className="h-5 w-5" name="cloud-upload-line" />
                    <span>{response.sidebar.uploadCvLabel}</span>
                  </button>
                  <p className="pt-4 font-wedoo-accent text-[1.125rem] leading-none text-brand-ink">
                    {response.sidebar.editSecondaryLabel}
                  </p>
                </div>

                <CandidateCvActionButton
                  icon="chevron-down-line"
                  toneClassName={toneClasses.secondaryButton}
                >
                  {response.sidebar.activityLabel}
                </CandidateCvActionButton>
              </div>

              <div className="mt-6 grid gap-2 font-wedoo-accent text-[1.125rem] leading-none text-brand-ink">
                {response.sidebar.activityItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </PortalDetailCard>

            <div className="space-y-6">
              <PortalDetailCard tone={tone}>
                <div className="flex flex-wrap gap-3">
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                      toneClasses.chip,
                    )}
                  >
                    profilo candidato
                  </span>
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                      toneClasses.chip,
                    )}
                  >
                    dati mock allineati
                  </span>
                </div>
                <p className="mt-4 max-w-[680px] font-wedoo-body text-[1rem] leading-7 text-slate-600">
                  Un canvas unico per raccontare obiettivi, disponibilita e
                  preferenze di lavoro senza il feeling da schermata scalata.
                </p>
              </PortalDetailCard>

              <div className="grid gap-6 xl:grid-cols-2">
                <PortalDetailCard tone={tone}>
                  <h2 className="font-wedoo-accent text-[2rem] leading-none text-brand-ink">
                    {response.sections.personalDataTitle}
                  </h2>
                  <PortalDetailBulletList
                    className="mt-5 font-wedoo-body text-[1.125rem] leading-[1.35]"
                    items={response.sections.personalDataItems}
                  />
                </PortalDetailCard>

                <PortalDetailCard tone={tone}>
                  <h2 className="font-wedoo-accent text-[2rem] leading-none text-brand-ink">
                    {response.sections.workPreferenceTitle}
                  </h2>
                  <PortalDetailBulletList
                    className="mt-5 font-wedoo-body text-[1.125rem] leading-[1.35]"
                    items={response.sections.workPreferenceItems}
                  />
                </PortalDetailCard>
              </div>

              <PortalDetailCard tone={tone}>
                <h2 className="font-wedoo-accent text-[2rem] leading-none text-brand-ink">
                  {response.sections.agendaTitle}
                </h2>
                <PortalDetailBulletList
                  className="mt-5 font-wedoo-body text-[1.125rem] leading-[1.35]"
                  items={response.sections.agendaItems}
                />
              </PortalDetailCard>
            </div>
          </div>
        </PortalDetailCanvas>
      </div>
    </section>
  );
}

function CandidateCvMobileDock({ label }: { label: string }) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <nav
      aria-label={label}
      className={cn(
        "mt-6 flex items-center justify-between rounded-[1.5rem] px-5 py-3 shadow-[0_20px_40px_-28px_rgba(15,23,42,0.38)]",
        toneClasses.dock,
      )}
    >
      <NavLink
        aria-label="Apri dashboard candidato"
        className="inline-flex h-8 w-8 items-center justify-center"
        to="/portale/candidato"
      >
        <AppIcon className="h-7 w-7" name="home-line" />
      </NavLink>
      <button
        aria-label="Salvataggi candidati in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="star-line" />
      </button>
      <button
        aria-label="Annunci candidati in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="briefcase-line" />
      </button>
      <NavLink
        aria-label="Apri profilo candidato"
        className="inline-flex h-8 w-8 items-center justify-center"
        to="/portale/candidato/cv"
      >
        <AppIcon className="h-7 w-7" name="user-line" />
      </NavLink>
    </nav>
  );
}

function CandidateCvMobileShell({ response }: { response: CandidateCvResponse }) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <section
      className="mx-auto max-w-[360px] px-3 pb-3 pt-5 min-[1280px]:hidden"
      data-candidate-cv-layout="mobile"
    >
      <PortalDetailCanvas tone={tone} className="px-4 py-4">
        <div className="flex items-center justify-between">
          <NavLink
            aria-label="Torna alla dashboard candidato"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-brand-ink shadow-sm"
            to={response.backPath}
          >
            <AppIcon className="h-6 w-6" name="arrow-left-line" />
          </NavLink>
          <div className="flex items-center gap-4 text-brand-ink">
            <button
              aria-label="Notifiche candidato in arrivo"
              className="inline-flex h-8 w-8 items-center justify-center"
              type="button"
            >
              <AppIcon className="h-6 w-6" name="bell-line" />
            </button>
            <button
              aria-label="Altro menu candidato in arrivo"
              className="inline-flex h-8 w-8 items-center justify-center"
              type="button"
            >
              <AppIcon className="h-6 w-6" name="more-menu-line" />
            </button>
          </div>
        </div>

        <PortalDetailCard className="mt-4 flex flex-col items-center text-center" tone={tone}>
          <div className="flex h-[132px] w-[132px] items-center justify-center overflow-hidden rounded-full bg-brand-page shadow-[0_18px_40px_-28px_rgba(15,23,42,0.36)]">
            <AppImage
              alt={response.candidate.fullName}
              className="h-full w-full object-cover"
              priority
              src={assetPath(response.candidate.avatar)}
            />
          </div>
          <h1 className="pt-4 font-wedoo-heading text-[2.2rem] leading-none text-brand-ink">
            {response.candidate.fullName}
          </h1>
          <button
            className={cn(
              "mt-4 inline-flex min-h-[52px] w-full items-center justify-center rounded-[1rem] px-4 font-wedoo-accent text-[1.25rem] leading-none transition",
              toneClasses.primaryButton,
            )}
            type="button"
          >
            {response.candidate.goalLabel}
          </button>

          <div className="mt-4 grid w-full gap-3">
            <CandidateCvActionButton
              className="min-h-[52px]"
              icon="chevron-down-line"
              toneClassName={toneClasses.secondaryButton}
            >
              {response.sidebar.editLabel}
            </CandidateCvActionButton>
            <CandidateCvActionButton
              className="min-h-[52px]"
              icon="chevron-down-line"
              toneClassName={toneClasses.secondaryButton}
            >
              {response.sidebar.activityLabel}
            </CandidateCvActionButton>
          </div>

          <div className="mt-4 grid gap-1 font-wedoo-accent text-[1.125rem] leading-none text-brand-ink">
            <p>{response.sidebar.editTitleLabel}</p>
            <button
              className="inline-flex items-center justify-center gap-2 text-brand-ink"
              type="button"
            >
              <AppIcon className="h-5 w-5" name="cloud-upload-line" />
              <span>{response.sidebar.uploadCvLabel}</span>
            </button>
            <p>{response.sidebar.editSecondaryLabel}</p>
          </div>
        </PortalDetailCard>

        <div className="mt-4 space-y-4">
          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.75rem] leading-none text-brand-ink">
              {response.sections.personalDataTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[1rem] leading-[1.3]"
              items={response.sections.personalDataItems}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.75rem] leading-none text-brand-ink">
              {response.sections.workPreferenceTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[1rem] leading-[1.3]"
              items={response.sections.workPreferenceItems}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.75rem] leading-none text-brand-ink">
              {response.sections.agendaTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[1rem] leading-[1.3]"
              items={response.sections.agendaItems}
            />
          </PortalDetailCard>
        </div>

        <CandidateCvMobileDock label={response.mobileDockLabel} />
      </PortalDetailCanvas>
    </section>
  );
}

export function CandidateCvView({ response }: { response: CandidateCvResponse }) {
  return (
    <>
      <CandidateCvDesktopShell response={response} />
      <CandidateCvMobileShell response={response} />
    </>
  );
}
