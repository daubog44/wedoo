import { Link } from "react-router-dom";
import { candidateRegistrationAuthViewModel } from "../../data/auth";
import type { CandidateOnboardingAccountDraft } from "../../data/candidate-onboarding";
import {
  CandidateOnboardingCheckbox,
  CandidateOnboardingDesktopShell,
  CandidateOnboardingFormCard,
  CandidateOnboardingLogo,
  CandidateOnboardingMobileShell,
  CandidateOnboardingOrDivider,
  CandidateOnboardingPrimaryButton,
  CandidateOnboardingSocialButton,
  CandidateOnboardingTextField,
} from "./candidate-onboarding-primitives";
import {
  candidateOnboardingDesktopPct,
  candidateOnboardingPrivacyLink,
} from "./candidate-onboarding-utils";

const candidateRegistrationInputFields =
  candidateRegistrationAuthViewModel.fields.filter(
    (field): field is Extract<
      (typeof candidateRegistrationAuthViewModel.fields)[number],
      { kind: "input" }
    > => field.kind === "input",
  );

const candidateRegistrationPrivacyField =
  candidateRegistrationAuthViewModel.fields.find(
    (field): field is Extract<
      (typeof candidateRegistrationAuthViewModel.fields)[number],
      { kind: "checkbox" }
    > => field.kind === "checkbox",
  );

