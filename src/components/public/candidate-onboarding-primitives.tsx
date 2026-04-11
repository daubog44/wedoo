import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import type { CandidateOnboardingOption } from "../../data/candidate-onboarding";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteIcon } from "../site";
import { candidateOnboardingDesktopPct } from "./candidate-onboarding-utils";

export function CandidateOnboardingLogo({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Link to="/">
      <img
        alt="Wedoo"
        className={
          compact
            ? "h-[49px] w-[184px] object-contain"
            : "h-[91px] w-[340px] object-contain"
        }
        src={assetPath("Frame-2@2x.png")}
      />
    </Link>
  );
}

export function CandidateOnboardingLanguageChip({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center rounded-[8px] border border-[#767676] bg-[#e3e3e3] text-[#1e1e1e] opacity-50",
        compact ? "h-[22px] w-[57px] gap-1 px-2 text-[14px]" : "h-8 w-[57px] gap-2 px-3 text-[16px]",
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className="h-4 w-4" name="chevron-down" />
    </button>
  );
}

export function CandidateOnboardingDesktopShell({
  backgroundAsset,
  children,
  step,
  testId,
}: {
  backgroundAsset: string;
  children: ReactNode;
  step: number;
  testId: string;
}) {
  return (
    <section
      className="hidden min-[1024px]:block"
      data-candidate-onboarding-layout="desktop"
      data-candidate-onboarding-step={step}
      data-testid={testId}
    >
      <div className="relative mx-auto h-[1024px] w-full max-w-[1440px]">
        <img
          alt=""
          className="pointer-events-none absolute top-[15px] h-[995px] object-cover"
          src={assetPath(backgroundAsset)}
          style={{ left: candidateOnboardingDesktopPct(20), width: candidateOnboardingDesktopPct(1400) }}
        />

        <div
          className="absolute top-[50px]"
          style={{ left: candidateOnboardingDesktopPct(1314) }}
        >
          <CandidateOnboardingLanguageChip />
        </div>

        {children}
      </div>
    </section>
  );
}

export function CandidateOnboardingMobileShell({
  children,
  step,
  subtitle,
  testId,
  title,
}: {
  children: ReactNode;
  step: number;
  subtitle?: string;
  testId: string;
  title: string;
}) {
  return (
    <section
      className="min-[1024px]:hidden"
      data-candidate-onboarding-layout="mobile"
      data-candidate-onboarding-step={step}
      data-testid={testId}
    >
      <div className="mx-auto max-w-[360px] px-[22px] pb-10 pt-[23px]">
        <header className="relative">
          <CandidateOnboardingLogo compact />
          <div className="absolute right-0 top-0">
            <CandidateOnboardingLanguageChip compact />
          </div>
          <div className="mt-[27px] space-y-2 text-center text-brand-ink">
            <h1 className="font-wedoo-accent text-[32px] leading-none">{title}</h1>
            {subtitle ? (
              <p className="font-wedoo-accent text-[24px] leading-none">
                {subtitle}
              </p>
            ) : null}
          </div>
        </header>

        {children}
      </div>
    </section>
  );
}

export function CandidateOnboardingFormCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-brand-mint-deep bg-brand-page",
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export function CandidateOnboardingFieldLabel({
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
        "font-wedoo-accent block text-brand-ink",
        compact ? "mb-2 text-[24px] leading-none" : "mb-1.5 text-[24px] leading-none",
      )}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}

function candidateOnboardingFieldClassName(compact: boolean) {
  return cn(
    "font-wedoo-body w-full rounded-[8px] border border-brand-mint-deep bg-transparent text-brand-ink outline-none transition placeholder:text-brand-ink/40 focus:border-brand-mint-deep focus:ring-2 focus:ring-brand-mint-deep/15",
    compact ? "h-[42px] px-3 text-[20px]" : "h-[42px] px-4 text-[18px]",
  );
}

export function CandidateOnboardingTextField({
  compact = false,
  id,
  label,
  onChange,
  placeholder,
  type = "text",
  value,
}: {
  compact?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: "email" | "password" | "tel" | "text";
  value: string;
}) {
  return (
    <div className="w-full">
      <CandidateOnboardingFieldLabel compact={compact} htmlFor={id} label={label} />
      <input
        className={candidateOnboardingFieldClassName(compact)}
        data-node-id="281:1255"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
}

export function CandidateOnboardingSelectField({
  compact = false,
  id,
  label,
  onChange,
  options,
  value,
}: {
  compact?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: readonly CandidateOnboardingOption[];
  value: string;
}) {
  return (
    <div className="w-full">
      <CandidateOnboardingFieldLabel compact={compact} htmlFor={id} label={label} />
      <div className="relative" data-node-id="2:543">
        <select
          className={cn(
            candidateOnboardingFieldClassName(compact),
            "appearance-none pr-12",
            value ? "text-brand-ink" : "text-brand-ink/40",
          )}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">scegli</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <SiteIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink" name="chevron-down" />
      </div>
    </div>
  );
}

export function CandidateOnboardingCheckbox({
  checked,
  compact = false,
  id,
  label,
  onCheckedChange,
}: {
  checked: boolean;
  compact?: boolean;
  id: string;
  label: ReactNode;
  onCheckedChange: (checked: boolean) => void;
}) {
  return (
    <div className="flex items-start gap-3">
      <button
        aria-checked={checked}
        className={cn(
          "mt-1 inline-flex items-center justify-center rounded-[4px] border border-brand-mint-deep transition",
          compact ? "h-[28px] w-[29px]" : "h-6 w-6",
          checked ? "bg-brand-mint-deep text-brand-ink" : "bg-brand-page text-transparent",
        )}
        id={id}
        onClick={() => onCheckedChange(!checked)}
        role="checkbox"
        type="button"
      >
        <svg
          aria-hidden="true"
          className={compact ? "h-3.5 w-4" : "h-[13px] w-[15px]"}
          viewBox="0 0 15 13"
        >
          <path
            d="M1 7.1L5.1 11L14 1.5"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>
      <span
        className={cn(
          "font-wedoo-body text-brand-ink",
          compact ? "text-[22px] leading-[1.05]" : "text-[22px] leading-[1.05]",
        )}
      >
        {label}
      </span>
    </div>
  );
}

export function CandidateOnboardingPrimaryButton({
  children,
  compact = false,
  onClick,
}: {
  children: string;
  compact?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] bg-brand-mint-deep text-brand-ink transition hover:bg-brand-mint",
        compact ? "h-[46px] w-full text-[24px] leading-none" : "h-12 w-full text-[24px] leading-none",
      )}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}

export function CandidateOnboardingSocialButton({
  children,
  compact = false,
}: {
  children: string;
  compact?: boolean;
}) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] border-2 border-brand-mint-deep bg-brand-page text-brand-ink transition hover:bg-brand-mint-50",
        compact ? "h-[46px] w-[204px] text-[18px] leading-none" : "h-[46px] w-[204px] text-[24px] leading-none",
      )}
      type="button"
    >
      {children}
    </button>
  );
}

export function CandidateOnboardingOrDivider({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center text-brand-ink",
        compact ? "gap-3 text-[16px]" : "gap-4 text-[18px]",
      )}
    >
      <span className="h-px flex-1 bg-brand-ink" />
      <span className="font-wedoo-body leading-none">oppure</span>
      <span className="h-px flex-1 bg-brand-ink" />
    </div>
  );
}
