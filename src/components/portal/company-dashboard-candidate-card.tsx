import { Link } from "react-router-dom";
import { sdgs } from "../../data/core";
import type { CompanyDashboardCandidate } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { SiteIcon } from "../site/site-icon";

function CompanyDashboardSdgRow({ ids }: { ids: CompanyDashboardCandidate["sdgIds"] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {ids.map((id) => {
        const item = sdgs[id];
        if (!item) {
          return null;
        }

        return (
          <div
            className="flex h-8 w-8 items-center justify-center rounded-[0.7rem] border border-white/8 bg-white/6 md:h-10 md:w-10"
            key={id}
          >
            <AppImage alt={item.label} className="h-full w-full object-contain" src={assetPath(item.icon)} />
          </div>
        );
      })}
    </div>
  );
}

export function CompanyDashboardCandidateCard({
  candidate,
}: {
  candidate: CompanyDashboardCandidate;
}) {
  return (
    <article
      className="wedoo-portal-card wedoo-workspace-panel rounded-[1.1rem] border border-white/10 px-3.5 py-3.5 md:rounded-[1.2rem] md:px-4 md:py-4"
      data-company-dashboard-card=""
    >
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="min-w-0">
          <div className="flex items-start gap-3 md:gap-4">
            <AppImage
              alt={candidate.name}
              className="h-12 w-12 shrink-0 rounded-full border border-white/10 bg-white object-cover md:h-16 md:w-16"
              src={assetPath(candidate.avatar)}
            />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-[rgba(112,72,232,0.28)] bg-[rgba(112,72,232,0.14)] px-2 py-1 text-[0.58rem] font-semibold uppercase tracking-normal text-[var(--wedoo-violet-300)] md:px-2.5 md:text-[0.64rem]">
                  candidate signal
                </span>
                <SiteIcon className="h-4 w-4 text-[rgba(255,255,255,0.34)] transition hover:text-[var(--wedoo-gold)]" name="star" />
              </div>
              <h2 className="mt-2 truncate text-[1.15rem] leading-tight text-[var(--wedoo-workspace-text)] md:text-[1.6rem]">
                {candidate.name}
              </h2>
              <p className="mt-1 text-[0.8rem] leading-5 text-[var(--wedoo-workspace-muted)] md:text-sm">
                {candidate.statusLabel} · {candidate.locationLabel}
              </p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2 md:mt-4">
            {candidate.tagLabels.map((tag) => (
              <span
                className="inline-flex min-h-[27px] items-center justify-center rounded-full border border-white/10 bg-white/4 px-2.5 py-1 text-[0.8rem] leading-none text-[var(--wedoo-workspace-text)] md:min-h-[30px] md:px-3 md:text-sm"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center lg:min-w-[14rem] lg:grid-cols-1 lg:justify-items-end">
          <CompanyDashboardSdgRow ids={candidate.sdgIds} />
          <Link
            className="inline-flex min-h-[38px] w-full items-center justify-center rounded-[11px] bg-[var(--wedoo-violet)] px-4 py-2 font-wedoo-accent text-[0.86rem] leading-none text-[var(--wedoo-white-soft)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)] sm:w-auto sm:min-w-[10rem] md:min-h-[42px] md:text-[0.95rem] lg:w-[12.5rem]"
            to={`/portale/azienda/candidati/${candidate.id}`}
          >
            {candidate.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
