import { useId, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { JobDraftOption } from "../../data/job-draft";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
import { WedooThemeToggle } from "../common/wedoo-theme-toggle";
import { SiteIcon } from "../site";
import { companyWizardDesktopPct } from "./company-wizard-utils";

export function CompanyWizardLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/">
      <img
        alt="Wedoo"
        className={compact ? "h-[53px] w-[190px] object-contain" : "h-[91px] w-[340px] object-contain"}
        src={assetPath("Frame-2@2x.png")}
      />
    </Link>
  );
}

export function CompanyWizardLanguageChip({ compact = false }: { compact?: boolean }) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center rounded-[14px] border border-[var(--wedoo-toggle-border)] bg-[var(--wedoo-toggle-bg)] text-[var(--wedoo-toggle-text)] shadow-[var(--wedoo-toggle-shadow)] backdrop-blur transition hover:border-[var(--wedoo-toggle-border-strong)] hover:bg-[var(--wedoo-toggle-bg-hover)]",
        compact ? "h-[30px] w-[62px] gap-1.5 px-2 text-[13px]" : "h-10 w-[68px] gap-2 px-3 text-[14px]",
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} name="chevron-down" />
    </button>
  );
}

export function CompanyWizardDesktopShell({
  aside,
  backgroundAsset,
  children,
  formClassName,
  formStyle,
  showLogo = false,
  step,
  subtitle,
  subtitleClassName,
  subtitleStyle,
  testId,
  title,
  titleClassName,
  titleStyle,
}: {
  aside?: ReactNode;
  backgroundAsset: string;
  children: ReactNode;
  formClassName?: string;
  formStyle: CSSProperties;
  showLogo?: boolean;
  step: number;
  subtitle?: string;
  subtitleClassName?: string;
  subtitleStyle?: CSSProperties;
  testId: string;
  title: string;
  titleClassName?: string;
  titleStyle: CSSProperties;
}) {
  return (
    <section
      className="hidden min-[1024px]:block"
      data-company-wizard-layout="desktop"
      data-company-wizard-step={step}
      data-testid={testId}
    >
      <div className="relative mx-auto h-[1024px] w-full max-w-[1440px] overflow-hidden rounded-[2.75rem] border border-[var(--wedoo-workspace-line)] bg-[linear-gradient(180deg,var(--wedoo-workspace-top),var(--wedoo-workspace-bg))] shadow-[0_52px_140px_-86px_rgba(0,0,0,0.86)]">
        <img
          alt=""
          className="pointer-events-none absolute top-[15px] h-[995px] object-cover opacity-85 saturate-[0.88]"
          src={assetPath(backgroundAsset)}
          style={{ left: companyWizardDesktopPct(20), width: companyWizardDesktopPct(1400) }}
        />

        <div className="pointer-events-none absolute inset-0" style={{ background: "var(--wedoo-hero-scrim)" }} />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[44%]" style={{ background: "var(--wedoo-hero-orb)" }} />

        <div className="absolute top-[42px] z-20 flex items-center gap-2" style={{ left: companyWizardDesktopPct(1206) }}>
          <WedooThemeToggle />
          <CompanyWizardLanguageChip />
        </div>

        {showLogo ? (
          <div className="absolute top-[50px]" style={{ left: companyWizardDesktopPct(155) }}>
            <CompanyWizardLogo />
          </div>
        ) : null}

        <h1
          className={cn(
            "font-wedoo-accent absolute z-10 text-center text-[36px] leading-none text-[var(--wedoo-workspace-text)]",
            titleClassName,
          )}
          style={titleStyle}
        >
          {title}
        </h1>

        {subtitle ? (
          <p
            className={cn(
              "font-wedoo-accent absolute z-10 text-center text-[24px] leading-none text-[var(--wedoo-workspace-muted)]",
              subtitleClassName,
            )}
            style={subtitleStyle}
          >
            {subtitle}
          </p>
        ) : null}

        <div
          className={cn(
            "wedoo-theme-shell absolute rounded-[1.9rem] backdrop-blur",
            formClassName,
          )}
          style={formStyle}
        >
          {children}
        </div>

        {aside}
      </div>
    </section>
  );
}

