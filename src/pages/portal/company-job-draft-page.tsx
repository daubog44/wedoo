import { CompanyJobDraftStepOne } from "../../components/portal/company-job-draft-step-one";
import { SiteFooter } from "../../components/site";
import { jobDraftMock } from "../../data/job-draft";

export default function CompanyJobDraftPage() {
  return (
    <>
      <CompanyJobDraftStepOne draft={jobDraftMock} />
      <SiteFooter className="mt-0" />
    </>
  );
}
