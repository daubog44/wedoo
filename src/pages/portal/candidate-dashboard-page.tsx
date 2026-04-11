import { CandidateDashboardJobCard } from "../../components/portal/candidate-dashboard-job-card";
import { CandidateDashboardProfileRail } from "../../components/portal/candidate-dashboard-profile-rail";
import { candidateDashboardResponseMock } from "../../data/candidate-dashboard";

export default function CandidateDashboardPage() {
  const dashboard = candidateDashboardResponseMock;

  return (
    <main
      className="min-h-[calc(100vh-87px)] bg-brand-page pb-12 pt-6 md:pt-8 xl:pt-10"
      data-portal-page="candidate-dashboard"
    >
      <div className="mx-auto grid max-w-[1440px] gap-8 px-4 md:px-8 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-start xl:gap-[34px] xl:px-[76px]">
        <div className="order-2 xl:order-1">
          <h1 className="sr-only">Bacheca annunci</h1>
          <div className="grid gap-8 md:grid-cols-2 md:gap-[30px]">
            {dashboard.listings.map((listing) => (
              <CandidateDashboardJobCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>

        <div className="order-1 xl:order-2">
          <CandidateDashboardProfileRail profile={dashboard.profile} />
        </div>
      </div>
    </main>
  );
}
