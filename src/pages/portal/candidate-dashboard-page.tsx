import { JobBoardCard, BoardToolbar } from "../../components/site";
import { jobs } from "../../data/jobs";

export default function CandidateDashboardPage() {
  return (
    <main className="px-4 pb-12 pt-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl">bacheca annunci</h2>
        <BoardToolbar role="candidate" />
        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {jobs.slice(0, 5).map((job) => (
            <JobBoardCard job={job} key={job.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
