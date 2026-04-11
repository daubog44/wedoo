import { Link } from "react-router-dom";
import { sdgs } from "../../data/core";
import type { CandidateDashboardListing } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

function CandidateDashboardSdgRow({ ids }: { ids: CandidateDashboardListing["sdgIds"] }) {
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

export function CandidateDashboardJobCard({
  listing,
}: {
  listing: CandidateDashboardListing;
}) {
  return (
    <article
      className="rounded-[30px] border-2 border-brand-mint-deep bg-brand-page px-5 py-5 text-center transition hover:-translate-y-1 hover:shadow-[0_22px_55px_-40px_rgba(16,25,36,0.75)] md:px-7 md:py-6"
      data-candidate-dashboard-card=""
    >
      <h2 className="font-wedoo-accent text-[2rem] leading-[0.96] uppercase text-black md:min-h-[4.5rem] md:text-[2.25rem]">
        {listing.title}
      </h2>

      <div className="mt-5 flex items-center gap-4 text-left">
        <AppImage
          alt={listing.companyName}
          className="h-16 w-16 rounded-full bg-white p-2 object-contain md:h-20 md:w-20 md:p-3"
          src={assetPath(listing.companyLogo)}
        />
        <div className="min-w-0 font-wedoo-accent text-[1.125rem] leading-[1.15] text-black md:text-[1.5rem]">
          <p>{listing.companyName}</p>
          <p>{listing.locationLabel}</p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap justify-center gap-3">
        {listing.tagLabels.map((tag) => (
          <span
            className="inline-flex min-h-[43px] items-center justify-center rounded-[8px] border border-brand-mint-deep px-4 py-2 font-wedoo-accent text-[1rem] leading-none text-black md:text-[1.5rem]"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <CandidateDashboardSdgRow ids={listing.sdgIds} />

      <Link
        className="mt-5 inline-flex min-h-[50px] w-full items-center justify-center rounded-[8px] bg-brand-mint-deep px-5 py-2 font-wedoo-accent text-[1.5rem] leading-none text-brand-ink transition hover:bg-brand-mint"
        to={`/portale/candidato/annuncio/${listing.id}`}
      >
        {listing.ctaLabel}
      </Link>
    </article>
  );
}
