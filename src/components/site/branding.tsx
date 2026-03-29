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
    <header className={cn("bg-white py-4 md:py-[1%]", className)}>
      <div className="flex px-4 md:px-0 md:ml-[2%] items-center">
        <WedooLogo
          imageClassName={
            variant === "wordmark" ? "h-10 md:h-[7vh]" : "h-12 md:h-[7vh]"
          }
          variant={variant}
        />
      </div>
    </header>
  );
}

export function SiteFooter({ className }: { className?: string }) {
  return (
    <footer
      className={cn("mt-12 bg-brand-violet-deep px-4 py-6 text-white", className)}
    >
      <div className="mx-auto max-w-7xl text-center">
        <div className="mb-4 flex justify-center">
          <img
            alt="Wedoo"
            className="h-[70px] w-auto object-contain"
            src={assetPath("scritta-wedoo.png")}
          />
        </div>
        <div className="space-y-1 text-sm">
          <p>&copy; 2025 Wedoo - Tutti i diritti riservati</p>
          <p>Wedoo è un progetto in fase di sviluppo.</p>
          <p>Contatti: help@wedoo.com</p>
          <p>
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
          <p>Alcune funzionalità e contenuti sono a scopo dimostrativo.</p>
          <p>
            Le aziende e le opportunità presenti sono a puro scopo dimostrativo.
          </p>
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
