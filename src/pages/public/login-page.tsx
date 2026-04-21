import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthCheckbox,
  AuthFormPanel,
  AuthTextLink,
  AuthTopBar,
  AuthWorkspacePanel,
} from "../../components/public";
import { SiteFooter } from "../../components/site";
import { loginAuthViewModel } from "../../data/auth";
import { assetPath, cn } from "../../lib/site-utils";

const emailField = loginAuthViewModel.fields[0];
const passwordField = loginAuthViewModel.fields[1];
const loginInputFields = [emailField, passwordField] as const;
const loginTermsField = loginAuthViewModel.fields[2];

type LoginInputField = (typeof loginInputFields)[number];
type LoginCheckboxField = typeof loginTermsField;

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
          "font-wedoo-accent block text-[var(--wedoo-ink-strong)]",
          compact ? "mb-2 text-[1rem]" : "mb-2 text-[1.02rem]",
        )}
        htmlFor={inputId}
      >
        {field.label}
      </label>
      <input
        aria-describedby={errorId}
        aria-invalid={showError}
        className={cn(
          "wedoo-theme-field font-wedoo-body w-full rounded-[14px] px-4 focus:outline-none focus:ring-2 focus:ring-[rgba(112,72,232,0.18)]",
          compact ? "h-[3.2rem] text-[1rem]" : "h-[3.35rem] text-[1rem]",
          showError ? "border-[#b42318]" : "border-[var(--wedoo-line)]",
        )}
        id={inputId}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        type={field.inputType}
        value={value}
      />
      <p
        className={cn(
          "font-wedoo-body mt-2 min-h-[1.25rem] text-sm leading-none text-[#b42318]",
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
  onToggle,
}: {
  checked: boolean;
  compact?: boolean;
  field: LoginCheckboxField;
  onToggle: () => void;
}) {
  return (
    <AuthCheckbox checked={checked} compact={compact} label={field.label} onCheckedChange={() => onToggle()} />
  );
}

