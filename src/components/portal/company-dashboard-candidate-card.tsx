import { Link } from "react-router-dom";
import { sdgs } from "../../data/core";
import type { CompanyDashboardCandidate } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { SiteIcon } from "../site/site-icon";

function CompanyDashboardSdgRow({ ids }: { ids: CompanyDashboardCandidate["sdgIds"] }) {
  return (
    <div className="mt-5 flex flex-wrap justify-center gap-3 md:gap-4">
      {ids.map((id) => {
        const item = sdgs[id];
        if (!item) {
          return null;
        }

        return (
          <div
            className="flex h-[58px] w-[58px] items-center justify-center bg-brand-page md:h-[78px] md:w-[78px]"
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
      className="rounded-[30px] border-2 border-brand-violet bg-brand-page px-5 py-5 text-center transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-40px_rgba(16,25,36,0.75)] md:px-7 md:py-6"
      data-company-dashboard-card=""
    >
      <h2 className="font-wedoo-accent text-[2rem] leading-[0.96] uppercase text-black md:min-h-[4.5rem] md:text-[2.25rem]">
        {candidate.name}
      </h2>

      <div className="mt-5 flex items-center gap-4 text-left">
        <AppImage
          alt={candidate.name}
          className="h-16 w-16 rounded-full bg-white object-cover md:h-20 md:w-20"
          src={assetPath(candidate.avatar)}
        />
        <div className="min-w-0 font-wedoo-accent text-[1.125rem] leading-[1.15] text-black md:text-[1.5rem]">
          <p>{candidate.statusLabel}</p>
          <p>{candidate.locationLabel}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {candidate.tagLabels.map((tag) => (
          <span
            className="inline-flex min-h-[43px] items-center justify-center rounded-[8px] border border-brand-violet px-4 py-2 font-wedoo-accent text-[1rem] leading-none text-black md:text-[1.5rem]"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <CompanyDashboardSdgRow ids={candidate.sdgIds} />

      <div className="mt-5 flex items-center gap-4">
        <SiteIcon className="h-8 w-8 shrink-0 text-slate-400 transition hover:text-yellow-400" name="star" />
        <Link
          className="inline-flex min-h-[50px] flex-1 items-center justify-center rounded-[8px] bg-brand-violet px-5 py-2 font-wedoo-accent text-[1.5rem] leading-none text-white transition hover:bg-brand-violet-deep"
          to={`/portale/azienda/candidati/${candidate.id}`}
        >
          {candidate.ctaLabel}
        </Link>
      </div>
    </article>
  );
}
