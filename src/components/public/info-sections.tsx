import { Link } from "react-router-dom";
import {
  assetPath,
  cn,
} from "../../lib/site-utils";
import type {
  InfoNarrativeBlock,
  InfoPageResponse,
  InfoTextParagraph,
} from "../../data/info-page";
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
            run.emphasis ? (
              <strong key={runIndex}>{run.text}</strong>
            ) : (
              <span key={runIndex}>{run.text}</span>
            ),
          )}
        </p>
      ))}
    </div>
  );
}

function StoryCard({
  block,
  compact = false,
}: {
  block: InfoNarrativeBlock;
  compact?: boolean;
}) {
  const toneClass =
    block.tone === "outline"
      ? "border-brand-gold/70 bg-white/94"
      : block.tone === "filled"
        ? "border-brand-gold/30 bg-brand-gold/45"
        : "border-black/6 bg-white/80";

  return (
    <article
      className={cn(
        "rounded-[1.35rem] border px-5 py-5 shadow-[0_18px_42px_-34px_rgba(16,25,36,0.18)]",
        toneClass,
        compact ? "min-h-[auto]" : "h-full",
      )}
    >
      <InfoParagraphs
        className={cn(
          "font-wedoo-body text-brand-ink",
          compact ? "text-[0.98rem] leading-[1.45]" : "text-[1.05rem] leading-[1.55]",
        )}
        paragraphs={block.paragraphs}
      />
    </article>
  );
}

function InfoTopBar({ label }: { label: string }) {
  return (
    <header className="flex items-start justify-between gap-8">
      <Link className="inline-flex" to="/">
        <img
          alt="Wedoo"
          className="h-[41px] w-[151px] object-contain"
          src={assetPath("scritta-wedoo.png")}
        />
      </Link>
      <InfoLanguageChip label={label} />
    </header>
  );
}

function InfoStoryDesktop({ content }: { content: InfoPageResponse }) {
  const [outlineBlock, plainBlock, filledBlock] = content.story.blocks;

  return (
    <section className="space-y-8" id="noixnoi">
      <div className="grid items-end gap-8 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="space-y-5">
          <div className="inline-flex rounded-full border border-brand-gold/50 bg-brand-gold/20 px-4 py-2 font-wedoo-accent text-[0.9rem] uppercase tracking-[0.16em] text-brand-ink">
            manifesto Wedoo
          </div>
          <h1 className="font-wedoo-heading text-[3.6rem] leading-[0.95] text-brand-ink">
            {content.story.heading}
          </h1>
          <p className="max-w-[30rem] font-wedoo-accent text-[0.98rem] leading-[1.45] text-slate-600">
            Una pagina editoriale che spiega il problema, il contesto e il motivo per cui Wedoo esiste.
          </p>
        </div>

        <div className="relative h-[14rem] overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(150deg,rgba(105,242,196,0.18),rgba(255,255,255,0.9),rgba(116,71,225,0.12))] shadow-[0_22px_54px_-42px_rgba(16,25,36,0.24)]">
          <div className="wedoo-checker-placeholder absolute -left-10 top-1/2 h-[12rem] w-[12rem] -translate-y-1/2 rounded-full opacity-55" />
          <div className="absolute right-8 top-8 max-w-[15rem] rounded-[1.1rem] border border-white/70 bg-white/88 px-4 py-3 font-wedoo-accent text-[0.86rem] leading-[1.4] text-slate-600 shadow-[0_18px_40px_-34px_rgba(16,25,36,0.18)]">
            Lavoro, impatto, trasparenza. Stessa grammatica anche fuori dalla home.
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
        <StoryCard block={outlineBlock} />
        <div className="grid gap-6">
          <StoryCard block={plainBlock} />
          <StoryCard block={filledBlock} />
        </div>
      </div>
    </section>
  );
}

function InfoStoryMobile({ content }: { content: InfoPageResponse }) {
  return (
    <section className="space-y-5" id="noixnoi">
      <div className="space-y-4 text-center">
        <div className="mx-auto inline-flex rounded-full border border-brand-gold/50 bg-brand-gold/20 px-3 py-1.5 font-wedoo-accent text-[0.78rem] uppercase tracking-[0.14em] text-brand-ink">
          manifesto Wedoo
        </div>
        <h1 className="font-wedoo-heading text-[2.7rem] leading-[0.96] text-brand-ink">
          {content.story.heading}
        </h1>
        <p className="font-wedoo-accent text-[0.9rem] leading-[1.45] text-slate-600">
          Il perche di Wedoo, raccontato come sezione editoriale e non come blocco statico.
        </p>
      </div>

      {content.story.blocks.map((block) => (
        <StoryCard block={block} compact key={block.id} />
      ))}
    </section>
  );
}

