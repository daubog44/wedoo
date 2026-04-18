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
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-[76px]">
        <section className="mb-6 overflow-hidden rounded-[1.35rem] border border-brand-mint/20 bg-[linear-gradient(160deg,rgba(255,255,255,0.96),rgba(231,255,247,0.9))] px-4 py-4 shadow-[0_18px_42px_-30px_rgba(16,25,36,0.16)] md:px-6 md:py-5">
          <div className="grid gap-4 xl:grid-cols-[1.16fr_0.84fr] xl:items-end">
            <div className="space-y-2.5">
              <div className="inline-flex rounded-full border border-brand-mint/35 bg-brand-mint/12 px-3 py-1 font-wedoo-accent text-[0.7rem] uppercase tracking-[0.16em] text-brand-ink">
                bacheca candidato
              </div>
              <h1 className="font-wedoo-heading text-[2rem] leading-[0.96] text-black md:text-[2.6rem]">
                Annunci leggibili, non solo cliccabili.
              </h1>
              <p className="max-w-[29rem] font-wedoo-accent text-[0.9rem] leading-[1.38] text-slate-600 md:text-[0.98rem]">
                Quattro opportunita curate con tag, SDG e CTA nella stessa griglia visiva.
              </p>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-3">
              <article className="rounded-[1rem] border border-brand-mint/25 bg-white/90 px-4 py-3">
                <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">4 annunci</p>
                <p className="mt-1 font-wedoo-accent text-[0.74rem] leading-[1.3] text-slate-600">priorita nette</p>
              </article>
              <article className="rounded-[1rem] border border-brand-mint/25 bg-white/90 px-4 py-3">
                <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">3 tag</p>
                <p className="mt-1 font-wedoo-accent text-[0.74rem] leading-[1.3] text-slate-600">contratto e modalita</p>
              </article>
              <article className="rounded-[1rem] border border-brand-mint/25 bg-white/90 px-4 py-3">
                <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">CV linked</p>
                <p className="mt-1 font-wedoo-accent text-[0.74rem] leading-[1.3] text-slate-600">profilo e annunci allineati</p>
              </article>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_308px] xl:items-start xl:gap-7">
          <div className="order-2 xl:order-1">
            <h1 className="sr-only">Bacheca annunci</h1>
            <div className="grid gap-5 md:grid-cols-2 md:gap-5">
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
