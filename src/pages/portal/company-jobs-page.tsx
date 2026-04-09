import { Link } from "react-router-dom";
import { SiteIcon } from "../../components/site";
import { jobDraftMock } from "../../data/job-draft";
import { jobs } from "../../data/jobs";

export default function CompanyJobsPage() {
  return (
    <main className="px-4 pb-12 pt-6 md:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-4xl">annunci</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          <article className="rounded-[2.5rem] border-2 border-brand-violet p-8 text-center">
            <h4 className="mt-8 text-2xl">Crea un nuovo annuncio</h4>
            <Link
              className="mt-8 inline-flex min-w-[12rem] items-center justify-center rounded-xl border border-brand-violet bg-brand-violet px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-violet"
              to={jobDraftMock.flow.portalDraftPath}
            >
              crea
            </Link>
          </article>
          <article className="rounded-[2.5rem] border-2 border-brand-violet p-8 text-center">
            <h4 className="mt-8 text-2xl">Modifica annuncio presente</h4>
            <details className="relative mt-8 inline-block text-left">
              <summary className="wedoo-dropdown-summary inline-flex min-w-[15rem] cursor-pointer items-center justify-between rounded-xl border border-brand-violet bg-brand-violet px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-violet">
                modifica
                <SiteIcon className="ml-2 h-3 w-3" name="chevron-down" />
              </summary>
              <div className="absolute left-0 right-0 mt-2 rounded-2xl border border-brand-violet bg-white py-2 shadow-lg">
                {jobs.slice(0, 4).map((job, index) => (
                  <Link
                    className="block px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-50"
                    key={job.id}
                    to={`/portale/azienda/annunci/${job.id}`}
                  >
                    {index === 0 ? "Addetto Comunicazione" : job.title}
                  </Link>
                ))}
              </div>
            </details>
          </article>
        </div>
      </div>
    </main>
  );
}
