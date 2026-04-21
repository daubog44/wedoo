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
        "inline-flex items-center justify-center rounded-[14px] border border-[var(--wedoo-line)] bg-white/74 text-[var(--wedoo-ink-muted)] shadow-[0_18px_44px_-36px_rgba(15,23,40,0.4)] backdrop-blur",
        compact ? "h-[30px] w-[62px] gap-1 px-2 text-[13px]" : "h-10 w-[68px] gap-2 px-3 text-[14px]",
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
      <div className="relative mx-auto h-[1024px] w-full max-w-[1440px] overflow-hidden rounded-[2.75rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,255,255,0.52))] shadow-[0_42px_120px_-76px_rgba(15,23,40,0.54)] backdrop-blur">
        <img
          alt=""
          className="pointer-events-none absolute top-[15px] h-[995px] object-cover saturate-[0.92]"
          src={assetPath(backgroundAsset)}
          style={{ left: candidateOnboardingDesktopPct(20), width: candidateOnboardingDesktopPct(1400) }}
        />

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(245,247,251,0.96)_0%,rgba(245,247,251,0.92)_42%,rgba(245,247,251,0.3)_64%,rgba(245,247,251,0)_100%)]" />

        <div
          className="absolute top-[42px] z-10"
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
      <div className="mx-auto max-w-[390px] px-4 pb-10 pt-5">
        <header className="section-card relative rounded-[2rem] px-5 py-6">
          <CandidateOnboardingLogo compact />
          <div className="absolute right-0 top-0">
            <CandidateOnboardingLanguageChip compact />
          </div>
          <div className="mt-[27px] space-y-3 text-center text-brand-ink">
            <span className="wedoo-kicker">onboarding</span>
            <h1 className="font-wedoo-heading text-[32px] leading-none">{title}</h1>
            {subtitle ? (
              <p className="font-wedoo-accent text-[22px] leading-none text-[var(--wedoo-ink-muted)]">
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
        "rounded-[1.75rem] border border-white/75 bg-[rgba(255,255,255,0.84)] shadow-[0_30px_80px_-62px_rgba(15,23,40,0.44)] backdrop-blur",
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
        compact ? "mb-2 text-[21px] leading-none" : "mb-2 text-[20px] leading-none",
      )}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}

function candidateOnboardingFieldClassName(compact: boolean) {
  return cn(
    "font-wedoo-body w-full rounded-[16px] border border-[var(--wedoo-line)] bg-white/84 text-brand-ink outline-none transition placeholder:text-brand-ink/38 focus:border-[var(--wedoo-violet)] focus:ring-4 focus:ring-[rgba(116,80,230,0.08)]",
    compact ? "h-[48px] px-4 text-[18px]" : "h-[50px] px-4 text-[18px]",
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
          "mt-1 inline-flex items-center justify-center rounded-[8px] border transition",
          compact ? "h-[26px] w-[26px]" : "h-[24px] w-[24px]",
          checked
            ? "border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)]"
            : "border-[var(--wedoo-line-strong)] bg-white text-transparent",
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
          compact ? "text-[18px] leading-[1.2]" : "text-[17px] leading-[1.3]",
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
        "font-wedoo-accent inline-flex items-center justify-center rounded-[18px] bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[0_24px_60px_-38px_rgba(116,80,230,0.68)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]",
        compact ? "h-[50px] w-full text-[20px] leading-none" : "h-[54px] w-full text-[20px] leading-none",
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
        "font-wedoo-accent inline-flex items-center justify-center rounded-[18px] border border-[var(--wedoo-line)] bg-white/78 text-brand-ink transition hover:-translate-y-0.5 hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]",
        compact ? "h-[46px] w-[204px] text-[16px] leading-none" : "h-[48px] w-[204px] text-[18px] leading-none",
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
        compact ? "gap-3 text-[14px]" : "gap-4 text-[16px]",
      )}
    >
      <span className="h-px flex-1 bg-[var(--wedoo-line)]" />
      <span className="font-wedoo-body leading-none text-[var(--wedoo-ink-muted)]">oppure</span>
      <span className="h-px flex-1 bg-[var(--wedoo-line)]" />
    </div>
  );
}
