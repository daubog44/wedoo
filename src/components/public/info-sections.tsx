import { assetPath, cn } from "../../lib/site-utils";
import type { InfoNarrativeBlock, InfoPageResponse, InfoTextParagraph } from "../../data/info-page";
import { FaqBoard, PublicNavbar, SiteFooter } from "../site";

function InfoParagraphs({
  className,
  paragraphs,
}: {
  className?: string;
  paragraphs: readonly InfoTextParagraph[];
}) {
  return (
    <div className={cn("space-y-5", className)}>
      {paragraphs.map((paragraph, index) => (
        <p className="leading-[1.8] text-balance" key={index}>
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
      ? "border border-[var(--wedoo-gold-500)] bg-[var(--wedoo-panel-bg)]"
      : block.tone === "filled"
        ? "border border-[var(--wedoo-line)] bg-[var(--wedoo-gold-soft)]"
        : "border border-transparent bg-transparent";

  return (
    <div className={cn("rounded-[1.5rem] px-5 py-5 md:px-7 md:py-6", toneClass, className)}>
      <InfoParagraphs className="font-wedoo-body text-lg leading-8 text-[var(--wedoo-ink)]" paragraphs={block.paragraphs} />
    </div>
  );
}

function InfoDesktopView({ content }: { content: InfoPageResponse }) {
  const [outlineBlock, plainBlock, filledBlock] = content.story.blocks;

  return (
    <section className="hidden min-[1024px]:block" data-info-layout="desktop">
      <div className="mx-auto max-w-[1360px] px-8 pb-16 pt-8">
        <section className="wedoo-scroll-anchor grid gap-6 lg:grid-cols-2" id="noixnoi">
          <div className="space-y-6 lg:col-span-2 lg:max-w-[46rem]">
            <h1 className="text-[4.25rem] leading-[0.94] text-[var(--wedoo-ink-strong)]">{content.story.heading}</h1>
          </div>

          <StoryBlock block={outlineBlock} className="h-full" />

          <div className="wedoo-theme-shell wedoo-depth-card overflow-hidden rounded-[1.75rem] p-0">
            <img alt="Team Wedoo" className="aspect-[4/3] w-full object-cover" src={assetPath("image_noixnoi1.jpg")} />
          </div>

          <div className="wedoo-theme-shell wedoo-depth-card overflow-hidden rounded-[1.75rem] p-0">
            <img alt="Noi per noi" className="aspect-[4/5] w-full object-cover" src={assetPath("image_noixnoi2.jpg")} />
          </div>

          <div className="wedoo-theme-shell rounded-[1.5rem] px-6 py-6">
            <InfoParagraphs
              className="font-wedoo-body text-[1.32rem] text-[var(--wedoo-ink)]"
              paragraphs={plainBlock.paragraphs}
            />
          </div>

          <StoryBlock block={filledBlock} className="lg:col-span-2" />
        </section>

        <section className="wedoo-scroll-anchor mt-20 border-t border-[var(--wedoo-line)] pt-12" id="obiettivi">
          <div className="grid gap-10 lg:grid-cols-[0.5fr_0.5fr] lg:items-start">
            <div className="space-y-5">
              <h2 className="text-[4rem] leading-[0.94] text-[var(--wedoo-ink-strong)]">{content.goals.heading}</h2>
              <InfoParagraphs
                className="wedoo-theme-shell rounded-[1.5rem] px-6 py-6 font-wedoo-body text-lg leading-8 text-[var(--wedoo-ink)]"
                paragraphs={content.goals.paragraphs}
              />
            </div>

            <div className="space-y-6">
              <div className="overflow-hidden rounded-[1.75rem] border border-[var(--wedoo-line)] bg-[var(--wedoo-white-soft)] px-6 py-6 shadow-[0_26px_70px_-58px_rgba(15,23,40,0.28)]">
                <img alt={content.goals.diagramAlt} className="w-full object-contain" src={assetPath("diagramma.png")} />
              </div>
              <div className="wedoo-info-strip h-6 rounded-full" />
            </div>
          </div>
        </section>

        <section className="wedoo-scroll-anchor mt-20 border-t border-[var(--wedoo-line)] pt-12" id="dubbi">
          <div className="space-y-6">
            <h2 className="text-[4.4rem] leading-[0.9] text-[var(--wedoo-ink-strong)]">{content.faq.heading}</h2>
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
      <div className="mx-auto max-w-[390px] px-4 pb-12 pt-6">
        <section className="wedoo-scroll-anchor space-y-5" id="noixnoi">
          <h1 className="text-[2.75rem] leading-[1] text-[var(--wedoo-ink-strong)]">{content.story.heading}</h1>
          <StoryBlock block={outlineBlock} />
          <div className="wedoo-theme-shell wedoo-depth-card overflow-hidden rounded-[1.5rem] p-0">
            <img alt="Noi per noi" className="aspect-[4/5] w-full object-cover" src={assetPath("image_noixnoi2.jpg")} />
          </div>
          <InfoParagraphs
            className="font-wedoo-body text-[1.1rem] leading-8 text-[var(--wedoo-ink)]"
            paragraphs={plainBlock.paragraphs}
          />
          <div className="wedoo-theme-shell wedoo-depth-card overflow-hidden rounded-[1.5rem] p-0">
            <img alt="Team Wedoo" className="aspect-[4/5] w-full object-cover" src={assetPath("image_noixnoi1.jpg")} />
          </div>
          <StoryBlock block={filledBlock} />
        </section>

        <section className="wedoo-scroll-anchor mt-16 border-t border-[var(--wedoo-line)] pt-8" id="obiettivi">
          <h2 className="text-[2.55rem] leading-[1] text-[var(--wedoo-ink-strong)]">{content.goals.heading}</h2>
          <InfoParagraphs
            className="wedoo-theme-shell mt-5 rounded-[1.4rem] px-5 py-5 font-wedoo-body text-[1.02rem] leading-8 text-[var(--wedoo-ink)]"
            paragraphs={content.goals.paragraphs}
          />
          <div className="mt-5 overflow-hidden rounded-[1.4rem] border border-[var(--wedoo-line)] bg-[var(--wedoo-white-soft)] px-4 py-4">
            <img alt={content.goals.diagramAlt} className="w-full object-contain" src={assetPath("diagramma.png")} />
          </div>
          <div className="wedoo-info-strip mt-5 h-5 rounded-full" />
        </section>

        <section className="wedoo-scroll-anchor mt-16 border-t border-[var(--wedoo-line)] pt-8" id="dubbi">
          <h2 className="text-[2.45rem] leading-[1] text-[var(--wedoo-ink-strong)]">{content.faq.heading}</h2>
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
    <>
      <main className="bg-[var(--wedoo-page-bg)] pb-12">
        <PublicNavbar />
        <InfoMobileView content={content} />
        <InfoDesktopView content={content} />
      </main>
      <SiteFooter className="mt-0" />
    </>
  );
}
