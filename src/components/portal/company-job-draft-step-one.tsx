import { useEffect, useId, useState } from "react";
import type {
  JobDraft,
  JobDraftOption,
  JobDraftStepOneInput,
} from "../../data/job-draft";
import {
  getJobDraftCapOptions,
  getJobDraftCityOptions,
} from "../../data/job-draft";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteIcon } from "../site";

type CompanyJobDraftStepOneProps = {
  draft: JobDraft;
  onContinue?: (values: JobDraftStepOneInput) => void | Promise<void>;
};

type CompanyJobDraftStepOneState = JobDraftStepOneInput;

const draftStepOneHints = {
  experienceSuggestions: [
    "Non \u00E8 richiesta esperienza pregressa;",
    "Sono apprezzate esperienze universitarie (stage pregressi), progetti personali o attivit\u00E0 extracurriculari;",
    "Esperienza superiore a 1 un anno nel campo.",
  ],
  geography:
    "una volta scelta la provincia viene inserito in automatico un suggerimento di possibile citt\u00E0 e CAP (si pu\u00F2 comunque scegliere dal menu a tendina), una volta scelta la citt\u00E0 corretta succeder\u00E0 la stessa cosa per il CAP, che verr\u00E0 filtrato per le informazioni gi\u00E0 inserite.",
  sectorExamples: "food, moda, marketing, economia, ecc.",
  skills:
    "hard+soft skills: nel menu a tendina si troveranno tutte le competenze, divise in due sezioni (hard e soft) con possibilit\u00E0 di filtraggio e ricerca.",
} as const;

const desktopPct = (value: number) => `${(value / 1440) * 100}%`;

function createInitialFormState(
  draft: JobDraft,
): CompanyJobDraftStepOneState {
  return {
    capId: draft.geography.capId,
    cityId: draft.geography.cityId,
    description: draft.role.description,
    experienceLevelId: draft.role.experienceLevelId,
    provinceId: draft.geography.provinceId,
    remoteAllowed: draft.geography.remoteAllowed,
    sectorId: draft.role.sectorId,
    skillId: draft.role.skillIds[0] ?? "",
    travelRequired: draft.geography.travelRequired,
  };
}

export function JobDraftLanguageChip({ compact = false }: { compact?: boolean }) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center rounded-[8px] border border-[#767676] bg-[#e3e3e3] text-[#1e1e1e] opacity-50",
        compact
          ? "h-[28px] w-[54px] gap-1.5 px-2 text-[14px]"
          : "h-8 w-[57px] gap-2 px-3 text-[16px]",
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} name="chevron-down" />
    </button>
  );
}

export function JobDraftSectionHeading({
  children,
  compact = false,
}: {
  children: string;
  compact?: boolean;
}) {
  return (
    <h2
      className={cn(
        "font-wedoo-accent font-bold leading-none text-brand-ink",
        compact ? "text-[22px]" : "text-[24px]",
      )}
    >
      {children}
    </h2>
  );
}

export function JobDraftFieldLabel({
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
        "font-wedoo-accent block leading-none text-brand-ink",
        compact ? "mb-2 text-[20px]" : "mb-2 text-[24px]",
      )}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}

function JobDraftToggle({
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
          "inline-flex rounded-[5px] border border-brand-violet-400 transition",
          compact ? "h-5 w-5" : "h-[25px] w-[25px]",
          checked ? "bg-brand-violet" : "bg-transparent",
        )}
      />
      <span
        className={cn(
          "font-wedoo-accent leading-none text-brand-ink",
          compact ? "text-[18px]" : "text-[24px]",
        )}
      >
        {label}
      </span>
    </label>
  );
}

export function JobDraftSelectField({
  compact = false,
  dataNodeId,
  id,
  label,
  onChange,
  options,
  value,
}: {
  compact?: boolean;
  dataNodeId?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: readonly JobDraftOption[];
  value: string;
}) {
  return (
    <div className="grid gap-0">
      <JobDraftFieldLabel compact={compact} htmlFor={id} label={label} />
      <div className="relative" data-node-id={dataNodeId}>
        <select
          className={cn(
            "font-wedoo-body w-full appearance-none rounded-[8px] border border-brand-violet-400 bg-brand-page pr-10 text-brand-ink outline-none transition focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/15",
            compact ? "h-[44px] px-3 text-[18px]" : "h-[37px] px-[7px] text-[22px]",
            value ? "text-brand-ink" : "text-brand-ink/55",
          )}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">scegli</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <SiteIcon
          className={cn(
            "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-ink",
            compact ? "h-4 w-4" : "h-4 w-4",
          )}
          data-node-id="2:543"
          name="chevron-down"
        />
      </div>
    </div>
  );
}

