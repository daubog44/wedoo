import { useId } from "react";
import type { JobDraft, JobDraftStepTwoInput } from "../../data/job-draft";
import {
  CompanyWizardDesktopShell,
  CompanyWizardMobileShell,
  CompanyWizardOutlineButton,
  CompanyWizardPrimaryButton,
  CompanyWizardSdgField,
  CompanyWizardSelectField,
  CompanyWizardStepHint,
  CompanyWizardUploadField,
} from "./company-wizard-primitives";
import { companyWizardDesktopPct } from "./company-wizard-utils";

const stepHints = {
  contractExamples: "full time, part-time, turni, stage, ecc.",
  contractHours:
    "la sezione orari di lavoro si può adattare in base al tipo di contratto con dei suggerimenti, come per l’area geografica, sempre con la possibilità di poter comunque scegliere dal menu a tendina",
  modeExamples: "smart, ibrido, presenza, viaggi e trasferte",
  sdgGuide:
    "menu a tendina con tutti i 17 obiettivi con scelta multipla riferiti al purpose dell’offerta, non dell’azienda. Inserire anche una breve guida agli SDG per chi non sa cosa siano o a cosa servano",
  sustainabilityProof:
    "specificare il tipo di certificazione, iniziative sostenibili particolari",
} as const;

function buildSustainabilityValues(
  draft: JobDraft,
  overrides: Partial<JobDraftStepTwoInput> = {},
): JobDraftStepTwoInput {
  return {
    contractTypeId: draft.role.contractTypeId,
    hoursId: draft.role.hoursId,
    selectedFileName: draft.role.certificationLabel,
    selectedSdgIds: draft.role.sdgIds,
    workModeId: draft.role.workModeId,
    ...overrides,
  };
}

