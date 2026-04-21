import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { documents } from "../../data/core";
import { assetPath, cn, documentPath } from "../../lib/site-utils";

type LogoVariant = "candidate" | "company" | "wordmark";

const logoMap: Record<LogoVariant, string> = {
  candidate: "logo-viola.png",
  company: "logo-verde.png",
  wordmark: "scritta-wedoo.png",
};

export function WedooLogo({
  className,
  imageClassName,
  to = "/",
  variant = "wordmark",
}: {
  className?: string;
  imageClassName?: string;
  to?: string;
  variant?: LogoVariant;
}) {
  return (
    <Link className={cn("inline-flex items-center", className)} to={to}>
      <img
        alt="Wedoo"
        className={cn("h-10 w-auto object-contain md:h-12", imageClassName)}
        src={assetPath(logoMap[variant])}
      />
    </Link>
  );
}

export function TopLogoBar({
  className,
  variant = "wordmark",
}: {
  className?: string;
  variant?: LogoVariant;
}) {
  return (
    <header className={cn("px-4 pt-5 md:px-8 md:pt-6", className)}>
      <div className="glass-panel mx-auto flex w-full max-w-[1360px] items-center justify-between px-4 py-3 md:px-6">
        <WedooLogo
          imageClassName={variant === "wordmark" ? "h-9 md:h-10" : "h-10 md:h-12"}
          variant={variant}
        />
        <span className="wedoo-kicker px-3 py-2 text-[0.68rem]">visual reset</span>
      </div>
    </header>
  );
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer className={cn("wedoo-footer-shell mt-12 px-4 py-10 md:px-8 md:py-12", className)}>
      <div className="mx-auto grid w-full max-w-[1360px] gap-8 border-t border-[var(--wedoo-footer-border)] pt-8 md:grid-cols-[1.08fr_0.92fr] md:gap-12">
        <div className="space-y-5">
          <WedooLogo imageClassName="h-10 md:h-11" />
          <p className="max-w-[32rem] text-sm leading-7 text-[var(--wedoo-footer-muted)] md:text-base">
            Opportunita leggibili, aziende credibili, matching piu umano. Wedoo resta un prototipo
            navigabile, ma l&apos;interfaccia ora segue un solo linguaggio.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-[var(--wedoo-footer-muted)]">
            {documents.map((document) => (
              <a
                className="inline-flex rounded-full border border-[var(--wedoo-footer-border)] px-3 py-2 transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-footer-text)]"
                href={documentPath(document.file)}
                key={document.file}
                rel="noreferrer"
                target="_blank"
              >
                {document.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-4 text-sm leading-7 text-[var(--wedoo-footer-muted)]">
          <p>2025 Wedoo – Tutti i diritti riservati</p>
          <p>Wedoo e un progetto in fase di sviluppo.</p>
          <p>Contatti: help@wedoo.com</p>
          <p>Alcune funzionalita e contenuti sono a scopo dimostrativo.</p>
          <p>Le aziende e le opportunita presenti sono a puro scopo dimostrativo.</p>
        </div>
      </div>
    </footer>
  );
}

export function PageSection({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("mx-auto w-full max-w-[1360px] px-4 md:px-8", className)}>{children}</section>;
}
