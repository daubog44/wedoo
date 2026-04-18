import { NavLink } from "react-router-dom";
import type { CandidateJobDetailResponse } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import {
  getPortalDetailToneClasses,
  PortalDetailBulletList,
  PortalDetailCanvas,
  PortalDetailCard,
  PortalDetailToolbarCard,
  type PortalDetailTone,
} from "./detail-surface-primitives";

const tone: PortalDetailTone = "violet";

function CandidateJobMobileDock({ label }: { label: string }) {
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
        aria-label="Salvataggi in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="star-line" />
      </button>
      <button
        aria-label="Chat in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="chats-line" />
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

function CandidateJobCtaTray({
  detail,
  onCancel,
  onSaveDraft,
}: {
  detail: CandidateJobDetailResponse;
  onCancel: () => void;
  onSaveDraft: () => void;
}) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <PortalDetailCard tone={tone}>
      <div className="flex items-center gap-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-violet/10 text-brand-violet">
          <AppIcon className="h-6 w-6" name="star-line" />
        </div>
        <p className="font-wedoo-body text-sm leading-6 text-slate-500">
          CTA finale separata dal contenuto, con draft e cancel come azioni
          secondarie.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        <button
          className={cn(
            "font-wedoo-accent inline-flex min-h-[54px] items-center justify-center rounded-[1rem] px-5 text-[1.125rem] leading-none transition",
            toneClasses.primaryButton,
          )}
          type="button"
        >
          {detail.ctas.primaryLabel}
        </button>
        <div className="grid grid-cols-2 gap-3">
          <button
            className={cn(
              "font-wedoo-accent inline-flex min-h-[48px] items-center justify-center rounded-[1rem] px-4 text-[1rem] leading-none transition",
              toneClasses.secondaryButton,
            )}
            onClick={onCancel}
            type="button"
          >
            {detail.ctas.cancelLabel}
          </button>
          <button
            className={cn(
              "font-wedoo-accent inline-flex min-h-[48px] items-center justify-center rounded-[1rem] px-4 text-[1rem] leading-none transition",
              toneClasses.softButton,
            )}
            onClick={onSaveDraft}
            type="button"
          >
            {detail.ctas.saveDraftLabel}
          </button>
        </div>
      </div>
    </PortalDetailCard>
  );
}

