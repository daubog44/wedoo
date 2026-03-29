import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { routeMap, sdgs } from "../../data/core";
import type { PortalRole, WizardStep } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { Button, ButtonLink, PreviewFrame } from "../ui/index";
import { AppImage } from "../media/app-image";
import { renderWizardField } from "./wizard-field-renderer";

function stepLabel(step: WizardStep, total: number) {
  return `${step.eyebrow} di ${total}`;
}

export function WizardFlow({
  role,
  steps,
}: {
  role: PortalRole;
  steps: WizardStep[];
}) {
  const navigate = useNavigate();
  const { stepIndex } = useParams();
  const currentIndex = Number(stepIndex ?? "1") - 1;
  const currentStep = steps[currentIndex];
  const [selectedChips, setSelectedChips] = useState<Record<string, string[]>>(
    {},
  );
  const [toggleValues, setToggleValues] = useState<Record<string, boolean>>({});

  if (!currentStep) {
    const fallback =
      role === "candidate"
        ? routeMap.candidate.register
        : routeMap.company.register;
    return <Navigate replace to={fallback} />;
  }

  const nextPath =
    currentIndex + 1 < steps.length
      ? `/registrati/${role === "candidate" ? "candidato" : "azienda"}/${currentIndex + 2}`
      : role === "candidate"
        ? routeMap.candidate.portal
        : routeMap.company.portal;

  function toggleChip(groupKey: string, option: string) {
    setSelectedChips((previous) => {
      const current = previous[groupKey] ?? [];
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];

      return {
        ...previous,
        [groupKey]: next,
      };
    });
  }

  function toggleField(fieldKey: string) {
    setToggleValues((previous) => ({
      ...previous,
      [fieldKey]: !previous[fieldKey],
    }));
  }

  return (
    <div className="section-shell pb-12">
      <section className="section-card">
        <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="space-y-6">
            <div className="rounded-4xl bg-brand-ink p-6 text-white">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/60">
                {role === "candidate"
                  ? "Onboarding candidato"
                  : "Onboarding azienda"}
              </p>
              <h1 className="mt-3 text-3xl text-white">{currentStep.title}</h1>
              <p className="mt-4 text-sm leading-7 text-white/72">
                {currentStep.description}
              </p>
              <div className="mt-6 grid gap-3">
                {steps.map((step) => (
                  <div
                    className={cn(
                      "rounded-[1.35rem] px-4 py-3 text-sm transition",
                      step.index === currentStep.index
                        ? "bg-white text-brand-ink"
                        : "bg-white/8 text-white/72",
                    )}
                    key={step.index}
                  >
                    <span className="block font-semibold">
                      {stepLabel(step, steps.length)}
                    </span>
                    <span className="mt-1 block">{step.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <PreviewFrame
              alt={currentStep.title}
              className="aspect-4/5"
              src={assetPath(currentStep.image)}
            />
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {Object.values(sdgs)
                .slice(0, role === "candidate" ? 4 : 3)
                .map((item) => (
                  <div
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500"
                    key={item.id}
                  >
                    <AppImage
                      alt={item.label}
                      className="h-5 w-5 rounded-full object-cover"
                      src={assetPath(item.icon)}
                    />
                    <span>{item.label}</span>
                  </div>
                ))}
            </div>
            <form
              className="grid gap-4"
              onSubmit={(event) => {
                event.preventDefault();
                navigate(nextPath);
              }}
            >
              {currentStep.fields.map((field) =>
                renderWizardField({
                  field,
                  role,
                  selectedChips,
                  toggleChip,
                  toggleField,
                  toggleValues,
                }),
              )}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  icon="arrow-right-line"
                  tone={role === "candidate" ? "violet" : "mint"}
                  type="submit"
                >
                  {currentIndex + 1 === steps.length
                    ? "Entra nel portale"
                    : "Continua"}
                </Button>
                <ButtonLink to="/accedi" tone="ghost">
                  Hai gia un account?
                </ButtonLink>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
