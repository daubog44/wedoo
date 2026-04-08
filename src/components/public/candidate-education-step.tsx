import { type ReactNode, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type {
  CandidateContactOption,
  CandidateEducationDraftEntry,
  CandidateProfileDraft,
} from "../../data/candidate-profile";
import {
  candidateEducationCountryOptions,
  candidateEducationDegreeOptions,
  candidateEducationExtracurricularOptions,
  candidateEducationSpecificCourseOptions,
  candidateEducationYearOptions,
  getCandidateEducationCityOptions,
  getCandidateEducationInstituteOptions,
} from "../../data/candidate-profile";
import { AppIcon } from "../../lib/icons";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "../site";

type CandidateEducationStepProps = {
  draft: CandidateProfileDraft;
  saveTo?: string;
};

type CandidateEducationFormState = {
  degreeType: string;
  endYear: string;
  erasmusCity: string;
  erasmusCountry: string;
  erasmusInstitution: string;
  extracurricular: string;
  fieldOfStudy: string;
  issuingInstitution: string;
  projectWorkDescription: string;
  specificCourse: string;
  startYear: string;
};

const educationFieldClassName =
  "h-[50px] rounded-[8px] border border-brand-mint-deep bg-transparent px-4 font-wedoo-body text-[1.375rem] leading-none text-brand-ink outline-none transition placeholder:text-black/35 focus:border-brand-mint-deep focus:ring-2 focus:ring-brand-mint-deep/20";

const emptyEducationEntry: CandidateEducationDraftEntry = {
  activities: [],
  course: "",
  current: false,
  degreeType: "",
  erasmus: {
    city: "",
    country: "",
    institution: "",
  },
  id: "candidate-education-fallback",
  institution: "",
  projectWorkDescription: "",
  specificCourses: [],
  startYear: "",
};

function SummaryItem({ value }: { value: string }) {
  return (
    <li className="flex items-start gap-2.5 font-wedoo-body text-[1.375rem] leading-tight text-black">
      <SiteIcon className="mt-0.5 h-6 w-6 shrink-0 text-black" name="close" />
      <span aria-hidden="true" className="pt-0.5 text-[1.2rem] leading-none">
        &bull;
      </span>
      <span>{value}</span>
    </li>
  );
}

function SummaryList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <SummaryItem key={item} value={item} />
      ))}
    </ul>
  );
}

function SectionTitle({
  children,
  emphasize = false,
}: {
  children: ReactNode;
  emphasize?: boolean;
}) {
  return (
    <h2
      className={cn(
        "font-wedoo-accent text-[1.5rem] leading-none text-black md:text-[1.75rem]",
        emphasize ? "font-bold" : "font-normal",
      )}
    >
      {children}
    </h2>
  );
}

