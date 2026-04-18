import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthCheckbox,
  AuthTextLink,
  PublicActionButton,
  PublicBackdrop,
  PublicPageHeader,
  PublicProviderButton,
  publicFieldErrorClassName,
  publicGlassPanelClassName,
  publicInputClassName,
  publicInputLabelClassName,
  publicMetaTextClassName,
  publicPosterMediaClassName,
  publicPosterPanelClassName,
} from "../../components/public";
import { loginAuthViewModel } from "../../data/auth";
import { assetPath, cn } from "../../lib/site-utils";

const emailField = loginAuthViewModel.fields[0];
const passwordField = loginAuthViewModel.fields[1];
const loginInputFields = [emailField, passwordField] as const;
const loginTermsField = loginAuthViewModel.fields[2];

type LoginInputField = (typeof loginInputFields)[number];
type LoginCheckboxField = typeof loginTermsField;

function LoginInput({
  field,
  idPrefix,
  onChange,
  showError,
  value,
}: {
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
      <label className={publicInputLabelClassName} htmlFor={inputId}>
        {field.label}
      </label>
      <input
        aria-describedby={errorId}
        aria-invalid={showError}
        className={cn(
          publicInputClassName,
          showError ? "border-[#b40000]" : "",
        )}
        id={inputId}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        type={field.inputType}
        value={value}
      />
      <p
        className={cn(publicFieldErrorClassName, showError ? "opacity-100" : "opacity-0")}
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
    <AuthCheckbox
      checked={checked}
      compact={compact}
      label={field.label}
      onCheckedChange={() => onToggle()}
    />
  );
}

function LoginProviderButtons({ compact = false }: { compact?: boolean }) {
  const providerOptions = loginAuthViewModel.providerOptions ?? [];

  return (
    <div className={cn("grid gap-3", compact ? "grid-cols-1" : "grid-cols-2")}>
      {providerOptions.map((provider) => (
        <PublicProviderButton compact={compact} key={provider.id}>
          {provider.label}
        </PublicProviderButton>
      ))}
    </div>
  );
}

function LoginFormBlock({
  idPrefix,
  onInputChange,
  onSubmit,
  onToggleTerms,
  showFieldError,
  termsAccepted,
  values,
}: {
  idPrefix: string;
  onInputChange: (fieldId: string, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  showFieldError: (field: LoginInputField) => boolean;
  termsAccepted: boolean;
  values: Record<string, string>;
}) {
  return (
    <form className="mt-6 space-y-4 min-[1024px]:mt-8 min-[1024px]:space-y-5" noValidate onSubmit={onSubmit}>
      <LoginInput
        field={emailField}
        idPrefix={idPrefix}
        onChange={(value) => onInputChange("email", value)}
        showError={showFieldError(emailField)}
        value={values.email ?? ""}
      />
      <LoginInput
        field={passwordField}
        idPrefix={idPrefix}
        onChange={(value) => onInputChange("password", value)}
        showError={showFieldError(passwordField)}
        value={values.password ?? ""}
      />
      {loginAuthViewModel.forgotPasswordLabel && loginAuthViewModel.forgotPasswordTo ? (
        <AuthTextLink to={loginAuthViewModel.forgotPasswordTo}>
          {loginAuthViewModel.forgotPasswordLabel}
        </AuthTextLink>
      ) : null}
      {loginTermsField ? (
        <LoginConsent
          checked={termsAccepted}
          field={loginTermsField}
          onToggle={onToggleTerms}
        />
      ) : null}
      <div className="pt-2">
        <PublicActionButton fullWidth type="submit">
          {loginAuthViewModel.ctaLabel}
        </PublicActionButton>
      </div>
    </form>
  );
}

function LoginSupportColumn() {
  return (
    <div className={cn(publicPosterPanelClassName, "grid min-h-[520px] grid-rows-[minmax(0,1fr)_auto] p-4 min-[1024px]:p-5")}>
      <div className={publicPosterMediaClassName}>
        <img
          alt=""
          className="h-full min-h-[300px] w-full object-cover"
          src={assetPath(loginAuthViewModel.background)}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,30,0.08)_0%,rgba(17,19,30,0.48)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 p-4 min-[1024px]:p-5">
          <p className="font-wedoo-body text-[12px] uppercase tracking-[0.22em] text-white/82">
            accesso wedoo
          </p>
          <h3 className="font-wedoo-heading mt-3 max-w-[390px] text-[26px] leading-[0.95] text-white min-[1024px]:text-[34px]">
            filtra il rumore. entra dove l&apos;impatto regge.
          </h3>
          <p className="font-wedoo-body mt-3 max-w-[340px] text-[14px] leading-[1.34] text-white/84 min-[1024px]:text-[15px]">
            Una porta chiara per annunci, criteri ESG e flussi candidati coerenti.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-[16px] border border-white/60 bg-white/82 p-4 shadow-[0_16px_34px_-28px_rgba(16,25,36,0.14)]">
        <div className="grid gap-4 min-[1024px]:grid-cols-[minmax(0,1fr)_auto] min-[1024px]:items-center">
          <div>
            <p className="font-wedoo-body text-[12px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
              accesso rapido
            </p>
            <p className="font-wedoo-accent mt-2 text-[17px] leading-[1.08] text-brand-ink min-[1024px]:text-[18px]">
              entra con il provider che usi gia.
            </p>
          </div>
          <div className="min-[1024px]:w-[320px]">
            <LoginProviderButtons />
          </div>
        </div>

        {loginAuthViewModel.footerPrompt ? (
          <p className={cn(publicMetaTextClassName, "mt-5 text-center min-[1024px]:text-left")}>
            {loginAuthViewModel.footerPrompt.label}{" "}
            <Link className="font-wedoo-accent text-brand-violet underline" to={loginAuthViewModel.footerPrompt.linkTo}>
              {loginAuthViewModel.footerPrompt.linkLabel}
            </Link>
          </p>
        ) : null}
      </div>
    </div>
  );
}