function CandidateJobDesktopShell({
  detail,
  onCancel,
  onClose,
  onSaveDraft,
}: {
  detail: CandidateJobDetailResponse;
  onCancel: () => void;
  onClose: () => void;
  onSaveDraft: () => void;
}) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <section
      className="mx-auto w-full max-w-[1280px] px-4"
      data-candidate-job-detail-layout="desktop"
    >
      <PortalDetailCanvas tone={tone}>
        <div className="flex justify-end">
          <button
            aria-label="Chiudi dettaglio annuncio"
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-black shadow-sm transition hover:text-brand-violet"
            onClick={onClose}
            type="button"
          >
            <AppIcon className="h-7 w-7" name="close-line" />
          </button>
        </div>

        <PortalDetailCard className="mt-4" tone={tone}>
          <div className="flex flex-wrap gap-3">
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                toneClasses.chip,
              )}
            >
              annuncio candidato
            </span>
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                toneClasses.chip,
              )}
            >
              {detail.company.sectorLabel}
            </span>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[140px_minmax(0,1fr)]">
            <div className="flex h-[140px] w-[140px] items-center justify-center rounded-full bg-brand-page shadow-[0_24px_55px_-35px_rgba(15,23,42,0.28)]">
              <AppImage
                alt={detail.company.name}
                className="h-[78px] w-[78px] object-contain"
                priority
                src={assetPath(detail.company.logo)}
              />
            </div>

            <div>
              <h1 className="font-wedoo-heading text-[3rem] uppercase leading-none text-black">
                {detail.title}
              </h1>
              <p className="pt-2 font-wedoo-accent text-[2rem] leading-none text-black">
                Settore: {detail.company.sectorLabel}
              </p>
              <p className="pt-4 font-wedoo-body text-[1rem] leading-7 text-slate-600">
                {detail.contactLine}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <p className="font-wedoo-accent text-[1.35rem] leading-none text-black">
                  {detail.company.name}
                </p>
                <button
                  className={cn(
                    "font-wedoo-accent inline-flex min-h-[48px] items-center justify-center rounded-[1rem] px-5 text-[1rem] leading-none transition",
                    toneClasses.secondaryButton,
                  )}
                  type="button"
                >
                  {detail.ctas.certificationsLabel}
                </button>
                <button
                  className={cn(
                    "font-wedoo-accent inline-flex min-h-[48px] items-center justify-center rounded-[1rem] px-5 text-[1rem] leading-none transition",
                    toneClasses.secondaryButton,
                  )}
                  type="button"
                >
                  {detail.ctas.contactLabel}
                </button>
              </div>
            </div>
          </div>
        </PortalDetailCard>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.18fr)_360px]">
          <div className="space-y-6">
            <PortalDetailCard tone={tone}>
              <h2 className="font-wedoo-accent text-[1.9rem] leading-none text-black">
                {detail.sections.companyTitle}
              </h2>
              <PortalDetailToolbarCard
                body={detail.sections.companyBody || "In questa demo il dettaglio azienda viene stabilizzato mantenendo il canvas pronto per contenuti piu estesi, certificazioni e storytelling brand."}
                className="mt-5"
                minHeightClassName="min-h-[220px]"
                tone={tone}
                toolbarLabel={detail.editorToolbarLabel}
              />
            </PortalDetailCard>

            <PortalDetailCard tone={tone}>
              <h2 className="font-wedoo-accent text-[1.9rem] leading-none text-black">
                {detail.sections.descriptionTitle}
              </h2>
              <PortalDetailToolbarCard
                body={detail.sections.descriptionBody}
                className="mt-5"
                minHeightClassName="min-h-[260px]"
                tone={tone}
                toolbarLabel={detail.editorToolbarLabel}
              />
            </PortalDetailCard>
          </div>

          <div className="space-y-6">
            <PortalDetailCard tone={tone}>
              <h2 className="font-wedoo-accent text-[1.75rem] leading-none text-black">
                {detail.sections.summaryTitle}
              </h2>
              <PortalDetailBulletList
                className="mt-5 font-wedoo-body text-[1rem] leading-[1.35]"
                items={detail.sections.summaryItems}
              />
            </PortalDetailCard>

            <PortalDetailCard tone={tone}>
              <h2 className="font-wedoo-accent text-[1.75rem] leading-none text-black">
                {detail.sections.offerTitle}
              </h2>
              <PortalDetailBulletList
                className="mt-5 font-wedoo-body text-[1rem] leading-[1.35]"
                items={detail.sections.offerItems}
              />
            </PortalDetailCard>

            <PortalDetailCard tone={tone}>
              <h2 className="font-wedoo-accent text-[1.75rem] leading-none text-black">
                {detail.skills.hardTitle}
              </h2>
              <PortalDetailBulletList
                className="mt-5 font-wedoo-body text-[1rem] leading-[1.35]"
                items={detail.skills.hardItems}
              />
              <h2 className="pt-6 font-wedoo-accent text-[1.75rem] leading-none text-black">
                {detail.skills.softTitle}
              </h2>
              <PortalDetailBulletList
                className="mt-5 font-wedoo-body text-[1rem] leading-[1.35]"
                items={detail.skills.softItems}
              />
            </PortalDetailCard>

            <PortalDetailCard tone={tone}>
              <h2 className="font-wedoo-accent text-[1.75rem] leading-none text-black">
                {detail.requirementsLabel}
              </h2>
              <div className="mt-5 space-y-3 font-wedoo-body text-[1rem] italic leading-[1.35] text-slate-600">
                {detail.footnotes.map((note) => (
                  <p key={note}>{note}</p>
                ))}
              </div>
            </PortalDetailCard>

            <CandidateJobCtaTray
              detail={detail}
              onCancel={onCancel}
              onSaveDraft={onSaveDraft}
            />
          </div>
        </div>
      </PortalDetailCanvas>
    </section>
  );
}

