import { Link } from "react-router-dom";
import { PublicNavbar, SiteFooter } from "../../components/site";
import { assetPath, cn } from "../../lib/site-utils";

const registerChoiceContent = {
  buttons: [
    {
      id: "candidate",
      label: "candidato",
      tone: "mint",
      to: "/registrati/candidato/1",
    },
    {
      id: "company",
      label: "azienda",
      tone: "violet",
      to: "/registrati/azienda/1",
    },
  ],
  desktopBackground: "registrazione.png",
  desktopHeading: "Scegli il tuo percorso Wedoo",
  mobileHeading: "Scegli come entrare",
} as const;

function RegisterChoiceButton({
  compact = false,
  label,
  to,
  tone,
}: {
  compact?: boolean;
  label: string;
  to: string;
  tone: "mint" | "violet";
}) {
  return (
    <Link
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center rounded-[18px] border px-6 transition hover:-translate-y-0.5",
        tone === "mint"
          ? "border-transparent bg-[var(--wedoo-mint)] text-[var(--wedoo-ink-strong)] shadow-[0_22px_48px_-34px_rgba(87,215,180,0.48)] hover:bg-[var(--wedoo-support-hover)] hover:text-[var(--wedoo-white-soft)]"
          : "border-transparent bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)] shadow-[0_22px_48px_-34px_rgba(112,72,232,0.48)] hover:bg-[var(--wedoo-violet-hover)]",
        compact ? "h-[58px] w-full text-[1.3rem]" : "h-[68px] min-w-[210px] text-[1.65rem]",
      )}
      to={to}
    >
      {label}
    </Link>
  );
}

function RegisterDesktopView() {
  return (
    <section className="hidden min-[1024px]:block" data-node-id="336:593" data-register-layout="desktop">
      <div className="mx-auto max-w-[1360px] px-8 pb-10 pt-6">
        <div className="overflow-hidden rounded-[2rem] shadow-[var(--wedoo-shadow-hero)]">
          <div className="grid lg:grid-cols-[0.52fr_0.48fr]">
            <div className="wedoo-theme-shell rounded-none rounded-l-[2rem] border-0 px-8 py-9 md:px-10 md:py-10 xl:px-12 xl:py-12">
              <span className="wedoo-kicker">choose your path</span>
              <h1 className="wedoo-section-title mt-6">
                {registerChoiceContent.desktopHeading}
              </h1>
              <p className="wedoo-reading-copy mt-6 max-w-[31rem]">
                Candidati e aziende entrano nello stesso sistema con gerarchie coerenti, CTA leggibili e meno rumore.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <RegisterChoiceButton
                  label={registerChoiceContent.buttons[0].label}
                  to={registerChoiceContent.buttons[0].to}
                  tone={registerChoiceContent.buttons[0].tone}
                />
                <RegisterChoiceButton
                  label={registerChoiceContent.buttons[1].label}
                  to={registerChoiceContent.buttons[1].to}
                  tone={registerChoiceContent.buttons[1].tone}
                />
              </div>
            </div>

            <div className="wedoo-workspace wedoo-depth-card wedoo-reveal wedoo-reveal-delay-1 relative min-h-[34rem] overflow-hidden px-8 py-10">
              <img
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-[0.24]"
                src={assetPath(registerChoiceContent.desktopBackground)}
              />
              <div className="absolute inset-0" style={{ background: "var(--wedoo-media-overlay)" }} />

              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div className="wedoo-section-stack max-w-[22rem]">
                  <span className="wedoo-workspace-chip">system reset</span>
                  <p className="wedoo-workspace-title text-[var(--wedoo-workspace-text)]">
                    Niente scelta confusa. Solo direzione chiara.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="wedoo-workspace-panel px-4 py-4">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                      candidate
                    </p>
                    <p className="wedoo-reading-copy-compact mt-2 text-[var(--wedoo-workspace-text)]">
                      Entra, definisci priorita e completa il profilo in pochi step puliti.
                    </p>
                  </div>
                  <div className="wedoo-workspace-panel px-4 py-4">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                      company
                    </p>
                    <p className="wedoo-reading-copy-compact mt-2 text-[var(--wedoo-workspace-text)]">
                      Costruisci il primo annuncio senza passare da superfici decorative inutili.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function RegisterMobileView() {
  return (
    <section className="min-[1024px]:hidden" data-node-id="336:643" data-register-layout="mobile">
      <div className="mx-auto max-w-[390px] px-4 pb-8 pt-5">
        <div className="wedoo-theme-shell wedoo-reveal overflow-hidden rounded-[1.35rem] px-5 py-6">
          <span className="wedoo-kicker">start here</span>
          <h1 className="wedoo-section-title mt-5">
            {registerChoiceContent.mobileHeading}
          </h1>
          <p className="wedoo-reading-copy mt-4">
            Scegli il lato giusto e continua con un flusso coerente.
          </p>

          <div className="mt-8 grid gap-4">
            <RegisterChoiceButton
              compact
              label={registerChoiceContent.buttons[0].label}
              to={registerChoiceContent.buttons[0].to}
              tone={registerChoiceContent.buttons[0].tone}
            />
            <RegisterChoiceButton
              compact
              label={registerChoiceContent.buttons[1].label}
              to={registerChoiceContent.buttons[1].to}
              tone={registerChoiceContent.buttons[1].tone}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RoleChoicePage() {
  return (
    <>
      <main className="bg-[var(--wedoo-page-bg)] pb-6">
        <PublicNavbar />
        <RegisterMobileView />
        <RegisterDesktopView />
      </main>
      <SiteFooter className="mt-0" />
    </>
  );
}
