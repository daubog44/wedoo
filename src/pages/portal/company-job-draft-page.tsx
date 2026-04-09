import { useState } from "react";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { CompanyJobDraftStepOne } from "../../components/portal/company-job-draft-step-one";
import { CompanyJobDraftStepTwo } from "../../components/portal/company-job-draft-step-two";
import {
  applyJobDraftStepOne,
  applyJobDraftStepTwo,
} from "../../data/job-draft";
import {
  getJobDraftMockSnapshot,
  resetJobDraftMock,
  saveJobDraftMock,
} from "../../data/mock-services";

export default function CompanyJobDraftPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [draft, setDraft] = useState(() => getJobDraftMockSnapshot());
  const step = searchParams.get("step") === "2" ? 2 : 1;

  if (searchParams.get("step") && step !== 2) {
    return <Navigate replace to={draft.flow.portalDraftPath} />;
  }

  async function persistDraft(nextDraft: typeof draft) {
    const savedDraft = await saveJobDraftMock(nextDraft);
    setDraft(savedDraft);
    return savedDraft;
  }

  return (
    step === 2 ? (
      <CompanyJobDraftStepTwo
        draft={draft}
        onPreview={async (values) => {
          const nextDraft = applyJobDraftStepTwo(draft, values);
          const savedDraft = await persistDraft(nextDraft);
          navigate(savedDraft.flow.previewPath);
        }}
        onSaveDraft={async (values) => {
          await persistDraft(applyJobDraftStepTwo(draft, values));
          navigate("/portale/azienda/annunci");
        }}
        onSubmitDraft={async (values) => {
          const nextDraft = applyJobDraftStepTwo(draft, values);
          await persistDraft(nextDraft);
          const emptyDraft = await resetJobDraftMock();
          setDraft(emptyDraft);
          navigate(nextDraft.flow.completionPath);
        }}
      />
    ) : (
      <CompanyJobDraftStepOne
        draft={draft}
        onContinue={async (values) => {
          const nextDraft = applyJobDraftStepOne(draft, values);
          const savedDraft = await persistDraft(nextDraft);
          navigate(`${savedDraft.flow.portalDraftPath}?step=2`);
        }}
      />
    )
  );
}
