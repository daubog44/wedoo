import { InfoPageContent } from "../../components/public/info-sections";
import { infoPageResponseMock } from "../../data/info-page";

export default function InfoPage() {
  return <InfoPageContent content={infoPageResponseMock} />;
}
