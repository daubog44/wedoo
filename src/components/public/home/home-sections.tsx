import { Link } from "react-router-dom";
import { documents, routeMap } from "../../../data/core";
import type {
  PublicHomeContent,
  PublicHomeFeatureCard,
  PublicHomeNavigationCopy,
} from "../../../data/mocks/public-home";
import { AppIcon } from "../../../lib/icons";
import { assetPath, cn, documentPath } from "../../../lib/site-utils";
import { SiteIcon } from "../../site";
import {
  HomeRouteButton,
  SdgRibbon,
} from "./home-primitives";
import { HomeDownloadAppButton } from "./home-download-app-button";
import { homeFeatureToneStyles } from "./home-constants";
import { HomeAuthButtonGroup } from "./home-auth-button-group";
import { HomeCandidateRoleButton } from "./home-candidate-role-button";
import { HomeCompanyRoleButton } from "./home-company-role-button";
import { HomeDiscoverGoldButton } from "./home-discover-gold-button";
import { HomeDiscoverRoseButton } from "./home-discover-rose-button";
import { HomeDiscoverVioletButton } from "./home-discover-violet-button";

const mobileFrameClassName =
  "relative mx-auto h-full w-full max-w-[360px] sm:max-w-[420px] md:max-w-[520px]";
const desktopFrameClassName = "relative mx-auto h-full w-full max-w-[1440px]";

export type HomeAuthIntent = "login" | "signup";

type HomePageProps = {
  content: PublicHomeContent;
  onOpenAuth: (intent: HomeAuthIntent) => void;
};

type DesktopFeatureCardLayout = {
  displayTitle?: string;
  frameHeight: number;
  frameLeft: number;
  image: string;
};

const desktopFeatureCardLayouts: readonly DesktopFeatureCardLayout[] = [
  {
    frameHeight: 446,
    frameLeft: 40,
    image: "Rectangle-83@2x.png",
  },
  {
    frameHeight: 446,
    frameLeft: 506,
    image: "Rectangle-87@2x.png",
  },
  {
    displayTitle: "dubbi?\nle FAQ ti aiutano",
    frameHeight: 451,
    frameLeft: 972,
    image: "Rectangle-89@2x.png",
  },
] as const;

const pct = (value: number, base: number) => `${(value / base) * 100}%`;
const desktopPct = (value: number) => pct(value, 1440);

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
        mobile ? "h-[25px] w-[50px] gap-1 px-2 text-[12px]" : "h-8 w-[57px] gap-2 px-3 text-[16px]",
      )}
      type="button"
    >
      <span className="font-sans leading-none">{label}</span>
      <SiteIcon className={mobile ? "h-3 w-3" : "h-4 w-4"} name="chevron-down" />
    </button>
  );
}

function LegalLinks({ small = false }: { small?: boolean }) {
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
          {index < documents.length - 1 ? (small ? " | " : "  |  ") : ""}
        </span>
      ))}
    </>
  );
}

