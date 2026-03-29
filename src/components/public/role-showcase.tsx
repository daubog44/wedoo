import { useState } from "react";
import { roleShowcases } from "../../data/showcases";
import type { PortalRole } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { assetPath, cn } from "../../lib/site-utils";
import {
  ButtonLink,
  PreviewFrame,
  SectionIntro,
  StatCard,
  Surface,
} from "../ui/index";

export function RoleShowcase({ role }: { role: PortalRole }) {
  const showcase = roleShowcases[role];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = showcase.slides[activeIndex] ?? showcase.slides[0];

  return (
    <div className="section-shell space-y-8 pb-12">
      <section className="section-card">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="space-y-6">
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold",
                role === "candidate"
                  ? "bg-brand-mint/25 text-brand-mint-deep"
                  : "bg-brand-violet/10 text-brand-violet",
              )}
            >
              <AppIcon
                className="text-lg"
                name={role === "candidate" ? "user-line" : "briefcase-line"}
              />
              <span>{showcase.badge}</span>
            </div>
            <SectionIntro
              description={showcase.description}
              title={showcase.title}
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {showcase.metrics.map((metric) => (
                <StatCard
                  icon="chart-bar-line"
                  key={metric.label}
                  label={metric.label}
                  value={metric.value}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              <ButtonLink
                to={showcase.cta}
                tone={role === "candidate" ? "mint" : "violet"}
              >
                Vai alla registrazione
              </ButtonLink>
              <ButtonLink to="/info" tone="ghost">
                Leggi manifesto e FAQ
              </ButtonLink>
            </div>
          </div>

          <div className="space-y-4">
            <PreviewFrame
              alt={activeSlide.title}
              className="aspect-[16/11]"
              src={assetPath(activeSlide.image)}
            />
            <Surface className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                Focus slide
              </p>
              <h3 className="whitespace-pre-line text-2xl">{activeSlide.title}</h3>
              <p className="text-sm leading-7 text-slate-500">
                {activeSlide.description}
              </p>
            </Surface>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {showcase.slides.map((slide, index) => (
          <button
            className={cn(
              "overflow-hidden rounded-4xl border bg-white text-left transition hover:-translate-y-1",
              index === activeIndex
                ? role === "candidate"
                  ? "border-brand-mint/45 shadow-[0_30px_80px_-40px_rgba(16,25,36,0.55)]"
                  : "border-brand-violet/25 shadow-[0_30px_80px_-40px_rgba(16,25,36,0.55)]"
                : "border-slate-200",
            )}
            key={slide.title}
            onClick={() => setActiveIndex(index)}
            type="button"
          >
            <PreviewFrame
              alt={slide.title}
              className="aspect-[16/10] rounded-none border-none bg-transparent shadow-none"
              src={assetPath(slide.image)}
            />
            <div className="space-y-3 p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  Slide {index + 1}
                </p>
                <AppIcon
                  className="text-lg text-slate-400"
                  name="arrow-right-line"
                />
              </div>
              <h3 className="whitespace-pre-line text-2xl">{slide.title}</h3>
              <p className="text-sm leading-7 text-slate-500">
                {slide.description}
              </p>
            </div>
          </button>
        ))}
      </section>
    </div>
  );
}
