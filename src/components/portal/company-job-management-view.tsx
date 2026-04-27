import type { ComponentProps, ReactNode } from "react";
import { NavLink } from "react-router-dom";
import {
  getJobDraftCapOptions,
  getJobDraftCityOptions,
  type JobDraft,
} from "../../data/job-draft";
import type {
  CompanyJobManagementResponse,
  CompanyJobManagementSectionId,
} from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import {
  JobDraftLanguageChip,
  JobDraftSelectField,
} from "./company-job-draft-fields";

type DraftUpdater = (current: JobDraft) => JobDraft;

type CompanyJobManagementViewProps = {
  activityValue: string;
  draft: JobDraft;
  onActivityChange: (value: string) => void;
  onBack: () => void;
  onCreateNew: () => void | Promise<void>;
  onDraftChange: (updater: DraftUpdater) => void;
  onPreview: () => void | Promise<void>;
  onPublishedJobChange: (value: string) => void;
  onReset: () => void | Promise<void>;
  onSaveDraft: () => void | Promise<void>;
  onSectionChange: (section: CompanyJobManagementSectionId) => void;
  onSubmit: () => void | Promise<void>;
  onViewApplications: () => void;
  onViewPublished: () => void;
  publishedJobValue: string;
  response: CompanyJobManagementResponse;
  section: CompanyJobManagementSectionId;
};

const desktopPrimaryButtonClassName =
  "font-wedoo-accent inline-flex min-h-[44px] items-center justify-center rounded-[12px] border border-transparent bg-[var(--wedoo-violet)] px-4 py-2 text-[0.95rem] leading-none text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(116,80,230,0.68)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]";
const desktopOutlineButtonClassName =
  "font-wedoo-accent inline-flex min-h-[42px] items-center justify-center rounded-[12px] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)] px-4 py-2 text-[0.9rem] leading-none text-[var(--wedoo-workspace-text)] transition hover:-translate-y-0.5 hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet-300)]";
const mobilePrimaryButtonClassName =
  "font-wedoo-accent inline-flex min-h-[46px] items-center justify-center rounded-[13px] border border-transparent bg-[var(--wedoo-violet)] px-4 py-2 text-[0.95rem] leading-none text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(116,80,230,0.68)] transition hover:bg-[var(--wedoo-violet-hover)]";
const mobileOutlineButtonClassName =
  "font-wedoo-accent inline-flex min-h-[44px] items-center justify-center rounded-[13px] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)] px-4 py-2 text-[0.9rem] leading-none text-[var(--wedoo-workspace-text)] transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet-300)]";

function CompanyJobManagementSelectField(props: ComponentProps<typeof JobDraftSelectField>) {
  return <JobDraftSelectField {...props} tone="workspace" />;
}

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