function LoginDesktopView(props: {
  onInputChange: (fieldId: string, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  showFieldError: (field: LoginInputField) => boolean;
  termsAccepted: boolean;
  values: Record<string, string>;
}) {
  return (
    <section className="hidden min-[1024px]:block" data-login-layout="desktop">
      <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)]">
        <PublicBackdrop />
        <div className="relative mx-auto min-h-[900px] max-w-[1380px] px-10 py-8">
          <PublicPageHeader />
          <div className="mt-8 grid grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-6">
            <div className={cn(publicGlassPanelClassName, "p-6")}>
              <p className="font-wedoo-body text-[12px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                accesso candidato
              </p>
              <h1 className="font-wedoo-heading mt-4 text-[38px] leading-[0.94] text-brand-ink">
                {loginAuthViewModel.title}
              </h1>
              <h2 className="font-wedoo-accent mt-3 text-[18px] leading-none text-brand-ink">
                {loginAuthViewModel.subtitle}
              </h2>
              <p className={cn(publicMetaTextClassName, "mt-4 max-w-[290px]")}>
                Accedi, riprendi i draft e filtra opportunita che reggono anche oltre la cover.
              </p>

              <LoginFormBlock idPrefix="desktop-login" {...props} />
            </div>

            <LoginSupportColumn />
          </div>
        </div>
      </div>
    </section>
  );
}

function LoginMobileView(props: {
  onInputChange: (fieldId: string, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  showFieldError: (field: LoginInputField) => boolean;
  termsAccepted: boolean;
  values: Record<string, string>;
}) {
  return (
    <section className="min-[1024px]:hidden" data-login-layout="mobile">
      <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)] px-4 py-4">
        <PublicBackdrop compact />
        <div className="relative mx-auto max-w-[360px]">
          <PublicPageHeader compact />

          <div className={cn(publicPosterPanelClassName, "mt-4 overflow-hidden p-3")}>
            <div className={publicPosterMediaClassName}>
              <img
                alt=""
                className="h-[204px] w-full object-cover"
                src={assetPath(loginAuthViewModel.background)}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,30,0.08)_0%,rgba(17,19,30,0.56)_100%)]" />
              <div className="absolute inset-x-0 bottom-0 p-4">
                <p className="font-wedoo-body text-[11px] uppercase tracking-[0.18em] text-white/80">
                  accesso wedoo
                </p>
                <p className="font-wedoo-heading mt-2 text-[22px] leading-[0.94] text-white">
                  filtra il rumore.
                </p>
                <p className="font-wedoo-body mt-2 text-[14px] leading-[1.22] text-white/84">
                  Entra nel tuo portale con una shell coerente.
                </p>
              </div>
            </div>
          </div>

          <div className={cn(publicGlassPanelClassName, "relative mt-4 p-5")}>
            <p className="font-wedoo-body text-[11px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
              accesso candidato
            </p>
            <h1 className="font-wedoo-heading mt-3 text-[31px] leading-[0.92] text-brand-ink">
              {loginAuthViewModel.title}
            </h1>
            <h2 className="font-wedoo-accent mt-2 text-[19px] leading-none text-brand-ink">
              {loginAuthViewModel.subtitle}
            </h2>

            <LoginFormBlock idPrefix="mobile-login" {...props} />

            <div className="mt-6 border-t border-brand-violet-100 pt-4">
              <p className="font-wedoo-body text-center text-[14px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                accesso rapido
              </p>
              <div className="mt-4">
                <LoginProviderButtons compact />
              </div>
              {loginAuthViewModel.footerPrompt ? (
                <p className={cn(publicMetaTextClassName, "mt-4 text-center")}>
                  {loginAuthViewModel.footerPrompt.label}{" "}
                  <Link className="font-wedoo-accent text-brand-violet underline" to={loginAuthViewModel.footerPrompt.linkTo}>
                    {loginAuthViewModel.footerPrompt.linkLabel}
                  </Link>
                </p>
              ) : null}
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

  const viewProps = {
    onInputChange: handleInputChange,
    onSubmit: handleSubmit,
    onToggleTerms: toggleTerms,
    showFieldError,
    termsAccepted,
    values,
  };

  return (
    <main className="bg-[var(--wedoo-page-bg)] px-2 py-2 min-[1024px]:px-4 min-[1024px]:py-4">
      <LoginMobileView {...viewProps} />
      <LoginDesktopView {...viewProps} />
    </main>
  );
}
