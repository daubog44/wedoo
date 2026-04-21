import { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { sdgs } from "../../data/core";
import type {
  CompanyJobManagementResponse,
  CompanyJobManagementSectionId,
} from "../../data/types";
import type { JobDraft } from "../../data/job-draft";
import { AppIcon } from "../../lib/icons";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

function SidebarGhostSelect({
  ariaLabel,
  onChange,
  options,
  placeholder,
  value,
}: {
  ariaLabel: string;
  onChange: (value: string) => void;
  options: readonly { id: string; label: string }[];
  placeholder: string;
  value: string;
}) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        className="font-wedoo-accent h-[3.3rem] w-full appearance-none rounded-[16px] border border-[var(--wedoo-line)] bg-white/84 px-4 pr-10 text-left text-[18px] leading-none text-brand-ink outline-none transition focus:border-[var(--wedoo-violet)] focus:ring-4 focus:ring-[rgba(116,80,230,0.08)]"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <AppIcon
        className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-ink"
        name="chevron-down-line"
      />
    </div>
  );
}

function CompanyPublishedJobsDesktopRail({
  activityValue,
  draft,
  onActivityChange,
  onCreateNew,
  onPublishedJobChange,
  onSectionChange,
  onViewApplications,
  onViewPublished,
  publishedJobValue,
  response,
}: {
  activityValue: string;
  draft: JobDraft;
  onActivityChange: (value: string) => void;
  onCreateNew: () => void | Promise<void>;
  onPublishedJobChange: (value: string) => void;
  onSectionChange: (section: CompanyJobManagementSectionId) => void;
  onViewApplications: () => void;
  onViewPublished: () => void;
  publishedJobValue: string;
  response: CompanyJobManagementResponse;
}) {
  return (
    <aside className="flex min-h-[920px] flex-col rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-8 pb-8 pt-8 text-white shadow-[0_40px_100px_-72px_rgba(0,0,0,0.82)]">
      <div className="flex items-center gap-4">
        <div className="flex h-[88px] w-[88px] items-center justify-center rounded-[1.6rem] border border-white/10 bg-white/95">
          <AppImage
            alt={response.company.legalName}
            className="h-[42px] w-[42px] object-contain"
            priority
            src={assetPath(response.company.logo)}
          />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">company workspace</p>
          <h2 className="mt-2 font-wedoo-heading text-[2rem] leading-[0.9] text-white">
            {response.company.legalName}
          </h2>
        </div>
      </div>

      <div className="mt-6 flex w-full justify-between gap-3">
        {response.company.certificationLabels.map((label) => (
          <div
            className="flex min-w-0 flex-1 flex-col items-center gap-2 rounded-[1.2rem] border border-white/10 bg-white/5 px-2 py-3 text-center"
            key={label}
          >
            <span className="inline-flex h-10 w-10 rounded-full border border-white/16 bg-white/5" />
            <span className="font-wedoo-body text-[14px] leading-[1.2] text-white/74">
              {label}
            </span>
          </div>
        ))}
      </div>

      <button
        className="font-wedoo-accent mt-5 inline-flex items-center gap-2 text-[16px] leading-none text-white/76 transition hover:text-white"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="arrow-up-line" />
        {response.company.uploadCertificationsLabel}
      </button>

      <div className="mt-6 grid gap-4">
        <SidebarGhostSelect
          ariaLabel="Attivita azienda"
          onChange={onActivityChange}
          options={draft.catalogs.sectors}
          placeholder={response.company.activityLabel}
          value={activityValue}
        />
        <p className="font-wedoo-accent pt-1 text-[18px] leading-none text-white/76">
          {response.company.candidateInterestLabel}
        </p>
        <SidebarGhostSelect
          ariaLabel="Annunci pubblicati"
          onChange={onPublishedJobChange}
          options={response.publishedJobs}
          placeholder={response.company.publishedJobsLabel}
          value={publishedJobValue}
        />
        <button
          className="font-wedoo-accent text-left text-[16px] leading-none text-white/72 transition hover:text-white"
          onClick={onViewPublished}
          type="button"
        >
          {response.company.viewJobsLabel}
        </button>

        <button
          className="font-wedoo-accent text-left text-[16px] leading-none text-white/72 transition hover:text-white"
          onClick={onViewApplications}
          type="button"
        >
          {response.company.viewApplicationsLabel}
        </button>

        <SidebarGhostSelect
          ariaLabel="Modifica annuncio"
          onChange={(value) => {
            if (value) {
              onSectionChange(value as CompanyJobManagementSectionId);
            }
          }}
          options={response.sectionOptions}
          placeholder={response.company.editLabel}
          value=""
        />
      </div>

      <button
        className="mt-auto inline-flex min-h-[56px] w-full items-center justify-center rounded-[18px] bg-[var(--wedoo-violet)] px-5 py-2 font-wedoo-accent text-[18px] leading-none text-[var(--wedoo-white-soft)] shadow-[0_24px_60px_-38px_rgba(116,80,230,0.68)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]"
        onClick={onCreateNew}
        type="button"
      >
        {response.company.createNewLabel}
      </button>
    </aside>
  );
}

