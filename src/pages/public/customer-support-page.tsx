import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SiteIcon } from "../../components/site";
import { customerSupportViewModel, type CustomerSupportAudience } from "../../data/auth-recovery";
import { assetPath, cn } from "../../lib/site-utils";

const SUPPORT_DESKTOP_FRAME = {
  height: 1024,
  width: 1440,
} as const;

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
      style={{ color: isViolet ? "var(--wedoo-white-soft)" : "var(--wedoo-ink)" }}
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

function SupportDesktopCard({
  audienceTone,
  className,
  transformClassName,
}: {
  audienceTone: CustomerSupportAudience["tone"];
  className?: string;
  transformClassName?: string;
}) {
  return (
    <div aria-hidden="true" className={cn("absolute flex items-center justify-center", className)}>
      <div className={transformClassName}>
        <img
          alt=""
          className="block h-[532.3px] w-[721.23px] max-w-none"
          src={assetPath(
            audienceTone === "violet"
              ? "customer-support-violet-card.svg"
              : "customer-support-mint-card.svg",
          )}
        />
      </div>
    </div>
  );
}

function getInitialDesktopScale() {
  if (typeof window === "undefined") {
    return 1;
  }

  return Math.min(window.innerWidth / SUPPORT_DESKTOP_FRAME.width, 1);
}

function useSupportDesktopScale() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(getInitialDesktopScale);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateScale = (width: number) => {
      const nextScale = Math.min(width / SUPPORT_DESKTOP_FRAME.width, 1);
      setScale((currentScale) =>
        Math.abs(currentScale - nextScale) < 0.001 ? currentScale : nextScale,
      );
    };

    updateScale(container.getBoundingClientRect().width);

    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const observedWidth = entries[0]?.contentRect.width ?? container.getBoundingClientRect().width;
      updateScale(observedWidth);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return {
    containerRef,
    scale,
  };
}

function DesktopSupportView() {
  const companyAudience = customerSupportViewModel.audiences[0];
  const candidateAudience = customerSupportViewModel.audiences[1];
  const [companyPhoneChannel, companyMailChannel] = companyAudience.channels;
  const [candidatePhoneChannel, candidateMailChannel] = candidateAudience.channels;
  const { containerRef, scale } = useSupportDesktopScale();
  const canvasHeight = SUPPORT_DESKTOP_FRAME.height * scale;
  const canvasTransform =
    scale === 1 ? "translateX(-50%)" : `translateX(-50%) scale(${scale})`;

  return (
    <section className="hidden min-[1024px]:block" data-customer-support-layout="desktop" data-node-id="660:725">
      <div
        className="relative mx-auto w-full max-w-[1440px] overflow-hidden"
        ref={containerRef}
        style={{ height: canvasHeight }}
      >
        <div
          className="absolute left-1/2 top-0 h-[1024px] w-[1440px]"
          style={{ transform: canvasTransform, transformOrigin: "top center" }}
        >
          <SupportDesktopCard
            audienceTone={companyAudience.tone}
            className="left-[62px] top-[235px] h-[551.39px] w-[743.67px]"
            transformClassName="-scale-y-100 rotate-[1.56deg] skew-x-[-0.89deg]"
          />
          <SupportDesktopCard
            audienceTone={candidateAudience.tone}
            className="left-[646px] top-[235px] h-[551.39px] w-[743.67px]"
            transformClassName="-scale-y-100 rotate-[-178.44deg] skew-x-[-0.89deg]"
          />

          <div className="absolute left-[40px] top-[20px]">
            <SupportLogo />
          </div>

          <div className="absolute top-[50px] right-[69px]">
            <SupportLanguageChip />
          </div>

          <h1 className="font-wedoo-heading absolute left-1/2 top-[66px] w-[622px] -translate-x-1/2 text-center text-[48px] leading-none text-[var(--wedoo-ink)]">
            {customerSupportViewModel.title}
          </h1>

          <h2 className="font-wedoo-heading absolute left-[115px] top-[337px] text-[48px] leading-none text-[var(--wedoo-white-soft)]">
            {companyAudience.title}
          </h2>
          <p className="font-wedoo-accent absolute left-[115px] top-[418px] w-[538px] text-[36px] leading-[1.06] text-[var(--wedoo-white-soft)]">
            {companyAudience.description}
          </p>

          <h2 className="font-wedoo-heading absolute left-[783px] top-[337px] text-[48px] leading-none text-[var(--wedoo-ink)]">
            {candidateAudience.title}
          </h2>
          <p className="font-wedoo-accent absolute left-[783px] top-[436px] w-[571px] text-[36px] leading-[1.06] text-[var(--wedoo-ink)]">
            {candidateAudience.description}
          </p>

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
