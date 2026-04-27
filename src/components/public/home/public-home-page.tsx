import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type {
  PublicHomeContent,
  PublicHomeFeatureCard,
} from "../../../data/mocks/public-home";
import { routeMap } from "../../../data/core";
import { assetPath, cn } from "../../../lib/site-utils";
import { PublicNavbar, SiteFooter, SiteIcon } from "../../site";
import { ButtonLink } from "../../ui";

type HomeAuthIntent = "sign-in" | "sign-up" | null;

const featureToneClasses: Record<PublicHomeFeatureCard["tone"], string> = {
  gold: "text-[var(--wedoo-gold-700)]",
  rose: "text-[var(--wedoo-rose-700)]",
  violet: "text-[var(--wedoo-violet)]",
};

function HomeAuthDialog({
  description,
  intent,
  onClose,
  signInLabel,
  signUpLabel,
}: {
  description: string;
  intent: HomeAuthIntent;
  onClose: () => void;
  signInLabel: string;
  signUpLabel: string;
}) {
  const open = Boolean(intent);
  const title = intent === "sign-up" ? "Crea il tuo profilo Wedoo" : "Accedi a Wedoo";

  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-[rgba(9,17,31,0.58)] px-4 transition",
        open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        aria-modal="true"
        className="wedoo-workspace relative w-full max-w-[34rem] overflow-hidden rounded-[1.8rem] p-6 text-[var(--wedoo-workspace-text)] shadow-[0_40px_120px_-70px_rgba(4,10,20,0.94)] md:p-8"
        role="dialog"
      >
        <div className="spot-orb -right-6 top-0 h-44 w-44 bg-[rgba(112,72,232,0.18)]" />
        <div className="relative z-10">
          <div className="flex items-start justify-between gap-4">
            <div className="wedoo-section-stack">
              <span className="wedoo-kicker bg-white/8 text-[var(--wedoo-mint)]">auth</span>
              <h2 className="wedoo-workspace-title">{title}</h2>
              <p className="wedoo-reading-copy-compact max-w-[26rem] text-[var(--wedoo-workspace-muted)]">
                {description}
              </p>
            </div>
            <button
              aria-label="Chiudi"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 text-[var(--wedoo-workspace-muted)] transition hover:border-white/32 hover:text-[var(--wedoo-workspace-text)]"
              onClick={onClose}
              type="button"
            >
              <SiteIcon className="h-5 w-5" name="close" />
            </button>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <ButtonLink className="w-full" to="/accedi" tone="ghost">
              {signInLabel}
            </ButtonLink>
            <ButtonLink className="w-full" to="/registrati" tone="violet">
              {signUpLabel}
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeFeatureTile({ feature }: { feature: PublicHomeFeatureCard }) {
  const isInformationalImage = feature.image === "obiettivi.jpg";

  return (
    <article className="group wedoo-theme-shell wedoo-feature-link-card wedoo-depth-card relative flex h-full flex-col overflow-hidden rounded-[1.45rem] p-0">
      <Link aria-label="scopri" className="absolute inset-0 z-10" to={feature.href}>
        <span className="sr-only">scopri</span>
      </Link>
      <div className="overflow-hidden">
        <img
          alt={feature.title}
          className={cn(
            "aspect-[1.08/1] w-full transition duration-300 group-hover:scale-[1.02]",
            isInformationalImage
              ? "bg-[var(--wedoo-white-soft)] object-contain p-4"
              : "object-cover",
          )}
          src={assetPath(feature.image)}
        />
      </div>
      <div className="wedoo-section-stack px-5 py-5">
        <h3 className="text-[2rem] leading-[1.08] text-[var(--wedoo-ink-strong)]">{feature.title}</h3>
        <div
          className={cn(
            "inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] transition group-hover:translate-x-0.5",
            featureToneClasses[feature.tone],
          )}
        >
          <span>scopri</span>
          <SiteIcon className="h-4 w-4" name="arrow-right" />
        </div>
      </div>
    </article>
  );
}

export function PublicHomePage({ content }: { content: PublicHomeContent }) {
  const [authIntent, setAuthIntent] = useState<HomeAuthIntent>(null);

  useEffect(() => {
    if (!authIntent) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [authIntent]);

  return (
    <>
      <main className="min-h-screen pb-6 text-[var(--wedoo-ink)]">
        <PublicNavbar onSignInClick={() => setAuthIntent("sign-in")} onSignUpClick={() => setAuthIntent("sign-up")} />

        <section className="px-4 pt-4 md:px-8 md:pt-5">
          <div className="mx-auto max-w-[1360px]">
            <section className="wedoo-home-hero-shell mt-5 overflow-hidden">
              <div className="grid gap-3 lg:grid-cols-[0.58fr_0.42fr]">
                <div className="wedoo-home-hero-copy px-6 py-8 md:px-10 md:py-10 xl:px-12 xl:py-12">
                  <div className="spot-orb -left-8 top-0 h-40 w-40 bg-[rgba(87,215,180,0.14)]" />
                  <div className="spot-orb right-0 top-12 h-48 w-48 bg-[rgba(112,72,232,0.12)]" />

                  <div className="relative z-10">
                    <span className="wedoo-kicker wedoo-reveal">{content.howItWorks.eyebrow}</span>
                    <h1 className="wedoo-display wedoo-reveal wedoo-reveal-delay-1 mt-6 max-w-[42rem]">
                      {content.hero.title}
                    </h1>
                    <div className="wedoo-lead wedoo-reveal wedoo-reveal-delay-2 mt-9 max-w-[34rem] space-y-5">
                      {content.hero.subtitle.split("\n").map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>

                    <div className="wedoo-reveal wedoo-reveal-delay-3 mt-10 flex flex-wrap gap-3">
                      <a
                        className="wedoo-home-hero-action wedoo-home-hero-action-violet"
                        download="wedoo.webmanifest"
                        href="/manifest.webmanifest"
                      >
                        <SiteIcon className="h-5 w-5" name="download" />
                        {content.hero.downloadLabel}
                      </a>
                      <Link
                        className="wedoo-home-hero-action wedoo-home-hero-action-mint"
                        to={routeMap.candidate.showcase}
                      >
                        {content.howItWorks.candidateLabel}
                      </Link>
                      <Link
                        className="wedoo-home-hero-action wedoo-home-hero-action-violet"
                        to={routeMap.company.showcase}
                      >
                        {content.howItWorks.companyLabel}
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="wedoo-home-hero-preview wedoo-depth-card min-h-[32rem] px-6 py-8 md:px-8 md:py-10">
                  <img
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.5]"
                    src={assetPath(content.video.previewImage)}
                  />
                  <div className="wedoo-home-hero-media-overlay absolute inset-0" />
                  <div
                    className="spot-orb left-6 top-6 h-44 w-44"
                    style={{ background: "var(--wedoo-hero-orb)" }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-end gap-8">
                    <div
                      className="wedoo-home-hero-preview-copy wedoo-depth-card wedoo-reveal wedoo-reveal-delay-3 max-w-[25rem] space-y-5 px-5 py-5 md:px-6 md:py-6"
                      data-testid="home-hero-preview-copy"
                    >
                      <span className="wedoo-kicker bg-[var(--wedoo-ghost-bg)] text-[var(--wedoo-mint)]">
                        {content.video.title}
                      </span>
                      <p className="wedoo-reading-copy-compact max-w-[24rem] text-[var(--wedoo-workspace-muted)] md:text-lg">
                        {content.howItWorks.desktopDescription}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="wedoo-section-stack">
              <p className="wedoo-kicker">{content.howItWorks.eyebrow}</p>
              <h2 className="wedoo-section-title hidden md:block">
                {content.howItWorks.title}
              </h2>
              <h2 className="wedoo-section-title md:hidden">
                {content.howItWorks.mobileTitle}
              </h2>
              <p className="wedoo-reading-copy hidden max-w-[34rem] md:block">
                {content.howItWorks.desktopDescription}
              </p>
              <p className="wedoo-reading-copy max-w-[30rem] md:hidden">
                {content.howItWorks.mobileDescription}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="wedoo-theme-shell wedoo-depth-card flex min-h-[11rem] items-end rounded-[1.6rem] p-5 text-[1.55rem] leading-[1.05] text-[var(--wedoo-ink-strong)]">
                {content.howItWorks.candidateLabel}
              </article>
              <article className="wedoo-theme-shell wedoo-depth-card flex min-h-[11rem] items-end rounded-[1.6rem] p-5 text-[1.55rem] leading-[1.05] text-[var(--wedoo-ink-strong)]">
                {content.howItWorks.companyLabel}
              </article>
              <div className="wedoo-theme-shell rounded-[1.6rem] p-5 sm:col-span-2">
                <p className="wedoo-reading-copy text-[var(--wedoo-ink-muted)]">
                  {content.impactStatement.desktop}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="wedoo-workspace overflow-hidden rounded-[1.8rem] px-6 py-7 shadow-[0_36px_100px_-72px_rgba(4,10,20,0.9)] md:px-8 md:py-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="wedoo-section-stack">
                <p className="wedoo-kicker bg-white/8 text-[var(--wedoo-mint)]">{content.video.title}</p>
                <p className="wedoo-workspace-title max-w-[26rem] text-[var(--wedoo-workspace-text)]">
                  {content.howItWorks.mobileTitle}
                </p>
              </div>
              <p className="wedoo-reading-copy max-w-[42rem] text-[var(--wedoo-workspace-text)]">
                {content.impactStatement.mobile}
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="grid gap-5 md:grid-cols-3">
            {content.featureCards.map((feature) => (
              <HomeFeatureTile feature={feature} key={feature.id} />
            ))}
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="wedoo-section-stack">
              <p className="wedoo-kicker">{content.howItWorks.eyebrow}</p>
              <h2 className="wedoo-section-title">
                {content.video.title}
              </h2>
              <p className="wedoo-reading-copy max-w-[34rem]">
                {content.howItWorks.desktopDescription}
              </p>
            </div>

            <div className="wedoo-theme-shell wedoo-depth-card overflow-hidden rounded-[1.8rem] p-0">
              <img
                alt={content.video.previewAlt}
                className="aspect-[16/10] w-full object-cover"
                src={assetPath(content.video.previewImage)}
              />
            </div>
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="border-t border-[var(--wedoo-line)] py-8">
            <p className="wedoo-kicker">patronage</p>
            <h2 className="wedoo-section-title mt-5">
              {content.patronage.title}
            </h2>
          </div>
        </section>
      </main>

      <SiteFooter className="mt-0" />

      <HomeAuthDialog
        description={content.navigation.authDialogDescription}
        intent={authIntent}
        onClose={() => setAuthIntent(null)}
        signInLabel={content.navigation.signInLabel}
        signUpLabel={content.navigation.signUpLabel}
      />
    </>
  );
}