function CompanyPublishedJobsMobileDock({ label }: { label: string }) {
  return (
    <nav
      aria-label={label}
      className="mt-6 flex items-center justify-between rounded-[1.5rem] border border-white/12 bg-[rgba(9,14,24,0.96)] px-4 py-3"
    >
      <NavLink
        aria-label="Apri dashboard azienda"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        to="/portale/azienda"
      >
        <AppIcon className="h-5 w-5" name="home-line" />
      </NavLink>
      <button
        aria-label="Preferiti azienda in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="star-line" />
      </button>
      <button
        aria-label="Chat recruiter in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="chats-line" />
      </button>
      <button
        aria-label="Annunci azienda in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="briefcase-line" />
      </button>
      <button
        aria-label="Profilo azienda in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="user-line" />
      </button>
    </nav>
  );
}

function CompanyPublishedJobsCard({
  card,
  onOpen,
}: {
  card: CompanyJobManagementResponse["publishedJobCards"][number];
  onOpen: (previewPath: string) => void;
}) {
  return (
    <article className="rounded-[2rem] border border-[var(--wedoo-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,248,252,0.94))] px-5 pb-5 pt-5 shadow-[0_26px_72px_-58px_rgba(15,23,40,0.32)]">
      <h2 className="font-wedoo-heading text-center text-[30px] uppercase leading-[0.92] text-brand-ink">
        {card.title}
      </h2>

      <div className="flex items-center gap-4 pt-4">
        <div className="flex h-[66px] w-[66px] items-center justify-center rounded-[1.2rem] border border-[var(--wedoo-line)] bg-white">
          <AppImage
            alt={card.companyName}
            className="h-[32px] w-[32px] object-contain"
            src={assetPath(card.companyLogo)}
          />
        </div>
        <div className="font-wedoo-body text-[18px] leading-[1.08] text-brand-ink">
          <p>{card.companyName}</p>
          <p>{card.locationLabel}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 pt-4">
        {card.tagLabels.map((tag) => (
          <span
            className="font-wedoo-accent inline-flex min-h-[38px] items-center justify-center rounded-full border border-[var(--wedoo-line)] bg-white px-4 py-1 text-[15px] leading-none text-brand-ink"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 pt-4">
        {card.sdgIds.map((id) => {
          const entry = sdgs[id];
          if (!entry) {
            return null;
          }

          return (
            <img
              alt={entry.label}
              className="h-[56px] w-[56px] object-contain"
              key={id}
              src={assetPath(entry.icon)}
            />
          );
        })}
      </div>

      <button
        className="font-wedoo-accent mt-5 inline-flex min-h-[52px] w-full items-center justify-center rounded-[18px] bg-[var(--wedoo-violet)] px-5 py-2 text-[18px] leading-none text-[var(--wedoo-white-soft)] shadow-[0_24px_60px_-38px_rgba(116,80,230,0.68)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]"
        onClick={() => onOpen(card.previewPath)}
        type="button"
      >
        visualizza
      </button>
    </article>
  );
}

type PublishedFilterKey =
  | "location"
  | "training"
  | "certification"
  | "experience"
  | "skill"
  | "sdg";

function PublishedJobsFilterSelect({
  label,
  onChange,
  options,
  value,
}: {
  label: string;
  onChange: (value: string) => void;
  options: readonly { id: string; label: string }[];
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <span aria-hidden="true" className="text-[28px] leading-none text-brand-ink">
        -
      </span>
      <label className="relative block flex-1">
        <span className="sr-only">{label}</span>
        <select
          aria-label={label}
          className="font-wedoo-accent h-[54px] w-full appearance-none rounded-[16px] border border-[var(--wedoo-line)] bg-white/84 px-4 pr-10 text-[17px] leading-none text-brand-ink outline-none transition focus:border-[var(--wedoo-violet)] focus:ring-4 focus:ring-[rgba(116,80,230,0.08)]"
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">{label}</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <AppIcon
          className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-ink"
          name="chevron-down-line"
        />
      </label>
    </div>
  );
}

function CompanyPublishedJobsDesktopContent({
  onBack,
  onOpenPreview,
  response,
}: {
  onBack: () => void;
  onOpenPreview: (previewPath: string) => void;
  response: CompanyJobManagementResponse;
}) {
  const [filters, setFilters] = useState<Record<PublishedFilterKey, string>>({
    certification: "",
    experience: "",
    location: "",
    sdg: "",
    skill: "",
    training: "",
  });

  const locationOptions = useMemo(
    () =>
      response.publishedJobCards.map((card) => ({
        id: card.locationLabel,
        label: card.locationLabel,
      })),
    [response.publishedJobCards],
  );
  const tagOptions = useMemo(() => {
    const values = new Set<string>();
    response.publishedJobCards.forEach((card) => {
      card.tagLabels.forEach((tag) => values.add(tag));
    });

    return Array.from(values).map((value) => ({ id: value, label: value }));
  }, [response.publishedJobCards]);
  const certificationOptions = useMemo(
    () =>
      response.company.certificationLabels.map((label) => ({
        id: label,
        label,
      })),
    [response.company.certificationLabels],
  );
  const sdgOptions = useMemo(() => {
    const values = new Map<string, string>();
    response.publishedJobCards.forEach((card) => {
      card.sdgIds.forEach((id) => {
        const entry = sdgs[id];
        if (entry) {
          values.set(id, entry.label);
        }
      });
    });

    return Array.from(values, ([id, label]) => ({ id, label }));
  }, [response.publishedJobCards]);

  const filteredCards = response.publishedJobCards.filter((card) => {
    if (filters.location && card.locationLabel !== filters.location) {
      return false;
    }

    if (filters.sdg && !card.sdgIds.includes(filters.sdg)) {
      return false;
    }

    const tagFilters = [filters.training, filters.experience, filters.skill].filter(Boolean);
    if (tagFilters.some((tag) => !card.tagLabels.includes(tag))) {
      return false;
    }

    return true;
  });

  return (
      <div className="pt-4" data-company-published-jobs-layout="desktop">
      <div className="grid grid-cols-[minmax(0,1fr)_240px] gap-8">
        <div>
          <div className="flex items-center gap-5">
            <button
              aria-label="Torna al portale azienda"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--wedoo-line)] bg-white/86 text-brand-ink transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]"
              onClick={onBack}
              type="button"
            >
              <AppIcon className="h-9 w-9" name="arrow-left-line" />
            </button>
            <div className="flex items-center gap-4 text-brand-ink">
              <AppIcon className="h-9 w-9" name="globe-grid-line" />
              <AppIcon className="h-9 w-9" name="menu-line" />
            </div>
            <p className="font-wedoo-body text-[22px] leading-none text-brand-ink">
              visualizza annunci a griglia o impilati
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-5">
            {filteredCards.map((card) => (
              <CompanyPublishedJobsCard
                card={card}
                key={card.id}
                onOpen={onOpenPreview}
              />
            ))}
          </div>
        </div>

        <aside className="rounded-[1.8rem] border border-[var(--wedoo-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(242,245,250,0.94))] px-4 pb-5 pt-4 shadow-[0_26px_72px_-58px_rgba(15,23,40,0.28)]">
          <div className="flex justify-end">
            <AppIcon className="h-10 w-10 text-brand-ink" name="filter-line" />
          </div>

          <div className="space-y-4 pt-2">
            <PublishedJobsFilterSelect
              label="localita"
              onChange={(value) =>
                setFilters((current) => ({ ...current, location: value }))
              }
              options={locationOptions}
              value={filters.location}
            />
            <PublishedJobsFilterSelect
              label="Formazione"
              onChange={(value) =>
                setFilters((current) => ({ ...current, training: value }))
              }
              options={tagOptions}
              value={filters.training}
            />
            <PublishedJobsFilterSelect
              label="certificazioni"
              onChange={(value) =>
                setFilters((current) => ({ ...current, certification: value }))
              }
              options={certificationOptions}
              value={filters.certification}
            />
            <PublishedJobsFilterSelect
              label="esperienze lavorative"
              onChange={(value) =>
                setFilters((current) => ({ ...current, experience: value }))
              }
              options={tagOptions}
              value={filters.experience}
            />
            <PublishedJobsFilterSelect
              label="competenze"
              onChange={(value) =>
                setFilters((current) => ({ ...current, skill: value }))
              }
              options={tagOptions}
              value={filters.skill}
            />
            <PublishedJobsFilterSelect
              label="obiettivi Agenda 2030"
              onChange={(value) =>
                setFilters((current) => ({ ...current, sdg: value }))
              }
              options={sdgOptions}
              value={filters.sdg}
            />
          </div>

          <button
            className="font-wedoo-accent mt-4 inline-flex w-full items-center justify-center text-[24px] leading-none text-brand-ink transition hover:text-brand-violet"
            onClick={() =>
              setFilters({
                certification: "",
                experience: "",
                location: "",
                sdg: "",
                skill: "",
                training: "",
              })
            }
            type="button"
          >
            resetta filtri
          </button>
        </aside>
      </div>
    </div>
  );
}

