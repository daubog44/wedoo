import { Link } from "react-router-dom";
import { SiteIcon } from "../../components/site";
import { customerSupportViewModel, type CustomerSupportAudience } from "../../data/auth-recovery";
import { assetPath, cn } from "../../lib/site-utils";

const desktopDescriptionText = {
  candidate: [
    "chiama il numero gratuito o invia",
    "una mail spiegando il tuo",
    "problema, saremo felici",
    "di aiutarti!",
  ].join("\n"),
  company: [
    "chiama il numero gratuito",
    "dedicato alle aziende",
    "o invia una mail",
    "spiegando il tuo problema,",
    "saremo felici di aiutarti!",
  ].join("\n"),
} as const satisfies Record<CustomerSupportAudience["id"], string>;

function SupportLanguageChip({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <button
      aria-label="Lingua italiana"
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[8px] border border-[#767676] bg-[#e3e3e3] text-[#1e1e1e] opacity-50",
        compact ? "h-[22px] w-[57px] px-2 text-[14px] leading-none" : "h-8 w-[57px] px-3 text-[16px] leading-none",
        className,
      )}
      type="button"
    >
      <span>ita</span>
      <SiteIcon className="h-4 w-4" name="chevron-down" />
    </button>
  );
}

function SupportLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link to="/">
      <img
        alt="Wedoo"
        className={compact ? "h-[49px] w-[184px] object-contain" : "h-[92px] w-[197px] object-contain"}
        src={assetPath("Frame-2@2x.png")}
      />
    </Link>
  );
}

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
        "font-wedoo-accent inline-flex items-center justify-center gap-2 rounded-[8px] border-2 px-3 transition hover:opacity-85",
        isViolet
          ? "border-[#cdbdf4] text-[var(--wedoo-white-soft)]"
          : "border-[var(--wedoo-ink)] text-[var(--wedoo-ink)]",
        compact ? "h-[43px] text-[18px] leading-none" : "h-[54px] text-[24px] leading-none",
        className,
      )}
      href={channel.href}
    >
      <SiteIcon className={compact ? "h-5 w-5" : "h-[30px] w-[30px]"} name={channel.icon} />
      <span>{channel.label}</span>
    </a>
  );
}

function MobileAudienceSection({
  audience,
  className,
  titleClassName,
}: {
  audience: CustomerSupportAudience;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <section className={className}>
      <h2 className={cn("font-wedoo-heading text-[36px] leading-none", titleClassName)}>
        {audience.title}
      </h2>
      <p
        className={cn(
          "font-wedoo-accent mt-6 max-w-[299px] text-[18px] leading-[1.15]",
          audience.tone === "violet" ? "text-[var(--wedoo-white-soft)]" : "text-[var(--wedoo-ink)]",
        )}
      >
        {audience.description}
      </p>
      <div className="mt-5 flex flex-col items-start gap-[10px]">
        {audience.channels.map((channel) => (
          <SupportChannelLink
            audienceTone={audience.tone}
            channel={channel}
            compact
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
  const [companyPhoneChannel, companyMailChannel] = companyAudience.channels;
  const [candidatePhoneChannel, candidateMailChannel] = candidateAudience.channels;

  return (
    <section className="hidden min-[1024px]:block" data-customer-support-layout="desktop" data-node-id="660:725">
      <div className="relative mx-auto h-[1024px] w-full max-w-[1440px] overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute left-[48px] top-[205px] h-[360px] w-[486px] rounded-[74px] bg-[var(--wedoo-violet)] [transform:rotate(-1.5deg)]"
        />
        <div
          aria-hidden="true"
          className="absolute left-[496px] top-[205px] h-[360px] w-[486px] rounded-[74px] bg-[var(--wedoo-mint)] [transform:rotate(0.8deg)]"
        />

        <div className="absolute left-[40px] top-[20px]">
          <SupportLogo />
        </div>

        <div className="absolute top-[50px] right-[69px]">
          <SupportLanguageChip />
        </div>

        <h1 className="font-wedoo-heading absolute left-1/2 top-[72px] -translate-x-1/2 text-[48px] leading-none text-[var(--wedoo-ink)]">
          {customerSupportViewModel.title}
        </h1>

        <section className="absolute left-[82px] top-[337px] text-[var(--wedoo-white-soft)]">
          <h2 className="font-wedoo-heading text-[48px] leading-none">{companyAudience.title}</h2>
          <p className="font-wedoo-accent mt-[12px] whitespace-pre-line text-[30px] leading-[1.08]">
            {desktopDescriptionText.company}
          </p>
        </section>

        <section className="absolute left-[805px] top-[337px] text-[var(--wedoo-ink)]">
          <h2 className="font-wedoo-heading text-[48px] leading-none">{candidateAudience.title}</h2>
          <p className="font-wedoo-accent mt-[30px] whitespace-pre-line text-[30px] leading-[1.08]">
            {desktopDescriptionText.candidate}
          </p>
        </section>

        <div className="absolute left-[178px] top-[662px]">
          <SupportChannelLink
            audienceTone={companyAudience.tone}
            channel={companyPhoneChannel}
            className="w-[257px]"
          />
        </div>
        <div className="absolute left-[455px] top-[662px]">
          <SupportChannelLink
            audienceTone={companyAudience.tone}
            channel={companyMailChannel}
            className="w-[220px]"
          />
        </div>
        <div className="absolute left-[826px] top-[662px]">
          <SupportChannelLink
            audienceTone={candidateAudience.tone}
            channel={candidatePhoneChannel}
            className="w-[272px]"
          />
        </div>
        <div className="absolute left-[1118px] top-[662px]">
          <SupportChannelLink
            audienceTone={candidateAudience.tone}
            channel={candidateMailChannel}
            className="w-[224px]"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 h-[153px] bg-[var(--wedoo-violet-800)]">
          <div className="absolute left-[40px] top-[-4px]">
            <SupportLogo />
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
    <section className="min-[1024px]:hidden" data-customer-support-layout="mobile" data-node-id="660:1217">
      <div className="mx-auto min-h-[800px] w-full max-w-[360px] overflow-hidden">
        <div className="relative h-[800px]">
          <div
            className="absolute inset-x-0 top-[123px] h-[356px] bg-[var(--wedoo-violet)]"
            style={{ clipPath: "polygon(0 0, 94% 0, 100% 3%, 100% 83%, 0 100%)" }}
          />
          <div
            className="absolute inset-x-0 top-[430px] h-[277px] bg-[var(--wedoo-mint)]"
            style={{ clipPath: "polygon(0 16%, 100% 0, 100% 100%, 0 100%)" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-[94px] bg-[var(--wedoo-violet-800)]" />

          <div className="absolute left-[89px] top-[23px]">
            <SupportLogo compact />
          </div>

          <div className="absolute right-[24px] top-[23px]">
            <SupportLanguageChip compact />
          </div>

          <h1 className="font-wedoo-accent absolute left-1/2 top-[77px] w-[320px] -translate-x-1/2 text-center text-[30px] leading-none text-[var(--wedoo-ink)]">
            {customerSupportViewModel.title}
          </h1>

          <MobileAudienceSection audience={companyAudience} className="absolute left-[16px] top-[188px]" />
          <MobileAudienceSection
            audience={candidateAudience}
            className="absolute right-[15px] top-[468px] text-right"
            titleClassName="text-right"
          />
        </div>
      </div>
    </section>
  );
}

export default function CustomerSupportPage() {
  return (
    <main className="min-h-screen bg-[var(--wedoo-page-bg)] pt-2">
      <MobileSupportView />
      <DesktopSupportView />
    </main>
  );
}
