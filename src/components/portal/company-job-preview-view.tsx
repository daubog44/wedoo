import type { CompanyJobPreviewResponse } from "../../data/types";
import { JobDetailResetShell } from "./job-detail-reset-shell";

export function CompanyJobPreviewView({
  detail,
  onCancel,
  onClose,
  onSaveDraft,
  onSubmit,
}: {
  detail: CompanyJobPreviewResponse;
  onCancel: () => void;
  onClose: () => void;
  onSaveDraft: () => void;
  onSubmit: () => void;
}) {
  return (
    <JobDetailResetShell
      closeLabel="Chiudi anteprima annuncio"
      dataAttribute="data-company-job-preview-layout"
      detail={detail}
      dockLabel={detail.mobileDockLabel}
      dockTone="company"
      onCancel={onCancel}
      onClose={onClose}
      onPrimary={onSubmit}
      onSaveDraft={onSaveDraft}
    />
  );
}
