import { CandidateCvView } from "../../components/portal/candidate-cv-view";
import { candidateCvResponseMock } from "../../data/candidate-cv";

export default function CandidateCvPage() {
  return (
    <main className="min-h-screen bg-brand-page" data-portal-page="candidate-cv">
      <CandidateCvView response={candidateCvResponseMock} />
    </main>
  );
}
