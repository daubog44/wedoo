import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthCheckbox,
  AuthFormPanel,
  AuthWorkspacePanel,
} from "../../components/public";
import { PublicNavbar, SiteFooter } from "../../components/site";
import { passwordRecoveryViewModel } from "../../data/auth-recovery";
import { assetPath, cn } from "../../lib/site-utils";

const recoveryFields = passwordRecoveryViewModel.fields;

type PasswordRecoveryField = (typeof recoveryFields)[number];
type PasswordRecoveryFieldId = PasswordRecoveryField["id"];

function PasswordRecoveryInput({
  compact = false,
  field,
  inputId,
  onChange,
  value,
}: {
  compact?: boolean;
  field: PasswordRecoveryField;
  inputId: string;
  onChange: (value: string) => void;
  value: string;
}) {
  const autoComplete =
    field.id === "current-password"
      ? "current-password"
      : field.id === "new-password"
        ? "new-password"
        : "new-password";

  return (
    <label className="block w-full" htmlFor={inputId}>
      <span
        className={cn(
          "font-wedoo-accent mb-2 block text-[var(--wedoo-ink-strong)]",
          compact ? "text-[1rem]" : "text-[1.02rem]",
        )}
      >
        {field.label}
      </span>
      <input
        autoComplete={autoComplete}
        className={cn(
          "wedoo-theme-field font-wedoo-body w-full rounded-[14px] px-4 focus:outline-none focus:ring-2 focus:ring-[rgba(112,72,232,0.18)]",
          compact ? "h-[3.2rem] text-[1rem]" : "h-[3.3rem] text-[1rem]",
        )}
        id={inputId}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        type="password"
        value={value}
      />
    </label>
  );
}

function RecoverySubmitButton({ compact = false }: { compact?: boolean }) {
  return (
    <button
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center rounded-[16px] border border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[0_18px_40px_-30px_rgba(112,72,232,0.5)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]",
        compact ? "h-[3.35rem] w-full text-[1.15rem]" : "h-[3.35rem] w-full text-[1.18rem]",
      )}
      type="submit"
    >
      {passwordRecoveryViewModel.ctaLabel}
    </button>
  );
}

function RecoverySupportPrompt({ compact = false }: { compact?: boolean }) {
  const prompt = passwordRecoveryViewModel.supportPrompt;

  return (
    <p
      className={cn(
        "font-wedoo-body text-[var(--wedoo-ink-muted)]",
        compact ? "text-[1rem] leading-7" : "text-[1rem] leading-7",
      )}
    >
      {prompt.intro}{" "}
      <Link className="text-[var(--wedoo-violet)] underline underline-offset-4" to={prompt.linkTo}>
        {prompt.linkLabel}
      </Link>
      {prompt.outro}
    </p>
  );
}

