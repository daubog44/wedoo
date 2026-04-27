import { startTransition, useState } from "react";
import { Link } from "react-router-dom";
import { roleShowcases } from "../../data/showcases";
import type { PortalRole } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteIcon } from "./site-icon";
import { WedooLogo } from "./branding";

const showcaseTheme = {
  candidate: {
    accentButton:
      "bg-[var(--wedoo-mint)] text-[var(--wedoo-ink)] shadow-[0_22px_48px_-34px_rgba(87,215,180,0.5)] hover:bg-[var(--wedoo-support-hover)] hover:text-[var(--wedoo-white-soft)]",
    accentChip: "text-[var(--wedoo-mint)]",
    accentDot: "bg-[var(--wedoo-mint)]",
    accentLine: "border-[rgba(87,215,180,0.22)]",
  },
  company: {
    accentButton:
      "bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[0_22px_48px_-34px_rgba(112,72,232,0.48)] hover:bg-[var(--wedoo-violet-hover)]",
    accentChip: "text-[var(--wedoo-violet-300)]",
    accentDot: "bg-[var(--wedoo-violet)]",
    accentLine: "border-[rgba(112,72,232,0.24)]",
  },
} as const;

function ShowcaseLanguageChip({ compact = false }: { compact?: boolean }) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--wedoo-line)] bg-white/88 text-[var(--wedoo-ink-muted)] shadow-[0_12px_30px_-24px_rgba(15,23,40,0.34)]",
        compact ? "h-[2rem] min-w-[3.6rem] px-2.5 text-[0.76rem]" : "h-[2.35rem] min-w-[4.2rem] px-3 text-[0.82rem]",
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className="h-4 w-4" name="chevron-down" />
    </button>
  );
}

function ShowcaseTopBar({ compact = false }: { compact?: boolean }) {
  return (
    <div className="glass-panel flex items-center justify-between gap-4 px-4 py-3 md:px-6">
      <WedooLogo imageClassName={compact ? "h-8" : "h-9 md:h-10"} />
      <ShowcaseLanguageChip compact={compact} />
    </div>
  );
}

function ShowcaseArrow({
  direction,
  disabled = false,
  label,
  onClick,
}: {
  direction: "left" | "right";
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/4 text-[var(--wedoo-workspace-text)] transition hover:-translate-y-0.5 hover:border-white/24 hover:bg-white/10 disabled:pointer-events-none disabled:opacity-35"
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <SiteIcon className={cn("h-5 w-5", direction === "left" && "rotate-180")} name="arrow-right" />
    </button>
  );
}

function ShowcaseSlideTitle({ title }: { title: string }) {
  return (
    <>
      {title.split("\n").map((line) => (
        <span className="block" key={line}>
          {line}
        </span>
      ))}
    </>
  );
}

