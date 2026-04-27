import { useState } from "react";
import { NavLink } from "react-router-dom";
import { WedooThemeToggle } from "../common/wedoo-theme-toggle";
import { candidateDashboardResponseMock } from "../../data/candidate-dashboard";
import { companyDashboardResponseMock } from "../../data/company-dashboard";
import { portalNavigation } from "../../data/site-content";
import type { PortalRole } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { WedooLogo } from "./branding";
import { SiteIcon } from "./site-icon";

const candidateProfile = candidateDashboardResponseMock.profile;
const companyProfile = companyDashboardResponseMock.profile;

const portalRoleConfig = {
  candidate: {
    accentBorder: "border-[rgba(87,215,180,0.3)]",
    accentLink: "text-[var(--wedoo-mint)]",
    accentPill: "bg-[rgba(87,215,180,0.14)] text-[var(--wedoo-mint)]",
    accentTag: "candidate workspace",
    closeLabel: "Chiudi navigazione portale",
    mobileNavLabel: "Navigazione portale candidato mobile",
    navLabel: "Navigazione portale candidato",
    openLabel: "Apri navigazione portale",
    profileLabel: candidateProfile.fullName,
    role: "candidate" as const,
    searchLabel: "Cerca opportunita",
    searchPlaceholder: candidateDashboardResponseMock.searchPlaceholder,
    secondaryLabel: "Filtra opportunita",
  },
  company: {
    accentBorder: "border-[rgba(112,72,232,0.3)]",
    accentLink: "text-[var(--wedoo-violet)]",
    accentPill: "bg-[rgba(112,72,232,0.18)] text-[var(--wedoo-violet)]",
    accentTag: "company workspace",
    closeLabel: "Chiudi navigazione portale azienda",
    mobileNavLabel: "Navigazione portale azienda mobile",
    navLabel: "Navigazione portale azienda",
    openLabel: "Apri navigazione portale azienda",
    profileLabel: companyProfile.companyName,
    role: "company" as const,
    searchLabel: "Cerca opportunità",
    searchPlaceholder: companyDashboardResponseMock.searchPlaceholder,
    secondaryLabel: "Filtra candidati",
  },
} as const;

function PortalDesktopProfile({ role }: { role: PortalRole }) {
  if (role === "candidate") {
    return (
      <img
        alt={candidateProfile.fullName}
        className="h-11 w-11 rounded-full border border-[var(--wedoo-workspace-line)] object-cover"
        src={assetPath(candidateProfile.avatar)}
      />
    );
  }

  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-panel-bg)]">
      <img alt={companyProfile.companyName} className="h-7 w-7 object-contain" src={assetPath(companyProfile.companyLogo)} />
    </div>
  );
}

function PortalMobileProfile({ role }: { role: PortalRole }) {
  if (role === "candidate") {
    return (
      <img
        alt={candidateProfile.fullName}
        className="h-10 w-10 rounded-full border border-[var(--wedoo-workspace-line)] object-cover"
        src={assetPath(candidateProfile.avatar)}
      />
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-panel-bg)]">
      <img alt={companyProfile.companyName} className="h-6 w-6 object-contain" src={assetPath(companyProfile.companyLogo)} />
    </div>
  );
}

function PortalNavItem({
  itemLabel,
  pill = false,
  role,
  to,
}: {
  itemLabel: string;
  pill?: boolean;
  role: PortalRole;
  to: string;
}) {
  const config = portalRoleConfig[role];

  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "font-wedoo-accent rounded-full px-3 py-2 text-[0.88rem] transition",
          pill
            ? isActive
              ? config.accentPill
              : "wedoo-theme-ghost-button text-[var(--wedoo-workspace-text)] hover:border-[var(--wedoo-toggle-border-strong)]"
            : isActive
              ? config.accentLink
              : "text-[var(--wedoo-workspace-muted)] hover:text-[var(--wedoo-workspace-text)]",
        )
      }
      end={to === "/portale/candidato" || to === "/portale/azienda"}
      to={to}
    >
      {itemLabel}
    </NavLink>
  );
}

