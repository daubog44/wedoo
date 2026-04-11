import { useNavigate, useParams } from "react-router-dom";
import { CompanyCandidateDetailView } from "../../components/portal/company-candidate-detail-view";
import { getCompanyCandidateDetailResponse } from "../../data/company-candidate-detail";

export default function CompanyCandidatePage() {
  const navigate = useNavigate();
  const params = useParams();
  const detail = getCompanyCandidateDetailResponse(params.candidateId);

  function closeDetail() {
    navigate(detail.closePath);
  }

  return (
    <main
      className="min-h-screen bg-white px-0 pb-8 pt-0 lg:px-4 lg:py-[31px]"
      data-portal-page="company-candidate-detail"
    >
      <CompanyCandidateDetailView
        detail={detail}
        onCancel={closeDetail}
        onClose={closeDetail}
        onSaveDraft={() => {}}
      />
    </main>
  );
}
