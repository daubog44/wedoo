import { CompanyDashboardCandidateCard } from "../../components/portal/company-dashboard-candidate-card";
import { CompanyDashboardProfileRail } from "../../components/portal/company-dashboard-profile-rail";
import { companyDashboardResponseMock } from "../../data/company-dashboard";

export default function CompanyDashboardPage() {
  const dashboard = companyDashboardResponseMock;
  const candidateCount = dashboard.candidates.length;
  const sdgCount = new Set(dashboard.candidates.flatMap((candidate) => candidate.sdgIds)).size;

  return (
    <main
      className="min-h-[calc(100vh-82px)] bg-[var(--wedoo-workspace-bg)] pb-10 pt-5 md:pt-7 xl:pt-8"
      data-portal-page="company-dashboard"
    >
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-10">
        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_18.5rem] xl:items-start">
          <div className="space-y-5">
            <section className="rounded-[1.2rem] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface)] px-4 py-4 shadow-[var(--wedoo-workspace-card-shadow)] md:rounded-[1.35rem] md:px-5 md:py-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="min-w-0">
                  <p className="text-[0.7rem] font-semibold uppercase tracking-normal text-[var(--wedoo-violet-300)]">
                    Candidate pipeline
                  </p>
                  <h1 className="mt-2 max-w-[42rem] text-[1.6rem] leading-[1.05] text-[var(--wedoo-workspace-text)] md:text-[2.45rem]">
                    Candidati pronti da leggere, confrontare e aprire.
                  </h1>
                  <p className="mt-2 max-w-[44rem] text-sm leading-6 text-[var(--wedoo-workspace-muted)] md:mt-3 md:text-base md:leading-7">
                    La bacheca mostra solo i segnali utili: profilo, stato, tag, SDG e azione successiva.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center lg:min-w-[22rem]">
                  <div className="rounded-[0.9rem] border border-white/10 bg-white/4 px-3 py-2.5 md:rounded-[1rem] md:py-3">
                    <p className="text-lg leading-none text-[var(--wedoo-workspace-text)] md:text-xl">{candidateCount}</p>
                    <p className="mt-1 text-[0.72rem] leading-4 text-[var(--wedoo-workspace-muted)]">profili</p>
                  </div>
                  <div className="rounded-[0.9rem] border border-white/10 bg-white/4 px-3 py-2.5 md:rounded-[1rem] md:py-3">
                    <p className="text-lg leading-none text-[var(--wedoo-workspace-text)] md:text-xl">{sdgCount}</p>
                    <p className="mt-1 text-[0.72rem] leading-4 text-[var(--wedoo-workspace-muted)]">SDG</p>
                  </div>
                  <div className="rounded-[0.9rem] border border-white/10 bg-white/4 px-3 py-2.5 md:rounded-[1rem] md:py-3">
                    <p className="text-lg leading-none text-[var(--wedoo-workspace-text)] md:text-xl">1</p>
                    <p className="mt-1 text-[0.72rem] leading-4 text-[var(--wedoo-workspace-muted)]">annuncio</p>
                  </div>
                </div>
              </div>
            </section>

            <div className="xl:hidden">
              <CompanyDashboardProfileRail compact profile={dashboard.profile} />
            </div>

            <div className="grid gap-4">
              {dashboard.candidates.map((candidate) => (
                <CompanyDashboardCandidateCard candidate={candidate} key={candidate.id} />
              ))}
            </div>
          </div>

          <div className="hidden xl:block">
            <CompanyDashboardProfileRail profile={dashboard.profile} />
          </div>
        </div>
      </div>
    </main>
  );
}
