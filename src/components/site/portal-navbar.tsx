import { useState } from "react";
import { NavLink } from "react-router-dom";
import { portalNavigation } from "../../data/site-content";
import type { PortalRole } from "../../data/types";
import { cn } from "../../lib/site-utils";
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

export function PortalNavbar({ role }: { role: PortalRole }) {
  const [isOpen, setIsOpen] = useState(false);
  const theme = roleTheme[role];

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
            {portalNavigation[role].map((item) => (
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
