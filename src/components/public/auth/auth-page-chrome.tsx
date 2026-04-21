import type { ReactNode } from "react";
import { cn } from "../../../lib/site-utils";
import { WedooThemeToggle } from "../../common/wedoo-theme-toggle";
import { SiteIcon, WedooLogo } from "../../site";

export function AuthLanguageChip({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--wedoo-toggle-border)] bg-[var(--wedoo-toggle-bg)] text-[var(--wedoo-toggle-text)] shadow-[var(--wedoo-toggle-shadow)] transition hover:border-[var(--wedoo-toggle-border-strong)] hover:bg-[var(--wedoo-toggle-bg-hover)]",
        compact ? "h-[2rem] min-w-[3.6rem] px-2.5 text-[0.76rem]" : "h-[2.35rem] min-w-[4.2rem] px-3 text-[0.82rem]",
        className,
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className="h-4 w-4" name="chevron-down" />
    </button>
  );
}

export function AuthLogo({
  className,
  compact = false,
  imgClassName,
}: {
  className?: string;
  compact?: boolean;
  imgClassName?: string;
}) {
  return (
    <WedooLogo
      className={className}
      imageClassName={cn(compact ? "h-8 md:h-8" : "h-9 md:h-10", imgClassName)}
      variant="wordmark"
    />
  );
}

export function AuthTopBar({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "glass-panel flex items-center justify-between gap-4 px-4 py-3 md:px-6",
        compact && "rounded-[1rem] px-4 py-3",
        className,
      )}
    >
      <AuthLogo compact={compact} />
      <div className="flex items-center gap-2">
        <WedooThemeToggle compact={compact} />
        <AuthLanguageChip compact={compact} />
      </div>
    </div>
  );
}

export function AuthFormPanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "wedoo-theme-shell rounded-[1.5rem] px-5 py-5 md:px-6 md:py-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AuthWorkspacePanel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "wedoo-workspace relative overflow-hidden rounded-[1.8rem] px-6 py-7 text-[var(--wedoo-workspace-text)] shadow-[0_40px_110px_-72px_rgba(4,10,20,0.92)] md:px-8 md:py-8",
        className,
      )}
    >
      <div className="spot-orb -right-8 top-0 h-44 w-44 bg-[rgba(112,72,232,0.18)]" />
      <div className="spot-orb -left-4 top-20 h-40 w-40 bg-[rgba(87,215,180,0.12)]" />
      <div className="relative z-10">{children}</div>
    </article>
  );
}
