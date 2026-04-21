import { Link } from "react-router-dom";
import { AuthTopBar } from "../../components/public";
import { SiteFooter } from "../../components/site";
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
  desktopHeading: "registrati come candidato/azienda",
  mobileHeading: "registrati o accedi come candidato/azienda",
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
        compact ? "h-[72px] w-full text-[1.8rem]" : "h-[78px] min-w-[220px] text-[2rem]",
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
        <AuthTopBar />

        <div className="mt-6 overflow-hidden rounded-[2rem] shadow-[var(--wedoo-shadow-hero)]">
          <div className="grid lg:grid-cols-[0.52fr_0.48fr]">
            <div className="wedoo-theme-shell rounded-none rounded-l-[2rem] border-0 px-8 py-9 md:px-10 md:py-10 xl:px-12 xl:py-12">
              <span className="wedoo-kicker">choose your path</span>
              <h1 className="mt-6 text-[4.5rem] leading-[0.9] text-[var(--wedoo-ink-strong)]">
                {registerChoiceContent.desktopHeading}
              </h1>
              <p className="mt-6 max-w-[30rem] text-lg leading-8 text-[var(--wedoo-ink-muted)]">
                Un solo ingresso, due percorsi netti. Candidate e company entrano nello stesso sistema con
                gerarchia coerente, CTA leggibili e meno rumore.
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

            <div className="wedoo-workspace relative min-h-[34rem] overflow-hidden px-8 py-10">
              <img
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-[0.24]"
                src={assetPath(registerChoiceContent.desktopBackground)}
              />
              <div className="absolute inset-0" style={{ background: "var(--wedoo-media-overlay)" }} />

              <div className="relative z-10 flex h-full flex-col justify-between gap-8">
                <div className="max-w-[22rem] space-y-4">
                  <span className="wedoo-workspace-chip">system reset</span>
                  <p className="text-[2.9rem] leading-[0.9] text-[var(--wedoo-workspace-text)]">
                    Niente scelta confusa. Solo direzione chiara.
                  </p>
                </div>

                <div className="grid gap-3">
                  <div className="wedoo-workspace-panel px-4 py-4">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                      candidate
                    </p>
                    <p className="mt-2 text-lg leading-7 text-[var(--wedoo-workspace-text)]">
                      Entra, definisci priorita e completa il profilo in pochi step puliti.
                    </p>
                  </div>
                  <div className="wedoo-workspace-panel px-4 py-4">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-[var(--wedoo-workspace-muted)]">
                      company
                    </p>
                    <p className="mt-2 text-lg leading-7 text-[var(--wedoo-workspace-text)]">
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
        <AuthTopBar compact />

        <div className="wedoo-theme-shell mt-5 overflow-hidden rounded-[1.6rem] px-5 py-6">
          <span className="wedoo-kicker">start here</span>
          <h1 className="mt-5 text-[2.55rem] leading-[0.94] text-[var(--wedoo-ink-strong)]">
            {registerChoiceContent.mobileHeading}
          </h1>
          <p className="mt-4 text-base leading-7 text-[var(--wedoo-ink-muted)]">
            La grammatica resta una sola anche da mobile: una scelta primaria, una secondaria, nessun rumore.
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
        <RegisterMobileView />
        <RegisterDesktopView />
      </main>
      <SiteFooter className="mt-0" />
    </>
  );
}
