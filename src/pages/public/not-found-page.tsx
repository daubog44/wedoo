import { Link } from "react-router-dom";
import { PageSection, SiteFooter, TopLogoBar } from "../../components/site";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-brand-page">
      <TopLogoBar />
      <PageSection className="py-16">
        <div className="rounded-[2rem] border-2 border-dashed border-brand-violet-soft px-6 py-12 text-center">
          <h2 className="text-5xl">404</h2>
          <p className="mt-4 text-base leading-8 text-slate-600">La pagina richiesta non e presente nel prototipo Wedoo.</p>
          <Link
            className="mt-6 inline-flex items-center justify-center rounded-xl border border-brand-violet bg-brand-violet px-5 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-ink"
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
