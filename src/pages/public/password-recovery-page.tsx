import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SiteIcon } from "../../components/site";
import { passwordRecoveryViewModel } from "../../data/auth-recovery";
import { assetPath, cn } from "../../lib/site-utils";

const recoveryFields = passwordRecoveryViewModel.fields;

type PasswordRecoveryField = (typeof recoveryFields)[number];
type PasswordRecoveryFieldId = PasswordRecoveryField["id"];

const desktopPct = (value: number) => `${(value / 1440) * 100}%`;

function RecoveryLanguageChip({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#767676] bg-[#e3e3e3] text-[#1e1e1e] opacity-50",
        compact ? "h-[22px] w-[57px] px-2 text-[14px] leading-none" : "h-8 w-[57px] px-3 text-[16px] leading-none",
        className,
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className="h-4 w-4" name="chevron-down" />
    </button>
  );
}

function RecoveryLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/">
      <img
        alt="Wedoo"
        className={compact ? "h-[49px] w-[184px] object-contain" : "h-[91px] w-[340px] object-contain"}
        src={assetPath("Frame-2@2x.png")}
      />
    </Link>
  );
}

function RecoveryCheckIcon() {
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
    <div className={cn("flex items-start", compact ? "gap-[9px]" : "gap-[7px]")}>
      <button
        aria-checked={checked}
        aria-label={label}
        className="grid h-[23px] w-[23px] shrink-0 place-items-center rounded-[4px] bg-[var(--brand-mint)] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-violet)]"
        onClick={onToggle}
        role="checkbox"
        type="button"
      >
        {checked ? (
          <span className="grid h-[23px] w-[23px] place-items-center rounded-[4px] bg-[var(--brand-violet)] text-[var(--wedoo-white-soft)]">
            <RecoveryCheckIcon />
          </span>
        ) : null}
      </button>

      <button
        className={cn(
          "font-wedoo-body whitespace-nowrap pt-[1px] text-left text-[var(--wedoo-ink)] transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--brand-violet)]",
          compact ? "w-[251px] text-[18px] leading-none" : "w-[305px] text-[22px] leading-none",
        )}
        onClick={onToggle}
        type="button"
      >
        {label}
      </button>
    </div>
  );
}

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
          "font-wedoo-accent block text-[var(--wedoo-ink)]",
          compact ? "mb-2 text-[24px] leading-none" : "mb-2 text-[24px] leading-none",
        )}
      >
        {field.label}
      </span>
      <input
        autoComplete={autoComplete}
        className={cn(
          "font-wedoo-body w-full rounded-[8px] border border-[#cdbdf4] bg-[var(--wedoo-white-soft)] text-[var(--wedoo-ink)] placeholder:text-[rgba(33,37,41,0.4)] focus:outline-none",
          compact ? "h-[46px] px-[13px] text-[18px]" : "h-[50px] px-4 text-[22px]",
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
        "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] border border-[#7447e1] bg-[#7447e1] text-[var(--wedoo-white-soft)] transition hover:bg-[#613cbd]",
        compact ? "h-[52px] w-full text-[24px]" : "h-[52px] w-full text-[24px]",
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
        "font-wedoo-body text-center text-[var(--wedoo-ink)]",
        compact ? "text-[18px] leading-[1.1]" : "text-[22px] leading-[1.2]",
      )}
    >
      {prompt.intro}
      <br />
      <span>{`contatta l’`}</span>
      <Link className="underline" to={prompt.linkTo}>
        {prompt.linkLabel}
      </Link>
      <span>{prompt.outro}</span>
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
      <div className="relative mx-auto h-[1024px] w-full max-w-[1440px] overflow-hidden">
        <div className="absolute left-[84px] top-[46px] h-[272px] w-[201px] rounded-[55px] bg-[var(--wedoo-mint)] [transform:rotate(-1.6deg)]" />
        <div className="absolute left-[34px] top-[470px] h-[251px] w-[217px] rounded-[72px] bg-[var(--wedoo-violet)] [transform:rotate(-39deg)]" />
        <div className="absolute left-[740px] top-[221px] h-[250px] w-[224px] rounded-[74px] bg-[var(--wedoo-mint)] [transform:rotate(-19deg)]" />

        <div className="absolute top-[50px]" style={{ left: desktopPct(1314) }}>
          <RecoveryLanguageChip />
        </div>

        <div className="absolute left-1/2 top-[94px] -translate-x-1/2">
          <RecoveryLogo />
        </div>

        <h1 className="font-wedoo-accent absolute left-1/2 top-[199px] w-[364px] -translate-x-1/2 text-center text-[36px] leading-none text-[var(--wedoo-ink)]">
          {passwordRecoveryViewModel.title}
        </h1>

        <form
          className="absolute left-1/2 top-[272px] w-[368px] -translate-x-1/2 rounded-[20px] border-[3px] border-[#7447e1] bg-[rgba(247,247,247,0.98)] px-6 pb-7 pt-6"
          noValidate
          onSubmit={onSubmit}
        >
          {recoveryFields.map((field, index) => (
            <div className={index === 0 ? "" : "mt-[18px]"} key={field.id}>
              <PasswordRecoveryInput
                field={field}
                inputId={`desktop-password-recovery-${field.id}`}
                onChange={(value) => onChangeField(field.id, value)}
                value={values[field.id]}
              />
            </div>
          ))}

          <div className="mt-[18px]">
            <RecoveryConsentRow
              checked={termsAccepted}
              label={passwordRecoveryViewModel.consentLabel}
              onToggle={onToggleTerms}
            />
          </div>

          <div className="mt-6">
            <RecoverySubmitButton />
          </div>
        </form>

        <p className="font-wedoo-body absolute left-1/2 top-[785px] w-[577px] -translate-x-1/2 text-center text-[22px] leading-[1.15] text-[var(--wedoo-ink)] italic">
          {passwordRecoveryViewModel.reloginNote}
        </p>

        <div className="absolute left-1/2 top-[877px] w-[577px] -translate-x-1/2">
          <RecoverySupportPrompt />
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
      <div className="mx-auto min-h-[800px] w-full max-w-[360px]">
        <div className="relative h-[800px] px-[13px]">
          <div className="absolute right-[24px] top-[23px]">
            <RecoveryLanguageChip compact />
          </div>

          <div className="absolute left-[89px] top-[23px]">
            <RecoveryLogo compact />
          </div>

          <h1 className="font-wedoo-accent absolute left-1/2 top-[77px] w-[320px] -translate-x-1/2 text-center text-[30px] leading-none text-[var(--wedoo-ink)]">
            {passwordRecoveryViewModel.title}
          </h1>

          <form
            className="absolute left-[13px] top-[128px] w-[336px] rounded-[20px] border-[3px] border-[#7447e1] bg-[rgba(247,247,247,0.98)] px-3 pb-[20px] pt-[21px]"
            noValidate
            onSubmit={onSubmit}
          >
            {recoveryFields.map((field, index) => (
              <div className={index === 0 ? "" : "mt-[18px]"} key={field.id}>
                <PasswordRecoveryInput
                  compact
                  field={field}
                  inputId={`mobile-password-recovery-${field.id}`}
                  onChange={(value) => onChangeField(field.id, value)}
                  value={values[field.id]}
                />
              </div>
            ))}

            <div className="mt-4">
              <RecoveryConsentRow
                checked={termsAccepted}
                compact
                label={passwordRecoveryViewModel.consentLabel}
                onToggle={onToggleTerms}
              />
            </div>

            <div className="mt-5">
              <RecoverySubmitButton compact />
            </div>
          </form>

          <p className="font-wedoo-body absolute left-1/2 top-[595px] w-[336px] -translate-x-1/2 text-center text-[18px] leading-[1.15] text-[var(--wedoo-ink)] italic">
            {passwordRecoveryViewModel.reloginNote}
          </p>

          <div className="absolute left-1/2 top-[659px] w-[336px] -translate-x-1/2">
            <RecoverySupportPrompt compact />
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

  return (
    <main className="min-h-screen bg-[var(--wedoo-page-bg)] pt-2">
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
  );
}
