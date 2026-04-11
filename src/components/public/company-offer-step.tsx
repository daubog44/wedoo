import { useId } from "react";
import type { JobDraft, JobDraftStepOneInput } from "../../data/job-draft";
import {
  getJobDraftCapOptions,
  getJobDraftCityOptions,
} from "../../data/job-draft";
import {
  CompanyWizardCapField,
  CompanyWizardCheckbox,
  CompanyWizardDesktopShell,
  CompanyWizardEditor,
  CompanyWizardMobileShell,
  CompanyWizardPrimaryButton,
  CompanyWizardSectionHeading,
  CompanyWizardSelectField,
  CompanyWizardStepHint,
  CompanyWizardSummaryList,
} from "./company-wizard-primitives";
import { companyWizardDesktopPct } from "./company-wizard-utils";

const stepHints = {
  experienceSuggestions: [
    "Non è richiesta esperienza pregressa;",
    "Sono apprezzate esperienze universitarie (stage pregressi), progetti personali o attività extracurriculari;",
    "Esperienza superiore a 1 anno nel campo.",
  ],
  geography:
    "una volta scelta la provincia viene inserito in automatico un suggerimento di possibile città e CAP (si può comunque scegliere dal menu a tendina), una volta scelta la città corretta succederà la stessa cosa per il CAP, che verrà filtrato per le informazioni già inserite.",
  sectorExamples: "food, moda, marketing, economia, ecc.",
  skills:
    "hard+soft skills: nel menu a tendina si troveranno tutte le competenze, divise in due sezioni (hard e soft) con possibilità di filtraggio e ricerca.",
} as const;

function buildOfferValues(
  draft: JobDraft,
  overrides: Partial<JobDraftStepOneInput> = {},
): JobDraftStepOneInput {
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
    ...overrides,
  };
}

