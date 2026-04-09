import type { JobDraftOption } from "../../data/job-draft";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "../site";

export function JobDraftLanguageChip({ compact = false }: { compact?: boolean }) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center rounded-[8px] border border-[#767676] bg-[#e3e3e3] text-[#1e1e1e] opacity-50",
        compact
          ? "h-[28px] w-[54px] gap-1.5 px-2 text-[14px]"
          : "h-8 w-[57px] gap-2 px-3 text-[16px]",
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} name="chevron-down" />
    </button>
  );
}

export function JobDraftSectionHeading({
  children,
  compact = false,
}: {
  children: string;
  compact?: boolean;
}) {
  return (
    <h2
      className={cn(
        "font-wedoo-accent font-bold leading-none text-brand-ink",
        compact ? "text-[22px]" : "text-[24px]",
      )}
    >
      {children}
    </h2>
  );
}

export function JobDraftFieldLabel({
  compact = false,
  htmlFor,
  label,
}: {
  compact?: boolean;
  htmlFor: string;
  label: string;
}) {
  return (
    <label
      className={cn(
        "font-wedoo-accent block leading-none text-brand-ink",
        compact ? "mb-2 text-[20px]" : "mb-2 text-[24px]",
      )}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}

export function JobDraftSelectField({
  compact = false,
  dataNodeId,
  id,
  label,
  onChange,
  options,
  value,
}: {
  compact?: boolean;
  dataNodeId?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: readonly JobDraftOption[];
  value: string;
}) {
  return (
    <div className="grid gap-0">
      <JobDraftFieldLabel compact={compact} htmlFor={id} label={label} />
      <div className="relative" data-node-id={dataNodeId}>
        <select
          className={cn(
            "font-wedoo-body w-full appearance-none rounded-[8px] border border-brand-violet-400 bg-brand-page pr-10 text-brand-ink outline-none transition focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/15",
            compact ? "h-[44px] px-3 text-[18px]" : "h-[37px] px-[7px] text-[22px]",
            value ? "text-brand-ink" : "text-brand-ink/55",
          )}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">scegli</option>
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
        <SiteIcon
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink"
          data-node-id="2:543"
          name="chevron-down"
        />
      </div>
    </div>
  );
}

export function JobDraftHintText({
  children,
  className,
  compact = false,
}: {
  children: string;
  className?: string;
  compact?: boolean;
}) {
  return (
    <p
      className={cn(
        "font-wedoo-body text-brand-ink",
        compact ? "text-[15px] leading-[1.2]" : "text-[18px] leading-[1.05]",
        className,
      )}
    >
      {children}
    </p>
  );
}
