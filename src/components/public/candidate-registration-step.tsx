import { Link } from "react-router-dom";
import { candidateRegistrationAuthViewModel } from "../../data/auth";
import type { CandidateOnboardingAccountDraft } from "../../data/candidate-onboarding";
import {
  AuthCheckbox,
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
} from "../public";
import { assetPath, cn } from "../../lib/site-utils";
import { candidateOnboardingPrivacyLink } from "./candidate-onboarding-utils";

const candidateRegistrationInputFields =
  candidateRegistrationAuthViewModel.fields.filter(
    (field): field is Extract<
      (typeof candidateRegistrationAuthViewModel.fields)[number],
      { kind: "input" }
    > => field.kind === "input",
  );

const candidateRegistrationPrivacyField =
  candidateRegistrationAuthViewModel.fields.find(
    (field): field is Extract<
      (typeof candidateRegistrationAuthViewModel.fields)[number],
      { kind: "checkbox" }
    > => field.kind === "checkbox",
  );

function CandidateRegistrationInput({
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
      <label
        className={cn(
          publicInputLabelClassName,
          compact ? "text-[18px] min-[1024px]:text-[18px]" : "",
        )}
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={cn(
          publicInputClassName,
          compact ? "h-[46px] text-[16px] min-[1024px]:h-[46px] min-[1024px]:text-[16px]" : "",
        )}
        data-node-id="281:1255"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      <span className={cn(publicFieldErrorClassName, "opacity-0")}>.</span>
    </div>
  );
}