function FieldLabel({
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

function SelectField({
  hideLabel = false,
  id,
  label,
  onChange,
  options,
  value,
}: {
  hideLabel?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: readonly CandidateContactOption[];
  value: string;
}) {
  return (
    <div className="grid gap-2">
      <FieldLabel hideLabel={hideLabel} htmlFor={id} label={label} />
      <div className="relative">
        <select
          className={cn(
            educationFieldClassName,
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

function TextField({
  hideLabel = false,
  id,
  label,
  onChange,
  placeholder = "scrivi",
  value,
}: {
  hideLabel?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}) {
  return (
    <div className="grid gap-2">
      <FieldLabel hideLabel={hideLabel} htmlFor={id} label={label} />
      <input
        className={cn(educationFieldClassName, "w-full")}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="text"
        value={value}
      />
    </div>
  );
}

function createInitialFormState(
  education: CandidateEducationDraftEntry,
): CandidateEducationFormState {
  return {
    degreeType: "",
    endYear: education.endYear ?? "",
    erasmusCity: education.erasmus.city,
    erasmusCountry: education.erasmus.country,
    erasmusInstitution: education.erasmus.institution,
    extracurricular: "",
    fieldOfStudy: "",
    issuingInstitution: "",
    projectWorkDescription: education.projectWorkDescription,
    specificCourse: "",
    startYear: education.startYear,
  };
}

export function CandidateEducationStep({
  draft,
  saveTo = "/portale/candidato",
}: CandidateEducationStepProps) {
  const education = draft.education[0] ?? emptyEducationEntry;
  const navigate = useNavigate();

  const [formState, setFormState] = useState(() =>
    createInitialFormState(education),
  );
  const cityOptions = getCandidateEducationCityOptions(formState.erasmusCountry);
  const institutionOptions = getCandidateEducationInstituteOptions(
    formState.erasmusCity,
  );

  function updateField<Key extends keyof CandidateEducationFormState>(
    key: Key,
    value: CandidateEducationFormState[Key],
  ) {
    setFormState((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  function updateCountry(nextCountry: string) {
    setFormState((previous) => {
      const nextCityOptions = getCandidateEducationCityOptions(nextCountry);
      const cityStillValid = nextCityOptions.some(
        (option) => option.value === previous.erasmusCity,
      );
      const nextCity = cityStillValid ? previous.erasmusCity : "";
      const nextInstitutionOptions = getCandidateEducationInstituteOptions(nextCity);
      const institutionStillValid = nextInstitutionOptions.some(
        (option) => option.value === previous.erasmusInstitution,
      );

      return {
        ...previous,
        erasmusCity: nextCity,
        erasmusCountry: nextCountry,
        erasmusInstitution: institutionStillValid ? previous.erasmusInstitution : "",
      };
    });
  }

  function updateCity(nextCity: string) {
    setFormState((previous) => {
      const nextInstitutionOptions = getCandidateEducationInstituteOptions(nextCity);
      const institutionStillValid = nextInstitutionOptions.some(
        (option) => option.value === previous.erasmusInstitution,
      );

      return {
        ...previous,
        erasmusCity: nextCity,
        erasmusInstitution: institutionStillValid ? previous.erasmusInstitution : "",
      };
    });
  }

  return (
    <main className="bg-brand-page px-4 py-8 sm:px-6 md:py-12">
      <section
        className="mx-auto max-w-[650px]"
        data-node-id="280:1079"
        data-testid="candidate-education-step"
      >
        <div className="bg-brand-mint-50 px-6 py-8 md:px-10 md:py-10">
          <div className="flex items-start justify-center gap-4">
            <h1 className="flex-1 text-center font-wedoo-accent text-[2.25rem] font-normal leading-none text-black">
              formazione
            </h1>
            <Link
              aria-label="Chiudi formazione"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full text-brand-ink transition hover:bg-white/40"
              to="/registrati/candidato/2"
            >
              <SiteIcon className="h-12 w-12" name="close" />
            </Link>
          </div>

          <form
            className="mt-8 space-y-8"
            onSubmit={(event) => {
              event.preventDefault();
              navigate(saveTo);
            }}
          >
            <section className="space-y-4">
              <div className="grid gap-4 md:grid-cols-[1fr_16rem] md:items-start">
                <div className="space-y-3">
                  <SectionTitle>titolo di studio</SectionTitle>
                  <SummaryList items={[education.degreeType]} />
                </div>
                <HintList items={candidateEducationDegreeOptions.map((option) => option.label)} />
              </div>
              <SelectField
                hideLabel
                id="candidate-education-degree"
                label="titolo di studio"
                onChange={(value) => updateField("degreeType", value)}
                options={candidateEducationDegreeOptions}
                value={formState.degreeType}
              />
            </section>

            <section className="space-y-4">
              <SectionTitle>campo di studi</SectionTitle>
              <SummaryList items={[education.course]} />
              <TextField
                hideLabel
                id="candidate-education-field"
                label="campo di studi"
                onChange={(value) => updateField("fieldOfStudy", value)}
                value={formState.fieldOfStudy}
              />
            </section>

            <section className="space-y-4">
              <SectionTitle>istituto di rilascio</SectionTitle>
              <SummaryList items={[education.institution]} />
              <TextField
                hideLabel
                id="candidate-education-issuing-institution"
                label="istituto di rilascio"
                onChange={(value) => updateField("issuingInstitution", value)}
                value={formState.issuingInstitution}
              />
            </section>

            <section className="grid gap-4 md:grid-cols-[207px_207px_1fr] md:items-start">
              <SelectField
                id="candidate-education-start-year"
                label="da anno"
                onChange={(value) => updateField("startYear", value)}
                options={candidateEducationYearOptions}
                value={formState.startYear}
              />
              <SelectField
                id="candidate-education-end-year"
                label="ad anno"
                onChange={(value) => updateField("endYear", value)}
                options={candidateEducationYearOptions}
                value={formState.endYear}
              />
              <HintList
                className="md:pt-8"
                items={[
                  "anni da meno recente a pi\u00F9 recente",
                  'aggiungi opzione "in corso"',
                ]}
              />
            </section>

            <section className="space-y-4">
              <SectionTitle>{"attivit\u00E0 extracurriculari"}</SectionTitle>
              <SummaryList items={education.activities} />
              <SelectField
                hideLabel
                id="candidate-education-activities"
                label={"attivit\u00E0 extracurriculari"}
                onChange={(value) => updateField("extracurricular", value)}
                options={candidateEducationExtracurricularOptions}
                value={formState.extracurricular}
              />
              <HintList
                items={[
                  "erasmus/erasmus+",
                  "corsi di lingue, competenze specifiche del corso frequentato, informatica ecc.",
                ]}
              />
            </section>

            <section className="space-y-4">
              <div className="grid gap-3 md:grid-cols-[auto_1fr] md:items-start">
                <SectionTitle emphasize>erasmus</SectionTitle>
                <div className="space-y-1 font-wedoo-body text-[0.95rem] leading-[1.2] text-black">
                  <p>tutte le voci dell'elenco sono facoltative</p>
                  <p>
                    l'elenco compare solo se nelle attivit\u00E0 extracurriculari si
                    sceglie "erasmus/erasmus+"
                  </p>
                </div>
              </div>
              <SelectField
                id="candidate-education-country"
                label="paese"
                onChange={updateCountry}
                options={candidateEducationCountryOptions}
                value={formState.erasmusCountry}
              />
              <SelectField
                id="candidate-education-city"
                label={"citt\u00E0"}
                onChange={updateCity}
                options={cityOptions}
                value={formState.erasmusCity}
              />
              <div className="space-y-2">
                <p className="font-wedoo-body text-[0.95rem] leading-[1.2] text-black">
                  collegato con localit\u00E0, fornisce gli istituti che si trovano
                  nella zona scelta
                </p>
                <SelectField
                  id="candidate-education-institution"
                  label="istituto"
                  onChange={(value) => updateField("erasmusInstitution", value)}
                  options={institutionOptions}
                  value={formState.erasmusInstitution}
                />
              </div>
            </section>

            <section className="space-y-4">
              <div className="grid gap-3 md:grid-cols-[auto_1fr] md:items-start">
                <SectionTitle emphasize>project work</SectionTitle>
                <p className="font-wedoo-body text-[0.95rem] leading-[1.2] text-black">
                  l'elenco compare solo se nelle attivit\u00E0 extracurriculari si
                  sceglie "project work"
                </p>
              </div>
              <div className="grid gap-2">
                <FieldLabel
                  htmlFor="candidate-education-project-work-description"
                  label="descrizione"
                />
                <div className="overflow-hidden rounded-[20px] border border-brand-mint-deep">
                  <div
                    className="flex items-center gap-5 border-b border-brand-mint-deep px-4 py-3 font-wedoo-body text-[1.125rem] text-black"
                    data-testid="candidate-education-toolbar"
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
                    id="candidate-education-project-work-description"
                    onChange={(event) =>
                      updateField("projectWorkDescription", event.target.value)
                    }
                    value={formState.projectWorkDescription}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <SectionTitle emphasize>corsi specifici</SectionTitle>
              <SummaryList items={education.specificCourses} />
              <SelectField
                hideLabel
                id="candidate-education-specific-course"
                label="corsi specifici"
                onChange={(value) => updateField("specificCourse", value)}
                options={candidateEducationSpecificCourseOptions}
                value={formState.specificCourse}
              />
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
      </section>
    </main>
  );
}
