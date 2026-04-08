import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import type {
  CandidateContactOption,
  CandidateProfileDraft,
} from "../../data/candidate-profile";
import {
  candidateContactProvinceOptions,
  formatCandidateContactLocation,
  getCandidateContactCityOptions,
} from "../../data/candidate-profile";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "../site";

type CandidateContactsStepProps = {
  draft: CandidateProfileDraft;
};

type CandidateContactsFormState = {
  city: string;
  email: string;
  phone: string;
  postalCode: string;
  province: string;
};

const contactFieldClassName =
  "h-[50px] rounded-[8px] border border-brand-mint-deep bg-transparent px-4 font-wedoo-body text-[1.375rem] leading-none text-brand-ink outline-none transition placeholder:text-black/35 focus:border-brand-mint-deep focus:ring-2 focus:ring-brand-mint-deep/20";

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

function ContactFieldLabel({
  hideLabel = false,
  htmlFor,
  label,
}: {
  hideLabel?: boolean;
  htmlFor: string;
  label: string;
}) {
  return (
    <label
      className={cn(
        "font-wedoo-accent text-[1.125rem] font-normal leading-none text-black md:text-[1.5rem]",
        hideLabel && "sr-only",
      )}
      htmlFor={htmlFor}
    >
      {label}
    </label>
  );
}

function ContactSelectField({
  id,
  label,
  onChange,
  options,
  value,
}: {
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: readonly CandidateContactOption[];
  value: string;
}) {
  return (
    <div className="grid gap-2">
      <ContactFieldLabel htmlFor={id} label={label} />
      <div className="relative">
        <select
          className={cn(
            contactFieldClassName,
            "w-full appearance-none pr-12",
            value ? "text-brand-ink" : "text-black/35",
          )}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">scegli</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <SiteIcon
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink"
          name="chevron-down"
        />
      </div>
    </div>
  );
}

function ContactTextField({
  hideLabel = false,
  id,
  label,
  onChange,
  placeholder = "scrivi",
  type = "text",
  value,
}: {
  hideLabel?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "email" | "tel" | "text";
  value: string;
}) {
  return (
    <div className="grid gap-2">
      <ContactFieldLabel hideLabel={hideLabel} htmlFor={id} label={label} />
      <input
        className={cn(contactFieldClassName, "w-full")}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
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

export function CandidateContactsStep({ draft }: CandidateContactsStepProps) {
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
                navigate("/portale/candidato");
              }}
            >
              <ContactSection
                heading={"localit\u00E0"}
                summary={formatCandidateContactLocation(draft.contact)}
              >
                <div className="grid gap-4 md:grid-cols-3 md:gap-[40px]">
                  <ContactSelectField
                    id="candidate-contact-province"
                    label="provincia"
                    onChange={updateProvince}
                    options={candidateContactProvinceOptions}
                    value={formState.province}
                  />
                  <ContactSelectField
                    id="candidate-contact-city"
                    label={"citt\u00E0"}
                    onChange={(value) => updateField("city", value)}
                    options={cityOptions}
                    value={formState.city}
                  />
                  <ContactTextField
                    id="candidate-contact-postal-code"
                    label="CAP"
                    onChange={(value) => updateField("postalCode", value)}
                    value={formState.postalCode}
                  />
                </div>
              </ContactSection>

              <ContactSection heading="e-mail" summary={draft.contact.email}>
                <ContactTextField
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
                <ContactTextField
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
