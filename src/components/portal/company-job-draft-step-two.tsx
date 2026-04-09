import { useId, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { JobDraft } from "../../data/job-draft";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
import {
  JobDraftFieldLabel,
  JobDraftHintText,
  JobDraftLanguageChip,
  JobDraftSelectField,
} from "./company-job-draft-step-one";

type CompanyJobDraftStepTwoProps = {
  draft: JobDraft;
};

type CompanyJobDraftStepTwoState = {
  contractTypeId: string;
  hoursId: string;
  selectedFileName: string;
  selectedSdgId: string;
  workModeId: string;
};

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

function createInitialFormState(): CompanyJobDraftStepTwoState {
  return {
    contractTypeId: "",
    hoursId: "",
    selectedFileName: "",
    selectedSdgId: "",
    workModeId: "",
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
  selectedFileName,
}: {
  compact?: boolean;
  id: string;
  onFileChange: (fileName: string) => void;
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

function JobDraftDesktopStepTwoView({
  formState,
  onChange,
  onFileChange,
  onPreview,
  onReset,
  onSaveDraft,
  onSubmit,
  uploadId,
  draft,
}: {
  draft: JobDraft;
  formState: CompanyJobDraftStepTwoState;
  onChange: (
    field: "contractTypeId" | "hoursId" | "selectedSdgId" | "workModeId",
    value: string,
  ) => void;
  onFileChange: (value: string) => void;
  onPreview: () => void;
  onReset: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
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

            <JobDraftSelectField
              dataNodeId="259:1139"
              id="desktop-company-job-draft-sdg"
              label="SDGs di riferimento"
              onChange={(value) => onChange("selectedSdgId", value)}
              options={draft.catalogs.sdgs}
              value={formState.selectedSdgId}
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
  onSubmit,
  uploadId,
  draft,
}: {
  draft: JobDraft;
  formState: CompanyJobDraftStepTwoState;
  onChange: (
    field: "contractTypeId" | "hoursId" | "selectedSdgId" | "workModeId",
    value: string,
  ) => void;
  onFileChange: (value: string) => void;
  onPreview: () => void;
  onReset: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  uploadId: string;
}) {
  return (
    <section className="min-[1024px]:hidden" data-job-draft-layout="mobile">
      <div
        className="mx-auto max-w-[390px] px-4 pb-8 pt-4"
        data-node-id="259:1050"
        data-testid="company-job-draft-step-2"
      >
        <div className="relative h-[250px] overflow-hidden rounded-[32px]">
          <img
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-right"
            src={assetPath("formaziende5.png")}
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

            <JobDraftSelectField
              compact
              dataNodeId="259:1139"
              id="mobile-company-job-draft-sdg"
              label="SDGs di riferimento"
              onChange={(value) => onChange("selectedSdgId", value)}
              options={draft.catalogs.sdgs}
              value={formState.selectedSdgId}
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
}: CompanyJobDraftStepTwoProps) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(() => createInitialFormState());
  const uploadFieldId = useId().replace(/:/g, "");

  function updateField(
    field: "contractTypeId" | "hoursId" | "selectedSdgId" | "workModeId",
    value: string,
  ) {
    setFormState((previous) => ({
      ...previous,
      [field]: value,
    }));
  }

  function resetForm() {
    setFormState(createInitialFormState());
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
        onPreview={() => navigate(draft.flow.previewPath)}
        onReset={resetForm}
        onSaveDraft={() => navigate("/portale/azienda/annunci")}
        onSubmit={() => navigate(draft.flow.completionPath)}
        uploadId={`desktop-upload-${uploadFieldId}`}
      />

      <JobDraftMobileStepTwoView
        draft={draft}
        formState={formState}
        onChange={updateField}
        onFileChange={(value) =>
          setFormState((previous) => ({ ...previous, selectedFileName: value }))
        }
        onPreview={() => navigate(draft.flow.previewPath)}
        onReset={resetForm}
        onSaveDraft={() => navigate("/portale/azienda/annunci")}
        onSubmit={() => navigate(draft.flow.completionPath)}
        uploadId={`mobile-upload-${uploadFieldId}`}
      />
    </main>
  );
}