export function CompanyWizardMobileShell({
  children,
  step,
  subtitle,
  subtitleClassName,
  testId,
  title,
  titleClassName,
}: {
  children: ReactNode;
  step: number;
  subtitle?: string;
  subtitleClassName?: string;
  testId: string;
  title: string;
  titleClassName?: string;
}) {
  return (
    <section
      className="min-[1024px]:hidden"
      data-company-wizard-layout="mobile"
      data-company-wizard-step={step}
      data-testid={testId}
    >
      <div className="mx-auto max-w-[390px] px-4 pb-8 pt-5">
        <header className="relative overflow-hidden rounded-[2rem] border border-[var(--wedoo-workspace-line)] bg-[linear-gradient(180deg,var(--wedoo-workspace-top),var(--wedoo-workspace-bg))] px-5 py-6 shadow-[0_38px_96px_-72px_rgba(0,0,0,0.8)]">
          <div className="pointer-events-none absolute inset-0" style={{ background: "var(--wedoo-hero-orb)" }} />
          <CompanyWizardLogo compact />
          <div className="absolute right-0 top-0 flex items-center gap-2">
            <WedooThemeToggle compact />
            <CompanyWizardLanguageChip compact />
          </div>
          <div className="relative mt-6 space-y-3 px-2 text-center">
            <span className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--wedoo-workspace-muted)]">company onboarding</span>
            <h1 className={cn("font-wedoo-heading text-[var(--wedoo-workspace-text)]", titleClassName ?? "text-[52px] leading-[0.9]")}>
              {title}
            </h1>
            {subtitle ? (
              <p className={cn("font-wedoo-accent text-[var(--wedoo-workspace-muted)]", subtitleClassName ?? "text-[22px] leading-[1.08]")}>
                {subtitle}
              </p>
            ) : null}
          </div>
        </header>

        <div className="wedoo-theme-shell mt-4 rounded-[1.8rem] px-4 pb-5 pt-6 backdrop-blur">
          {children}
        </div>
      </div>
    </section>
  );
}