function DesktopFeatureCard({
  card,
  layout,
}: {
  card: PublicHomeFeatureCard;
  layout: DesktopFeatureCardLayout;
}) {
  const toneStyle = homeFeatureToneStyles[card.tone];
  const discoverLabel = "scopri";

  return (
    <article
      className={cn(
        "absolute top-5 rounded-[25px] border-[5px] bg-[var(--wedoo-page-bg)]",
        toneStyle.borderClassName,
      )}
      style={{
        height: layout.frameHeight,
        left: desktopPct(layout.frameLeft),
        width: desktopPct(429),
      }}
    >
      <img
        alt={card.title}
        className="absolute left-[5px] top-[5px] h-[262px] rounded-t-[20px] object-cover"
        style={{ width: "calc(100% - 10px)" }}
        src={assetPath(layout.image)}
      />

      <div className="absolute inset-x-0 top-[296px] flex flex-col items-center px-6 text-center xl:px-8">
        <h4 className="font-wedoo-accent whitespace-pre-line text-[clamp(1.125rem,1.666vw,1.5rem)] leading-[1.15] text-[var(--wedoo-ink-strong)]">
          {layout.displayTitle ?? card.title}
        </h4>

        <div className="mt-9">
          {card.tone === "gold" ? (
            <HomeDiscoverGoldButton
              className="h-[57px] w-[181px] min-w-0 gap-[15.5px] rounded-[8px] px-0 pl-[43.5px] pr-6 text-[24px] leading-[normal] hover:-translate-y-0"
              label={discoverLabel}
              to={card.href}
            />
          ) : card.tone === "rose" ? (
            <HomeDiscoverRoseButton
              className="h-[57px] w-[181px] min-w-0 gap-[15.5px] rounded-[8px] px-0 pl-[43.5px] pr-6 text-[24px] leading-[normal] hover:-translate-y-0"
              label={discoverLabel}
              to={card.href}
            />
          ) : card.tone === "violet" ? (
            <HomeDiscoverVioletButton
              className="h-[57px] w-[181px] min-w-0 gap-[15.5px] rounded-[8px] px-0 pl-[43.5px] pr-6 text-[24px] leading-[normal] hover:-translate-y-0"
              label={discoverLabel}
              to={card.href}
            />
          ) : (
            <HomeRouteButton
              className="h-[57px] w-[181px] min-w-0 gap-[15.5px] rounded-[8px] px-0 pl-[43.5px] pr-6 text-[24px] leading-[normal] hover:-translate-y-0"
              icon="arrow-right-line"
              to={card.href}
              variant={toneStyle.buttonVariant}
            >
              {discoverLabel}
            </HomeRouteButton>
          )}
        </div>
      </div>
    </article>
  );
}

function MobileFeatureCard({ card }: { card: PublicHomeFeatureCard }) {
  const toneStyle = homeFeatureToneStyles[card.tone];
  const discoverLabel = "scopri";

  return (
    <article
      className={cn(
        "mx-auto h-[324px] w-[90%] max-w-[324px] rounded-[25px] border-[5px] bg-[var(--wedoo-page-bg)] sm:max-w-[352px]",
        toneStyle.borderClassName,
      )}
    >
      <img
        alt={card.title}
        className="mx-auto mt-[5px] h-[155px] w-[96.914%] rounded-t-[20px] object-cover"
        src={assetPath(card.image)}
      />

      <div className="px-4 pt-[28px] text-center">
        <h4 className="font-wedoo-accent whitespace-pre-line text-[24px] leading-[normal] text-[var(--wedoo-ink-strong)]">
          {card.title === "dubbi? le FAQ ti aiutano" ? "dubbi?\nle FAQ ti aiutano" : card.title}
        </h4>

        <div className="mt-[22px] flex justify-center">
          {card.tone === "gold" ? (
            <HomeDiscoverGoldButton
              className="h-[49px] w-[159px] min-w-0 gap-[20px] rounded-[8px] px-0 pl-[28.5px] pr-3 text-[24px] leading-[normal] hover:-translate-y-0"
              label={discoverLabel}
              to={card.href}
            />
          ) : card.tone === "rose" ? (
            <HomeDiscoverRoseButton
              className="h-[49px] w-[159px] min-w-0 gap-[20px] rounded-[8px] px-0 pl-[28.5px] pr-3 text-[24px] leading-[normal] hover:-translate-y-0"
              label={discoverLabel}
              to={card.href}
            />
          ) : card.tone === "violet" ? (
            <HomeDiscoverVioletButton
              className="h-[49px] w-[159px] min-w-0 gap-[20px] rounded-[8px] px-0 pl-[28.5px] pr-3 text-[24px] leading-[normal] hover:-translate-y-0"
              label={discoverLabel}
              to={card.href}
            />
          ) : (
            <HomeRouteButton
              className="h-[49px] w-[159px] min-w-0 gap-[20px] rounded-[8px] px-0 pl-[28.5px] pr-3 text-[24px] leading-[normal] hover:-translate-y-0"
              icon="arrow-right-line"
              to={card.href}
              variant={toneStyle.buttonVariant}
            >
              {discoverLabel}
            </HomeRouteButton>
          )}
        </div>
      </div>
    </article>
  );
}