function ShowcaseDesktopView({
  activeIndex,
  onNext,
  onPrevious,
  onSelect,
  role,
}: {
  activeIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (index: number) => void;
  role: PortalRole;
}) {
  const showcase = roleShowcases[role];
  const activeSlide = showcase.slides[activeIndex] ?? showcase.slides[0];
  const isLastSlide = activeIndex === showcase.slides.length - 1;
  const theme = showcaseTheme[role];

  return (
    <section className="hidden min-[1024px]:block" data-showcase-layout="desktop">
      <div className="mx-auto max-w-[1360px] px-8 pb-12 pt-6">
        <ShowcaseTopBar />

        <div className="mt-6 overflow-hidden rounded-[2rem] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface)] shadow-[0_40px_120px_-74px_rgba(4,10,20,0.92)]">
          <div className="grid lg:grid-cols-[0.44fr_0.56fr]">
            <div className="border-r border-[var(--wedoo-workspace-line)] bg-[linear-gradient(180deg,rgba(17,27,46,0.92),rgba(10,18,31,0.96))] px-8 py-9 md:px-10 md:py-10 xl:px-12 xl:py-12">
              <div className="flex h-full flex-col justify-between gap-8">
                <div className="space-y-6">
                  <span className={cn("wedoo-kicker", theme.accentChip)}>{showcase.badge}</span>
                  <h1 className="text-[4rem] leading-[0.9] text-[var(--wedoo-workspace-text)] xl:text-[4.35rem]">
                    <ShowcaseSlideTitle title={activeSlide.title} />
                  </h1>
                  <p className="max-w-[28rem] text-lg leading-8 text-[var(--wedoo-workspace-muted)]">
                    {activeSlide.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="grid gap-4">
                    {showcase.metrics.map((metric) => (
                      <div className="border-t border-white/10 pt-4" key={metric.label}>
                        <p className="text-[0.72rem] uppercase tracking-normal text-[var(--wedoo-workspace-muted)]">
                          {metric.label}
                        </p>
                        <p className="mt-2 text-[1.5rem] leading-[1.05] text-[var(--wedoo-workspace-text)]">
                          {metric.value}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div className="flex gap-3" data-showcase-dots="desktop">
                      {showcase.slides.map((slide, index) => (
                        <button
                          aria-label={`Vai alla slide ${index + 1}`}
                          className={cn(
                            "h-3.5 w-3.5 rounded-full transition-all",
                            index === activeIndex
                              ? theme.accentDot
                              : "bg-white/18 hover:bg-white/30",
                          )}
                          key={slide.title}
                          onClick={() => onSelect(index)}
                          type="button"
                        />
                      ))}
                    </div>

                    {isLastSlide ? (
                      <Link
                        className={cn(
                          "inline-flex min-h-[54px] min-w-[216px] items-center justify-center rounded-[16px] px-6 font-wedoo-accent text-[1.1rem] transition hover:-translate-y-0.5",
                          theme.accentButton,
                        )}
                        to={showcase.cta}
                      >
                        registrati
                      </Link>
                    ) : (
                      <div className="h-[54px] w-[216px]" />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="wedoo-workspace relative min-h-[42rem] overflow-hidden px-8 py-9">
              <img
                alt={activeSlide.title}
                className="absolute inset-0 h-full w-full object-cover opacity-[0.18]"
                draggable={false}
                src={assetPath(activeSlide.image)}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,13,24,0.24),rgba(7,13,24,0.9))]" />

              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div className="flex items-start justify-between gap-5">
                  <div className="space-y-3">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                      slide {activeIndex + 1}
                    </p>
                    <p className="max-w-[24rem] text-lg leading-8 text-[var(--wedoo-workspace-muted)]">
                      {showcase.description}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <ShowcaseArrow
                      direction="left"
                      disabled={activeIndex === 0}
                      label="Slide precedente"
                      onClick={onPrevious}
                    />
                    <ShowcaseArrow
                      direction="right"
                      disabled={activeIndex === showcase.slides.length - 1}
                      label="Slide successiva"
                      onClick={onNext}
                    />
                  </div>
                </div>

                <div className="grid gap-4 lg:grid-cols-[0.64fr_0.36fr]">
                  <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-[rgba(255,255,255,0.04)]">
                    <img
                      alt={activeSlide.title}
                      className="aspect-[4/3] w-full object-contain p-6"
                      draggable={false}
                      src={assetPath(activeSlide.image)}
                    />
                  </div>
                  <div className={cn("rounded-[1.45rem] border bg-white/4 p-5", theme.accentLine)}>
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                      why it matters
                    </p>
                    <p className="mt-4 text-[1.9rem] leading-[0.96] text-[var(--wedoo-workspace-text)]">
                      Un solo asse narrativo per tutta la presentazione.
                    </p>
                    <p className="mt-4 text-sm leading-7 text-[var(--wedoo-workspace-muted)]">
                      Le slide non sono piu un carosello di box. Testo, immagine e CTA lavorano come una singola
                      superficie editoriale.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcaseMobileView({
  activeIndex,
  role,
  onNext,
  onPrevious,
}: {
  activeIndex: number;
  onNext: () => void;
  onPrevious: () => void;
  role: PortalRole;
}) {
  const showcase = roleShowcases[role];
  const activeSlide = showcase.slides[activeIndex] ?? showcase.slides[0];
  const theme = showcaseTheme[role];

  return (
    <section className="min-[1024px]:hidden" data-showcase-layout="mobile">
      <div className="mx-auto max-w-[390px] px-4 pb-8 pt-5">
        <ShowcaseTopBar compact />

        <div className="mt-5 space-y-5">
          <div className="rounded-[1.6rem] border border-[var(--wedoo-workspace-line)] bg-[linear-gradient(180deg,rgba(17,27,46,0.92),rgba(10,18,31,0.96))] px-5 py-6 shadow-[0_24px_70px_-54px_rgba(4,10,20,0.72)]">
            <span className={cn("wedoo-kicker", theme.accentChip)}>{showcase.badge}</span>
            <h1 className="mt-5 text-[2.45rem] leading-[0.94] text-[var(--wedoo-workspace-text)]">
              <ShowcaseSlideTitle title={activeSlide.title} />
            </h1>
            <p className="mt-4 text-base leading-7 text-[var(--wedoo-workspace-muted)]">{activeSlide.description}</p>
          </div>

          <div className="wedoo-workspace overflow-hidden rounded-[1.6rem] px-5 py-5 shadow-[0_34px_96px_-68px_rgba(4,10,20,0.92)]">
            <div className="flex items-center justify-between gap-3">
              <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                slide {activeIndex + 1}
              </p>
              <div className="flex gap-2">
                <ShowcaseArrow direction="left" label="Slide precedente" onClick={onPrevious} />
                <ShowcaseArrow direction="right" label="Slide successiva" onClick={onNext} />
              </div>
            </div>

            <div className="mt-4 overflow-hidden rounded-[1.4rem] border border-white/10 bg-[rgba(255,255,255,0.04)]">
              <img
                alt={activeSlide.title}
                className="aspect-[4/3] w-full object-contain p-5"
                draggable={false}
                src={assetPath(activeSlide.image)}
              />
            </div>

            <div className="mt-4 grid gap-3">
              {showcase.metrics.map((metric) => (
                <div className="border-t border-white/10 pt-3" key={metric.label}>
                  <p className="text-[0.68rem] uppercase tracking-normal text-[var(--wedoo-workspace-muted)]">
                    {metric.label}
                  </p>
                  <p className="mt-2 text-lg leading-[1.08] text-[var(--wedoo-workspace-text)]">{metric.value}</p>
                </div>
              ))}
            </div>

            <Link
              className={cn(
                "mt-5 inline-flex min-h-[54px] w-full items-center justify-center rounded-[16px] px-5 font-wedoo-accent text-[1.1rem] transition hover:-translate-y-0.5",
                theme.accentButton,
              )}
              to={showcase.cta}
            >
              registrati
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ShowcaseCarousel({ role }: { role: PortalRole }) {
  const showcase = roleShowcases[role];
  const [activeIndex, setActiveIndex] = useState(0);

  function selectIndex(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= showcase.slides.length) {
      return;
    }

    startTransition(() => {
      setActiveIndex(nextIndex);
    });
  }

  function selectRelative(delta: number, loop = false) {
    const tentativeIndex = activeIndex + delta;
    const nextIndex = loop
      ? (tentativeIndex + showcase.slides.length) % showcase.slides.length
      : tentativeIndex;

    selectIndex(nextIndex);
  }

  return (
    <main className="wedoo-workspace min-h-screen bg-[var(--wedoo-workspace-bg)] pb-8">
      <ShowcaseMobileView
        activeIndex={activeIndex}
        onNext={() => selectRelative(1, true)}
        onPrevious={() => selectRelative(-1, true)}
        role={role}
      />
      <ShowcaseDesktopView
        activeIndex={activeIndex}
        onNext={() => selectRelative(1)}
        onPrevious={() => selectRelative(-1)}
        onSelect={selectIndex}
        role={role}
      />
    </main>
  );
}