function CompanyPublishedJobsMobileContent({
  activityValue,
  draft,
  onActivityChange,
  onBack,
  onCreateNew,
  onOpenPreview,
  onPublishedJobChange,
  onSectionChange,
  onViewApplications,
  publishedJobValue,
  response,
}: {
  activityValue: string;
  draft: JobDraft;
  onActivityChange: (value: string) => void;
  onBack: () => void;
  onCreateNew: () => void | Promise<void>;
  onOpenPreview: (previewPath: string) => void;
  onPublishedJobChange: (value: string) => void;
  onSectionChange: (section: CompanyJobManagementSectionId) => void;
  onViewApplications: () => void;
  publishedJobValue: string;
  response: CompanyJobManagementResponse;
}) {
  return (
      <div className="mx-auto max-w-[390px] px-4 pb-6 pt-4" data-company-published-jobs-layout="mobile">
      <div className="rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-4 pb-4 pt-4 shadow-[0_40px_100px_-70px_rgba(0,0,0,0.8)]">
      <div className="relative flex min-h-[66px] items-start justify-center">
        <button
          aria-label="Torna al portale azienda"
          className="absolute left-0 top-[2px] inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72"
          onClick={onBack}
          type="button"
        >
          <AppIcon className="h-7 w-7" name="arrow-left-line" />
        </button>
        <h1 className="max-w-[252px] text-center font-wedoo-heading text-[40px] leading-[0.92] text-white">
          visualizza annunci
        </h1>
      </div>

      <p className="pt-1 text-center font-wedoo-body text-[16px] leading-[1.15] text-white/70">
        visualizza annunci a griglia o impilati
      </p>

      <section className="mt-4 rounded-[1.8rem] border border-[var(--wedoo-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(245,248,252,0.94))] px-5 pb-5 pt-6">
        <div className="flex items-center gap-4">
          <div className="flex h-[74px] w-[74px] items-center justify-center rounded-full bg-white">
            <AppImage
              alt={response.company.legalName}
              className="h-[34px] w-[34px] object-contain"
              src={assetPath(response.company.logo)}
            />
          </div>
          <div>
            <h2 className="font-wedoo-accent text-[22px] leading-none text-brand-ink">
              {response.company.legalName}
            </h2>
            <p className="pt-2 font-wedoo-body text-[14px] leading-[1.1] text-brand-ink">
              {response.company.viewJobsLabel}
            </p>
          </div>
        </div>

        <div className="grid gap-3 pt-5">
          <SidebarGhostSelect
            ariaLabel="Attivita azienda"
            onChange={onActivityChange}
            options={draft.catalogs.sectors}
            placeholder={response.company.activityLabel}
            value={activityValue}
          />
          <SidebarGhostSelect
            ariaLabel="Annunci pubblicati"
            onChange={onPublishedJobChange}
            options={response.publishedJobs}
            placeholder={response.company.publishedJobsLabel}
            value={publishedJobValue}
          />
          <SidebarGhostSelect
            ariaLabel="Modifica annuncio"
            onChange={(value) => {
              if (value) {
                onSectionChange(value as CompanyJobManagementSectionId);
              }
            }}
            options={response.sectionOptions}
            placeholder={response.company.editLabel}
            value=""
          />
        </div>

        <div className="grid gap-3 pt-4">
          <button
            className="font-wedoo-accent inline-flex min-h-[48px] items-center justify-center rounded-[8px] border border-brand-violet px-4 py-2 text-[20px] leading-none text-brand-ink transition hover:bg-brand-violet/10"
            onClick={onViewApplications}
            type="button"
          >
            {response.company.viewApplicationsLabel}
          </button>
          <button
            className="font-wedoo-accent inline-flex min-h-[48px] items-center justify-center rounded-[8px] bg-brand-violet px-4 py-2 text-[20px] leading-none text-[var(--wedoo-white-soft)] transition hover:bg-brand-violet-600"
            onClick={onCreateNew}
            type="button"
          >
            {response.company.createNewLabel}
          </button>
        </div>
      </section>

      <div className="grid gap-4 pt-4">
        {response.publishedJobCards.map((card) => (
          <CompanyPublishedJobsCard
            card={card}
            key={card.id}
            onOpen={onOpenPreview}
          />
        ))}
      </div>

      <CompanyPublishedJobsMobileDock label={response.mobileDockLabel} />
      </div>
    </div>
  );
}

