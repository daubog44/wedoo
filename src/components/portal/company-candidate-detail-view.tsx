import { NavLink } from "react-router-dom";
import type { CompanyCandidateDetailResponse } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { SiteIcon } from "../site/site-icon";

const outlineButtonClassName =
  "font-wedoo-accent inline-flex min-h-[49px] items-center justify-center rounded-[8px] border border-brand-mint-deep bg-transparent px-4 py-2 text-[1.125rem] leading-none text-brand-ink transition hover:bg-brand-mint/35 md:min-h-[58px] md:text-[1.5rem]";
const softFillButtonClassName =
  "font-wedoo-accent inline-flex min-h-[49px] items-center justify-center rounded-[8px] border border-brand-mint-deep bg-brand-mint-400 px-4 py-2 text-[1.125rem] leading-none text-brand-ink transition hover:bg-brand-mint md:min-h-[58px] md:text-[1.5rem]";
const primaryButtonClassName =
  "font-wedoo-accent inline-flex min-h-[49px] items-center justify-center rounded-[8px] bg-brand-mint-deep px-5 py-2 text-[1.125rem] leading-none text-brand-ink transition hover:bg-brand-mint md:min-h-[58px] md:text-[1.5rem]";

function CompanyCandidateRichTextBox({
  body,
  minHeightClassName,
  toolbarLabel,
}: {
  body: string;
  minHeightClassName: string;
  toolbarLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-black/65 bg-transparent">
      <div className="flex items-center gap-4 border-b border-black/65 px-4 py-3 font-wedoo-body text-[1rem] leading-none text-black md:px-8 md:text-[1.375rem]">
        <span className="font-bold">G</span>
        <span className="italic">C</span>
        <span className="underline">S</span>
        <span>{toolbarLabel}</span>
        <SiteIcon className="ml-auto h-4 w-4 md:h-5 md:w-5" name="menu" />
      </div>
      <div
        className={cn(
          "font-wedoo-body px-4 py-4 text-[1rem] leading-[1.2] text-black md:px-8 md:py-7 md:text-[1.375rem]",
          minHeightClassName,
        )}
      >
        <p>{body}</p>
      </div>
    </div>
  );
}

