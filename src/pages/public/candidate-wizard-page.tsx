import { Navigate, useParams } from "react-router-dom";
import { CandidateContactsStep } from "../../components/public/candidate-contacts-step";
import { CandidateEducationStep } from "../../components/public/candidate-education-step";
import {
  BackdropPageShell,
  FormPageContent,
  SiteFooter,
  TopLogoBar,
} from "../../components/site";
import { candidateProfileDraftMock } from "../../data/candidate-profile";
import { candidateForms } from "../../data/forms";

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
        <CandidateEducationStep draft={candidateProfileDraftMock} />
        <SiteFooter className="mt-0" />
      </>
    );
  }

  const step = candidateForms[stepIndex - 1];

  if (stepIndex !== 1 || !step) {
    return <Navigate replace to="/registrati/candidato/1" />;
  }

  return (
    <>
      <BackdropPageShell background={step.background}>
        <FormPageContent config={step} />
      </BackdropPageShell>
      <SiteFooter className="mt-0" />
    </>
  );
}
