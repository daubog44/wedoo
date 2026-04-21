import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { AppIcon } from "../../lib/icons";
import type { MajesticonName } from "../../lib/majesticons-map";
import { cn } from "../../lib/site-utils";

export type Tone = "violet" | "mint" | "gold" | "ghost" | "ink";
export type FigmaButtonSurface = "flat" | "raised";
export type RoleButtonTone = "candidate" | "company";
export type DiscoverButtonTone = "gold" | "rose" | "lavender";
export type SupportButtonTone = "violet" | "ink";
export type SupportButtonVariant = "filled" | "outline";

const buttonBaseClassName =
  "inline-flex items-center justify-center gap-2 rounded-[16px] border px-4 py-3 font-wedoo-accent text-[0.95rem] font-medium tracking-[-0.02em] transition duration-200 ease-out hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-50";

const toneClasses: Record<Tone, string> = {
  violet:
    "border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(112,72,232,0.48)] hover:bg-[var(--wedoo-violet-hover)]",
  mint:
    "border-transparent bg-[var(--wedoo-mint)] text-[var(--wedoo-ink)] shadow-[0_20px_48px_-34px_rgba(87,215,180,0.46)] hover:bg-[var(--wedoo-support-hover)] hover:text-[var(--wedoo-white-soft)]",
  gold:
    "border-transparent bg-[var(--wedoo-gold)] text-[var(--wedoo-ink)] shadow-[0_20px_48px_-34px_rgba(223,174,68,0.42)] hover:bg-[var(--wedoo-gold-700)] hover:text-[var(--wedoo-white-soft)]",
  ghost:
    "border-[var(--wedoo-ghost-border)] bg-[var(--wedoo-ghost-bg)] text-[var(--wedoo-ghost-text)] hover:border-[var(--wedoo-violet)] hover:bg-[var(--wedoo-ghost-bg-hover)] hover:text-[var(--wedoo-violet)]",
  ink:
    "border-transparent bg-[var(--wedoo-ink)] text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(18,24,38,0.54)] hover:bg-[var(--wedoo-violet)]",
};

const figmaButtonBaseClassName = cn(buttonBaseClassName, "rounded-[14px] text-[1rem] leading-none");

const roleButtonClasses: Record<RoleButtonTone, Record<FigmaButtonSurface, string>> = {
  candidate: {
    flat:
      "border-[var(--wedoo-ghost-border)] bg-[var(--wedoo-ghost-bg)] text-[var(--wedoo-ghost-text)] hover:border-[var(--wedoo-mint)] hover:bg-[var(--wedoo-ghost-bg-hover)] hover:text-[var(--wedoo-mint-700)]",
    raised:
      "border-transparent bg-[var(--wedoo-mint)] text-[var(--wedoo-ink)] shadow-[var(--wedoo-button-elevated-shadow)] hover:bg-[var(--wedoo-support-hover)] hover:text-[var(--wedoo-white-soft)]",
  },
  company: {
    flat:
      "border-[var(--wedoo-ghost-border)] bg-[var(--wedoo-ghost-bg)] text-[var(--wedoo-ghost-text)] hover:border-[var(--wedoo-violet)] hover:bg-[var(--wedoo-ghost-bg-hover)] hover:text-[var(--wedoo-violet)]",
    raised:
      "border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[var(--wedoo-button-elevated-shadow)] hover:bg-[var(--wedoo-violet-hover)]",
  },
};

const discoverButtonClasses: Record<DiscoverButtonTone, Record<FigmaButtonSurface, string>> = {
  gold: {
    flat: "border-transparent bg-[var(--wedoo-gold-soft)] text-[var(--wedoo-ink)] hover:bg-[var(--wedoo-gold-100)]",
    raised:
      "border-transparent bg-[var(--wedoo-gold)] text-[var(--wedoo-ink)] shadow-[0_22px_48px_-34px_rgba(223,174,68,0.46)] hover:bg-[var(--wedoo-gold-700)] hover:text-[var(--wedoo-white-soft)]",
  },
  rose: {
    flat: "border-transparent bg-[var(--wedoo-rose-soft)] text-[var(--wedoo-ink)] hover:bg-[var(--wedoo-rose-100)]",
    raised:
      "border-transparent bg-[var(--wedoo-rose)] text-[var(--wedoo-ink)] shadow-[0_22px_48px_-34px_rgba(243,131,157,0.4)] hover:bg-[var(--wedoo-rose-700)] hover:text-[var(--wedoo-white-soft)]",
  },
  lavender: {
    flat: "border-transparent bg-[var(--wedoo-surface-violet)] text-[var(--wedoo-violet)] hover:bg-[var(--wedoo-violet-50)]",
    raised:
      "border-transparent bg-[var(--wedoo-violet-100)] text-[var(--wedoo-violet-800)] shadow-[0_22px_48px_-34px_rgba(170,136,255,0.34)] hover:bg-[var(--wedoo-violet-300)] hover:text-[var(--wedoo-white-soft)]",
  },
};