function RecoveryDesktopView({
  onChangeField,
  onSubmit,
  onToggleTerms,
  termsAccepted,
  values,
}: {
  onChangeField: (fieldId: PasswordRecoveryFieldId, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  termsAccepted: boolean;
  values: Record<PasswordRecoveryFieldId, string>;
}) {
  return (
    <section className="hidden min-[1024px]:block" data-node-id="657:658" data-password-recovery-layout="desktop">
      <div className="mx-auto max-w-[1360px] px-8 pb-10 pt-6">
        <div className="grid gap-6 lg:grid-cols-[0.5fr_0.5fr]">
          <div className="wedoo-section-stack">
            <div className="wedoo-section-stack">
              <h1 className="wedoo-section-title">
                {passwordRecoveryViewModel.title}
              </h1>
              <p className="wedoo-reading-copy max-w-[30rem]">
                Reimposta l&apos;accesso senza uscire dal sistema. Nessun pop-up legacy, solo un flusso chiaro.
              </p>
            </div>

            <AuthFormPanel>
              <form className="space-y-5" noValidate onSubmit={onSubmit}>
                {recoveryFields.map((field) => (
                  <PasswordRecoveryInput
                    field={field}
                    inputId={`desktop-password-recovery-${field.id}`}
                    key={field.id}
                    onChange={(value) => onChangeField(field.id, value)}
                    value={values[field.id]}
                  />
                ))}

                <AuthCheckbox
                  checked={termsAccepted}
                  compact
                  label={passwordRecoveryViewModel.consentLabel}
                  onCheckedChange={onToggleTerms}
                />

                <RecoverySubmitButton />
              </form>

              <div className="mt-6 space-y-3 border-t border-[var(--wedoo-line)] pt-5">
                <p className="font-wedoo-body text-sm leading-7 text-[var(--wedoo-ink-muted)] italic">
                  {passwordRecoveryViewModel.reloginNote}
                </p>
                <RecoverySupportPrompt />
              </div>
            </AuthFormPanel>
          </div>

          <AuthWorkspacePanel className="min-h-[42rem] wedoo-depth-card wedoo-reveal wedoo-reveal-delay-1">
            <img
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
              src={assetPath("image_noixnoi2.jpg")}
            />
            <div className="absolute inset-0" style={{ background: "var(--wedoo-media-overlay)" }} />
            <div className="relative z-10 flex h-full flex-col justify-between gap-8">
              <div className="wedoo-section-stack">
                <span className="wedoo-workspace-chip">password reset</span>
                <p className="wedoo-workspace-title max-w-[24rem] text-[var(--wedoo-workspace-text)]">
                  La parte sensibile resta leggibile e calma.
                </p>
              </div>

              <div className="grid gap-3">
                <div className="wedoo-workspace-panel px-4 py-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                    policy
                  </p>
                  <p className="wedoo-reading-copy-compact mt-2 text-[var(--wedoo-workspace-text)]">
                    Al salvataggio il sistema ti richiede un nuovo accesso, senza ambiguita o passaggi decorativi.
                  </p>
                </div>
                <div className="wedoo-workspace-panel px-4 py-4">
                  <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                    fallback
                  </p>
                  <p className="wedoo-reading-copy-compact mt-2 text-[var(--wedoo-workspace-text)]">
                    Se qualcosa non torna, l&apos;assistenza clienti e nello stesso linguaggio UI del resto del prodotto.
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

function RecoveryMobileView({
  onChangeField,
  onSubmit,
  onToggleTerms,
  termsAccepted,
  values,
}: {
  onChangeField: (fieldId: PasswordRecoveryFieldId, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  termsAccepted: boolean;
  values: Record<PasswordRecoveryFieldId, string>;
}) {
  return (
    <section className="min-[1024px]:hidden" data-node-id="660:774" data-password-recovery-layout="mobile">
      <div className="mx-auto max-w-[390px] px-4 pb-8 pt-5">
        <div className="wedoo-section-stack">
          <h1 className="wedoo-section-title">
            {passwordRecoveryViewModel.title}
          </h1>

          <AuthFormPanel>
            <form className="space-y-5" noValidate onSubmit={onSubmit}>
              {recoveryFields.map((field) => (
                <PasswordRecoveryInput
                  compact
                  field={field}
                  inputId={`mobile-password-recovery-${field.id}`}
                  key={field.id}
                  onChange={(value) => onChangeField(field.id, value)}
                  value={values[field.id]}
                />
              ))}

              <AuthCheckbox
                checked={termsAccepted}
                compact
                label={passwordRecoveryViewModel.consentLabel}
                onCheckedChange={onToggleTerms}
              />

              <RecoverySubmitButton compact />
            </form>

            <div className="mt-5 space-y-3 border-t border-[var(--wedoo-line)] pt-5">
              <p className="font-wedoo-body text-sm leading-7 text-[var(--wedoo-ink-muted)] italic">
                {passwordRecoveryViewModel.reloginNote}
              </p>
              <RecoverySupportPrompt compact />
            </div>
          </AuthFormPanel>
        </div>
      </div>
    </section>
  );
}

export default function PasswordRecoveryPage() {
  const navigate = useNavigate();
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [values, setValues] = useState<Record<PasswordRecoveryFieldId, string>>({
    "confirm-password": "",
    "current-password": "",
    "new-password": "",
  });

  function handleChangeField(fieldId: PasswordRecoveryFieldId, value: string) {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldId]: value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isComplete = recoveryFields.every((field) => values[field.id].trim().length > 0);
    if (!termsAccepted || !isComplete) {
      return;
    }

    if (values["new-password"] !== values["confirm-password"]) {
      return;
    }

    navigate(passwordRecoveryViewModel.redirectTo);
  }

  function handleToggleTerms() {
    setTermsAccepted((currentValue) => !currentValue);
  }

  return (
    <>
      <main className="min-h-screen bg-[var(--wedoo-page-bg)]">
        <PublicNavbar />
        <RecoveryMobileView
          onChangeField={handleChangeField}
          onSubmit={handleSubmit}
          onToggleTerms={handleToggleTerms}
          termsAccepted={termsAccepted}
          values={values}
        />
        <RecoveryDesktopView
          onChangeField={handleChangeField}
          onSubmit={handleSubmit}
          onToggleTerms={handleToggleTerms}
          termsAccepted={termsAccepted}
          values={values}
        />
      </main>
      <SiteFooter className="mt-0" />
    </>
  );
}
