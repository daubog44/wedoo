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
  HomeAnchorButton,
  HomeRouteButton,
  SdgRibbon,
} from "./home-primitives";
import { homeFeatureToneStyles } from "./home-constants";
import { HomeAuthButtonGroup } from "./home-auth-button-group";

const mobileFrameClassName = "relative mx-auto h-full w-full max-w-[360px]";
const desktopFrameClassName = "relative mx-auto w-[1440px]";

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

  return (
    <article
      className={cn(
        "absolute top-[50px] rounded-[25px] border-[5px] bg-[var(--wedoo-page-bg)]",
        toneStyle.borderClassName,
      )}
      style={{
        height: layout.frameHeight,
        left: layout.frameLeft,
        width: 429,
      }}
    >
      <img
        alt={card.title}
        className="absolute left-[5px] top-[5px] h-[262px] w-[419px] rounded-t-[20px] object-cover"
        src={assetPath(layout.image)}
      />

      <div className="absolute inset-x-0 top-[296px] flex flex-col items-center px-8 text-center">
        <h4 className="font-wedoo-accent whitespace-pre-line text-[24px] leading-[1.15] text-[var(--wedoo-ink-strong)]">
          {layout.displayTitle ?? card.title}
        </h4>

        <div className="mt-9">
          <HomeRouteButton
            className="h-[57px] w-[181px] min-w-0 gap-[15.5px] rounded-[8px] px-0 pl-[43.5px] pr-6 text-[24px] leading-[normal] hover:-translate-y-0"
            icon="arrow-right-line"
            to={card.href}
            variant={toneStyle.buttonVariant}
          >
            scopri
          </HomeRouteButton>
        </div>
      </div>
    </article>
  );
}

