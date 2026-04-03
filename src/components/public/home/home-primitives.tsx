import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactNode,
} from "react";
import { Link } from "react-router-dom";
import { AppIcon } from "../../../lib/icons";
import type { MajesticonName } from "../../../lib/majesticons-map";
import { assetPath, cn } from "../../../lib/site-utils";
import { SiteIcon } from "../../site";
import { wedooSdgPalette } from "./home-constants";

const homeButtonBaseClassName =
  "font-wedoo-accent inline-flex items-center justify-center gap-2 rounded-[0.625rem] border font-normal leading-none transition hover:-translate-y-0.5";

const homeButtonVariants = {
  appPrimary:
    "h-[3.25rem] min-w-[11rem] border-[var(--wedoo-border-strong)] bg-[var(--wedoo-violet-600)] px-5 text-[1.25rem] text-[var(--wedoo-white-soft)] hover:bg-[var(--wedoo-violet)] md:h-[3.0625rem] md:min-w-[11.625rem] md:gap-[0.4375rem] md:px-3 md:text-[1.5rem]",
  authPrimary:
    "h-12 min-w-[8.5rem] border-transparent bg-[var(--wedoo-violet-600)] px-4 text-[1rem] text-[var(--wedoo-white-soft)] hover:bg-[var(--wedoo-violet)] md:h-[3.0625rem] md:min-w-[8.46875rem] md:px-4 md:text-[1.5rem]",
  authSecondary:
    "h-12 min-w-[8.5rem] border-[var(--wedoo-muted-border)] bg-transparent px-4 text-[1rem] text-[var(--wedoo-ink-strong)] hover:bg-black/3 md:h-[3.0625rem] md:min-w-[8.46875rem] md:px-4 md:text-[1.5rem]",
  discoverGold:
    "h-[3.0625rem] min-w-[9.9375rem] border-transparent bg-[var(--wedoo-gold-soft)] px-5 text-[1.125rem] text-[var(--wedoo-ink-strong)] md:h-[3.5625rem] md:min-w-[11.3125rem] md:gap-[0.75rem] md:px-5 md:text-[1.5rem]",
  discoverRose:
    "h-[3.0625rem] min-w-[9.9375rem] border-transparent bg-[var(--wedoo-rose-soft)] px-5 text-[1.125rem] text-[var(--wedoo-ink-strong)] md:h-[3.5625rem] md:min-w-[11.3125rem] md:gap-[0.75rem] md:px-5 md:text-[1.5rem]",
  discoverViolet:
    "h-[3.0625rem] min-w-[9.9375rem] border-transparent bg-[var(--wedoo-violet-soft)] px-5 text-[1.125rem] text-[var(--wedoo-ink-strong)] md:h-[3.5625rem] md:min-w-[11.3125rem] md:gap-[0.75rem] md:px-5 md:text-[1.5rem]",
  roleCandidate:
    "h-[3.25rem] min-w-[11rem] border-transparent bg-[var(--wedoo-mint)] px-5 text-[1.25rem] text-[var(--wedoo-ink-strong)] hover:bg-[var(--wedoo-mint-deep)] md:h-[3.75rem] md:min-w-[11.8125rem] md:text-[1.5rem]",
  roleCompany:
    "h-[3.25rem] min-w-[11rem] border-[var(--wedoo-border-strong)] bg-[var(--wedoo-violet)] px-5 text-[1.25rem] text-[var(--wedoo-white-soft)] hover:bg-[var(--wedoo-violet-hover)] md:h-[3.75rem] md:min-w-[11.8125rem] md:text-[1.5rem]",
  textLink:
    "h-auto min-w-0 justify-start border-0 px-0 text-left text-[1.0625rem] text-[var(--wedoo-ink)] hover:text-[var(--wedoo-violet)] md:text-[1.5rem]",
} as const;

export type HomeButtonVariant = keyof typeof homeButtonVariants;

type CommonButtonProps = PropsWithChildren<{
  className?: string;
  icon?: MajesticonName;
  iconPosition?: "start" | "end";
  variant: HomeButtonVariant;
}>;

function renderButtonContent(
  children: ReactNode,
  icon?: MajesticonName,
  iconPosition: "start" | "end" = "end",
) {
  const iconNode = icon ? (
    <AppIcon
      className={cn(
        "h-5 w-5 shrink-0",
        icon === "smartphone-apps-line" && "h-7 w-7",
        icon === "arrow-right-line" && "h-[1.6875rem] w-8",
      )}
      name={icon}
    />
  ) : null;

  return (
    <>
      {iconPosition === "start" ? iconNode : null}
      <span>{children}</span>
      {iconPosition === "end" ? iconNode : null}
    </>
  );
}

function buttonClassName(variant: HomeButtonVariant, className?: string) {
  return cn(homeButtonBaseClassName, homeButtonVariants[variant], className);
}

export function HomeRouteButton({
  children,
  className,
  icon,
  iconPosition,
  to,
  variant,
}: CommonButtonProps & { to: string }) {
  return (
    <Link className={buttonClassName(variant, className)} to={to}>
      {renderButtonContent(children, icon, iconPosition)}
    </Link>
  );
}

export function HomeAnchorButton({
  children,
  className,
  download,
  href,
  icon,
  iconPosition,
  rel,
  target,
  variant,
}: CommonButtonProps &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "download" | "rel" | "target"> & {
    href: string;
  }) {
  return (
    <a
      className={buttonClassName(variant, className)}
      download={download}
      href={href}
      rel={rel}
      target={target}
    >
      {renderButtonContent(children, icon, iconPosition)}
    </a>
  );
}

export function HomeButton({
  children,
  className,
  icon,
  iconPosition,
  onClick,
  type = "button",
  variant,
}: CommonButtonProps &
  Pick<ButtonHTMLAttributes<HTMLButtonElement>, "onClick" | "type">) {
  return (
    <button
      className={buttonClassName(variant, className)}
      onClick={onClick}
      type={type}
    >
      {renderButtonContent(children, icon, iconPosition)}
    </button>
  );
}

export function LanguageChip({ label }: { label: string }) {
  return (
    <button
      aria-label="Lingua italiana"
      className="font-wedoo-accent inline-flex h-[1.5625rem] items-center gap-1 rounded-[0.5rem] border border-[var(--wedoo-muted-border)] bg-[var(--wedoo-muted-fill)] px-3 text-[0.8125rem] leading-none text-[var(--wedoo-muted-ink)] opacity-50"
      type="button"
    >
      {label}
      <SiteIcon className="h-3 w-3" name="chevron-down" />
    </button>
  );
}

export function SdgRibbon({
  className,
  reverse = false,
}: {
  className?: string;
  reverse?: boolean;
}) {
  const palette = reverse ? [...wedooSdgPalette].reverse() : [...wedooSdgPalette];

  return (
    <>
      <div
        className={cn(
          "mx-auto grid h-[9px] w-full max-w-[17.6875rem] overflow-hidden rounded-full md:hidden",
          className,
        )}
        style={{ gridTemplateColumns: `repeat(${palette.length}, minmax(0, 1fr))` }}
      >
        {palette.map((color, index) => (
          <div
            key={`${reverse ? "reverse" : "forward"}-${index}`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <img
        alt=""
        aria-hidden="true"
        className={cn(
          "mx-auto hidden h-[2.125rem] w-[66rem] object-cover md:block",
          reverse && "rotate-180",
          className,
        )}
        src={assetPath("home-ribbon-desktop.png")}
      />
    </>
  );
}
