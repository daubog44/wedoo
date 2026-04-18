import { NavLink } from "react-router-dom";
import type { CompanyCandidateDetailResponse } from "../../data/types";
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

const tone: PortalDetailTone = "mint";

function CompanyCandidateCtaTray({
  detail,
  onCancel,
  onSaveDraft,
}: {
  detail: CompanyCandidateDetailResponse;
  onCancel: () => void;
  onSaveDraft: () => void;
}) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <PortalDetailCard tone={tone}>
      <div className="flex items-center gap-4">
        <div className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-mint/22 text-brand-mint-deep">
          <AppIcon className="h-6 w-6" name="star-line" />
        </div>
        <p className="font-wedoo-body text-sm leading-6 text-slate-500">
          CTA recruiter separate dal contenuto, con resume e salvataggio in una
          chiusura piu leggibile.
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
        <button
          className={cn(
            "font-wedoo-accent inline-flex min-h-[48px] items-center justify-center rounded-[1rem] px-4 text-[1rem] leading-none transition",
            toneClasses.softButton,
          )}
          type="button"
        >
          {detail.ctas.resumeLabel}
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

function CompanyCandidateMobileDock({ label }: { label: string }) {
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
        aria-label="Apri dashboard azienda"
        className="inline-flex h-8 w-8 items-center justify-center"
        to="/portale/azienda"
      >
        <AppIcon className="h-7 w-7" name="home-line" />
      </NavLink>
      <button
        aria-label="Candidati salvati in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="star-line" />
      </button>
      <button
        aria-label="Chat recruiter in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="chats-line" />
      </button>
      <button
        aria-label="Messaggi recruiter in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="mail-line" />
      </button>
      <button
        aria-label="Profilo azienda in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="user-line" />
      </button>
    </nav>
  );
}