export function CompanySustainabilityStep({
  draft,
  onCancel,
  onPreview,
  onSaveDraft,
  onSubmit,
  onUpdate,
}: {
  draft: JobDraft;
  onCancel: () => void;
  onPreview: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
  onUpdate: (values: JobDraftStepTwoInput) => void;
}) {
  const uploadId = `company-sustainability-${useId().replace(/:/g, "")}`;

  return (
    <main className="bg-brand-page pb-10">
      <CompanyWizardDesktopShell
        aside={(
          <div
            className="wedoo-theme-shell absolute z-10 px-5 py-6"
            style={{ left: companyWizardDesktopPct(706), top: 214, width: companyWizardDesktopPct(402) }}
          >
            <div className="space-y-5">
              <p className="font-wedoo-accent text-[0.76rem] uppercase tracking-[0.22em] text-[var(--wedoo-ink-muted)]">
                guidance
              </p>
              <div className="space-y-3">
                <CompanyWizardStepHint className="max-w-[315px]">
                  {stepHints.contractExamples}
                </CompanyWizardStepHint>
                <CompanyWizardStepHint className="max-w-[413px]">
                  {stepHints.contractHours}
                </CompanyWizardStepHint>
              </div>
              <CompanyWizardStepHint className="max-w-[357px]">
                {stepHints.modeExamples}
              </CompanyWizardStepHint>
              <CompanyWizardStepHint className="max-w-[413px]">
                {stepHints.sdgGuide}
              </CompanyWizardStepHint>
              <CompanyWizardStepHint className="max-w-[413px]">
                {stepHints.sustainabilityProof}
              </CompanyWizardStepHint>
            </div>
          </div>
        )}
        backgroundAsset="formaziende5.png"
        formClassName="px-[22px] pb-[26px] pt-[18px]"
        formStyle={{ left: companyWizardDesktopPct(80), top: 246, width: companyWizardDesktopPct(571) }}
        step={5}
        testId="company-registration-step-5"
        title="Crea il tuo annuncio"
        titleClassName="text-left font-wedoo-heading text-[60px] leading-[0.94]"
        titleStyle={{ left: companyWizardDesktopPct(80), top: 94, width: companyWizardDesktopPct(520) }}
      >
        <div className="space-y-5">
          <div className="grid grid-cols-[238px_238px] gap-12">
            <CompanyWizardSelectField
              id="desktop-company-sustainability-contract"
              label="tipologia di contratto"
              onChange={(value) => onUpdate(buildSustainabilityValues(draft, { contractTypeId: value }))}
              options={draft.catalogs.contractTypes}
              value={draft.role.contractTypeId}
            />
            <CompanyWizardSelectField
              id="desktop-company-sustainability-hours"
              label="orari di lavoro"
              onChange={(value) => onUpdate(buildSustainabilityValues(draft, { hoursId: value }))}
              options={draft.catalogs.hoursOptions}
              value={draft.role.hoursId}
            />
          </div>

          <CompanyWizardSelectField
            id="desktop-company-sustainability-mode"
            label="modalità di lavoro"
            onChange={(value) => onUpdate(buildSustainabilityValues(draft, { workModeId: value }))}
            options={draft.catalogs.workModes}
            value={draft.role.workModeId}
          />

          <CompanyWizardSdgField
            id="desktop-company-sustainability-sdg"
            onAdd={(value) =>
              onUpdate(
                buildSustainabilityValues(draft, {
                  selectedSdgIds: draft.role.sdgIds.includes(value)
                    ? draft.role.sdgIds
                    : [...draft.role.sdgIds, value],
                }),
              )
            }
            onRemove={(value) =>
              onUpdate(
                buildSustainabilityValues(draft, {
                  selectedSdgIds: draft.role.sdgIds.filter((item) => item !== value),
                }),
              )
            }
            options={draft.catalogs.sdgs}
            selectedIds={draft.role.sdgIds}
          />

          <CompanyWizardUploadField
            id={`desktop-${uploadId}`}
            label="carica le tue certificazioni sostenibili o, in assenza, il report di sostenibilità"
            onFileChange={(value) =>
              onUpdate(buildSustainabilityValues(draft, { selectedFileName: value }))
            }
            selectedFileName={draft.role.certificationLabel}
          />

          <div className="flex items-center justify-end gap-2 pt-1">
            <CompanyWizardOutlineButton onClick={onCancel}>cancella</CompanyWizardOutlineButton>
            <CompanyWizardOutlineButton onClick={onSaveDraft}>bozza</CompanyWizardOutlineButton>
            <CompanyWizardOutlineButton onClick={onPreview}>anteprima</CompanyWizardOutlineButton>
            <CompanyWizardPrimaryButton className="w-[119px]" onClick={onSubmit}>
              invia
            </CompanyWizardPrimaryButton>
          </div>
        </div>
      </CompanyWizardDesktopShell>

      <CompanyWizardMobileShell
        step={5}
        testId="company-registration-step-5"
        title="Crea il tuo annuncio"
        titleClassName="text-[32px] leading-[0.95]"
      >
        <div className="space-y-4">
          <CompanyWizardSelectField
            compact
            id="mobile-company-sustainability-contract"
            label="tipologia di contratto"
            onChange={(value) => onUpdate(buildSustainabilityValues(draft, { contractTypeId: value }))}
            options={draft.catalogs.contractTypes}
            value={draft.role.contractTypeId}
          />
          <CompanyWizardSelectField
            compact
            id="mobile-company-sustainability-hours"
            label="orari di lavoro"
            onChange={(value) => onUpdate(buildSustainabilityValues(draft, { hoursId: value }))}
            options={draft.catalogs.hoursOptions}
            value={draft.role.hoursId}
          />
          <CompanyWizardSelectField
            compact
            id="mobile-company-sustainability-mode"
            label="modalità di lavoro"
            onChange={(value) => onUpdate(buildSustainabilityValues(draft, { workModeId: value }))}
            options={draft.catalogs.workModes}
            value={draft.role.workModeId}
          />
          <CompanyWizardSdgField
            compact
            id="mobile-company-sustainability-sdg"
            onAdd={(value) =>
              onUpdate(
                buildSustainabilityValues(draft, {
                  selectedSdgIds: draft.role.sdgIds.includes(value)
                    ? draft.role.sdgIds
                    : [...draft.role.sdgIds, value],
                }),
              )
            }
            onRemove={(value) =>
              onUpdate(
                buildSustainabilityValues(draft, {
                  selectedSdgIds: draft.role.sdgIds.filter((item) => item !== value),
                }),
              )
            }
            options={draft.catalogs.sdgs}
            selectedIds={draft.role.sdgIds}
          />
          <CompanyWizardUploadField
            compact
            id={`mobile-${uploadId}`}
            label="carica le tue certificazioni sostenibili o, in assenza, il report di sostenibilità"
            onFileChange={(value) =>
              onUpdate(buildSustainabilityValues(draft, { selectedFileName: value }))
            }
            selectedFileName={draft.role.certificationLabel}
          />

          <CompanyWizardPrimaryButton compact onClick={onSubmit}>
            invia
          </CompanyWizardPrimaryButton>
          <CompanyWizardOutlineButton compact onClick={onPreview}>
            anteprima
          </CompanyWizardOutlineButton>
          <CompanyWizardOutlineButton compact onClick={onSaveDraft}>
            salva in bozza
          </CompanyWizardOutlineButton>
          <CompanyWizardOutlineButton compact onClick={onCancel}>
            cancella
          </CompanyWizardOutlineButton>
        </div>
      </CompanyWizardMobileShell>
    </main>
  );
}