function MobileFeatureCard({ card }: { card: PublicHomeFeatureCard }) {
  const toneStyle = homeFeatureToneStyles[card.tone];

  return (
    <article
      className={cn(
        "mx-auto h-[324px] w-[90%] rounded-[25px] border-[5px] bg-[var(--wedoo-page-bg)]",
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
          <HomeRouteButton
            className="h-[49px] w-[159px] min-w-0 gap-[20px] rounded-[8px] px-0 pl-[28.5px] pr-3 text-[24px] leading-[normal] hover:-translate-y-0"
            icon="arrow-right-line"
            to={card.href}
            variant={toneStyle.buttonVariant}
          >
            scopri
          </HomeRouteButton>
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
    <header className="relative h-[112px] w-full overflow-hidden">
      <div className={desktopFrameClassName}>
        <Link className="absolute left-10 top-5" to="/">
          <img
            alt="Wedoo"
            className="h-[92px] w-[197px] object-contain"
            src={assetPath("Frame-1@2x.png")}
          />
        </Link>

        <div className="absolute left-[730px] top-[42px] w-[287px]">
          <HomeAuthButtonGroup navigation={navigation} onOpenAuth={onOpenAuth} />
        </div>

        <div
          className="absolute top-[52px] flex justify-center"
          style={{ left: 1042, width: 178 }}
        >
          <HomeRouteButton
            className="h-auto min-w-0 justify-center px-0 text-center text-[24px] leading-[normal] text-[var(--wedoo-ink)] hover:-translate-y-0"
            to={routeMap.company.showcase}
            variant="textLink"
          >
            {navigation.companyPrompt}
          </HomeRouteButton>
        </div>

        <div className="absolute left-[1311px] top-12">
          <LanguageChipCompact label={navigation.languageLabel} />
        </div>
      </div>
    </header>
  );
}

function DesktopHeroSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="relative h-[761px] w-full overflow-hidden">
      <div className="absolute left-0 right-0 top-[439px] h-[322px] bg-[var(--wedoo-violet-panel)]" />

      <div className={desktopFrameClassName}>
        <img
          alt=""
          aria-hidden="true"
          className="absolute left-[384px] top-[25px] h-[34px] w-[1056px] object-cover"
          src={assetPath("The-future-forward-1-1@2x.png")}
        />

        <h1
          className="font-wedoo-heading absolute text-center text-[48px] text-[var(--wedoo-ink)]"
          style={{
            left: 226,
            lineHeight: "normal",
            top: 82,
            width: 988,
          }}
        >
          {content.hero.title}
        </h1>

        <p
          className="font-wedoo-accent absolute whitespace-pre-line text-center text-[36px] text-[var(--wedoo-ink)]"
          style={{
            left: 220,
            lineHeight: "normal",
            top: 163,
            width: 1000,
          }}
        >
          {content.hero.subtitle}
        </p>

        <div className="absolute left-[627px] top-[268px]">
          <HomeAnchorButton
            className="h-[49px] w-[186px] min-w-0 justify-start gap-[7px] whitespace-nowrap rounded-[8px] border-[var(--wedoo-ink)] px-0 pl-[7px] pr-[9px] text-[24px] leading-[normal] hover:-translate-y-0"
            download="wedoo.webmanifest"
            href="/manifest.webmanifest"
            icon="smartphone-apps-line"
            iconPosition="start"
            variant="appPrimary"
          >
            {content.hero.downloadLabel}
          </HomeAnchorButton>
        </div>

        <img
          alt=""
          aria-hidden="true"
          className="absolute left-0 top-[338px] h-[33px] w-[1056px] object-cover"
          src={assetPath("The-future-forward-1-2@2x.png")}
        />

        <h2
          className="font-wedoo-heading absolute text-center text-[36px] font-normal text-[var(--wedoo-ink-strong)]"
          style={{
            left: 179,
            lineHeight: "normal",
            top: 393,
            width: 1083,
          }}
        >
          {content.howItWorks.title}
        </h2>

        <p
          className="font-wedoo-accent absolute text-center text-[24px] text-[var(--wedoo-white-soft)]"
          style={{
            left: 602,
            lineHeight: "normal",
            top: 450,
            width: 237,
          }}
        >
          {content.howItWorks.eyebrow}
        </p>

        <p
          className="font-wedoo-accent absolute text-center text-[24px] text-[var(--wedoo-white-soft)]"
          style={{
            left: 265,
            lineHeight: "normal",
            top: 509,
            width: 911,
          }}
        >
          {content.howItWorks.desktopDescription}
        </p>

        <div className="absolute left-[426px] top-[617px]">
          <HomeRouteButton
            className="h-[60px] w-[189px] min-w-0 rounded-[8px] text-[24px] leading-[normal] hover:-translate-y-0"
            to={routeMap.candidate.showcase}
            variant="roleCandidate"
          >
            {content.howItWorks.candidateLabel}
          </HomeRouteButton>
        </div>

        <div className="absolute left-[824px] top-[617px]">
          <HomeRouteButton
            className="h-[60px] w-[189px] min-w-0 rounded-[8px] text-[24px] leading-[normal] hover:-translate-y-0"
            to={routeMap.company.showcase}
            variant="roleCompany"
          >
            {content.howItWorks.companyLabel}
          </HomeRouteButton>
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
          className="font-wedoo-accent absolute text-center text-[36px] text-[var(--wedoo-ink)]"
          style={{
            left: 73,
            lineHeight: "normal",
            top: 23,
            width: 1295,
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
    <section className="relative h-[560px] w-full">
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
          style={{ height: 600, left: 474, width: 900 }}
        />

        <h2
          className="font-wedoo-heading absolute text-center text-[36px] font-normal text-[var(--wedoo-ink-strong)]"
          style={{
            left: 112,
            lineHeight: "normal",
            top: 107,
            width: 441,
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
          style={{ left: 437, width: 800 }}
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
          style={{ height: 452, left: 48, width: 1344 }}
        />

        <h2
          className="font-wedoo-heading absolute text-center text-[36px] font-normal uppercase text-[var(--wedoo-ink-strong)]"
          style={{
            left: 243,
            lineHeight: "normal",
            top: 50,
            width: 953,
          }}
        >
          {content.patronage.title}
        </h2>

        <div
          className="absolute top-[154px] flex justify-center"
          style={{ left: 146, width: 1148 }}
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

        <p
          className="font-wedoo-accent absolute whitespace-pre-line text-center text-[24px] text-[var(--wedoo-ink)]"
          style={{
            left: pct(25, 360),
            lineHeight: "normal",
            top: 272,
            width: pct(311, 360),
          }}
        >
          {content.hero.subtitle}
        </p>

        <div className="absolute top-[390px]" style={{ left: pct(87, 360) }}>
          <HomeAnchorButton
            className="h-[49px] w-[186px] min-w-0 justify-start gap-[7px] whitespace-nowrap rounded-[8px] border-[var(--wedoo-ink)] px-0 pl-[7px] pr-[9px] text-[24px] leading-[normal] hover:-translate-y-0"
            download="wedoo.webmanifest"
            href="/manifest.webmanifest"
            icon="smartphone-apps-line"
            iconPosition="start"
            variant="appPrimary"
          >
            {content.hero.downloadLabel}
          </HomeAnchorButton>
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
    <section className="h-[299px] w-full bg-[var(--wedoo-violet-panel)]">
      <div className={mobileFrameClassName}>
        <p
          className="font-wedoo-accent absolute text-center text-[24px] text-[var(--wedoo-white-soft)]"
          style={{
            left: pct(7, 360),
            lineHeight: "normal",
            top: 18,
            width: pct(346, 360),
          }}
        >
          {content.howItWorks.mobileTitle}
          <br />
          {content.howItWorks.mobileDescription}
        </p>

        <div className="absolute top-[152px]" style={{ left: pct(90, 360) }}>
          <HomeRouteButton
            className="h-[52px] w-[176px] min-w-0 rounded-[8px] px-0 text-[24px] leading-[normal] hover:-translate-y-0"
            to={routeMap.candidate.showcase}
            variant="roleCandidate"
          >
            {content.howItWorks.candidateLabel}
          </HomeRouteButton>
        </div>

        <div className="absolute top-[227px]" style={{ left: pct(90, 360) }}>
          <HomeRouteButton
            className="h-[52px] w-[176px] min-w-0 rounded-[8px] px-0 text-[24px] leading-[normal] hover:-translate-y-0"
            to={routeMap.company.showcase}
            variant="roleCompany"
          >
            {content.howItWorks.companyLabel}
          </HomeRouteButton>
        </div>
      </div>
    </section>
  );
}

function MobileImpactSection({ content }: { content: PublicHomeContent }) {
  return (
    <section className="relative h-[156px] w-full">
      <div className={mobileFrameClassName}>
        <p
          className="font-wedoo-body absolute text-center text-[22px] text-[var(--wedoo-ink)]"
          style={{
            left: pct(9, 360),
            lineHeight: "normal",
            top: 29,
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
    <div className="block overflow-x-hidden bg-[var(--wedoo-page-bg)] min-[1440px]:hidden">
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
    <div className="hidden w-full overflow-x-hidden bg-[var(--wedoo-page-bg)] min-[1440px]:block">
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
