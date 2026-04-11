import { useState } from "react";
import { NavLink } from "react-router-dom";
import { candidateDashboardResponseMock } from "../../data/candidate-dashboard";
import { portalNavigation } from "../../data/site-content";
import type { PortalRole } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { WedooLogo } from "./branding";
import { SiteIcon } from "./site-icon";

const roleTheme = {
  candidate: {
    active: "border-black text-black",
    background: "bg-brand-mint-200",
    link: "text-black hover:border-brand-mint-deep",
    logo: "candidate" as const,
    menu: "border-slate-200 bg-white text-black",
    profile: "bg-brand-mint-deep text-brand-ink hover:bg-brand-mint",
  },
  company: {
    active: "border-white text-white",
    background: "bg-brand-violet",
    link: "text-white hover:border-white/80",
    logo: "company" as const,
    menu: "border-white/20 bg-brand-violet text-white",
    profile: "bg-white/15 text-white hover:bg-white/25",
  },
} as const;

const candidateProfile = candidateDashboardResponseMock.profile;

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

export function PortalNavbar({ role }: { role: PortalRole }) {
  if (role === "candidate") {
    return <CandidatePortalNavbar />;
  }

  return <CompanyPortalNavbar />;
}

function CompanyPortalNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const theme = roleTheme.company;

  return (
    <header className={cn("px-4 py-4 md:px-8", theme.background)}>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4">
          <WedooLogo imageClassName="h-12" variant={theme.logo} />
          <button
            aria-expanded={isOpen}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-xl border text-xl md:hidden",
              theme.menu,
            )}
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <SiteIcon className="h-5 w-5" name={isOpen ? "close" : "menu"} />
          </button>
          <div
            className={cn(
              "absolute left-4 right-4 top-[4.7rem] z-30 rounded-3xl border p-4 shadow-lg md:static md:flex md:w-auto md:items-center md:gap-2 md:rounded-none md:border-0 md:bg-transparent md:p-0 md:shadow-none",
              theme.menu,
              isOpen ? "flex flex-col gap-3" : "hidden md:flex",
            )}
          >
            {portalNavigation.company.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "inline-flex items-center justify-center rounded-xl border border-transparent px-4 py-2 text-sm transition",
                    theme.link,
                    isActive && theme.active,
                  )
                }
                key={item.to}
                onClick={() => setIsOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
            <details className="relative">
              <summary
                className={cn(
                  "wedoo-dropdown-summary inline-flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2 text-sm transition",
                  theme.profile,
                )}
              >
                profilo
                <SiteIcon className="h-3 w-3" name="chevron-down" />
              </summary>
              <div
                className={cn(
                  "absolute right-0 mt-2 min-w-[10rem] rounded-2xl border px-2 py-2 shadow-xl",
                  theme.menu,
                )}
              >
                {["account", "messaggi", "help", "esci"].map((item) => (
                  <span
                    className="block px-3 py-2 text-sm opacity-70"
                    key={item}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
