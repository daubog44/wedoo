import { useNavigate, useParams } from "react-router-dom";
import { CandidateJobDetailView } from "../../components/portal/candidate-job-detail-view";
import { getCandidateJobDetailResponse } from "../../data/candidate-job-detail";

export default function CandidateJobPage() {
  const navigate = useNavigate();
  const params = useParams();
  const detail = getCandidateJobDetailResponse(params.jobId);

  function closeDetail() {
    navigate(detail.closePath);
  }

  return (
    <main
      className="min-h-screen bg-brand-page px-0 pb-8 pt-0 lg:px-4 lg:py-[31px]"
      data-portal-page="candidate-job-detail"
    >
      <CandidateJobDetailView
        detail={detail}
        onCancel={closeDetail}
        onClose={closeDetail}
        onSaveDraft={() => {}}
      />
    </main>
  );
}
