import { Link } from "react-router-dom";
import { candidateRegistrationAuthViewModel } from "../../data/auth";
import {
  candidateOnboardingProvinceOptions,
  candidateOnboardingSdgOptions,
  getCandidateOnboardingCityOptions,
  type CandidateOnboardingDraft,
} from "../../data/candidate-onboarding";
import {
  CandidateOnboardingDesktopShell,
  CandidateOnboardingFormCard,
  CandidateOnboardingLogo,
  CandidateOnboardingMobileShell,
  CandidateOnboardingOrDivider,
  CandidateOnboardingPrimaryButton,
  CandidateOnboardingSelectField,
  CandidateOnboardingSocialButton,
  CandidateOnboardingTextField,
} from "./candidate-onboarding-primitives";
import { candidateOnboardingDesktopPct } from "./candidate-onboarding-utils";

export function CandidatePreferencesStep({
  draft,
  onContinue,
  onFieldChange,
}: {
  draft: CandidateOnboardingDraft;
  onContinue: () => void;
  onFieldChange: (
    field: "city" | "postalCode" | "province" | "roleInterest" | "sdgFocus",
    value: string,
  ) => void;
}) {
  const providerOptions = candidateRegistrationAuthViewModel.providerOptions ?? [];
  const loginPrompt = candidateRegistrationAuthViewModel.footerPrompt;
  const cityOptions = getCandidateOnboardingCityOptions(draft.preferences.province);
  const selectedSdg = draft.preferences.sdgFocus[0] ?? "";
  const selectedRoleInterest = draft.preferences.roleInterests[0] ?? "";

  return (
    <main className="wedoo-workspace min-h-screen bg-[var(--wedoo-workspace-bg)] pb-10">
      <CandidateOnboardingDesktopShell
        backgroundAsset="formcandidati2.png"
        step={2}
        testId="candidate-preferences-step"
      >
        <div
          className="absolute top-[72px]"
          style={{ left: candidateOnboardingDesktopPct(186) }}
        >
          <CandidateOnboardingLogo />
        </div>

        <h1
          className="font-wedoo-accent absolute text-center text-[36px] leading-none text-[var(--wedoo-workspace-text)] whitespace-nowrap"
          style={{
            left: candidateOnboardingDesktopPct(165),
            top: 198,
            width: candidateOnboardingDesktopPct(400),
          }}
        >
          Dicci qualcosa in più
        </h1>

        <div
          className="absolute"
          style={{
            left: candidateOnboardingDesktopPct(106),
            top: 290,
            width: candidateOnboardingDesktopPct(500),
          }}
        >
          <CandidateOnboardingFormCard className="px-[23px] pb-[28px] pt-6">
            <div className="space-y-[21px]" data-node-id="234:740">
              <div className="grid grid-cols-3 gap-4">
                <CandidateOnboardingSelectField
                  id="desktop-candidate-preferences-province"
                  label="provincia"
                  onChange={(value) => onFieldChange("province", value)}
                  options={candidateOnboardingProvinceOptions}
                  value={draft.preferences.province}
                />
                <CandidateOnboardingSelectField
                  id="desktop-candidate-preferences-city"
                  label="città"
                  onChange={(value) => onFieldChange("city", value)}
                  options={cityOptions}
                  value={draft.preferences.city}
                />
                <CandidateOnboardingTextField
                  id="desktop-candidate-preferences-postal-code"
                  label="CAP"
                  onChange={(value) => onFieldChange("postalCode", value)}
                  placeholder="scrivi"
                  value={draft.preferences.postalCode}
                />
              </div>

              <CandidateOnboardingSelectField
                id="desktop-candidate-preferences-sdg"
                label="in quale/i SDGs rispecchi il tuo impegno?"
                onChange={(value) => onFieldChange("sdgFocus", value)}
                options={candidateOnboardingSdgOptions}
                value={selectedSdg}
              />

              <CandidateOnboardingTextField
                id="desktop-candidate-preferences-role-interest"
                label="quali mansioni ti interessano?"
                onChange={(value) => onFieldChange("roleInterest", value)}
                placeholder="scrivi"
                value={selectedRoleInterest}
              />

              <CandidateOnboardingPrimaryButton onClick={onContinue}>
                registrati
              </CandidateOnboardingPrimaryButton>
            </div>
          </CandidateOnboardingFormCard>
        </div>

        <div
          className="absolute w-[440px]"
          style={{ left: candidateOnboardingDesktopPct(136), top: 744 }}
        >
          <CandidateOnboardingOrDivider />
        </div>

        <div
          className="absolute flex gap-8"
          style={{ left: candidateOnboardingDesktopPct(136), top: 787 }}
        >
          {providerOptions.map((provider) => (
            <CandidateOnboardingSocialButton key={provider.id}>
              {provider.label}
            </CandidateOnboardingSocialButton>
          ))}
        </div>

        {loginPrompt ? (
          <p
            className="font-wedoo-body absolute text-center text-[20px] leading-none text-[var(--wedoo-ink-muted)] whitespace-nowrap"
            style={{
              left: candidateOnboardingDesktopPct(190),
              top: 857,
              width: candidateOnboardingDesktopPct(320),
            }}
          >
            {loginPrompt.label}{" "}
            <Link className="text-[var(--wedoo-ink)] underline" to={loginPrompt.linkTo}>
              {loginPrompt.linkLabel}
            </Link>
          </p>
        ) : null}
      </CandidateOnboardingDesktopShell>

      <CandidateOnboardingMobileShell
        step={2}
        testId="candidate-preferences-step"
        title="Dicci qualcosa in più"
      >
        <CandidateOnboardingFormCard className="mt-[26px] px-6 pb-[33px] pt-[19px]">
          <div className="space-y-[10px]" data-node-id="234:816">
            <CandidateOnboardingSelectField
              compact
              id="mobile-candidate-preferences-province"
              label="provincia"
              onChange={(value) => onFieldChange("province", value)}
              options={candidateOnboardingProvinceOptions}
              value={draft.preferences.province}
            />
            <CandidateOnboardingSelectField
              compact
              id="mobile-candidate-preferences-city"
              label="città"
              onChange={(value) => onFieldChange("city", value)}
              options={cityOptions}
              value={draft.preferences.city}
            />
            <CandidateOnboardingTextField
              compact
              id="mobile-candidate-preferences-postal-code"
              label="CAP"
              onChange={(value) => onFieldChange("postalCode", value)}
              placeholder="scrivi"
              value={draft.preferences.postalCode}
            />
            <CandidateOnboardingSelectField
              compact
              id="mobile-candidate-preferences-sdg"
              label="in quale/i SDGs rispecchi il tuo impegno?"
              onChange={(value) => onFieldChange("sdgFocus", value)}
              options={candidateOnboardingSdgOptions}
              value={selectedSdg}
            />
            <CandidateOnboardingTextField
              compact
              id="mobile-candidate-preferences-role-interest"
              label="quali mansioni ti interessano?"
              onChange={(value) => onFieldChange("roleInterest", value)}
              placeholder="scrivi"
              value={selectedRoleInterest}
            />
            <CandidateOnboardingPrimaryButton compact onClick={onContinue}>
              registrati
            </CandidateOnboardingPrimaryButton>
          </div>
        </CandidateOnboardingFormCard>

        <div className="mt-[14px] px-[5px]">
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
          <p className="font-wedoo-body mx-auto mt-[30px] max-w-[290px] text-center text-[18px] leading-[1.25] text-[var(--wedoo-ink-muted)]">
            {loginPrompt.label}{" "}
            <Link className="text-[var(--wedoo-ink)] underline" to={loginPrompt.linkTo}>
              {loginPrompt.linkLabel}
            </Link>
          </p>
        ) : null}
      </CandidateOnboardingMobileShell>
    </main>
  );
}
