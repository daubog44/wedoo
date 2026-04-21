import type { HTMLAttributes } from "react";
import type { MajesticonName } from "../../lib/majesticons-map";
import { cn } from "../../lib/site-utils";
import { AppIcon } from "../../lib/icons";
import { AppImage } from "../media/app-image";

type SectionIntroProps = {
  align?: "left" | "center";
  description?: string;
  eyebrow?: string;
  title: string;
};

export function SectionIntro({
  align = "left",
  description,
  eyebrow,
  title,
}: SectionIntroProps) {
  return (
    <div className={cn("space-y-4", align === "center" && "mx-auto max-w-3xl text-center")}>
      {eyebrow ? <p className="wedoo-kicker">{eyebrow}</p> : null}
      <h2 className="text-3xl leading-[0.95] text-[var(--wedoo-ink-strong)] sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? (
        <p className="max-w-3xl text-base leading-7 text-[var(--wedoo-ink-muted)] sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}

type StatCardProps = {
  icon: MajesticonName;
  label: string;
  value: string;
};

export function StatCard({ icon, label, value }: StatCardProps) {
  return (
    <div className="wedoo-theme-shell rounded-[1.35rem] p-4 shadow-[0_20px_50px_-42px_rgba(15,23,40,0.26)]">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[0.95rem] bg-[var(--wedoo-surface-violet)] text-[var(--wedoo-violet)]">
        <AppIcon className="text-xl" name={icon} />
      </div>
      <p className="text-2xl font-bold tracking-tight text-[var(--wedoo-ink-strong)]">{value}</p>
      <p className="mt-1 text-sm leading-6 text-[var(--wedoo-ink-muted)]">{label}</p>
    </div>
  );
}

type PreviewFrameProps = {
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  src: string;
};

export function PreviewFrame({
  alt,
  className,
  imgClassName,
  priority = false,
  src,
}: PreviewFrameProps) {
  return (
    <div
      className={cn(
        "wedoo-theme-shell overflow-hidden rounded-[1.6rem] shadow-[0_28px_72px_-56px_rgba(15,23,40,0.34)]",
        className,
      )}
    >
      <AppImage alt={alt} className={cn("h-full w-full object-cover", imgClassName)} priority={priority} src={src} />
    </div>
  );
}

type EmptyStateProps = {
  className?: string;
  description: string;
  title: string;
};

export function EmptyState({ className, description, title }: EmptyStateProps) {
  return (
    <div className={cn("wedoo-theme-shell rounded-[1.6rem] border-dashed p-8 text-center", className)}>
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-[1rem] bg-[var(--wedoo-surface-violet)] text-[var(--wedoo-violet)]">
        <AppIcon className="text-3xl" name="search-text-line" />
      </div>
      <h3 className="text-xl text-[var(--wedoo-ink-strong)]">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-[var(--wedoo-ink-muted)]">{description}</p>
    </div>
  );
}

type SurfaceProps = HTMLAttributes<HTMLDivElement>;

export function Surface({ children, className, ...props }: SurfaceProps) {
  return (
    <div className={cn("section-card", className)} {...props}>
      {children}
    </div>
  );
}
