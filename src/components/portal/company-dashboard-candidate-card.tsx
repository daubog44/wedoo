import { Link } from "react-router-dom";
import { sdgs } from "../../data/core";
import type { CompanyDashboardCandidate } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { SiteIcon } from "../site/site-icon";

function CompanyDashboardSdgRow({
  ids,
}: {
  ids: CompanyDashboardCandidate["sdgIds"];
}) {
  return (
    <div className="mt-4 flex flex-wrap gap-2.5">
      {ids.map((id) => {
        const item = sdgs[id];
        if (!item) {
          return null;
        }

        return (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-[0.85rem] border border-black/6 bg-brand-page"
            key={id}
          >
            <AppImage
              alt={item.label}
              className="h-full w-full object-contain mix-blend-multiply"
              src={assetPath(item.icon)}
            />
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
      className="wedoo-portal-card overflow-hidden rounded-[1.25rem] border border-brand-violet/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(249,246,255,0.96))] px-4 py-4 text-left shadow-[0_18px_42px_-32px_rgba(16,25,36,0.16)] sm:px-5 sm:py-5"
      data-company-dashboard-card=""
    >
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex rounded-full border border-brand-violet/28 bg-brand-violet/8 px-3 py-1 font-wedoo-accent text-[0.66rem] uppercase tracking-[0.16em] text-brand-violet-700">
          talento
        </div>
        <p className="font-wedoo-accent text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
          recruiter view
        </p>
      </div>

      <h2 className="mt-3 font-wedoo-heading text-[1.4rem] leading-[1.02] text-black sm:text-[1.55rem]">
        {candidate.name}
      </h2>

      <div className="mt-4 flex items-center gap-3">
        <AppImage
          alt={candidate.name}
          className="h-14 w-14 rounded-full border border-brand-violet/20 bg-white object-cover"
          src={assetPath(candidate.avatar)}
        />
        <div className="min-w-0 font-wedoo-accent text-[0.96rem] leading-[1.2] text-black">
          <p className="font-medium">{candidate.statusLabel}</p>
          <p className="text-slate-600">{candidate.locationLabel}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.tagLabels.map((tag) => (
          <span
            className="inline-flex min-h-[30px] items-center justify-center rounded-full border border-brand-violet/28 bg-brand-violet/6 px-3 py-1 font-wedoo-accent text-[0.78rem] leading-none text-black"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-[1rem] border border-black/6 bg-white/74 px-3 py-3">
        <p className="font-wedoo-accent text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
          segnali SDG
        </p>
        <CompanyDashboardSdgRow ids={candidate.sdgIds} />
      </div>

      <div className="mt-5 flex items-center gap-3">
        <SiteIcon
          className="h-5 w-5 shrink-0 text-slate-400 transition hover:text-yellow-400"
          name="star"
        />
        <Link
          className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-[10px] border border-brand-violet/28 bg-brand-violet px-4 py-2 font-wedoo-accent text-[0.94rem] leading-none text-white transition hover:bg-brand-violet-deep"
          to={`/portale/azienda/candidati/${candidate.id}`}
        >
          {candidate.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
