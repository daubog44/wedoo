import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteFooter, SiteIcon } from "../../components/site";
import { loginAuthViewModel } from "../../data/auth";
import { assetPath, cn } from "../../lib/site-utils";

const emailField = loginAuthViewModel.fields[0];
const passwordField = loginAuthViewModel.fields[1];
const loginInputFields = [emailField, passwordField] as const;
const loginTermsField = loginAuthViewModel.fields[2];

type LoginInputField = (typeof loginInputFields)[number];
type LoginCheckboxField = typeof loginTermsField;

const desktopPct = (value: number) => `${(value / 1440) * 100}%`;

function LoginLanguageChip({ className }: { className?: string }) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex h-8 w-[57px] items-center justify-center gap-2 rounded-[8px] border border-[#767676] bg-[#e3e3e3] px-3 text-[16px] leading-none text-[#1e1e1e] opacity-50",
        className,
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className="h-4 w-4" name="chevron-down" />
    </button>
  );
}

function LoginCheckIcon() {
  return (
    <svg aria-hidden="true" className="h-[13px] w-[15px]" viewBox="0 0 15 13">
      <path
        d="M1 7.1L5.1 11L14 1.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function LoginInput({
  compact = false,
  field,
  idPrefix,
  onChange,
  showError,
  value,
}: {
  compact?: boolean;
  field: LoginInputField;
  idPrefix: string;
  onChange: (value: string) => void;
  showError: boolean;
  value: string;
}) {
  const inputId = `${idPrefix}-${field.id}`;
  const errorId = `${inputId}-error`;

  return (
    <div className="w-full">
      <label
        className={cn(
          "font-wedoo-accent block text-[var(--wedoo-ink)]",
          compact ? "mb-2 text-[20px] leading-none" : "mb-2 text-[24px] leading-none",
        )}
        htmlFor={inputId}
      >
        {field.label}
      </label>
      <input
        aria-describedby={errorId}
        aria-invalid={showError}
        className={cn(
          "font-wedoo-body w-full rounded-[8px] bg-[var(--wedoo-white-soft)] px-4 text-[var(--wedoo-ink)] placeholder:text-[rgba(33,37,41,0.5)] focus:outline-none",
          compact ? "h-[46px] text-[18px]" : "h-[50px] text-[22px]",
          showError ? "border border-[#b40000]" : "border border-[#cdbdf4]",
        )}
        id={inputId}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        type={field.inputType}
        value={value}
      />
      <p
        className={cn(
          "font-wedoo-body mt-1 min-h-[1em] text-[#b40000]",
          compact ? "text-[18px] leading-none" : "text-[22px] leading-none",
          showError ? "opacity-100" : "opacity-0",
        )}
        id={errorId}
      >
        {field.errorText ?? ""}
      </p>
    </div>
  );
}

function LoginConsent({
  checked,
  compact = false,
  field,
  idPrefix,
  onToggle,
}: {
  checked: boolean;
  compact?: boolean;
  field: LoginCheckboxField;
  idPrefix: string;
  onToggle: () => void;
}) {
  const labelId = `${idPrefix}-${field.id}-label`;

  return (
    <div className="flex items-center gap-3">
      <button
        aria-checked={checked}
        aria-labelledby={labelId}
        className="grid h-[23px] w-[23px] shrink-0 place-items-center rounded-[4px] bg-[var(--brand-mint)]"
        onClick={onToggle}
        role="checkbox"
        type="button"
      >
        {checked ? (
          <span className="grid h-[23px] w-[23px] place-items-center rounded-[4px] bg-[var(--brand-violet)] text-[var(--wedoo-white-soft)]">
            <LoginCheckIcon />
          </span>
        ) : null}
      </button>
      <button
        className={cn(
          "font-wedoo-body text-left text-[var(--wedoo-ink)]",
          compact ? "text-[18px] leading-none" : "text-[22px] leading-none",
        )}
        id={labelId}
        onClick={onToggle}
        type="button"
      >
        {field.label}
      </button>
    </div>
  );
}

function LoginSubmitButton({ compact = false, label }: { compact?: boolean; label: string }) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] border border-[#7447e1] bg-[#7447e1] text-[var(--wedoo-white-soft)] transition hover:bg-[#613cbd]",
        compact ? "h-[48px] w-full text-[22px]" : "h-[52px] w-full text-[24px]",
      )}
      type="submit"
    >
      {label}
    </button>
  );
}

