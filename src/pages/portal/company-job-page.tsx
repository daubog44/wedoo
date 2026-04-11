import { useNavigate, useParams } from "react-router-dom";
import { CompanyJobPreviewView } from "../../components/portal/company-job-preview-view";
import { getCompanyJobPreviewResponse } from "../../data/company-job-preview";
import { getJobDraftMockSnapshot, saveJobDraftMock } from "../../data/mock-services";

function getCompanyJobCompletionPath() {
  return getJobDraftMockSnapshot().flow.completionPath;
}

export default function CompanyJobPage() {
  const navigate = useNavigate();
  const params = useParams();
  const detail = getCompanyJobPreviewResponse(params.jobId);

  function closePreview() {
    navigate(detail.closePath);
  }

  async function saveDraft() {
    await saveJobDraftMock(getJobDraftMockSnapshot());
  }

  async function submitPreview() {
    await saveDraft();
    navigate(getCompanyJobCompletionPath());
  }

  return (
    <main
      className="min-h-screen bg-brand-page px-0 pb-8 pt-0 lg:px-4 lg:py-[31px]"
      data-portal-page="company-job-preview"
    >
      <CompanyJobPreviewView
        detail={detail}
        onCancel={closePreview}
        onClose={closePreview}
        onSaveDraft={saveDraft}
        onSubmit={submitPreview}
      />
    </main>
  );
}
