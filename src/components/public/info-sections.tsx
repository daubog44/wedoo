import { AuthLanguageChip } from "./auth";
import { assetPath, cn } from "../../lib/site-utils";
import type { InfoNarrativeBlock, InfoPageResponse, InfoTextParagraph } from "../../data/info-page";
import { FaqBoard, WedooLogo } from "../site";

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
}: {
  block: InfoNarrativeBlock;
  className?: string;
}) {
  const toneClass =
    block.tone === "outline"
      ? "border border-[var(--wedoo-gold-500)] bg-white"
      : block.tone === "filled"
        ? "bg-[var(--wedoo-gold-soft)]"
        : "bg-transparent";

  return (
    <div className={cn("rounded-[1.5rem] px-5 py-5 md:px-7 md:py-6", toneClass, className)}>
      <InfoParagraphs className="font-wedoo-body text-lg leading-8 text-[var(--wedoo-ink)]" paragraphs={block.paragraphs} />
    </div>
  );
}

function InfoTopBar() {
  return (
    <div className="glass-panel flex items-center justify-between gap-4 px-4 py-3 md:px-6">
      <WedooLogo imageClassName="h-9 md:h-10" />
      <AuthLanguageChip />
    </div>
  );
}

function InfoDesktopView({ content }: { content: InfoPageResponse }) {
  const [outlineBlock, plainBlock, filledBlock] = content.story.blocks;

  return (
    <section className="hidden min-[1024px]:block" data-info-layout="desktop">
      <div className="mx-auto max-w-[1360px] px-8 pb-16 pt-6">
        <InfoTopBar />

        <section className="mt-8 grid gap-8 lg:grid-cols-[0.54fr_0.46fr]" id="noixnoi">
          <div className="space-y-6">
            <h1 className="text-[5rem] leading-[0.88] text-[var(--wedoo-ink-strong)]">{content.story.heading}</h1>
            <StoryBlock block={outlineBlock} />
            <div className="border-t border-[var(--wedoo-line)] pt-6">
              <InfoParagraphs
                className="font-wedoo-body text-[1.45rem] leading-[1.4] text-[var(--wedoo-ink)]"
                paragraphs={plainBlock.paragraphs}
              />
            </div>
            <StoryBlock block={filledBlock} />
          </div>

          <div className="grid gap-6">
            <div className="overflow-hidden rounded-[1.75rem] border border-[var(--wedoo-line)] bg-white">
              <img alt="Noi per noi" className="aspect-[4/5] w-full object-cover" src={assetPath("image_noixnoi2.jpg")} />
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-[var(--wedoo-line)] bg-white">
              <img alt="Team Wedoo" className="aspect-[4/3] w-full object-cover" src={assetPath("image_noixnoi1.jpg")} />
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-[var(--wedoo-line)] pt-12" id="obiettivi">
          <div className="grid gap-10 lg:grid-cols-[0.5fr_0.5fr] lg:items-start">
            <div className="space-y-5">
              <h2 className="text-[4.6rem] leading-[0.9] text-[var(--wedoo-ink-strong)]">{content.goals.heading}</h2>
              <InfoParagraphs
                className="rounded-[1.5rem] border border-[var(--wedoo-line)] bg-white px-6 py-6 font-wedoo-body text-lg leading-8 text-[var(--wedoo-ink)]"
                paragraphs={content.goals.paragraphs}
              />
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-[1.75rem] border border-[var(--wedoo-line)] bg-white px-6 py-6 shadow-[0_26px_70px_-58px_rgba(15,23,40,0.28)]">
                <img alt={content.goals.diagramAlt} className="w-full object-contain" src={assetPath("diagramma.png")} />
              </div>
              <div className="wedoo-info-strip h-6 rounded-full" />
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-[var(--wedoo-line)] pt-12" id="dubbi">
          <div className="space-y-6">
            <h2 className="text-[4.4rem] leading-[0.9] text-[var(--wedoo-ink-strong)]">{content.faq.heading}</h2>
            <p className="max-w-[40rem] text-lg leading-8 text-[var(--wedoo-ink-muted)]">
              Le FAQ restano editoriali, leggibili e coerenti con il resto del sistema invece di sembrare una
              tavola presa dal frame vecchio.
            </p>
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
      <div className="mx-auto max-w-[390px] px-4 pb-12 pt-5">
        <div className="glass-panel flex items-center justify-between gap-4 px-4 py-3">
          <WedooLogo imageClassName="h-8" />
          <AuthLanguageChip compact />
        </div>

        <section className="mt-6 space-y-5" id="noixnoi">
          <h1 className="text-[3.35rem] leading-[0.9] text-[var(--wedoo-ink-strong)]">{content.story.heading}</h1>
          <StoryBlock block={outlineBlock} />
          <InfoParagraphs
            className="font-wedoo-body text-[1.1rem] leading-8 text-[var(--wedoo-ink)]"
            paragraphs={plainBlock.paragraphs}
          />
          <div className="overflow-hidden rounded-[1.5rem] border border-[var(--wedoo-line)] bg-white">
            <img alt="Team Wedoo" className="aspect-[4/5] w-full object-cover" src={assetPath("image_noixnoi1.jpg")} />
          </div>
          <StoryBlock block={filledBlock} />
        </section>

        <section className="mt-16 border-t border-[var(--wedoo-line)] pt-8" id="obiettivi">
          <h2 className="text-[3.15rem] leading-[0.92] text-[var(--wedoo-ink-strong)]">{content.goals.heading}</h2>
          <InfoParagraphs
            className="mt-5 rounded-[1.4rem] border border-[var(--wedoo-line)] bg-white px-5 py-5 font-wedoo-body text-[1.05rem] leading-8 text-[var(--wedoo-ink)]"
            paragraphs={content.goals.paragraphs}
          />
          <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-[var(--wedoo-line)] bg-white px-4 py-4">
            <img alt={content.goals.diagramAlt} className="w-full object-contain" src={assetPath("diagramma.png")} />
          </div>
          <div className="wedoo-info-strip mt-5 h-5 rounded-full" />
        </section>

        <section className="mt-16 border-t border-[var(--wedoo-line)] pt-8" id="dubbi">
          <h2 className="text-[3.05rem] leading-[0.92] text-[var(--wedoo-ink-strong)]">{content.faq.heading}</h2>
          <div className="mt-5">
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
