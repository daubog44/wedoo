import { Navigate, useParams } from "react-router-dom";
import { BackdropPageShell, FormPageContent, SiteFooter } from "../../components/site";
import { companyForms } from "../../data/forms";

export default function CompanyWizardPage() {
  const params = useParams();
  const stepIndex = Number.parseInt(params.stepIndex ?? "1", 10);
  const step = companyForms[stepIndex - 1];

  if (!step) {
    return <Navigate replace to="/registrati/azienda/1" />;
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
