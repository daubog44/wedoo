import { Link } from "react-router-dom";
import { assetPath, cn } from "../../lib/site-utils";
import type { InfoNarrativeBlock, InfoPageResponse, InfoTextParagraph } from "../../data/info-page";
import { FaqBoard, SiteIcon } from "../site";

function InfoLanguageChip({ label }: { label: string }) {
  return (
    <button
      aria-label="Lingua italiana"
      className="inline-flex h-8 w-[57px] items-center justify-center gap-2 rounded-[8px] border border-[#767676] bg-[#e3e3e3] px-3 text-[16px] leading-none text-[#1e1e1e] opacity-50"
      type="button"
    >
      <span>{label}</span>
      <SiteIcon className="h-4 w-4" name="chevron-down" />
    </button>
  );
}

function InfoParagraphs({
  className,
  paragraphs,
}: {
  className?: string;
  paragraphs: readonly InfoTextParagraph[];
}) {
  return (
    <div className={cn("space-y-4", className)}>
      {paragraphs.map((paragraph, index) => (
        <p key={index}>
          {paragraph.map((run, runIndex) =>
            run.emphasis ? <strong key={runIndex}>{run.text}</strong> : <span key={runIndex}>{run.text}</span>,
          )}
        </p>
      ))}
    </div>
  );
}

function StoryBlock({
  block,
  className,
  compact = false,
}: {
  block: InfoNarrativeBlock;
  className?: string;
  compact?: boolean;
}) {
  const toneClass =
    block.tone === "outline"
      ? "border-[4px] border-brand-gold bg-white"
      : block.tone === "filled"
        ? "bg-brand-gold/65"
        : "";

  return (
    <div
      className={cn(
        block.tone === "plain"
          ? "text-center"
          : "rounded-[56px]",
        toneClass,
        compact
          ? block.tone === "plain"
            ? "px-2"
            : "px-6 py-7"
          : block.tone === "plain"
            ? ""
            : "px-12 py-12",
        className,
      )}
    >
      <InfoParagraphs
        className={cn(
          "font-wedoo-body text-brand-ink",
          compact ? "text-[22px] leading-[1.18]" : "text-[22px] leading-[1.28] md:text-[24px]",
        )}
        paragraphs={block.paragraphs}
      />
    </div>
  );
}

function CheckerCircle({ className }: { className?: string }) {
  return <div className={cn("wedoo-checker-placeholder rounded-full", className)} />;
}

function InfoDesktopView({ content }: { content: InfoPageResponse }) {
  const [outlineBlock, plainBlock, filledBlock] = content.story.blocks;

  return (
    <section className="hidden min-[1024px]:block" data-info-layout="desktop">
      <div className="mx-auto w-full max-w-[1440px] px-12 pb-16 pt-8">
        <header className="flex items-start justify-between gap-8">
          <Link className="inline-flex" to="/">
            <img alt="Wedoo" className="h-[41px] w-[151px] object-contain" src={assetPath("scritta-wedoo.png")} />
          </Link>
          <InfoLanguageChip label={content.topBar.languageLabel} />
        </header>

        <section className="pt-3" id="noixnoi">
          <h1 className="text-center font-wedoo-heading text-[62px] font-bold leading-none text-brand-ink">
            {content.story.heading}
          </h1>
          <div className="mt-10 flex items-start justify-between gap-10">
            <StoryBlock block={outlineBlock} className="w-full max-w-[930px] -rotate-[1.4deg]" />
            <CheckerCircle className="mt-[-14px] h-[252px] w-[252px]" />
          </div>
          <div className="mt-12 max-w-[860px] px-24">
            <StoryBlock block={plainBlock} />
          </div>
          <div className="mt-12 flex items-end justify-between gap-10">
            <CheckerCircle className="h-[252px] w-[252px]" />
            <StoryBlock block={filledBlock} className="w-full max-w-[920px] rounded-[72px]" />
          </div>
        </section>

        <section className="pt-28" id="obiettivi">
          <div className="flex justify-end">
            <h2 className="w-full max-w-[610px] text-center font-wedoo-heading text-[62px] font-bold leading-none text-brand-ink">
              {content.goals.heading}
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-[580px_minmax(0,1fr)] items-start gap-14">
            <div className="rounded-[28px] border-[4px] border-brand-rose-400 bg-white px-6 py-8">
              <InfoParagraphs
                className="font-wedoo-body text-[21px] leading-[1.2] text-brand-ink"
                paragraphs={content.goals.paragraphs}
              />
            </div>
            <div className="pt-8">
              <img
                alt={content.goals.diagramAlt}
                className="w-full max-w-[620px] object-contain"
                src={assetPath("diagramma.png")}
              />
            </div>
          </div>
          <div className="wedoo-info-strip mt-14 h-9" />
        </section>

        <section className="pt-24" id="dubbi">
          <h2 className="text-center font-wedoo-heading text-[62px] leading-none text-brand-ink">
            {content.faq.heading}
          </h2>
          <div className="mt-10">
            <FaqBoard groups={content.faq.groups} />
          </div>
        </section>
      </div>
    </section>
  );
}

