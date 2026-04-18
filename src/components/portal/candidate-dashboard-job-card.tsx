import { Link } from "react-router-dom";
import { sdgs } from "../../data/core";
import type { CandidateDashboardListing } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

function CandidateDashboardSdgRow({
  ids,
}: {
  ids: CandidateDashboardListing["sdgIds"];
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

export function CandidateDashboardJobCard({
  listing,
}: {
  listing: CandidateDashboardListing;
}) {
  return (
    <article
      className="wedoo-portal-card overflow-hidden rounded-[1.25rem] border border-brand-mint/22 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(246,255,251,0.96))] px-4 py-4 text-left shadow-[0_18px_42px_-32px_rgba(16,25,36,0.16)] sm:px-5 sm:py-5"
      data-candidate-dashboard-card=""
    >
      <div className="flex items-start justify-between gap-3">
        <div className="inline-flex rounded-full border border-brand-mint/35 bg-brand-mint/12 px-3 py-1 font-wedoo-accent text-[0.66rem] uppercase tracking-[0.16em] text-brand-ink">
          opportunita
        </div>
        <p className="font-wedoo-accent text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
          Wedoo match
        </p>
      </div>

      <h2 className="mt-3 font-wedoo-heading text-[1.4rem] leading-[1.02] text-black sm:text-[1.55rem]">
        {listing.title}
      </h2>

      <div className="mt-4 flex items-center gap-3">
        <AppImage
          alt={listing.companyName}
          className="h-12 w-12 rounded-full border border-brand-mint/20 bg-white p-2 object-contain sm:h-14 sm:w-14"
          src={assetPath(listing.companyLogo)}
        />
        <div className="min-w-0 font-wedoo-accent text-[0.96rem] leading-[1.2] text-black">
          <p className="font-medium">{listing.companyName}</p>
          <p className="text-slate-600">{listing.locationLabel}</p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {listing.tagLabels.map((tag) => (
          <span
            className="inline-flex min-h-[30px] items-center justify-center rounded-full border border-brand-mint/35 bg-brand-mint/8 px-3 py-1 font-wedoo-accent text-[0.78rem] leading-none text-black"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-4 rounded-[1rem] border border-black/6 bg-white/74 px-3 py-3">
        <p className="font-wedoo-accent text-[0.72rem] uppercase tracking-[0.18em] text-slate-400">
          agenda 2030
        </p>
        <CandidateDashboardSdgRow ids={listing.sdgIds} />
      </div>

      <Link
        className="mt-4 inline-flex min-h-[44px] w-full items-center justify-center rounded-[10px] border border-brand-mint/28 bg-brand-mint-deep px-4 py-2 font-wedoo-accent text-[0.94rem] leading-none text-brand-ink transition hover:bg-brand-mint"
        to={`/portale/candidato/annuncio/${listing.id}`}
      >
        {listing.ctaLabel}
      </Link>
    </article>
  );
}
