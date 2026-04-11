import { useId, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { JobDraftOption } from "../../data/job-draft";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
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
        "inline-flex items-center justify-center rounded-[8px] border border-[#767676] bg-[#e3e3e3] text-[#1e1e1e] opacity-50",
        compact ? "h-[28px] w-[54px] gap-1.5 px-2 text-[14px]" : "h-8 w-[57px] gap-2 px-3 text-[16px]",
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
      <div className="relative mx-auto h-[1024px] w-full max-w-[1440px]">
        <img
          alt=""
          className="pointer-events-none absolute top-[15px] h-[995px] object-cover"
          src={assetPath(backgroundAsset)}
          style={{ left: companyWizardDesktopPct(20), width: companyWizardDesktopPct(1400) }}
        />

        <div className="absolute top-[50px]" style={{ left: companyWizardDesktopPct(1314) }}>
          <CompanyWizardLanguageChip />
        </div>

        {showLogo ? (
          <div className="absolute top-[50px]" style={{ left: companyWizardDesktopPct(155) }}>
            <CompanyWizardLogo />
          </div>
        ) : null}

        <h1
          className={cn(
            "font-wedoo-accent absolute text-center text-[36px] leading-none text-brand-ink",
            titleClassName,
          )}
          style={titleStyle}
        >
          {title}
        </h1>

        {subtitle ? (
          <p
            className={cn(
              "font-wedoo-accent absolute text-center text-[24px] leading-none text-brand-ink",
              subtitleClassName,
            )}
            style={subtitleStyle}
          >
            {subtitle}
          </p>
        ) : null}

        <div
          className={cn(
            "absolute rounded-[10px] border border-brand-violet-400 bg-[rgba(255,255,255,0.96)]",
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
      <div className="mx-auto max-w-[360px] px-4 pb-8 pt-6">
        <header className="relative">
          <CompanyWizardLogo compact />
          <div className="absolute right-0 top-0">
            <CompanyWizardLanguageChip compact />
          </div>
          <div className="mt-6 space-y-3 px-2 text-center">
            <h1 className={cn("font-wedoo-heading text-brand-ink", titleClassName ?? "text-[58px] leading-[0.9]")}>
              {title}
            </h1>
            {subtitle ? (
              <p className={cn("font-wedoo-accent text-brand-ink", subtitleClassName ?? "text-[24px] leading-[1.05]")}>
                {subtitle}
              </p>
            ) : null}
          </div>
        </header>

        <div className="mt-4 rounded-[20px] border border-brand-violet-400 bg-brand-page px-4 pb-5 pt-6">
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
        compact ? "mb-2 text-[20px] leading-none" : "mb-2 text-[24px] leading-none",
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
          "font-wedoo-body w-full rounded-[8px] border border-brand-violet-400 bg-brand-page text-brand-ink outline-none transition placeholder:text-brand-ink/35 focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/15",
          compact ? "h-[42px] px-3 text-[18px]" : "h-[42px] px-[9px] text-[22px]",
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
          "mt-1 inline-flex items-center justify-center rounded-[4px] border border-brand-violet-400 transition",
          compact ? "h-[23px] w-[23px]" : "h-[24px] w-[24px]",
          checked ? "bg-brand-violet text-white" : "bg-brand-page text-transparent",
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
          compact ? "text-[18px] leading-[1.05]" : "text-[22px] leading-[1.05]",
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
            "font-wedoo-body w-full appearance-none rounded-[8px] border border-brand-violet-400 bg-brand-page pr-10 text-brand-ink outline-none transition focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/15",
            compact ? "h-[42px] px-3 text-[18px]" : "h-[42px] px-[9px] text-[22px]",
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
          "font-wedoo-body w-full rounded-[8px] border border-brand-violet-400 bg-brand-page text-brand-ink outline-none transition placeholder:text-brand-ink/35 focus:border-brand-violet focus:ring-2 focus:ring-brand-violet/15",
          compact ? "h-[42px] px-3 text-[18px]" : "h-[42px] px-[9px] text-[22px]",
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
      <div className="overflow-hidden rounded-[20px] border border-brand-violet-400">
        <div
          className={cn(
            "flex items-center gap-4 border-b border-brand-violet-400 font-wedoo-body text-brand-ink",
            compact ? "px-3 py-2 text-[18px]" : "px-4 py-2 text-[22px]",
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
            compact ? "min-h-[120px] px-3 py-3 text-[18px]" : "min-h-[106px] px-4 py-3 text-[22px]",
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
          "inline-flex cursor-pointer items-center rounded-[8px] border border-brand-violet-400 bg-brand-page text-brand-ink/35 transition hover:border-brand-violet",
          compact ? "h-[42px] w-full gap-2 px-3 text-[18px]" : "h-[37px] w-[178px] gap-2 px-3 text-[22px]",
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
        "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] bg-brand-violet text-[var(--wedoo-white-soft)] transition hover:bg-brand-violet-600",
        compact ? "h-[52px] text-[22px] leading-none" : "h-[48px] text-[24px] leading-none",
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
        "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] border-2 border-brand-violet bg-brand-page text-brand-ink transition hover:bg-brand-violet/8",
        compact ? "h-[52px] w-full text-[22px] leading-none" : "h-[40px] px-3 text-[24px] leading-none",
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
        "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] border-2 border-brand-violet-100 bg-brand-page text-brand-ink transition hover:border-brand-violet",
        compact ? "h-[46px] flex-1 text-[18px] leading-none" : "h-[46px] w-[204px] text-[24px] leading-none",
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
        compact ? "text-[22px] leading-none" : "text-[24px] leading-none",
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
        compact ? "text-[15px] leading-[1.2]" : "text-[18px] leading-[1.05]",
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
        compact ? "space-y-1 pl-5 text-[15px] leading-[1.2]" : "space-y-1 pl-6 text-[18px] leading-[1.05]",
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
        compact ? "gap-3 text-[18px]" : "gap-4 text-[22px]",
      )}
    >
      <span className="h-px flex-1 bg-brand-ink" />
      <span className="font-wedoo-body leading-none">oppure</span>
      <span className="h-px flex-1 bg-brand-ink" />
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
                  "font-wedoo-body inline-flex items-center gap-2 rounded-full border border-brand-violet-400 bg-brand-page text-brand-ink transition hover:bg-brand-violet/8",
                  compact ? "px-3 py-1 text-[15px]" : "px-3 py-1.5 text-[16px]",
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