function CompanyJobManagementFieldLabel({
  compact = false,
  htmlFor,
  label,
}: {
  compact?: boolean;
  htmlFor: string;
  label: string;
}) {
  return (
    <label
      className={cn(
        "font-wedoo-body block font-semibold leading-none text-[var(--wedoo-workspace-muted)]",
        compact ? "mb-2 text-[0.8rem]" : "mb-2 text-[0.82rem]",
      )}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}

function CompanyJobManagementTextField({
  compact = false,
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  compact?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "email" | "tel" | "text";
  value: string;
}) {
  return (
    <div className="grid gap-0">
      <CompanyJobManagementFieldLabel
        compact={compact}
        htmlFor={id}
        label={label}
      />
      <input
        className={cn(
          "font-wedoo-body w-full rounded-[10px] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)] text-[var(--wedoo-workspace-text)] outline-none transition placeholder:text-[var(--wedoo-workspace-muted)]/70 focus:border-[var(--wedoo-violet)] focus:ring-2 focus:ring-[rgba(116,80,230,0.22)]",
          compact ? "h-11 px-3 text-[0.95rem]" : "h-11 px-3 text-[0.95rem]",
        )}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
}

function CompanyJobManagementCheckbox({
  checked,
  compact = false,
  id,
  label,
  onChange,
}: {
  checked: boolean;
  compact?: boolean;
  id: string;
  label: string;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="inline-flex items-center gap-2.5" htmlFor={id}>
      <input
        checked={checked}
        className="sr-only"
        id={id}
        onChange={(event) => onChange(event.target.checked)}
        type="checkbox"
      />
      <span
        aria-hidden="true"
        className={cn(
          "inline-flex rounded-[5px] border border-[var(--wedoo-workspace-line)] transition",
          compact ? "h-5 w-5" : "h-[25px] w-[25px]",
          checked ? "bg-brand-violet" : "bg-transparent",
        )}
      />
      <span
        className={cn(
          "font-wedoo-body leading-none text-[var(--wedoo-workspace-text)]",
          compact ? "text-[0.92rem]" : "text-[0.95rem]",
        )}
      >
        {label}
      </span>
    </label>
  );
}

function CompanyJobManagementEditor({
  compact = false,
  id,
  label,
  onChange,
  value,
}: {
  compact?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="grid gap-0">
      <CompanyJobManagementFieldLabel
        compact={compact}
        htmlFor={id}
        label={label}
      />
      <div
        className={cn(
          "overflow-hidden rounded-[14px] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)]",
          compact ? "min-h-[132px]" : "min-h-[136px]",
        )}
      >
        <div
          className={cn(
            "flex items-center border-b border-[var(--wedoo-workspace-line)] font-wedoo-body text-[var(--wedoo-workspace-muted)]",
            compact ? "gap-4 px-3 py-2 text-[0.86rem]" : "gap-4 px-3 py-2 text-[0.9rem]",
          )}
        >
          <button className="font-sans text-[1.05em] font-bold" type="button">
            G
          </button>
          <button className="font-sans text-[1.05em] italic" type="button">
            C
          </button>
          <button className="font-sans text-[1.05em] underline" type="button">
            S
          </button>
          <span>formattazione</span>
          <AppIcon
            className={cn("ml-auto", compact ? "h-5 w-5" : "h-6 w-6")}
            name="list-box-line"
          />
        </div>
        <textarea
          className={cn(
            "font-wedoo-body w-full resize-none border-none bg-transparent text-[var(--wedoo-workspace-text)] outline-none",
            compact ? "min-h-[86px] px-3 py-3 text-[0.95rem]" : "min-h-[88px] px-3 py-3 text-[0.95rem]",
          )}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </div>
    </div>
  );
}

function CompanyJobManagementFileField({
  compact = false,
  id,
  label,
  onChange,
  value,
}: {
  compact?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="grid gap-0">
      <CompanyJobManagementFieldLabel
        compact={compact}
        htmlFor={id}
        label={label}
      />
      <label
        className={cn(
          "inline-flex cursor-pointer items-center gap-2 rounded-[10px] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)] text-[var(--wedoo-workspace-text)] transition hover:border-[var(--wedoo-violet)]",
          compact ? "min-h-11 px-3 text-[0.95rem]" : "min-h-11 px-3 text-[0.95rem]",
        )}
        htmlFor={id}
      >
        <AppIcon className={compact ? "h-4 w-4" : "h-5 w-5"} name="arrow-up-line" />
        <span className={cn(value ? "text-[var(--wedoo-workspace-text)]" : "text-[var(--wedoo-workspace-muted)]")}>
          {value || "carica"}
        </span>
      </label>
      <input
        className="sr-only"
        id={id}
        onChange={(event) =>
          onChange(event.target.files?.[0]?.name ?? event.target.value)
        }
        type="file"
      />
      {value ? (
        <p
          className={cn(
            "font-wedoo-body pt-2 text-[var(--wedoo-workspace-muted)]",
            compact ? "text-[0.8rem]" : "text-[0.85rem]",
          )}
        >
          {value}
        </p>
      ) : null}
    </div>
  );
}

function CompanyJobManagementDesktopRail({
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
  section,
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
  section: CompanyJobManagementSectionId;
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
          value={section === "recruiter" ? "" : section}
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

function CompanyJobsMobileDock({ label }: { label: string }) {
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

function SectionCard({
  children,
  compact = false,
}: {
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)]",
        compact ? "rounded-[1rem] px-3.5 pb-4 pt-4" : "rounded-[1.15rem] px-5 pb-5 pt-5 shadow-[var(--wedoo-workspace-card-shadow)]",
      )}
    >
      {children}
    </div>
  );
}

function RecruiterSection({
  compact = false,
  draft,
  nextLabel,
  onDraftChange,
  onNext,
}: {
  compact?: boolean;
  draft: JobDraft;
  nextLabel: string;
  onDraftChange: (updater: DraftUpdater) => void;
  onNext: () => void;
}) {
  const cityOptions = getJobDraftCityOptions(draft.catalogs, draft.geography.provinceId);

  const setProvince = (provinceId: string) => {
    onDraftChange((current) => {
      const nextCityOptions = getJobDraftCityOptions(current.catalogs, provinceId);
      const nextCityId = nextCityOptions.some((option) => option.id === current.geography.cityId)
        ? current.geography.cityId
        : "";

      return {
        ...current,
        geography: {
          ...current.geography,
          cityId: nextCityId,
          provinceId,
        },
      };
    });
  };

  const setCity = (cityId: string) => {
    onDraftChange((current) => ({
      ...current,
      geography: {
        ...current.geography,
        cityId,
      },
    }));
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <div className={compact ? "space-y-4" : "space-y-4"}>
        <div
          className={cn(
            compact ? "grid gap-4" : "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)] gap-4",
          )}
        >
          <CompanyJobManagementTextField
            compact={compact}
            id={compact ? "mobile-company-jobs-vat" : "desktop-company-jobs-vat"}
            label="P. IVA"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                company: {
                  ...current.company,
                  vatNumber: value,
                },
              }))
            }
            placeholder="scrivi"
            value={draft.company.vatNumber}
          />
          <CompanyJobManagementSelectField
            compact={compact}
            id={compact ? "mobile-company-jobs-province" : "desktop-company-jobs-province"}
            label="provincia"
            onChange={setProvince}
            options={draft.catalogs.provinces}
            value={draft.geography.provinceId}
          />
          <CompanyJobManagementSelectField
            compact={compact}
            id={compact ? "mobile-company-jobs-city" : "desktop-company-jobs-city"}
            label="citta"
            onChange={setCity}
            options={cityOptions}
            value={draft.geography.cityId}
          />
        </div>

        <CompanyJobManagementSelectField
          compact={compact}
          id={compact ? "mobile-company-jobs-title" : "desktop-company-jobs-title"}
          label="job title"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              role: {
                ...current.role,
                titleId: value,
              },
            }))
          }
          options={draft.catalogs.jobTitles}
          value={draft.role.titleId}
        />

        <h2
          className={cn(
            "font-wedoo-accent font-semibold leading-none text-[var(--wedoo-workspace-text)]",
            compact ? "text-[1.05rem]" : "text-[1.1rem]",
          )}
        >
          dettagli recruiter
        </h2>

        <CompanyJobManagementCheckbox
          checked={draft.recruiter.publicContact}
          compact={compact}
          id={compact ? "mobile-company-jobs-public-contact" : "desktop-company-jobs-public-contact"}
          label="pubblica informazioni di contatto"
          onChange={(checked) =>
            onDraftChange((current) => ({
              ...current,
              recruiter: {
                ...current.recruiter,
                publicContact: checked,
              },
            }))
          }
        />

        <div className={cn(compact ? "grid gap-4" : "grid grid-cols-2 gap-4")}>
          <CompanyJobManagementTextField
            compact={compact}
            id={compact ? "mobile-company-jobs-first-name" : "desktop-company-jobs-first-name"}
            label="nome"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                recruiter: {
                  ...current.recruiter,
                  firstName: value,
                },
              }))
            }
            placeholder="inserisci nome"
            value={draft.recruiter.firstName}
          />
          <CompanyJobManagementTextField
            compact={compact}
            id={compact ? "mobile-company-jobs-last-name" : "desktop-company-jobs-last-name"}
            label="cognome"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                recruiter: {
                  ...current.recruiter,
                  lastName: value,
                },
              }))
            }
            placeholder="inserisci cognome"
            value={draft.recruiter.lastName}
          />
        </div>

        <div className={cn(compact ? "grid gap-4" : "grid grid-cols-2 gap-4")}>
          <CompanyJobManagementTextField
            compact={compact}
            id={compact ? "mobile-company-jobs-email" : "desktop-company-jobs-email"}
            label="e-mail"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                recruiter: {
                  ...current.recruiter,
                  email: value,
                },
              }))
            }
            placeholder="inserisci e-mail"
            type="email"
            value={draft.recruiter.email}
          />
          <CompanyJobManagementTextField
            compact={compact}
            id={compact ? "mobile-company-jobs-phone" : "desktop-company-jobs-phone"}
            label="numero di telefono"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                recruiter: {
                  ...current.recruiter,
                  phone: value,
                },
              }))
            }
            placeholder="inserisci numero"
            type="tel"
            value={draft.recruiter.phone}
          />
        </div>

        <CompanyJobManagementEditor
          compact={compact}
          id={compact ? "mobile-company-jobs-message" : "desktop-company-jobs-message"}
          label="lascia un messaggio"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              recruiter: {
                ...current.recruiter,
                message: value,
              },
            }))
          }
          value={draft.recruiter.message}
        />

        <button
          className={cn(
            compact ? mobilePrimaryButtonClassName : desktopPrimaryButtonClassName,
            "w-full",
          )}
          type="submit"
        >
          {nextLabel}
        </button>
      </div>
    </form>
  );
}