function PortalNavbarShell({ role }: { role: PortalRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const config = portalRoleConfig[role];
  const navigation = portalNavigation[role];

  return (
    <header className="border-b border-[var(--wedoo-workspace-line)] bg-[rgba(7,13,24,0.84)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1440px] px-4 md:px-8 xl:px-10">
        <div className="flex min-h-[62px] items-center gap-3 md:min-h-[74px]">
          <div className="flex min-w-0 items-center gap-3">
            <WedooLogo imageClassName="h-7 md:h-9" variant={role === "candidate" ? "candidate" : "company"} />
            <span
              className={cn(
                "hidden rounded-full border px-3 py-1.5 text-[0.64rem] font-semibold uppercase tracking-normal md:inline-flex",
                config.accentBorder,
                config.accentLink,
              )}
            >
              {config.accentTag}
            </span>
          </div>

          <nav aria-label={config.navLabel} className="ml-3 hidden items-center gap-1.5 lg:flex">
            {navigation.map((item) => (
              <PortalNavItem
                itemLabel={item.label}
                key={item.to}
                pill={role === "company" && item.to === "/portale/azienda/annunci"}
                role={role}
                to={item.to}
              />
            ))}
          </nav>

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <button
              aria-label={config.searchLabel}
              className="wedoo-theme-ghost-button inline-flex min-h-[40px] items-center gap-2 rounded-full px-3.5 text-[var(--wedoo-workspace-muted)] transition hover:border-[var(--wedoo-toggle-border-strong)] hover:text-[var(--wedoo-workspace-text)]"
              type="button"
            >
              <SiteIcon className="h-4 w-4" name="search" />
              <span className="font-wedoo-body text-xs italic leading-none">
                {role === "company" ? "cerca candidati" : config.searchPlaceholder}
              </span>
            </button>

            <WedooThemeToggle />

            <button
              aria-label={config.secondaryLabel}
              className="wedoo-theme-ghost-button inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--wedoo-workspace-muted)] transition hover:border-[var(--wedoo-toggle-border-strong)] hover:text-[var(--wedoo-workspace-text)]"
              type="button"
            >
              <SiteIcon className="h-4 w-4" name="filter" />
            </button>

            <PortalDesktopProfile role={role} />
          </div>

          <div className="ml-auto flex min-w-0 items-center gap-2 lg:hidden">
            <WedooThemeToggle compact />
            <PortalMobileProfile role={role} />
            <button
              aria-expanded={isOpen}
              aria-label={isOpen ? config.closeLabel : config.openLabel}
              className="wedoo-theme-ghost-button inline-flex h-10 w-10 items-center justify-center rounded-[14px] text-[var(--wedoo-workspace-text)]"
              onClick={() => setIsOpen((value) => !value)}
              type="button"
            >
              <SiteIcon className="h-5 w-5" name={isOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 border-t border-[var(--wedoo-workspace-line)] py-3 lg:hidden">
          <button
            aria-label={config.searchLabel}
            className="wedoo-theme-ghost-button inline-flex min-h-[40px] flex-1 items-center justify-center gap-2 rounded-[14px] px-3 text-[var(--wedoo-workspace-muted)]"
            type="button"
          >
            <SiteIcon className="h-4 w-4" name="search" />
            <span className="font-wedoo-body text-sm italic">
              {role === "company" ? "cerca candidati" : config.searchPlaceholder}
            </span>
          </button>
          <button
            aria-label={config.secondaryLabel}
            className="wedoo-theme-ghost-button inline-flex h-10 w-10 items-center justify-center rounded-[14px] text-[var(--wedoo-workspace-muted)]"
            type="button"
          >
            <SiteIcon className="h-4 w-4" name="filter" />
          </button>
        </div>

        <div className={cn("pb-4 lg:hidden", isOpen ? "block" : "hidden")}>
          <nav aria-label={config.mobileNavLabel} className="grid gap-2 rounded-[1.2rem] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface)] p-3 backdrop-blur">
            <div className="mb-1 flex items-center gap-3 rounded-[1rem] border border-white/10 bg-white/4 px-3 py-3">
              <PortalMobileProfile role={role} />
              <p className="min-w-0 text-sm leading-5 text-[var(--wedoo-workspace-text)]">{config.profileLabel}</p>
            </div>
            {navigation.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  cn(
                    "rounded-[12px] px-4 py-3 font-wedoo-accent text-[0.95rem] transition",
                    isActive
                      ? config.accentPill
                      : "text-[var(--wedoo-workspace-muted)] hover:bg-[var(--wedoo-ghost-bg-hover)] hover:text-[var(--wedoo-workspace-text)]",
                  )
                }
                end={item.to === "/portale/candidato" || item.to === "/portale/azienda"}
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
  return <PortalNavbarShell role={role} />;
}
