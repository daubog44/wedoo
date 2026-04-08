import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { CandidateProfileDraft } from "../../data/candidate-profile";
import {
  candidateContactProvinceOptions,
  formatCandidateContactLocation,
  getCandidateContactCityOptions,
} from "../../data/candidate-profile";
import { SiteIcon } from "../site";
import {
  CandidateWizardSelectField,
  CandidateWizardTextField,
} from "./candidate-wizard-fields";

type CandidateContactsStepProps = {
  draft: CandidateProfileDraft;
  saveTo?: string;
};

type CandidateContactsFormState = {
  city: string;
  email: string;
  phone: string;
  postalCode: string;
  province: string;
};

function ContactSummaryItem({ value }: { value: string }) {
  return (
    <li className="flex items-center gap-2.5 font-wedoo-body text-[1.375rem] leading-none text-black">
      <SiteIcon className="h-6 w-6 shrink-0 text-black" name="close" />
      <span aria-hidden="true" className="text-[1.2rem] leading-none">
        &bull;
      </span>
      <span>{value}</span>
    </li>
  );
}

function ContactSection({
  children,
  heading,
  summary,
}: {
  children: ReactNode;
  heading: string;
  summary: string;
}) {
  return (
    <section className="space-y-4">
      <h2 className="font-wedoo-accent text-[1.875rem] font-bold leading-none text-black">
        {heading}
      </h2>
      <ul>
        <ContactSummaryItem value={summary} />
      </ul>
      {children}
    </section>
  );
}

function createInitialFormState(): CandidateContactsFormState {
  return {
    city: "",
    email: "",
    phone: "",
    postalCode: "",
    province: "",
  };
}

export function CandidateContactsStep({
  draft,
  saveTo = "/portale/candidato",
}: CandidateContactsStepProps) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(createInitialFormState);

  const cityOptions = getCandidateContactCityOptions(formState.province);

  function updateField<Key extends keyof CandidateContactsFormState>(
    key: Key,
    value: CandidateContactsFormState[Key],
  ) {
    setFormState((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function updateProvince(nextProvince: string) {
    setFormState((previous) => {
      const nextCityOptions = getCandidateContactCityOptions(nextProvince);
      const cityStillValid = nextCityOptions.some(
        (option) => option.value === previous.city,
      );

      return {
        ...previous,
        city: cityStillValid ? previous.city : "",
        province: nextProvince,
      };
    });
  }

  return (
    <main className="bg-brand-page px-4 py-8 sm:px-6 md:py-12">
      <section
        className="mx-auto max-w-[650px]"
        data-node-id="281:1207"
        data-testid="candidate-contacts-step"
      >
        <div className="bg-brand-mint-50 px-6 py-8 md:px-10 md:py-10">
          <div className="flex items-start justify-center gap-4">
            <h1 className="flex-1 text-center font-wedoo-accent text-[2.25rem] font-normal leading-none text-black">
              contatti
            </h1>
            <Link
              aria-label="Chiudi contatti"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full text-brand-ink transition hover:bg-white/40"
              to="/registrati/candidato/1"
            >
              <SiteIcon className="h-12 w-12" name="close" />
            </Link>
          </div>

          <div className="mt-7 rounded-[20px] border border-brand-mint-deep px-6 py-6 md:px-[26px] md:py-[26px]">
            <form
              className="space-y-8"
              onSubmit={(event) => {
                event.preventDefault();
                navigate(saveTo);
              }}
            >
              <ContactSection
                heading={"localit\u00E0"}
                summary={formatCandidateContactLocation(draft.contact)}
              >
                <div className="grid gap-4 md:grid-cols-3 md:gap-[40px]">
                  <CandidateWizardSelectField
                    id="candidate-contact-province"
                    label="provincia"
                    onChange={updateProvince}
                    options={candidateContactProvinceOptions}
                    value={formState.province}
                  />
                  <CandidateWizardSelectField
                    id="candidate-contact-city"
                    label={"citt\u00E0"}
                    onChange={(value) => updateField("city", value)}
                    options={cityOptions}
                    value={formState.city}
                  />
                  <CandidateWizardTextField
                    id="candidate-contact-postal-code"
                    label="CAP"
                    onChange={(value) => updateField("postalCode", value)}
                    value={formState.postalCode}
                  />
                </div>
              </ContactSection>

              <ContactSection heading="e-mail" summary={draft.contact.email}>
                <CandidateWizardTextField
                  id="candidate-contact-email"
                  hideLabel
                  label="e-mail"
                  onChange={(value) => updateField("email", value)}
                  type="email"
                  value={formState.email}
                />
              </ContactSection>

              <ContactSection
                heading="numero di telefono"
                summary={draft.contact.phone}
              >
                <CandidateWizardTextField
                  id="candidate-contact-phone"
                  hideLabel
                  label="numero di telefono"
                  onChange={(value) => updateField("phone", value)}
                  type="tel"
                  value={formState.phone}
                />
              </ContactSection>

              <div className="flex justify-stretch pt-1 md:justify-end">
                <button
                  className="inline-flex min-h-[43px] w-full items-center justify-center rounded-[8px] bg-brand-mint-deep px-6 py-2 font-wedoo-accent text-[1.875rem] leading-none text-brand-ink transition hover:bg-brand-mint md:w-[191px]"
                  type="submit"
                >
                  salva
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