export function CandidateRegistrationStep({
  onContinue,
  onFieldChange,
  onTogglePrivacy,
  values,
}: {
  onContinue: () => void;
  onFieldChange: (
    field: Exclude<keyof CandidateOnboardingAccountDraft, "privacyAccepted">,
    value: string,
  ) => void;
  onTogglePrivacy: (checked: boolean) => void;
  values: CandidateOnboardingAccountDraft;
}) {
  const providerOptions = candidateRegistrationAuthViewModel.providerOptions ?? [];
  const loginPrompt = candidateRegistrationAuthViewModel.footerPrompt;

  return (
    <main className="bg-brand-page pb-10">
      <CandidateOnboardingDesktopShell
        backgroundAsset="formcandidati1.png"
        step={1}
        testId="candidate-registration-step"
      >
        <div
          className="absolute top-[50px]"
          style={{ left: candidateOnboardingDesktopPct(155) }}
        >
          <CandidateOnboardingLogo />
        </div>

        <h1
          className="font-wedoo-accent absolute text-center text-[36px] leading-none text-brand-ink"
          style={{
            left: candidateOnboardingDesktopPct(185),
            top: 141,
            width: candidateOnboardingDesktopPct(259),
          }}
        >
          Benvenut*!
        </h1>

        <p
          className="font-wedoo-accent absolute text-center text-[24px] leading-none text-brand-ink"
          style={{
            left: candidateOnboardingDesktopPct(255),
            top: 201,
            width: candidateOnboardingDesktopPct(119),
          }}
        >
          {candidateRegistrationAuthViewModel.subtitle}
        </p>

        <CandidateOnboardingFormCard
          className="absolute px-4 pb-[13px] pt-[23px]"
          style={{
            left: candidateOnboardingDesktopPct(152),
            top: 240,
            width: candidateOnboardingDesktopPct(359),
          }}
        >
          <div className="space-y-2.5" data-node-id="273:1318">
            <CandidateOnboardingTextField
              id="desktop-candidate-register-full-name"
              label={candidateRegistrationInputFields[0]?.label ?? "nome e cognome*"}
              onChange={(value) => onFieldChange("fullName", value)}
              placeholder={
                candidateRegistrationInputFields[0]?.placeholder ??
                "inserisci nome e cognome"
              }
              value={values.fullName}
            />
            <CandidateOnboardingTextField
              id="desktop-candidate-register-email"
              label={candidateRegistrationInputFields[1]?.label ?? "e-mail*"}
              onChange={(value) => onFieldChange("email", value)}
              placeholder={
                candidateRegistrationInputFields[1]?.placeholder ??
                "inserisci la mail"
              }
              type="email"
              value={values.email}
            />
            <CandidateOnboardingTextField
              id="desktop-candidate-register-phone"
              label={
                candidateRegistrationInputFields[2]?.label ??
                "numero di telefono*"
              }
              onChange={(value) => onFieldChange("phone", value)}
              placeholder={
                candidateRegistrationInputFields[2]?.placeholder ??
                "inserisci il numero di telefono"
              }
              type="tel"
              value={values.phone}
            />
            <CandidateOnboardingTextField
              id="desktop-candidate-register-password"
              label={candidateRegistrationInputFields[3]?.label ?? "password*"}
              onChange={(value) => onFieldChange("password", value)}
              placeholder={
                candidateRegistrationInputFields[3]?.placeholder ??
                "inserisci una password"
              }
              type="password"
              value={values.password}
            />
            <CandidateOnboardingTextField
              id="desktop-candidate-register-confirm-password"
              label={
                candidateRegistrationInputFields[4]?.label ??
                "conferma password*"
              }
              onChange={(value) => onFieldChange("confirmPassword", value)}
              placeholder={
                candidateRegistrationInputFields[4]?.placeholder ??
                "re-inserisci la password"
              }
              type="password"
              value={values.confirmPassword}
            />
            {candidateRegistrationPrivacyField ? (
              <CandidateOnboardingCheckbox
                checked={values.privacyAccepted}
                id="desktop-candidate-register-privacy"
                label={
                  <>
                    {candidateRegistrationPrivacyField.label}{" "}
                    <a
                      className="underline"
                      href={candidateOnboardingPrivacyLink()}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {candidateRegistrationPrivacyField.linkLabel}
                    </a>
                  </>
                }
                onCheckedChange={onTogglePrivacy}
              />
            ) : null}
            <CandidateOnboardingPrimaryButton onClick={onContinue}>
              {candidateRegistrationAuthViewModel.ctaLabel}
            </CandidateOnboardingPrimaryButton>
          </div>
        </CandidateOnboardingFormCard>

        <div
          className="absolute w-[440px]"
          style={{ left: candidateOnboardingDesktopPct(111), top: 799 }}
        >
          <CandidateOnboardingOrDivider />
        </div>

        <div
          className="absolute flex gap-8"
          style={{ left: candidateOnboardingDesktopPct(111), top: 842 }}
        >
          {providerOptions.map((provider) => (
            <CandidateOnboardingSocialButton key={provider.id}>
              {provider.label}
            </CandidateOnboardingSocialButton>
          ))}
        </div>
      </CandidateOnboardingDesktopShell>

      <CandidateOnboardingMobileShell
        step={1}
        subtitle={candidateRegistrationAuthViewModel.subtitle}
        testId="candidate-registration-step"
        title="Piacere di conoscerti!"
      >
        <CandidateOnboardingFormCard className="mt-4 px-[7px] pb-[17px] pt-[23px]">
          <div className="space-y-[14px]" data-node-id="234:593">
            <CandidateOnboardingTextField
              compact
              id="mobile-candidate-register-full-name"
              label={candidateRegistrationInputFields[0]?.label ?? "nome e cognome*"}
              onChange={(value) => onFieldChange("fullName", value)}
              placeholder={
                candidateRegistrationInputFields[0]?.placeholder ??
                "inserisci nome e cognome"
              }
              value={values.fullName}
            />
            <CandidateOnboardingTextField
              compact
              id="mobile-candidate-register-email"
              label={candidateRegistrationInputFields[1]?.label ?? "e-mail*"}
              onChange={(value) => onFieldChange("email", value)}
              placeholder={
                candidateRegistrationInputFields[1]?.placeholder ??
                "inserisci la mail"
              }
              type="email"
              value={values.email}
            />
            <CandidateOnboardingTextField
              compact
              id="mobile-candidate-register-phone"
              label={
                candidateRegistrationInputFields[2]?.label ??
                "numero di telefono*"
              }
              onChange={(value) => onFieldChange("phone", value)}
              placeholder={
                candidateRegistrationInputFields[2]?.placeholder ??
                "inserisci il numero di telefono"
              }
              type="tel"
              value={values.phone}
            />
            <CandidateOnboardingTextField
              compact
              id="mobile-candidate-register-password"
              label={candidateRegistrationInputFields[3]?.label ?? "password*"}
              onChange={(value) => onFieldChange("password", value)}
              placeholder={
                candidateRegistrationInputFields[3]?.placeholder ??
                "inserisci una password"
              }
              type="password"
              value={values.password}
            />
            <CandidateOnboardingTextField
              compact
              id="mobile-candidate-register-confirm-password"
              label={
                candidateRegistrationInputFields[4]?.label ??
                "conferma password*"
              }
              onChange={(value) => onFieldChange("confirmPassword", value)}
              placeholder={
                candidateRegistrationInputFields[4]?.placeholder ??
                "re-inserisci la password"
              }
              type="password"
              value={values.confirmPassword}
            />
            {candidateRegistrationPrivacyField ? (
              <CandidateOnboardingCheckbox
                checked={values.privacyAccepted}
                compact
                id="mobile-candidate-register-privacy"
                label={
                  <>
                    {candidateRegistrationPrivacyField.label}{" "}
                    <a
                      className="underline"
                      href={candidateOnboardingPrivacyLink()}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {candidateRegistrationPrivacyField.linkLabel}
                    </a>
                  </>
                }
                onCheckedChange={onTogglePrivacy}
              />
            ) : null}
            <CandidateOnboardingPrimaryButton compact onClick={onContinue}>
              {candidateRegistrationAuthViewModel.ctaLabel}
            </CandidateOnboardingPrimaryButton>
          </div>
        </CandidateOnboardingFormCard>

        <div className="mt-[15px] px-[11px]">
          <CandidateOnboardingOrDivider compact />
        </div>

        <div className="mt-5 flex flex-col items-center gap-[10px]">
          {providerOptions.map((provider) => (
            <CandidateOnboardingSocialButton compact key={provider.id}>
              {provider.label}
            </CandidateOnboardingSocialButton>
          ))}
        </div>

        {loginPrompt ? (
          <p className="font-wedoo-body mx-auto mt-[30px] max-w-[260px] text-center text-[22px] leading-none text-brand-ink whitespace-nowrap">
            {loginPrompt.label}{" "}
            <Link className="underline" to={loginPrompt.linkTo}>
              {loginPrompt.linkLabel}
            </Link>
          </p>
        ) : null}
      </CandidateOnboardingMobileShell>
    </main>
  );
}
