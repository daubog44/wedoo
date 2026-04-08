import { cn } from "../../lib/site-utils";
import type { CandidateContactOption } from "../../data/candidate-profile";
import { SiteIcon } from "../site";

type CandidateWizardFieldLabelProps = {
  hideLabel?: boolean;
  htmlFor: string;
  label: string;
};

type CandidateWizardSelectBaseProps = {
  hideLabel?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  options: readonly CandidateContactOption[];
  placeholder?: string;
  value: string;
};

type CandidateWizardTextFieldProps = {
  hideLabel?: boolean;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "email" | "tel" | "text";
  value: string;
};

const candidateWizardFieldClassName =
  "h-[50px] rounded-[8px] border border-brand-mint-deep bg-transparent px-4 font-wedoo-body text-[1.375rem] leading-none text-brand-ink outline-none transition placeholder:text-black/35 focus:border-brand-mint-deep focus:ring-2 focus:ring-brand-mint-deep/20";

function CandidateWizardSelectChevron() {
  return (
    <SiteIcon
      className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-ink"
      data-node-id="2:543"
      name="chevron-down"
    />
  );
}

export function CandidateWizardFieldLabel({
  hideLabel = false,
  htmlFor,
  label,
}: CandidateWizardFieldLabelProps) {
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

function CandidateWizardSelectBase({
  dataNodeId,
  hideLabel = false,
  id,
  label,
  onChange,
  options,
  placeholder = "scegli",
  value,
}: CandidateWizardSelectBaseProps & { dataNodeId: string }) {
  return (
    <div className="grid gap-2">
      <CandidateWizardFieldLabel hideLabel={hideLabel} htmlFor={id} label={label} />
      <div className="relative" data-node-id={dataNodeId}>
        <select
          className={cn(
            candidateWizardFieldClassName,
            "w-full appearance-none pr-12",
            value ? "text-brand-ink" : "text-black/35",
          )}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          value={value}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <CandidateWizardSelectChevron />
      </div>
    </div>
  );
}

export function CandidateWizardSelectField(
  props: CandidateWizardSelectBaseProps,
) {
  return <CandidateWizardSelectBase dataNodeId="280:1093" {...props} />;
}

export function CandidateWizardYearSelectField(
  props: CandidateWizardSelectBaseProps,
) {
  return <CandidateWizardSelectBase dataNodeId="280:1099" {...props} />;
}

export function CandidateWizardTextField({
  hideLabel = false,
  id,
  label,
  onChange,
  placeholder = "scrivi",
  type = "text",
  value,
}: CandidateWizardTextFieldProps) {
  return (
    <div className="grid gap-2">
      <CandidateWizardFieldLabel hideLabel={hideLabel} htmlFor={id} label={label} />
      <input
        className={cn(candidateWizardFieldClassName, "w-full")}
        data-node-id="281:1255"
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
}