function LoginSecondaryActions({ compact = false }: { compact?: boolean }) {
  const providerOptions = loginAuthViewModel.providerOptions ?? [];

  return (
    <>
      <div
        className={cn(
          "flex items-center text-[var(--wedoo-ink)]",
          compact ? "mt-5 gap-3 text-[18px]" : "mt-[13px] gap-5 text-[20px]",
        )}
      >
        <span className="h-px flex-1 bg-[var(--wedoo-ink)]" />
        <span className="font-wedoo-body leading-none">{loginAuthViewModel.dividerLabel}</span>
        <span className="h-px flex-1 bg-[var(--wedoo-ink)]" />
      </div>

      <div className={cn("flex gap-5", compact ? "mt-5" : "mt-[26px]")}>
        {providerOptions.map((provider) => (
          <button
            className={cn(
              "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] border-2 border-[#cdbdf4] bg-[var(--wedoo-white-soft)] text-[var(--wedoo-ink)] transition hover:border-[#7447e1]",
              compact ? "h-[48px] flex-1 text-[18px]" : "h-[54px] w-[218px] text-[24px]",
            )}
            key={provider.id}
            type="button"
          >
            {provider.label}
          </button>
        ))}
      </div>

      {loginAuthViewModel.footerPrompt ? (
        <p
          className={cn(
            "font-wedoo-body text-center text-[var(--wedoo-ink)]",
            compact ? "mt-5 text-[18px]" : "mt-[22px] text-[22px]",
          )}
        >
          {loginAuthViewModel.footerPrompt.label}{" "}
          <Link className="underline" to={loginAuthViewModel.footerPrompt.linkTo}>
            {loginAuthViewModel.footerPrompt.linkLabel}
          </Link>
        </p>
      ) : null}
    </>
  );
}

