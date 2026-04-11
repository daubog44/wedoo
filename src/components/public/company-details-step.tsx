import { useId } from "react";
import type { CompanyDetailsStepInput } from "../../data/company-onboarding";
import type { JobDraft } from "../../data/job-draft";
import {
  CompanyWizardCheckbox,
  CompanyWizardDesktopShell,
  CompanyWizardEditor,
  CompanyWizardMobileShell,
  CompanyWizardPrimaryButton,
  CompanyWizardSectionHeading,
  CompanyWizardSelectField,
  CompanyWizardTextField,
  CompanyWizardUploadField,
} from "./company-wizard-primitives";
import { companyWizardDesktopPct } from "./company-wizard-utils";

function buildCompanyDetailsValues(
  draft: JobDraft,
  overrides: Partial<CompanyDetailsStepInput> = {},
): CompanyDetailsStepInput {
  return {
    logoFileName: draft.company.logoAsset,
    maximum: draft.compensation.maximum,
    minimum: draft.compensation.minimum,
    overview: draft.company.overview,
    publicSalary: draft.compensation.publicSalary,
    salaryUnitId: draft.compensation.unitId,
    ...overrides,
  };
}

export function CompanyDetailsStep({
  draft,
  onContinue,
  onUpdate,
}: {
  draft: JobDraft;
  onContinue: () => void;
  onUpdate: (values: CompanyDetailsStepInput) => void;
}) {
  const uploadId = `company-details-${useId().replace(/:/g, "")}`;

  return (
    <main className="bg-brand-page pb-10">
      <CompanyWizardDesktopShell
        backgroundAsset="formaziende3.png"
        formClassName="px-[15px] pb-4 pt-4"
        formStyle={{ left: companyWizardDesktopPct(68), top: 110, width: companyWizardDesktopPct(571) }}
        step={3}
        testId="company-registration-step-3"
        title="Crea il tuo annuncio"
        titleClassName="text-left font-wedoo-heading text-[58px] leading-[0.95]"
        titleStyle={{ left: companyWizardDesktopPct(117), top: 49, width: companyWizardDesktopPct(402) }}
      >
        <div className="space-y-4">
          <CompanyWizardSectionHeading>dettagli azienda</CompanyWizardSectionHeading>
          <CompanyWizardEditor
            id={`desktop-${uploadId}-overview`}
            label="descrizione azienda"
            onChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { overview: value }))}
            value={draft.company.overview}
          />

          <CompanyWizardUploadField
            id={`desktop-${uploadId}-upload`}
            label="carica il tuo logo"
            onFileChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { logoFileName: value }))}
            selectedFileName={draft.company.logoAsset}
          />

          <CompanyWizardSectionHeading>dettagli retribuzione</CompanyWizardSectionHeading>
          <CompanyWizardCheckbox
            checked={draft.compensation.publicSalary}
            id={`desktop-${uploadId}-public-salary`}
            label="pubblica informazioni di retribuzione"
            onCheckedChange={(checked) =>
              onUpdate(buildCompanyDetailsValues(draft, { publicSalary: checked }))
            }
          />

          <div className="grid grid-cols-2 gap-[14px]">
            <CompanyWizardTextField
              id={`desktop-${uploadId}-minimum`}
              label="importo minimo"
              onChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { minimum: value }))}
              placeholder="inserisci"
              value={draft.compensation.minimum}
            />
            <CompanyWizardTextField
              id={`desktop-${uploadId}-maximum`}
              label="importo massimo"
              onChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { maximum: value }))}
              placeholder="inserisci"
              value={draft.compensation.maximum}
            />
          </div>

          <CompanyWizardSelectField
            id={`desktop-${uploadId}-salary-unit`}
            label="unità di retribuzione"
            onChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { salaryUnitId: value }))}
            options={draft.catalogs.salaryUnits}
            value={draft.compensation.unitId}
          />

          <CompanyWizardPrimaryButton onClick={onContinue}>avanti</CompanyWizardPrimaryButton>
        </div>
      </CompanyWizardDesktopShell>

      <CompanyWizardMobileShell
        step={3}
        testId="company-registration-step-3"
        title="Crea il tuo annuncio"
        titleClassName="text-[32px] leading-[0.95]"
      >
        <div className="space-y-4">
          <CompanyWizardSectionHeading compact>dettagli azienda</CompanyWizardSectionHeading>
          <CompanyWizardEditor
            compact
            id={`mobile-${uploadId}-overview`}
            label="descrizione azienda"
            onChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { overview: value }))}
            value={draft.company.overview}
          />

          <CompanyWizardUploadField
            compact
            id={`mobile-${uploadId}-upload`}
            label="carica il tuo logo"
            onFileChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { logoFileName: value }))}
            selectedFileName={draft.company.logoAsset}
          />

          <CompanyWizardSectionHeading compact>dettagli retribuzione</CompanyWizardSectionHeading>
          <CompanyWizardCheckbox
            checked={draft.compensation.publicSalary}
            compact
            id={`mobile-${uploadId}-public-salary`}
            label="pubblica informazioni di retribuzione"
            onCheckedChange={(checked) =>
              onUpdate(buildCompanyDetailsValues(draft, { publicSalary: checked }))
            }
          />

          <CompanyWizardTextField
            compact
            id={`mobile-${uploadId}-minimum`}
            label="importo minimo"
            onChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { minimum: value }))}
            placeholder="inserisci"
            value={draft.compensation.minimum}
          />
          <CompanyWizardTextField
            compact
            id={`mobile-${uploadId}-maximum`}
            label="importo massimo"
            onChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { maximum: value }))}
            placeholder="inserisci"
            value={draft.compensation.maximum}
          />
          <CompanyWizardSelectField
            compact
            id={`mobile-${uploadId}-salary-unit`}
            label="unità di retribuzione"
            onChange={(value) => onUpdate(buildCompanyDetailsValues(draft, { salaryUnitId: value }))}
            options={draft.catalogs.salaryUnits}
            value={draft.compensation.unitId}
          />

          <CompanyWizardPrimaryButton compact onClick={onContinue}>
            avanti
          </CompanyWizardPrimaryButton>
        </div>
      </CompanyWizardMobileShell>
    </main>
  );
}
