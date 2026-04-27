import { AuthWorkspacePanel } from "../../components/public";
import { PublicNavbar, SiteFooter, SiteIcon } from "../../components/site";
import { customerSupportViewModel, type CustomerSupportAudience } from "../../data/auth-recovery";
import { cn } from "../../lib/site-utils";

function SupportChannelLink({
  audienceTone,
  channel,
  className,
  compact = false,
}: {
  audienceTone: CustomerSupportAudience["tone"];
  channel: CustomerSupportAudience["channels"][number];
  className?: string;
  compact?: boolean;
}) {
  const isViolet = audienceTone === "violet";

  return (
    <a
      className={cn(
        "font-wedoo-accent inline-flex items-center justify-center gap-2 rounded-[14px] border px-4 transition hover:-translate-y-0.5",
        isViolet
          ? "wedoo-theme-ghost-button"
          : "border-[rgba(87,215,180,0.32)] bg-[rgba(87,215,180,0.12)] text-[var(--wedoo-mint-700)] hover:bg-[var(--wedoo-mint)] hover:text-[var(--wedoo-ink-strong)]",
        compact ? "min-h-[3.15rem] text-[0.95rem]" : "min-h-[3.35rem] text-[1rem]",
        className,
      )}
      href={channel.href}
    >
      <SiteIcon className="h-5 w-5" name={channel.icon} />
      <span>{channel.label}</span>
    </a>
  );
}

function SupportAudienceSection({
  audience,
  compact = false,
}: {
  audience: CustomerSupportAudience;
  compact?: boolean;
}) {
  const isViolet = audience.tone === "violet";

  return (
    <section
      className={cn(
        "wedoo-depth-card rounded-[1.5rem] border p-5",
        isViolet
          ? "border-white/10 bg-white/4 text-[var(--wedoo-workspace-text)]"
          : "border-[rgba(87,215,180,0.22)] bg-[rgba(87,215,180,0.08)] text-[var(--wedoo-ink)]",
      )}
    >
      <h2 className={cn("font-wedoo-heading text-[2rem] leading-[1.08]", compact && "text-[1.8rem]")}>
        {audience.title}
      </h2>
      <p
        className={cn(
          "wedoo-reading-copy-compact mt-4",
          isViolet ? "text-[var(--wedoo-workspace-muted)]" : "text-[var(--wedoo-ink-muted)]",
        )}
      >
        {audience.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-3">
        {audience.channels.map((channel) => (
          <SupportChannelLink
            audienceTone={audience.tone}
            channel={channel}
            compact={compact}
            key={`${audience.id}-${channel.id}`}
          />
        ))}
      </div>
    </section>
  );
}

function DesktopSupportView() {
  const companyAudience = customerSupportViewModel.audiences[0];
  const candidateAudience = customerSupportViewModel.audiences[1];

  return (
    <section className="hidden min-[1024px]:block" data-customer-support-layout="desktop" data-node-id="660:725">
      <div className="mx-auto max-w-[1360px] px-8 pb-10 pt-6">
        <div className="grid gap-6 lg:grid-cols-[0.4fr_0.6fr]">
          <div className="wedoo-section-stack">
            <h1 className="wedoo-section-title">
              {customerSupportViewModel.title}
            </h1>
            <p className="wedoo-reading-copy max-w-[25rem]">
              Due linee di supporto, un solo workspace. Nessun canvas inclinato o blocchi casuali: solo aiuto
              chiaro per candidato e azienda.
            </p>
          </div>

          <AuthWorkspacePanel className="min-h-[34rem] wedoo-depth-card wedoo-reveal wedoo-reveal-delay-1">
            <div className="flex h-full flex-col justify-between gap-6">
              <div className="wedoo-section-stack">
                <span className="wedoo-workspace-chip">customer care</span>
                <p className="wedoo-workspace-title max-w-[26rem] text-[var(--wedoo-workspace-text)]">
                  Ogni richiesta entra in una superficie leggibile.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <SupportAudienceSection audience={companyAudience} />
                <SupportAudienceSection audience={candidateAudience} />
              </div>
            </div>
          </AuthWorkspacePanel>
        </div>
      </div>
    </section>
  );
}

function MobileSupportView() {
  const companyAudience = customerSupportViewModel.audiences[0];
  const candidateAudience = customerSupportViewModel.audiences[1];

  return (
    <section className="min-[1024px]:hidden" data-customer-support-layout="mobile" data-node-id="660:1217">
      <div className="mx-auto max-w-[390px] px-4 pb-8 pt-5">
        <div className="wedoo-section-stack">
          <h1 className="wedoo-section-title">
            {customerSupportViewModel.title}
          </h1>

          <AuthWorkspacePanel className="wedoo-reveal space-y-4">
            <SupportAudienceSection audience={companyAudience} compact />
            <SupportAudienceSection audience={candidateAudience} compact />
          </AuthWorkspacePanel>
        </div>
      </div>
    </section>
  );
}

export default function CustomerSupportPage() {
  return (
    <>
      <main className="min-h-screen bg-[var(--wedoo-page-bg)]">
        <PublicNavbar />
        <MobileSupportView />
        <DesktopSupportView />
      </main>
      <SiteFooter className="mt-0" />
    </>
  );
}