function InfoGoalsSection({
  content,
  mobile = false,
}: {
  content: InfoPageResponse;
  mobile?: boolean;
}) {
  return (
    <section className="space-y-6" id="obiettivi">
      <div className={cn("space-y-4", mobile ? "text-left" : "max-w-[44rem]")}>
        <div className="inline-flex rounded-full border border-brand-rose-400/45 bg-brand-rose-400/10 px-4 py-2 font-wedoo-accent text-[0.9rem] uppercase tracking-[0.16em] text-brand-ink">
          agenda 2030
        </div>
        <h2 className={cn("font-wedoo-heading leading-[0.96] text-brand-ink", mobile ? "text-[2.4rem]" : "text-[3.25rem]")}>
          {content.goals.heading}
        </h2>
      </div>

      <div className={cn("grid gap-6", mobile ? "" : "lg:grid-cols-[0.92fr_1.08fr] lg:items-center")}>
        <article className="rounded-[1.35rem] border border-brand-rose-400/45 bg-white/94 px-5 py-5 shadow-[0_18px_42px_-34px_rgba(16,25,36,0.18)]">
          <InfoParagraphs
            className={cn(
              "font-wedoo-body text-brand-ink",
              mobile ? "text-[0.96rem] leading-[1.48]" : "text-[1.02rem] leading-[1.52]",
            )}
            paragraphs={content.goals.paragraphs}
          />
        </article>

        <div className="rounded-[1.6rem] border border-white/80 bg-white/86 p-4 shadow-[0_20px_48px_-38px_rgba(16,25,36,0.18)]">
          <div className="rounded-[1.2rem] bg-[linear-gradient(155deg,rgba(255,255,255,0.98),rgba(245,247,251,0.92))] p-4">
            <img
              alt={content.goals.diagramAlt}
              className="w-full object-contain"
              src={assetPath("diagramma.png")}
            />
          </div>
        </div>
      </div>

      <div className={cn("wedoo-info-strip", mobile ? "h-5" : "h-8")} />
    </section>
  );
}

function InfoFaqSection({
  content,
  mobile = false,
}: {
  content: InfoPageResponse;
  mobile?: boolean;
}) {
  return (
    <section className="space-y-6" id="dubbi">
      <div className={cn("space-y-4", mobile ? "" : "max-w-[42rem]")}>
        <div className="inline-flex rounded-full border border-brand-violet/30 bg-brand-violet/10 px-4 py-2 font-wedoo-accent text-[0.9rem] uppercase tracking-[0.16em] text-brand-violet-700">
          FAQ
        </div>
        <h2 className={cn("font-wedoo-heading leading-[0.96] text-brand-ink", mobile ? "text-[2.4rem]" : "text-[3.25rem]")}>
          {content.faq.heading}
        </h2>
      </div>

      <div className="rounded-[1.6rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(244,245,251,0.88))] p-3 shadow-[0_20px_48px_-38px_rgba(16,25,36,0.18)] sm:p-4">
        <FaqBoard groups={content.faq.groups} />
      </div>
    </section>
  );
}

function InfoDesktopView({ content }: { content: InfoPageResponse }) {
  return (
    <section className="hidden min-[1024px]:block" data-info-layout="desktop">
      <div className="mx-auto w-full max-w-[1440px] px-12 pb-16 pt-8">
        <InfoTopBar label={content.topBar.languageLabel} />

        <div className="mt-8 overflow-hidden rounded-[2.1rem] border border-white/80 bg-[linear-gradient(160deg,rgba(255,255,255,0.92),rgba(249,246,235,0.55),rgba(244,245,251,0.94))] px-8 py-8 shadow-[0_26px_68px_-52px_rgba(16,25,36,0.24)]">
          <div className="space-y-16">
            <InfoStoryDesktop content={content} />
            <InfoGoalsSection content={content} />
            <InfoFaqSection content={content} />
          </div>
        </div>
      </div>
    </section>
  );
}

function InfoMobileView({ content }: { content: InfoPageResponse }) {
  return (
    <section className="min-[1024px]:hidden" data-info-layout="mobile">
      <div className="w-full px-4 pb-12 pt-6">
        <InfoTopBar label={content.topBar.languageLabel} />

        <div className="mt-6 overflow-hidden rounded-[1.8rem] border border-white/80 bg-[linear-gradient(165deg,rgba(255,255,255,0.94),rgba(249,246,235,0.58),rgba(244,245,251,0.94))] px-4 py-5 shadow-[0_22px_54px_-42px_rgba(16,25,36,0.22)]">
          <div className="space-y-12">
            <InfoStoryMobile content={content} />
            <InfoGoalsSection content={content} mobile />
            <InfoFaqSection content={content} mobile />
          </div>
        </div>
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
