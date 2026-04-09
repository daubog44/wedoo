import { Navigate, useParams } from "react-router-dom";
import { CandidateContactsStep } from "../../components/public/candidate-contacts-step";
import { CandidateEducationStep } from "../../components/public/candidate-education-step";
import { CandidateSkillsStep } from "../../components/public/candidate-skills-step";
import { CandidateWorkExperienceStep } from "../../components/public/candidate-work-experience-step";
import {
  BackdropPageShell,
  FormPageContent,
  SiteFooter,
  TopLogoBar,
} from "../../components/site";
import { candidateProfileDraftMock } from "../../data/candidate-profile";
import { candidateRegistrationForm } from "../../data/forms";

export default function CandidateWizardPage() {
  const params = useParams();
  const stepIndex = Number.parseInt(params.stepIndex ?? "1", 10);

  if (stepIndex === 2) {
    return (
      <>
        <TopLogoBar />
        <CandidateContactsStep
          draft={candidateProfileDraftMock}
          saveTo="/registrati/candidato/3"
        />
        <SiteFooter className="mt-0" />
      </>
    );
  }

  if (stepIndex === 3) {
    return (
      <>
        <TopLogoBar />
        <CandidateEducationStep
          draft={candidateProfileDraftMock}
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
        <CandidateWorkExperienceStep
          draft={candidateProfileDraftMock}
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
        <CandidateSkillsStep draft={candidateProfileDraftMock} />
        <SiteFooter className="mt-0" />
      </>
    );
  }

  if (stepIndex !== 1) {
    return <Navigate replace to="/registrati/candidato/1" />;
  }

  return (
    <>
      <BackdropPageShell background={candidateRegistrationForm.background}>
        <FormPageContent config={candidateRegistrationForm} />
      </BackdropPageShell>
      <SiteFooter className="mt-0" />
    </>
  );
}
