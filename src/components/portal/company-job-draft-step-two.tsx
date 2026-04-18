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
  fullWidth = false,
  onClick,
  tone = "outline",
}: {
  children: string;
  fullWidth?: boolean;
  onClick?: () => void;
  tone?: "outline" | "primary";
}) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] border-2 text-[24px] leading-none transition",
        fullWidth ? "h-[52px] w-full px-3" : "h-[40px] px-3",
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
  fullWidth = false,
  id,
  onFileChange,
  resetKey,
  selectedFileName,
}: {
  compact?: boolean;
  fullWidth?: boolean;
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
          compact
            ? fullWidth
              ? "h-[44px] w-full gap-2 px-3 text-[18px]"
              : "h-[44px] w-[152px] gap-2 px-3 text-[18px]"
            : fullWidth
              ? "h-[37px] w-full gap-2 px-3 text-[22px]"
              : "h-[37px] w-[178px] gap-2 px-3 text-[22px]",
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
        className="relative mx-auto min-h-[1024px] w-full max-w-[1440px]"
        data-node-id="259:1050"
        data-testid="company-job-draft-step-2"
      >
        <img
          alt=""
          className="pointer-events-none absolute top-[15px] h-[995px] object-cover object-[54%_center]"
          src={assetPath("formaziende5.png")}
          style={{ left: "clamp(18px,1.39vw,20px)", width: "clamp(1260px,97.22vw,1400px)" }}
        />

        <div className="absolute right-[69px] top-[50px]">
          <JobDraftLanguageChip />
        </div>

        <h1
          className="font-wedoo-heading absolute w-[clamp(420px,36vw,520px)] whitespace-nowrap text-[clamp(36px,2.8vw,48px)] leading-[0.98] text-brand-ink"
          style={{ left: "clamp(104px,10.35vw,149px)", top: 162 }}
        >
          Crea il tuo annuncio
        </h1>

        <form
          className="absolute rounded-[10px] border border-brand-violet-400 bg-[rgba(255,255,255,0.96)] px-[22px] pb-[26px] pt-[18px]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
          style={{ left: "clamp(62px,5.56vw,80px)", minHeight: 479, top: 273, width: "clamp(520px,39.65vw,571px)" }}
        >
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-8">
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
          className="absolute bg-[#d9d9d9] px-4 py-10 shadow-[0_12px_32px_-22px_rgba(33,37,41,0.45)]"
          style={{ height: 477, left: "clamp(560px,45.2vw,651px)", top: 223, width: "clamp(360px,31.32vw,451px)" }}
        >
          <div className="space-y-8">
            <div className="space-y-4">
              <JobDraftHintText className="max-w-[315px] text-[17px] leading-[1.08]">
                {draftStepTwoHints.contractExamples}
              </JobDraftHintText>
              <JobDraftHintText className="max-w-[413px] text-[17px] leading-[1.08]">
                {draftStepTwoHints.contractHours}
              </JobDraftHintText>
            </div>
            <JobDraftHintText className="max-w-[357px] text-[17px] leading-[1.08]">
              {draftStepTwoHints.modeExamples}
            </JobDraftHintText>
            <JobDraftHintText className="max-w-[413px] text-[17px] leading-[1.08]">
              {draftStepTwoHints.sdgGuide}
            </JobDraftHintText>
            <JobDraftHintText className="max-w-[413px] text-[17px] leading-[1.08]">
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
        className="mx-auto min-h-[949px] w-full max-w-[360px] px-[18px] pb-7 pt-7"
        data-node-id="259:1162"
        data-testid="company-job-draft-step-2"
      >
        <div className="relative min-h-[88px]">
          <div className="absolute right-[6px] top-[1px]">
            <JobDraftLanguageChip compact />
          </div>
          <img
            alt="Wedoo"
            className="absolute left-1/2 top-[1px] h-[49px] w-[184px] -translate-x-1/2 object-contain"
            src={assetPath("Frame-2@2x.png")}
          />
          <h1 className="font-wedoo-heading absolute left-1/2 top-[50px] w-[342px] -translate-x-1/2 text-center text-[36px] leading-none text-brand-ink">
            Crea il tuo annuncio
          </h1>
        </div>

        <form
          className="mt-[29px] rounded-[10px] border border-brand-violet-400 bg-[rgba(255,255,255,0.98)] px-[12px] pb-5 pt-[18px]"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="space-y-[12px]">
            <div className="grid gap-[10px]">
              <JobDraftSelectField
                dataNodeId="259:1081"
                id="mobile-company-job-draft-contract"
                label="tipologia di contratto"
                onChange={(value) => onChange("contractTypeId", value)}
                options={draft.catalogs.contractTypes}
                value={formState.contractTypeId}
              />
              <JobDraftSelectField
                dataNodeId="259:1127"
                id="mobile-company-job-draft-hours"
                label="orari di lavoro"
                onChange={(value) => onChange("hoursId", value)}
                options={draft.catalogs.hoursOptions}
                value={formState.hoursId}
              />
            </div>

            <JobDraftSelectField
              dataNodeId="259:1133"
              id="mobile-company-job-draft-mode"
              label={"modalit\u00E0 di lavoro"}
              onChange={(value) => onChange("workModeId", value)}
              options={draft.catalogs.workModes}
              value={formState.workModeId}
            />

            <JobDraftSdgField
              dataNodeId="259:1139"
              id="mobile-company-job-draft-sdg"
              label="SDGs di riferimento"
              onAdd={onSdgAdd}
              onRemove={onSdgRemove}
              options={draft.catalogs.sdgs}
              selectedIds={formState.selectedSdgIds}
            />

            <div className="space-y-[11px]">
              <JobDraftFieldLabel
                htmlFor={uploadId}
                label={
                  "carica le tue certificazioni sostenibili o, in assenza, il report di sostenibilit\u00E0"
                }
              />
              <JobDraftUploadButton
                fullWidth
                id={uploadId}
                onFileChange={onFileChange}
                resetKey={uploadResetKey}
                selectedFileName={formState.selectedFileName}
              />
            </div>

            <div className="grid gap-[10px] pt-2">
              <button
                className="font-wedoo-accent inline-flex h-[52px] w-full items-center justify-center rounded-[8px] bg-brand-violet text-[24px] leading-none text-[var(--wedoo-white-soft)] transition hover:bg-brand-violet-600"
                type="submit"
              >
                invia
              </button>
              <JobDraftActionButton fullWidth onClick={onPreview}>anteprima</JobDraftActionButton>
              <JobDraftActionButton fullWidth onClick={onSaveDraft}>salva in bozza</JobDraftActionButton>
              <JobDraftActionButton fullWidth onClick={onReset}>cancella</JobDraftActionButton>
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
