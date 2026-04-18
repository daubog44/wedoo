import {
  PublicActionLink,
  PublicBackdrop,
  PublicPageHeader,
  publicGlassPanelClassName,
  publicMetaTextClassName,
  publicPosterMediaClassName,
  publicPosterPanelClassName,
} from "../../components/public";
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

function RegisterDesktopView() {
  return (
    <section
      className="hidden min-[1024px]:block"
      data-node-id="336:593"
      data-register-layout="desktop"
    >
      <div className="relative overflow-hidden rounded-[32px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)]">
        <PublicBackdrop tone="mint" />
        <div className="relative mx-auto min-h-[880px] max-w-[1380px] px-10 py-8">
          <PublicPageHeader />

          <div className="mt-8 grid grid-cols-[minmax(0,420px)_minmax(0,1fr)] gap-6">
            <div className={cn(publicGlassPanelClassName, "self-start p-6")}>
              <div className="flex h-full flex-col">
                <p className="font-wedoo-body text-[12px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                  onboarding wedoo
                </p>
                <h1 className="font-wedoo-heading mt-4 text-[36px] leading-[0.94] text-brand-ink">
                  {registerChoiceContent.desktopHeading}
                </h1>
                <p className={cn(publicMetaTextClassName, "mt-4 max-w-[300px]")}>
                  Scegli il percorso giusto e atterra subito nel flow coerente con il tuo ruolo.
                </p>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[14px] border border-black/6 bg-white/82 px-4 py-4 shadow-[0_12px_26px_-22px_rgba(16,25,36,0.12)]">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      flow pubblico
                    </p>
                    <p className="mt-2 text-[1rem] leading-[1.25] text-brand-ink">
                      ingresso diretto nel wizard corretto, senza launcher ambigui.
                    </p>
                  </div>
                  <div className="rounded-[14px] border border-black/6 bg-white/82 px-4 py-4 shadow-[0_12px_26px_-22px_rgba(16,25,36,0.12)]">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      stile coerente
                    </p>
                    <p className="mt-2 text-[1rem] leading-[1.25] text-brand-ink">
                      stessa grammatica visiva di login, recovery e supporto.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid gap-3">
                <PublicActionLink fullWidth to={registerChoiceContent.buttons[0].to} tone="mint">
                  {registerChoiceContent.buttons[0].label}
                </PublicActionLink>
                <PublicActionLink
                  fullWidth
                  to={registerChoiceContent.buttons[1].to}
                  tone="violet"
                >
                  {registerChoiceContent.buttons[1].label}
                </PublicActionLink>
              </div>
            </div>

            <div className={cn(publicPosterPanelClassName, "p-4")}>
              <div className={publicPosterMediaClassName}>
                <img
                  alt=""
                  className="h-[680px] w-full object-cover"
                  src={assetPath(registerChoiceContent.desktopBackground)}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,30,0.02)_0%,rgba(17,19,30,0.54)_100%)]" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-wedoo-body text-[12px] uppercase tracking-[0.2em] text-white/82">
                    prototipo navigabile
                  </p>
                  <h2 className="font-wedoo-heading mt-3 max-w-[460px] text-[36px] leading-[0.94] text-white">
                    stessa identita visiva, due ingressi chiari.
                  </h2>
                  <p className="font-wedoo-body mt-4 max-w-[330px] text-[15px] leading-[1.34] text-white/86">
                    Candidato e azienda partono da una shell comune, poi divergono solo dove serve.
                  </p>
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
    <section
      className="min-[1024px]:hidden"
      data-node-id="336:643"
      data-register-layout="mobile"
    >
      <div className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)] px-4 py-4">
        <PublicBackdrop compact tone="mint" />
        <div className="relative mx-auto max-w-[360px]">
          <PublicPageHeader compact />

          <div className={cn(publicPosterPanelClassName, "mt-4 p-3")}>
            <div className={publicPosterMediaClassName}>
              <img
                alt=""
                className="h-[198px] w-full object-cover"
                src={assetPath(registerChoiceContent.desktopBackground)}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,19,30,0.04)_0%,rgba(17,19,30,0.52)_100%)]" />
            </div>
          </div>

          <div className={cn(publicGlassPanelClassName, "mt-4 p-5")}>
            <p className="font-wedoo-body text-[11px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
              onboarding wedoo
            </p>
            <h1 className="font-wedoo-heading mt-3 text-[28px] leading-[0.94] text-brand-ink">
              {registerChoiceContent.mobileHeading}
            </h1>
            <p className={cn(publicMetaTextClassName, "mt-4")}>
              Scegli il percorso e vai direttamente nel wizard giusto.
            </p>

            <div className="mt-8 grid gap-4">
              <PublicActionLink
                fullWidth
                to={registerChoiceContent.buttons[0].to}
                tone="mint"
              >
                {registerChoiceContent.buttons[0].label}
              </PublicActionLink>
              <PublicActionLink
                fullWidth
                to={registerChoiceContent.buttons[1].to}
                tone="violet"
              >
                {registerChoiceContent.buttons[1].label}
              </PublicActionLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function RoleChoicePage() {
  return (
    <main className="bg-[var(--wedoo-page-bg)] px-2 py-2 min-[1024px]:px-4 min-[1024px]:py-4">
      <RegisterMobileView />
      <RegisterDesktopView />
    </main>
  );
}