function CompanyDetailsSection({
  compact = false,
  draft,
  nextLabel,
  onDraftChange,
  onNext,
}: {
  compact?: boolean;
  draft: JobDraft;
  nextLabel: string;
  onDraftChange: (updater: DraftUpdater) => void;
  onNext: () => void;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <div className={compact ? "space-y-4" : "space-y-4"}>
        <h2
          className={cn(
            "font-wedoo-accent font-semibold leading-none text-[var(--wedoo-workspace-text)]",
            compact ? "text-[1.05rem]" : "text-[1.1rem]",
          )}
        >
          dettagli azienda
        </h2>

        <CompanyJobManagementEditor
          compact={compact}
          id={compact ? "mobile-company-jobs-overview" : "desktop-company-jobs-overview"}
          label="descrizione azienda"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              company: {
                ...current.company,
                overview: value,
              },
            }))
          }
          value={draft.company.overview}
        />

        <CompanyJobManagementFileField
          compact={compact}
          id={compact ? "mobile-company-jobs-logo" : "desktop-company-jobs-logo"}
          label="carica il tuo logo"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              company: {
                ...current.company,
                logoAsset: value,
              },
            }))
          }
          value={draft.company.logoAsset}
        />

        <h2
          className={cn(
            "font-wedoo-accent font-semibold leading-none text-[var(--wedoo-workspace-text)]",
            compact ? "text-[1.05rem]" : "text-[1.1rem]",
          )}
        >
          dettagli retribuzione
        </h2>

        <CompanyJobManagementCheckbox
          checked={draft.compensation.publicSalary}
          compact={compact}
          id={compact ? "mobile-company-jobs-public-salary" : "desktop-company-jobs-public-salary"}
          label="pubblica informazioni di retribuzione"
          onChange={(checked) =>
            onDraftChange((current) => ({
              ...current,
              compensation: {
                ...current.compensation,
                publicSalary: checked,
              },
            }))
          }
        />

        <div className={cn(compact ? "grid gap-4" : "grid grid-cols-2 gap-4")}>
          <CompanyJobManagementTextField
            compact={compact}
            id={compact ? "mobile-company-jobs-salary-min" : "desktop-company-jobs-salary-min"}
            label="importo minimo"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                compensation: {
                  ...current.compensation,
                  minimum: value,
                },
              }))
            }
            placeholder="inserisci"
            value={draft.compensation.minimum}
          />
          <CompanyJobManagementTextField
            compact={compact}
            id={compact ? "mobile-company-jobs-salary-max" : "desktop-company-jobs-salary-max"}
            label="importo massimo"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                compensation: {
                  ...current.compensation,
                  maximum: value,
                },
              }))
            }
            placeholder="inserisci"
            value={draft.compensation.maximum}
          />
        </div>

        <CompanyJobManagementSelectField
          compact={compact}
          id={compact ? "mobile-company-jobs-salary-unit" : "desktop-company-jobs-salary-unit"}
          label="unita di retribuzione"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              compensation: {
                ...current.compensation,
                unitId: value,
              },
            }))
          }
          options={draft.catalogs.salaryUnits}
          value={draft.compensation.unitId}
        />

        <button
          className={cn(
            compact ? mobilePrimaryButtonClassName : desktopPrimaryButtonClassName,
            "w-full",
          )}
          type="submit"
        >
          {nextLabel}
        </button>
      </div>
    </form>
  );
}