function DesktopTopBar({
  navigation,
  onOpenAuth,
}: {
  navigation: PublicHomeNavigationCopy;
  onOpenAuth: (intent: HomeAuthIntent) => void;
}) {
  return (
    <header className="w-full overflow-hidden">
      <div className="mx-auto flex h-[112px] w-full max-w-[1440px] items-start justify-between gap-4 px-6 pt-5 xl:px-10">
        <Link className="shrink-0" to="/">
          <img
            alt="Wedoo"
            className="h-[72px] w-[154px] object-contain xl:h-[92px] xl:w-[197px]"
            src={assetPath("Frame-1@2x.png")}
          />
        </Link>

        <div className="flex min-w-0 items-center justify-end gap-4 pt-[22px] xl:gap-6">
          <div className="w-full min-w-[15rem] max-w-[287px]">
            <HomeAuthButtonGroup
              className="gap-3 xl:gap-4"
              navigation={navigation}
              onOpenAuth={onOpenAuth}
            />
          </div>
          <HomeRouteButton
            className="h-auto min-w-0 justify-center px-0 text-center text-[20px] leading-[normal] text-[var(--wedoo-ink)] hover:-translate-y-0 xl:text-[24px]"
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

function DesktopHeroSection({ content }: { content: PublicHomeContent }) {
  const desktopHeroSubtitleLines = content.hero.subtitle.split("\n");

  return (
    <section className="relative h-[761px] w-full overflow-hidden">
      <div className="absolute left-0 right-0 top-[439px] h-[322px] bg-[var(--wedoo-violet-panel)]" />

      <div className={desktopFrameClassName}>
        <img
          alt=""
          aria-hidden="true"
          className="absolute top-[25px] h-[34px] object-cover"
          style={{ left: desktopPct(384), width: desktopPct(1056) }}
          src={assetPath("The-future-forward-1-1@2x.png")}
        />

        <h1
          className="font-wedoo-heading absolute text-center text-[clamp(2rem,3.333vw,3rem)] text-[var(--wedoo-ink)]"
          style={{
            left: desktopPct(220),
            lineHeight: "normal",
            top: 82,
            width: desktopPct(1000),
          }}
        >
          {content.hero.title}
        </h1>

        <div
          className="font-wedoo-accent absolute text-center text-[clamp(1.5rem,2.5vw,2.25rem)] text-[var(--wedoo-ink)]"
          style={{
            left: desktopPct(220),
            lineHeight: "normal",
            top: 163,
            width: desktopPct(1000),
          }}
        >
          {desktopHeroSubtitleLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div
          className="absolute top-[268px] flex justify-center"
          style={{ left: desktopPct(627), width: desktopPct(186) }}
        >
          <HomeDownloadAppButton
            className="h-[49px] w-full min-w-0 justify-start gap-[7px] whitespace-nowrap rounded-[8px] border-[var(--wedoo-ink)] px-0 pl-[7px] pr-[9px] text-[24px] leading-[normal] hover:-translate-y-0"
            label={content.hero.downloadLabel}
          />
        </div>

        <img
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-[338px] h-[33px] object-cover"
          style={{ width: desktopPct(1056) }}
          src={assetPath("The-future-forward-1-2@2x.png")}
        />

        <h2
          className="font-wedoo-heading absolute text-center text-[clamp(2rem,2.5vw,2.25rem)] font-normal text-[var(--wedoo-ink-strong)]"
          style={{
            left: desktopPct(174),
            lineHeight: "normal",
            top: 393,
            width: desktopPct(1093),
          }}
        >
          {content.howItWorks.title}
        </h2>

        <p
          className="font-wedoo-accent absolute text-center text-[clamp(1.125rem,1.666vw,1.5rem)] text-[var(--wedoo-white-soft)]"
          style={{
            left: desktopPct(602),
            lineHeight: "normal",
            top: 450,
            width: desktopPct(237),
          }}
        >
          {content.howItWorks.eyebrow}
        </p>

        <p
          className="font-wedoo-accent absolute text-center text-[clamp(1rem,1.666vw,1.5rem)] text-[var(--wedoo-white-soft)]"
          style={{
            left: desktopPct(265),
            lineHeight: "normal",
            top: 509,
            width: desktopPct(911),
          }}
        >
          {content.howItWorks.desktopDescription}
        </p>

        <div
          className="absolute top-[617px] flex justify-center"
          style={{ left: desktopPct(426), width: desktopPct(189) }}
        >
          <HomeCandidateRoleButton
            className="h-[60px] w-full min-w-0 rounded-[8px] text-[24px] leading-[normal] hover:-translate-y-0"
            label={content.howItWorks.candidateLabel}
          />
        </div>

        <div
          className="absolute top-[617px] flex justify-center"
          style={{ left: desktopPct(824), width: desktopPct(189) }}
        >
          <HomeCompanyRoleButton
            className="h-[60px] w-full min-w-0 rounded-[8px] text-[24px] leading-[normal] hover:-translate-y-0"
            label={content.howItWorks.companyLabel}
          />
        </div>
      </div>
    </section>
  );
}

function DesktopImpactSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="relative h-[181px] w-full">
      <div className={desktopFrameClassName}>
        <p
          className="font-wedoo-accent absolute text-center text-[clamp(1.625rem,2.5vw,2.25rem)] text-[var(--wedoo-ink)]"
          style={{
            left: desktopPct(73),
            lineHeight: "normal",
            top: 39,
            width: desktopPct(1295),
          }}
        >
          {content.impactStatement.desktop}
        </p>
      </div>
    </section>
  );
}

function DesktopFeatureSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="relative h-[471px] w-full">
      <div className={desktopFrameClassName}>
        {content.featureCards.map((card, index) => (
          <DesktopFeatureCard
            card={card}
            key={card.id}
            layout={desktopFeatureCardLayouts[index]}
          />
        ))}
      </div>
    </section>
  );
}