function InfoMobileView({ content }: { content: InfoPageResponse }) {
  const [outlineBlock, plainBlock, filledBlock] = content.story.blocks;

  return (
    <section className="min-[1024px]:hidden" data-info-layout="mobile">
      <div className="w-full px-4 pb-12 pt-6">
        <header className="flex items-start justify-between gap-4">
          <Link className="inline-flex" to="/">
            <img alt="Wedoo" className="h-[34px] w-[125px] object-contain" src={assetPath("scritta-wedoo.png")} />
          </Link>
          <button
            aria-label="Lingua italiana"
            className="inline-flex h-[28px] w-[57px] items-center justify-center gap-1 rounded-[8px] border border-[#767676] bg-[#e3e3e3] px-2 text-[14px] leading-none text-[#1e1e1e] opacity-50"
            type="button"
          >
            <span>{content.topBar.languageLabel}</span>
            <SiteIcon className="h-4 w-4" name="chevron-down" />
          </button>
        </header>

        <section className="pt-8" id="noixnoi">
          <h1 className="text-center font-wedoo-heading text-[60px] font-bold leading-none text-brand-ink">
            {content.story.heading}
          </h1>
          <div className="mt-8">
            <StoryBlock block={outlineBlock} className="-rotate-[1.2deg]" compact />
          </div>
          <div className="mt-10">
            <StoryBlock block={plainBlock} compact />
          </div>
          <div className="mt-10">
            <StoryBlock block={filledBlock} className="rounded-[58px]" compact />
          </div>
        </section>

        <section className="pt-16" id="obiettivi">
          <h2 className="text-center font-wedoo-heading text-[54px] font-bold leading-none text-brand-ink">
            {content.goals.heading}
          </h2>
          <div className="mt-8 rounded-[28px] border-[4px] border-brand-rose-400 bg-white px-5 py-6">
            <InfoParagraphs
              className="font-wedoo-body text-[22px] leading-[1.18] text-brand-ink"
              paragraphs={content.goals.paragraphs}
            />
          </div>
          <img
            alt={content.goals.diagramAlt}
            className="mt-8 w-full object-contain"
            src={assetPath("diagramma.png")}
          />
          <div className="wedoo-info-strip mt-8 h-5" />
        </section>

        <section className="pt-16" id="dubbi">
          <h2 className="font-wedoo-heading text-[52px] leading-none text-brand-ink">
            {content.faq.heading}
          </h2>
          <div className="mt-6">
            <FaqBoard groups={content.faq.groups} />
          </div>
        </section>
      </div>
    </section>
  );
}

export function InfoPageContent({ content }: { content: InfoPageResponse }) {
  return (
    <main className="bg-[var(--wedoo-page-bg)] pb-12 pt-2">
      <InfoMobileView content={content} />
      <InfoDesktopView content={content} />
    </main>
  );
}
