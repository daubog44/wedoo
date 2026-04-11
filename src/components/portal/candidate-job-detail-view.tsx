import { NavLink } from "react-router-dom";
import type { CandidateJobDetailResponse } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { SiteIcon } from "../site/site-icon";

const topOutlineButtonClassName =
  "font-wedoo-accent inline-flex min-h-[43px] items-center justify-center rounded-[8px] border border-brand-violet px-4 py-2 text-[1.125rem] leading-none text-brand-ink transition hover:bg-brand-violet hover:text-white md:text-[1.5rem]";
const footerOutlineButtonClassName =
  "font-wedoo-accent inline-flex min-h-[52px] items-center justify-center rounded-[8px] border border-brand-violet bg-transparent px-4 py-2 text-[1.125rem] leading-none text-brand-ink transition hover:bg-brand-violet/10 md:text-[1.5rem]";
const primaryButtonClassName =
  "font-wedoo-accent inline-flex min-h-[52px] items-center justify-center rounded-[8px] bg-brand-violet px-5 py-2 text-[1.125rem] leading-none text-white transition hover:bg-brand-violet-600 md:text-[1.5rem]";

function CandidateJobRichTextBox({
  body,
  className,
  minHeightClassName,
  toolbarLabel,
}: {
  body: string;
  className?: string;
  minHeightClassName: string;
  toolbarLabel: string;
}) {
  return (
    <div className={cn("overflow-hidden rounded-[20px] border border-brand-violet", className)}>
      <div className="flex items-center gap-4 border-b border-brand-violet px-4 py-3 font-wedoo-body text-[0.95rem] leading-none text-black">
        <span className="font-bold">G</span>
        <span className="italic">C</span>
        <span className="underline">S</span>
        <span>{toolbarLabel}</span>
        <SiteIcon className="h-4 w-4" name="menu" />
      </div>
      <div
        className={cn(
          "font-wedoo-body px-4 py-4 text-[1rem] leading-[1.25] text-black md:px-8 md:py-7 md:text-[1.375rem]",
          minHeightClassName,
        )}
      >
        {body ? <p>{body}</p> : null}
      </div>
    </div>
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
  return (
    <section
      className="mx-auto w-full max-w-[1296px] bg-brand-lavender-50 px-[60px] pb-[94px] pt-[43px]"
      data-candidate-job-detail-layout="desktop"
    >
      <div className="relative">
        <button
          aria-label="Chiudi dettaglio annuncio"
          className="absolute right-[2px] top-[2px] inline-flex h-12 w-12 items-center justify-center text-black transition hover:text-brand-violet"
          onClick={onClose}
          type="button"
        >
          <SiteIcon className="h-8 w-8" name="close" />
        </button>

        <div className="grid gap-10 pt-5 md:grid-cols-[180px_minmax(0,1fr)] md:items-start">
          <div className="flex h-[180px] w-[180px] items-center justify-center rounded-full bg-white">
            <AppImage
              alt={detail.company.name}
              className="h-[84px] w-[84px] object-contain"
              priority
              src={assetPath(detail.company.logo)}
            />
          </div>

          <div className="space-y-4">
            <div>
              <h1 className="font-wedoo-heading text-[48px] uppercase leading-none text-black">
                {detail.title}
              </h1>
              <p className="font-wedoo-accent pt-2 text-[36px] leading-none text-black">
                Settore: {detail.company.sectorLabel}
              </p>
            </div>
            <p className="font-wedoo-body max-w-[990px] text-[18px] leading-[1.1] text-black">
              {detail.contactLine}
            </p>

            <div className="flex flex-wrap items-center gap-5 pt-4">
              <p className="font-wedoo-accent mr-6 text-[24px] leading-none text-black">
                {detail.company.name}
              </p>
              <button className={cn(topOutlineButtonClassName, "min-w-[272px]")} type="button">
                {detail.ctas.certificationsLabel}
              </button>
              <button className={cn(topOutlineButtonClassName, "min-w-[156px]")} type="button">
                {detail.ctas.contactLabel}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10">
          <section>
            <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
              {detail.sections.summaryTitle}
            </h2>
            <ul className="mt-5 list-disc space-y-1 pl-6 font-wedoo-body text-[22px] leading-[1.1] text-black">
              {detail.sections.summaryItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="pt-6">
            <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
              {detail.sections.companyTitle}
            </h2>
            <CandidateJobRichTextBox
              body={detail.sections.companyBody}
              className="mt-6"
              minHeightClassName="min-h-[330px]"
              toolbarLabel={detail.editorToolbarLabel}
            />
          </section>

          <section className="pt-8">
            <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
              {detail.sections.offerTitle}
            </h2>
            <ul className="mt-6 list-disc space-y-1 pl-6 font-wedoo-body text-[22px] leading-[1.1] text-black">
              {detail.sections.offerItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="pt-8">
            <h2 className="font-wedoo-accent text-[24px] leading-none text-black">
              {detail.sections.descriptionTitle}
            </h2>
            <CandidateJobRichTextBox
              body={detail.sections.descriptionBody}
              className="mt-6"
              minHeightClassName="min-h-[275px]"
              toolbarLabel={detail.editorToolbarLabel}
            />
          </section>

          <section className="pt-10">
            <h2 className="font-wedoo-accent text-[24px] leading-none text-black">
              {detail.skills.hardTitle}
            </h2>
            <ul className="mt-4 list-disc space-y-1 pl-6 font-wedoo-body text-[22px] leading-[1.1] text-black">
              {detail.skills.hardItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="pt-6">
            <h2 className="font-wedoo-accent text-[24px] leading-none text-black">
              {detail.skills.softTitle}
            </h2>
            <ul className="mt-4 list-disc space-y-1 pl-6 font-wedoo-body text-[22px] leading-[1.1] text-black">
              {detail.skills.softItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="pt-10">
            <h2 className="font-wedoo-accent text-[36px] leading-none text-black">
              {detail.requirementsLabel}
            </h2>
            <div className="space-y-2 pt-12 font-wedoo-body text-[22px] italic leading-[1.1] text-black">
              {detail.footnotes.map((note) => (
                <p key={note}>{note}</p>
              ))}
            </div>
          </section>

          <div className="flex justify-end pt-14">
            <div className="flex flex-col items-end gap-7">
              <div className="flex items-center gap-6">
                <SiteIcon className="h-[44px] w-[44px] text-brand-lavender-300" name="star" />
                <button className={cn(primaryButtonClassName, "min-w-[254px]")} type="button">
                  {detail.ctas.primaryLabel}
                </button>
              </div>
              <div className="flex gap-5">
                <button
                  className={cn(footerOutlineButtonClassName, "min-w-[150px]")}
                  onClick={onCancel}
                  type="button"
                >
                  {detail.ctas.cancelLabel}
                </button>
                <button
                  className={cn(footerOutlineButtonClassName, "min-w-[189px]")}
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

function CandidateJobMobileDock() {
  return (
    <nav
      aria-label="Navigazione rapida candidato"
      className="mt-10 flex items-center justify-between bg-brand-violet-300 px-[21px] py-[11px]"
    >
      <NavLink
        aria-label="Apri dashboard candidato"
        className="inline-flex h-8 w-8 items-center justify-center text-black"
        to="/portale/candidato"
      >
        <AppIcon className="h-7 w-7" name="home-line" />
      </NavLink>
      <button
        aria-label="Salvataggi in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center text-black"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="star-line" />
      </button>
      <button
        aria-label="Chat in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center text-black"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="chats-line" />
      </button>
      <NavLink
        aria-label="Apri profilo candidato"
        className="inline-flex h-8 w-8 items-center justify-center text-black"
        to="/portale/candidato/cv"
      >
        <AppIcon className="h-7 w-7" name="user-line" />
      </NavLink>
    </nav>
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
  return (
    <section
      className="mx-auto w-full max-w-[360px] bg-brand-lavender-50 px-[21px] pb-[20px] pt-[38px]"
      data-candidate-job-detail-layout="mobile"
    >
      <div className="relative">
        <button
          aria-label="Chiudi dettaglio annuncio"
          className="absolute right-0 top-0 inline-flex h-[29px] w-[29px] items-center justify-center text-black transition hover:text-brand-violet"
          onClick={onClose}
          type="button"
        >
          <SiteIcon className="h-5 w-5" name="close" />
        </button>

        <div className="px-3 pt-1">
          <h1 className="font-wedoo-heading text-center text-[28px] uppercase leading-none text-black">
            {detail.title}
          </h1>
          <p className="font-wedoo-accent pt-2 text-center text-[24px] leading-none text-black">
            Settore: {detail.company.sectorLabel}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3 pt-7 text-center">
          <div className="flex h-[87px] w-[87px] items-center justify-center rounded-full bg-white">
            <AppImage
              alt={detail.company.name}
              className="h-[42px] w-[42px] object-contain"
              priority
              src={assetPath(detail.company.logo)}
            />
          </div>
          <p className="font-wedoo-accent text-[24px] leading-none text-black">
            {detail.company.name}
          </p>
        </div>

        <p className="font-wedoo-body pt-5 text-[16px] leading-[1.12] text-black">
          {detail.contactLine}
        </p>

        <div className="flex flex-col gap-3 pt-3">
          <button className={cn(topOutlineButtonClassName, "min-w-[272px] self-start")} type="button">
            {detail.ctas.certificationsLabel}
          </button>
          <button className={cn(topOutlineButtonClassName, "min-w-[156px] self-start")} type="button">
            {detail.ctas.contactLabel}
          </button>
        </div>

        <section className="pt-6">
          <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
            {detail.sections.summaryTitle}
          </h2>
          <ul className="mt-4 list-disc space-y-1 pl-6 font-wedoo-body text-[16px] leading-[1.12] text-black">
            {detail.sections.summaryItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="pt-6">
          <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
            {detail.sections.companyTitle}
          </h2>
          <CandidateJobRichTextBox
            body={detail.sections.companyBody}
            className="mt-4"
            minHeightClassName="min-h-[392px]"
            toolbarLabel={detail.editorToolbarLabel}
          />
        </section>

        <section className="pt-6">
          <h2 className="font-wedoo-accent text-[24px] font-bold leading-none text-black">
            {detail.sections.offerTitle}
          </h2>
          <ul className="mt-4 list-disc space-y-1 pl-6 font-wedoo-body text-[16px] leading-[1.12] text-black">
            {detail.sections.offerItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="pt-6">
          <h2 className="font-wedoo-accent text-[24px] leading-none text-black">
            {detail.sections.descriptionTitle}
          </h2>
          <CandidateJobRichTextBox
            body={detail.sections.descriptionBody}
            className="mt-4"
            minHeightClassName="min-h-[472px]"
            toolbarLabel={detail.editorToolbarLabel}
          />
        </section>

        <section className="pt-6">
          <h2 className="font-wedoo-accent text-[24px] leading-none text-black">
            {detail.skills.hardTitle}
          </h2>
          <ul className="mt-4 list-disc space-y-1 pl-6 font-wedoo-body text-[16px] leading-[1.12] text-black">
            {detail.skills.hardItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="pt-6">
          <h2 className="font-wedoo-accent text-[24px] leading-none text-black">
            {detail.skills.softTitle}
          </h2>
          <ul className="mt-4 list-disc space-y-1 pl-6 font-wedoo-body text-[16px] leading-[1.12] text-black">
            {detail.skills.softItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="pt-7">
          <h2 className="font-wedoo-accent text-[24px] leading-[1.08] text-black">
            {detail.requirementsLabel}
          </h2>
          <div className="space-y-4 pt-4 font-wedoo-body text-[16px] italic leading-[1.12] text-black">
            {detail.footnotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </section>

        <div className="flex flex-col items-end gap-4 pt-6">
          <div className="flex w-full items-center justify-end gap-4">
            <SiteIcon className="h-8 w-8 text-brand-lavender-300" name="star" />
            <button className={cn(primaryButtonClassName, "min-w-[202px]")} type="button">
              {detail.ctas.primaryLabel}
            </button>
          </div>
          <button
            className={cn(footerOutlineButtonClassName, "min-w-[162px]")}
            onClick={onSaveDraft}
            type="button"
          >
            {detail.ctas.saveDraftLabel}
          </button>
          <button
            className={cn(footerOutlineButtonClassName, "min-w-[106px]")}
            onClick={onCancel}
            type="button"
          >
            {detail.ctas.cancelLabel}
          </button>
        </div>

        <CandidateJobMobileDock />
      </div>
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
