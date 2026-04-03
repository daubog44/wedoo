import { startTransition, useState } from "react";
import { Link } from "react-router-dom";
import { routeMap } from "../../data/core";
import { roleShowcases } from "../../data/showcases";
import type { PortalRole } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { PageSection } from "./branding";
import { SiteIcon } from "./site-icon";

const showcaseTheme = {
  candidate: {
    background: "verde.png",
  },
  company: {
    background: "viola.png",
  },
} as const;

export function ShowcaseCarousel({ role }: { role: PortalRole }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const showcase = roleShowcases[role];
  const activeSlide = showcase.slides[activeIndex];

  const textColorMap: Record<PortalRole, string> = {
    company: "text-white",
    candidate: "text-slate-900",
  };
  const buttonStyle: Record<PortalRole, string> = {
    company: "bg-brand-violet text-white hover:bg-brand-violet-600",
    candidate: "bg-black text-white hover:bg-slate-800",
  };

  function updateIndex(nextIndex: number) {
    if (nextIndex < 0 || nextIndex >= showcase.slides.length) return;
    startTransition(() => {
      setActiveIndex(nextIndex);
    });
  }

  return (
    <PageSection className={cn("pb-16 pt-8", role === "candidate" ? "bg-slate-50" : "bg-white")}>
      <div className="mx-auto flex w-full max-w-[1300px] flex-col items-center relative overflow-visible">

        {/* Carousel Content Container */}
        <div className="relative flex w-full flex-col lg:flex-row items-center justify-center gap-0 px-4 lg:px-12 mt-4 lg:mt-8">
          
          {/* Left Column: Text Blob (Using old static background trick) */}
          <div className="w-full lg:w-[45%] flex justify-center z-0">
            <div
              className={cn(
                "relative flex w-full max-w-[500px] lg:max-w-none items-center justify-center text-center p-8 lg:p-16",
                "aspect-[4/3] lg:aspect-auto lg:min-h-[500px]",
                "bg-contain bg-center lg:bg-right bg-no-repeat",
                textColorMap[role]
              )}
              style={{ backgroundImage: `url(${assetPath(showcaseTheme[role].background)})` }}
            >
              <h4 className="text-[1.1rem] leading-relaxed md:text-[1.4rem] lg:text-[1.65rem] font-ubuntu font-normal max-w-[360px] drop-shadow-sm pb-8 lg:pr-8">
                {activeSlide.description}
              </h4>
            </div>
          </div>

          {/* Absolute Arrows */}
          <div className="absolute top-1/2 lg:top-[55%] left-0 right-0 flex -translate-y-1/2 justify-between z-30 w-full pointer-events-none px-2 lg:px-4">
            <button
              className="pointer-events-auto p-1 lg:p-2 text-slate-800 transition hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
              disabled={activeIndex === 0}
              onClick={() => updateIndex(activeIndex - 1)}
              type="button"
            >
              <SiteIcon className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 drop-shadow-md bg-white/60 backdrop-blur-md rounded-full" name="arrow-right" style={{ transform: "rotate(180deg)" }} />
            </button>
            <button
              className="pointer-events-auto p-1 lg:p-2 text-slate-800 transition hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none"
              disabled={activeIndex === showcase.slides.length - 1}
              onClick={() => updateIndex(activeIndex + 1)}
              type="button"
            >
              <SiteIcon className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 drop-shadow-md bg-white/60 backdrop-blur-md rounded-full" name="arrow-right" />
            </button>
          </div>

          {/* Right Column: Title + Image Blob */}
          <div className="w-full lg:w-[55%] flex flex-col justify-start lg:min-h-[580px] relative -mt-6 lg:mt-0 z-10 lg:-ml-[5%]">
            {/* Title above image */}
            <div className="text-center lg:text-right w-full lg:pr-12 xl:pr-20 mb-[-10px] lg:mb-4 lg:absolute lg:top-[-60px] lg:right-0 z-20">
              <h2 className="text-[1.4rem] md:text-[1.8rem] lg:text-[2.2rem] font-ubuntu font-normal text-slate-800 leading-snug drop-shadow-sm px-4 lg:px-0">
                {activeSlide.title.split("\n").map((line: string, i: number) => (
                  <span className="block" key={i}>
                    {line}
                  </span>
                ))}
              </h2>
            </div>

            {/* Image (Overlapping left column on desktop) */}
            <div className="w-full flex justify-center lg:justify-start lg:pt-8 max-w-[500px] lg:max-w-none mx-auto lg:mx-0">
                <img
                  alt={activeSlide.title}
                  className="w-full h-auto object-contain object-center lg:object-left drop-shadow-[0_10px_30px_rgba(0,0,0,0.15)] pointer-events-none select-none"
                  draggable={false}
                  src={assetPath(activeSlide.image)}
                />
            </div>
          </div>
        </div>

        {/* Register Button & Pagination Container */}
        <div className="mt-8 lg:mt-16 flex w-full flex-col items-center gap-6 lg:gap-8 relative z-30">
          <div className="h-[52px] flex items-center justify-center">
            {activeIndex === showcase.slides.length - 1 ? (
              <Link
                className={cn(
                  "inline-flex min-w-[240px] items-center justify-center rounded-2xl px-8 py-3.5 text-[1.1rem] font-bold shadow-lg transition hover:-translate-y-1 hover:shadow-xl",
                  buttonStyle[role]
                )}
                to={routeMap[role].register}
              >
                registrati
              </Link>
            ) : null}
          </div>

          {/* Pagination Dots */}
          <div className="flex gap-4 items-center">
            {showcase.slides.map((slide, index: number) => (
              <button
                aria-label={`Vai alla slide ${index + 1}`}
                className={cn(
                  "h-3 w-3 rounded-full transition-all duration-300",
                  index === activeIndex ? "bg-slate-800 scale-[1.6]" : "bg-slate-300 hover:bg-slate-400"
                )}
                key={slide.title}
                onClick={() => updateIndex(index)}
                type="button"
              />
            ))}
          </div>
        </div>

      </div>
    </PageSection>
  );
}
