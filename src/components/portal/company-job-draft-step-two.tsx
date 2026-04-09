import { useEffect, useId, useState } from "react";
import type {
  JobDraft,
  JobDraftOption,
  JobDraftStepTwoInput,
} from "../../data/job-draft";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteIcon } from "../site";
import {
  JobDraftFieldLabel,
  JobDraftHintText,
  JobDraftLanguageChip,
  JobDraftMobileHero,
  JobDraftSelectField,
} from "./company-job-draft-fields";

type CompanyJobDraftStepTwoProps = {
  draft: JobDraft;
  onPreview?: (values: JobDraftStepTwoInput) => void | Promise<void>;
  onSaveDraft?: (values: JobDraftStepTwoInput) => void | Promise<void>;
  onSubmitDraft?: (values: JobDraftStepTwoInput) => void | Promise<void>;
};

type CompanyJobDraftStepTwoState = JobDraftStepTwoInput;

const draftStepTwoHints = {
  contractExamples: "full time, part-time, turni, stage, ecc.",
  contractHours:
    "la sezione orari di lavoro si pu\u00F2 adattare in base al tipo di contratto con dei suggerimenti, come per l\u2019area geografica, sempre con la possibilit\u00E0 di poter comunque scegliere dal menu a tendina",
  modeExamples: "smart, ibrido, presenza, viaggi e trasferte",
  sdgGuide:
    "menu a tendina con tutti i 17 obiettivi con scelta multipla riferiti al purpose dell\u2019offerta, non dell\u2019azienda. Inserire anche una breve guida agli SDG per chi non sa cosa siano o a cosa servano",
  sustainabilityProof:
    "specificare il tipo di certificazione, iniziative sostenibili particolari",
} as const;

const desktopPct = (value: number) => `${(value / 1440) * 100}%`;

function createInitialFormState(draft: JobDraft): CompanyJobDraftStepTwoState {
  return {
    contractTypeId: draft.role.contractTypeId,
    hoursId: draft.role.hoursId,
    selectedFileName: draft.role.certificationLabel,
    selectedSdgIds: [...draft.role.sdgIds],
    workModeId: draft.role.workModeId,
  };
}

function JobDraftActionButton({
  children,
  onClick,
  tone = "outline",
}: {
  children: string;
  onClick?: () => void;
  tone?: "outline" | "primary";
}) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex h-[40px] items-center justify-center rounded-[8px] border-2 px-3 text-[24px] leading-none transition",
        tone === "primary"
          ? "border-brand-violet bg-brand-violet text-[var(--wedoo-white-soft)] hover:bg-brand-violet-600"
          : "border-brand-violet bg-transparent text-brand-ink hover:bg-brand-violet/8",
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

function JobDraftUploadButton({
  compact = false,
  id,
  onFileChange,
  resetKey,
  selectedFileName,
}: {
  compact?: boolean;
  id: string;
  onFileChange: (fileName: string) => void;
  resetKey: number;
  selectedFileName: string;
}) {
  return (
    <div className="grid gap-2">
      <label
        className={cn(
          "inline-flex cursor-pointer items-center rounded-[8px] border border-brand-violet-400 bg-brand-page text-brand-ink/35 transition hover:border-brand-violet",
          compact ? "h-[44px] w-[152px] gap-2 px-3 text-[18px]" : "h-[37px] w-[178px] gap-2 px-3 text-[22px]",
        )}
        htmlFor={id}
      >
        <AppIcon className={compact ? "h-4 w-4" : "h-[19px] w-[19px]"} name="cloud-upload-line" />
        <span className="font-wedoo-body">{selectedFileName || "carica"}</span>
      </label>
      <input
        className="sr-only"
        id={id}
        key={`${id}-${resetKey}`}
        onChange={(event) =>
          onFileChange(event.target.files?.[0]?.name ?? "")
        }
        type="file"
      />
      {selectedFileName ? (
        <p className="font-wedoo-body text-[14px] leading-[1.2] text-brand-ink">
          {selectedFileName}
        </p>
      ) : null}
    </div>
  );
}

