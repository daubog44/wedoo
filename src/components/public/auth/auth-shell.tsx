import type { ButtonHTMLAttributes, ComponentPropsWithoutRef, ReactNode } from "react";
import { Link } from "react-router-dom";
import { SiteIcon } from "../../site";
import { assetPath, cn } from "../../../lib/site-utils";

type PublicActionTone = "ghost" | "mint" | "violet";

const publicActionToneClassName: Record<PublicActionTone, string> = {
  ghost:
    "border border-brand-violet-100 bg-white/92 text-brand-ink shadow-[0_14px_32px_-26px_rgba(45,35,82,0.14)] hover:border-brand-violet-300 hover:bg-white",
  mint:
    "border border-brand-mint-300 bg-brand-mint-200 text-brand-ink shadow-[0_16px_34px_-24px_rgba(72,198,160,0.2)] hover:bg-brand-mint-300",
  violet:
    "border border-brand-violet bg-brand-violet text-[var(--wedoo-white-soft)] shadow-[0_16px_34px_-24px_rgba(91,63,209,0.24)] hover:bg-brand-violet-600",
};

function publicActionClassName(tone: PublicActionTone, compact: boolean, fullWidth: boolean) {
  return cn(
    "font-wedoo-accent inline-flex items-center justify-center rounded-[11px] px-4.5 text-center leading-none transition duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-violet",
    compact ? "min-h-[44px] text-[16px]" : "min-h-[48px] text-[18px]",
    fullWidth ? "w-full" : "",
    publicActionToneClassName[tone],
  );
}

export function PublicLanguageChip({
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
        "font-wedoo-accent inline-flex items-center justify-center gap-2 rounded-full border border-black/8 bg-white/88 text-brand-ink shadow-[0_10px_24px_-20px_rgba(16,25,36,0.12)]",
        compact ? "h-[28px] min-w-[54px] px-3 text-[12px]" : "h-[34px] min-w-[60px] px-3.5 text-[14px]",
        className,
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} name="chevron-down" />
    </button>
  );
}

export function PublicWordmark({ compact = false, to = "/" }: { compact?: boolean; to?: string }) {
  return (
    <Link to={to}>
      <img
        alt="Wedoo"
        className={compact ? "h-[40px] w-[152px] object-contain" : "h-[54px] w-[206px] object-contain"}
        src={assetPath("Frame-2@2x.png")}
      />
    </Link>
  );
}

export function PublicPageHeader({
  compact = false,
  to = "/",
}: {
  compact?: boolean;
  to?: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <PublicWordmark compact={compact} to={to} />
      <PublicLanguageChip compact={compact} />
    </div>
  );
}

export function PublicBackdrop({
  compact = false,
  tone = "violet",
}: {
  compact?: boolean;
  tone?: "mint" | "violet";
}) {
  return (
    <>
      <div
        aria-hidden="true"
        className={cn(
          "absolute rounded-full blur-3xl",
          tone === "mint" ? "bg-brand-mint/45" : "bg-brand-violet-200/60",
        compact ? "-left-8 top-24 h-24 w-24" : "-left-12 top-24 h-44 w-44",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute rounded-full blur-3xl",
          tone === "mint" ? "bg-brand-violet-200/60" : "bg-brand-mint/45",
        compact ? "right-0 top-10 h-20 w-20" : "right-8 top-8 h-40 w-40",
        )}
      />
      <div
        aria-hidden="true"
        className={cn(
          "absolute rounded-full blur-3xl",
          tone === "mint" ? "bg-brand-mint-200/55" : "bg-brand-violet-100/70",
        compact ? "bottom-20 right-2 h-[4.5rem] w-[4.5rem]" : "bottom-16 left-1/2 h-36 w-36 -translate-x-1/2",
        )}
      />
    </>
  );
}

type PublicActionButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  compact?: boolean;
  fullWidth?: boolean;
  tone?: PublicActionTone;
};

export function PublicActionButton({
  children,
  className,
  compact = false,
  fullWidth = false,
  tone = "violet",
  type = "button",
  ...props
}: PublicActionButtonProps) {
  return (
    <button
      className={cn(publicActionClassName(tone, compact, fullWidth), className)}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

type PublicActionLinkProps = ComponentPropsWithoutRef<typeof Link> & {
  children: ReactNode;
  compact?: boolean;
  fullWidth?: boolean;
  tone?: PublicActionTone;
};

export function PublicActionLink({
  children,
  className,
  compact = false,
  fullWidth = false,
  tone = "ghost",
  ...props
}: PublicActionLinkProps) {
  return (
    <Link
      className={cn(publicActionClassName(tone, compact, fullWidth), className)}
      {...props}
    >
      {children}
    </Link>
  );
}

export function PublicProviderButton({
  children,
  className,
  compact = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  compact?: boolean;
}) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center rounded-[12px] border border-brand-violet-100 bg-white/92 text-brand-ink shadow-[0_14px_30px_-24px_rgba(16,25,36,0.12)] transition duration-200 hover:-translate-y-0.5 hover:border-brand-violet-300 hover:bg-white",
        compact ? "min-h-[42px] px-4 text-[15px]" : "min-h-[46px] px-5 text-[16px]",
        className,
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