function OfferSection({
  compact = false,
  draft,
  nextLabel,
  onDraftChange,
  onNext,
}: {
  compact?: boolean;
  draft: JobDraft;
  nextLabel: string;
  onDraftChange: (updater: DraftUpdater) => void;
  onNext: () => void;
}) {
  const cityOptions = getJobDraftCityOptions(draft.catalogs, draft.geography.provinceId);
  const capOptions = getJobDraftCapOptions(
    draft.catalogs,
    draft.geography.provinceId,
    draft.geography.cityId,
  );

  const setProvince = (provinceId: string) => {
    onDraftChange((current) => {
      const nextCityOptions = getJobDraftCityOptions(current.catalogs, provinceId);
      const nextCityId = nextCityOptions.some((option) => option.id === current.geography.cityId)
        ? current.geography.cityId
        : "";
      const nextCapOptions = getJobDraftCapOptions(
        current.catalogs,
        provinceId,
        nextCityId,
      );
      const nextCapId = nextCapOptions.some((option) => option.id === current.geography.capId)
        ? current.geography.capId
        : "";

      return {
        ...current,
        geography: {
          ...current.geography,
          capId: nextCapId,
          cityId: nextCityId,
          provinceId,
        },
      };
    });
  };

  const setCity = (cityId: string) => {
    onDraftChange((current) => {
      const nextCapOptions = getJobDraftCapOptions(
        current.catalogs,
        current.geography.provinceId,
        cityId,
      );
      const nextCapId = nextCapOptions.some((option) => option.id === current.geography.capId)
        ? current.geography.capId
        : "";

      return {
        ...current,
        geography: {
          ...current.geography,
          capId: nextCapId,
          cityId,
        },
      };
    });
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onNext();
      }}
    >
      <div className={compact ? "space-y-4" : "space-y-4"}>
        <h2
          className={cn(
            "font-wedoo-accent font-semibold leading-none text-[var(--wedoo-workspace-text)]",
            compact ? "text-[1.05rem]" : "text-[1.1rem]",
          )}
        >
          dettagli area geografica
        </h2>

        <div className={compact ? "grid gap-3" : "flex gap-10"}>
          <CompanyJobManagementCheckbox
            checked={draft.geography.remoteAllowed}
            compact={compact}
            id={compact ? "mobile-company-jobs-remote" : "desktop-company-jobs-remote"}
            label="smart working"
            onChange={(checked) =>
              onDraftChange((current) => ({
                ...current,
                geography: {
                  ...current.geography,
                  remoteAllowed: checked,
                },
              }))
            }
          />
          <CompanyJobManagementCheckbox
            checked={draft.geography.travelRequired}
            compact={compact}
            id={compact ? "mobile-company-jobs-travel" : "desktop-company-jobs-travel"}
            label="trasferte"
            onChange={(checked) =>
              onDraftChange((current) => ({
                ...current,
                geography: {
                  ...current.geography,
                  travelRequired: checked,
                },
              }))
            }
          />
        </div>

        <div className={cn(compact ? "grid gap-4" : "grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_7rem] gap-4")}>
          <CompanyJobManagementSelectField
            compact={compact}
            id={compact ? "mobile-company-jobs-geography-province" : "desktop-company-jobs-geography-province"}
            label="provincia"
            onChange={setProvince}
            options={draft.catalogs.provinces}
            value={draft.geography.provinceId}
          />
          <CompanyJobManagementSelectField
            compact={compact}
            id={compact ? "mobile-company-jobs-geography-city" : "desktop-company-jobs-geography-city"}
            label="citta"
            onChange={setCity}
            options={cityOptions}
            value={draft.geography.cityId}
          />
          <CompanyJobManagementSelectField
            compact={compact}
            id={compact ? "mobile-company-jobs-cap" : "desktop-company-jobs-cap"}
            label="CAP"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                geography: {
                  ...current.geography,
                  capId: value,
                },
              }))
            }
            options={capOptions}
            value={draft.geography.capId}
          />
        </div>

        <h2
          className={cn(
            "font-wedoo-accent font-semibold leading-none text-[var(--wedoo-workspace-text)]",
            compact ? "pt-1 text-[1.05rem]" : "pt-[2px] text-[1.1rem]",
          )}
        >
          descrizione offerta
        </h2>

        <CompanyJobManagementEditor
          compact={compact}
          id={compact ? "mobile-company-jobs-description" : "desktop-company-jobs-description"}
          label="job description"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              role: {
                ...current.role,
                description: value,
              },
            }))
          }
          value={draft.role.description}
        />

        <CompanyJobManagementSelectField
          compact={compact}
          id={compact ? "mobile-company-jobs-sector" : "desktop-company-jobs-sector"}
          label="settore operativo aziendale"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              role: {
                ...current.role,
                sectorId: value,
              },
            }))
          }
          options={draft.catalogs.sectors}
          value={draft.role.sectorId}
        />

        <CompanyJobManagementSelectField
          compact={compact}
          id={compact ? "mobile-company-jobs-skills" : "desktop-company-jobs-skills"}
          label="competenze richieste"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              role: {
                ...current.role,
                skillIds: value ? [value] : [],
              },
            }))
          }
          options={draft.catalogs.skillTags}
          value={draft.role.skillIds[0] ?? ""}
        />

        <CompanyJobManagementSelectField
          compact={compact}
          id={compact ? "mobile-company-jobs-experience" : "desktop-company-jobs-experience"}
          label="esperienza richiesta"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              role: {
                ...current.role,
                experienceLevelId: value,
              },
            }))
          }
          options={draft.catalogs.experienceLevels}
          value={draft.role.experienceLevelId}
        />

        <button
          className={cn(
            compact ? mobilePrimaryButtonClassName : desktopPrimaryButtonClassName,
            "w-full",
          )}
          type="submit"
        >
          {nextLabel}
        </button>
      </div>
    </form>
  );
}

