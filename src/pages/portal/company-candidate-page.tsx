import { useParams } from "react-router-dom";
import {
  DetailActionLink,
  DetailBulletList,
  DetailCard,
  DetailGoalRow,
  DetailSection,
} from "../../components/site";
import { candidates } from "../../data/candidates";
import { assetPath } from "../../lib/site-utils";

export default function CompanyCandidatePage() {
  const params = useParams();
  const candidate =
    candidates.find((entry) => entry.id === params.candidateId) ?? candidates[0];

  return (
    <main className="px-4 pb-12 pt-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <DetailCard tone="violet">
          <div className="flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
            <img alt={candidate.name} className="h-[100px] w-[100px] rounded-full object-cover" src={assetPath(candidate.avatar)} />
            <h3 className="text-3xl">
              <b>{candidate.name}</b>
              <br />
              {candidate.status}
            </h3>
          </div>
          <p className="mt-4 text-center text-sm leading-7 text-slate-700">{candidate.summary}</p>
          <DetailGoalRow ids={candidate.sdgs} />
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <DetailActionLink tone="violet" variant="outline">
              visualizza certificazioni
            </DetailActionLink>
            <DetailActionLink tone="violet" variant="outline">
              cv
            </DetailActionLink>
          </div>
          <DetailSection title={<b>Descrizione personale</b>} tone="violet">
            <p>{candidate.bio}</p>
          </DetailSection>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailSection title={<b>Info</b>} tone="violet">
              <DetailBulletList items={[candidate.city, candidate.email, candidate.phone]} />
            </DetailSection>
            <DetailSection title={<b>Formazione</b>} tone="violet">
              <DetailBulletList items={candidate.education} />
            </DetailSection>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <DetailSection title={<>Competenze richieste: <b>Hard skills</b></>} tone="violet">
              <DetailBulletList items={candidate.hardSkills} />
            </DetailSection>
            <DetailSection title={<>Competenze richieste: <b>Soft skills</b></>} tone="violet">
              <DetailBulletList items={candidate.softSkills} />
            </DetailSection>
          </div>
          <div className="mt-6 flex justify-center md:justify-end">
            <DetailActionLink tone="violet">contatta</DetailActionLink>
          </div>
        </DetailCard>
      </div>
    </main>
  );
}