function DesktopVideoSection({ content }: { content: PublicHomeContent }) {
  const highlightedVideoTitle = content.video.title.endsWith(" click")
    ? {
        prefix: content.video.title.slice(0, -6),
        suffix: "click",
      }
    : null;

  return (
    <section className="relative h-[760px] w-full">
      <div className={desktopFrameClassName}>
        <div
          className="absolute top-[53px] rounded-[50px] bg-[var(--wedoo-violet-panel)]"
          style={{ height: 600, left: desktopPct(474), width: desktopPct(900) }}
        />

        <h2
          className="font-wedoo-heading absolute text-center text-[clamp(1.75rem,2.5vw,2.25rem)] font-normal text-[var(--wedoo-ink-strong)]"
          style={{
            left: desktopPct(112),
            lineHeight: "normal",
            top: 107,
            width: desktopPct(441),
          }}
        >
          {highlightedVideoTitle ? (
            <>
              {highlightedVideoTitle.prefix}
              {" "}
              <span className="text-[var(--wedoo-white-soft)]">
                {highlightedVideoTitle.suffix}
              </span>
            </>
          ) : (
            content.video.title
          )}
        </h2>

        <div
          className="absolute top-[200px] overflow-hidden rounded-[50px] shadow-[var(--wedoo-shadow-hero)]"
          style={{ left: desktopPct(437), width: desktopPct(800) }}
        >
          <img
            alt={content.video.previewAlt}
            className="h-[500px] w-full object-cover"
            src={assetPath("Rectangle-28@2x.png")}
          />
        </div>
      </div>
    </section>
  );
}

function DesktopPatronageSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="relative h-[520px] w-full">
      <div className={desktopFrameClassName}>
        <div
          className="absolute top-0 rounded-[20px] border border-[var(--wedoo-border-strong)]"
          style={{ height: 452, left: desktopPct(48), width: desktopPct(1344) }}
        />

        <h2
          className="font-wedoo-heading absolute text-center text-[clamp(1.75rem,2.5vw,2.25rem)] font-normal uppercase text-[var(--wedoo-ink-strong)]"
          style={{
            left: desktopPct(243),
            lineHeight: "normal",
            top: 50,
            width: desktopPct(953),
          }}
        >
          {content.patronage.title}
        </h2>

        <div
          className="absolute top-[154px] flex justify-center"
          style={{ left: desktopPct(146), width: desktopPct(1148) }}
        >
          <img
            alt={content.patronage.imageAlt}
            className="max-h-[188px] w-full object-contain"
            src={assetPath(content.patronage.image)}
          />
        </div>
      </div>
    </section>
  );
}