function CompanyCandidateDesktopShell({
  detail,
  onCancel,
  onClose,
  onSaveDraft,
}: {
  detail: CompanyCandidateDetailResponse;
  onCancel: () => void;
  onClose: () => void;
  onSaveDraft: () => void;
}) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <section
      className="mx-auto w-full max-w-[1280px] px-4"
      data-company-candidate-detail-layout="desktop"
    >
      <PortalDetailCanvas tone={tone}>
        <div className="flex justify-end">
          <button
            aria-label={detail.ctas.closeLabel}
            className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/92 text-black shadow-sm transition hover:text-brand-mint-deep"
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
              profilo candidato
            </span>
            <span
              className={cn(
                "inline-flex rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
                toneClasses.chip,
              )}
            >
              recruiter preview
            </span>
          </div>

          <div className="mt-5 grid gap-6 lg:grid-cols-[160px_minmax(0,1fr)]">
            <div className="flex h-[160px] w-[160px] items-center justify-center overflow-hidden rounded-full bg-brand-page shadow-[0_24px_55px_-35px_rgba(15,23,42,0.28)]">
              <AppImage
                alt={detail.candidate.fullName}
                className="h-full w-full object-cover"
                priority
                src={assetPath(detail.candidate.avatar)}
              />
            </div>

            <div>
              <h1 className="font-wedoo-heading text-[3rem] uppercase leading-none text-black">
                {detail.candidate.fullName}
              </h1>
              <p className="pt-2 font-wedoo-accent text-[2rem] leading-none text-black">
                {detail.candidate.statusLabel}
              </p>
              <PortalDetailBulletList
                className="mt-5 font-wedoo-body text-[1rem] leading-[1.35]"
                items={detail.contactItems}
              />
              <div className="mt-5 flex flex-wrap items-center gap-4">
                <span
                  className={cn(
                    "inline-flex rounded-full border px-4 py-2 font-wedoo-accent text-[1rem] leading-none",
                    toneClasses.softButton,
                  )}
                >
                  {detail.availabilityLabel}
                </span>
              </div>
            </div>
          </div>
        </PortalDetailCard>

        <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_360px]">
          <div className="space-y-6">
            <PortalDetailCard tone={tone}>
              <h2 className="font-wedoo-accent text-[1.9rem] leading-none text-black">
                {detail.sections.descriptionTitle}
              </h2>
              <PortalDetailToolbarCard
                body={detail.sections.descriptionBody}
                className="mt-5"
                minHeightClassName="min-h-[220px]"
                tone={tone}
                toolbarLabel={detail.editorToolbarLabel}
              />
            </PortalDetailCard>

            <div className="grid gap-6 xl:grid-cols-2">
              <PortalDetailCard tone={tone}>
                <h2 className="font-wedoo-accent text-[1.6rem] leading-none text-black">
                  {detail.sections.educationTitle}
                </h2>
                <PortalDetailBulletList
                  className="mt-4 font-wedoo-body text-[1rem] leading-[1.35]"
                  items={detail.sections.educationItems}
                />
              </PortalDetailCard>

              <PortalDetailCard tone={tone}>
                <h2 className="font-wedoo-accent text-[1.6rem] leading-none text-black">
                  {detail.sections.certificationsTitle}
                </h2>
                <PortalDetailBulletList
                  className="mt-4 font-wedoo-body text-[1rem] leading-[1.35]"
                  items={detail.sections.certificationsItems}
                />
                <button
                  className={cn(
                    "mt-5 font-wedoo-accent inline-flex min-h-[48px] items-center justify-center rounded-[1rem] px-4 text-[1rem] leading-none transition",
                    toneClasses.secondaryButton,
                  )}
                  type="button"
                >
                  {detail.ctas.certificationLabel}
                </button>
              </PortalDetailCard>
            </div>

            <PortalDetailCard tone={tone}>
              <h2 className="font-wedoo-accent text-[1.6rem] leading-none text-black">
                {detail.sections.experienceTitle}
              </h2>
              <PortalDetailBulletList
                className="mt-4 font-wedoo-body text-[1rem] leading-[1.35]"
                items={detail.sections.experienceItems}
              />
            </PortalDetailCard>
          </div>

          <div className="space-y-6">
            <PortalDetailCard tone={tone}>
              <h2 className="font-wedoo-accent text-[1.6rem] leading-none text-black">
                {detail.sections.softSkillsTitle}
              </h2>
              <PortalDetailBulletList
                className="mt-4 font-wedoo-body text-[1rem] leading-[1.35]"
                items={detail.sections.softSkillItems}
              />
              <h2 className="pt-6 font-wedoo-accent text-[1.6rem] leading-none text-black">
                {detail.sections.hardSkillsTitle}
              </h2>
              <PortalDetailBulletList
                className="mt-4 font-wedoo-body text-[1rem] leading-[1.35]"
                items={detail.sections.hardSkillItems}
              />
            </PortalDetailCard>

            <PortalDetailCard tone={tone}>
              <p className="font-wedoo-body text-[1rem] italic leading-[1.35] text-slate-600">
                {detail.footnote}
              </p>
            </PortalDetailCard>

            <CompanyCandidateCtaTray
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

