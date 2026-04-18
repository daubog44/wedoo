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
        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-brand-violet">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="whitespace-pre-line text-[1.8rem] leading-[1.02] sm:text-[2.25rem]">
        {title}
      </h2>
      {description ? (
        <p className="max-w-[40rem] text-[0.94rem] leading-6 text-slate-600 sm:text-[1rem]">
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
    <div className="rounded-[1.1rem] border border-black/8 bg-white/92 p-4 shadow-[0_18px_42px_-34px_rgba(16,25,36,0.16)]">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[0.85rem] bg-brand-violet/8 text-brand-violet">
        <AppIcon className="text-[1.2rem]" name={icon} />
      </div>
      <p className="text-[1.45rem] font-bold leading-none tracking-tight text-brand-ink">
        {value}
      </p>
      <p className="mt-2 text-[0.86rem] leading-5 text-slate-500">{label}</p>
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
        "overflow-hidden rounded-[1.4rem] border border-black/8 bg-white/96 shadow-[0_18px_50px_-38px_rgba(16,25,36,0.2)]",
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
        "rounded-[1.4rem] border border-dashed border-slate-200 bg-white/88 p-7 text-center",
        className,
      )}
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-[0.9rem] bg-brand-violet/10 text-brand-violet">
        <AppIcon className="text-[1.7rem]" name="search-text-line" />
      </div>
      <h3 className="text-[1.18rem] leading-tight">{title}</h3>
      <p className="mt-2 text-[0.92rem] leading-6 text-slate-500">{description}</p>
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
