import type { CompanyRecruiterStepInput } from "../../data/company-onboarding";
import type { JobDraft } from "../../data/job-draft";
import { getJobDraftCityOptions } from "../../data/job-draft";
import {
  CompanyWizardCheckbox,
  CompanyWizardDesktopShell,
  CompanyWizardEditor,
  CompanyWizardMobileShell,
  CompanyWizardPrimaryButton,
  CompanyWizardSectionHeading,
  CompanyWizardSelectField,
  CompanyWizardStepHint,
  CompanyWizardTextField,
} from "./company-wizard-primitives";
import { companyWizardDesktopPct } from "./company-wizard-utils";

function buildRecruiterValues(
  draft: JobDraft,
  overrides: Partial<CompanyRecruiterStepInput> = {},
): CompanyRecruiterStepInput {
  return {
    cityId: draft.geography.cityId,
    email: draft.recruiter.email,
    firstName: draft.recruiter.firstName,
    lastName: draft.recruiter.lastName,
    message: draft.recruiter.message,
    phone: draft.recruiter.phone,
    provinceId: draft.geography.provinceId,
    publicContact: draft.recruiter.publicContact,
    titleId: draft.role.titleId,
    ...overrides,
  };
}

export function CompanyRecruiterStep({
  draft,
  onContinue,
  onUpdate,
}: {
  draft: JobDraft;
  onContinue: () => void;
  onUpdate: (values: CompanyRecruiterStepInput) => void;
}) {
  const cityOptions = getJobDraftCityOptions(draft.catalogs, draft.geography.provinceId);

  return (
    <main className="bg-brand-page pb-10">
      <CompanyWizardDesktopShell
        aside={(
          <div
            className="absolute"
            style={{ left: companyWizardDesktopPct(763), top: 186, width: companyWizardDesktopPct(354) }}
          >
            <CompanyWizardStepHint>data di pubblicazione e scadenza automatica?</CompanyWizardStepHint>
          </div>
        )}
        backgroundAsset="formaziende2.png"
        formClassName="px-[15px] pb-4 pt-4"
        formStyle={{ left: companyWizardDesktopPct(68), top: 110, width: companyWizardDesktopPct(571) }}
        step={2}
        testId="company-registration-step-2"
        title="Crea il tuo annuncio"
        titleClassName="text-left font-wedoo-heading text-[58px] leading-[0.95]"
        titleStyle={{ left: companyWizardDesktopPct(97), top: 53, width: companyWizardDesktopPct(441) }}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-[28px]">
            <CompanyWizardSelectField
              id="desktop-company-recruiter-province"
              label="provincia"
              onChange={(value) => onUpdate(buildRecruiterValues(draft, { provinceId: value }))}
              options={draft.catalogs.provinces}
              value={draft.geography.provinceId}
            />
            <CompanyWizardSelectField
              id="desktop-company-recruiter-city"
              label="città"
              onChange={(value) => onUpdate(buildRecruiterValues(draft, { cityId: value }))}
              options={cityOptions}
              value={draft.geography.cityId}
            />
          </div>

          <CompanyWizardSelectField
            id="desktop-company-recruiter-title"
            label="job title"
            onChange={(value) => onUpdate(buildRecruiterValues(draft, { titleId: value }))}
            options={draft.catalogs.jobTitles}
            value={draft.role.titleId}
          />

          <CompanyWizardSectionHeading>dettagli recruiter</CompanyWizardSectionHeading>
          <CompanyWizardCheckbox
            checked={draft.recruiter.publicContact}
            id="desktop-company-recruiter-public-contact"
            label="pubblica informazioni di contatto"
            onCheckedChange={(checked) => onUpdate(buildRecruiterValues(draft, { publicContact: checked }))}
          />

          <div className="grid grid-cols-2 gap-[28px]">
            <CompanyWizardTextField
              id="desktop-company-recruiter-first-name"
              label="nome"
              onChange={(value) => onUpdate(buildRecruiterValues(draft, { firstName: value }))}
              placeholder="inserisci nome"
              value={draft.recruiter.firstName}
            />
            <CompanyWizardTextField
              id="desktop-company-recruiter-last-name"
              label="cognome"
              onChange={(value) => onUpdate(buildRecruiterValues(draft, { lastName: value }))}
              placeholder="inserisci cognome"
              value={draft.recruiter.lastName}
            />
          </div>

          <div className="grid grid-cols-2 gap-[28px]">
            <CompanyWizardTextField
              id="desktop-company-recruiter-email"
              label="e-mail"
              onChange={(value) => onUpdate(buildRecruiterValues(draft, { email: value }))}
              placeholder="inserisci e-mail"
              type="email"
              value={draft.recruiter.email}
            />
            <CompanyWizardTextField
              id="desktop-company-recruiter-phone"
              label="numero di telefono"
              onChange={(value) => onUpdate(buildRecruiterValues(draft, { phone: value }))}
              placeholder="inserisci numero"
              type="tel"
              value={draft.recruiter.phone}
            />
          </div>

          <CompanyWizardEditor
            id="desktop-company-recruiter-message"
            label="lascia un messaggio"
            onChange={(value) => onUpdate(buildRecruiterValues(draft, { message: value }))}
            value={draft.recruiter.message}
          />

          <CompanyWizardPrimaryButton onClick={onContinue}>avanti</CompanyWizardPrimaryButton>
        </div>
      </CompanyWizardDesktopShell>

      <CompanyWizardMobileShell
        step={2}
        testId="company-registration-step-2"
        title="Crea il tuo annuncio"
        titleClassName="text-[32px] leading-[0.95]"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <CompanyWizardSelectField
              compact
              id="mobile-company-recruiter-province"
              label="provincia"
              onChange={(value) => onUpdate(buildRecruiterValues(draft, { provinceId: value }))}
              options={draft.catalogs.provinces}
              value={draft.geography.provinceId}
            />
            <CompanyWizardSelectField
              compact
              id="mobile-company-recruiter-city"
              label="città"
              onChange={(value) => onUpdate(buildRecruiterValues(draft, { cityId: value }))}
              options={cityOptions}
              value={draft.geography.cityId}
            />
          </div>

          <CompanyWizardSelectField
            compact
            id="mobile-company-recruiter-title"
            label="job title"
            onChange={(value) => onUpdate(buildRecruiterValues(draft, { titleId: value }))}
            options={draft.catalogs.jobTitles}
            value={draft.role.titleId}
          />

          <CompanyWizardSectionHeading compact>dettagli recruiter</CompanyWizardSectionHeading>
          <CompanyWizardCheckbox
            checked={draft.recruiter.publicContact}
            compact
            id="mobile-company-recruiter-public-contact"
            label="pubblica informazioni di contatto"
            onCheckedChange={(checked) => onUpdate(buildRecruiterValues(draft, { publicContact: checked }))}
          />

          <CompanyWizardTextField
            compact
            id="mobile-company-recruiter-first-name"
            label="nome"
            onChange={(value) => onUpdate(buildRecruiterValues(draft, { firstName: value }))}
            placeholder="inserisci nome"
            value={draft.recruiter.firstName}
          />
          <CompanyWizardTextField
            compact
            id="mobile-company-recruiter-last-name"
            label="cognome"
            onChange={(value) => onUpdate(buildRecruiterValues(draft, { lastName: value }))}
            placeholder="inserisci cognome"
            value={draft.recruiter.lastName}
          />
          <CompanyWizardTextField
            compact
            id="mobile-company-recruiter-email"
            label="e-mail"
            onChange={(value) => onUpdate(buildRecruiterValues(draft, { email: value }))}
            placeholder="inserisci e-mail"
            type="email"
            value={draft.recruiter.email}
          />
          <CompanyWizardTextField
            compact
            id="mobile-company-recruiter-phone"
            label="numero di telefono"
            onChange={(value) => onUpdate(buildRecruiterValues(draft, { phone: value }))}
            placeholder="inserisci numero"
            type="tel"
            value={draft.recruiter.phone}
          />
          <CompanyWizardEditor
            compact
            id="mobile-company-recruiter-message"
            label="lascia un messaggio"
            onChange={(value) => onUpdate(buildRecruiterValues(draft, { message: value }))}
            value={draft.recruiter.message}
          />

          <CompanyWizardPrimaryButton compact onClick={onContinue}>
            avanti
          </CompanyWizardPrimaryButton>
        </div>
      </CompanyWizardMobileShell>
    </main>
  );
}
