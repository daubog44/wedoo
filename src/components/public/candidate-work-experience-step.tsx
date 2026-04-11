import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  CandidateProfileDraft,
  CandidateWorkExperienceDraftEntry,
} from "../../data/candidate-profile";
import {
  candidateWorkExperienceCountryOptions,
  candidateWorkExperienceYearOptions,
  getCandidateWorkExperienceCityOptions,
  getCandidateWorkExperienceCompanyOptions,
} from "../../data/candidate-profile";
import { AppIcon } from "../../lib/icons";
import { cn } from "../../lib/site-utils";
import {
  CandidateWizardFieldLabel,
  CandidateWizardSelectField,
  CandidateWizardYearSelectField,
} from "./candidate-wizard-fields";
import { CandidateWizardStepFrame } from "./candidate-wizard-step-frame";

type CandidateWorkExperienceStepProps = {
  draft: CandidateProfileDraft;
  saveTo?: string;
};

type CandidateWorkExperienceFormState = {
  city: string;
  company: string;
  country: string;
  description: string;
  endYear: string;
  startYear: string;
};

const emptyWorkExperienceEntry: CandidateWorkExperienceDraftEntry = {
  city: "",
  company: "",
  country: "",
  current: false,
  description: "",
  id: "candidate-work-experience-fallback",
  startYear: "",
};

