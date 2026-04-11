import type { CSSProperties } from "react";
import { NavLink } from "react-router-dom";
import type { CandidateCvResponse } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { WedooLogo } from "../site/branding";

const desktopLeftPanelStyle = {
  clipPath: "polygon(12% 0, 80% 0, 100% 90%, 91% 100%, 0 100%, 0 11%)",
} satisfies CSSProperties;

const desktopRightPanelStyle = {
  clipPath: "polygon(21% 0, 100% 0, 100% 100%, 9% 100%, 0 11%, 10% 0)",
} satisfies CSSProperties;

const outlinedButtonClassName =
  "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] border-2 border-brand-mint-deep bg-brand-page text-brand-ink transition hover:bg-brand-mint-deep/10";
const filledButtonClassName =
  "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] bg-brand-mint-deep text-brand-ink";

function CandidateCvSectionList({
  items,
  title,
  titleClassName,
  listClassName,
}: {
  items: readonly string[];
  listClassName: string;
  title: string;
  titleClassName: string;
}) {
  return (
    <section>
      <h2 className={titleClassName}>{title}</h2>
      <ul className={listClassName}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}

function CandidateCvMobileDock({ label }: { label: string }) {
  return (
    <nav
      aria-label={label}
      className="mt-8 flex items-center justify-between bg-brand-mint-deep px-[35px] py-[11px]"
    >
      <NavLink
        aria-label="Apri dashboard candidato"
        className="inline-flex h-8 w-8 items-center justify-center text-brand-ink"
        to="/portale/candidato"
      >
        <AppIcon className="h-7 w-7" name="home-line" />
      </NavLink>
      <button
        aria-label="Salvataggi candidati in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center text-brand-ink"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="star-line" />
      </button>
      <button
        aria-label="Annunci candidati in arrivo"
        className="inline-flex h-8 w-8 items-center justify-center text-brand-ink"
        type="button"
      >
        <AppIcon className="h-7 w-7" name="briefcase-line" />
      </button>
      <NavLink
        aria-label="Apri profilo candidato"
        className="inline-flex h-8 w-8 items-center justify-center text-brand-ink"
        to="/portale/candidato/cv"
      >
        <AppIcon className="h-7 w-7" name="user-line" />
      </NavLink>
    </nav>
  );
}

function CandidateCvDesktopShell({ response }: { response: CandidateCvResponse }) {
  return (
    <section className="hidden min-[1280px]:block" data-candidate-cv-layout="desktop">
      <div className="mx-auto max-w-[1440px] bg-brand-page px-[18px] pb-[28px] pt-[25px]">
        <div className="relative min-h-[971px] overflow-hidden">
          <NavLink
            aria-label="Torna alla dashboard candidato"
            className="absolute left-[9px] top-[4px] inline-flex h-12 w-12 items-center justify-center text-brand-ink transition hover:text-brand-mint-deep"
            to={response.backPath}
          >
            <AppIcon className="h-10 w-10" name="arrow-left-line" />
          </NavLink>

          <p className="absolute left-[362px] top-[10px] max-w-[430px] text-center font-wedoo-body text-[24px] leading-[1.02] text-brand-ink">
            {response.photoHint}
          </p>

          <div
            className="absolute left-[8px] top-[0px] h-[960px] w-[770px] overflow-hidden border-[5px] border-brand-mint-deep bg-brand-page"
            style={desktopLeftPanelStyle}
          >
            <div className="flex flex-col items-center px-[74px] pb-[64px] pt-[54px] text-center">
              <div className="flex h-[200px] w-[200px] items-center justify-center overflow-hidden rounded-full bg-brand-page">
                <AppImage
                  alt={response.candidate.fullName}
                  className="h-full w-full object-cover"
                  priority
                  src={assetPath(response.candidate.avatar)}
                />
              </div>

              <h1 className="pt-[21px] font-wedoo-heading text-[48px] leading-none text-brand-ink">
                {response.candidate.fullName}
              </h1>

              <button
                className={`${filledButtonClassName} mt-[34px] min-h-[67px] w-[388px] px-6 text-[24px] leading-none`}
                type="button"
              >
                {response.candidate.goalLabel}
              </button>

              <p className="pt-[8px] font-wedoo-body text-[18px] leading-none text-brand-ink">
                {response.sidebar.backHelperLabel}
              </p>

              <button
                className={`${outlinedButtonClassName} mt-[11px] min-h-[75px] w-[388px] gap-6 px-6 text-[24px] leading-none`}
                type="button"
              >
                <span>{response.sidebar.editLabel}</span>
                <AppIcon className="h-6 w-6" name="chevron-down-line" />
              </button>

              <p className="pt-[13px] font-wedoo-accent text-[24px] leading-none text-brand-ink">
                {response.sidebar.editTitleLabel}
              </p>

              <button
                className="mt-[10px] inline-flex items-center gap-2 text-[24px] leading-none text-brand-ink transition hover:text-brand-mint-deep"
                type="button"
              >
                <AppIcon className="h-6 w-6" name="cloud-upload-line" />
                <span className="font-wedoo-accent">{response.sidebar.uploadCvLabel}</span>
              </button>

              <p className="pt-[10px] font-wedoo-accent text-[24px] leading-none text-brand-ink">
                {response.sidebar.editSecondaryLabel}
              </p>

              <button
                className={`${outlinedButtonClassName} mt-[21px] min-h-[74px] w-[399px] gap-6 px-6 text-[24px] leading-none`}
                type="button"
              >
                <span>{response.sidebar.activityLabel}</span>
                <AppIcon className="h-6 w-6" name="chevron-down-line" />
              </button>

              <div className="grid gap-[8px] pt-[16px] font-wedoo-accent text-[24px] leading-none text-brand-ink">
                {response.sidebar.activityItems.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </div>

          <div
            className="absolute left-[609px] top-[6px] h-[960px] w-[795px] overflow-hidden border-[5px] border-brand-mint-deep bg-brand-page"
            style={desktopRightPanelStyle}
          >
            <div className="px-[174px] pb-[92px] pt-[92px]">
              <CandidateCvSectionList
                items={response.sections.personalDataItems}
                listClassName="mt-[18px] list-disc space-y-[6px] pl-[30px] font-wedoo-body text-[22px] leading-[1.08] text-brand-ink"
                title={response.sections.personalDataTitle}
                titleClassName="font-wedoo-accent text-[36px] leading-none text-brand-ink"
              />

              <CandidateCvSectionList
                items={response.sections.workPreferenceItems}
                listClassName="mt-[26px] list-disc space-y-[6px] pl-[30px] font-wedoo-body text-[22px] leading-[1.08] text-brand-ink"
                title={response.sections.workPreferenceTitle}
                titleClassName="pt-[92px] font-wedoo-accent text-[36px] leading-none text-brand-ink"
              />

              <CandidateCvSectionList
                items={response.sections.agendaItems}
                listClassName="mt-[24px] list-disc space-y-[12px] pl-[30px] font-wedoo-body text-[22px] leading-[1.08] text-brand-ink"
                title={response.sections.agendaTitle}
                titleClassName="pt-[70px] font-wedoo-accent text-[36px] leading-none text-brand-ink"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CandidateCvMobileShell({ response }: { response: CandidateCvResponse }) {
  return (
    <section
      className="mx-auto max-w-[360px] bg-brand-page px-[20px] pb-0 pt-[27px] min-[1280px]:hidden"
      data-candidate-cv-layout="mobile"
    >
      <header className="flex items-center justify-between">
        <WedooLogo imageClassName="h-[18px]" to={response.backPath} variant="wordmark" />
        <div className="flex items-center gap-[20px] text-brand-ink">
          <button
            aria-label="Notifiche candidato in arrivo"
            className="inline-flex h-8 w-8 items-center justify-center"
            type="button"
          >
            <AppIcon className="h-7 w-7" name="bell-line" />
          </button>
          <button
            aria-label="Altro menu candidato in arrivo"
            className="inline-flex h-8 w-8 items-center justify-center"
            type="button"
          >
            <AppIcon className="h-7 w-7" name="more-menu-line" />
          </button>
        </div>
      </header>

      <div className="flex flex-col items-center pt-[19px] text-center">
        <div className="flex h-[137px] w-[137px] items-center justify-center overflow-hidden rounded-full bg-brand-page">
          <AppImage
            alt={response.candidate.fullName}
            className="h-full w-full object-cover"
            priority
            src={assetPath(response.candidate.avatar)}
          />
        </div>

        <h1 className="pt-[12px] font-wedoo-heading text-[34px] leading-none text-brand-ink">
          {response.candidate.fullName}
        </h1>

        <button
          className={`${filledButtonClassName} mt-[16px] min-h-[49px] w-full max-w-[318px] px-4 text-[20px] leading-none`}
          type="button"
        >
          {response.candidate.goalLabel}
        </button>

        <button
          className={`${outlinedButtonClassName} mt-[16px] min-h-[47px] w-[248px] gap-4 px-6 text-[20px] leading-none`}
          type="button"
        >
          <span>{response.sidebar.editLabel}</span>
          <AppIcon className="h-5 w-5" name="chevron-down-line" />
        </button>

        <p className="pt-[10px] font-wedoo-accent text-[20px] leading-none text-brand-ink">
          {response.sidebar.editTitleLabel}
        </p>

        <button
          className="mt-[8px] inline-flex items-center gap-2 text-brand-ink transition hover:text-brand-mint-deep"
          type="button"
        >
          <AppIcon className="h-5 w-5" name="cloud-upload-line" />
          <span className="font-wedoo-accent text-[20px] leading-none">
            {response.sidebar.uploadCvLabel}
          </span>
        </button>

        <p className="pt-[9px] font-wedoo-accent text-[20px] leading-none text-brand-ink">
          {response.sidebar.editSecondaryLabel}
        </p>

        <button
          className={`${outlinedButtonClassName} mt-[12px] min-h-[46px] w-[248px] gap-4 px-6 text-[20px] leading-none`}
          type="button"
        >
          <span>{response.sidebar.activityLabel}</span>
          <AppIcon className="h-5 w-5" name="chevron-down-line" />
        </button>

        <div className="grid gap-[5px] pt-[12px] font-wedoo-accent text-[20px] leading-none text-brand-ink">
          {response.sidebar.activityItems.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </div>
      </div>

      <div className="pt-[31px]">
        <CandidateCvSectionList
          items={response.sections.personalDataItems}
          listClassName="mt-[11px] list-disc space-y-[5px] pl-[18px] font-wedoo-body text-[16px] leading-[1.12] text-brand-ink"
          title={response.sections.personalDataTitle}
          titleClassName="font-wedoo-accent text-[24px] leading-none text-brand-ink"
        />

        <CandidateCvSectionList
          items={response.sections.workPreferenceItems}
          listClassName="mt-[11px] list-disc space-y-[5px] pl-[18px] font-wedoo-body text-[16px] leading-[1.12] text-brand-ink"
          title={response.sections.workPreferenceTitle}
          titleClassName="pt-[28px] font-wedoo-accent text-[24px] leading-none text-brand-ink"
        />

        <CandidateCvSectionList
          items={response.sections.agendaItems}
          listClassName="mt-[11px] list-disc space-y-[6px] pl-[18px] font-wedoo-body text-[16px] leading-[1.12] text-brand-ink"
          title={response.sections.agendaTitle}
          titleClassName="pt-[30px] font-wedoo-accent text-[24px] leading-none text-brand-ink"
        />
      </div>

      <CandidateCvMobileDock label={response.mobileDockLabel} />
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
