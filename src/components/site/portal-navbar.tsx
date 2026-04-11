import { useState } from "react";
import { NavLink } from "react-router-dom";
import { candidateDashboardResponseMock } from "../../data/candidate-dashboard";
import { companyDashboardResponseMock } from "../../data/company-dashboard";
import { portalNavigation } from "../../data/site-content";
import type { PortalRole } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { WedooLogo } from "./branding";
import { SiteIcon } from "./site-icon";

const candidateProfile = candidateDashboardResponseMock.profile;
const companyProfile = companyDashboardResponseMock.profile;
const companyPrimaryNavigation = portalNavigation.company.filter(
  (item) => item.to !== "/portale/azienda/annunci",
);
const companySecondaryNavigation = portalNavigation.company.find(
  (item) => item.to === "/portale/azienda/annunci",
);

function CandidatePortalNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-brand-mint-deep px-4 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex min-h-[87px] items-center gap-4">
          <WedooLogo className="lg:hidden" imageClassName="h-9" variant="candidate" />

          <nav
            aria-label="Navigazione portale candidato"
            className="hidden lg:flex lg:items-center lg:gap-10"
          >
            {portalNavigation.candidate.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "font-wedoo-accent text-[1.125rem] leading-none transition hover:text-brand-violet-deep lg:text-[1.5rem]",
                    isActive ? "text-brand-violet-deep" : "text-black",
                  )
                }
                end={item.to === "/portale/candidato"}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-4 lg:flex lg:gap-7">
            <button
              aria-label="Cerca opportunita"
              className="inline-flex items-center gap-3 text-black transition hover:text-brand-violet-deep"
              type="button"
            >
              <SiteIcon className="h-7 w-7 lg:h-8 lg:w-8" name="search" />
              <span className="font-wedoo-body text-[1rem] italic leading-none lg:text-[1.375rem]">
                {candidateDashboardResponseMock.searchPlaceholder}
              </span>
            </button>

            <button
              aria-label="Filtra opportunita"
              className="inline-flex items-center justify-center text-black transition hover:text-brand-violet-deep"
              type="button"
            >
              <SiteIcon className="h-8 w-8 lg:h-10 lg:w-10" name="filter" />
            </button>

            <img
              alt={candidateProfile.fullName}
              className="h-12 w-12 rounded-full object-cover lg:h-[72px] lg:w-[72px]"
              src={assetPath(candidateProfile.avatar)}
            />
          </div>

          <div className="ml-auto flex items-center gap-3 lg:hidden">
            <img
              alt={candidateProfile.fullName}
              className="h-10 w-10 rounded-full object-cover"
              src={assetPath(candidateProfile.avatar)}
            />
            <button
              aria-expanded={isOpen}
              aria-label={isOpen ? "Chiudi navigazione portale" : "Apri navigazione portale"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/20 bg-brand-page text-black"
              onClick={() => setIsOpen((value) => !value)}
              type="button"
            >
              <SiteIcon className="h-5 w-5" name={isOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-black/10 py-3 lg:hidden">
          <button
            aria-label="Cerca opportunita"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-[8px] border border-black/15 bg-brand-page px-3 py-2 text-black"
            type="button"
          >
            <SiteIcon className="h-5 w-5" name="search" />
            <span className="font-wedoo-body text-sm italic">
              {candidateDashboardResponseMock.searchPlaceholder}
            </span>
          </button>
          <button
            aria-label="Filtra opportunita"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-black/15 bg-brand-page text-black"
            type="button"
          >
            <SiteIcon className="h-5 w-5" name="filter" />
          </button>
        </div>

        <div className={cn("border-t border-black/10 pb-4 lg:hidden", isOpen ? "block" : "hidden")}>
          <nav
            aria-label="Navigazione portale candidato mobile"
            className="grid gap-2 pt-4"
          >
            {portalNavigation.candidate.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "rounded-[8px] px-3 py-2 font-wedoo-accent text-[1.125rem] transition",
                    isActive ? "bg-brand-page text-brand-violet-deep" : "text-black",
                  )
                }
                end={item.to === "/portale/candidato"}
                key={item.to}
                onClick={() => setIsOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

function CompanyPortalNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-brand-violet px-4 md:px-8">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex min-h-[87px] items-center gap-4">
          <nav
            aria-label="Navigazione portale azienda"
            className="hidden lg:flex lg:items-center lg:gap-8"
          >
            {companyPrimaryNavigation.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "font-wedoo-accent text-[1.5rem] leading-none transition",
                    isActive ? "text-black" : "text-white hover:text-black/85",
                  )
                }
                end={item.to === "/portale/azienda"}
                key={item.to}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}

            {companySecondaryNavigation ? (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "inline-flex min-h-[40px] items-center justify-center rounded-[8px] border px-4 py-2 font-wedoo-accent text-[1.125rem] leading-none transition",
                    isActive
                      ? "border-white bg-white text-brand-violet"
                      : "border-white/65 text-white hover:border-white",
                  )
                }
                to={companySecondaryNavigation.to}
              >
                {companySecondaryNavigation.label}
              </NavLink>
            ) : null}
          </nav>

          <div className="ml-auto hidden items-center gap-4 lg:flex lg:gap-6">
            <button
              aria-label="Cerca opportunità"
              className="inline-flex items-center gap-3 text-white transition hover:text-black/85"
              type="button"
            >
              <SiteIcon className="h-7 w-7 lg:h-8 lg:w-8" name="search" />
              <span className="font-wedoo-body text-[1rem] italic leading-none lg:text-[1.375rem]">
                {companyDashboardResponseMock.searchPlaceholder}
              </span>
            </button>

            <button
              aria-label="Filtra candidati"
              className="inline-flex items-center justify-center text-white transition hover:text-black/85"
              type="button"
            >
              <SiteIcon className="h-8 w-8 lg:h-10 lg:w-10" name="filter" />
            </button>

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white lg:h-[72px] lg:w-[72px]">
              <img
                alt={companyProfile.companyName}
                className="h-8 w-8 object-contain lg:h-12 lg:w-12"
                src={assetPath(companyProfile.companyLogo)}
              />
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3 lg:hidden">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
              <img
                alt={companyProfile.companyName}
                className="h-8 w-8 object-contain"
                src={assetPath(companyProfile.companyLogo)}
              />
            </div>
            <p className="line-clamp-2 font-wedoo-accent text-[1rem] leading-none text-white">
              {companyProfile.companyName}
            </p>
          </div>

          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? "Chiudi navigazione portale azienda" : "Apri navigazione portale azienda"}
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/35 bg-white/10 text-white lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <SiteIcon className="h-5 w-5" name={isOpen ? "close" : "menu"} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/20 py-3 lg:hidden">
          <button
            aria-label="Cerca opportunità"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-[8px] border border-white/25 bg-white/10 px-3 py-2 text-white"
            type="button"
          >
            <SiteIcon className="h-5 w-5" name="search" />
            <span className="font-wedoo-body text-sm italic">
              {companyDashboardResponseMock.searchPlaceholder}
            </span>
          </button>
          <button
            aria-label="Filtra candidati"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[8px] border border-white/25 bg-white/10 text-white"
            type="button"
          >
            <SiteIcon className="h-5 w-5" name="filter" />
          </button>
        </div>

        <div className={cn("border-t border-white/20 pb-4 lg:hidden", isOpen ? "block" : "hidden")}>
          <nav
            aria-label="Navigazione portale azienda mobile"
            className="grid gap-2 pt-4"
          >
            {portalNavigation.company.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "rounded-[8px] px-3 py-2 font-wedoo-accent text-[1.125rem] transition",
                    isActive ? "bg-white text-brand-violet" : "text-white",
                  )
                }
                end={item.to === "/portale/azienda"}
                key={item.to}
                onClick={() => setIsOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}

export function PortalNavbar({ role }: { role: PortalRole }) {
  if (role === "candidate") {
    return <CandidatePortalNavbar />;
  }

  return <CompanyPortalNavbar />;
}
