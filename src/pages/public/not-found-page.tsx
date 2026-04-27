import { Link } from "react-router-dom";
import { PageSection, PublicNavbar, SiteFooter } from "../../components/site";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-[var(--wedoo-page-bg)] text-[var(--wedoo-ink)]">
      <PublicNavbar />
      <PageSection className="py-16">
        <div className="wedoo-theme-shell rounded-[2rem] border-dashed px-6 py-12 text-center">
          <h2 className="text-5xl">404</h2>
          <p className="mt-4 text-base leading-8 text-[var(--wedoo-ink-muted)]">La pagina richiesta non e presente nel prototipo Wedoo.</p>
          <Link
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-transparent bg-[var(--wedoo-violet)] px-5 py-3 text-sm font-semibold text-[var(--wedoo-white-soft)] transition hover:bg-[var(--wedoo-violet-hover)]"
            to="/"
          >
            torna alla home
          </Link>
        </div>
      </PageSection>
      <SiteFooter />
    </div>
  );
}
