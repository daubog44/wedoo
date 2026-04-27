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
        className="font-wedoo-body h-11 w-full appearance-none rounded-[12px] border border-white/10 bg-white/6 px-3 pr-9 text-left text-[0.9rem] leading-none text-white outline-none transition focus:border-[var(--wedoo-violet)] focus:ring-4 focus:ring-[rgba(116,80,230,0.16)]"
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
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/62"
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
    <aside className="flex min-h-[760px] flex-col rounded-[1.25rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-5 pb-5 pt-5 text-white shadow-[0_34px_88px_-70px_rgba(0,0,0,0.82)]">
      <div className="flex items-center gap-3">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[1rem] border border-white/10 bg-white/95">
          <AppImage
            alt={response.company.legalName}
            className="h-9 w-9 object-contain"
            priority
            src={assetPath(response.company.logo)}
          />
        </div>
        <div>
          <p className="text-[0.68rem] font-semibold uppercase text-white/48">company workspace</p>
          <h2 className="mt-1 text-[1.45rem] leading-tight text-white">
            {response.company.legalName}
          </h2>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {response.company.certificationLabels.map((label) => (
          <div
            className="flex min-w-0 flex-col items-center gap-2 rounded-[0.9rem] border border-white/10 bg-white/5 px-2 py-2.5 text-center"
            key={label}
          >
            <span className="inline-flex h-7 w-7 rounded-full border border-white/16 bg-white/5" />
            <span className="font-wedoo-body text-[0.72rem] leading-[1.2] text-white/74">
              {label}
            </span>
          </div>
        ))}
      </div>

      <button
        className="font-wedoo-accent mt-4 inline-flex items-center gap-2 text-[0.86rem] leading-none text-white/76 transition hover:text-white"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="arrow-up-line" />
        {response.company.uploadCertificationsLabel}
      </button>

      <div className="mt-5 grid gap-3">
        <SidebarGhostSelect
          ariaLabel="Attivita azienda"
          onChange={onActivityChange}
          options={draft.catalogs.sectors}
          placeholder={response.company.activityLabel}
          value={activityValue}
        />
        <p className="font-wedoo-accent pt-1 text-[0.9rem] leading-none text-white/76">
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
        className="mt-auto inline-flex min-h-[46px] w-full items-center justify-center rounded-[13px] bg-[var(--wedoo-violet)] px-4 py-2 font-wedoo-accent text-[0.95rem] leading-none text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(116,80,230,0.68)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]"
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
    <article className="rounded-[1.15rem] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)] px-4 pb-4 pt-4 shadow-[var(--wedoo-workspace-card-shadow)]">
      <h2 className="text-[1.45rem] uppercase leading-[1.02] text-[var(--wedoo-workspace-text)]">
        {card.title}
      </h2>

      <div className="flex items-center gap-3 pt-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.9rem] border border-[var(--wedoo-workspace-line)] bg-white">
          <AppImage
            alt={card.companyName}
            className="h-7 w-7 object-contain"
            src={assetPath(card.companyLogo)}
          />
        </div>
        <div className="font-wedoo-body text-[0.92rem] leading-5 text-[var(--wedoo-workspace-muted)]">
          <p>{card.companyName}</p>
          <p>{card.locationLabel}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 pt-4">
        {card.tagLabels.map((tag) => (
          <span
            className="font-wedoo-accent inline-flex min-h-[30px] items-center justify-center rounded-full border border-[var(--wedoo-workspace-line)] bg-white/5 px-3 py-1 text-[0.82rem] leading-none text-[var(--wedoo-workspace-text)]"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-4">
        {card.sdgIds.map((id) => {
          const entry = sdgs[id];
          if (!entry) {
            return null;
          }

          return (
            <img
              alt={entry.label}
              className="h-10 w-10 object-contain"
              key={id}
              src={assetPath(entry.icon)}
            />
          );
        })}
      </div>

      <button
        className="font-wedoo-accent mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-[12px] bg-[var(--wedoo-violet)] px-4 py-2 text-[0.95rem] leading-none text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(116,80,230,0.68)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]"
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
    <div className="relative">
      <label className="block">
        <span className="sr-only">{label}</span>
        <select
          aria-label={label}
          className="font-wedoo-body h-11 w-full appearance-none rounded-[12px] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)] px-3 pr-9 text-[0.9rem] leading-none text-[var(--wedoo-workspace-text)] outline-none transition focus:border-[var(--wedoo-violet)] focus:ring-2 focus:ring-[rgba(116,80,230,0.22)]"
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
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--wedoo-workspace-muted)]"
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
    <div className="pt-0" data-company-published-jobs-layout="desktop">
      <div className="grid grid-cols-[minmax(0,1fr)_15rem] gap-5">
        <div>
          <div className="flex min-h-[72px] items-center gap-4 rounded-[1.25rem] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface)] px-4 py-3 shadow-[var(--wedoo-workspace-card-shadow)]">
            <button
              aria-label="Torna al portale azienda"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)] text-[var(--wedoo-workspace-text)] transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet-300)]"
              onClick={onBack}
              type="button"
            >
              <AppIcon className="h-6 w-6" name="arrow-left-line" />
            </button>
            <div className="flex items-center gap-2 text-[var(--wedoo-workspace-muted)]">
              <AppIcon className="h-6 w-6" name="globe-grid-line" />
              <AppIcon className="h-6 w-6" name="menu-line" />
            </div>
            <div className="min-w-0">
              <h1 className="text-[2rem] leading-none text-[var(--wedoo-workspace-text)]">
                visualizza annunci
              </h1>
              <p className="mt-1 font-wedoo-body text-sm leading-5 text-[var(--wedoo-workspace-muted)]">
                visualizza annunci a griglia o impilati
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-5">
            {filteredCards.map((card) => (
              <CompanyPublishedJobsCard
                card={card}
                key={card.id}
                onOpen={onOpenPreview}
              />
            ))}
          </div>
        </div>

        <aside className="rounded-[1.25rem] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface)] px-4 pb-4 pt-4 shadow-[var(--wedoo-workspace-card-shadow)]">
          <div className="flex justify-end">
            <AppIcon className="h-7 w-7 text-[var(--wedoo-workspace-muted)]" name="filter-line" />
          </div>

          <div className="space-y-3 pt-3">
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
            className="font-wedoo-accent mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-[12px] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)] px-3 text-[0.9rem] leading-none text-[var(--wedoo-workspace-text)] transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet-300)]"
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
      <div className="rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-3.5 pb-4 pt-3.5 shadow-[0_34px_88px_-70px_rgba(0,0,0,0.8)]">
        <div className="relative flex min-h-[58px] items-start justify-center">
          <button
            aria-label="Torna al portale azienda"
            className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72"
            onClick={onBack}
            type="button"
          >
            <AppIcon className="h-6 w-6" name="arrow-left-line" />
          </button>
          <h1 className="max-w-[240px] text-center text-[2rem] leading-none text-white">
            visualizza annunci
          </h1>
        </div>

      <p className="pt-1 text-center font-wedoo-body text-sm leading-5 text-white/70">
        visualizza annunci a griglia o impilati
      </p>

      <section className="mt-4 rounded-[1.1rem] border border-white/10 bg-white/5 px-4 pb-4 pt-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[1rem] bg-white">
            <AppImage
              alt={response.company.legalName}
              className="h-8 w-8 object-contain"
              src={assetPath(response.company.logo)}
            />
          </div>
          <div>
            <h2 className="font-wedoo-accent text-[1.1rem] leading-tight text-white">
              {response.company.legalName}
            </h2>
            <p className="pt-1 font-wedoo-body text-sm leading-5 text-white/70">
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
            className="font-wedoo-accent inline-flex min-h-[44px] items-center justify-center rounded-[12px] border border-white/12 bg-white/5 px-4 py-2 text-[0.95rem] leading-none text-white transition hover:border-[var(--wedoo-violet)]"
            onClick={onViewApplications}
            type="button"
          >
            {response.company.viewApplicationsLabel}
          </button>
          <button
            className="font-wedoo-accent inline-flex min-h-[44px] items-center justify-center rounded-[12px] bg-brand-violet px-4 py-2 text-[0.95rem] leading-none text-[var(--wedoo-white-soft)] transition hover:bg-brand-violet-600"
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
        <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-5 xl:px-10">
          <div className="grid grid-cols-[18rem_minmax(0,1fr)] gap-5">
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
