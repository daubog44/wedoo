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
        className={cn("h-12 w-auto md:h-14", imageClassName)}
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
    <header className={cn("section-shell pt-5", className)}>
      <div className="flex items-center justify-between gap-4 rounded-[1.2rem] border border-black/6 bg-white/86 px-4 py-3 shadow-[0_16px_40px_-34px_rgba(16,25,36,0.18)]">
        <WedooLogo
          imageClassName={
            variant === "wordmark" ? "h-9 md:h-[46px]" : "h-10 md:h-[50px]"
          }
          variant={variant}
        />
        <div className="hidden items-center gap-3 md:flex">
          <p className="font-wedoo-accent text-[0.8rem] uppercase tracking-[0.16em] text-slate-500">
            prototype Wedoo
          </p>
          <span className="rounded-full border border-brand-violet/16 bg-brand-violet/6 px-3 py-1 font-wedoo-accent text-[0.78rem] text-brand-violet-700">
            lavoro + impatto
          </span>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn("mt-10 px-4 pb-8 pt-5 text-white", className)}
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[1.5rem] border border-brand-violet-900/15 bg-brand-violet-deep px-5 py-5 shadow-[0_24px_62px_-42px_rgba(32,18,70,0.38)] md:px-6 md:py-6">
        <div className="grid gap-5 md:grid-cols-[auto_1fr] md:items-start md:gap-8">
          <div className="space-y-3 text-center md:text-left">
            <img
              alt="Wedoo"
              className="mx-auto h-[42px] w-auto object-contain md:mx-0"
              src={assetPath("scritta-wedoo.png")}
            />
            <p className="max-w-[18rem] font-wedoo-accent text-[0.84rem] leading-[1.45] text-white/70">
              Prototipo editoriale per leggere meglio opportunita, impatto e matching.
            </p>
          </div>

          <div className="grid gap-3 text-center md:text-left">
            <div className="grid gap-2 text-[0.82rem] text-white/76 md:grid-cols-[1fr_auto] md:items-start">
              <div className="space-y-1.5">
                <p>&copy; 2025 Wedoo - Tutti i diritti riservati</p>
                <p>Wedoo e un progetto in fase di sviluppo.</p>
                <p>Contatti: help@wedoo.com</p>
              </div>
              <p className="text-[0.8rem]">
                {documents.map((document, index) => (
                  <span key={document.file}>
                    <a
                      className="transition hover:text-brand-lavender-300"
                      href={documentPath(document.file)}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {document.label}
                    </a>
                    {index < documents.length - 1 ? " | " : ""}
                  </span>
                ))}
              </p>
            </div>

            <div className="grid gap-1 text-[0.76rem] text-white/58 md:grid-cols-2">
              <p>Alcune funzionalita e contenuti sono a scopo dimostrativo.</p>
              <p>Le aziende e le opportunita presenti sono a puro scopo dimostrativo.</p>
            </div>
          </div>
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
  return (
    <section className={cn("mx-auto w-full max-w-7xl px-4 md:px-8", className)}>
      {children}
    </section>
  );
}