function CandidateJobMobileShell({
  detail,
  onCancel,
  onClose,
  onSaveDraft,
}: {
  detail: CandidateJobDetailResponse;
  onCancel: () => void;
  onClose: () => void;
  onSaveDraft: () => void;
}) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <section
      className="mx-auto w-full max-w-[360px] px-3 pb-3"
      data-candidate-job-detail-layout="mobile"
    >
      <PortalDetailCanvas tone={tone} className="px-4 py-4">
        <div className="flex justify-end">
          <button
            aria-label="Chiudi dettaglio annuncio"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-black shadow-sm transition hover:text-brand-violet"
            onClick={onClose}
            type="button"
          >
            <AppIcon className="h-6 w-6" name="close-line" />
          </button>
        </div>

        <PortalDetailCard className="mt-3" tone={tone}>
          <div className="flex flex-col items-center text-center">
            <div className="flex h-[92px] w-[92px] items-center justify-center rounded-full bg-brand-page shadow-[0_20px_45px_-34px_rgba(15,23,42,0.34)]">
              <AppImage
                alt={detail.company.name}
                className="h-[44px] w-[44px] object-contain"
                priority
                src={assetPath(detail.company.logo)}
              />
            </div>
            <h1 className="pt-4 font-wedoo-heading text-[2rem] uppercase leading-none text-black">
              {detail.title}
            </h1>
            <p className="pt-2 font-wedoo-accent text-[1.5rem] leading-none text-black">
              Settore: {detail.company.sectorLabel}
            </p>
            <p className="pt-4 font-wedoo-body text-[0.95rem] leading-6 text-slate-600">
              {detail.contactLine}
            </p>
            <p className="pt-4 font-wedoo-accent text-[1.125rem] leading-none text-black">
              {detail.company.name}
            </p>
          </div>

          <div className="mt-4 grid gap-3">
            <button
              className={cn(
                "font-wedoo-accent inline-flex min-h-[46px] items-center justify-center rounded-[1rem] px-4 text-[1rem] leading-none transition",
                toneClasses.secondaryButton,
              )}
              type="button"
            >
              {detail.ctas.certificationsLabel}
            </button>
            <button
              className={cn(
                "font-wedoo-accent inline-flex min-h-[46px] items-center justify-center rounded-[1rem] px-4 text-[1rem] leading-none transition",
                toneClasses.secondaryButton,
              )}
              type="button"
            >
              {detail.ctas.contactLabel}
            </button>
          </div>
        </PortalDetailCard>

        <div className="mt-4 space-y-4">
          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.summaryTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[0.95rem] leading-[1.3]"
              items={detail.sections.summaryItems}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.companyTitle}
            </h2>
            <PortalDetailToolbarCard
              body={detail.sections.companyBody || "Canvas pronto per raccontare il lato azienda senza compromettere la leggibilita del dettaglio."}
              className="mt-4"
              minHeightClassName="min-h-[180px]"
              tone={tone}
              toolbarLabel={detail.editorToolbarLabel}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.offerTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[0.95rem] leading-[1.3]"
              items={detail.sections.offerItems}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.descriptionTitle}
            </h2>
            <PortalDetailToolbarCard
              body={detail.sections.descriptionBody}
              className="mt-4"
              minHeightClassName="min-h-[220px]"
              tone={tone}
              toolbarLabel={detail.editorToolbarLabel}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.skills.hardTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[0.95rem] leading-[1.3]"
              items={detail.skills.hardItems}
            />
            <h2 className="pt-5 font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.skills.softTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[0.95rem] leading-[1.3]"
              items={detail.skills.softItems}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.requirementsLabel}
            </h2>
            <div className="mt-4 space-y-3 font-wedoo-body text-[0.95rem] italic leading-[1.3] text-slate-600">
              {detail.footnotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </PortalDetailCard>

          <CandidateJobCtaTray
            detail={detail}
            onCancel={onCancel}
            onSaveDraft={onSaveDraft}
          />
        </div>

        <CandidateJobMobileDock label={detail.mobileDockLabel} />
      </PortalDetailCanvas>
    </section>
  );
}

export function CandidateJobDetailView({
  detail,
  onCancel,
  onClose,
  onSaveDraft,
}: {
  detail: CandidateJobDetailResponse;
  onCancel: () => void;
  onClose: () => void;
  onSaveDraft: () => void;
}) {
  return (
    <>
      <div className="hidden lg:block">
        <CandidateJobDesktopShell
          detail={detail}
          onCancel={onCancel}
          onClose={onClose}
          onSaveDraft={onSaveDraft}
        />
      </div>
      <div className="lg:hidden">
        <CandidateJobMobileShell
          detail={detail}
          onCancel={onCancel}
          onClose={onClose}
          onSaveDraft={onSaveDraft}
        />
      </div>
    </>
  );
}