function PublishingSection({
  compact = false,
  draft,
  onDraftChange,
  onPreview,
  onReset,
  onSaveDraft,
  onSubmit,
  removeLabel,
  saveDraftLabel,
  submitLabel,
}: {
  compact?: boolean;
  draft: JobDraft;
  onDraftChange: (updater: DraftUpdater) => void;
  onPreview: () => void | Promise<void>;
  onReset: () => void | Promise<void>;
  onSaveDraft: () => void | Promise<void>;
  onSubmit: () => void | Promise<void>;
  removeLabel: string;
  saveDraftLabel: string;
  submitLabel: string;
}) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div className={compact ? "space-y-4" : "space-y-4"}>
        <div className={cn(compact ? "grid gap-4" : "grid grid-cols-2 gap-4")}>
          <CompanyJobManagementSelectField
            compact={compact}
            id={compact ? "mobile-company-jobs-contract" : "desktop-company-jobs-contract"}
            label="tipologia di contratto"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                role: {
                  ...current.role,
                  contractTypeId: value,
                },
              }))
            }
            options={draft.catalogs.contractTypes}
            value={draft.role.contractTypeId}
          />
          <CompanyJobManagementSelectField
            compact={compact}
            id={compact ? "mobile-company-jobs-hours" : "desktop-company-jobs-hours"}
            label="orari di lavoro"
            onChange={(value) =>
              onDraftChange((current) => ({
                ...current,
                role: {
                  ...current.role,
                  hoursId: value,
                },
              }))
            }
            options={draft.catalogs.hoursOptions}
            value={draft.role.hoursId}
          />
        </div>

        <CompanyJobManagementSelectField
          compact={compact}
          id={compact ? "mobile-company-jobs-mode" : "desktop-company-jobs-mode"}
          label="modalità di lavoro"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              role: {
                ...current.role,
                workModeId: value,
              },
            }))
          }
          options={draft.catalogs.workModes}
          value={draft.role.workModeId}
        />

        <CompanyJobManagementSelectField
          compact={compact}
          id={compact ? "mobile-company-jobs-sdg" : "desktop-company-jobs-sdg"}
          label="SDGs di riferimento"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              role: {
                ...current.role,
                sdgIds: value
                  ? Array.from(new Set([...current.role.sdgIds, value]))
                  : current.role.sdgIds,
              },
            }))
          }
          options={draft.catalogs.sdgs}
          value=""
        />

        {draft.role.sdgIds.length ? (
          <div className="flex flex-wrap gap-2">
            {draft.role.sdgIds.map((sdgId) => {
              const sdgLabel =
                draft.catalogs.sdgs.find((option) => option.id === sdgId)?.label ??
                sdgId;

              return (
                <button
                  className={cn(
                    "font-wedoo-body rounded-full border border-[rgba(112,72,232,0.34)] bg-[rgba(112,72,232,0.12)] px-3 py-1 text-[var(--wedoo-workspace-text)] transition hover:bg-[rgba(112,72,232,0.18)]",
                    compact ? "text-[14px]" : "text-[16px]",
                  )}
                  key={sdgId}
                  onClick={() =>
                    onDraftChange((current) => ({
                      ...current,
                      role: {
                        ...current.role,
                        sdgIds: current.role.sdgIds.filter((item) => item !== sdgId),
                      },
                    }))
                  }
                  type="button"
                >
                  {sdgLabel}
                </button>
              );
            })}
          </div>
        ) : null}

        <CompanyJobManagementFileField
          compact={compact}
          id={compact ? "mobile-company-jobs-certification" : "desktop-company-jobs-certification"}
          label="carica le tue certificazioni sostenibili o, in assenza, il report di sostenibilita"
          onChange={(value) =>
            onDraftChange((current) => ({
              ...current,
              role: {
                ...current.role,
                certificationLabel: value,
              },
            }))
          }
          value={draft.role.certificationLabel}
        />

        <div className={cn(compact ? "grid gap-3" : "flex justify-end gap-2 pt-2")}>
          <button
            className={cn(
              compact ? mobileOutlineButtonClassName : desktopOutlineButtonClassName,
              compact ? "w-full" : "min-w-[98px]",
            )}
            onClick={onReset}
            type="button"
          >
            {removeLabel}
          </button>
          <button
            className={cn(
              compact ? mobileOutlineButtonClassName : desktopOutlineButtonClassName,
              compact ? "w-full" : "min-w-[184px]",
            )}
            onClick={onSaveDraft}
            type="button"
          >
            {saveDraftLabel}
          </button>
          <button
            className={cn(
              compact ? mobileOutlineButtonClassName : desktopOutlineButtonClassName,
              compact ? "w-full" : "min-w-[120px]",
            )}
            onClick={onPreview}
            type="button"
          >
            anteprima
          </button>
          <button
            className={cn(
              compact ? mobilePrimaryButtonClassName : desktopPrimaryButtonClassName,
              compact ? "w-full" : "min-w-[104px]",
            )}
            type="submit"
          >
            {submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}

