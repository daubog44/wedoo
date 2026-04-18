import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthCheckbox,
  PublicActionButton,
  PublicBackdrop,
  PublicPageHeader,
  publicFieldErrorClassName,
  publicGlassPanelClassName,
  publicInputClassName,
  publicInputLabelClassName,
  publicMetaTextClassName,
  publicPosterPanelClassName,
} from "../../components/public";
import { passwordRecoveryViewModel } from "../../data/auth-recovery";
import { cn } from "../../lib/site-utils";

const recoveryFields = passwordRecoveryViewModel.fields;

type PasswordRecoveryField = (typeof recoveryFields)[number];
type PasswordRecoveryFieldId = PasswordRecoveryField["id"];

function PasswordRecoveryInput({
  field,
  inputId,
  onChange,
  value,
}: {
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
      <span className={publicInputLabelClassName}>{field.label}</span>
      <input
        autoComplete={autoComplete}
        className={publicInputClassName}
        id={inputId}
        onChange={(event) => onChange(event.target.value)}
        placeholder={field.placeholder}
        type="password"
        value={value}
      />
      <span className={cn(publicFieldErrorClassName, "opacity-0")}>.</span>
    </label>
  );
}

function RecoveryConsentRow({
  checked,
  compact = false,
  label,
  onToggle,
}: {
  checked: boolean;
  compact?: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <AuthCheckbox
      checked={checked}
      compact={compact}
      label={label}
      onCheckedChange={() => onToggle()}
    />
  );
}

function RecoverySupportPrompt() {
  const prompt = passwordRecoveryViewModel.supportPrompt;

  return (
    <p className={publicMetaTextClassName}>
      {prompt.intro}{" "}
      <Link className="font-wedoo-accent text-brand-violet underline" to={prompt.linkTo}>
        {prompt.linkLabel}
      </Link>
      <span>{prompt.outro}</span>
    </p>
  );
}

function RecoveryForm({
  idPrefix,
  onChangeField,
  onSubmit,
  onToggleTerms,
  termsAccepted,
  values,
}: {
  idPrefix: string;
  onChangeField: (fieldId: PasswordRecoveryFieldId, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  termsAccepted: boolean;
  values: Record<PasswordRecoveryFieldId, string>;
}) {
  return (
    <form className="mt-6 space-y-4 min-[1024px]:mt-8 min-[1024px]:space-y-5" noValidate onSubmit={onSubmit}>
      {recoveryFields.map((field) => (
        <PasswordRecoveryInput
          field={field}
          inputId={`${idPrefix}-${field.id}`}
          key={field.id}
          onChange={(value) => onChangeField(field.id, value)}
          value={values[field.id]}
        />
      ))}

      <RecoveryConsentRow
        checked={termsAccepted}
        label={passwordRecoveryViewModel.consentLabel}
        onToggle={onToggleTerms}
      />

      <div className="pt-2">
        <PublicActionButton fullWidth type="submit">
          {passwordRecoveryViewModel.ctaLabel}
        </PublicActionButton>
      </div>
    </form>
  );
}

function RecoveryDesktopView(props: {
  onChangeField: (fieldId: PasswordRecoveryFieldId, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  termsAccepted: boolean;
  values: Record<PasswordRecoveryFieldId, string>;
}) {
  return (
    <section
      className="hidden min-[1024px]:block"
      data-node-id="657:658"
      data-password-recovery-layout="desktop"
    >
      <div className="relative overflow-hidden rounded-[44px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)]">
        <PublicBackdrop />
        <div className="relative mx-auto min-h-[1024px] max-w-[1320px] px-10 py-8">
          <PublicPageHeader />

          <div className="mt-10 grid grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-8">
            <div className={cn(publicPosterPanelClassName, "p-8")}>
              <p className="font-wedoo-body text-[13px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                sicurezza account
              </p>
              <h1 className="font-wedoo-heading mt-4 text-[48px] leading-[0.92] text-brand-ink">
                {passwordRecoveryViewModel.title}
              </h1>
              <p className={cn(publicMetaTextClassName, "mt-5 max-w-[340px]")}>
                Reimposta le credenziali senza rompere il flow. La pagina resta chiara, compatta e coerente con il resto del sistema.
              </p>

              <div className="mt-8 rounded-[28px] border border-white/60 bg-white/82 p-5 shadow-[0_24px_60px_-48px_rgba(16,25,36,0.68)]">
                <p className="font-wedoo-accent text-[24px] leading-[1.02] text-brand-ink">
                  {passwordRecoveryViewModel.reloginNote}
                </p>
                <div className="mt-5">
                  <RecoverySupportPrompt />
                </div>
              </div>
            </div>

            <div className={cn(publicGlassPanelClassName, "p-8")}>
              <p className="font-wedoo-body text-[13px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                credenziali
              </p>
              <h2 className="font-wedoo-accent mt-4 text-[24px] leading-none text-brand-ink">
                aggiorna la password e torna nel portale.
              </h2>
              <RecoveryForm idPrefix="desktop-password-recovery" {...props} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RecoveryMobileView(props: {
  onChangeField: (fieldId: PasswordRecoveryFieldId, value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onToggleTerms: () => void;
  termsAccepted: boolean;
  values: Record<PasswordRecoveryFieldId, string>;
}) {
  return (
    <section
      className="min-[1024px]:hidden"
      data-node-id="660:774"
      data-password-recovery-layout="mobile"
    >
      <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)] px-4 py-4">
        <PublicBackdrop compact />
        <div className="relative mx-auto max-w-[360px]">
          <PublicPageHeader compact />

          <div className={cn(publicGlassPanelClassName, "mt-4 p-5")}>
            <p className="font-wedoo-body text-[11px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
              sicurezza account
            </p>
            <h1 className="font-wedoo-heading mt-3 text-[34px] leading-[0.92] text-brand-ink">
              {passwordRecoveryViewModel.title}
            </h1>
            <p className={cn(publicMetaTextClassName, "mt-4")}>
              {passwordRecoveryViewModel.reloginNote}
            </p>

            <RecoveryForm idPrefix="mobile-password-recovery" {...props} />
          </div>

          <div className={cn(publicPosterPanelClassName, "mt-4 p-5")}>
            <p className="font-wedoo-body text-[11px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
              supporto
            </p>
            <div className="mt-3">
              <RecoverySupportPrompt />
            </div>
          </div>
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

  const viewProps = {
    onChangeField: handleChangeField,
    onSubmit: handleSubmit,
    onToggleTerms: handleToggleTerms,
    termsAccepted,
    values,
  };

  return (
    <main className="min-h-screen bg-[var(--wedoo-page-bg)] px-2 py-2 min-[1024px]:px-4 min-[1024px]:py-4">
      <RecoveryMobileView {...viewProps} />
      <RecoveryDesktopView {...viewProps} />
    </main>
  );
}
