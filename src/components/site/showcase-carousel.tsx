import { startTransition, useState } from "react";
import { Link } from "react-router-dom";
import { routeMap } from "../../data/core";
import { roleShowcases } from "../../data/showcases";
import type { PortalRole } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteIcon } from "./site-icon";

const showcaseTheme = {
  candidate: {
    background: "verde.png",
    bubbleText: "text-brand-ink",
    button:
      "bg-brand-mint text-brand-ink shadow-[0_20px_45px_-24px_rgba(105,242,196,0.9)] hover:bg-brand-mint-deep hover:text-white",
  },
  company: {
    background: "viola.png",
    bubbleText: "text-white",
    button:
      "bg-brand-violet text-white shadow-[0_20px_45px_-24px_rgba(116,71,225,0.9)] hover:bg-brand-violet-600",
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
        <img alt="Wedoo" className="h-[41px] w-[151px] object-contain" src={assetPath("scritta-wedoo.png")} />
      </Link>
      <ShowcaseLanguageChip />
    </header>
  );
}

function ShowcaseBubble({
  className,
  description,
  mobile = false,
  role,
}: {
  className?: string;
  description: string;
  mobile?: boolean;
  role: PortalRole;
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden text-center",
        className,
      )}
    >
      <img
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-fill"
        src={assetPath(showcaseTheme[role].background)}
      />
      <p
        className={cn(
          "relative z-10 px-10 font-wedoo-heading leading-[1.22]",
          showcaseTheme[role].bubbleText,
          mobile ? "text-[24px]" : "text-[32px]",
        )}
      >
        {description}
      </p>
    </div>
  );
}

function ShowcaseImage({
  className,
  image,
  title,
}: {
  className?: string;
  image: string;
  title: string;
}) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <img alt={title} className="h-full w-full object-contain" draggable={false} src={assetPath(image)} />
    </div>
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
        "inline-flex h-14 w-14 items-center justify-center text-brand-ink transition hover:scale-110 disabled:pointer-events-none disabled:opacity-0",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      type="button"
    >
      <SiteIcon
        className={cn("h-8 w-8", direction === "left" && "rotate-180")}
        name="arrow-right"
      />
    </button>
  );
}

function ShowcaseDesktopView({
  activeIndex,
  role,
  onNext,
  onPrevious,
  onSelect,
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

        <div className="mx-auto mt-8 max-w-[1180px]">
          <div className="ml-auto w-full max-w-[450px]">
            <h1 className="text-right font-wedoo-heading text-[52px] leading-[1.08] text-brand-ink">
              {activeSlide.title.split("\n").map((line) => (
                <span className="block" key={line}>
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <div className="relative mt-6">
            <div className="grid grid-cols-[452px_430px] items-end justify-center gap-4">
              <ShowcaseBubble
                className="h-[458px] w-full"
                description={activeSlide.description}
                role={role}
              />
              <ShowcaseImage className="h-[458px] w-full" image={activeSlide.image} title={activeSlide.title} />
            </div>

            <ShowcaseArrow
              className="absolute left-[10px] top-[46%] -translate-y-1/2"
              direction="left"
              disabled={activeIndex === 0}
              label="Slide precedente"
              onClick={onPrevious}
            />
            <ShowcaseArrow
              className="absolute right-[18px] top-[46%] -translate-y-1/2"
              direction="right"
              disabled={activeIndex === showcase.slides.length - 1}
              label="Slide successiva"
              onClick={onNext}
            />
          </div>

          <div className="mt-8 grid grid-cols-[1fr_auto_1fr] items-center">
            <div />
            <div className="flex justify-center gap-3" data-showcase-dots="desktop">
              {showcase.slides.map((slide, index) => (
                <button
                  aria-label={`Vai alla slide ${index + 1}`}
                  className={cn(
                    "h-4 w-4 rounded-full transition-all",
                    index === activeIndex ? "bg-slate-500" : "bg-slate-300 hover:bg-slate-400",
                  )}
                  key={slide.title}
                  onClick={() => onSelect(index)}
                  type="button"
                />
              ))}
            </div>

            <div className="flex justify-end">
              {isLastSlide ? (
                <Link
                  className={cn(
                    "inline-flex min-w-[216px] items-center justify-center rounded-[10px] px-6 py-3 text-[24px] font-medium transition",
                    showcaseTheme[role].button,
                  )}
                  to={routeMap[role].register}
                >
                  registrati
                </Link>
              ) : (
                <div className="h-[54px] w-[216px] opacity-0" />
              )}
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

  return (
    <section className="min-[1024px]:hidden" data-showcase-layout="mobile">
      <div className="mx-auto w-full max-w-[390px] px-2 pb-10 pt-6">
        <ShowcaseTopBar />

        <h1 className="mt-8 text-center font-wedoo-heading text-[34px] leading-[1.1] text-brand-ink">
          {activeSlide.title.split("\n").map((line) => (
            <span className="block" key={line}>
              {line}
            </span>
          ))}
        </h1>

        <ShowcaseBubble
          className="mt-7 h-[238px] w-full"
          description={activeSlide.description}
          mobile
          role={role}
        />

        <div className="relative mt-6">
          <ShowcaseArrow
            className="absolute left-0 top-[8%] z-10"
            direction="left"
            label="Slide precedente"
            onClick={onPrevious}
          />
          <ShowcaseImage
            className="mx-auto mt-10 h-[332px] w-full"
            image={activeSlide.image}
            title={activeSlide.title}
          />
          <ShowcaseArrow
            className="absolute right-0 top-[8%] z-10"
            direction="right"
            label="Slide successiva"
            onClick={onNext}
          />
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
