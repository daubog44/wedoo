import {
  PublicBackdrop,
  PublicPageHeader,
  publicGlassPanelClassName,
  publicMetaTextClassName,
  publicPosterPanelClassName,
} from "../../components/public";
import { SiteIcon } from "../../components/site";
import { customerSupportViewModel, type CustomerSupportAudience } from "../../data/auth-recovery";
import { cn } from "../../lib/site-utils";

function SupportChannelLink({
  audienceTone,
  channel,
}: {
  audienceTone: CustomerSupportAudience["tone"];
  channel: CustomerSupportAudience["channels"][number];
}) {
  const isViolet = audienceTone === "violet";

  return (
    <a
      className={cn(
        "font-wedoo-accent inline-flex min-h-[56px] items-center justify-center gap-3 rounded-[14px] border px-5 text-[18px] leading-none shadow-[0_18px_36px_-30px_rgba(16,25,36,0.45)] transition hover:-translate-y-0.5 min-[1024px]:text-[20px]",
        isViolet
          ? "border-brand-violet-300 bg-brand-violet text-[var(--wedoo-white-soft)]"
          : "border-brand-mint-300 bg-brand-mint-200 text-brand-ink",
      )}
      href={channel.href}
    >
      <SiteIcon className="h-5 w-5 min-[1024px]:h-6 min-[1024px]:w-6" name={channel.icon} />
      <span>{channel.label}</span>
    </a>
  );
}

function SupportAudienceCard({
  audience,
  compact = false,
}: {
  audience: CustomerSupportAudience;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        audience.tone === "violet"
          ? "bg-[linear-gradient(180deg,#6D47D9_0%,#5935BC_100%)] text-[var(--wedoo-white-soft)]"
          : "bg-[linear-gradient(180deg,#C7F6E7_0%,#ABF0DA_100%)] text-brand-ink",
        "rounded-[30px] border border-white/55 p-5 shadow-[0_30px_80px_-52px_rgba(16,25,36,0.72)] min-[1024px]:p-8",
      )}
    >
      <p className="font-wedoo-body text-[11px] uppercase tracking-[0.18em] opacity-70 min-[1024px]:text-[13px]">
        {audience.id === "company" ? "supporto aziende" : "supporto candidati"}
      </p>
      <h2 className="font-wedoo-heading mt-4 text-[34px] leading-[0.92] min-[1024px]:text-[46px]">
        {audience.title}
      </h2>
      <p
        className={cn(
          "mt-5 text-[16px] leading-[1.3] min-[1024px]:text-[19px]",
          compact ? "" : "max-w-[30ch]",
          audience.tone === "violet" ? "text-white/86" : "text-[rgba(33,37,41,0.78)]",
        )}
      >
        {audience.description}
      </p>
      <div className="mt-6 grid gap-3">
        {audience.channels.map((channel) => (
          <SupportChannelLink
            audienceTone={audience.tone}
            channel={channel}
            key={`${audience.id}-${channel.id}`}
          />
        ))}
      </div>
    </div>
  );
}

function DesktopSupportView() {
  const companyAudience = customerSupportViewModel.audiences[0];
  const candidateAudience = customerSupportViewModel.audiences[1];

  return (
    <section
      className="hidden min-[1024px]:block"
      data-customer-support-layout="desktop"
      data-node-id="660:725"
    >
      <div className="relative overflow-hidden rounded-[44px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)]">
        <PublicBackdrop />
        <div className="relative mx-auto min-h-[1024px] max-w-[1320px] px-10 py-8">
          <PublicPageHeader />

          <div className="mt-10 grid gap-8">
            <div className={cn(publicGlassPanelClassName, "p-8")}>
              <p className="font-wedoo-body text-[13px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
                assistenza clienti
              </p>
              <h1 className="font-wedoo-heading mt-4 text-[56px] leading-[0.92] text-brand-ink">
                {customerSupportViewModel.title}
              </h1>
              <p className={cn(publicMetaTextClassName, "mt-5 max-w-[560px]")}>
                Due canali chiari, stessa grammatica visiva. Niente incastri forzati, niente shell che cambia tono a caso.
              </p>
            </div>

            <div className={cn(publicPosterPanelClassName, "p-6")}>
              <div className="grid grid-cols-2 gap-6">
                <SupportAudienceCard audience={companyAudience} />
                <SupportAudienceCard audience={candidateAudience} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MobileSupportView() {
  const companyAudience = customerSupportViewModel.audiences[0];
  const candidateAudience = customerSupportViewModel.audiences[1];

  return (
    <section
      className="min-[1024px]:hidden"
      data-customer-support-layout="mobile"
      data-node-id="660:1217"
    >
      <div className="relative overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,#f7f4ff_0%,#eefaf6_100%)] px-4 py-4">
        <PublicBackdrop compact />
        <div className="relative mx-auto max-w-[360px]">
          <PublicPageHeader compact />

          <div className={cn(publicGlassPanelClassName, "mt-4 p-5")}>
            <p className="font-wedoo-body text-[11px] uppercase tracking-[0.18em] text-[rgba(33,37,41,0.45)]">
              assistenza clienti
            </p>
            <h1 className="font-wedoo-heading mt-3 text-[34px] leading-[0.92] text-brand-ink">
              {customerSupportViewModel.title}
            </h1>
            <p className={cn(publicMetaTextClassName, "mt-4")}>
              Contatti separati per azienda e candidato, con CTA leggibili e allineate.
            </p>
          </div>

          <div className="mt-4 grid gap-4">
            <SupportAudienceCard audience={companyAudience} compact />
            <SupportAudienceCard audience={candidateAudience} compact />
          </div>
        </div>
      </div>
    </section>
  );
}

export default function CustomerSupportPage() {
  return (
    <main className="min-h-screen bg-[var(--wedoo-page-bg)] px-2 py-2 min-[1024px]:px-4 min-[1024px]:py-4">
      <MobileSupportView />
      <DesktopSupportView />
    </main>
  );
}
