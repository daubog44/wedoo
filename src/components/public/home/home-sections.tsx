import { useMemo } from "react";
import { Link } from "react-router-dom";
import { documents, routeMap } from "../../../data/core";
import type {
  PublicHomeContent,
  PublicHomeFeatureCard,
  PublicHomeNavigationCopy,
} from "../../../data/mocks/public-home";
import { AppIcon } from "../../../lib/icons";
import { assetPath, cn, documentPath, referencePath } from "../../../lib/site-utils";
import { SiteIcon } from "../../site";
import { PreviewFrame, SectionIntro, StatCard, Surface } from "../../ui";
import { homeFeatureToneStyles } from "./home-constants";
import { HomeAuthButtonGroup } from "./home-auth-button-group";
import { HomeCandidateRoleButton } from "./home-candidate-role-button";
import { HomeCompanyRoleButton } from "./home-company-role-button";
import { HomeDiscoverGoldButton } from "./home-discover-gold-button";
import { HomeDiscoverRoseButton } from "./home-discover-rose-button";
import { HomeDiscoverVioletButton } from "./home-discover-violet-button";
import { HomeDownloadAppButton } from "./home-download-app-button";
import { HomeRouteButton, SdgRibbon } from "./home-primitives";

export type HomeAuthIntent = "login" | "signup";

type HomePageProps = {
  content: PublicHomeContent;
  onOpenAuth: (intent: HomeAuthIntent) => void;
};

function LanguageChipCompact({
  label,
  mobile = false,
}: {
  label: string;
  mobile?: boolean;
}) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center rounded-[8px] border border-[#767676] bg-[#e3e3e3] opacity-50",
        mobile ? "h-[28px] w-[57px] gap-1 px-2 text-[14px]" : "h-8 w-[57px] gap-2 px-3 text-[16px]",
      )}
      type="button"
    >
      <span className="font-sans leading-none">{label}</span>
      <SiteIcon className={mobile ? "h-3 w-3" : "h-4 w-4"} name="chevron-down" />
    </button>
  );
}

function LegalLinks({ compact = false }: { compact?: boolean }) {
  const icons = ["\u{1F4C4}", "\u{1F36A}", "\u{1F4DD}"] as const;

  return (
    <>
      {documents.map((document, index) => (
        <span key={document.file}>
          <span>{icons[index]} </span>
          <a
            className="transition hover:text-brand-violet-50"
            href={documentPath(document.file)}
            rel="noreferrer"
            target="_blank"
          >
            {document.label}
          </a>
          {index < documents.length - 1 ? (compact ? " | " : "  |  ") : ""}
        </span>
      ))}
    </>
  );
}

function FooterLegalCopy({
  content,
  compact = false,
}: {
  content: PublicHomeContent["footer"];
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col text-[var(--wedoo-white-soft)]",
        compact ? "items-center gap-1.5 text-[10px] text-center" : "max-w-[31rem] gap-2 text-[15px]",
      )}
      style={{ fontFamily: '"Inter", var(--wedoo-font-body)' }}
    >
      <p className="leading-none">&copy; {content.rightsLine}</p>
      <p className="leading-none italic">{content.projectStatus}</p>
      <p className="leading-none">
        {content.contactLabel}: {content.contactEmail}
      </p>
      <p className={cn("leading-none", !compact && "whitespace-nowrap")}>
        <LegalLinks compact={compact} />
      </p>
      {content.disclaimers.map((line) => (
        <p className="leading-none italic" key={line}>
          {line}
        </p>
      ))}
    </div>
  );
}

function FeatureDiscoverButton({ card }: { card: PublicHomeFeatureCard }) {
  const commonClassName =
    "h-[3.25rem] w-full min-w-0 justify-between gap-4 rounded-[10px] px-5 text-[1.2rem] leading-none sm:w-auto";

  if (card.tone === "gold") {
    return <HomeDiscoverGoldButton className={commonClassName} to={card.href} />;
  }

  if (card.tone === "rose") {
    return <HomeDiscoverRoseButton className={commonClassName} to={card.href} />;
  }

  return <HomeDiscoverVioletButton className={commonClassName} to={card.href} />;
}