function CompanyCandidateMobileShell({
  detail,
  onCancel,
  onClose,
  onSaveDraft,
}: {
  detail: CompanyCandidateDetailResponse;
  onCancel: () => void;
  onClose: () => void;
  onSaveDraft: () => void;
}) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <section
      className="mx-auto w-full max-w-[360px] px-3 pb-3"
      data-company-candidate-detail-layout="mobile"
    >
      <PortalDetailCanvas tone={tone} className="px-4 py-4">
        <div className="flex justify-end">
          <button
            aria-label={detail.ctas.closeLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/92 text-black shadow-sm transition hover:text-brand-mint-deep"
            onClick={onClose}
            type="button"
          >
            <AppIcon className="h-6 w-6" name="close-line" />
          </button>
        </div>

        <PortalDetailCard className="mt-3 text-center" tone={tone}>
          <div className="mx-auto flex h-[122px] w-[122px] items-center justify-center overflow-hidden rounded-full bg-brand-page shadow-[0_18px_40px_-28px_rgba(15,23,42,0.36)]">
            <AppImage
              alt={detail.candidate.fullName}
              className="h-full w-full object-cover"
              priority
              src={assetPath(detail.candidate.avatar)}
            />
          </div>
          <h1 className="pt-4 font-wedoo-heading text-[2rem] uppercase leading-none text-black">
            {detail.candidate.fullName}
          </h1>
          <p className="pt-2 font-wedoo-accent text-[1.5rem] leading-none text-black">
            {detail.candidate.statusLabel}
          </p>
          <PortalDetailBulletList
            className="mt-4 text-left font-wedoo-body text-[0.95rem] leading-[1.3]"
            items={detail.contactItems}
          />
          <span
            className={cn(
              "mt-4 inline-flex rounded-full border px-4 py-2 font-wedoo-accent text-[1rem] leading-none",
              toneClasses.softButton,
            )}
          >
            {detail.availabilityLabel}
          </span>
        </PortalDetailCard>

        <div className="mt-4 space-y-4">
          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.descriptionTitle}
            </h2>
            <PortalDetailToolbarCard
              body={detail.sections.descriptionBody}
              className="mt-4"
              minHeightClassName="min-h-[180px]"
              tone={tone}
              toolbarLabel={detail.editorToolbarLabel}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.educationTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[0.95rem] leading-[1.3]"
              items={detail.sections.educationItems}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.certificationsTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[0.95rem] leading-[1.3]"
              items={detail.sections.certificationsItems}
            />
            <button
              className={cn(
                "mt-4 font-wedoo-accent inline-flex min-h-[46px] items-center justify-center rounded-[1rem] px-4 text-[1rem] leading-none transition",
                toneClasses.secondaryButton,
              )}
              type="button"
            >
              {detail.ctas.certificationLabel}
            </button>
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.experienceTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[0.95rem] leading-[1.3]"
              items={detail.sections.experienceItems}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.softSkillsTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[0.95rem] leading-[1.3]"
              items={detail.sections.softSkillItems}
            />
            <h2 className="pt-5 font-wedoo-accent text-[1.5rem] leading-none text-black">
              {detail.sections.hardSkillsTitle}
            </h2>
            <PortalDetailBulletList
              className="mt-4 font-wedoo-body text-[0.95rem] leading-[1.3]"
              items={detail.sections.hardSkillItems}
            />
          </PortalDetailCard>

          <PortalDetailCard tone={tone}>
            <p className="font-wedoo-body text-[0.95rem] italic leading-[1.3] text-slate-600">
              {detail.footnote}
            </p>
          </PortalDetailCard>

          <CompanyCandidateCtaTray
            detail={detail}
            onCancel={onCancel}
            onSaveDraft={onSaveDraft}
          />
        </div>

        <CompanyCandidateMobileDock label={detail.mobileDockLabel} />
      </PortalDetailCanvas>
    </section>
  );
}

export function CompanyCandidateDetailView({
  detail,
  onCancel,
  onClose,
  onSaveDraft,
}: {
  detail: CompanyCandidateDetailResponse;
  onCancel: () => void;
  onClose: () => void;
  onSaveDraft: () => void;
}) {
  return (
    <>
      <div className="hidden lg:block">
        <CompanyCandidateDesktopShell
          detail={detail}
          onCancel={onCancel}
          onClose={onClose}
          onSaveDraft={onSaveDraft}
        />
      </div>
      <div className="lg:hidden">
        <CompanyCandidateMobileShell
          detail={detail}
          onCancel={onCancel}
          onClose={onClose}
          onSaveDraft={onSaveDraft}
        />
      </div>
    </>
  );
}