function HintList({
  className,
  items,
}: {
  className?: string;
  items: readonly string[];
}) {
  return (
    <ul
      className={cn(
        "list-disc space-y-1 pl-5 font-wedoo-body text-[0.95rem] leading-[1.2] text-black",
        className,
      )}
    >
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function createInitialFormState(
  experience: CandidateWorkExperienceDraftEntry,
): CandidateWorkExperienceFormState {
  return {
    city: experience.city,
    company: experience.company,
    country: experience.country,
    description: experience.description,
    endYear: experience.endYear ?? "",
    startYear: experience.startYear,
  };
}

export function CandidateWorkExperienceStep({
  draft,
  saveTo = "/portale/candidato",
}: CandidateWorkExperienceStepProps) {
  const experience = draft.experiences[0] ?? emptyWorkExperienceEntry;
  const navigate = useNavigate();

  const [formState, setFormState] = useState(() =>
    createInitialFormState(experience),
  );
  const cityOptions = getCandidateWorkExperienceCityOptions(formState.country);
  const companyOptions = getCandidateWorkExperienceCompanyOptions(formState.city);

  function updateField<Key extends keyof CandidateWorkExperienceFormState>(
    key: Key,
    value: CandidateWorkExperienceFormState[Key],
  ) {
    setFormState((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function updateCountry(nextCountry: string) {
    setFormState((previous) => {
      const nextCityOptions = getCandidateWorkExperienceCityOptions(nextCountry);
      const cityStillValid = nextCityOptions.some(
        (option) => option.value === previous.city,
      );
      const nextCity = cityStillValid ? previous.city : "";
      const nextCompanyOptions = getCandidateWorkExperienceCompanyOptions(nextCity);
      const companyStillValid = nextCompanyOptions.some(
        (option) => option.value === previous.company,
      );

      return {
        ...previous,
        city: nextCity,
        company: companyStillValid ? previous.company : "",
        country: nextCountry,
      };
    });
  }

  function updateCity(nextCity: string) {
    setFormState((previous) => {
      const nextCompanyOptions = getCandidateWorkExperienceCompanyOptions(nextCity);
      const companyStillValid = nextCompanyOptions.some(
        (option) => option.value === previous.company,
      );

      return {
        ...previous,
        city: nextCity,
        company: companyStillValid ? previous.company : "",
      };
    });
  }

  return (
    <CandidateWizardStepFrame
      closeHref="/registrati/candidato/4"
      closeLabel="Chiudi esperienze lavorative"
      dataNodeId="280:860"
      panelClassName="md:pb-[37px]"
      testId="candidate-work-experience-step"
      title="esperienze lavorative"
    >
      <div className="rounded-[20px] border border-brand-mint-deep px-5 py-5 md:px-[26px] md:py-6">
        <form
          className="space-y-6 md:space-y-8"
          onSubmit={(event) => {
            event.preventDefault();
            navigate(saveTo);
          }}
        >
              <CandidateWizardSelectField
                id="candidate-work-experience-country"
                label="paese"
                onChange={updateCountry}
                options={candidateWorkExperienceCountryOptions}
                value={formState.country}
              />

              <CandidateWizardSelectField
                id="candidate-work-experience-city"
                label={"citt\u00E0"}
                onChange={updateCity}
                options={cityOptions}
                value={formState.city}
              />

              <section className="space-y-2">
                <div className="grid gap-2 md:grid-cols-[auto_1fr] md:items-baseline md:gap-4">
                  <CandidateWizardFieldLabel
                    htmlFor="candidate-work-experience-company"
                    label="ragione sociale"
                  />
                  <p className="font-wedoo-body text-[0.95rem] leading-[1.2] text-black md:justify-self-end">
                    i filtri si adattano alla zona geografica
                  </p>
                </div>
                <CandidateWizardSelectField
                  hideLabel
                  id="candidate-work-experience-company"
                  label="ragione sociale"
                  onChange={(value) => updateField("company", value)}
                  options={companyOptions}
                  value={formState.company}
                />
              </section>

              <section className="grid gap-4 md:grid-cols-[207px_207px] md:items-start">
                <CandidateWizardYearSelectField
                  id="candidate-work-experience-start-year"
                  label="da anno"
                  onChange={(value) => updateField("startYear", value)}
                  options={candidateWorkExperienceYearOptions}
                  value={formState.startYear}
                />
                <CandidateWizardYearSelectField
                  id="candidate-work-experience-end-year"
                  label="ad anno"
                  onChange={(value) => updateField("endYear", value)}
                  options={candidateWorkExperienceYearOptions}
                  value={formState.endYear}
                />
                <HintList
                  className="md:col-span-2 md:ml-[214px] md:-mt-1 md:max-w-[310px]"
                  items={[
                    "anni da meno recente a pi\u00F9 recente",
                    'aggiungi opzione "in corso"',
                  ]}
                />
              </section>

              <section className="space-y-4">
                <h2 className="font-wedoo-accent text-[1.5rem] leading-none text-black md:text-[1.75rem]">
                  {"attivit\u00E0 svolte"}
                </h2>
                <div className="grid gap-2">
                  <CandidateWizardFieldLabel
                    hideLabel
                    htmlFor="candidate-work-experience-description"
                    label={"attivit\u00E0 svolte"}
                  />
                  <div className="overflow-hidden rounded-[20px] border border-brand-mint-deep">
                    <div
                      className="flex items-center gap-5 border-b border-brand-mint-deep px-4 py-3 font-wedoo-body text-[1.125rem] text-black"
                      data-testid="candidate-work-experience-toolbar"
                    >
                      <button className="font-sans text-[1.15rem] font-bold" type="button">
                        G
                      </button>
                      <button
                        className="font-sans text-[1.15rem] italic"
                        type="button"
                      >
                        C
                      </button>
                      <button
                        className="font-sans text-[1.15rem] underline"
                        type="button"
                      >
                        S
                      </button>
                      <span>formattazione</span>
                      <AppIcon className="h-5 w-5" name="list-box-line" />
                    </div>
                    <textarea
                      className="min-h-[15rem] w-full resize-none border-none bg-transparent px-4 py-4 font-wedoo-body text-lg text-brand-ink outline-none md:min-h-[17rem]"
                      id="candidate-work-experience-description"
                      onChange={(event) => updateField("description", event.target.value)}
                      value={formState.description}
                    />
                  </div>
                </div>
              </section>

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
    </CandidateWizardStepFrame>
  );
}
