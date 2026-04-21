import type { CandidateJobDetailResponse } from "../../data/types";
import { JobDetailResetShell } from "./job-detail-reset-shell";

export function CandidateJobDetailView({
  detail,
  onCancel,
  onClose,
  onSaveDraft,
}: {
  detail: CandidateJobDetailResponse;
  onCancel: () => void;
  onClose: () => void;
  onSaveDraft: () => void;
}) {
  return (
    <JobDetailResetShell
      closeLabel="Chiudi dettaglio annuncio"
      dataAttribute="data-candidate-job-detail-layout"
      detail={detail}
      dockLabel="Navigazione rapida candidato"
      dockTone="candidate"
      onCancel={onCancel}
      onClose={onClose}
      onSaveDraft={onSaveDraft}
    />
  );
}