export function CompanyPublishedJobsView({
  activityValue,
  draft,
  onActivityChange,
  onBack,
  onCreateNew,
  onOpenPreview,
  onPublishedJobChange,
  onSectionChange,
  onViewApplications,
  onViewPublished,
  publishedJobValue,
  response,
}: {
  activityValue: string;
  draft: JobDraft;
  onActivityChange: (value: string) => void;
  onBack: () => void;
  onCreateNew: () => void | Promise<void>;
  onOpenPreview: (previewPath: string) => void;
  onPublishedJobChange: (value: string) => void;
  onSectionChange: (section: CompanyJobManagementSectionId) => void;
  onViewApplications: () => void;
  onViewPublished: () => void;
  publishedJobValue: string;
  response: CompanyJobManagementResponse;
}) {
  return (
    <>
      <section className="hidden min-[1024px]:block">
        <div className="mx-auto max-w-[1440px] px-[40px] pb-10 pt-[16px]">
          <div className="grid grid-cols-[476px_minmax(0,1fr)] gap-11">
            <CompanyPublishedJobsDesktopRail
              activityValue={activityValue}
              draft={draft}
              onActivityChange={onActivityChange}
              onCreateNew={onCreateNew}
              onPublishedJobChange={onPublishedJobChange}
              onSectionChange={onSectionChange}
              onViewApplications={onViewApplications}
              onViewPublished={onViewPublished}
              publishedJobValue={publishedJobValue}
              response={response}
            />

            <CompanyPublishedJobsDesktopContent
              onBack={onBack}
              onOpenPreview={onOpenPreview}
              response={response}
            />
          </div>
        </div>
      </section>

      <section className="min-[1024px]:hidden">
        <CompanyPublishedJobsMobileContent
          activityValue={activityValue}
          draft={draft}
          onActivityChange={onActivityChange}
          onBack={onBack}
          onCreateNew={onCreateNew}
          onOpenPreview={onOpenPreview}
          onPublishedJobChange={onPublishedJobChange}
          onSectionChange={onSectionChange}
          onViewApplications={onViewApplications}
          publishedJobValue={publishedJobValue}
          response={response}
        />
      </section>
    </>
  );
}