const supportButtonClasses: Record<SupportButtonTone, Record<SupportButtonVariant, string>> = {
  violet: {
    filled:
      "border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[0_22px_48px_-34px_rgba(112,72,232,0.48)] hover:bg-[var(--wedoo-violet-hover)]",
    outline:
      "border-[rgba(255,255,255,0.32)] bg-transparent text-[var(--wedoo-white-soft)] hover:border-white/70 hover:bg-white/8",
  },
  ink: {
    filled:
      "border-transparent bg-[var(--wedoo-ink)] text-[var(--wedoo-white-soft)] shadow-[0_22px_48px_-34px_rgba(18,24,38,0.56)] hover:bg-[var(--wedoo-violet)]",
    outline:
      "border-[var(--wedoo-ghost-border)] bg-[var(--wedoo-ghost-bg)] text-[var(--wedoo-ghost-text)] hover:border-[var(--wedoo-ink)] hover:bg-[var(--wedoo-ghost-bg-hover)]",
  },
};

type ButtonLinkProps = {
  children: ReactNode;
  className?: string;
  external?: boolean;
  icon?: MajesticonName;
  rel?: string;
  target?: string;
  to: string;
  tone?: Tone;
};

export function ButtonLink({
  children,
  className,
  external = false,
  icon,
  rel,
  target,
  to,
  tone = "violet",
}: ButtonLinkProps) {
  const classes = cn(buttonBaseClassName, toneClasses[tone], className);

  const content = (
    <>
      {icon ? <AppIcon className="text-lg" name={icon} /> : null}
      <span>{children}</span>
    </>
  );

  if (external) {
    return (
      <a className={classes} href={to} rel={rel} target={target}>
        {content}
      </a>
    );
  }

  return (
    <Link className={classes} to={to}>
      {content}
    </Link>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: MajesticonName;
  tone?: Tone;
};

export function Button({
  children,
  className,
  icon,
  tone = "violet",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonBaseClassName, toneClasses[tone], className)} type={type} {...props}>
      {icon ? <AppIcon className="text-lg" name={icon} /> : null}
      <span>{children}</span>
    </button>
  );
}

type RoleButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  surface?: FigmaButtonSurface;
  tone: RoleButtonTone;
};

export function RoleButton({
  children,
  className,
  surface = "flat",
  tone,
  type = "button",
  ...props
}: RoleButtonProps) {
  return (
    <button
      className={cn(
        figmaButtonBaseClassName,
        "min-h-[3.75rem] min-w-[11rem] px-6 py-3 font-wedoo-accent text-[1.25rem]",
        roleButtonClasses[tone][surface],
        className,
      )}
      type={type}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}

type DiscoverButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: MajesticonName;
  surface?: FigmaButtonSurface;
  tone: DiscoverButtonTone;
};

export function DiscoverButton({
  children,
  className,
  icon = "chevron-right",
  surface = "flat",
  tone,
  type = "button",
  ...props
}: DiscoverButtonProps) {
  return (
    <button
      className={cn(
        figmaButtonBaseClassName,
        "min-h-[3.5rem] min-w-[10.75rem] gap-3 px-5 py-3 font-wedoo-accent text-[1.16rem]",
        discoverButtonClasses[tone][surface],
        className,
      )}
      type={type}
      {...props}
    >
      <span>{children}</span>
      <AppIcon className="shrink-0" height={20} name={icon} width={20} />
    </button>
  );
}

type SupportButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  icon?: MajesticonName;
  tone: SupportButtonTone;
  variant?: SupportButtonVariant;
};

export function SupportButton({
  children,
  className,
  icon = "phone",
  tone,
  type = "button",
  variant = "filled",
  ...props
}: SupportButtonProps) {
  return (
    <button
      className={cn(
        figmaButtonBaseClassName,
        "min-h-[3.5rem] min-w-[13rem] gap-2.5 border px-5 py-3 font-wedoo-accent text-[1rem] font-medium",
        supportButtonClasses[tone][variant],
        className,
      )}
      type={type}
      {...props}
    >
      <AppIcon className="shrink-0" height={20} name={icon} width={20} />
      <span>{children}</span>
    </button>
  );
}

type PillButtonProps = {
  active?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  tone?: "slate" | "violet" | "mint";
};

export function PillButton({
  active = false,
  children,
  className,
  onClick,
  tone = "slate",
}: PillButtonProps) {
  const palette =
    tone === "violet"
      ? active
        ? "border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)]"
        : "border-[var(--wedoo-violet-100)] bg-[var(--wedoo-surface-violet)] text-[var(--wedoo-violet)] hover:bg-[var(--wedoo-violet-50)]"
      : tone === "mint"
        ? active
          ? "border-transparent bg-[var(--wedoo-mint)] text-[var(--wedoo-ink)]"
          : "border-[rgba(87,215,180,0.28)] bg-[var(--wedoo-surface-mint)] text-[var(--wedoo-mint-700)] hover:bg-[var(--wedoo-mint-100)]"
        : active
          ? "border-transparent bg-[var(--wedoo-ink)] text-[var(--wedoo-white-soft)]"
          : "border-[var(--wedoo-line)] bg-white/86 text-[var(--wedoo-ink-muted)] hover:bg-white";

  return (
    <button
      className={cn("inline-flex items-center rounded-full border px-4 py-2 text-sm font-medium transition", palette, className)}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
