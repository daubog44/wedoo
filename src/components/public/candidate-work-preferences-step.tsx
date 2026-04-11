import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  CandidateProfileDraft,
  CandidateWorkPreferenceFieldKey,
} from "../../data/candidate-profile";
import { candidateWorkPreferenceSections } from "../../data/candidate-profile";
import { SiteIcon } from "../site";
import { CandidateWizardSelectField } from "./candidate-wizard-fields";
import { CandidateWizardStepFrame } from "./candidate-wizard-step-frame";

type CandidateWorkPreferencesStepProps = {
  draft: CandidateProfileDraft;
  saveTo?: string;
};

type CandidateWorkPreferencesFormState = Record<
  CandidateWorkPreferenceFieldKey,
  string
>;

function createInitialFormState(): CandidateWorkPreferencesFormState {
  return {
    companyTypes: "",
    contractTypes: "",
    locations: "",
    schedules: "",
    workModes: "",
  };
}

function PreferenceSummaryItem({ value }: { value: string }) {
  return (
    <li className="flex min-w-0 items-start gap-2.5 font-wedoo-body text-[1.125rem] leading-tight text-black md:text-[1.375rem]">
      <SiteIcon className="mt-0.5 h-5 w-5 shrink-0 text-black md:h-6 md:w-6" name="close" />
      <span aria-hidden="true" className="pt-0.5 text-[1.1rem] leading-none md:text-[1.2rem]">
        &bull;
      </span>
      <span className="min-w-0 break-words">{value}</span>
    </li>
  );
}

function PreferenceSection({
  items,
  label,
  onChange,
  options,
  value,
}: {
  items: readonly string[];
  label: string;
  onChange: (value: string) => void;
  options: typeof candidateWorkPreferenceSections[number]["options"];
  value: string;
}) {
  const fieldId = `candidate-work-preferences-${label.replaceAll(" ", "-")}`;

  return (
    <section className="space-y-3.5">
      <h2 className="font-wedoo-accent text-[1.5rem] font-normal leading-none text-black md:text-[1.875rem]">
        {label}
      </h2>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <PreferenceSummaryItem key={item} value={item} />
        ))}
      </ul>
      <CandidateWizardSelectField
        hideLabel
        id={fieldId}
        label={label}
        onChange={onChange}
        options={options}
        value={value}
      />
    </section>
  );
}

export function CandidateWorkPreferencesStep({
  draft,
  saveTo = "/portale/candidato",
}: CandidateWorkPreferencesStepProps) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(createInitialFormState);

  function updateField(
    key: CandidateWorkPreferenceFieldKey,
    value: string,
  ) {
    setFormState((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  return (
    <CandidateWizardStepFrame
      closeHref="/registrati/candidato/6"
      closeLabel="Chiudi preferenze di lavoro"
      dataNodeId="280:1000"
      panelClassName="md:pb-[43px]"
      testId="candidate-work-preferences-step"
      title="preferenze di lavoro"
    >
      <div className="rounded-[20px] border border-brand-mint-deep px-5 py-5 md:px-[29px] md:py-[27px]">
        <form
          className="space-y-7 md:space-y-[25px]"
          onSubmit={(event) => {
            event.preventDefault();
            navigate(saveTo);
          }}
        >
          {candidateWorkPreferenceSections.map((section) => (
            <PreferenceSection
              items={draft.workPreferences[section.key]}
              key={section.key}
              label={section.title}
              onChange={(value) => updateField(section.key, value)}
              options={section.options}
              value={formState[section.key]}
            />
          ))}

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
