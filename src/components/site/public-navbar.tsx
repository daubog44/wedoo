
import { Link } from "react-router-dom";
import { cn } from "../../lib/site-utils";
import { WedooLogo } from "./branding";
import { SiteIcon } from "./site-icon";

const actionClass =
  "inline-flex items-center justify-center rounded-xl border px-4 py-2 text-sm transition";

export function SdgStrip({ className }: { className?: string }) {
  const sdgColors = [
    "#E5243B", "#DDA63A", "#4C9F38", "#C5192D", "#FF3A21", "#26BDE2", "#FCC30B",
    "#A21942", "#FD6925", "#DD1367", "#FD9D24", "#BF8B2E", "#3F7E44", "#0A97D9",
    "#56C02B", "#00689D", "#19486A"
  ];
  return (
    <div className={cn("flex h-1.5 w-full", className)}>
      {sdgColors.map((color, i) => (
        <div key={i} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

export function PublicNavbar() {
  return (
    <header className="bg-white">
      <div className="mx-auto max-w-7xl bg-white">
        
        {/* Top Row: Logo & Language */}
        <div className="flex items-center justify-between px-4 py-4 md:px-8">
          <WedooLogo />
          
          <div className="hidden items-center gap-4 md:flex">
            <Link
              className={cn(
                actionClass,
                "border-slate-900 text-slate-900 hover:bg-slate-100",
              )}
              to="/accedi"
            >
              accedi
            </Link>
            <Link
              className={cn(
                actionClass,
                "border-brand-violet-600 bg-brand-violet-600 text-white hover:border-brand-violet-deep hover:bg-brand-violet-deep",
              )}
              to="/registrati"
            >
              registrati
            </Link>
            <Link
              className="px-2 py-2 text-sm text-slate-900 transition hover:text-brand-violet-600 hover:underline"
              to="/azienda"
            >
              sei un'azienda?
            </Link>
            <details className="relative ml-2">
              <summary className="wedoo-dropdown-summary inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700">
                ita <SiteIcon className="h-3 w-3" name="chevron-down" />
              </summary>
            </details>
          </div>

          <div className="md:hidden">
            <details className="relative">
              <summary className="wedoo-dropdown-summary inline-flex cursor-pointer items-center gap-1 rounded-lg border border-slate-200 bg-white px-2 py-1 text-sm text-slate-700">
                ita <SiteIcon className="h-3 w-3" name="chevron-down" />
              </summary>
            </details>
          </div>
        </div>

        {/* Mobile Row: Actions */}
        <div className="flex flex-col items-center gap-2 pb-3 md:hidden">
          <div className="flex items-center justify-center gap-3">
            <Link
              className={cn(
                actionClass,
                "border-slate-400 text-slate-700 hover:bg-slate-100 min-w-[100px]",
              )}
              to="/accedi"
            >
              accedi
            </Link>
            <Link
              className={cn(
                actionClass,
                "min-w-[100px] border-brand-violet-600 bg-brand-violet-600 text-white hover:border-brand-violet-deep hover:bg-brand-violet-deep",
              )}
              to="/registrati"
            >
              registrati
            </Link>
          </div>
          <Link
            className="mt-1 text-[0.95rem] tracking-wide text-slate-900 transition hover:text-brand-violet-600 hover:underline"
            to="/azienda"
          >
            sei un'azienda?
          </Link>
        </div>

        <SdgStrip />
      </div>
    </header>
  );
}