function CandidateProviderButtons({ compact = false }: { compact?: boolean }) {
  const providerOptions = candidateRegistrationAuthViewModel.providerOptions ?? [];

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

function CandidateRegistrationForm({
  compact = false,
  onContinue,
  onFieldChange,
  onTogglePrivacy,
  values,
}: {
  compact?: boolean;
  onContinue: () => void;
  onFieldChange: (
    field: Exclude<keyof CandidateOnboardingAccountDraft, "privacyAccepted">,
    value: string,
  ) => void;
  onTogglePrivacy: (checked: boolean) => void;
  values: CandidateOnboardingAccountDraft;
}) {
  return (
    <div className="mt-6 space-y-3 min-[1024px]:mt-8 min-[1024px]:space-y-4">
      <CandidateRegistrationInput
        compact={compact}
        id={`${compact ? "mobile" : "desktop"}-candidate-register-full-name`}
        label={candidateRegistrationInputFields[0]?.label ?? "nome e cognome*"}
        onChange={(value) => onFieldChange("fullName", value)}
        placeholder={
          candidateRegistrationInputFields[0]?.placeholder ??
          "inserisci nome e cognome"
        }
        value={values.fullName}
      />
      <CandidateRegistrationInput
        compact={compact}
        id={`${compact ? "mobile" : "desktop"}-candidate-register-email`}
        label={candidateRegistrationInputFields[1]?.label ?? "e-mail*"}
        onChange={(value) => onFieldChange("email", value)}
        placeholder={candidateRegistrationInputFields[1]?.placeholder ?? "inserisci la mail"}
        type="email"
        value={values.email}
      />
      <CandidateRegistrationInput
        compact={compact}
        id={`${compact ? "mobile" : "desktop"}-candidate-register-phone`}
        label={candidateRegistrationInputFields[2]?.label ?? "numero di telefono*"}
        onChange={(value) => onFieldChange("phone", value)}
        placeholder={
          candidateRegistrationInputFields[2]?.placeholder ??
          "inserisci il numero di telefono"
        }
        type="tel"
        value={values.phone}
      />
      <CandidateRegistrationInput
        compact={compact}
        id={`${compact ? "mobile" : "desktop"}-candidate-register-password`}
        label={candidateRegistrationInputFields[3]?.label ?? "password*"}
        onChange={(value) => onFieldChange("password", value)}
        placeholder={
          candidateRegistrationInputFields[3]?.placeholder ?? "inserisci una password"
        }
        type="password"
        value={values.password}
      />
      <CandidateRegistrationInput
        compact={compact}
        id={`${compact ? "mobile" : "desktop"}-candidate-register-confirm-password`}
        label={candidateRegistrationInputFields[4]?.label ?? "conferma password*"}
        onChange={(value) => onFieldChange("confirmPassword", value)}
        placeholder={
          candidateRegistrationInputFields[4]?.placeholder ?? "re-inserisci la password"
        }
        type="password"
        value={values.confirmPassword}
      />

      {candidateRegistrationPrivacyField ? (
        <AuthCheckbox
          checked={values.privacyAccepted}
          compact={compact}
          label={candidateRegistrationPrivacyField.label}
          linkHref={candidateOnboardingPrivacyLink()}
          linkLabel={candidateRegistrationPrivacyField.linkLabel}
          onCheckedChange={onTogglePrivacy}
        />
      ) : null}

      <div className="pt-2">
        <PublicActionButton fullWidth tone="mint" type="button" onClick={onContinue}>
          {candidateRegistrationAuthViewModel.ctaLabel}
        </PublicActionButton>
      </div>
    </div>
  );
}

export function CandidateRegistrationStep({
  onContinue,
  onFieldChange,
  onTogglePrivacy,
  values,
}: {
  onContinue: () => void;
  onFieldChange: (
    field: Exclude<keyof CandidateOnboardingAccountDraft, "privacyAccepted">,
    value: string,
  ) => void;
  onTogglePrivacy: (checked: boolean) => void;
  values: CandidateOnboardingAccountDraft;
}) {
  const loginPrompt = candidateRegistrationAuthViewModel.footerPrompt;

  return (
    <main className="bg-brand-page px-2 py-2 min-[1024px]:px-4 min-[1024px]:py-4">
      <section
        className="hidden min-[1024px]:block"
        data-candidate-onboarding-layout="desktop"
        data-candidate-onboarding-step="1"
        data-testid="candidate-registration-step"
      >
        <div className="relative overflow-hidden rounded-[44px] bg-[linear-gradient(180deg,#eefaf6_0%,#f7f4ff_100%)]">
          <PublicBackdrop tone="mint" />
          <div className="relative mx-auto min-h-[1024px] max-w-[1400px] px-10 py-8">
            <PublicPageHeader />

            <div className="mt-10 grid grid-cols-[minmax(0,430px)_minmax(0,1fr)] gap-8">
              <div className={cn(publicGlassPanelClassName, "p-8")}>
                <p className="font-wedoo-body text-[13px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                  onboarding candidato
                </p>
                <h1 className="font-wedoo-heading mt-4 text-[48px] leading-[0.92] text-brand-ink">
                  Benvenut*!
                </h1>
                <p className="font-wedoo-accent mt-3 text-[24px] leading-none text-brand-ink">
                  {candidateRegistrationAuthViewModel.subtitle}
                </p>
                <p className={cn(publicMetaTextClassName, "mt-4 max-w-[320px]")}>
                  Crea il profilo iniziale con la stessa grammatica pulita del nuovo ingresso pubblico.
                </p>

                <CandidateRegistrationForm
                  onContinue={onContinue}
                  onFieldChange={onFieldChange}
                  onTogglePrivacy={onTogglePrivacy}
                  values={values}
                />
              </div>

              <div className={cn(publicPosterPanelClassName, "grid min-h-[760px] grid-rows-[minmax(0,1fr)_auto] p-6")}>
                <div className={publicPosterMediaClassName}>
                  <img
                    alt=""
                    className="h-full min-h-[420px] w-full object-cover"
                    src={assetPath("formcandidati1.png")}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,30,0.08)_0%,rgba(17,19,30,0.52)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="font-wedoo-body text-[13px] uppercase tracking-[0.2em] text-white/82">
                      percorso candidato
                    </p>
                    <h2 className="font-wedoo-heading mt-3 max-w-[500px] text-[48px] leading-[0.92] text-white">
                      parti da un profilo chiaro, poi rifinisci preferenze e matching.
                    </h2>
                    <p className="font-wedoo-body mt-4 max-w-[420px] text-[19px] leading-[1.28] text-white/86">
                      Nessun canvas rigido da vecchio prototype: solo una shell coerente con il resto dell&apos;esperienza.
                    </p>
                  </div>
                </div>

                <div className="mt-6 rounded-[28px] border border-white/60 bg-white/78 p-5 shadow-[0_24px_70px_-50px_rgba(16,25,36,0.7)]">
                  <div className="flex items-center gap-4 text-brand-ink">
                    <span className="h-px flex-1 bg-brand-ink/20" />
                    <span className="font-wedoo-body text-[14px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                      accesso rapido
                    </span>
                    <span className="h-px flex-1 bg-brand-ink/20" />
                  </div>
                  <div className="mt-4">
                    <CandidateProviderButtons />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="min-[1024px]:hidden"
        data-candidate-onboarding-layout="mobile"
        data-candidate-onboarding-step="1"
        data-testid="candidate-registration-step"
      >
        <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#eefaf6_0%,#f7f4ff_100%)] px-4 py-4">
          <PublicBackdrop compact tone="mint" />
          <div className="relative mx-auto max-w-[360px]">
            <PublicPageHeader compact />

            <div className={cn(publicPosterPanelClassName, "mt-4 p-3")}>
              <div className={publicPosterMediaClassName}>
                <img
                  alt=""
                  className="h-[240px] w-full object-cover"
                  src={assetPath("formcandidati1.png")}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,30,0.1)_0%,rgba(17,19,30,0.54)_100%)]" />
              </div>
            </div>

            <div className={cn(publicGlassPanelClassName, "mt-4 p-5")}>
              <p className="font-wedoo-body text-[11px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                onboarding candidato
              </p>
              <h1 className="font-wedoo-heading mt-3 text-[34px] leading-[0.92] text-brand-ink">
                Piacere di conoscerti!
              </h1>
              <p className="font-wedoo-accent mt-2 text-[22px] leading-none text-brand-ink">
                {candidateRegistrationAuthViewModel.subtitle}
              </p>

              <CandidateRegistrationForm
                compact
                onContinue={onContinue}
                onFieldChange={onFieldChange}
                onTogglePrivacy={onTogglePrivacy}
                values={values}
              />

              <div className="mt-6 border-t border-brand-mint-200 pt-4">
                <div className="flex items-center gap-4 text-brand-ink">
                  <span className="h-px flex-1 bg-brand-ink/20" />
                  <span className="font-wedoo-body text-[14px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                    accesso rapido
                  </span>
                  <span className="h-px flex-1 bg-brand-ink/20" />
                </div>
                <div className="mt-4">
                  <CandidateProviderButtons compact />
                </div>
                {loginPrompt ? (
                  <p className={cn(publicMetaTextClassName, "mt-4 text-center")}>
                    {loginPrompt.label}{" "}
                    <Link className="font-wedoo-accent text-brand-violet underline" to={loginPrompt.linkTo}>
                      {loginPrompt.linkLabel}
                    </Link>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
