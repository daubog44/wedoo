import { cn } from "../../../lib/site-utils";

export const publicGlassPanelClassName =
  "rounded-[18px] border border-black/8 bg-white/94 shadow-[0_16px_34px_-28px_rgba(16,25,36,0.14)]";

export const publicPosterPanelClassName = cn(
  publicGlassPanelClassName,
  "relative overflow-hidden border-brand-violet-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(250,249,255,0.94)_100%)]",
);

export const publicPosterMediaClassName =
  "relative overflow-hidden rounded-[14px] shadow-[0_14px_28px_-24px_rgba(16,25,36,0.18)]";

export const publicInputLabelClassName =
  "font-wedoo-accent mb-2 block text-[16px] leading-none text-brand-ink min-[1024px]:text-[18px]";

export const publicInputClassName =
  "font-wedoo-body h-11 w-full rounded-[11px] border border-brand-violet-100 bg-white/96 px-4 text-[15px] text-brand-ink shadow-[0_8px_18px_-14px_rgba(16,25,36,0.1)] placeholder:text-[rgba(33,37,41,0.45)] focus:border-brand-violet-300 focus:outline-none min-[1024px]:h-[48px] min-[1024px]:text-[16px]";

export const publicFieldErrorClassName =
  "font-wedoo-body mt-1.5 min-h-[1.1em] text-[13px] leading-none text-[#b40000] min-[1024px]:text-[14px]";

export const publicMetaTextClassName =
  "font-wedoo-body text-[14px] leading-[1.4] text-[rgba(33,37,41,0.78)] min-[1024px]:text-[15px]";