function LoginDesktopView({
  onInputChange,
  onSubmit,
  onToggleTerms,
  showFieldError,
  termsAccepted,
  values,
}: {
  onInputChange: (fieldId: string, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  showFieldError: (field: LoginInputField) => boolean;
  termsAccepted: boolean;
  values: Record<string, string>;
}) {
  return (
    <section className="hidden min-[1024px]:block" data-login-layout="desktop">
      <div className="relative mx-auto h-[1024px] w-full max-w-[1440px]">
        <img
          alt=""
          className="pointer-events-none absolute top-[15px] h-[995px] object-cover"
          src={assetPath(loginAuthViewModel.background)}
          style={{ left: desktopPct(20), width: desktopPct(1400) }}
        />

        <div className="absolute top-[50px]" style={{ left: desktopPct(1314) }}>
          <LoginLanguageChip />
        </div>

        <Link className="absolute top-[111px]" style={{ left: desktopPct(167) }} to="/">
          <img alt="Wedoo" className="h-[91px] w-[340px] object-contain" src={assetPath("Frame-2@2x.png")} />
        </Link>

        <h1
          className="font-wedoo-accent absolute text-center text-[36px] leading-none text-[var(--wedoo-ink)]"
          style={{ left: desktopPct(197), top: 212, width: desktopPct(259) }}
        >
          {loginAuthViewModel.title}
        </h1>
        <h2
          className="font-wedoo-accent absolute text-center text-[24px] leading-none text-[var(--wedoo-ink)]"
          style={{ left: desktopPct(284), top: 264, width: desktopPct(86) }}
        >
          {loginAuthViewModel.subtitle}
        </h2>

        <form
          className="absolute rounded-[20px] border border-[#cdbdf4] bg-[var(--wedoo-white-soft)] px-6 pb-5 pt-6"
          noValidate
          onSubmit={onSubmit}
          style={{ left: desktopPct(149), top: 308, width: desktopPct(368) }}
        >
          <LoginInput
            field={emailField}
            idPrefix="desktop-login"
            onChange={(value) => onInputChange("email", value)}
            showError={showFieldError(emailField)}
            value={values.email ?? ""}
          />
          <div className="mt-[14px]">
            <LoginInput
              field={passwordField}
              idPrefix="desktop-login"
              onChange={(value) => onInputChange("password", value)}
              showError={showFieldError(passwordField)}
              value={values.password ?? ""}
            />
          </div>
          <button
            className="font-wedoo-body mt-[10px] text-[22px] italic leading-none text-[var(--wedoo-ink)]"
            type="button"
          >
            {loginAuthViewModel.forgotPasswordLabel}
          </button>
          {loginTermsField ? (
            <div className="mt-[18px]">
              <LoginConsent
                checked={termsAccepted}
                field={loginTermsField}
                idPrefix="desktop-login"
                onToggle={onToggleTerms}
              />
            </div>
          ) : null}
          <div className="mt-[25px]">
            <LoginSubmitButton label={loginAuthViewModel.ctaLabel} />
          </div>
        </form>

        <div className="absolute top-[787px]" style={{ left: desktopPct(62), width: desktopPct(542) }}>
          <LoginSecondaryActions />
        </div>
      </div>
    </section>
  );
}

function LoginMobileView({
  onInputChange,
  onSubmit,
  onToggleTerms,
  showFieldError,
  termsAccepted,
  values,
}: {
  onInputChange: (fieldId: string, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  showFieldError: (field: LoginInputField) => boolean;
  termsAccepted: boolean;
  values: Record<string, string>;
}) {
  return (
    <section className="min-[1024px]:hidden" data-login-layout="mobile">
      <div className="mx-auto w-full max-w-[360px] px-4 pt-4">
        <div className="relative h-[660px]">
          <img
            alt=""
            className="pointer-events-none absolute inset-x-0 top-0 h-[430px] w-full rounded-[28px] object-cover"
            src={assetPath(loginAuthViewModel.background)}
          />

          <div className="absolute right-4 top-4">
            <LoginLanguageChip className="h-[28px] w-[54px] gap-1.5 px-2 text-[14px]" />
          </div>

          <Link className="absolute left-6 top-6" to="/">
            <img alt="Wedoo" className="h-[62px] w-[232px] object-contain" src={assetPath("Frame-2@2x.png")} />
          </Link>

          <h1 className="font-wedoo-accent absolute left-8 top-[118px] text-[28px] leading-none text-[var(--wedoo-ink)]">
            {loginAuthViewModel.title}
          </h1>
          <h2 className="font-wedoo-accent absolute left-[118px] top-[158px] text-[22px] leading-none text-[var(--wedoo-ink)]">
            {loginAuthViewModel.subtitle}
          </h2>

          <div className="absolute left-5 top-[188px] w-[280px]">
            <form
              className="rounded-[20px] border border-[#cdbdf4] bg-[rgba(247,247,247,0.96)] px-4 pb-4 pt-4 backdrop-blur-[2px]"
              noValidate
              onSubmit={onSubmit}
            >
              <LoginInput
                compact
                field={emailField}
                idPrefix="mobile-login"
                onChange={(value) => onInputChange("email", value)}
                showError={showFieldError(emailField)}
                value={values.email ?? ""}
              />
              <div className="mt-3">
                <LoginInput
                  compact
                  field={passwordField}
                  idPrefix="mobile-login"
                  onChange={(value) => onInputChange("password", value)}
                  showError={showFieldError(passwordField)}
                  value={values.password ?? ""}
                />
              </div>
              <button
                className="font-wedoo-body mt-3 text-[18px] italic leading-none text-[var(--wedoo-ink)]"
                type="button"
              >
                {loginAuthViewModel.forgotPasswordLabel}
              </button>
              {loginTermsField ? (
                <div className="mt-4">
                  <LoginConsent
                    checked={termsAccepted}
                    compact
                    field={loginTermsField}
                    idPrefix="mobile-login"
                    onToggle={onToggleTerms}
                  />
                </div>
              ) : null}
              <div className="mt-4">
                <LoginSubmitButton compact label={loginAuthViewModel.ctaLabel} />
              </div>
            </form>

            <div className="mt-4">
              <LoginSecondaryActions compact />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [values, setValues] = useState<Record<string, string>>({
    email: "",
    password: "",
  });
  const [showMissingFieldErrors, setShowMissingFieldErrors] = useState(
    Boolean(loginAuthViewModel.showMissingFieldErrorsByDefault),
  );
  const [termsAccepted, setTermsAccepted] = useState(Boolean(loginTermsField?.defaultChecked));

  const missingFieldIds = new Set<string>(
    loginAuthViewModel.errors.find((error) => error.id === "missing-fields")?.fieldIds ?? [],
  );

  function handleInputChange(fieldId: string, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldId]: value,
    }));
  }

  function showFieldError(field: LoginInputField) {
    return showMissingFieldErrors && missingFieldIds.has(field.id) && !values[field.id]?.trim();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const hasMissingRequiredField = loginInputFields.some(
      (field) => field.required && !values[field.id]?.trim(),
    );

    if (hasMissingRequiredField) {
      setShowMissingFieldErrors(true);
      return;
    }

    navigate(loginAuthViewModel.ctaTo);
  }

  function toggleTerms() {
    setTermsAccepted((currentValue) => !currentValue);
  }

  return (
    <>
      <main className="bg-[var(--wedoo-page-bg)] pb-12 pt-2">
        <LoginMobileView
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onToggleTerms={toggleTerms}
          showFieldError={showFieldError}
          termsAccepted={termsAccepted}
          values={values}
        />
        <LoginDesktopView
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onToggleTerms={toggleTerms}
          showFieldError={showFieldError}
          termsAccepted={termsAccepted}
          values={values}
        />
      </main>
      <SiteFooter className="mt-0" />
    </>
  );
}