function CompanyJobManagementSection({
  compact = false,
  draft,
  nextLabel,
  onDraftChange,
  onNext,
  onPreview,
  onReset,
  onSaveDraft,
  onSubmit,
  removeLabel,
  saveDraftLabel,
  section,
  submitLabel,
}: {
  compact?: boolean;
  draft: JobDraft;
  nextLabel: string;
  onDraftChange: (updater: DraftUpdater) => void;
  onNext: () => void;
  onPreview: () => void | Promise<void>;
  onReset: () => void | Promise<void>;
  onSaveDraft: () => void | Promise<void>;
  onSubmit: () => void | Promise<void>;
  removeLabel: string;
  saveDraftLabel: string;
  section: CompanyJobManagementSectionId;
  submitLabel: string;
}) {
  if (section === "company-details") {
    return (
      <CompanyDetailsSection
        compact={compact}
        draft={draft}
        nextLabel={nextLabel}
        onDraftChange={onDraftChange}
        onNext={onNext}
      />
    );
  }

  if (section === "offer-details") {
    return (
      <OfferSection
        compact={compact}
        draft={draft}
        nextLabel={nextLabel}
        onDraftChange={onDraftChange}
        onNext={onNext}
      />
    );
  }

  if (section === "publishing") {
    return (
      <PublishingSection
        compact={compact}
        draft={draft}
        onDraftChange={onDraftChange}
        onPreview={onPreview}
        onReset={onReset}
        onSaveDraft={onSaveDraft}
        onSubmit={onSubmit}
        removeLabel={removeLabel}
        saveDraftLabel={saveDraftLabel}
        submitLabel={submitLabel}
      />
    );
  }

  return (
    <RecruiterSection
      compact={compact}
      draft={draft}
      nextLabel={nextLabel}
      onDraftChange={onDraftChange}
      onNext={onNext}
    />
  );
}