export function CompanyOfferStep({
  draft,
  onContinue,
  onUpdate,
}: {
  draft: JobDraft;
  onContinue: () => void;
  onUpdate: (values: JobDraftStepOneInput) => void;
}) {
  const capDatalistId = `company-offer-cap-${useId().replace(/:/g, "")}`;
  const cityOptions = getJobDraftCityOptions(draft.catalogs, draft.geography.provinceId);
  const capOptions = getJobDraftCapOptions(
    draft.catalogs,
    draft.geography.provinceId,
    draft.geography.cityId,
  );

  return (
    <main className="bg-brand-page pb-10">
      <CompanyWizardDesktopShell
        aside={(
          <div
            className="absolute space-y-8"
            style={{ left: companyWizardDesktopPct(644), top: 176, width: companyWizardDesktopPct(543) }}
          >
            <CompanyWizardStepHint className="max-w-[413px]">
              {stepHints.geography}
            </CompanyWizardStepHint>
            <CompanyWizardStepHint className="max-w-[335px]">
              {stepHints.sectorExamples}
            </CompanyWizardStepHint>
            <CompanyWizardStepHint>{stepHints.skills}</CompanyWizardStepHint>
            <CompanyWizardSummaryList items={stepHints.experienceSuggestions} />
          </div>
        )}
        backgroundAsset="formaziende4.png"
        formClassName="px-[22px] pb-[18px] pt-[20px]"
        formStyle={{ left: companyWizardDesktopPct(68), top: 138, width: companyWizardDesktopPct(571) }}
        step={4}
        testId="company-registration-step-4"
        title="Crea il tuo annuncio"
        titleClassName="text-left font-wedoo-heading text-[48px] leading-[1.04]"
        titleStyle={{ left: companyWizardDesktopPct(103), top: 51, width: companyWizardDesktopPct(432) }}
      >
        <div className="space-y-[14px]">
          <CompanyWizardSectionHeading>dettagli area geografica</CompanyWizardSectionHeading>

          <div className="flex gap-[43px]">
            <CompanyWizardCheckbox
              checked={draft.geography.remoteAllowed}
              id="desktop-company-offer-remote"
              label="smart working"
              onCheckedChange={(checked) => onUpdate(buildOfferValues(draft, { remoteAllowed: checked }))}
            />
            <CompanyWizardCheckbox
              checked={draft.geography.travelRequired}
              id="desktop-company-offer-travel"
              label="trasferte"
              onCheckedChange={(checked) => onUpdate(buildOfferValues(draft, { travelRequired: checked }))}
            />
          </div>

          <div className="grid grid-cols-[178px_178px_117px] gap-6">
            <CompanyWizardSelectField
              id="desktop-company-offer-province"
              label="provincia"
              onChange={(value) => onUpdate(buildOfferValues(draft, { provinceId: value }))}
              options={draft.catalogs.provinces}
              value={draft.geography.provinceId}
            />
            <CompanyWizardSelectField
              id="desktop-company-offer-city"
              label="città"
              onChange={(value) => onUpdate(buildOfferValues(draft, { cityId: value }))}
              options={cityOptions}
              value={draft.geography.cityId}
            />
            <CompanyWizardCapField
              datalistId={`desktop-${capDatalistId}`}
              id="desktop-company-offer-cap"
              onChange={(value) => onUpdate(buildOfferValues(draft, { capId: value }))}
              options={capOptions}
              value={draft.geography.capId}
            />
          </div>

          <div className="pt-[6px]">
            <CompanyWizardSectionHeading>descrizione offerta</CompanyWizardSectionHeading>
          </div>

          <CompanyWizardEditor
            id="desktop-company-offer-description"
            label="job description"
            onChange={(value) => onUpdate(buildOfferValues(draft, { description: value }))}
            value={draft.role.description}
          />

          <CompanyWizardSelectField
            id="desktop-company-offer-sector"
            label="settore operativo aziendale"
            onChange={(value) => onUpdate(buildOfferValues(draft, { sectorId: value }))}
            options={draft.catalogs.sectors}
            value={draft.role.sectorId}
          />

          <CompanyWizardSelectField
            id="desktop-company-offer-skills"
            label="competenze richieste"
            onChange={(value) => onUpdate(buildOfferValues(draft, { skillId: value }))}
            options={draft.catalogs.skillTags}
            value={draft.role.skillIds[0] ?? ""}
          />

          <CompanyWizardSelectField
            id="desktop-company-offer-experience"
            label="esperienza richiesta"
            onChange={(value) => onUpdate(buildOfferValues(draft, { experienceLevelId: value }))}
            options={draft.catalogs.experienceLevels}
            value={draft.role.experienceLevelId}
          />

          <CompanyWizardPrimaryButton onClick={onContinue}>avanti</CompanyWizardPrimaryButton>
        </div>
      </CompanyWizardDesktopShell>

      <CompanyWizardMobileShell
        step={4}
        testId="company-registration-step-4"
        title="Crea il tuo annuncio"
        titleClassName="text-[32px] leading-[0.95]"
      >
        <div className="space-y-4">
          <CompanyWizardSectionHeading compact>dettagli area geografica</CompanyWizardSectionHeading>
          <CompanyWizardCheckbox
            checked={draft.geography.remoteAllowed}
            compact
            id="mobile-company-offer-remote"
            label="smart working"
            onCheckedChange={(checked) => onUpdate(buildOfferValues(draft, { remoteAllowed: checked }))}
          />
          <CompanyWizardCheckbox
            checked={draft.geography.travelRequired}
            compact
            id="mobile-company-offer-travel"
            label="trasferte"
            onCheckedChange={(checked) => onUpdate(buildOfferValues(draft, { travelRequired: checked }))}
          />

          <CompanyWizardSelectField
            compact
            id="mobile-company-offer-province"
            label="provincia"
            onChange={(value) => onUpdate(buildOfferValues(draft, { provinceId: value }))}
            options={draft.catalogs.provinces}
            value={draft.geography.provinceId}
          />
          <CompanyWizardSelectField
            compact
            id="mobile-company-offer-city"
            label="città"
            onChange={(value) => onUpdate(buildOfferValues(draft, { cityId: value }))}
            options={cityOptions}
            value={draft.geography.cityId}
          />
          <CompanyWizardCapField
            compact
            datalistId={`mobile-${capDatalistId}`}
            id="mobile-company-offer-cap"
            onChange={(value) => onUpdate(buildOfferValues(draft, { capId: value }))}
            options={capOptions}
            value={draft.geography.capId}
          />

          <CompanyWizardSectionHeading compact>descrizione offerta</CompanyWizardSectionHeading>
          <CompanyWizardEditor
            compact
            id="mobile-company-offer-description"
            label="job description"
            onChange={(value) => onUpdate(buildOfferValues(draft, { description: value }))}
            value={draft.role.description}
          />

          <CompanyWizardSelectField
            compact
            id="mobile-company-offer-sector"
            label="settore operativo aziendale"
            onChange={(value) => onUpdate(buildOfferValues(draft, { sectorId: value }))}
            options={draft.catalogs.sectors}
            value={draft.role.sectorId}
          />
          <CompanyWizardSelectField
            compact
            id="mobile-company-offer-skills"
            label="competenze richieste"
            onChange={(value) => onUpdate(buildOfferValues(draft, { skillId: value }))}
            options={draft.catalogs.skillTags}
            value={draft.role.skillIds[0] ?? ""}
          />
          <CompanyWizardSelectField
            compact
            id="mobile-company-offer-experience"
            label="esperienza richiesta"
            onChange={(value) => onUpdate(buildOfferValues(draft, { experienceLevelId: value }))}
            options={draft.catalogs.experienceLevels}
            value={draft.role.experienceLevelId}
          />

          <CompanyWizardPrimaryButton compact onClick={onContinue}>
            avanti
          </CompanyWizardPrimaryButton>
        </div>
      </CompanyWizardMobileShell>
    </main>
  );
}
