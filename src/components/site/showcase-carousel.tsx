import { startTransition, useState } from "react";
import { Link } from "react-router-dom";
import { routeMap } from "../../data/core";
import { roleShowcases } from "../../data/showcases";
import type { PortalRole } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteIcon } from "./site-icon";

const showcaseTheme = {
  candidate: {
    accentSurface:
      "bg-[linear-gradient(145deg,rgba(105,242,196,0.2),rgba(255,255,255,0.9))]",
    badge: "border-brand-mint/55 bg-brand-mint/18 text-brand-ink",
    cta:
      "bg-brand-mint text-brand-ink shadow-[0_24px_58px_-32px_rgba(105,242,196,0.95)] hover:bg-brand-mint-deep hover:text-white",
    imageRing: "from-brand-mint/40 via-white/92 to-brand-mint/15",
    metric: "border-brand-mint/40 bg-white/90",
    panel: "bg-[linear-gradient(155deg,#69f2c4_0%,#91f5d6_100%)] text-brand-ink",
    sectionGlow: "bg-brand-mint/18",
    stageBackground: "bg-[linear-gradient(165deg,#f7fffc_0%,#eefdf7_100%)]",
  },
  company: {
    accentSurface:
      "bg-[linear-gradient(145deg,rgba(116,71,225,0.16),rgba(255,255,255,0.92))]",
    badge: "border-brand-violet/35 bg-brand-violet/10 text-brand-violet-700",
    cta:
      "bg-brand-violet text-white shadow-[0_24px_58px_-32px_rgba(116,71,225,0.9)] hover:bg-brand-violet-600",
    imageRing: "from-brand-violet/32 via-white/92 to-brand-violet/12",
    metric: "border-brand-violet/25 bg-white/92",
    panel: "bg-[linear-gradient(155deg,#7447E1_0%,#8665e8_100%)] text-white",
    sectionGlow: "bg-brand-violet/14",
    stageBackground: "bg-[linear-gradient(165deg,#faf8ff_0%,#f1edff_100%)]",
  },
} as const;

function ShowcaseLanguageChip() {
  return (
    <button
      aria-label="Lingua italiana"
      className="inline-flex h-8 w-[57px] items-center justify-center gap-2 rounded-[8px] border border-[#767676] bg-[#e3e3e3] px-3 text-[16px] leading-none text-[#1e1e1e] opacity-50"
      type="button"
    >
      <span>ita</span>
      <SiteIcon className="h-4 w-4" name="chevron-down" />
    </button>
  );
}

function ShowcaseTopBar() {
  return (
    <header className="flex items-start justify-between gap-8">
      <Link className="inline-flex" to="/">
        <img
          alt="Wedoo"
          className="h-[41px] w-[151px] object-contain"
          src={assetPath("scritta-wedoo.png")}
        />
      </Link>
      <ShowcaseLanguageChip />
    </header>
  );
}