export function CompanyJobManagementView({
  activityValue,
  draft,
  onActivityChange,
  onBack,
  onCreateNew,
  onDraftChange,
  onPreview,
  onPublishedJobChange,
  onReset,
  onSaveDraft,
  onSectionChange,
  onSubmit,
  onViewApplications,
  onViewPublished,
  publishedJobValue,
  response,
  section,
}: CompanyJobManagementViewProps) {
  const nextSection = (() => {
    const currentIndex = response.sectionOptions.findIndex(
      (option) => option.id === section,
    );

    return response.sectionOptions[currentIndex + 1]?.id ?? "publishing";
  })();

  return (
    <>
      <section
        className="hidden min-[1024px]:block"
        data-company-jobs-layout="desktop"
        data-company-jobs-section={section}
      >
        <div className="mx-auto max-w-[1440px] px-6 pb-10 pt-5 xl:px-10">
          <div className="flex min-h-[72px] items-center gap-4 rounded-[1.25rem] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface)] px-4 py-3 shadow-[var(--wedoo-workspace-card-shadow)]">
            <button
              aria-label="Torna al portale azienda"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface-2)] text-[var(--wedoo-workspace-text)] transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet-300)]"
              onClick={onBack}
              type="button"
            >
              <AppIcon className="h-6 w-6" name="arrow-left-line" />
            </button>

            <div className="min-w-0">
              <p className="text-[0.68rem] font-semibold uppercase text-[var(--wedoo-violet-300)]">
                Annunci azienda
              </p>
              <h1 className="mt-1 text-[2rem] leading-none text-[var(--wedoo-workspace-text)]">
                Crea/modifica annuncio
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-[18rem_minmax(0,1fr)] gap-5 pt-5">
            <CompanyJobManagementDesktopRail
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
              section={section}
            />

            <div className="rounded-[1.25rem] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface)] px-5 pb-5 pt-5 shadow-[var(--wedoo-workspace-card-shadow)]">
              <div className="mb-5 flex items-start justify-between gap-5">
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase text-[var(--wedoo-violet-300)]">company annuncio builder</p>
                  <h2 className="mt-2 text-[1.45rem] leading-tight text-[var(--wedoo-workspace-text)]">
                    Step corrente
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--wedoo-workspace-muted)]">
                    {response.sectionOptions.find((option) => option.id === section)?.label ?? response.sectionOptions[0]?.label}. Una sola superficie di lavoro, meno rumore da form legacy e una sequenza piu leggibile tra recruiter, azienda, offerta e publishing.
                  </p>
                </div>
                <button
                  className="inline-flex min-h-[44px] min-w-[11rem] shrink-0 items-center justify-center rounded-[12px] bg-[var(--wedoo-violet)] px-4 py-2 font-wedoo-accent text-[0.95rem] leading-none text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(116,80,230,0.68)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]"
                  onClick={onPreview}
                  type="button"
                >
                  {response.ctas.previewLabel}
                </button>
              </div>

              <SectionCard>
                <CompanyJobManagementSection
                  draft={draft}
                  nextLabel={response.ctas.nextLabel}
                  onDraftChange={onDraftChange}
                  onNext={() => onSectionChange(nextSection)}
                  onPreview={onPreview}
                  onReset={onReset}
                  onSaveDraft={onSaveDraft}
                  onSubmit={onSubmit}
                  removeLabel={response.ctas.removeLabel}
                  saveDraftLabel={response.ctas.saveDraftLabel}
                  section={section}
                  submitLabel={response.ctas.submitLabel}
                />
              </SectionCard>
            </div>
          </div>
        </div>
      </section>

      <section
        className="min-[1024px]:hidden"
        data-company-jobs-layout="mobile"
        data-company-jobs-section={section}
      >
        <div className="mx-auto max-w-[390px] px-4 pb-6 pt-4">
          <div className="rounded-[1.2rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-3.5 pb-4 pt-3.5 shadow-[0_34px_88px_-70px_rgba(0,0,0,0.8)]">
            <div className="grid grid-cols-[2.5rem_minmax(0,1fr)_3.4rem] items-center gap-2">
              <button
                aria-label="Torna al portale azienda"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72"
                onClick={onBack}
                type="button"
              >
                <AppIcon className="h-6 w-6" name="arrow-left-line" />
              </button>
              <h1 className="text-center text-[1.8rem] leading-none text-white">
                Crea/modifica annuncio
              </h1>
              <JobDraftLanguageChip compact />
            </div>

            <button
              className="mt-3 flex min-h-[44px] w-full items-center justify-center rounded-[13px] bg-[var(--wedoo-violet)] px-4 py-2 font-wedoo-accent text-[0.95rem] leading-none text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(116,80,230,0.68)]"
              onClick={onPreview}
              type="button"
            >
              {response.ctas.previewLabel}
            </button>

            <div className="pt-3">
              <SectionCard compact>
                <CompanyJobManagementSection
                  compact
                  draft={draft}
                  nextLabel={response.ctas.nextLabel}
                  onDraftChange={onDraftChange}
                  onNext={() => onSectionChange(nextSection)}
                  onPreview={onPreview}
                  onReset={onReset}
                  onSaveDraft={onSaveDraft}
                  onSubmit={onSubmit}
                  removeLabel={response.ctas.removeLabel}
                  saveDraftLabel={response.ctas.saveDraftLabel}
                  section={section}
                  submitLabel={response.ctas.submitLabel}
                />
              </SectionCard>
            </div>

            <CompanyJobsMobileDock label={response.mobileDockLabel} />
          </div>
        </div>
      </section>
    </>
  );
}
