import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type {
  PublicHomeContent,
  PublicHomeFeatureCard,
} from "../../../data/mocks/public-home";
import { routeMap } from "../../../data/core";
import { assetPath, cn } from "../../../lib/site-utils";
import { WedooThemeToggle } from "../../common/wedoo-theme-toggle";
import { SiteFooter, SiteIcon, WedooLogo } from "../../site";
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
            <div className="space-y-4">
              <span className="wedoo-kicker bg-white/8 text-[var(--wedoo-mint)]">auth</span>
              <h2 className="text-[2.5rem] leading-[0.92]">{title}</h2>
              <p className="max-w-[26rem] text-sm leading-7 text-[var(--wedoo-workspace-muted)]">
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

          <div className="mt-6 rounded-[1.2rem] border border-white/10 bg-white/4 px-4 py-4 text-sm leading-7 text-[var(--wedoo-workspace-muted)]">
            Un solo prodotto, due ingressi chiari: accesso diretto per chi ha gia un account e registrazione
            guidata per chi entra in Wedoo per la prima volta.
          </div>
        </div>
      </div>
    </div>
  );
}

function HomeFeatureTile({ feature }: { feature: PublicHomeFeatureCard }) {
  return (
    <article className="wedoo-theme-shell overflow-hidden rounded-[1.45rem] p-0">
      <div className="overflow-hidden">
        <img alt={feature.title} className="aspect-[1.08/1] w-full object-cover" src={assetPath(feature.image)} />
      </div>
      <div className="space-y-4 px-5 py-5">
        <h3 className="text-[2rem] leading-[0.94] text-[var(--wedoo-ink-strong)]">{feature.title}</h3>
        <Link className={cn("inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em]", featureToneClasses[feature.tone])} to={feature.href}>
          <span>scopri</span>
          <SiteIcon className="h-4 w-4" name="arrow-right" />
        </Link>
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
        <section className="px-4 pt-5 md:px-8 md:pt-6">
          <div className="mx-auto max-w-[1360px]">
            <div className="glass-panel flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
              <WedooLogo imageClassName="h-9 md:h-10" />

              <div
                aria-label="Azioni autenticazione home"
                className="flex flex-wrap items-center justify-end gap-3"
                role="group"
              >
                <WedooThemeToggle className="h-[46px] min-w-[6.9rem]" />
                <button
                  className="wedoo-theme-ghost-button inline-flex min-h-[46px] items-center justify-center rounded-full px-5 font-wedoo-accent text-sm font-medium tracking-[-0.02em] transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]"
                  onClick={() => setAuthIntent("sign-in")}
                  type="button"
                >
                  {content.navigation.signInLabel}
                </button>
                <button
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-transparent bg-[var(--wedoo-violet)] px-5 font-wedoo-accent text-sm font-medium tracking-[-0.02em] text-[var(--wedoo-white-soft)] shadow-[0_18px_40px_-28px_rgba(112,72,232,0.52)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]"
                  onClick={() => setAuthIntent("sign-up")}
                  type="button"
                >
                  {content.navigation.signUpLabel}
                </button>
                <a
                  className="wedoo-theme-ghost-button inline-flex min-h-[46px] items-center justify-center rounded-full px-5 text-sm transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]"
                  href={routeMap.company.showcase}
                >
                  {content.navigation.companyPrompt}
                </a>
              </div>
            </div>

            <section className="wedoo-home-hero-shell mt-6 overflow-hidden">
              <div className="grid gap-2 lg:grid-cols-[0.58fr_0.42fr]">
                <div className="wedoo-home-hero-copy px-6 py-8 md:px-10 md:py-10 xl:px-12 xl:py-12">
                  <div className="spot-orb -left-8 top-0 h-40 w-40 bg-[rgba(87,215,180,0.14)]" />
                  <div className="spot-orb right-0 top-12 h-48 w-48 bg-[rgba(112,72,232,0.12)]" />

                  <div className="relative z-10">
                    <span className="wedoo-kicker wedoo-reveal">Linear, Vercel, Stripe adapted to Wedoo</span>
                    <h1 className="wedoo-display wedoo-reveal wedoo-reveal-delay-1 mt-6 max-w-[42rem]">
                      {content.hero.title}
                    </h1>
                    <div className="wedoo-lead wedoo-reveal wedoo-reveal-delay-2 mt-6 max-w-[34rem] space-y-2">
                      {content.hero.subtitle.split("\n").map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>

                    <div className="wedoo-reveal wedoo-reveal-delay-3 mt-8 flex flex-wrap gap-3">
                      <a
                        className="inline-flex min-h-[54px] items-center justify-center gap-3 rounded-[16px] bg-[var(--wedoo-violet)] px-5 font-wedoo-accent text-[var(--wedoo-white-soft)] shadow-[0_20px_48px_-34px_rgba(112,72,232,0.52)] transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-violet-hover)]"
                        download="wedoo.webmanifest"
                        href="/manifest.webmanifest"
                      >
                        <SiteIcon className="h-5 w-5" name="download" />
                        {content.hero.downloadLabel}
                      </a>
                      <Link
                        className="wedoo-theme-ghost-button inline-flex min-h-[54px] items-center justify-center rounded-[16px] px-5 font-wedoo-accent transition hover:-translate-y-0.5 hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)]"
                        to={routeMap.candidate.showcase}
                      >
                        {content.howItWorks.candidateLabel}
                      </Link>
                      <Link
                        className="inline-flex min-h-[54px] items-center justify-center rounded-[16px] border border-[rgba(87,215,180,0.3)] bg-[var(--wedoo-surface-mint)] px-5 font-wedoo-accent transition hover:-translate-y-0.5 hover:bg-[var(--wedoo-mint)] hover:text-[var(--wedoo-ink)]"
                        to={routeMap.company.showcase}
                      >
                        {content.howItWorks.companyLabel}
                      </Link>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                      <div className="border-t border-[var(--wedoo-line)] pt-4">
                        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--wedoo-ink-muted)]">
                          manifesto
                        </p>
                        <p className="mt-3 text-[1.65rem] leading-[1.02] text-[var(--wedoo-ink-strong)]">
                          Opportunita leggibili. Aziende credibili. Matching piu umano.
                        </p>
                      </div>
                      <div className="border-t border-[var(--wedoo-line)] pt-4">
                        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--wedoo-ink-muted)]">
                          structure
                        </p>
                        <p className="mt-3 text-base leading-7 text-[var(--wedoo-ink-muted)]">
                          Brand forte, messaggio corto, CTA nitide. Nessun collage di benchmark scollegati.
                        </p>
                      </div>
                      <div className="border-t border-[var(--wedoo-line)] pt-4">
                        <p className="text-[0.75rem] uppercase tracking-[0.2em] text-[var(--wedoo-ink-muted)]">
                          product
                        </p>
                        <p className="mt-3 text-base leading-7 text-[var(--wedoo-ink-muted)]">
                          Un solo workspace per capire subito ruolo, impatto, contratto e credibilita del brand.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="wedoo-home-hero-preview min-h-[32rem] px-6 py-8 md:px-8 md:py-10">
                  <img
                    alt="Wedoo preview"
                    className="absolute inset-0 h-full w-full object-cover opacity-[0.3]"
                    src={assetPath("image_noixnoi1.jpg")}
                  />
                  <div className="wedoo-home-hero-media-overlay absolute inset-0" />
                  <div
                    className="spot-orb left-6 top-6 h-44 w-44"
                    style={{ background: "var(--wedoo-hero-orb)" }}
                  />

                  <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                    <div className="flex items-center justify-between gap-4">
                      <span className="wedoo-kicker bg-[var(--wedoo-ghost-bg)] text-[var(--wedoo-mint)]">workspace preview</span>
                      <div className="flex gap-2">
                        <span className="wedoo-home-hero-dot h-3 w-3 rounded-full" />
                        <span className="wedoo-home-hero-dot h-3 w-3 rounded-full" />
                        <span className="wedoo-home-hero-dot h-3 w-3 rounded-full" />
                      </div>
                    </div>

                    <div
                      className="wedoo-home-hero-preview-copy max-w-[25rem] space-y-4 px-5 py-5 md:px-6 md:py-6"
                      data-testid="home-hero-preview-copy"
                    >
                      <p className="max-w-[23rem] text-[2.7rem] leading-[0.9] text-[var(--wedoo-workspace-text)] md:text-[3.4rem]">
                        Zero hype, solo segnali utili.
                      </p>
                      <p className="max-w-[24rem] text-base leading-7 text-[var(--wedoo-workspace-muted)] md:text-lg md:leading-8">
                        Wedoo ordina il lavoro in pochi segnali chiari: impatto, modalita, trasparenza ESG e
                        coerenza del ruolo.
                      </p>
                    </div>

                    <div className="grid gap-3">
                      <div className="wedoo-workspace-panel flex items-center justify-between gap-4 px-4 py-4 text-[var(--wedoo-workspace-text)]">
                        <span>Brand transparency</span>
                        <span className="wedoo-workspace-chip">high</span>
                      </div>
                      <div className="wedoo-workspace-panel flex items-center justify-between gap-4 px-4 py-4 text-[var(--wedoo-workspace-text)]">
                        <span>Role impact on SDGs</span>
                        <span className="wedoo-workspace-chip">mapped</span>
                      </div>
                      <div className="wedoo-workspace-panel flex items-center justify-between gap-4 px-4 py-4 text-[var(--wedoo-workspace-text)]">
                        <span>Contract clarity</span>
                        <span className="wedoo-workspace-chip">explicit</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-5">
              <p className="wedoo-kicker">{content.howItWorks.eyebrow}</p>
              <h2 className="hidden text-[3.4rem] leading-[0.92] text-[var(--wedoo-ink-strong)] md:block">
                {content.howItWorks.title}
              </h2>
              <h2 className="text-[2.45rem] leading-[0.95] text-[var(--wedoo-ink-strong)] md:hidden">
                {content.howItWorks.mobileTitle}
              </h2>
              <p className="hidden max-w-[34rem] text-lg leading-8 text-[var(--wedoo-ink-muted)] md:block">
                {content.howItWorks.desktopDescription}
              </p>
              <p className="max-w-[30rem] text-base leading-7 text-[var(--wedoo-ink-muted)] md:hidden">
                {content.howItWorks.mobileDescription}
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <article className="border-t border-[var(--wedoo-line)] pt-5">
                <p className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--wedoo-violet)]">candidate</p>
                <p className="mt-4 text-[1.4rem] leading-[1.15] text-[var(--wedoo-ink-strong)]">
                  Legge immediatamente il perimetro dell annuncio, i segnali ESG e la qualita del match.
                </p>
              </article>
              <article className="border-t border-[var(--wedoo-line)] pt-5">
                <p className="text-[0.78rem] uppercase tracking-[0.2em] text-[var(--wedoo-mint-700)]">company</p>
                <p className="mt-4 text-[1.4rem] leading-[1.15] text-[var(--wedoo-ink-strong)]">
                  Pubblica offerte leggibili, verificabili e adatte a una Gen Z che cerca coerenza.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="wedoo-workspace overflow-hidden rounded-[1.8rem] px-6 py-7 shadow-[0_36px_100px_-72px_rgba(4,10,20,0.9)] md:px-8 md:py-8">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
              <div className="space-y-5">
                <p className="wedoo-kicker bg-white/8 text-[var(--wedoo-mint)]">impact statement</p>
                <p className="max-w-[26rem] text-[2.5rem] leading-[0.92] text-[var(--wedoo-workspace-text)] md:text-[3rem]">
                  Una piattaforma che toglie rumore invece di aggiungerlo.
                </p>
              </div>
              <p className="max-w-[42rem] text-lg leading-8 text-[var(--wedoo-workspace-text)]">
                {content.impactStatement.desktop}
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
            <div className="space-y-5">
              <p className="wedoo-kicker">manifesto</p>
              <h2 className="text-[3rem] leading-[0.92] text-[var(--wedoo-ink-strong)] md:text-[3.8rem]">
                {content.video.title}
              </h2>
              <p className="max-w-[34rem] text-lg leading-8 text-[var(--wedoo-ink-muted)]">
                {content.impactStatement.mobile} La home funziona come un poster di prodotto: una promessa forte,
                un piano visivo solo, una grammatica CTA unica.
              </p>
            </div>

            <div className="wedoo-theme-shell overflow-hidden rounded-[1.8rem] p-0">
              <img alt={content.video.title} className="aspect-[16/10] w-full object-cover" src={assetPath("prova.jpg")} />
            </div>
          </div>
        </section>

        <section className="section-shell mt-16">
          <div className="border-t border-[var(--wedoo-line)] py-8">
            <p className="wedoo-kicker">patronage</p>
            <h2 className="mt-4 text-[2.8rem] leading-[0.94] text-[var(--wedoo-ink-strong)] md:text-[3.4rem]">
              {content.patronage.title}
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <p className="text-base leading-7 text-[var(--wedoo-ink-muted)]">
                Il patrocinio resta dichiarato come contesto di credibilita, senza trasformarsi in una galleria
                di badge o rumore visivo.
              </p>
              <p className="text-base leading-7 text-[var(--wedoo-ink-muted)]">
                La pulizia viene prima delle decorazioni: una direzione sola, poche superfici, piu leggibilita.
              </p>
            </div>
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
