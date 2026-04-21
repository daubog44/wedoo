import { CandidateDashboardJobCard } from "../../components/portal/candidate-dashboard-job-card";
import { CandidateDashboardProfileRail } from "../../components/portal/candidate-dashboard-profile-rail";
import { candidateDashboardResponseMock } from "../../data/candidate-dashboard";

export default function CandidateDashboardPage() {
  const dashboard = candidateDashboardResponseMock;

  return (
    <main
      className="min-h-[calc(100vh-82px)] bg-[var(--wedoo-workspace-bg)] pb-12 pt-6 md:pt-8 xl:pt-10"
      data-portal-page="candidate-dashboard"
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-[76px]">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px] xl:items-start">
          <div className="order-2 space-y-6 xl:order-1">
            <div className="border-b border-white/8 pb-5">
              <h1 className="sr-only">Bacheca annunci</h1>
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                curated pipeline
              </p>
              <p className="mt-3 max-w-[34rem] text-[2.4rem] leading-[0.92] text-[var(--wedoo-workspace-text)]">
                Una bacheca piu lineare: meno mosaico, piu segnali leggibili.
              </p>
            </div>

            <div className="grid gap-4">
              {dashboard.listings.map((listing) => (
                <CandidateDashboardJobCard key={listing.id} listing={listing} />
              ))}
            </div>
          </div>

          <div className="order-1 xl:order-2">
            <CandidateDashboardProfileRail profile={dashboard.profile} />
          </div>
        </div>
      </div>
    </main>
  );
}
