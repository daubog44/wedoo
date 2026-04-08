import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type {
  CandidateContactOption,
  CandidateProfileDraft,
} from "../../data/candidate-profile";
import {
  candidateHardSkillOptions,
  candidateSoftSkillOptions,
} from "../../data/candidate-profile";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "../site";

type CandidateSkillsStepProps = {
  draft: CandidateProfileDraft;
  saveTo?: string;
};

type CandidateSkillsFormState = {
  hardSkill: string;
  softSkill: string;
};

const skillsFieldClassName =
  "h-[50px] rounded-[8px] border border-brand-mint-deep bg-transparent px-4 font-wedoo-body text-[1.375rem] leading-none text-brand-ink outline-none transition placeholder:text-black/35 focus:border-brand-mint-deep focus:ring-2 focus:ring-brand-mint-deep/20";

function formatSkillItem(item: string, index: number, items: readonly string[]) {
  return `${item}${index === items.length - 1 ? "." : ";"}`;
}

function SectionTitle({ children }: { children: string }) {
  return (
    <h2 className="font-wedoo-accent text-[1.625rem] font-bold leading-none text-black md:text-[1.875rem]">
      {children}
    </h2>
  );
}

function SkillList({ items }: { items: readonly string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-8 font-wedoo-body text-[1.375rem] leading-tight text-black">
      {items.map((item, index) => (
        <li key={item}>{formatSkillItem(item, index, items)}</li>
      ))}
    </ul>
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

function SelectField({
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
      <FieldLabel hideLabel htmlFor={id} label={label} />
      <div className="relative">
        <select
          className={cn(
            skillsFieldClassName,
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

function createInitialFormState(): CandidateSkillsFormState {
  return {
    hardSkill: "",
    softSkill: "",
  };
}

export function CandidateSkillsStep({
  draft,
  saveTo = "/portale/candidato",
}: CandidateSkillsStepProps) {
  const navigate = useNavigate();
  const [formState, setFormState] = useState(createInitialFormState);

  function updateField<Key extends keyof CandidateSkillsFormState>(
    key: Key,
    value: CandidateSkillsFormState[Key],
  ) {
    setFormState((previous) => ({
      ...previous,
      [key]: value,
    }));
  }

  return (
    <main className="bg-brand-page px-4 py-8 sm:px-6 md:py-12">
      <section
        className="mx-auto max-w-[650px]"
        data-node-id="280:951"
        data-testid="candidate-skills-step"
      >
        <div className="bg-brand-mint-50 px-6 py-8 md:px-10 md:py-10">
          <div className="flex items-start justify-center gap-4">
            <h1 className="flex-1 text-center font-wedoo-accent text-[2.25rem] font-normal leading-none text-black">
              competenze
            </h1>
            <Link
              aria-label="Chiudi competenze"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full text-brand-ink transition hover:bg-white/40"
              to="/registrati/candidato/4"
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
              <section className="space-y-5">
                <SectionTitle>soft skills</SectionTitle>
                <SkillList items={draft.skills.softSkills} />
                <SelectField
                  id="candidate-skills-soft"
                  label="soft skills"
                  onChange={(value) => updateField("softSkill", value)}
                  options={candidateSoftSkillOptions}
                  value={formState.softSkill}
                />
              </section>

              <section className="space-y-5">
                <SectionTitle>hard skills</SectionTitle>
                <SkillList items={draft.skills.hardSkills} />
                <SelectField
                  id="candidate-skills-hard"
                  label="hard skills"
                  onChange={(value) => updateField("hardSkill", value)}
                  options={candidateHardSkillOptions}
                  value={formState.hardSkill}
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
        </div>
      </section>
    </main>
  );
}
