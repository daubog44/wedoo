import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CandidateContactsStep } from "../../components/public/candidate-contacts-step";
import { CandidateEducationStep } from "../../components/public/candidate-education-step";
import { CandidatePreferencesStep } from "../../components/public/candidate-preferences-step";
import { CandidateRegistrationStep } from "../../components/public/candidate-registration-step";
import { CandidateSkillsStep } from "../../components/public/candidate-skills-step";
import { CandidateWorkPreferencesStep } from "../../components/public/candidate-work-preferences-step";
import { CandidateWorkExperienceStep } from "../../components/public/candidate-work-experience-step";
import { SiteFooter, TopLogoBar } from "../../components/site";
import {
  applyCandidateAccountStep,
  applyCandidatePreferencesStep,
  candidateOnboardingDraftMock,
  createCandidateProfileDraftFromOnboarding,
} from "../../data/candidate-onboarding";
import { candidateProfileDraftMock } from "../../data/candidate-profile";

export default function CandidateWizardPage() {
  const navigate = useNavigate();
  const params = useParams();
  const stepIndex = Number.parseInt(params.stepIndex ?? "1", 10);
  const [onboarding, setOnboarding] = useState(candidateOnboardingDraftMock);
  const profileDraft = createCandidateProfileDraftFromOnboarding(
    candidateProfileDraftMock,
    onboarding,
  );

  if (!Number.isFinite(stepIndex) || stepIndex < 1 || stepIndex > 7) {
    return <Navigate replace to="/registrati/candidato/1" />;
  }

  if (stepIndex === 1) {
    return (
      <CandidateRegistrationStep
        onContinue={() => navigate("/registrati/candidato/2")}
        onFieldChange={(field, value) => {
          setOnboarding((current) =>
            applyCandidateAccountStep(current, {
              ...current.account,
              [field]: value,
            }),
          );
        }}
        onTogglePrivacy={(checked) => {
          setOnboarding((current) =>
            applyCandidateAccountStep(current, {
              ...current.account,
              privacyAccepted: checked,
            }),
          );
        }}
        values={onboarding.account}
      />
    );
  }

  if (stepIndex === 2) {
    return (
      <CandidatePreferencesStep
        draft={onboarding}
        onContinue={() => navigate("/registrati/candidato/3")}
        onFieldChange={(field, value) => {
          setOnboarding((current) =>
            applyCandidatePreferencesStep(current, {
              city: field === "city" ? value : current.preferences.city,
              postalCode:
                field === "postalCode" ? value : current.preferences.postalCode,
              province:
                field === "province" ? value : current.preferences.province,
              roleInterest:
                field === "roleInterest"
                  ? value
                  : (current.preferences.roleInterests[0] ?? ""),
              sdgFocus:
                field === "sdgFocus"
                  ? value
                  : (current.preferences.sdgFocus[0] ?? ""),
            }),
          );
        }}
      />
    );
  }

  if (stepIndex === 3) {
    return (
      <>
        <TopLogoBar />
        <CandidateContactsStep
          draft={profileDraft}
          saveTo="/registrati/candidato/4"
        />
        <SiteFooter className="mt-0" />
      </>
    );
  }

  if (stepIndex === 4) {
    return (
      <>
        <TopLogoBar />
        <CandidateEducationStep
          draft={profileDraft}
          saveTo="/registrati/candidato/5"
        />
        <SiteFooter className="mt-0" />
      </>
    );
  }

  if (stepIndex === 5) {
    return (
      <>
        <TopLogoBar />
        <CandidateWorkExperienceStep
          draft={profileDraft}
          saveTo="/registrati/candidato/6"
        />
        <SiteFooter className="mt-0" />
      </>
    );
  }

  if (stepIndex === 6) {
    return (
      <>
        <TopLogoBar />
        <CandidateSkillsStep draft={profileDraft} saveTo="/registrati/candidato/7" />
        <SiteFooter className="mt-0" />
      </>
    );
  }

  if (stepIndex === 7) {
    return (
      <>
        <TopLogoBar />
        <CandidateWorkPreferencesStep draft={profileDraft} />
        <SiteFooter className="mt-0" />
      </>
    );
  }

  return <Navigate replace to="/registrati/candidato/1" />;
}
