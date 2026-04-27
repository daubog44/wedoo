import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
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
import { CandidateWizardStepFrame } from "./candidate-wizard-step-frame";

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
    <li className="flex min-w-0 items-start gap-2.5 font-wedoo-body text-[1.125rem] leading-tight text-[var(--wedoo-ink-muted)] md:text-[1.375rem]">
      <SiteIcon className="mt-0.5 h-5 w-5 shrink-0 text-[var(--wedoo-ink-muted)] md:h-6 md:w-6" name="close" />
      <span aria-hidden="true" className="pt-0.5 text-[1.1rem] leading-none md:text-[1.2rem]">
        &bull;
      </span>
      <span className="min-w-0 break-words">{value}</span>
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
      <h2 className="font-wedoo-accent text-[1.5rem] font-bold leading-none text-[var(--wedoo-ink)] md:text-[1.875rem]">
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
    <CandidateWizardStepFrame
      closeHref="/registrati/candidato/2"
      closeLabel="Chiudi contatti"
      dataNodeId="281:1207"
      testId="candidate-contacts-step"
      title="contatti"
    >
      <div className="rounded-[20px] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface)] px-5 py-5 md:px-[26px] md:py-[26px]">
        <form
          className="space-y-8"
          onSubmit={(event) => {
            event.preventDefault();
            navigate(saveTo);
          }}
        >
          <ContactSection
            heading="località"
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
                label="città"
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
              className="inline-flex min-h-[43px] w-full items-center justify-center rounded-[14px] bg-[var(--wedoo-violet)] px-6 py-2 font-wedoo-accent text-[1.875rem] leading-none text-[var(--wedoo-white-soft)] shadow-[0_24px_60px_-38px_rgba(116,80,230,0.68)] transition hover:bg-[var(--wedoo-violet-hover)] md:w-[191px]"
              type="submit"
            >
              salva
            </button>
          </div>
        </form>
      </div>
    </CandidateWizardStepFrame>
  );
}
