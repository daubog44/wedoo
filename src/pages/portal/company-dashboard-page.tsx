import { CompanyDashboardCandidateCard } from "../../components/portal/company-dashboard-candidate-card";
import { CompanyDashboardProfileRail } from "../../components/portal/company-dashboard-profile-rail";
import { companyDashboardResponseMock } from "../../data/company-dashboard";

export default function CompanyDashboardPage() {
  const dashboard = companyDashboardResponseMock;

  return (
    <main
      className="min-h-[calc(100vh-87px)] bg-brand-page pb-12 pt-6 md:pt-8 xl:pt-10"
      data-portal-page="company-dashboard"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 md:px-8 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start xl:gap-[34px] xl:px-[76px]">
        <div className="order-2 xl:order-1">
          <h1 className="sr-only">Bacheca annunci</h1>
          <div className="grid gap-8 md:grid-cols-2 md:gap-[30px]">
            {dashboard.candidates.map((candidate) => (
              <CompanyDashboardCandidateCard candidate={candidate} key={candidate.id} />
            ))}
          </div>
        </div>

        <div className="order-1 xl:order-2">
          <CompanyDashboardProfileRail profile={dashboard.profile} />
        </div>
      </div>
    </main>
  );
}