export function CompanyWizardFieldLabel({
  children,
  compact = false,
  htmlFor,
}: {
  children: string;
  compact?: boolean;
  htmlFor: string;
}) {
  return (
    <label
      className={cn(
        "font-wedoo-accent block text-brand-ink",
        compact ? "mb-2 text-[18px] leading-none" : "mb-2 text-[18px] leading-none",
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}

export function CompanyWizardTextField({
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
  type?: "email" | "tel" | "text";
  value: string;
}) {
  return (
    <div className="w-full">
      <CompanyWizardFieldLabel compact={compact} htmlFor={id}>
        {label}
      </CompanyWizardFieldLabel>
      <input
        className={cn(
          "wedoo-theme-field font-wedoo-body w-full rounded-[16px] outline-none transition focus:border-[var(--wedoo-violet)] focus:ring-4 focus:ring-[rgba(116,80,230,0.08)]",
          compact ? "h-[48px] px-4 text-[17px]" : "h-[50px] px-4 text-[18px]",
        )}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
}

export function CompanyWizardCheckbox({
  checked,
  compact = false,
  id,
  label,
  linkHref,
  linkLabel,
  onCheckedChange,
}: {
  checked: boolean;
  compact?: boolean;
  id: string;
  label: string;
  linkHref?: string;
  linkLabel?: string;
  onCheckedChange: (checked: boolean) => void;
}) {
  const labelId = useId();
  const accessibleLabel = `${label}${linkLabel ? ` ${linkLabel}` : ""}`;

  return (
    <div className="inline-flex items-start gap-3">
      <button
        aria-label={accessibleLabel}
        aria-checked={checked}
        className={cn(
          "mt-1 inline-flex items-center justify-center rounded-[8px] border transition",
          compact ? "h-[24px] w-[24px]" : "h-[24px] w-[24px]",
          checked
            ? "border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)]"
            : "border-[var(--wedoo-line-strong)] bg-[var(--wedoo-input-bg)] text-transparent",
        )}
        id={id}
        onClick={() => onCheckedChange(!checked)}
        role="checkbox"
        type="button"
      >
        <svg aria-hidden="true" className={compact ? "h-[12px] w-[14px]" : "h-[13px] w-[15px]"} viewBox="0 0 15 13">
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
          compact ? "text-[16px] leading-[1.25]" : "text-[17px] leading-[1.3]",
        )}
        id={labelId}
      >
        {label}
        {linkHref && linkLabel ? (
          <>
            {" "}
            <a
              className="underline"
              href={linkHref}
              rel="noreferrer"
              target="_blank"
            >
              {linkLabel}
            </a>
          </>
        ) : null}
      </span>
    </div>
  );
}

export function CompanyWizardSelectField({
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
  options: readonly JobDraftOption[];
  value: string;
}) {
  return (
    <div className="w-full">
      <CompanyWizardFieldLabel compact={compact} htmlFor={id}>
        {label}
      </CompanyWizardFieldLabel>
      <div className="relative">
        <select
          className={cn(
            "wedoo-theme-field font-wedoo-body w-full appearance-none rounded-[16px] pr-10 outline-none transition focus:border-[var(--wedoo-violet)] focus:ring-4 focus:ring-[rgba(116,80,230,0.08)]",
            compact ? "h-[48px] px-4 text-[17px]" : "h-[50px] px-4 text-[18px]",
            value ? "text-brand-ink" : "text-brand-ink/75",
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
        <SiteIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink" name="chevron-down" />
      </div>
    </div>
  );
}

export function CompanyWizardCapField({
  compact = false,
  datalistId,
  id,
  onChange,
  options,
  value,
}: {
  compact?: boolean;
  datalistId: string;
  id: string;
  onChange: (value: string) => void;
  options: readonly JobDraftOption[];
  value: string;
}) {
  return (
    <div className="w-full">
      <CompanyWizardFieldLabel compact={compact} htmlFor={id}>
        CAP
      </CompanyWizardFieldLabel>
      <input
        className={cn(
          "wedoo-theme-field font-wedoo-body w-full rounded-[16px] outline-none transition focus:border-[var(--wedoo-violet)] focus:ring-4 focus:ring-[rgba(116,80,230,0.08)]",
          compact ? "h-[48px] px-4 text-[17px]" : "h-[50px] px-4 text-[18px]",
        )}
        id={id}
        list={datalistId}
        onChange={(event) => onChange(event.target.value)}
        placeholder="scrivi"
        value={value}
      />
      <datalist id={datalistId}>
        {options.map((option) => (
          <option key={option.id} value={option.id} />
        ))}
      </datalist>
    </div>
  );
}

export function CompanyWizardEditor({
  compact = false,
  id,
  label,
  onChange,
  value,
}: {
  compact?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
}) {
  return (
    <div className="w-full">
      <CompanyWizardFieldLabel compact={compact} htmlFor={id}>
        {label}
      </CompanyWizardFieldLabel>
      <div className="overflow-hidden rounded-[20px] border border-[var(--wedoo-input-border)] bg-[var(--wedoo-input-bg)]">
        <div
          className={cn(
            "flex items-center gap-4 border-b border-[var(--wedoo-line)] font-wedoo-body text-brand-ink",
            compact ? "px-4 py-3 text-[17px]" : "px-4 py-3 text-[18px]",
          )}
        >
          <button className="font-sans font-bold" type="button">
            G
          </button>
          <button className="font-sans italic" type="button">
            C
          </button>
          <button className="font-sans underline" type="button">
            S
          </button>
          <span>formattazione</span>
          <AppIcon className={compact ? "h-5 w-5" : "h-6 w-6"} name="list-box-line" />
        </div>
        <textarea
          className={cn(
            "font-wedoo-body w-full resize-none border-none bg-transparent text-brand-ink outline-none",
            compact ? "min-h-[120px] px-4 py-4 text-[17px]" : "min-h-[120px] px-4 py-4 text-[18px]",
          )}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        />
      </div>
    </div>
  );
}

export function CompanyWizardUploadField({
  compact = false,
  id,
  label,
  onFileChange,
  selectedFileName,
}: {
  compact?: boolean;
  id: string;
  label: string;
  onFileChange: (fileName: string) => void;
  selectedFileName: string;
}) {
  return (
    <div className="space-y-2">
      <CompanyWizardFieldLabel compact={compact} htmlFor={id}>
        {label}
      </CompanyWizardFieldLabel>
      <label
        className={cn(
          "wedoo-theme-ghost-button inline-flex cursor-pointer items-center rounded-[16px] text-[var(--wedoo-input-placeholder)] transition hover:border-[var(--wedoo-violet)]",
          compact ? "h-[48px] w-full gap-2 px-4 text-[17px]" : "h-[48px] w-[178px] gap-2 px-4 text-[18px]",
        )}
        htmlFor={id}
      >
        <AppIcon className={compact ? "h-4 w-4" : "h-[19px] w-[19px]"} name="cloud-upload-line" />
        <span className="font-wedoo-body">{selectedFileName || "carica"}</span>
      </label>
      <input
        className="sr-only"
        id={id}
        onChange={(event) => onFileChange(event.target.files?.[0]?.name ?? "")}
        type="file"
      />
      {selectedFileName ? (
        <p className="font-wedoo-body text-[14px] leading-[1.2] text-brand-ink">
          {selectedFileName}
        </p>
      ) : null}
    </div>
  );
}

export function CompanyWizardPrimaryButton({
  children,
  className,
  compact = false,
  onClick,
  type = "button",
}: {
  children: string;
  className?: string;
  compact?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center rounded-[18px] bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[0_24px_60px_-38px_rgba(116,80,230,0.68)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]",
        compact ? "h-[52px] text-[19px] leading-none" : "h-[54px] text-[19px] leading-none",
        compact ? "w-full" : "w-full",
        className,
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export function CompanyWizardOutlineButton({
  children,
  compact = false,
  onClick,
  type = "button",
}: {
  children: string;
  compact?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
}) {
  return (
    <button
      className={cn(
        "wedoo-theme-ghost-button font-wedoo-accent inline-flex items-center justify-center rounded-[18px] transition hover:-translate-y-0.5 hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]",
        compact ? "h-[52px] w-full text-[17px] leading-none" : "h-[48px] px-4 text-[18px] leading-none",
      )}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}

export function CompanyWizardSocialButton({
  children,
  compact = false,
}: {
  children: string;
  compact?: boolean;
}) {
  return (
    <button
      className={cn(
        "wedoo-theme-ghost-button font-wedoo-accent inline-flex items-center justify-center rounded-[18px] transition hover:-translate-y-0.5 hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]",
        compact ? "h-[46px] flex-1 text-[15px] leading-none" : "h-[48px] w-[204px] text-[17px] leading-none",
      )}
      type="button"
    >
      {children}
    </button>
  );
}

export function CompanyWizardSectionHeading({
  children,
  compact = false,
}: {
  children: string;
  compact?: boolean;
}) {
  return (
    <h2
      className={cn(
        "font-wedoo-accent font-bold text-brand-ink",
        compact ? "text-[20px] leading-none" : "text-[20px] leading-none",
      )}
    >
      {children}
    </h2>
  );
}

export function CompanyWizardStepHint({
  children,
  compact = false,
  className,
}: {
  children: string;
  compact?: boolean;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-wedoo-body text-brand-ink",
        compact ? "text-[14px] leading-[1.5]" : "text-[15px] leading-[1.6]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function CompanyWizardSummaryList({
  compact = false,
  items,
}: {
  compact?: boolean;
  items: readonly string[];
}) {
  return (
    <ul
      className={cn(
        "font-wedoo-body list-disc text-brand-ink",
        compact ? "space-y-1 pl-5 text-[14px] leading-[1.45]" : "space-y-1 pl-6 text-[15px] leading-[1.55]",
      )}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function CompanyWizardOrDivider({ compact = false }: { compact?: boolean }) {
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

export function CompanyWizardSdgField({
  compact = false,
  id,
  onAdd,
  onRemove,
  options,
  selectedIds,
}: {
  compact?: boolean;
  id: string;
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  options: readonly JobDraftOption[];
  selectedIds: readonly string[];
}) {
  const availableOptions = options.filter((option) => !selectedIds.includes(option.id));
  const selectedOptions = selectedIds
    .map((selectedId) => options.find((option) => option.id === selectedId))
    .filter((option): option is JobDraftOption => Boolean(option));

  return (
    <div className="space-y-2">
      <CompanyWizardSelectField
        compact={compact}
        id={id}
        label="SDGs di riferimento"
        onChange={(value) => {
          if (value) {
            onAdd(value);
          }
        }}
        options={availableOptions}
        value=""
      />
      {selectedOptions.length > 0 ? (
        <ul className="flex flex-wrap gap-2" data-testid="company-registration-sdg-list">
          {selectedOptions.map((option) => (
            <li key={option.id}>
              <button
                aria-label={`Rimuovi SDG ${option.label}`}
                className={cn(
                  "wedoo-theme-ghost-button font-wedoo-body inline-flex items-center gap-2 rounded-full transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]",
                  compact ? "px-3 py-1 text-[14px]" : "px-3 py-1.5 text-[14px]",
                )}
                onClick={() => onRemove(option.id)}
                type="button"
              >
                <span>{option.label}</span>
                <span aria-hidden="true" className="font-wedoo-accent text-[0.9em] leading-none">
                  x
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