function JobDraftSelectedValues({
  compact = false,
  onRemove,
  options,
  selectedIds,
}: {
  compact?: boolean;
  onRemove: (value: string) => void;
  options: readonly JobDraftOption[];
  selectedIds: readonly string[];
}) {
  const selectedOptions = selectedIds
    .map((id) => options.find((option) => option.id === id))
    .filter((option): option is JobDraftOption => Boolean(option));

  if (selectedOptions.length === 0) {
    return null;
  }

  return (
    <ul
      className={cn(
        "flex flex-wrap gap-2",
        compact ? "pt-1" : "pt-2",
      )}
      data-testid="company-job-draft-sdg-list"
    >
      {selectedOptions.map((option) => (
        <li key={option.id}>
          <button
            aria-label={`Rimuovi SDG ${option.label}`}
            className={cn(
              "font-wedoo-body inline-flex items-center gap-2 rounded-full border border-brand-violet-400 bg-brand-page text-brand-ink transition hover:bg-brand-violet/8",
              compact ? "px-3 py-1 text-[15px]" : "px-3 py-1.5 text-[16px]",
            )}
            onClick={() => onRemove(option.id)}
            type="button"
          >
            <span>{option.label}</span>
            <span aria-hidden="true" className="font-wedoo-accent text-[0.9em] leading-none">
              x
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function JobDraftSdgField({
  compact = false,
  dataNodeId,
  id,
  label,
  onAdd,
  onRemove,
  options,
  selectedIds,
}: {
  compact?: boolean;
  dataNodeId?: string;
  id: string;
  label: string;
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  options: readonly JobDraftOption[];
  selectedIds: readonly string[];
}) {
  const availableOptions = options.filter(
    (option) => !selectedIds.includes(option.id),
  );

  return (
    <div className="grid gap-0">
      <JobDraftFieldLabel compact={compact} htmlFor={id} label={label} />
      <div className="relative" data-node-id={dataNodeId}>
        <select
          className={cn(
            "font-wedoo-body w-full appearance-none rounded-[8px] border border-brand-violet-400 bg-brand-page pr-10 text-brand-ink outline-none transition focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/15",
            compact ? "h-[44px] px-3 text-[18px]" : "h-[37px] px-[7px] text-[22px]",
            "text-brand-ink/55",
          )}
          id={id}
          onChange={(event) => {
            const nextValue = event.target.value;
            if (!nextValue) {
              return;
            }

            onAdd(nextValue);
            event.target.value = "";
          }}
          value=""
        >
          <option value="">scegli</option>
          {availableOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <SiteIcon
          className={cn(
            "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-brand-ink",
            "h-4 w-4",
          )}
          data-node-id="2:543"
          name="chevron-down"
        />
      </div>
      <JobDraftSelectedValues
        compact={compact}
        onRemove={onRemove}
        options={options}
        selectedIds={selectedIds}
      />
    </div>
  );
}

function JobDraftDesktopStepTwoView({
  formState,
  onChange,
  onFileChange,
  onPreview,
  onReset,
  onSaveDraft,
  onSdgAdd,
  onSdgRemove,
  onSubmit,
  uploadResetKey,
  uploadId,
  draft,
}: {
  draft: JobDraft;
  formState: CompanyJobDraftStepTwoState;
  onChange: (
    field: "contractTypeId" | "hoursId" | "workModeId",
    value: string,
  ) => void;
  onFileChange: (value: string) => void;
  onPreview: () => void | Promise<void>;
  onReset: () => void;
  onSaveDraft: () => void | Promise<void>;
  onSdgAdd: (value: string) => void;
  onSdgRemove: (value: string) => void;
  onSubmit: () => void | Promise<void>;
  uploadResetKey: number;
  uploadId: string;
}) {
  return (
    <section className="hidden min-[1024px]:block" data-job-draft-layout="desktop">
      <div
        className="relative mx-auto h-[1024px] w-full max-w-[1440px]"
        data-node-id="259:1050"
        data-testid="company-job-draft-step-2"
      >
        <img
          alt=""
          className="pointer-events-none absolute top-[15px] h-[995px] object-cover"
          src={assetPath("formaziende5.png")}
          style={{ left: desktopPct(20), width: desktopPct(1400) }}
        />

        <div className="absolute top-[50px]" style={{ left: desktopPct(1314) }}>
          <JobDraftLanguageChip />
        </div>

        <h1
          className="font-wedoo-heading absolute text-[48px] leading-[1.04] text-brand-ink"
          style={{ left: desktopPct(149), top: 162, width: desktopPct(432) }}
        >
          Crea il tuo annuncio
        </h1>

        <form
          className="absolute rounded-[10px] border border-brand-violet-400 bg-[rgba(255,255,255,0.96)] px-[22px] pb-[26px] pt-[18px]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          style={{ left: desktopPct(80), minHeight: 479, top: 273, width: desktopPct(571) }}
        >
          <div className="space-y-5">
            <div className="grid grid-cols-[238px_238px] gap-12">
              <JobDraftSelectField
                dataNodeId="259:1081"
                id="desktop-company-job-draft-contract"
                label="tipologia di contratto"
                onChange={(value) => onChange("contractTypeId", value)}
                options={draft.catalogs.contractTypes}
                value={formState.contractTypeId}
              />
              <JobDraftSelectField
                dataNodeId="259:1127"
                id="desktop-company-job-draft-hours"
                label="orari di lavoro"
                onChange={(value) => onChange("hoursId", value)}
                options={draft.catalogs.hoursOptions}
                value={formState.hoursId}
              />
            </div>

            <JobDraftSelectField
              dataNodeId="259:1133"
              id="desktop-company-job-draft-mode"
              label={"modalit\u00E0 di lavoro"}
              onChange={(value) => onChange("workModeId", value)}
              options={draft.catalogs.workModes}
              value={formState.workModeId}
            />

            <JobDraftSdgField
              dataNodeId="259:1139"
              id="desktop-company-job-draft-sdg"
              label="SDGs di riferimento"
              onAdd={onSdgAdd}
              onRemove={onSdgRemove}
              options={draft.catalogs.sdgs}
              selectedIds={formState.selectedSdgIds}
            />

            <div className="space-y-2">
              <JobDraftFieldLabel
                htmlFor={uploadId}
                label={
                  "carica le tue certificazioni sostenibili o, in assenza, il report di sostenibilit\u00E0"
                }
              />
              <JobDraftUploadButton
                id={uploadId}
                onFileChange={onFileChange}
                resetKey={uploadResetKey}
                selectedFileName={formState.selectedFileName}
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-1">
              <JobDraftActionButton onClick={onReset}>cancella</JobDraftActionButton>
              <JobDraftActionButton onClick={onSaveDraft}>bozza</JobDraftActionButton>
              <JobDraftActionButton onClick={onPreview}>anteprima</JobDraftActionButton>
              <button
                className="font-wedoo-accent inline-flex h-[40px] w-[119px] items-center justify-center rounded-[8px] bg-brand-violet text-[24px] leading-none text-[var(--wedoo-white-soft)] transition hover:bg-brand-violet-600"
                type="submit"
              >
                invia
              </button>
            </div>
          </div>
        </form>

        <div
          className="absolute bg-[#d9d9d9] px-4 py-10"
          style={{ height: 477, left: desktopPct(651), top: 223, width: desktopPct(451) }}
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <JobDraftHintText className="max-w-[315px]">
                {draftStepTwoHints.contractExamples}
              </JobDraftHintText>
              <JobDraftHintText className="max-w-[413px]">
                {draftStepTwoHints.contractHours}
              </JobDraftHintText>
            </div>
            <JobDraftHintText className="max-w-[357px]">
              {draftStepTwoHints.modeExamples}
            </JobDraftHintText>
            <JobDraftHintText className="max-w-[413px]">
              {draftStepTwoHints.sdgGuide}
            </JobDraftHintText>
            <JobDraftHintText className="max-w-[413px]">
              {draftStepTwoHints.sustainabilityProof}
            </JobDraftHintText>
          </div>
        </div>
      </div>
    </section>
  );
}

function JobDraftMobileStepTwoView({
  formState,
  onChange,
  onFileChange,
  onPreview,
  onReset,
  onSaveDraft,
  onSdgAdd,
  onSdgRemove,
  onSubmit,
  uploadResetKey,
  uploadId,
  draft,
}: {
  draft: JobDraft;
  formState: CompanyJobDraftStepTwoState;
  onChange: (
    field: "contractTypeId" | "hoursId" | "workModeId",
    value: string,
  ) => void;
  onFileChange: (value: string) => void;
  onPreview: () => void | Promise<void>;
  onReset: () => void;
  onSaveDraft: () => void | Promise<void>;
  onSdgAdd: (value: string) => void;
  onSdgRemove: (value: string) => void;
  onSubmit: () => void | Promise<void>;
  uploadResetKey: number;
  uploadId: string;
}) {
  return (
    <section className="min-[1024px]:hidden" data-job-draft-layout="mobile">
      <div
        className="mx-auto max-w-[390px] px-4 pb-8 pt-4"
        data-node-id="259:1050"
        data-testid="company-job-draft-step-2"
      >
        <JobDraftMobileHero
          assetName="formaziende5.png"
          heading="Crea il tuo annuncio"
          mediaTestId="company-job-draft-step-2-mobile-hero-media"
        />

        <form
          className="-mt-4 rounded-[28px] border border-brand-violet-400 bg-[rgba(255,255,255,0.96)] px-5 pb-5 pt-6 shadow-[0_18px_48px_-28px_rgba(42,26,81,0.35)]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="space-y-4">
            <div className="grid gap-4">
              <JobDraftSelectField
                compact
                dataNodeId="259:1081"
                id="mobile-company-job-draft-contract"
                label="tipologia di contratto"
                onChange={(value) => onChange("contractTypeId", value)}
                options={draft.catalogs.contractTypes}
                value={formState.contractTypeId}
              />
              <JobDraftSelectField
                compact
                dataNodeId="259:1127"
                id="mobile-company-job-draft-hours"
                label="orari di lavoro"
                onChange={(value) => onChange("hoursId", value)}
                options={draft.catalogs.hoursOptions}
                value={formState.hoursId}
              />
            </div>

            <JobDraftHintText compact>{draftStepTwoHints.contractExamples}</JobDraftHintText>
            <JobDraftHintText compact>{draftStepTwoHints.contractHours}</JobDraftHintText>

            <JobDraftSelectField
              compact
              dataNodeId="259:1133"
              id="mobile-company-job-draft-mode"
              label={"modalit\u00E0 di lavoro"}
              onChange={(value) => onChange("workModeId", value)}
              options={draft.catalogs.workModes}
              value={formState.workModeId}
            />
            <JobDraftHintText compact>{draftStepTwoHints.modeExamples}</JobDraftHintText>

            <JobDraftSdgField
              compact
              dataNodeId="259:1139"
              id="mobile-company-job-draft-sdg"
              label="SDGs di riferimento"
              onAdd={onSdgAdd}
              onRemove={onSdgRemove}
              options={draft.catalogs.sdgs}
              selectedIds={formState.selectedSdgIds}
            />
            <JobDraftHintText compact>{draftStepTwoHints.sdgGuide}</JobDraftHintText>

            <div className="space-y-2">
              <JobDraftFieldLabel
                compact
                htmlFor={uploadId}
                label={
                  "carica le tue certificazioni sostenibili o, in assenza, il report di sostenibilit\u00E0"
                }
              />
              <JobDraftUploadButton
                compact
                id={uploadId}
                onFileChange={onFileChange}
                resetKey={uploadResetKey}
                selectedFileName={formState.selectedFileName}
              />
            </div>
            <JobDraftHintText compact>{draftStepTwoHints.sustainabilityProof}</JobDraftHintText>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <JobDraftActionButton onClick={onReset}>cancella</JobDraftActionButton>
              <JobDraftActionButton onClick={onSaveDraft}>bozza</JobDraftActionButton>
              <JobDraftActionButton onClick={onPreview}>anteprima</JobDraftActionButton>
              <button
                className="font-wedoo-accent inline-flex h-[40px] items-center justify-center rounded-[8px] bg-brand-violet text-[22px] leading-none text-[var(--wedoo-white-soft)] transition hover:bg-brand-violet-600"
                type="submit"
              >
                invia
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export function CompanyJobDraftStepTwo({
  draft,
  onPreview,
  onSaveDraft,
  onSubmitDraft,
}: CompanyJobDraftStepTwoProps) {
  const [formState, setFormState] = useState(() => createInitialFormState(draft));
  const uploadFieldId = useId().replace(/:/g, "");
  const [uploadResetKey, setUploadResetKey] = useState(0);

  useEffect(() => {
    setFormState(createInitialFormState(draft));
  }, [draft]);

  function updateField(
    field: "contractTypeId" | "hoursId" | "workModeId",
    value: string,
  ) {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function resetForm() {
    setFormState({
      contractTypeId: "",
      hoursId: "",
      selectedFileName: "",
      selectedSdgIds: [],
      workModeId: "",
    });
    setUploadResetKey((previous) => previous + 1);
  }

  return (
    <main className="bg-brand-page">
      <JobDraftDesktopStepTwoView
        draft={draft}
        formState={formState}
        onChange={updateField}
        onFileChange={(value) =>
          setFormState((previous) => ({ ...previous, selectedFileName: value }))
        }
        onPreview={() => onPreview?.(formState)}
        onReset={resetForm}
        onSaveDraft={() => onSaveDraft?.(formState)}
        onSdgAdd={(value) =>
          setFormState((previous) => ({
            ...previous,
            selectedSdgIds: previous.selectedSdgIds.includes(value)
              ? previous.selectedSdgIds
              : [...previous.selectedSdgIds, value],
          }))
        }
        onSdgRemove={(value) =>
          setFormState((previous) => ({
            ...previous,
            selectedSdgIds: previous.selectedSdgIds.filter((item) => item !== value),
          }))
        }
        onSubmit={() => onSubmitDraft?.(formState)}
        uploadResetKey={uploadResetKey}
        uploadId={`desktop-upload-${uploadFieldId}`}
      />

      <JobDraftMobileStepTwoView
        draft={draft}
        formState={formState}
        onChange={updateField}
        onFileChange={(value) =>
          setFormState((previous) => ({ ...previous, selectedFileName: value }))
        }
        onPreview={() => onPreview?.(formState)}
        onReset={resetForm}
        onSaveDraft={() => onSaveDraft?.(formState)}
        onSdgAdd={(value) =>
          setFormState((previous) => ({
            ...previous,
            selectedSdgIds: previous.selectedSdgIds.includes(value)
              ? previous.selectedSdgIds
              : [...previous.selectedSdgIds, value],
          }))
        }
        onSdgRemove={(value) =>
          setFormState((previous) => ({
            ...previous,
            selectedSdgIds: previous.selectedSdgIds.filter((item) => item !== value),
          }))
        }
        onSubmit={() => onSubmitDraft?.(formState)}
        uploadResetKey={uploadResetKey}
        uploadId={`mobile-upload-${uploadFieldId}`}
      />
    </main>
  );
}
