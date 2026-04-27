import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { cn } from "../../lib/site-utils";
import { WedooThemeToggle } from "../common/wedoo-theme-toggle";
import { WedooLogo } from "./branding";
import { SiteIcon } from "./site-icon";

type PublicNavbarProps = {
  className?: string;
  onSignInClick?: () => void;
  onSignUpClick?: () => void;
};

const navItems = [
  { label: "info", to: "/info" },
  { label: "articoli", to: "/articoli" },
  { label: "podcast", to: "/podcast" },
] as const;

const shellButtonClass =
  "inline-flex min-h-[46px] items-center justify-center rounded-full border px-5 font-wedoo-accent text-sm font-medium tracking-normal transition";

function NavbarAction({
  children,
  className,
  onClick,
  to,
}: {
  children: string;
  className: string;
  onClick?: () => void;
  to?: string;
}) {
  if (to) {
    return (
      <Link className={className} to={to}>
        {children}
      </Link>
    );
  }

  return (
    <button className={className} onClick={onClick} type="button">
      {children}
    </button>
  );
}

export function PublicNavbar({ className, onSignInClick, onSignUpClick }: PublicNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const hasModalActions = Boolean(onSignInClick || onSignUpClick);

  return (
    <header className={cn("px-4 pt-5 md:px-8 md:pt-6", className)}>
      <div className="mx-auto max-w-[1360px]">
        <div className="glass-panel flex flex-col gap-3 px-4 py-4 md:gap-4 md:px-6">
          <div className="flex items-center gap-4">
            <WedooLogo imageClassName="h-9 md:h-10" />

            <nav aria-label="Navigazione pubblica Wedoo" className="ml-4 hidden items-center gap-2 xl:flex">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "rounded-full px-4 py-2 font-wedoo-accent text-[0.92rem] transition",
                      isActive || pathname === item.to
                        ? "border border-[var(--wedoo-ghost-border-strong)] bg-[var(--wedoo-ghost-bg-hover)] text-[var(--wedoo-ghost-text)]"
                        : "text-[var(--wedoo-ink-muted)] hover:text-[var(--wedoo-ink-strong)]",
                    )
                  }
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="ml-auto flex items-center gap-3">
              <WedooThemeToggle className="h-10 min-w-[5.4rem] text-[0.78rem] md:h-[46px] md:min-w-[6.9rem] md:text-[0.82rem]" />

              <div
                aria-label={hasModalActions ? "Azioni autenticazione home" : "Azioni autenticazione pubbliche"}
                className="hidden items-center gap-3 lg:flex"
                role="group"
              >
                <NavbarAction
                  className={cn(
                    shellButtonClass,
                    "wedoo-theme-ghost-button hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]",
                  )}
                  onClick={onSignInClick}
                  to={hasModalActions && onSignInClick ? undefined : "/accedi"}
                >
                  accedi
                </NavbarAction>

                <NavbarAction
                  className={cn(
                    shellButtonClass,
                    "border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[0_18px_40px_-28px_rgba(112,72,232,0.52)] hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]",
                  )}
                  onClick={onSignUpClick}
                  to={hasModalActions && onSignUpClick ? undefined : "/registrati"}
                >
                  registrati
                </NavbarAction>

                <Link
                  className={cn(
                    shellButtonClass,
                    "wedoo-theme-ghost-button min-w-[11rem] hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]",
                  )}
                  to="/azienda"
                >
                  sei un&apos;azienda?
                </Link>

                <button
                  aria-label="Lingua italiana"
                  className="wedoo-theme-ghost-button inline-flex h-[46px] min-w-[4.4rem] items-center justify-center gap-2 rounded-full px-3 text-sm"
                  type="button"
                >
                  <span>ita</span>
                  <SiteIcon className="h-4 w-4" name="chevron-down" />
                </button>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <button
                  aria-expanded={isMobileMenuOpen}
                  aria-label={isMobileMenuOpen ? "Chiudi menu pubblico" : "Apri menu pubblico"}
                  className="wedoo-theme-ghost-button inline-flex h-10 w-10 items-center justify-center rounded-[14px]"
                  onClick={() => setIsMobileMenuOpen((value) => !value)}
                  type="button"
                >
                  <SiteIcon className="h-5 w-5" name={isMobileMenuOpen ? "close" : "menu"} />
                </button>
              </div>
            </div>
          </div>

          <div
            aria-label={hasModalActions ? "Azioni autenticazione home" : "Azioni autenticazione pubbliche"}
            className="grid gap-3 lg:hidden"
            role="group"
          >
            <div className="grid grid-cols-3 gap-2">
              <NavbarAction
                className={cn(
                  shellButtonClass,
                  "wedoo-theme-ghost-button min-h-[40px] rounded-[14px] px-2 text-[0.82rem]",
                )}
                onClick={onSignInClick}
                to={hasModalActions && onSignInClick ? undefined : "/accedi"}
              >
                accedi
              </NavbarAction>

              <NavbarAction
                className={cn(
                  shellButtonClass,
                  "min-h-[40px] rounded-[14px] border-transparent bg-[var(--wedoo-violet)] px-2 text-[0.82rem] text-[var(--wedoo-white-soft)]",
                )}
                onClick={onSignUpClick}
                to={hasModalActions && onSignUpClick ? undefined : "/registrati"}
              >
                registrati
              </NavbarAction>

              <Link
                className="wedoo-theme-ghost-button inline-flex min-h-[40px] items-center justify-center rounded-[14px] px-2 text-center font-wedoo-accent text-[0.76rem] leading-tight"
                to="/azienda"
              >
                sei un&apos;azienda?
              </Link>
            </div>
          </div>

          <div className={cn("grid gap-3 lg:hidden", isMobileMenuOpen ? "grid" : "hidden")}>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              {navItems.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    cn(
                      "wedoo-theme-ghost-button inline-flex min-h-[44px] items-center justify-center rounded-[16px] px-4 font-wedoo-accent text-sm transition",
                      isActive || pathname === item.to
                        ? "border-[var(--wedoo-ghost-border-strong)] bg-[var(--wedoo-ghost-bg-hover)] text-[var(--wedoo-ghost-text)]"
                        : "text-[var(--wedoo-ink-muted)]",
                    )
                  }
                  key={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="grid grid-cols-[1fr_auto] gap-2">
              <span className="wedoo-theme-ghost-button inline-flex min-h-[44px] items-center justify-center rounded-[16px] px-4 font-wedoo-accent text-sm text-[var(--wedoo-ink-muted)]">
                navigazione pubblica
              </span>
              <button
                aria-label="Lingua italiana"
                className="wedoo-theme-ghost-button inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[16px] px-4 text-sm"
                type="button"
                >
                  <span>ita</span>
                  <SiteIcon className="h-4 w-4" name="chevron-down" />
                </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