function FeatureCard({
  card,
  priority = false,
}: {
  card: PublicHomeFeatureCard;
  priority?: boolean;
}) {
  const toneStyle = homeFeatureToneStyles[card.tone];

  return (
    <article
      className={cn(
        "wedoo-hover-panel flex h-full flex-col overflow-hidden rounded-[28px] border-[3px] bg-white/92 shadow-[0_24px_70px_-48px_rgba(16,25,36,0.72)] backdrop-blur-sm",
        toneStyle.borderClassName,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-white">
        <img
          alt={card.title}
          className="h-full w-full object-cover transition duration-300 hover:scale-[1.04]"
          loading={priority ? "eager" : "lazy"}
          src={assetPath(card.image)}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-6 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
        <h3 className="font-wedoo-accent text-[1.5rem] leading-[1.1] text-[var(--wedoo-ink-strong)]">
          {card.title}
        </h3>
        <div className="flex justify-start">
          <FeatureDiscoverButton card={card} />
        </div>
      </div>
    </article>
  );
}

function DesktopHeader({
  navigation,
  onOpenAuth,
}: {
  navigation: PublicHomeNavigationCopy;
  onOpenAuth: (intent: HomeAuthIntent) => void;
}) {
  return (
      <header className="section-shell hidden pt-5 min-[1024px]:block" data-home-section="header">
        <div className="flex items-center justify-between gap-8 rounded-[1.3rem] border border-black/8 bg-white/88 px-7 py-4 shadow-[0_18px_42px_-34px_rgba(16,25,36,0.16)]">
          <Link className="shrink-0" to="/">
            <img
              alt="Wedoo"
              className="h-[56px] w-[152px] object-contain"
              src={assetPath("Frame-1@2x.png")}
            />
          </Link>

          <div className="flex min-w-0 flex-1 items-center justify-end gap-5">
            <div className="w-full max-w-[18rem]">
              <HomeAuthButtonGroup navigation={navigation} onOpenAuth={onOpenAuth} />
            </div>
            <HomeRouteButton
              className="h-auto min-w-0 justify-center px-0 text-center text-[1.05rem] leading-[normal] text-[var(--wedoo-ink)] hover:-translate-y-0"
              to={routeMap.company.showcase}
              variant="textLink"
            >
            {navigation.companyPrompt}
          </HomeRouteButton>
          <LanguageChipCompact label={navigation.languageLabel} />
        </div>
      </div>
    </header>
  );
}

function MobileHeader({
  navigation,
  onOpenAuth,
}: {
  navigation: PublicHomeNavigationCopy;
  onOpenAuth: (intent: HomeAuthIntent) => void;
}) {
  return (
      <header className="section-shell pt-5 min-[1024px]:hidden" data-home-section="header">
        <div className="rounded-[1.15rem] border border-black/8 bg-white/90 px-4 py-4 shadow-[0_18px_38px_-28px_rgba(16,25,36,0.16)]">
        <div className="flex items-start justify-between gap-4">
          <Link className="shrink-0" to="/">
            <img
              alt="Wedoo"
              className="h-[44px] w-[104px] object-contain"
              src={assetPath("scritta-wedoo.png")}
            />
          </Link>
          <LanguageChipCompact label={navigation.languageLabel} mobile />
        </div>

        <div className="mt-5">
          <HomeAuthButtonGroup navigation={navigation} onOpenAuth={onOpenAuth} />
        </div>

          <div className="mt-3 flex justify-center">
            <HomeRouteButton
              className="h-auto min-w-0 justify-center px-0 text-center text-[1rem] leading-[normal] text-[var(--wedoo-ink)] hover:-translate-y-0"
              to={routeMap.company.showcase}
              variant="textLink"
            >
            {navigation.companyPrompt}
          </HomeRouteButton>
        </div>
      </div>
    </header>
  );
}

function DesktopHeroSection({ content }: { content: PublicHomeContent }) {
  const subtitleLines = content.hero.subtitle.split("\n");

  return (
    <section className="section-shell hidden pt-6 min-[1024px]:block" data-home-section="hero">
      <div className="section-card relative overflow-hidden px-9 py-9">
        <div className="spot-orb -left-10 top-10 h-48 w-48 bg-brand-mint/16" />
        <div className="spot-orb right-0 top-14 h-64 w-64 bg-brand-violet/12" />
        <SdgRibbon />

        <div className="mt-7 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start">
          <div className="space-y-7">
            <div className="space-y-4">
              <h1 className="max-w-[11ch] text-[3rem] leading-[0.95] text-[var(--wedoo-ink)]">
                {content.hero.title}
              </h1>
              <div className="space-y-1 font-wedoo-accent text-[1.28rem] leading-[1.18] text-[var(--wedoo-ink)]">
                {subtitleLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <HomeDownloadAppButton
                className="h-[3.2rem] min-w-[12rem] rounded-[12px] border-[var(--wedoo-ink)] px-5 text-[1.05rem] shadow-[0_18px_40px_-28px_rgba(36,25,63,0.32)]"
                label={content.hero.downloadLabel}
              />
              <div className="rounded-full border border-black/8 bg-white/92 px-4 py-2 text-[0.84rem] font-medium text-slate-600 shadow-[0_12px_28px_-22px_rgba(16,25,36,0.16)]">
                Annunci leggibili. Impatto verificabile. Nessun washing.
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-3">
              <StatCard
                icon="chart-bar-line"
                label="Aziende e ruoli letti sugli SDG, non solo sul titolo"
                value="17 SDG"
              />
              <StatCard
                icon="search-line"
                label="Percorsi distinti per chi cerca e per chi assume"
                value="2 flussi"
              />
              <StatCard
                icon="check-circle-line"
                label="Struttura editoriale pensata per ridurre il rumore"
                value="Piu chiaro"
              />
            </div>
          </div>

          <div className="space-y-4">
            <PreviewFrame
              alt="Wedoo preview"
              className="aspect-[1.02] rounded-[1.7rem] bg-[linear-gradient(145deg,rgba(116,71,225,0.1),rgba(105,242,196,0.1))] p-2.5"
              imgClassName="rounded-[1.3rem] object-cover object-top"
              priority
              src={referencePath("bozza-wedoo.png")}
            />

            <div className="rounded-[1.5rem] border border-brand-violet/15 bg-[linear-gradient(140deg,rgba(116,71,225,0.98),rgba(60,37,117,0.98))] px-6 py-5 text-[var(--wedoo-white-soft)] shadow-[0_22px_54px_-36px_rgba(32,18,70,0.34)]">
              <p className="font-wedoo-accent text-[0.78rem] tracking-[0.18em] text-white/68 uppercase">
                {content.howItWorks.eyebrow}
              </p>
              <h2 className="mt-3 max-w-[16ch] text-[1.7rem] leading-[1.04] text-white">
                {content.howItWorks.title}
              </h2>
              <p className="mt-3 max-w-[31rem] font-wedoo-accent text-[0.95rem] leading-[1.45] text-white/80">
                {content.howItWorks.desktopDescription}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <HomeCandidateRoleButton
                  className="h-[3.1rem] min-w-[10.5rem] rounded-[12px] text-[1.05rem]"
                  label={content.howItWorks.candidateLabel}
                />
                <HomeCompanyRoleButton
                  className="h-[3.1rem] min-w-[10.5rem] rounded-[12px] border-white/10 bg-[rgba(189,178,232,0.16)] text-[1.05rem] text-white"
                  label={content.howItWorks.companyLabel}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileHeroSection({ content }: { content: PublicHomeContent }) {
  const subtitleLines = content.hero.subtitle.split("\n");

  return (
    <section className="section-shell pt-4 min-[1024px]:hidden" data-home-section="hero">
      <div className="section-card relative overflow-hidden px-5 py-6">
        <div className="spot-orb -left-6 top-16 h-28 w-28 bg-brand-mint/20" />
        <div className="spot-orb -right-4 top-10 h-40 w-40 bg-brand-violet/14" />
        <SdgRibbon />

        <div className="mt-6 space-y-6">
          <div className="space-y-4 text-center">
            <h1 className="text-[2rem] leading-[0.98] text-[var(--wedoo-ink)]">
              {content.hero.title}
            </h1>
            <div className="space-y-1 font-wedoo-accent text-[1rem] leading-[1.3] text-[var(--wedoo-ink)]">
              {subtitleLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <HomeDownloadAppButton
              className="h-[3.1rem] min-w-[11rem] rounded-[12px] border-[var(--wedoo-ink)] px-4 text-[1rem] shadow-[0_18px_38px_-28px_rgba(36,25,63,0.26)]"
              label={content.hero.downloadLabel}
            />
          </div>

          <PreviewFrame
            alt="Wedoo preview"
            className="aspect-[1.18] rounded-[1.4rem] bg-[linear-gradient(145deg,rgba(116,71,225,0.1),rgba(105,242,196,0.12))] p-2"
            imgClassName="rounded-[1.1rem] object-cover object-top"
            priority
            src={referencePath("bozza-wedoo.png")}
          />

          <div className="rounded-[1.25rem] border border-brand-violet/15 bg-[linear-gradient(140deg,rgba(116,71,225,0.98),rgba(60,37,117,0.98))] p-5 text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(32,18,70,0.3)]">
            <p className="font-wedoo-accent text-[0.75rem] tracking-[0.16em] text-white/68 uppercase">
              {content.howItWorks.eyebrow}
            </p>
            <h2 className="mt-3 text-[1.55rem] leading-[1.05] text-white">
              {content.howItWorks.mobileTitle}
            </h2>
            <p className="mt-3 font-wedoo-accent text-[0.9rem] leading-[1.45] text-white/80">
              {content.howItWorks.mobileDescription}
            </p>

            <div className="mt-4 flex flex-col gap-3">
              <HomeCandidateRoleButton
                className="h-[3rem] w-full rounded-[12px] text-[1rem]"
                label={content.howItWorks.candidateLabel}
              />
              <HomeCompanyRoleButton
                className="h-[3rem] w-full rounded-[12px] border-white/10 bg-[rgba(189,178,232,0.16)] text-[1rem] text-white"
                label={content.howItWorks.companyLabel}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactStatementSection({
  content,
  mobile = false,
}: {
  content: PublicHomeContent;
  mobile?: boolean;
}) {
  return (
    <section className={cn("section-shell", mobile ? "pt-6" : "pt-8")} data-home-section="impact">
      <Surface
        className={cn(
          "rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(245,247,251,0.92))] text-center",
          mobile ? "px-5 py-8" : "px-10 py-10",
        )}
      >
        <p
          className={cn(
            "mx-auto font-wedoo-accent text-[var(--wedoo-ink)]",
            mobile ? "max-w-[18rem] text-[1.35rem] leading-[1.35]" : "max-w-[68rem] text-[2.15rem] leading-[1.28]",
          )}
        >
          {mobile ? content.impactStatement.mobile : content.impactStatement.desktop}
        </p>
      </Surface>
    </section>
  );
}

function FeatureCardsSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="section-shell pt-8" data-home-section="features">
      <div className="flex items-center justify-between gap-6">
        <SectionIntro
          description="Tre porte editoriali per capire meglio chi siamo, come leggiamo gli obiettivi Agenda 2030 e dove rispondiamo ai dubbi piu comuni."
          title="Percorsi brevi, utili, leggibili."
        />
        <div className="hidden min-[1024px]:block">
          <SdgRibbon className="w-[18rem]" />
        </div>
      </div>

      <div className="mt-8 grid gap-6 min-[1024px]:grid-cols-3">
        {content.featureCards.map((card, index) => (
          <FeatureCard card={card} key={card.id} priority={index === 0} />
        ))}
      </div>
    </section>
  );
}

function VideoSection({
  content,
  mobile = false,
}: {
  content: PublicHomeContent;
  mobile?: boolean;
}) {
  return (
    <section className="section-shell pt-8" data-home-section="video">
      <div
        className={cn(
          "grid gap-6",
          mobile ? "" : "min-[1024px]:grid-cols-[0.82fr_1.18fr] min-[1024px]:items-center",
        )}
      >
        <Surface
          className={cn(
            "relative overflow-hidden rounded-[2.2rem] bg-white/88",
            mobile ? "px-5 py-6" : "px-8 py-8",
          )}
        >
          <div className="spot-orb -right-8 top-0 h-36 w-36 bg-brand-violet/10" />
          <SectionIntro
            description="Un blocco più credibile del vecchio placeholder: resta un preview state, ma ora è una sezione editoriale con gerarchia e profondità coerenti."
            title={content.video.title}
          />
          <div className="mt-6 rounded-[1.5rem] border border-dashed border-brand-violet/25 bg-brand-violet/6 px-4 py-3 font-wedoo-accent text-[1rem] leading-[1.45] text-slate-600">
            Preview media in attesa del player definitivo, ma già con spazio riservato e composizione stabile.
          </div>
        </Surface>

        <div className="relative">
          <div
            aria-hidden="true"
            className={cn(
              "absolute rounded-[2.4rem] bg-[linear-gradient(145deg,var(--wedoo-violet-panel),var(--wedoo-violet-800))]",
              mobile ? "inset-x-3 top-5 h-[15rem]" : "inset-y-7 right-0 w-[88%]",
            )}
          />
          <div className={cn("relative", mobile ? "px-4 pt-0" : "pl-6")}>
            <PreviewFrame
              alt={content.video.previewAlt}
              className={cn(
                "overflow-hidden rounded-[2rem] border border-white/70 bg-white/92 p-2 shadow-[var(--wedoo-shadow-hero)]",
                mobile ? "aspect-[16/10]" : "aspect-[16/10]",
              )}
              imgClassName="rounded-[1.6rem] object-cover"
              priority
              src={assetPath(content.video.previewImage)}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white/88 shadow-[0_24px_60px_-42px_rgba(16,25,36,0.82)] backdrop-blur">
                <AppIcon className="text-5xl text-brand-ink" name="play-circle-line" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PatronageSection({
  content,
  mobile = false,
}: {
  content: PublicHomeContent;
  mobile?: boolean;
}) {
  return (
    <section
      aria-labelledby={mobile ? "home-patronage-title-mobile" : "home-patronage-title-desktop"}
      className="section-shell pt-8"
      data-home-section="patronage"
    >
      <Surface
        className={cn(
          "rounded-[2rem] border border-[var(--wedoo-border-strong)]/60 bg-white/72 text-center",
          mobile ? "px-5 py-8" : "px-8 py-10",
        )}
      >
        <h2
          className={cn(
            "font-wedoo-accent font-normal uppercase text-[var(--wedoo-ink-strong)]",
            mobile ? "text-[1.3rem]" : "text-[2.25rem]",
          )}
          id={mobile ? "home-patronage-title-mobile" : "home-patronage-title-desktop"}
        >
          {content.patronage.title}
        </h2>
        <p className="mt-4 font-wedoo-accent text-[1rem] leading-[1.5] text-slate-500">
          Spazio istituzionale riservato: il blocco resta intenzionalmente vuoto, ma ora è trattato come parte della composizione e non come box perso in fondo pagina.
        </p>
      </Surface>
    </section>
  );
}

function DesktopFooter({ content }: { content: PublicHomeContent }) {
  return (
    <footer
      className="mt-10 bg-[var(--wedoo-violet-deep)] text-[var(--wedoo-white-soft)]"
      data-home-section="footer"
    >
      <div className="section-shell py-7">
        <div className="flex items-end justify-between gap-8">
          <Link className="shrink-0" to="/">
            <img
              alt="Wedoo"
              className="h-[74px] w-[162px] object-contain"
              src={assetPath("Frame-2@2x.png")}
            />
          </Link>
          <FooterLegalCopy content={content.footer} />
        </div>
      </div>
    </footer>
  );
}

function MobileFooter({ content }: { content: PublicHomeContent }) {
  return (
    <footer
      className="mt-8 bg-[var(--wedoo-violet-deep)] text-[var(--wedoo-white-soft)]"
      data-home-section="footer"
    >
      <div className="section-shell flex flex-col items-center gap-4 py-6 text-center">
        <Link className="shrink-0" to="/">
          <img
            alt="Wedoo"
            className="h-[48px] w-[108px] object-contain"
            src={assetPath("Frame-2@2x.png")}
          />
        </Link>
        <FooterLegalCopy compact content={content.footer} />
      </div>
    </footer>
  );
}

export function MobileHomePage({ content, onOpenAuth }: HomePageProps) {
  return (
    <div className="block overflow-x-hidden bg-[var(--wedoo-page-bg)] pb-10 min-[1024px]:hidden" data-home-layout="mobile">
      <MobileHeader navigation={content.navigation} onOpenAuth={onOpenAuth} />
      <MobileHeroSection content={content} />
      <ImpactStatementSection content={content} mobile />
      <FeatureCardsSection content={content} />
      <VideoSection content={content} mobile />
      <PatronageSection content={content} mobile />
      <MobileFooter content={content} />
    </div>
  );
}

export function DesktopHomePage({ content, onOpenAuth }: HomePageProps) {
  return (
    <div className="hidden overflow-x-hidden bg-[var(--wedoo-page-bg)] pb-12 min-[1024px]:block" data-home-layout="desktop">
      <DesktopHeader navigation={content.navigation} onOpenAuth={onOpenAuth} />
      <main className="pb-2">
        <DesktopHeroSection content={content} />
        <ImpactStatementSection content={content} />
        <FeatureCardsSection content={content} />
        <VideoSection content={content} />
        <PatronageSection content={content} />
      </main>
      <DesktopFooter content={content} />
    </div>
  );
}

export function HomeAuthDialog({
  intent,
  navigation,
  onClose,
}: {
  intent: HomeAuthIntent | null;
  navigation: PublicHomeNavigationCopy;
  onClose: () => void;
}) {
  const title = useMemo(() => {
    if (intent === "login") {
      return "Accedi a Wedoo";
    }

    if (intent === "signup") {
      return "Crea il tuo profilo Wedoo";
    }

    return null;
  }, [intent]);

  if (!title) {
    return null;
  }

  const titleId = `home-auth-dialog-title-${intent}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="w-full max-w-[28rem] rounded-[1.75rem] border border-[var(--wedoo-border-strong)]/10 bg-[var(--wedoo-page-bg)] p-6 text-[var(--wedoo-ink)] shadow-[var(--wedoo-shadow-hero)]"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="font-wedoo-heading text-[1.875rem] leading-none" id={titleId}>
              {title}
            </h2>
            <p className="mt-3 max-w-[24rem] text-[1rem] leading-[1.45] text-[var(--wedoo-muted-ink)]">
              {navigation.authDialogDescription}
            </p>
          </div>

          <button
            aria-label="Chiudi"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--wedoo-muted-border)] text-[1.75rem] leading-none text-[var(--wedoo-ink)] transition hover:bg-black/5"
            onClick={onClose}
            type="button"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div className="mt-6 grid gap-3">
          <HomeRouteButton
            className="h-[52px] justify-center rounded-[10px] text-[1.2rem] leading-none hover:-translate-y-0"
            to="/accedi"
            variant={intent === "login" ? "authPrimary" : "authSecondary"}
          >
            {navigation.signInLabel}
          </HomeRouteButton>
          <HomeRouteButton
            className="h-[52px] justify-center rounded-[10px] text-[1.2rem] leading-none hover:-translate-y-0"
            to="/registrati"
            variant={intent === "signup" ? "authPrimary" : "authSecondary"}
          >
            {navigation.signUpLabel}
          </HomeRouteButton>
        </div>
      </div>
    </div>
  );
}
