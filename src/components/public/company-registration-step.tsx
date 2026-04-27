import { Link } from "react-router-dom";
import { companyRegistrationAuthViewModel } from "../../data/auth";
import type { CompanyRegistrationDraft } from "../../data/company-onboarding";
import {
  CompanyWizardCheckbox,
  CompanyWizardDesktopShell,
  CompanyWizardMobileShell,
  CompanyWizardOrDivider,
  CompanyWizardPrimaryButton,
  CompanyWizardSocialButton,
  CompanyWizardTextField,
} from "./company-wizard-primitives";
import {
  companyWizardDesktopPct,
  companyWizardPrivacyLink,
} from "./company-wizard-utils";

const companyRegistrationInputFields = companyRegistrationAuthViewModel.fields.filter(
  (field): field is Extract<
    (typeof companyRegistrationAuthViewModel.fields)[number],
    { kind: "input" }
  > => field.kind === "input",
);

const companyRegistrationPrivacyField = companyRegistrationAuthViewModel.fields.find(
  (field): field is Extract<
    (typeof companyRegistrationAuthViewModel.fields)[number],
    { kind: "checkbox" }
  > => field.kind === "checkbox",
);

export function CompanyRegistrationStep({
  onContinue,
  onFieldChange,
  onTogglePrivacy,
  values,
}: {
  onContinue: () => void;
  onFieldChange: (field: Exclude<keyof CompanyRegistrationDraft, "privacyAccepted">, value: string) => void;
  onTogglePrivacy: (checked: boolean) => void;
  values: CompanyRegistrationDraft;
}) {
  const providerOptions = companyRegistrationAuthViewModel.providerOptions ?? [];

  return (
    <main className="wedoo-workspace min-h-screen bg-[var(--wedoo-workspace-bg)] pb-10">
      <CompanyWizardDesktopShell
        backgroundAsset="formaziende1.png"
        formClassName="px-6 pb-5 pt-6"
        formStyle={{ left: companyWizardDesktopPct(152), top: 288, width: companyWizardDesktopPct(359) }}
        showLogo
        step={1}
        subtitle="Compila il tuo primo annuncio per registrarti"
        subtitleClassName="text-[22px] leading-[1.08]"
        subtitleStyle={{ left: companyWizardDesktopPct(152), top: 224, width: companyWizardDesktopPct(359) }}
        testId="company-registration-step-1"
        title={companyRegistrationAuthViewModel.title}
        titleClassName="text-[34px] leading-[0.95]"
        titleStyle={{ left: companyWizardDesktopPct(152), top: 144, width: companyWizardDesktopPct(359) }}
      >
        <div className="space-y-3">
          <CompanyWizardTextField
            id="desktop-company-register-vat"
            label={companyRegistrationInputFields[0]?.label ?? "partita IVA"}
            onChange={(value) => onFieldChange("vat", value)}
            placeholder={companyRegistrationInputFields[0]?.placeholder ?? "inserisci p. IVA"}
            value={values.vat}
          />
          <CompanyWizardTextField
            id="desktop-company-register-company"
            label={companyRegistrationInputFields[1]?.label ?? "ragione sociale*"}
            onChange={(value) => onFieldChange("company", value)}
            placeholder={companyRegistrationInputFields[1]?.placeholder ?? "inserisci ragione sociale"}
            value={values.company}
          />
          <CompanyWizardTextField
            id="desktop-company-register-email"
            label={companyRegistrationInputFields[2]?.label ?? "e-mail*"}
            onChange={(value) => onFieldChange("email", value)}
            placeholder={companyRegistrationInputFields[2]?.placeholder ?? "inserisci la mail"}
            type="email"
            value={values.email}
          />
          <CompanyWizardTextField
            id="desktop-company-register-phone"
            label={companyRegistrationInputFields[3]?.label ?? "numero di telefono*"}
            onChange={(value) => onFieldChange("phone", value)}
            placeholder={companyRegistrationInputFields[3]?.placeholder ?? "inserisci il numero di telefono"}
            type="tel"
            value={values.phone}
          />

          {companyRegistrationPrivacyField ? (
            <div className="pt-1">
              <CompanyWizardCheckbox
                checked={values.privacyAccepted}
                id="desktop-company-register-privacy"
                label={companyRegistrationPrivacyField.label}
                linkHref={companyWizardPrivacyLink()}
                linkLabel={companyRegistrationPrivacyField.linkLabel}
                onCheckedChange={onTogglePrivacy}
              />
            </div>
          ) : null}

          <div className="pt-1">
            <CompanyWizardPrimaryButton onClick={onContinue}>registrati</CompanyWizardPrimaryButton>
          </div>
        </div>

        <div className="mt-5">
          <CompanyWizardOrDivider />
          <div className="mt-4 flex gap-3">
            {providerOptions.map((provider) => (
              <CompanyWizardSocialButton compact key={provider.id}>
                {provider.label}
              </CompanyWizardSocialButton>
            ))}
          </div>
          {companyRegistrationAuthViewModel.footerPrompt ? (
            <p className="font-wedoo-body mt-5 text-center text-[18px] leading-[1.25] text-[var(--wedoo-ink-muted)]">
              {companyRegistrationAuthViewModel.footerPrompt.label}{" "}
              <Link className="text-[var(--wedoo-ink)] underline" to={companyRegistrationAuthViewModel.footerPrompt.linkTo}>
                {companyRegistrationAuthViewModel.footerPrompt.linkLabel}
              </Link>
            </p>
          ) : null}
        </div>
      </CompanyWizardDesktopShell>

      <CompanyWizardMobileShell
        step={1}
        subtitle="Compila il tuo primo annuncio per registrarti"
        testId="company-registration-step-1"
        title={companyRegistrationAuthViewModel.title}
      >
        <div className="space-y-3">
          <CompanyWizardTextField
            compact
            id="mobile-company-register-vat"
            label={companyRegistrationInputFields[0]?.label ?? "partita IVA"}
            onChange={(value) => onFieldChange("vat", value)}
            placeholder={companyRegistrationInputFields[0]?.placeholder ?? "inserisci p. IVA"}
            value={values.vat}
          />
          <CompanyWizardTextField
            compact
            id="mobile-company-register-company"
            label={companyRegistrationInputFields[1]?.label ?? "ragione sociale*"}
            onChange={(value) => onFieldChange("company", value)}
            placeholder={companyRegistrationInputFields[1]?.placeholder ?? "inserisci ragione sociale"}
            value={values.company}
          />
          <CompanyWizardTextField
            compact
            id="mobile-company-register-email"
            label={companyRegistrationInputFields[2]?.label ?? "e-mail*"}
            onChange={(value) => onFieldChange("email", value)}
            placeholder={companyRegistrationInputFields[2]?.placeholder ?? "inserisci la mail"}
            type="email"
            value={values.email}
          />
          <CompanyWizardTextField
            compact
            id="mobile-company-register-phone"
            label={companyRegistrationInputFields[3]?.label ?? "numero di telefono*"}
            onChange={(value) => onFieldChange("phone", value)}
            placeholder={companyRegistrationInputFields[3]?.placeholder ?? "inserisci il numero di telefono"}
            type="tel"
            value={values.phone}
          />

          {companyRegistrationPrivacyField ? (
            <CompanyWizardCheckbox
              checked={values.privacyAccepted}
              compact
              id="mobile-company-register-privacy"
              label={companyRegistrationPrivacyField.label}
              linkHref={companyWizardPrivacyLink()}
              linkLabel={companyRegistrationPrivacyField.linkLabel}
              onCheckedChange={onTogglePrivacy}
            />
          ) : null}

          <CompanyWizardPrimaryButton compact onClick={onContinue}>
            registrati
          </CompanyWizardPrimaryButton>

          <div className="pt-3">
            <CompanyWizardOrDivider compact />
            <div className="mt-4 flex gap-3">
              {providerOptions.map((provider) => (
                <CompanyWizardSocialButton compact key={provider.id}>
                  {provider.label}
                </CompanyWizardSocialButton>
              ))}
            </div>
            {companyRegistrationAuthViewModel.footerPrompt ? (
              <p className="font-wedoo-body mt-4 text-center text-[18px] leading-[1.25] text-[var(--wedoo-ink-muted)]">
                {companyRegistrationAuthViewModel.footerPrompt.label}{" "}
                <Link className="text-[var(--wedoo-ink)] underline" to={companyRegistrationAuthViewModel.footerPrompt.linkTo}>
                  {companyRegistrationAuthViewModel.footerPrompt.linkLabel}
                </Link>
              </p>
            ) : null}
          </div>
        </div>
      </CompanyWizardMobileShell>
    </main>
  );
}