function LoginSubmitButton({ compact = false, label }: { compact?: boolean; label: string }) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center rounded-[16px] border border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[0_18px_40px_-30px_rgba(112,72,232,0.5)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]",
        compact ? "h-[3.35rem] w-full text-[1.15rem]" : "h-[3.4rem] w-full text-[1.18rem]",
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
      <div className={cn("mt-6 flex items-center gap-4 text-[var(--wedoo-ink-muted)]", compact && "mt-5 gap-3")}>
        <span className="h-px flex-1 bg-[var(--wedoo-line)]" />
        <span className="font-wedoo-body text-sm leading-none">{loginAuthViewModel.dividerLabel}</span>
        <span className="h-px flex-1 bg-[var(--wedoo-line)]" />
      </div>

      <div className={cn("grid gap-3", compact ? "mt-5" : "mt-6")}>
        {providerOptions.map((provider) => (
          <button
            className="wedoo-theme-ghost-button font-wedoo-accent inline-flex min-h-[3.2rem] items-center justify-center rounded-[14px] text-[1rem] transition"
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
            compact ? "mt-5 text-[1rem] leading-6" : "mt-6 text-[1rem] leading-7",
          )}
        >
          {loginAuthViewModel.footerPrompt.label}{" "}
          <Link className="underline underline-offset-4" to={loginAuthViewModel.footerPrompt.linkTo}>
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
      <div className="mx-auto max-w-[1360px] px-8 pb-10 pt-6">
        <AuthTopBar />

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.48fr_0.52fr]">
          <div className="space-y-6">
            <div className="space-y-4">
              <h1 className="text-[3.7rem] leading-[0.9] text-[var(--wedoo-ink-strong)]">{loginAuthViewModel.title}</h1>
              <h2 className="font-wedoo-accent text-[1.55rem] leading-none text-[var(--wedoo-ink)]">
                {loginAuthViewModel.subtitle}
              </h2>
              <p className="max-w-[28rem] text-base leading-7 text-[var(--wedoo-ink-muted)]">
                Accedi a un workspace che mette in chiaro ruolo, impatto e trasparenza prima della retorica.
              </p>
            </div>

            <AuthFormPanel>
              <form className="space-y-2" noValidate onSubmit={onSubmit}>
                <LoginInput
                  field={emailField}
                  idPrefix="desktop-login"
                  onChange={(value) => onInputChange("email", value)}
                  showError={showFieldError(emailField)}
                  value={values.email ?? ""}
                />
                <LoginInput
                  field={passwordField}
                  idPrefix="desktop-login"
                  onChange={(value) => onInputChange("password", value)}
                  showError={showFieldError(passwordField)}
                  value={values.password ?? ""}
                />

                {loginAuthViewModel.forgotPasswordLabel && loginAuthViewModel.forgotPasswordTo ? (
                  <AuthTextLink className="mt-1" compact to={loginAuthViewModel.forgotPasswordTo}>
                    {loginAuthViewModel.forgotPasswordLabel}
                  </AuthTextLink>
                ) : null}

                {loginTermsField ? (
                  <div className="pt-3">
                    <LoginConsent checked={termsAccepted} compact field={loginTermsField} onToggle={onToggleTerms} />
                  </div>
                ) : null}

                <div className="pt-4">
                  <LoginSubmitButton label={loginAuthViewModel.ctaLabel} />
                </div>
              </form>

              <LoginSecondaryActions />
            </AuthFormPanel>
          </div>

          <AuthWorkspacePanel className="min-h-[42rem]">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.26]"
              src={assetPath(loginAuthViewModel.background)}
            />
            <div className="absolute inset-0" style={{ background: "var(--wedoo-media-overlay)" }} />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="space-y-4">
                <span className="wedoo-workspace-chip">sign in</span>
                <p className="max-w-[24rem] text-[3rem] leading-[0.92] text-[var(--wedoo-workspace-text)]">
                  Entra in un prodotto che non nasconde il contesto.
                </p>
                <p className="max-w-[24rem] text-base leading-7 text-[var(--wedoo-workspace-muted)]">
                  Il lato auth usa la stessa regola della home: testo chiaro a sinistra, profondita del prodotto
                  a destra, nessun canvas appiccicato dal vecchio Figma.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="wedoo-workspace-panel px-4 py-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                    signal stack
                  </p>
                  <p className="mt-2 text-lg leading-7 text-[var(--wedoo-workspace-text)]">
                    Brand, contratto, impatto e coerenza leggibili nello stesso punto.
                  </p>
                </div>
                <div className="wedoo-workspace-panel px-4 py-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                    product rule
                  </p>
                  <p className="mt-2 text-lg leading-7 text-[var(--wedoo-workspace-text)]">
                    Un solo sistema di CTA e gerarchie, senza route isolate o patch locali.
                  </p>
                </div>
              </div>
            </div>
          </AuthWorkspacePanel>
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
      <div className="mx-auto max-w-[390px] px-4 pb-8 pt-5">
        <AuthTopBar compact />

        <div className="mt-5 space-y-5">
          <div className="space-y-3">
            <h1 className="text-[2.9rem] leading-[0.92] text-[var(--wedoo-ink-strong)]">{loginAuthViewModel.title}</h1>
            <h2 className="font-wedoo-accent text-[1.3rem] leading-none text-[var(--wedoo-ink)]">
              {loginAuthViewModel.subtitle}
            </h2>
          </div>

          <AuthWorkspacePanel className="min-h-[16rem]">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
              src={assetPath(loginAuthViewModel.background)}
            />
            <div className="absolute inset-0" style={{ background: "var(--wedoo-media-overlay)" }} />
            <div className="relative z-10 flex h-full flex-col justify-end">
              <p className="max-w-[14rem] text-[2rem] leading-[0.94] text-[var(--wedoo-workspace-text)]">
                Entra senza rumore, capisci subito il prodotto.
              </p>
            </div>
          </AuthWorkspacePanel>

          <AuthFormPanel>
            <form className="space-y-2" noValidate onSubmit={onSubmit}>
              <LoginInput
                compact
                field={emailField}
                idPrefix="mobile-login"
                onChange={(value) => onInputChange("email", value)}
                showError={showFieldError(emailField)}
                value={values.email ?? ""}
              />
              <LoginInput
                compact
                field={passwordField}
                idPrefix="mobile-login"
                onChange={(value) => onInputChange("password", value)}
                showError={showFieldError(passwordField)}
                value={values.password ?? ""}
              />

              {loginAuthViewModel.forgotPasswordLabel && loginAuthViewModel.forgotPasswordTo ? (
                <AuthTextLink className="mt-1" compact to={loginAuthViewModel.forgotPasswordTo}>
                  {loginAuthViewModel.forgotPasswordLabel}
                </AuthTextLink>
              ) : null}

              {loginTermsField ? (
                <div className="pt-3">
                  <LoginConsent checked={termsAccepted} compact field={loginTermsField} onToggle={onToggleTerms} />
                </div>
              ) : null}

              <div className="pt-4">
                <LoginSubmitButton compact label={loginAuthViewModel.ctaLabel} />
              </div>
            </form>

            <LoginSecondaryActions compact />
          </AuthFormPanel>
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
      <main className="bg-[var(--wedoo-page-bg)] pb-6">
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
