import { useParams } from "react-router-dom";
import {
  DetailActionLink,
  DetailBulletList,
  DetailCard,
  DetailGoalRow,
  DetailSection,
} from "../../components/site";
import { jobs } from "../../data/jobs";
import { assetPath } from "../../lib/site-utils";

export default function CompanyJobPage() {
  const params = useParams();
  const job = jobs.find((entry) => entry.id === params.jobId) ?? jobs[0];

  return (
    <main className="px-4 pb-12 pt-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <h2 className="mb-4 text-center text-3xl">anteprima dell'annuncio di:</h2>
        <DetailCard tone="violet">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <img alt={job.company} className="h-[100px] w-[100px] rounded-full object-cover" src={assetPath(job.logo)} />
            <h3 className="text-3xl">
              {job.title}
              <br />
              {job.company}
            </h3>
          </div>
          <p className="mt-4 text-center text-sm leading-7 text-slate-700">
            Per maggiori informazioni contattare: ({job.contact.name}, {job.contact.email}, {job.contact.phone})
          </p>
          <DetailGoalRow ids={job.sdgs} />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <DetailActionLink tone="violet" variant="outline">
              visualizza certificazioni
            </DetailActionLink>
            <DetailActionLink tone="violet" variant="outline">
              contatta
            </DetailActionLink>
          </div>
          <DetailSection title={<b>Riassunto offerta</b>} tone="violet">
            <DetailBulletList items={job.summary} />
          </DetailSection>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailSection title={<>Competenze richieste: <b>Hard skills</b></>} tone="violet">
              <DetailBulletList items={job.hardSkills} />
            </DetailSection>
            <DetailSection title={<>Competenze richieste: <b>Soft skills</b></>} tone="violet">
              <DetailBulletList items={job.softSkills} />
            </DetailSection>
          </div>
          <DetailSection title={<b>Job description</b>} tone="violet">
            <p>{job.description}</p>
          </DetailSection>
          <DetailSection title={<b>Dettagli azienda</b>} tone="violet">
            <div className="space-y-4">
              {job.companyDetails.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </DetailSection>
          <DetailSection title={<b>{job.requirements}</b>} tone="violet">
            <div className="flex flex-wrap justify-center gap-3 md:justify-end">
              <DetailActionLink tone="violet" variant="outline">
                modifica
              </DetailActionLink>
              <DetailActionLink tone="violet" variant="outline">
                salva bozza
              </DetailActionLink>
              <DetailActionLink tone="violet">pubblica</DetailActionLink>
            </div>
          </DetailSection>
        </DetailCard>
      </div>
    </main>
  );
}
