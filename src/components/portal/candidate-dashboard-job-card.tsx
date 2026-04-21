import { Link } from "react-router-dom";
import { sdgs } from "../../data/core";
import type { CandidateDashboardListing } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

function CandidateDashboardSdgRow({ ids }: { ids: CandidateDashboardListing["sdgIds"] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {ids.map((id) => {
        const item = sdgs[id];
        if (!item) {
          return null;
        }

        return (
          <div
            className="flex h-[46px] w-[46px] items-center justify-center rounded-[0.9rem] border border-white/8 bg-white/6"
            key={id}
          >
            <AppImage alt={item.label} className="h-full w-full object-contain" src={assetPath(item.icon)} />
          </div>
        );
      })}
    </div>
  );
}

export function CandidateDashboardJobCard({
  listing,
}: {
  listing: CandidateDashboardListing;
}) {
  return (
    <article
      className="wedoo-portal-card wedoo-workspace-panel rounded-[1.45rem] border border-white/10 px-5 py-5"
      data-candidate-dashboard-card=""
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-[rgba(87,215,180,0.28)] bg-[rgba(87,215,180,0.12)] px-3 py-2 text-[0.68rem] font-wedoo-accent uppercase tracking-[0.18em] text-[var(--wedoo-mint)]">
              job signal
            </span>
            <span className="rounded-full border border-white/10 px-3 py-2 text-[0.68rem] uppercase tracking-[0.18em] text-[var(--wedoo-workspace-muted)]">
              {listing.locationLabel}
            </span>
          </div>

          <div className="flex items-start gap-4">
            <AppImage
              alt={listing.companyName}
              className="h-16 w-16 rounded-full border border-white/10 bg-white p-2 object-contain"
              src={assetPath(listing.companyLogo)}
            />
            <div className="min-w-0">
              <h2 className="font-wedoo-accent text-[2rem] leading-[0.96] uppercase text-[var(--wedoo-workspace-text)]">
                {listing.title}
              </h2>
              <p className="mt-2 text-base leading-7 text-[var(--wedoo-workspace-muted)]">{listing.companyName}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {listing.tagLabels.map((tag) => (
              <span
                className="inline-flex min-h-[36px] items-center justify-center rounded-full border border-white/10 bg-white/4 px-4 py-2 font-wedoo-accent text-[0.9rem] leading-none text-[var(--wedoo-workspace-text)]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex min-w-[15rem] flex-col gap-4 lg:items-end">
          <CandidateDashboardSdgRow ids={listing.sdgIds} />
          <Link
            className="inline-flex min-h-[50px] w-full items-center justify-center rounded-[14px] bg-[var(--wedoo-mint)] px-5 py-3 font-wedoo-accent text-[1rem] leading-none text-[var(--wedoo-ink)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-support-hover)] hover:text-[var(--wedoo-white-soft)] lg:w-[14rem]"
            to={`/portale/candidato/annuncio/${listing.id}`}
          >
            {listing.ctaLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
