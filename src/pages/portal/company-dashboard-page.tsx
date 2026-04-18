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
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-[76px]">
        <section className="mb-6 overflow-hidden rounded-[1.35rem] border border-brand-violet/18 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(243,237,255,0.92))] px-4 py-4 shadow-[0_18px_42px_-30px_rgba(16,25,36,0.16)] md:px-6 md:py-5">
          <div className="grid gap-4 xl:grid-cols-[1.16fr_0.84fr] xl:items-end">
            <div className="space-y-2.5">
              <div className="inline-flex rounded-full border border-brand-violet/28 bg-brand-violet/8 px-3 py-1 font-wedoo-accent text-[0.7rem] uppercase tracking-[0.16em] text-brand-violet-700">
                dashboard recruiter
              </div>
              <h1 className="font-wedoo-heading text-[2rem] leading-[0.96] text-black md:text-[2.6rem]">
                Profili leggibili, priorita piu nette.
              </h1>
              <p className="max-w-[29rem] font-wedoo-accent text-[0.9rem] leading-[1.38] text-slate-600 md:text-[0.98rem]">
                Un workspace recruiter piu corto, piu leggibile e meno appoggiato a shell generiche.
              </p>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3">
              <article className="rounded-[1rem] border border-brand-violet/20 bg-white/90 px-4 py-3">
                <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">4 profili</p>
                <p className="mt-1 font-wedoo-accent text-[0.74rem] leading-[1.3] text-slate-600">segnali utili</p>
              </article>
              <article className="rounded-[1rem] border border-brand-violet/20 bg-white/90 px-4 py-3">
                <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">SDG visibili</p>
                <p className="mt-1 font-wedoo-accent text-[0.74rem] leading-[1.3] text-slate-600">compatibilita rapida</p>
              </article>
              <article className="rounded-[1rem] border border-brand-violet/20 bg-white/90 px-4 py-3">
                <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">Flow corto</p>
                <p className="mt-1 font-wedoo-accent text-[0.74rem] leading-[1.3] text-slate-600">meno salti tra rail e card</p>
              </article>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_308px] xl:items-start xl:gap-7">
          <div className="order-2 xl:order-1">
            <h1 className="sr-only">Bacheca annunci</h1>
            <div className="grid gap-5 md:grid-cols-2 md:gap-5">
              {dashboard.candidates.map((candidate) => (
                <CompanyDashboardCandidateCard candidate={candidate} key={candidate.id} />
              ))}
            </div>
          </div>

          <div className="order-1 xl:order-2">
            <CompanyDashboardProfileRail profile={dashboard.profile} />
          </div>
        </div>
      </div>
    </main>
  );
}
