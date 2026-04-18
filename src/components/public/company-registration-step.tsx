import { Link } from "react-router-dom";
import { companyRegistrationAuthViewModel } from "../../data/auth";
import type { CompanyRegistrationDraft } from "../../data/company-onboarding";
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
import { companyWizardPrivacyLink } from "./company-wizard-utils";

const companyRegistrationInputFields = companyRegistrationAuthViewModel.fields.filter(
  (field): field is Extract<
    (typeof companyRegistrationAuthViewModel.fields)[number],
    { kind: "input" }
  > => field.kind === "input",
);

const companyRegistrationPrivacyField = companyRegistrationAuthViewModel.fields.find(
  (field): field is Extract<
    (typeof companyRegistrationAuthViewModel.fields)[number],
    { kind: "checkbox" }
  > => field.kind === "checkbox",
);

function CompanyRegistrationInput({
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
          "border-brand-violet-200 focus:border-brand-violet",
          compact ? "h-[46px] text-[16px] min-[1024px]:h-[46px] min-[1024px]:text-[16px]" : "",
        )}
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

function CompanyProviderButtons({ compact = false }: { compact?: boolean }) {
  const providerOptions = companyRegistrationAuthViewModel.providerOptions ?? [];

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

function CompanyRegistrationForm({
  compact = false,
  onContinue,
  onFieldChange,
  onTogglePrivacy,
  values,
}: {
  compact?: boolean;
  onContinue: () => void;
  onFieldChange: (field: Exclude<keyof CompanyRegistrationDraft, "privacyAccepted">, value: string) => void;
  onTogglePrivacy: (checked: boolean) => void;
  values: CompanyRegistrationDraft;
}) {
  return (
    <div className="mt-6 space-y-3 min-[1024px]:mt-8 min-[1024px]:space-y-4">
      <CompanyRegistrationInput
        compact={compact}
        id={`${compact ? "mobile" : "desktop"}-company-register-vat`}
        label={companyRegistrationInputFields[0]?.label ?? "partita IVA"}
        onChange={(value) => onFieldChange("vat", value)}
        placeholder={companyRegistrationInputFields[0]?.placeholder ?? "inserisci p. IVA"}
        value={values.vat}
      />
      <CompanyRegistrationInput
        compact={compact}
        id={`${compact ? "mobile" : "desktop"}-company-register-company`}
        label={companyRegistrationInputFields[1]?.label ?? "ragione sociale*"}
        onChange={(value) => onFieldChange("company", value)}
        placeholder={
          companyRegistrationInputFields[1]?.placeholder ?? "inserisci ragione sociale"
        }
        value={values.company}
      />
      <CompanyRegistrationInput
        compact={compact}
        id={`${compact ? "mobile" : "desktop"}-company-register-email`}
        label={companyRegistrationInputFields[2]?.label ?? "e-mail*"}
        onChange={(value) => onFieldChange("email", value)}
        placeholder={companyRegistrationInputFields[2]?.placeholder ?? "inserisci la mail"}
        type="email"
        value={values.email}
      />
      <CompanyRegistrationInput
        compact={compact}
        id={`${compact ? "mobile" : "desktop"}-company-register-phone`}
        label={companyRegistrationInputFields[3]?.label ?? "numero di telefono*"}
        onChange={(value) => onFieldChange("phone", value)}
        placeholder={
          companyRegistrationInputFields[3]?.placeholder ?? "inserisci il numero di telefono"
        }
        type="tel"
        value={values.phone}
      />

      {companyRegistrationPrivacyField ? (
        <AuthCheckbox
          checked={values.privacyAccepted}
          compact={compact}
          label={companyRegistrationPrivacyField.label}
          linkHref={companyWizardPrivacyLink()}
          linkLabel={companyRegistrationPrivacyField.linkLabel}
          onCheckedChange={onTogglePrivacy}
        />
      ) : null}

      <div className="pt-2">
        <PublicActionButton fullWidth tone="violet" type="button" onClick={onContinue}>
          registrati
        </PublicActionButton>
      </div>
    </div>
  );
}

export function CompanyRegistrationStep({
  onContinue,
  onFieldChange,
  onTogglePrivacy,
  values,
}: {
  onContinue: () => void;
  onFieldChange: (field: Exclude<keyof CompanyRegistrationDraft, "privacyAccepted">, value: string) => void;
  onTogglePrivacy: (checked: boolean) => void;
  values: CompanyRegistrationDraft;
}) {
  const loginPrompt = companyRegistrationAuthViewModel.footerPrompt;

  return (
    <main className="bg-brand-page px-2 py-2 min-[1024px]:px-4 min-[1024px]:py-4">
      <section
        className="hidden min-[1024px]:block"
        data-company-wizard-layout="desktop"
        data-company-wizard-step="1"
        data-testid="company-registration-step-1"
      >
        <div className="relative overflow-hidden rounded-[44px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)]">
          <PublicBackdrop />
          <div className="relative mx-auto min-h-[1024px] max-w-[1400px] px-10 py-8">
            <PublicPageHeader />

            <div className="mt-10 grid grid-cols-[minmax(0,430px)_minmax(0,1fr)] gap-8">
              <div className={cn(publicGlassPanelClassName, "p-8")}>
                <p className="font-wedoo-body text-[13px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                  onboarding azienda
                </p>
                <h1 className="font-wedoo-heading mt-4 text-[48px] leading-[0.92] text-brand-ink">
                  Benvenut*!
                </h1>
                <p className="font-wedoo-accent mt-3 text-[24px] leading-[1.05] text-brand-ink">
                  Compila il tuo primo annuncio per registrarti
                </p>
                <p className={cn(publicMetaTextClassName, "mt-4 max-w-[330px]")}>
                  Entra con una shell piu pulita e prepara il primo annuncio senza partire da un vecchio mock rigido.
                </p>

                <CompanyRegistrationForm
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
                    src={assetPath("formaziende1.png")}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,30,0.1)_0%,rgba(17,19,30,0.48)_100%)]" />
                  <div className="absolute inset-x-0 bottom-0 p-8">
                    <p className="font-wedoo-body text-[13px] uppercase tracking-[0.2em] text-white/82">
                      percorso azienda
                    </p>
                    <h2 className="font-wedoo-heading mt-3 max-w-[520px] text-[48px] leading-[0.92] text-white">
                      prepara il primo annuncio da una base chiara e gia coerente col portale.
                    </h2>
                    <p className="font-wedoo-body mt-4 max-w-[420px] text-[19px] leading-[1.28] text-white/86">
                      CTA, campi e provider restano allineati al nuovo linguaggio pubblico invece di vivere in una shell separata.
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
                    <CompanyProviderButtons />
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
        </div>
      </section>

      <section
        className="min-[1024px]:hidden"
        data-company-wizard-layout="mobile"
        data-company-wizard-step="1"
        data-testid="company-registration-step-1"
      >
        <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)] px-4 py-4">
          <PublicBackdrop compact />
          <div className="relative mx-auto max-w-[360px]">
            <PublicPageHeader compact />

            <div className={cn(publicPosterPanelClassName, "mt-4 p-3")}>
              <div className={publicPosterMediaClassName}>
                <img
                  alt=""
                  className="h-[240px] w-full object-cover"
                  src={assetPath("formaziende1.png")}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,30,0.08)_0%,rgba(17,19,30,0.52)_100%)]" />
              </div>
            </div>

            <div className={cn(publicGlassPanelClassName, "mt-4 p-5")}>
              <p className="font-wedoo-body text-[11px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                onboarding azienda
              </p>
              <h1 className="font-wedoo-heading mt-3 text-[34px] leading-[0.92] text-brand-ink">
                Benvenut*!
              </h1>
              <p className="font-wedoo-accent mt-2 text-[22px] leading-[1.05] text-brand-ink">
                Compila il tuo primo annuncio per registrarti
              </p>

              <CompanyRegistrationForm
                compact
                onContinue={onContinue}
                onFieldChange={onFieldChange}
                onTogglePrivacy={onTogglePrivacy}
                values={values}
              />

              <div className="mt-6 border-t border-brand-violet-100 pt-4">
                <div className="flex items-center gap-4 text-brand-ink">
                  <span className="h-px flex-1 bg-brand-ink/20" />
                  <span className="font-wedoo-body text-[14px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                    accesso rapido
                  </span>
                  <span className="h-px flex-1 bg-brand-ink/20" />
                </div>
                <div className="mt-4">
                  <CompanyProviderButtons compact />
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
