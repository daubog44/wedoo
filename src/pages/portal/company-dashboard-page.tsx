import { BoardToolbar, CandidateBoardCard } from "../../components/site";
import { candidates } from "../../data/candidates";

export default function CompanyDashboardPage() {
  return (
    <main className="px-4 pb-12 pt-6 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-center text-4xl">bacheca candidati</h2>
        <BoardToolbar role="company" />
        <div className="mt-8 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {candidates.slice(0, 5).map((candidate) => (
            <CandidateBoardCard candidate={candidate} key={candidate.id} />
          ))}
        </div>
      </div>
    </main>
  );
}
