import { Navigate, useSearchParams } from "react-router-dom";
import { CompanyJobDraftStepOne } from "../../components/portal/company-job-draft-step-one";
import { CompanyJobDraftStepTwo } from "../../components/portal/company-job-draft-step-two";
import { SiteFooter } from "../../components/site";
import { jobDraftMock } from "../../data/job-draft";

export default function CompanyJobDraftPage() {
  const [searchParams] = useSearchParams();
  const step = searchParams.get("step") === "2" ? 2 : 1;

  if (searchParams.get("step") && step !== 2) {
    return <Navigate replace to={jobDraftMock.flow.portalDraftPath} />;
  }

  return (
    <>
      {step === 2 ? (
        <CompanyJobDraftStepTwo draft={jobDraftMock} />
      ) : (
        <CompanyJobDraftStepOne
          draft={jobDraftMock}
          saveTo={`${jobDraftMock.flow.portalDraftPath}?step=2`}
        />
      )}
      <SiteFooter className="mt-0" />
    </>
  );
}
