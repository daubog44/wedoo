import type { PortalRole, WizardField } from "../../data/types";
import { cn } from "../../lib/site-utils";
import { Button, PillButton, TextAreaField, TextField } from "../ui/index";

type WizardFieldRendererProps = {
  field: WizardField;
  role: PortalRole;
  selectedChips: Record<string, string[]>;
  toggleChip: (groupKey: string, option: string) => void;
  toggleField: (fieldKey: string) => void;
  toggleValues: Record<string, boolean>;
};

export function renderWizardField({
  field,
  role,
  selectedChips,
  toggleChip,
  toggleField,
  toggleValues,
}: WizardFieldRendererProps) {
  if (
    field.type === "text" ||
    field.type === "email" ||
    field.type === "password" ||
    field.type === "tel"
  ) {
    return (
      <TextField
        key={field.key}
        label={field.label}
        placeholder={field.placeholder}
        type={field.type}
      />
    );
  }

  if (field.type === "textarea") {
    return (
      <TextAreaField
        key={field.key}
        label={field.label}
        placeholder={field.placeholder}
      />
    );
  }

  if (field.type === "checkbox") {
    return (
      <label
        className="flex items-start gap-3 rounded-[1.25rem] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-600"
        key={field.key}
      >
        <input className="mt-1 h-4 w-4 accent-brand-violet" type="checkbox" />
        <span>
          <span className="font-semibold text-brand-ink">{field.label}</span>
          {field.helper ? (
            <span className="mt-1 block text-xs">{field.helper}</span>
          ) : null}
        </span>
      </label>
    );
  }

  if (field.type === "file") {
    return (
      <label
        className="grid gap-2 rounded-3xl border border-dashed border-slate-300 bg-white px-4 py-5"
        key={field.key}
      >
        <span className="text-sm font-semibold text-brand-ink">
          {field.label}
        </span>
        <span className="text-xs text-slate-500">
          {field.helper ?? "Carica un documento o un asset grafico"}
        </span>
        <div className="mt-2 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <Button icon="cloud-upload-line" tone="ghost">
            Seleziona file
          </Button>
          <input className="text-sm text-slate-500" type="file" />
        </div>
      </label>
    );
  }

  if (field.type === "toggle") {
    const active = toggleValues[field.key] ?? false;

    return (
      <button
        className={cn(
          "flex items-center justify-between rounded-[1.25rem] border px-4 py-4 text-left transition",
          active
            ? "border-brand-violet/25 bg-brand-violet/8"
            : "border-slate-200 bg-white",
        )}
        key={field.key}
        onClick={() => toggleField(field.key)}
        type="button"
      >
        <span className="space-y-1">
          <span className="block text-sm font-semibold text-brand-ink">
            {field.label}
          </span>
          {field.helper ? (
            <span className="block text-xs text-slate-500">{field.helper}</span>
          ) : null}
        </span>
        <span
          className={cn(
            "relative inline-flex h-7 w-12 rounded-full transition",
            active ? "bg-brand-violet" : "bg-slate-200",
          )}
        >
          <span
            className={cn(
              "absolute left-1 top-1 h-5 w-5 rounded-full bg-white transition",
              active && "translate-x-5",
            )}
          />
        </span>
      </button>
    );
  }

  if (field.type === "chips") {
    const current = selectedChips[field.key] ?? [];

    return (
      <div className="space-y-3" key={field.key}>
        <p className="text-sm font-semibold text-brand-ink">{field.label}</p>
        <div className="flex flex-wrap gap-2">
          {field.options?.map((option) => (
            <PillButton
              active={current.includes(option)}
              key={option}
              onClick={() => toggleChip(field.key, option)}
              tone={role === "candidate" ? "violet" : "mint"}
            >
              {option}
            </PillButton>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