function DesktopFooter({ content }: { content: PublicHomeContent }) {
  return (
    <footer className="relative h-[268px] w-full bg-[var(--wedoo-violet-deep)] text-[var(--wedoo-white-soft)]">
      <div className={desktopFrameClassName}>
        <Link className="absolute left-[71px] top-[65px]" to="/">
          <img
            alt="Wedoo"
            className="h-[161px] w-[345px] object-contain"
            src={assetPath("Frame-2@2x.png")}
          />
        </Link>

        <div
          className="font-wedoo-body absolute top-[77px] flex flex-col items-center text-center text-[15px]"
          style={{ left: 463, width: 514 }}
        >
          <p style={{ lineHeight: "normal" }}>&copy; {content.footer.rightsLine}</p>
          <p className="mt-6 italic" style={{ lineHeight: "normal" }}>
            {content.footer.projectStatus}
          </p>
          <p className="mt-6" style={{ lineHeight: "normal" }}>
            {content.footer.contactLabel}: {content.footer.contactEmail}
          </p>
          <p className="mt-6 whitespace-nowrap" style={{ lineHeight: "normal" }}>
            <LegalLinks />
          </p>
          {content.footer.disclaimers.map((line) => (
            <p className="mt-6 italic" key={line} style={{ lineHeight: "normal" }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}

function MobileTopSection({
  content,
  onOpenAuth,
}: HomePageProps) {
  const mobileHeroSubtitleLines = content.hero.subtitle.split("\n");

  return (
    <section className="relative h-[469px] w-full">
      <div className={mobileFrameClassName}>
        <Link className="absolute top-[11px]" style={{ left: pct(37, 360) }} to="/">
          <img
            alt="Wedoo"
            className="h-[58px] w-[109px] object-contain"
            src={assetPath("scritta-wedoo.png")}
          />
        </Link>

        <div className="absolute top-[29px]" style={{ left: pct(299, 360) }}>
          <LanguageChipCompact label={content.navigation.languageLabel} mobile />
        </div>

        <div
          className="absolute top-[69px]"
          style={{ left: pct(37, 360), width: pct(287, 360) }}
        >
          <HomeAuthButtonGroup navigation={content.navigation} onOpenAuth={onOpenAuth} />
        </div>

        <div
          className="absolute top-[131px] flex justify-center"
          style={{ left: pct(91, 360), width: pct(178, 360) }}
        >
          <HomeRouteButton
            className="h-auto min-w-0 justify-center px-0 text-center text-[24px] leading-[normal] text-[var(--wedoo-ink)] hover:-translate-y-0"
            to={routeMap.company.showcase}
            variant="textLink"
          >
            {content.navigation.companyPrompt}
          </HomeRouteButton>
        </div>

        <div className="absolute top-[168px]" style={{ left: pct(77, 360), width: pct(283, 360) }}>
          <SdgRibbon />
        </div>

        <h1
          className="font-wedoo-heading absolute text-center text-[28px] text-[var(--wedoo-ink)]"
          style={{
            left: pct(11, 360),
            lineHeight: "normal",
            top: 187,
            width: pct(338, 360),
          }}
        >
          {content.hero.title}
        </h1>

        <div
          className="font-wedoo-accent absolute text-center text-[24px] text-[var(--wedoo-ink)]"
          style={{
            left: pct(25, 360),
            lineHeight: "normal",
            top: 272,
            width: pct(311, 360),
          }}
        >
          {mobileHeroSubtitleLines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>

        <div className="absolute top-[390px]" style={{ left: pct(87, 360) }}>
          <HomeDownloadAppButton
            className="h-[49px] w-[186px] min-w-0 justify-start gap-[7px] whitespace-nowrap rounded-[8px] border-[var(--wedoo-ink)] px-0 pl-[7px] pr-[9px] text-[24px] leading-[normal] hover:-translate-y-0"
            label={content.hero.downloadLabel}
          />
        </div>

        <div className="absolute top-[450px]" style={{ left: 0, width: pct(283, 360) }}>
          <SdgRibbon reverse />
        </div>
      </div>
    </section>
  );
}

function MobileHowItWorksSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="relative h-[365px] w-full bg-[var(--wedoo-violet-panel)]">
      <div className={mobileFrameClassName}>
        <h2
          className="font-wedoo-heading absolute text-center text-[24px] leading-[1.15] text-[var(--wedoo-white-soft)]"
          style={{
            left: pct(20, 360),
            top: 20,
            width: pct(320, 360),
          }}
        >
          {content.howItWorks.mobileTitle}
        </h2>

        <p
          className="font-wedoo-accent absolute text-center text-[18px] text-[var(--wedoo-white-soft)]"
          style={{
            left: pct(72, 360),
            lineHeight: "normal",
            top: 110,
            width: pct(216, 360),
          }}
        >
          {content.howItWorks.eyebrow}
        </p>

        <p
          className="font-wedoo-accent absolute text-center text-[18px] text-[var(--wedoo-white-soft)]"
          style={{
            left: pct(21, 360),
            lineHeight: "normal",
            top: 146,
            width: pct(318, 360),
          }}
        >
          {content.howItWorks.mobileDescription}
        </p>

        <div className="absolute top-[239px]" style={{ left: pct(92, 360) }}>
          <HomeCandidateRoleButton
            className="h-[52px] w-[176px] min-w-0 rounded-[8px] px-0 text-[24px] leading-[normal] hover:-translate-y-0"
            label={content.howItWorks.candidateLabel}
          />
        </div>

        <div className="absolute top-[307px]" style={{ left: pct(92, 360) }}>
          <HomeCompanyRoleButton
            className="h-[52px] w-[176px] min-w-0 rounded-[8px] px-0 text-[24px] leading-[normal] hover:-translate-y-0"
            label={content.howItWorks.companyLabel}
          />
        </div>
      </div>
    </section>
  );
}

function MobileImpactSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="relative h-[160px] w-full">
      <div className={mobileFrameClassName}>
        <p
          className="font-wedoo-accent absolute text-center text-[22px] text-[var(--wedoo-ink)]"
          style={{
            left: pct(9, 360),
            lineHeight: "normal",
            top: 24,
            width: pct(340, 360),
          }}
        >
          {content.impactStatement.mobile}
        </p>
      </div>
    </section>
  );
}

function MobileFeatureSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="w-full pb-[26px]">
      <div className={mobileFrameClassName}>
        <div className="space-y-5">
          {content.featureCards.map((card) => (
            <MobileFeatureCard card={card} key={card.id} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MobileVideoSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="relative h-[403px] w-full">
      <div className={mobileFrameClassName}>
        <h4
          className="font-wedoo-accent absolute text-center text-[36px] text-[var(--wedoo-ink-strong)]"
          style={{
            left: pct(20, 360),
            lineHeight: "normal",
            top: 26,
            width: pct(317, 360),
          }}
        >
          {content.video.title}
        </h4>

        <div
          className="absolute top-[122px] rounded-[50px] bg-[var(--wedoo-violet-panel)]"
          style={{ height: 211, left: pct(9, 360), width: pct(319, 360) }}
        />

        <div
          className="absolute top-[142px] overflow-hidden rounded-[50px]"
          style={{ height: 211, left: pct(29, 360), width: pct(319, 360) }}
        >
          <img
            alt={content.video.previewAlt}
            className="h-full w-full object-cover"
            src={assetPath(content.video.previewImage)}
          />
        </div>

        <div
          className="absolute flex items-center justify-center"
          style={{ height: 107, left: pct(135, 360), top: 194, width: pct(107, 360) }}
        >
          <AppIcon className="h-[107px] w-[107px] text-[var(--wedoo-ink)]" name="play-circle-line" />
        </div>
      </div>
    </section>
  );
}

function MobilePatronageSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="relative h-[520px] w-full">
      <div className={mobileFrameClassName}>
        <div
          className="absolute top-0 rounded-[20px] border border-[var(--wedoo-border-strong)]"
          style={{ height: 502, left: pct(29, 360), width: pct(299, 360) }}
        />

        <h4
          className="font-sans absolute text-center text-[20px] font-medium uppercase text-[var(--wedoo-ink-strong)]"
          style={{
            left: pct(55, 360),
            lineHeight: "normal",
            top: 26,
            width: pct(247, 360),
          }}
        >
          {content.patronage.title}
        </h4>

        <div
          className="absolute flex justify-center"
          style={{ left: pct(44, 360), top: 110, width: pct(269, 360) }}
        >
          <img
            alt={content.patronage.imageAlt}
            className="max-h-[180px] w-full object-contain"
            src={assetPath(content.patronage.image)}
          />
        </div>
      </div>
    </section>
  );
}

function MobileFooter({ content }: { content: PublicHomeContent }) {
  return (
    <footer className="relative h-[231px] w-full bg-[var(--wedoo-violet-deep)] text-[var(--wedoo-white-soft)]">
      <div className={mobileFrameClassName}>
        <Link className="absolute top-[11px]" style={{ left: pct(12, 360) }} to="/">
          <img
            alt="Wedoo"
            className="h-[44px] w-[109px] object-contain"
            src={assetPath("scritta-wedoo.png")}
          />
        </Link>

        <div
          className="absolute top-[63px] text-center text-[10px]"
          style={{ left: pct(15, 360), width: pct(334, 360) }}
        >
          <p style={{ lineHeight: "normal" }}>&copy; {content.footer.rightsLine}</p>
          <p className="mt-4 italic" style={{ lineHeight: "normal" }}>
            {content.footer.projectStatus}
          </p>
          <p className="mt-4" style={{ lineHeight: "normal" }}>
            {content.footer.contactLabel}: {content.footer.contactEmail}
          </p>
          <p className="mt-4" style={{ lineHeight: "normal" }}>
            <LegalLinks small />
          </p>
          {content.footer.disclaimers.map((line) => (
            <p className="mt-4 italic" key={line} style={{ lineHeight: "normal" }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function MobileHomePage({ content, onOpenAuth }: HomePageProps) {
  return (
    <div className="block overflow-x-hidden bg-[var(--wedoo-page-bg)] min-[1024px]:hidden">
      <MobileTopSection content={content} onOpenAuth={onOpenAuth} />
      <MobileHowItWorksSection content={content} />
      <MobileImpactSection content={content} />
      <MobileFeatureSection content={content} />
      <MobileVideoSection content={content} />
      <MobilePatronageSection content={content} />
      <MobileFooter content={content} />
    </div>
  );
}

export function DesktopHomePage({ content, onOpenAuth }: HomePageProps) {
  return (
    <div className="hidden w-full overflow-x-hidden bg-[var(--wedoo-page-bg)] min-[1024px]:block">
      <DesktopTopBar navigation={content.navigation} onOpenAuth={onOpenAuth} />
      <main>
        <DesktopHeroSection content={content} />
        <DesktopImpactSection content={content} />
        <DesktopFeatureSection content={content} />
        <DesktopVideoSection content={content} />
        <DesktopPatronageSection content={content} />
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
  if (!intent) {
    return null;
  }

  const title =
    intent === "login" ? "Accedi a Wedoo" : "Crea il tuo profilo Wedoo";
  const titleId = `home-auth-dialog-title-${intent}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
    >
      <div
        aria-labelledby={titleId}
        aria-modal="true"
        className="w-full max-w-[28rem] rounded-[1.5rem] border border-[var(--wedoo-border-strong)] bg-[var(--wedoo-page-bg)] p-6 text-[var(--wedoo-ink)] shadow-[var(--wedoo-shadow-hero)]"
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
            ×
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