function ShowcaseArrow({
  className,
  direction,
  disabled = false,
  label,
  onClick,
}: {
  className?: string;
  direction: "left" | "right";
  disabled?: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      aria-label={label}
      className={cn(
        "inline-flex h-12 w-12 items-center justify-center rounded-full border border-black/8 bg-white/88 text-brand-ink shadow-[0_18px_44px_-30px_rgba(16,25,36,0.82)] backdrop-blur transition hover:-translate-y-0.5 hover:scale-[1.03] disabled:pointer-events-none disabled:opacity-35",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <SiteIcon
        className={cn("h-7 w-7", direction === "left" && "rotate-180")}
        name="arrow-right"
      />
    </button>
  );
}

function ShowcaseMetrics({ role }: { role: PortalRole }) {
  const showcase = roleShowcases[role];

  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {showcase.metrics.map((metric) => (
        <article
          className={cn(
            "rounded-[1.45rem] border px-4 py-4 shadow-[0_22px_50px_-40px_rgba(16,25,36,0.5)]",
            showcaseTheme[role].metric,
          )}
          key={metric.label}
        >
          <p className="font-wedoo-heading text-[1.55rem] leading-none text-brand-ink">
            {metric.value}
          </p>
          <p className="mt-2 font-wedoo-accent text-[0.95rem] leading-[1.35] text-slate-600">
            {metric.label}
          </p>
        </article>
      ))}
    </div>
  );
}

function ShowcaseDots({
  activeIndex,
  onSelect,
  role,
}: {
  activeIndex: number;
  onSelect: (index: number) => void;
  role: PortalRole;
}) {
  const showcase = roleShowcases[role];

  return (
    <div className="flex items-center justify-center gap-2.5" data-showcase-dots>
      {showcase.slides.map((slide, index) => (
        <button
          aria-label={`Vai alla slide ${index + 1}`}
          className={cn(
            "h-3.5 w-3.5 rounded-full transition-all",
            index === activeIndex
              ? role === "candidate"
                ? "bg-brand-mint shadow-[0_0_0_4px_rgba(105,242,196,0.2)]"
                : "bg-brand-violet shadow-[0_0_0_4px_rgba(116,71,225,0.16)]"
              : "bg-slate-300 hover:bg-slate-400",
          )}
          key={slide.title}
          onClick={() => onSelect(index)}
          type="button"
        />
      ))}
    </div>
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

  return (
    <section className="hidden min-[1024px]:block" data-showcase-layout="desktop">
      <div className="mx-auto w-full max-w-[1440px] px-12 pb-16 pt-8">
        <ShowcaseTopBar />

        <div
          className={cn(
            "relative mt-8 overflow-hidden rounded-[2.6rem] border border-white/80 px-10 py-10 shadow-[0_42px_110px_-72px_rgba(16,25,36,0.75)] backdrop-blur-xl",
            showcaseTheme[role].stageBackground,
          )}
        >
          <div
            aria-hidden="true"
            className={cn("absolute -left-12 top-16 h-48 w-48 rounded-full blur-3xl", showcaseTheme[role].sectionGlow)}
          />
          <div
            aria-hidden="true"
            className={cn("absolute -right-10 bottom-10 h-56 w-56 rounded-full blur-3xl", showcaseTheme[role].sectionGlow)}
          />

          <div className="relative z-10 grid items-start gap-10 xl:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-7">
              <div className="space-y-4">
                <div
                  className={cn(
                    "inline-flex items-center rounded-full border px-4 py-2 font-wedoo-accent text-[0.95rem] uppercase tracking-[0.16em]",
                    showcaseTheme[role].badge,
                  )}
                >
                  {showcase.badge}
                </div>
                <h1 className="max-w-[13ch] font-wedoo-heading text-[4rem] leading-[0.96] text-brand-ink">
                  {activeSlide.title}
                </h1>
                <p className="max-w-[34rem] font-wedoo-accent text-[1.28rem] leading-[1.45] text-slate-600">
                  {showcase.description}
                </p>
              </div>

              <ShowcaseMetrics role={role} />

              <div className="rounded-[2rem] border border-black/8 bg-white/82 px-6 py-6 shadow-[0_24px_60px_-44px_rgba(16,25,36,0.62)]">
                <p className="font-wedoo-accent text-[1.25rem] leading-[1.45] text-brand-ink">
                  {activeSlide.description}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4">
                <ShowcaseDots activeIndex={activeIndex} onSelect={onSelect} role={role} />
                {isLastSlide ? (
                  <Link
                    className={cn(
                      "inline-flex min-w-[216px] items-center justify-center rounded-[12px] px-6 py-3 text-[1.2rem] font-medium transition hover:-translate-y-0.5",
                      showcaseTheme[role].cta,
                    )}
                    to={routeMap[role].register}
                  >
                    registrati
                  </Link>
                ) : (
                  <div className="h-[52px] w-[216px] opacity-0" />
                )}
              </div>
            </div>

            <div className="relative">
              <div
                className={cn(
                  "relative overflow-hidden rounded-[2.6rem] border border-white/80 p-4 shadow-[0_42px_100px_-62px_rgba(16,25,36,0.78)]",
                  showcaseTheme[role].accentSurface,
                )}
              >
                <div className="grid gap-5 lg:grid-cols-[0.78fr_1.22fr] lg:items-stretch">
                  <div
                    className={cn(
                      "relative flex min-h-[30rem] items-center justify-center overflow-hidden rounded-[2.1rem] px-8 py-10 text-center shadow-[0_28px_72px_-52px_rgba(16,25,36,0.72)]",
                      showcaseTheme[role].panel,
                    )}
                  >
                    <p className="relative z-10 font-wedoo-heading text-[2.05rem] leading-[1.15]">
                      {activeSlide.description}
                    </p>
                  </div>

                  <div
                    className={cn(
                      "relative overflow-hidden rounded-[2.2rem] bg-gradient-to-br p-[10px]",
                      showcaseTheme[role].imageRing,
                    )}
                  >
                    <div className="h-full min-h-[30rem] overflow-hidden rounded-[1.95rem] bg-[#f6f7fb]">
                      <img
                        alt={activeSlide.title}
                        className="h-full w-full object-cover object-center"
                        draggable={false}
                        src={assetPath(activeSlide.image)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <ShowcaseArrow
                className="absolute -left-6 top-1/2 -translate-y-1/2"
                direction="left"
                disabled={activeIndex === 0}
                label="Slide precedente"
                onClick={onPrevious}
              />
              <ShowcaseArrow
                className="absolute -right-6 top-1/2 -translate-y-1/2"
                direction="right"
                disabled={activeIndex === showcase.slides.length - 1}
                label="Slide successiva"
                onClick={onNext}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ShowcaseMobileView({
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

  return (
    <section className="min-[1024px]:hidden" data-showcase-layout="mobile">
      <div className="mx-auto w-full max-w-[412px] px-4 pb-12 pt-6">
        <ShowcaseTopBar />

        <div
          className={cn(
            "relative mt-6 overflow-hidden rounded-[2.25rem] border border-white/80 px-4 py-5 shadow-[0_30px_80px_-58px_rgba(16,25,36,0.68)]",
            showcaseTheme[role].stageBackground,
          )}
        >
          <div
            aria-hidden="true"
            className={cn("absolute -right-8 top-12 h-28 w-28 rounded-full blur-3xl", showcaseTheme[role].sectionGlow)}
          />

          <div className="relative z-10 space-y-5">
            <div className="space-y-3 text-center">
              <div
                className={cn(
                  "mx-auto inline-flex items-center rounded-full border px-3 py-1.5 font-wedoo-accent text-[0.78rem] uppercase tracking-[0.14em]",
                  showcaseTheme[role].badge,
                )}
              >
                {showcase.badge}
              </div>
              <h1 className="font-wedoo-heading text-[2.5rem] leading-[1.02] text-brand-ink">
                {activeSlide.title}
              </h1>
              <p className="font-wedoo-accent text-[1.02rem] leading-[1.42] text-slate-600">
                {showcase.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {showcase.metrics.map((metric) => (
                <article
                  className={cn(
                    "rounded-[1.2rem] border px-3 py-3 text-center shadow-[0_18px_42px_-34px_rgba(16,25,36,0.55)]",
                    showcaseTheme[role].metric,
                  )}
                  key={metric.label}
                >
                  <p className="font-wedoo-heading text-[1.1rem] leading-none text-brand-ink">
                    {metric.value}
                  </p>
                  <p className="mt-1.5 font-wedoo-accent text-[0.72rem] leading-[1.25] text-slate-600">
                    {metric.label}
                  </p>
                </article>
              ))}
            </div>

            <div
              className={cn(
                "relative overflow-hidden rounded-[2rem] px-5 py-6 text-center shadow-[0_26px_70px_-46px_rgba(16,25,36,0.72)]",
                showcaseTheme[role].panel,
              )}
            >
              <p className="font-wedoo-heading text-[1.7rem] leading-[1.15]">
                {activeSlide.description}
              </p>
            </div>

            <div className="relative">
              <div
                className={cn(
                  "overflow-hidden rounded-[2rem] bg-gradient-to-br p-[8px]",
                  showcaseTheme[role].imageRing,
                )}
              >
                <div className="overflow-hidden rounded-[1.75rem] bg-[#f6f7fb]">
                  <img
                    alt={activeSlide.title}
                    className="h-[21rem] w-full object-cover object-center"
                    draggable={false}
                    src={assetPath(activeSlide.image)}
                  />
                </div>
              </div>

              <ShowcaseArrow
                className="absolute left-2 top-1/2 -translate-y-1/2"
                direction="left"
                label="Slide precedente"
                onClick={onPrevious}
              />
              <ShowcaseArrow
                className="absolute right-2 top-1/2 -translate-y-1/2"
                direction="right"
                label="Slide successiva"
                onClick={onNext}
              />
            </div>

            <ShowcaseDots activeIndex={activeIndex} onSelect={onSelect} role={role} />

            {isLastSlide ? (
              <Link
                className={cn(
                  "inline-flex h-12 w-full items-center justify-center rounded-[12px] text-[1.1rem] font-medium transition hover:-translate-y-0.5",
                  showcaseTheme[role].cta,
                )}
                to={routeMap[role].register}
              >
                registrati
              </Link>
            ) : null}
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
    <main className="min-h-screen bg-[var(--wedoo-page-bg)] pb-10 pt-2">
      <ShowcaseMobileView
        activeIndex={activeIndex}
        onNext={() => selectRelative(1, true)}
        onPrevious={() => selectRelative(-1, true)}
        onSelect={selectIndex}
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