function JobDraftCapField({
  capOptions,
  compact = false,
  datalistId,
  id,
  onChange,
  value,
}: {
  capOptions: readonly JobDraftOption[];
  compact?: boolean;
  datalistId: string;
  id: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="grid gap-0">
      <JobDraftFieldLabel compact={compact} htmlFor={id} label="CAP" />
      <input
        className={cn(
          "font-wedoo-body w-full rounded-[8px] border border-brand-violet-400 bg-brand-page text-brand-ink outline-none transition placeholder:text-brand-ink/45 focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/15",
          compact ? "h-[44px] px-3 text-[18px]" : "h-[37px] px-[7px] text-[22px]",
        )}
        data-node-id="258:918"
        id={id}
        list={datalistId}
        onChange={(event) => onChange(event.target.value)}
        placeholder="scrivi"
        value={value}
      />
      <datalist id={datalistId}>
        {capOptions.map((option) => (
          <option key={option.id} value={option.id} />
        ))}
      </datalist>
    </div>
  );
}

function JobDraftDescriptionEditor({
  compact = false,
  id,
  onChange,
  value,
}: {
  compact?: boolean;
  id: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="grid gap-0">
      <JobDraftFieldLabel compact={compact} htmlFor={id} label="job description" />
      <div
        className={cn(
          "overflow-hidden rounded-[20px] border border-brand-violet-400 bg-transparent",
          compact ? "min-h-[164px]" : "min-h-[167px]",
        )}
        data-node-id="258:924"
      >
        <div
          className={cn(
            "flex items-center border-b border-brand-violet-400 font-wedoo-body text-brand-ink",
            compact ? "gap-4 px-3 py-2 text-[18px]" : "gap-6 px-4 py-2 text-[22px]",
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
          <AppIcon className={compact ? "h-5 w-5" : "h-6 w-6"} name="list-box-line" />
        </div>
        <textarea
          className={cn(
            "font-wedoo-body w-full resize-none border-none bg-transparent text-brand-ink outline-none",
            compact ? "min-h-[112px] px-3 py-3 text-[18px]" : "min-h-[110px] px-4 py-3 text-[22px]",
          )}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </div>
    </div>
  );
}

export function JobDraftHintText({
  children,
  className,
  compact = false,
}: {
  children: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <p
      className={cn(
        "font-wedoo-body text-brand-ink",
        compact ? "text-[15px] leading-[1.2]" : "text-[18px] leading-[1.05]",
        className,
      )}
    >
      {children}
    </p>
  );
}

function JobDraftExperienceHints({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={cn(
        "font-wedoo-body list-disc text-brand-ink",
        compact ? "space-y-1 pl-5 text-[15px] leading-[1.2]" : "space-y-1 pl-6 text-[18px] leading-[1.05]",
      )}
    >
      {draftStepOneHints.experienceSuggestions.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function JobDraftDesktopView({
  capDatalistId,
  capOptions,
  cityOptions,
  experienceOptions,
  formState,
  onCapChange,
  onCheckboxChange,
  onCityChange,
  onDescriptionChange,
  onExperienceChange,
  provinceOptions,
  onProvinceChange,
  onSectorChange,
  onSkillChange,
  sectorOptions,
  skillOptions,
  onSubmit,
}: {
  capDatalistId: string;
  capOptions: readonly JobDraftOption[];
  cityOptions: readonly JobDraftOption[];
  experienceOptions: readonly JobDraftOption[];
  formState: CompanyJobDraftStepOneState;
  onCapChange: (value: string) => void;
  onCheckboxChange: (
    field: "remoteAllowed" | "travelRequired",
    value: boolean,
  ) => void;
  onCityChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
  provinceOptions: readonly JobDraftOption[];
  onProvinceChange: (value: string) => void;
  onSectorChange: (value: string) => void;
  onSkillChange: (value: string) => void;
  sectorOptions: readonly JobDraftOption[];
  skillOptions: readonly JobDraftOption[];
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <section className="hidden min-[1024px]:block" data-job-draft-layout="desktop">
      <div
        className="relative mx-auto h-[1024px] w-full max-w-[1440px]"
        data-node-id="258:847"
        data-testid="company-job-draft-step-1"
      >
        <img
          alt=""
          className="pointer-events-none absolute top-[15px] h-[995px] object-cover"
          src={assetPath("formaziende4.png")}
          style={{ left: desktopPct(20), width: desktopPct(1400) }}
        />

        <div className="absolute top-[50px]" style={{ left: desktopPct(1314) }}>
          <JobDraftLanguageChip />
        </div>

        <h1
          className="font-wedoo-heading absolute text-[48px] leading-[1.04] text-brand-ink"
          style={{ left: desktopPct(103), top: 51, width: desktopPct(432) }}
        >
          Crea il tuo annuncio
        </h1>

        <form
          className="absolute rounded-[10px] border border-brand-violet-400 bg-[rgba(255,255,255,0.96)] px-[22px] pb-[18px] pt-[20px]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          style={{ left: desktopPct(68), minHeight: 797, top: 138, width: desktopPct(571) }}
        >
          <div className="space-y-[14px]">
            <JobDraftSectionHeading>dettagli area geografica</JobDraftSectionHeading>

            <div className="flex gap-[43px]">
              <JobDraftToggle
                checked={formState.remoteAllowed}
                id="desktop-company-job-draft-remote"
                label="smart working"
                onChange={(checked) => onCheckboxChange("remoteAllowed", checked)}
              />
              <JobDraftToggle
                checked={formState.travelRequired}
                id="desktop-company-job-draft-travel"
                label="trasferte"
                onChange={(checked) => onCheckboxChange("travelRequired", checked)}
              />
            </div>

            <div className="grid grid-cols-[178px_178px_117px] gap-6">
              <JobDraftSelectField
                dataNodeId="258:906"
                id="desktop-company-job-draft-province"
                label="provincia"
                onChange={onProvinceChange}
                options={provinceOptions}
                value={formState.provinceId}
              />
              <JobDraftSelectField
                dataNodeId="258:912"
                id="desktop-company-job-draft-city"
                label={"citt\u00E0"}
                onChange={onCityChange}
                options={cityOptions}
                value={formState.cityId}
              />
              <JobDraftCapField
                capOptions={capOptions}
                datalistId={capDatalistId}
                id="desktop-company-job-draft-cap"
                onChange={onCapChange}
                value={formState.capId}
              />
            </div>

            <div className="pt-[6px]">
              <JobDraftSectionHeading>descrizione offerta</JobDraftSectionHeading>
            </div>

            <JobDraftDescriptionEditor
              id="desktop-company-job-draft-description"
              onChange={onDescriptionChange}
              value={formState.description}
            />

            <JobDraftSelectField
              dataNodeId="258:939"
              id="desktop-company-job-draft-sector"
              label="settore operativo aziendale"
              onChange={onSectorChange}
              options={sectorOptions}
              value={formState.sectorId}
            />

            <JobDraftSelectField
              dataNodeId="258:945"
              id="desktop-company-job-draft-skills"
              label="competenze richieste"
              onChange={onSkillChange}
              options={skillOptions}
              value={formState.skillId}
            />

            <JobDraftSelectField
              dataNodeId="258:951"
              id="desktop-company-job-draft-experience"
              label="esperienza richiesta"
              onChange={onExperienceChange}
              options={experienceOptions}
              value={formState.experienceLevelId}
            />

            <button
              className="font-wedoo-accent mt-2 inline-flex h-[52px] w-full items-center justify-center rounded-[8px] bg-brand-violet text-[24px] leading-none text-[var(--wedoo-white-soft)] transition hover:bg-brand-violet-600"
              type="submit"
            >
              avanti
            </button>
          </div>
        </form>

        <div
          className="absolute space-y-8"
          style={{ left: desktopPct(644), top: 242, width: desktopPct(543) }}
        >
          <JobDraftHintText className="max-w-[413px]">
            {draftStepOneHints.geography}
          </JobDraftHintText>
          <JobDraftHintText className="max-w-[335px]">
            {draftStepOneHints.sectorExamples}
          </JobDraftHintText>
          <JobDraftHintText>
            {draftStepOneHints.skills}
          </JobDraftHintText>
          <JobDraftExperienceHints />
        </div>
      </div>
    </section>
  );
}

function JobDraftMobileView({
  capDatalistId,
  capOptions,
  cityOptions,
  experienceOptions,
  formState,
  onCapChange,
  onCheckboxChange,
  onCityChange,
  onDescriptionChange,
  onExperienceChange,
  provinceOptions,
  onProvinceChange,
  onSectorChange,
  onSkillChange,
  sectorOptions,
  skillOptions,
  onSubmit,
}: {
  capDatalistId: string;
  capOptions: readonly JobDraftOption[];
  cityOptions: readonly JobDraftOption[];
  experienceOptions: readonly JobDraftOption[];
  formState: CompanyJobDraftStepOneState;
  onCapChange: (value: string) => void;
  onCheckboxChange: (
    field: "remoteAllowed" | "travelRequired",
    value: boolean,
  ) => void;
  onCityChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onExperienceChange: (value: string) => void;
  provinceOptions: readonly JobDraftOption[];
  onProvinceChange: (value: string) => void;
  onSectorChange: (value: string) => void;
  onSkillChange: (value: string) => void;
  sectorOptions: readonly JobDraftOption[];
  skillOptions: readonly JobDraftOption[];
  onSubmit: () => void | Promise<void>;
}) {
  return (
    <section className="min-[1024px]:hidden" data-job-draft-layout="mobile">
      <div
        className="mx-auto max-w-[390px] px-4 pb-8 pt-4"
        data-node-id="258:847"
        data-testid="company-job-draft-step-1"
      >
        <div className="relative h-[250px] overflow-hidden rounded-[32px]">
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-right"
            src={assetPath("formaziende4.png")}
          />
          <div className="absolute right-4 top-4">
            <JobDraftLanguageChip compact />
          </div>
          <h1 className="font-wedoo-heading absolute bottom-6 left-5 max-w-[228px] text-[38px] leading-[0.95] text-brand-ink">
            Crea il tuo annuncio
          </h1>
        </div>

        <form
          className="-mt-8 rounded-[28px] border border-brand-violet-400 bg-[rgba(255,255,255,0.96)] px-5 pb-5 pt-6 shadow-[0_18px_48px_-28px_rgba(42,26,81,0.35)]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="space-y-4">
            <JobDraftSectionHeading compact>dettagli area geografica</JobDraftSectionHeading>

            <div className="flex flex-wrap gap-4">
              <JobDraftToggle
                checked={formState.remoteAllowed}
                compact
                id="mobile-company-job-draft-remote"
                label="smart working"
                onChange={(checked) => onCheckboxChange("remoteAllowed", checked)}
              />
              <JobDraftToggle
                checked={formState.travelRequired}
                compact
                id="mobile-company-job-draft-travel"
                label="trasferte"
                onChange={(checked) => onCheckboxChange("travelRequired", checked)}
              />
            </div>

            <div className="grid gap-4">
              <JobDraftSelectField
                compact
                dataNodeId="258:906"
                id="mobile-company-job-draft-province"
                label="provincia"
                onChange={onProvinceChange}
                options={provinceOptions}
                value={formState.provinceId}
              />
              <JobDraftSelectField
                compact
                dataNodeId="258:912"
                id="mobile-company-job-draft-city"
                label={"citt\u00E0"}
                onChange={onCityChange}
                options={cityOptions}
                value={formState.cityId}
              />
              <JobDraftCapField
                capOptions={capOptions}
                compact
                datalistId={capDatalistId}
                id="mobile-company-job-draft-cap"
                onChange={onCapChange}
                value={formState.capId}
              />
            </div>

            <JobDraftHintText compact>{draftStepOneHints.geography}</JobDraftHintText>

            <JobDraftSectionHeading compact>descrizione offerta</JobDraftSectionHeading>
            <JobDraftDescriptionEditor
              compact
              id="mobile-company-job-draft-description"
              onChange={onDescriptionChange}
              value={formState.description}
            />

            <div className="space-y-3">
              <JobDraftSelectField
                compact
                dataNodeId="258:939"
                id="mobile-company-job-draft-sector"
                label="settore operativo aziendale"
                onChange={onSectorChange}
                options={sectorOptions}
                value={formState.sectorId}
              />
              <JobDraftHintText compact>{draftStepOneHints.sectorExamples}</JobDraftHintText>
            </div>

            <div className="space-y-3">
              <JobDraftSelectField
                compact
                dataNodeId="258:945"
                id="mobile-company-job-draft-skills"
                label="competenze richieste"
                onChange={onSkillChange}
                options={skillOptions}
                value={formState.skillId}
              />
              <JobDraftHintText compact>{draftStepOneHints.skills}</JobDraftHintText>
            </div>

            <JobDraftSelectField
              compact
              dataNodeId="258:951"
              id="mobile-company-job-draft-experience"
              label="esperienza richiesta"
              onChange={onExperienceChange}
              options={experienceOptions}
              value={formState.experienceLevelId}
            />

            <JobDraftExperienceHints compact />

            <button
              className="font-wedoo-accent inline-flex h-[50px] w-full items-center justify-center rounded-[8px] bg-brand-violet text-[22px] leading-none text-[var(--wedoo-white-soft)] transition hover:bg-brand-violet-600"
              type="submit"
            >
              avanti
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export function CompanyJobDraftStepOne({
  draft,
  onContinue,
}: CompanyJobDraftStepOneProps) {
  const [formState, setFormState] = useState(() => createInitialFormState(draft));
  const capDatalistId = useId().replace(/:/g, "");
  const cityOptions = getJobDraftCityOptions(draft.catalogs, formState.provinceId);
  const capOptions = getJobDraftCapOptions(
    draft.catalogs,
    formState.provinceId,
    formState.cityId,
  );

  useEffect(() => {
    setFormState(createInitialFormState(draft));
  }, [draft]);

  function updateCheckbox(
    field: "remoteAllowed" | "travelRequired",
    value: boolean,
  ) {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function updateProvince(nextProvinceId: string) {
    setFormState((previous) => {
      const nextCityOptions = getJobDraftCityOptions(draft.catalogs, nextProvinceId);
      const cityStillValid = nextCityOptions.some(
        (option) => option.id === previous.cityId,
      );
      const nextCityId = cityStillValid
        ? previous.cityId
        : (nextCityOptions[0]?.id ?? "");
      const nextCapOptions = getJobDraftCapOptions(
        draft.catalogs,
        nextProvinceId,
        nextCityId,
      );
      const capStillValid = nextCapOptions.some(
        (option) => option.id === previous.capId,
      );

      return {
        ...previous,
        capId: capStillValid ? previous.capId : (nextCapOptions[0]?.id ?? ""),
        cityId: nextCityId,
        provinceId: nextProvinceId,
      };
    });
  }

  function updateCity(nextCityId: string) {
    setFormState((previous) => {
      const nextCapOptions = getJobDraftCapOptions(
        draft.catalogs,
        previous.provinceId,
        nextCityId,
      );
      const capStillValid = nextCapOptions.some(
        (option) => option.id === previous.capId,
      );

      return {
        ...previous,
        capId: capStillValid ? previous.capId : (nextCapOptions[0]?.id ?? ""),
        cityId: nextCityId,
      };
    });
  }

  return (
    <main className="bg-brand-page">
      <JobDraftDesktopView
        capDatalistId={`desktop-cap-${capDatalistId}`}
        capOptions={capOptions}
        cityOptions={cityOptions}
        experienceOptions={draft.catalogs.experienceLevels}
        formState={formState}
        onCapChange={(value) =>
          setFormState((previous) => ({ ...previous, capId: value }))
        }
        onCheckboxChange={updateCheckbox}
        onCityChange={updateCity}
        onDescriptionChange={(value) =>
          setFormState((previous) => ({ ...previous, description: value }))
        }
        onExperienceChange={(value) =>
          setFormState((previous) => ({
            ...previous,
            experienceLevelId: value,
          }))
        }
        provinceOptions={draft.catalogs.provinces}
        onProvinceChange={updateProvince}
        onSectorChange={(value) =>
          setFormState((previous) => ({ ...previous, sectorId: value }))
        }
        onSkillChange={(value) =>
          setFormState((previous) => ({ ...previous, skillId: value }))
        }
        sectorOptions={draft.catalogs.sectors}
        skillOptions={draft.catalogs.skillTags}
        onSubmit={() => onContinue?.(formState)}
      />

      <JobDraftMobileView
        capDatalistId={`mobile-cap-${capDatalistId}`}
        capOptions={capOptions}
        cityOptions={cityOptions}
        experienceOptions={draft.catalogs.experienceLevels}
        formState={formState}
        onCapChange={(value) =>
          setFormState((previous) => ({ ...previous, capId: value }))
        }
        onCheckboxChange={updateCheckbox}
        onCityChange={updateCity}
        onDescriptionChange={(value) =>
          setFormState((previous) => ({ ...previous, description: value }))
        }
        onExperienceChange={(value) =>
          setFormState((previous) => ({
            ...previous,
            experienceLevelId: value,
          }))
        }
        provinceOptions={draft.catalogs.provinces}
        onProvinceChange={updateProvince}
        onSectorChange={(value) =>
          setFormState((previous) => ({ ...previous, sectorId: value }))
        }
        onSkillChange={(value) =>
          setFormState((previous) => ({ ...previous, skillId: value }))
        }
        sectorOptions={draft.catalogs.sectors}
        skillOptions={draft.catalogs.skillTags}
        onSubmit={() => onContinue?.(formState)}
      />
    </main>
  );
}
