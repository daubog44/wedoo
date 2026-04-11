import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { CompanyDetailsStep } from "../../components/public/company-details-step";
import { CompanyOfferStep } from "../../components/public/company-offer-step";
import { CompanyRegistrationStep } from "../../components/public/company-registration-step";
import { CompanyRecruiterStep } from "../../components/public/company-recruiter-step";
import { CompanySustainabilityStep } from "../../components/public/company-sustainability-step";
import {
  applyCompanyDetailsStep,
  applyCompanyRecruiterStep,
  companyRegistrationDraftMock,
  createBlankCompanyOnboardingDraft,
} from "../../data/company-onboarding";
import {
  applyJobDraftStepOne,
  applyJobDraftStepTwo,
} from "../../data/job-draft";
import { jobDraftMock } from "../../data/job-draft";
import { saveJobDraftMock } from "../../data/mock-services";

export default function CompanyWizardPage() {
  const navigate = useNavigate();
  const params = useParams();
  const stepIndex = Number.parseInt(params.stepIndex ?? "1", 10);
  const [registration, setRegistration] = useState(companyRegistrationDraftMock);
  const [draft, setDraft] = useState(() => createBlankCompanyOnboardingDraft(jobDraftMock));

  if (!Number.isFinite(stepIndex) || stepIndex < 1 || stepIndex > 5) {
    return <Navigate replace to="/registrati/azienda/1" />;
  }

  function setRegistrationField(
    field: Exclude<keyof typeof registration, "privacyAccepted">,
    value: string,
  ) {
    setRegistration((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function getDraftWithRegistration() {
    return {
      ...draft,
      company: {
        ...draft.company,
        legalName: registration.company || draft.company.legalName,
        vatNumber: registration.vat || draft.company.vatNumber,
      },
      recruiter: {
        ...draft.recruiter,
        email: draft.recruiter.email || registration.email,
        phone: draft.recruiter.phone || registration.phone,
      },
    };
  }

  if (stepIndex === 1) {
    return (
      <CompanyRegistrationStep
        onContinue={() => navigate("/registrati/azienda/2")}
        onFieldChange={setRegistrationField}
        onTogglePrivacy={(checked) =>
          setRegistration((current) => ({
            ...current,
            privacyAccepted: checked,
          }))
        }
        values={registration}
      />
    );
  }

  if (stepIndex === 2) {
    return (
      <CompanyRecruiterStep
        draft={draft}
        onContinue={() => navigate("/registrati/azienda/3")}
        onUpdate={(values) => {
          setDraft((current) => applyCompanyRecruiterStep(current, values));
        }}
      />
    );
  }

  if (stepIndex === 3) {
    return (
      <CompanyDetailsStep
        draft={draft}
        onContinue={() => navigate("/registrati/azienda/4")}
        onUpdate={(values) => {
          setDraft((current) => applyCompanyDetailsStep(current, values));
        }}
      />
    );
  }

  if (stepIndex === 4) {
    return (
      <CompanyOfferStep
        draft={draft}
        onContinue={() => navigate("/registrati/azienda/5")}
        onUpdate={(values) => {
          setDraft((current) => applyJobDraftStepOne(current, values));
        }}
      />
    );
  }

  return (
    <CompanySustainabilityStep
      draft={draft}
      onCancel={() => {
        setDraft(createBlankCompanyOnboardingDraft(jobDraftMock));
      }}
      onPreview={async () => {
        const nextDraft = getDraftWithRegistration();
        await saveJobDraftMock(nextDraft);
        navigate(nextDraft.flow.previewPath);
      }}
      onSaveDraft={async () => {
        const nextDraft = getDraftWithRegistration();
        await saveJobDraftMock(nextDraft);
        navigate("/portale/azienda/annunci");
      }}
      onSubmit={async () => {
        const nextDraft = getDraftWithRegistration();
        await saveJobDraftMock(nextDraft);
        setDraft(createBlankCompanyOnboardingDraft(jobDraftMock));
        setRegistration(companyRegistrationDraftMock);
        navigate(nextDraft.flow.completionPath);
      }}
      onUpdate={(values) => {
        setDraft((current) => applyJobDraftStepTwo(current, values));
      }}
    />
  );
}
