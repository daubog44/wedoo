/* eslint-disable react-refresh/only-export-components */
import type { ReactNode } from "react";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "../site/site-icon";

export type PortalDetailTone = "mint" | "violet";

type PortalDetailToneClasses = {
  accentText: string;
  canvas: string;
  card: string;
  chip: string;
  dock: string;
  primaryButton: string;
  secondaryButton: string;
  softButton: string;
  toolbarBorder: string;
};

const portalDetailToneClasses: Record<PortalDetailTone, PortalDetailToneClasses> = {
  mint: {
    accentText: "text-brand-mint-deep",
    canvas:
      "border-brand-mint/45 bg-[radial-gradient(circle_at_top,_rgba(88,203,165,0.20),_rgba(247,247,247,0.98)_46%,_#f7f7f7_100%)]",
    card: "border-brand-mint/35 bg-white/94",
    chip: "border-brand-mint/30 bg-brand-mint/14 text-brand-mint-deep",
    dock: "bg-brand-mint-deep text-brand-ink",
    primaryButton:
      "bg-brand-mint-deep text-brand-ink hover:bg-brand-mint",
    secondaryButton:
      "border border-brand-mint-deep bg-white text-brand-ink hover:bg-brand-mint/14",
    softButton:
      "border border-brand-mint-deep bg-brand-mint/32 text-brand-ink hover:bg-brand-mint/48",
    toolbarBorder: "border-brand-mint-deep/45",
  },
  violet: {
    accentText: "text-brand-violet",
    canvas:
      "border-brand-violet/35 bg-[radial-gradient(circle_at_top,_rgba(116,71,225,0.18),_rgba(245,243,255,0.98)_42%,_#f5f3ff_100%)]",
    card: "border-brand-violet/25 bg-white/95",
    chip: "border-brand-violet/20 bg-brand-violet/10 text-brand-violet",
    dock: "bg-brand-violet-300 text-black",
    primaryButton:
      "bg-brand-violet text-white hover:bg-brand-violet-600",
    secondaryButton:
      "border border-brand-violet bg-white text-brand-ink hover:bg-brand-violet/10",
    softButton:
      "border border-brand-violet bg-brand-violet/12 text-brand-ink hover:bg-brand-violet/18",
    toolbarBorder: "border-brand-violet/40",
  },
};

export function getPortalDetailToneClasses(tone: PortalDetailTone) {
  return portalDetailToneClasses[tone];
}

export function PortalDetailCanvas({
  children,
  className,
  tone,
}: {
  children: ReactNode;
  className?: string;
  tone: PortalDetailTone;
}) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <div
      className={cn(
        "rounded-[2.5rem] border px-4 py-4 shadow-[0_32px_90px_-48px_rgba(15,23,42,0.42)] sm:px-6 sm:py-6 lg:px-8 lg:py-8",
        toneClasses.canvas,
        className,
      )}
    >
      {children}
    </div>
  );
}

export function PortalDetailCard({
  children,
  className,
  tone,
}: {
  children: ReactNode;
  className?: string;
  tone: PortalDetailTone;
}) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <section
      className={cn(
        "rounded-[2rem] border p-5 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.34)] sm:p-6 lg:p-7",
        toneClasses.card,
        className,
      )}
    >
      {children}
    </section>
  );
}

export function PortalDetailToolbarCard({
  body,
  className,
  minHeightClassName,
  tone,
  toolbarLabel,
}: {
  body: string;
  className?: string;
  minHeightClassName?: string;
  tone: PortalDetailTone;
  toolbarLabel: string;
}) {
  const toneClasses = getPortalDetailToneClasses(tone);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[1.5rem] border bg-white/88",
        toneClasses.toolbarBorder,
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-3 font-wedoo-body text-[0.95rem] leading-none text-black sm:px-5",
          toneClasses.toolbarBorder,
        )}
      >
        <span className="font-bold">G</span>
        <span className="italic">C</span>
        <span className="underline">S</span>
        <span>{toolbarLabel}</span>
        <SiteIcon className="ml-auto h-4 w-4" name="menu" />
      </div>
      <div
        className={cn(
          "font-wedoo-body px-4 py-4 text-[1rem] leading-[1.35] text-black sm:px-5 sm:py-5 md:text-[1.125rem]",
          minHeightClassName,
        )}
      >
        <p>{body}</p>
      </div>
    </div>
  );
}

export function PortalDetailBulletList({
  items,
  className,
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={cn("list-disc space-y-2 pl-5 text-black", className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