function CompanyCandidateBulletList({
  items,
  textClassName,
}: {
  items: readonly string[];
  textClassName: string;
}) {
  return (
    <ul className={cn("list-disc space-y-1 pl-6 text-black", textClassName)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
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
  return (
    <section
      className="mx-auto w-full max-w-[1296px] bg-brand-mint-50 px-[60px] pb-[98px] pt-[52px]"
      data-company-candidate-detail-layout="desktop"
    >
      <div className="relative">
        <button
          aria-label={detail.ctas.closeLabel}
          className="absolute right-[2px] top-[2px] inline-flex h-12 w-12 items-center justify-center text-black transition hover:text-brand-mint-deep"
          onClick={onClose}
          type="button"
        >
          <SiteIcon className="h-8 w-8" name="close" />
        </button>

        <div className="grid gap-10 pt-4 md:grid-cols-[182px_minmax(0,1fr)] md:items-start">
          <div className="overflow-hidden rounded-full">
            <AppImage
              alt={detail.candidate.fullName}
              className="h-[182px] w-[182px] object-cover"
              priority
              src={assetPath(detail.candidate.avatar)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="font-wedoo-heading text-[48px] uppercase leading-none text-black">
                {detail.candidate.fullName}
              </h1>
              <p className="font-wedoo-accent pt-2 text-[36px] leading-none text-black">
                {detail.candidate.statusLabel}
              </p>
            </div>

            <CompanyCandidateBulletList
              items={detail.contactItems}
              textClassName="font-wedoo-accent text-[1.5rem] leading-[1.15]"
            />

            <p className="font-wedoo-accent pt-2 text-[1.5rem] leading-none text-black">
              {detail.availabilityLabel}
            </p>
          </div>
        </div>

        <div className="pt-10">
          <section>
            <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
              {detail.sections.descriptionTitle}
            </h2>
            <div className="mt-6">
              <CompanyCandidateRichTextBox
                body={detail.sections.descriptionBody}
                minHeightClassName="min-h-[330px]"
                toolbarLabel={detail.editorToolbarLabel}
              />
            </div>
          </section>

          <section className="pt-8">
            <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
              {detail.sections.educationTitle}
            </h2>
            <div className="mt-5">
              <CompanyCandidateBulletList
                items={detail.sections.educationItems}
                textClassName="font-wedoo-body text-[1.375rem] leading-[1.12]"
              />
            </div>
          </section>

          <section className="pt-8">
            <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
              {detail.sections.certificationsTitle}
            </h2>
            <div className="mt-5">
              <CompanyCandidateBulletList
                items={detail.sections.certificationsItems}
                textClassName="font-wedoo-body text-[1.375rem] leading-[1.12]"
              />
            </div>
          </section>

          <section className="pt-8">
            <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
              {detail.sections.experienceTitle}
            </h2>
            <div className="mt-5">
              <CompanyCandidateBulletList
                items={detail.sections.experienceItems}
                textClassName="font-wedoo-body text-[1.375rem] leading-[1.12]"
              />
            </div>
          </section>

          <section className="pt-8">
            <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
              {detail.sections.softSkillsTitle}
            </h2>
            <div className="mt-5">
              <CompanyCandidateBulletList
                items={detail.sections.softSkillItems}
                textClassName="font-wedoo-body text-[1.375rem] leading-[1.12]"
              />
            </div>
          </section>

          <section className="pt-8">
            <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
              {detail.sections.hardSkillsTitle}
            </h2>
            <div className="mt-5">
              <CompanyCandidateBulletList
                items={detail.sections.hardSkillItems}
                textClassName="font-wedoo-body text-[1.375rem] leading-[1.12]"
              />
            </div>
          </section>

          <p className="pt-8 font-wedoo-body text-[1.375rem] italic leading-[1.12] text-black">
            {detail.footnote}
          </p>

          <div className="flex justify-end pt-10">
            <div className="flex flex-col items-end gap-6">
              <div className="flex items-center gap-6">
                <SiteIcon className="h-[44px] w-[44px] text-brand-lavender-300" name="star" />
                <button className={cn(primaryButtonClassName, "min-w-[254px]")} type="button">
                  {detail.ctas.primaryLabel}
                </button>
              </div>
              <button className={cn(softFillButtonClassName, "min-w-[168px]")} type="button">
                {detail.ctas.resumeLabel}
              </button>
              <div className="flex gap-5">
                <button
                  className={cn(outlineButtonClassName, "min-w-[150px]")}
                  onClick={onCancel}
                  type="button"
                >
                  {detail.ctas.cancelLabel}
                </button>
                <button
                  className={cn(outlineButtonClassName, "min-w-[189px]")}
                  onClick={onSaveDraft}
                  type="button"
                >
                  {detail.ctas.saveDraftLabel}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CompanyCandidateMobileDock({
  label,
}: {
  label: string;
}) {
  return (
    <nav
      aria-label={label}
      className="mt-10 flex items-center justify-between bg-brand-mint-deep px-[18px] py-[11px]"
    >
      <NavLink
        aria-label="Apri dashboard azienda"
        className="inline-flex h-8 w-8 items-center justify-center text-black"
        to="/portale/azienda"
      >
        <AppIcon className="h-7 w-7" name="home-line" />
      </NavLink>
      <button
        aria-label="Candidati salvati in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center text-black"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="star-line" />
      </button>
      <button
        aria-label="Chat recruiter in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center text-black"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="chats-line" />
      </button>
      <button
        aria-label="Messaggi recruiter in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center text-black"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="mail-line" />
      </button>
      <button
        aria-label="Profilo azienda in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center text-black"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="user-line" />
      </button>
    </nav>
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
  return (
    <section
      className="mx-auto w-full max-w-[360px] bg-brand-mint-50 px-[21px] pb-0 pt-[38px]"
      data-company-candidate-detail-layout="mobile"
    >
      <div className="relative">
        <button
          aria-label={detail.ctas.closeLabel}
          className="absolute right-0 top-0 inline-flex h-[29px] w-[29px] items-center justify-center text-black transition hover:text-brand-mint-deep"
          onClick={onClose}
          type="button"
        >
          <SiteIcon className="h-5 w-5" name="close" />
        </button>

        <div className="flex flex-col items-center pt-2 text-center">
          <div className="overflow-hidden rounded-full">
            <AppImage
              alt={detail.candidate.fullName}
              className="h-[130px] w-[130px] object-cover"
              priority
              src={assetPath(detail.candidate.avatar)}
            />
          </div>
          <h1 className="font-wedoo-heading pt-4 text-[28px] uppercase leading-none text-black">
            {detail.candidate.fullName}
          </h1>
          <p className="font-wedoo-accent pt-2 text-[24px] leading-none text-black">
            {detail.candidate.statusLabel}
          </p>
        </div>

        <div className="pt-4">
          <CompanyCandidateBulletList
            items={detail.contactItems}
            textClassName="font-wedoo-body text-[1rem] leading-[1.15]"
          />
        </div>

        <p className="font-wedoo-accent pt-3 text-[24px] leading-none text-black">
          {detail.availabilityLabel}
        </p>

        <section className="pt-4">
          <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
            {detail.sections.descriptionTitle}
          </h2>
          <div className="mt-3">
            <CompanyCandidateRichTextBox
              body={detail.sections.descriptionBody}
              minHeightClassName="min-h-[347px]"
              toolbarLabel={detail.editorToolbarLabel}
            />
          </div>
        </section>

        <section className="pt-5">
          <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
            {detail.sections.educationTitle}
          </h2>
          <div className="mt-4">
            <CompanyCandidateBulletList
              items={detail.sections.educationItems}
              textClassName="font-wedoo-body text-[1rem] leading-[1.12]"
            />
          </div>
        </section>

        <section className="pt-5">
          <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
            {detail.sections.certificationsTitle}
          </h2>
          <div className="mt-4">
            <CompanyCandidateBulletList
              items={detail.sections.certificationsItems}
              textClassName="font-wedoo-body text-[1rem] leading-[1.12]"
            />
          </div>
          <button className={cn(primaryButtonClassName, "mt-4 min-w-[277px]")} type="button">
            {detail.ctas.certificationLabel}
          </button>
        </section>

        <section className="pt-5">
          <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
            {detail.sections.experienceTitle}
          </h2>
          <div className="mt-4">
            <CompanyCandidateBulletList
              items={detail.sections.experienceItems}
              textClassName="font-wedoo-body text-[1rem] leading-[1.12]"
            />
          </div>
        </section>

        <section className="pt-5">
          <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
            {detail.sections.softSkillsTitle}
          </h2>
          <div className="mt-4">
            <CompanyCandidateBulletList
              items={detail.sections.softSkillItems}
              textClassName="font-wedoo-body text-[1rem] leading-[1.12]"
            />
          </div>
        </section>

        <section className="pt-5">
          <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
            {detail.sections.hardSkillsTitle}
          </h2>
          <div className="mt-4">
            <CompanyCandidateBulletList
              items={detail.sections.hardSkillItems}
              textClassName="font-wedoo-body text-[1rem] leading-[1.12]"
            />
          </div>
        </section>

        <p className="pt-5 font-wedoo-body text-[1rem] italic leading-[1.12] text-black">
          {detail.footnote}
        </p>

        <div className="flex flex-col items-end gap-4 pt-6">
          <div className="flex w-full items-center justify-end gap-4">
            <SiteIcon className="h-8 w-8 text-brand-lavender-300" name="star" />
            <button className={cn(primaryButtonClassName, "min-w-[215px]")} type="button">
              {detail.ctas.primaryLabel}
            </button>
          </div>
          <button className={cn(softFillButtonClassName, "min-w-[168px]")} type="button">
            {detail.ctas.resumeLabel}
          </button>
          <button
            className={cn(outlineButtonClassName, "min-w-[189px]")}
            onClick={onSaveDraft}
            type="button"
          >
            {detail.ctas.saveDraftLabel}
          </button>
          <button
            className={cn(outlineButtonClassName, "min-w-[150px]")}
            onClick={onCancel}
            type="button"
          >
            {detail.ctas.cancelLabel}
          </button>
        </div>

        <CompanyCandidateMobileDock label={detail.mobileDockLabel} />
      </div>
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
