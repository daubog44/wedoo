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
    <div
      className={cn(
        "space-y-3",
        align === "center" && "mx-auto max-w-3xl text-center",
      )}
    >
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-violet">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="whitespace-pre-line text-3xl leading-tight sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-7 text-slate-600 sm:text-lg">
          {description}
        </p>
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
    <div className="rounded-3xl border border-white/70 bg-white/75 p-4 shadow-[0_24px_55px_-35px_rgba(16,25,36,0.55)] backdrop-blur">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-violet/12 text-brand-violet">
        <AppIcon className="text-2xl" name={icon} />
      </div>
      <p className="text-2xl font-bold tracking-tight text-brand-ink">
        {value}
      </p>
      <p className="mt-1 text-sm leading-6 text-slate-500">{label}</p>
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
        "overflow-hidden rounded-4xl border border-white/70 bg-white/85 shadow-[0_35px_90px_-55px_rgba(16,25,36,0.65)]",
        className,
      )}
    >
      <AppImage
        alt={alt}
        className={cn("h-full w-full object-cover", imgClassName)}
        priority={priority}
        src={src}
      />
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
    <div
      className={cn(
        "rounded-4xl border border-dashed border-slate-200 bg-white/70 p-8 text-center",
        className,
      )}
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-violet/10 text-brand-violet">
        <AppIcon className="text-3xl" name="search-text-line" />
      </div>
      <h3 className="text-xl">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-slate-500">{description}</p>
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
