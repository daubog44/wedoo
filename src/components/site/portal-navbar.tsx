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
    <header className="border-b border-black/8 bg-[linear-gradient(180deg,rgba(88,203,165,0.9),rgba(88,203,165,0.84))] px-4 md:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex min-h-[68px] items-center gap-4 py-3">
          <WedooLogo className="lg:hidden" imageClassName="h-8" variant="candidate" />

          <nav
            aria-label="Navigazione portale candidato"
            className="hidden lg:flex lg:items-center lg:gap-2"
          >
            {portalNavigation.candidate.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3 py-2 font-wedoo-accent text-[0.94rem] leading-none transition",
                    isActive
                      ? "bg-white/72 text-brand-violet-deep shadow-[0_14px_32px_-26px_rgba(16,25,36,0.24)]"
                      : "text-black/76 hover:bg-white/44 hover:text-brand-violet-deep",
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

          <div className="ml-auto hidden items-center gap-4 lg:flex">
            <button
              aria-label="Cerca opportunita"
              className="inline-flex min-h-[38px] items-center gap-2.5 rounded-full border border-black/8 bg-white/62 px-4 text-black transition hover:bg-white/78 hover:text-brand-violet-deep"
              type="button"
            >
              <SiteIcon className="h-4.5 w-4.5" name="search" />
              <span className="font-wedoo-body text-[0.9rem] italic leading-none">
                {candidateDashboardResponseMock.searchPlaceholder}
              </span>
            </button>

            <button
              aria-label="Filtra opportunita"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/8 bg-white/62 text-black transition hover:bg-white/78 hover:text-brand-violet-deep"
              type="button"
            >
              <SiteIcon className="h-4.5 w-4.5" name="filter" />
            </button>

            <img
              alt={candidateProfile.fullName}
              className="h-10 w-10 rounded-full border border-white/60 object-cover lg:h-12 lg:w-12"
              src={assetPath(candidateProfile.avatar)}
            />
          </div>

          <div className="ml-auto flex items-center gap-3 lg:hidden">
            <img
              alt={candidateProfile.fullName}
              className="h-9 w-9 rounded-full border border-white/60 object-cover"
              src={assetPath(candidateProfile.avatar)}
            />
            <button
              aria-expanded={isOpen}
              aria-label={isOpen ? "Chiudi navigazione portale" : "Apri navigazione portale"}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/12 bg-white/66 text-black"
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
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-[12px] border border-black/10 bg-white/66 px-3 py-2 text-black"
            type="button"
          >
            <SiteIcon className="h-5 w-5" name="search" />
            <span className="font-wedoo-body text-sm italic">
              {candidateDashboardResponseMock.searchPlaceholder}
            </span>
          </button>
          <button
            aria-label="Filtra opportunita"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-black/10 bg-white/66 text-black"
            type="button"
          >
            <SiteIcon className="h-5 w-5" name="filter" />
          </button>
        </div>

        <div className={cn("border-t border-black/10 pb-4 lg:hidden", isOpen ? "block" : "hidden")}>
          <nav aria-label="Navigazione portale candidato mobile" className="grid gap-2 pt-4">
            {portalNavigation.candidate.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "rounded-[10px] px-3 py-2 font-wedoo-accent text-[0.98rem] transition",
                    isActive ? "bg-white/82 text-brand-violet-deep" : "text-black",
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
    <header className="border-b border-white/12 bg-[linear-gradient(180deg,rgba(116,71,225,0.92),rgba(116,71,225,0.86))] px-4 md:px-6">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex min-h-[68px] items-center gap-4 py-3">
          <nav
            aria-label="Navigazione portale azienda"
            className="hidden lg:flex lg:items-center lg:gap-2"
          >
            {companyPrimaryNavigation.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "rounded-full px-3 py-2 font-wedoo-accent text-[0.94rem] leading-none transition",
                    isActive
                      ? "bg-white/88 text-brand-violet shadow-[0_14px_32px_-24px_rgba(16,25,36,0.34)]"
                      : "text-white/90 hover:bg-white/10 hover:text-white",
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
                    "inline-flex min-h-[38px] items-center justify-center rounded-full border px-4 py-2 font-wedoo-accent text-[0.9rem] leading-none transition",
                    isActive
                      ? "border-white bg-white text-brand-violet"
                      : "border-white/28 bg-white/10 text-white hover:border-white/50",
                  )
                }
                to={companySecondaryNavigation.to}
              >
                {companySecondaryNavigation.label}
              </NavLink>
            ) : null}
          </nav>

          <div className="ml-auto hidden items-center gap-4 lg:flex">
            <button
              aria-label="Cerca opportunità"
              className="inline-flex min-h-[38px] items-center gap-2.5 rounded-full border border-white/18 bg-white/12 px-4 text-white transition hover:bg-white/18"
              type="button"
            >
              <SiteIcon className="h-4.5 w-4.5" name="search" />
              <span className="font-wedoo-body text-[0.9rem] italic leading-none">
                {companyDashboardResponseMock.searchPlaceholder}
              </span>
            </button>

            <button
              aria-label="Filtra candidati"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/18 bg-white/12 text-white transition hover:bg-white/18"
              type="button"
            >
              <SiteIcon className="h-4.5 w-4.5" name="filter" />
            </button>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white lg:h-12 lg:w-12">
              <img
                alt={companyProfile.companyName}
                className="h-6 w-6 object-contain lg:h-8 lg:w-8"
                src={assetPath(companyProfile.companyLogo)}
              />
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-3 lg:hidden">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white">
              <img
                alt={companyProfile.companyName}
                className="h-7 w-7 object-contain"
                src={assetPath(companyProfile.companyLogo)}
              />
            </div>
            <p className="line-clamp-2 font-wedoo-accent text-[0.96rem] leading-none text-white">
              {companyProfile.companyName}
            </p>
          </div>

          <button
            aria-expanded={isOpen}
            aria-label={
              isOpen
                ? "Chiudi navigazione portale azienda"
                : "Apri navigazione portale azienda"
            }
            className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/28 bg-white/12 text-white lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <SiteIcon className="h-5 w-5" name={isOpen ? "close" : "menu"} />
          </button>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-white/20 py-3 lg:hidden">
          <button
            aria-label="Cerca opportunità"
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-[12px] border border-white/18 bg-white/12 px-3 py-2 text-white"
            type="button"
          >
            <SiteIcon className="h-5 w-5" name="search" />
            <span className="font-wedoo-body text-sm italic">
              {companyDashboardResponseMock.searchPlaceholder}
            </span>
          </button>
          <button
            aria-label="Filtra candidati"
            className="inline-flex h-10 w-10 items-center justify-center rounded-[12px] border border-white/18 bg-white/12 text-white"
            type="button"
          >
            <SiteIcon className="h-5 w-5" name="filter" />
          </button>
        </div>

        <div className={cn("border-t border-white/20 pb-4 lg:hidden", isOpen ? "block" : "hidden")}>
          <nav aria-label="Navigazione portale azienda mobile" className="grid gap-2 pt-4">
            {portalNavigation.company.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "rounded-[10px] px-3 py-2 font-wedoo-accent text-[0.98rem] transition",
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
