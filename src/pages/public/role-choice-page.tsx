import { Link } from "react-router-dom";
import { SiteFooter, SiteIcon } from "../../components/site";
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

const desktopPct = (value: number) => `${(value / 1440) * 100}%`;

function RegisterLanguageChip({ compact = false }: { compact?: boolean }) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#767676] bg-[#e3e3e3] text-[#1e1e1e] opacity-50",
        compact ? "h-[22px] w-[57px] px-2 text-[14px] leading-none" : "h-8 w-[57px] px-3 text-[16px] leading-none",
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className="h-4 w-4" name="chevron-down" />
    </button>
  );
}

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
        "font-wedoo-accent inline-flex items-center justify-center rounded-[8px] border-[3px] bg-[var(--wedoo-white-soft)] text-[var(--wedoo-ink)] transition hover:bg-[var(--wedoo-white-soft)]/90",
        tone === "mint" ? "border-[#69f2c4]" : "border-[#7447e1]",
        compact ? "h-[77px] w-[223px] text-[36px] leading-none" : "h-[77px] w-[223px] text-[36px] leading-none",
      )}
      to={to}
    >
      {label}
    </Link>
  );
}

function RegisterDesktopView() {
  return (
    <section className="hidden min-[1024px]:block">
      <div
        className="relative mx-auto h-[1024px] w-full max-w-[1440px]"
        data-node-id="336:593"
        data-register-layout="desktop"
      >
        <img
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          src={assetPath(registerChoiceContent.desktopBackground)}
        />

        <div className="absolute top-[50px]" style={{ left: desktopPct(1314) }}>
          <RegisterLanguageChip />
        </div>

        <Link className="absolute top-[110px]" style={{ left: desktopPct(167) }} to="/">
          <img alt="Wedoo" className="h-[91px] w-[340px] object-contain" src={assetPath("Frame-2@2x.png")} />
        </Link>

        <h1
          className="font-wedoo-accent absolute text-center text-[36px] leading-none text-[var(--wedoo-ink)]"
          style={{ left: desktopPct(89), top: 297, width: desktopPct(496) }}
        >
          {registerChoiceContent.desktopHeading}
        </h1>

        <div className="absolute top-[513px]" style={{ left: desktopPct(70) }}>
          <RegisterChoiceButton
            label={registerChoiceContent.buttons[0].label}
            to={registerChoiceContent.buttons[0].to}
            tone={registerChoiceContent.buttons[0].tone}
          />
        </div>

        <div className="absolute top-[513px]" style={{ left: desktopPct(380) }}>
          <RegisterChoiceButton
            label={registerChoiceContent.buttons[1].label}
            to={registerChoiceContent.buttons[1].to}
            tone={registerChoiceContent.buttons[1].tone}
          />
        </div>
      </div>
    </section>
  );
}

function RegisterMobileView() {
  return (
    <section className="min-[1024px]:hidden">
      <div
        className="mx-auto min-h-[800px] w-full max-w-[360px]"
        data-node-id="336:643"
        data-register-layout="mobile"
      >
        <div className="relative h-[800px]">
          <div className="absolute right-[24px] top-[23px]">
            <RegisterLanguageChip compact />
          </div>

          <Link className="absolute left-[89px] top-[23px]" to="/">
            <img alt="Wedoo" className="h-[49px] w-[184px] object-contain" src={assetPath("Frame-2@2x.png")} />
          </Link>

          <h1 className="font-wedoo-accent absolute left-[24px] top-[168px] w-[313px] text-center text-[36px] leading-none text-[var(--wedoo-ink)]">
            {registerChoiceContent.mobileHeading}
          </h1>

          <div className="absolute left-[69px] top-[406px]">
            <RegisterChoiceButton
              compact
              label={registerChoiceContent.buttons[0].label}
              to={registerChoiceContent.buttons[0].to}
              tone={registerChoiceContent.buttons[0].tone}
            />
          </div>

          <div className="absolute left-[69px] top-[555px]">
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
      <main className="bg-[var(--wedoo-page-bg)] pb-12 pt-2">
        <RegisterMobileView />
        <RegisterDesktopView />
      </main>
      <SiteFooter className="mt-0" />
    </>
  );
}
