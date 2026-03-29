import { PublicHomePage } from "../../components/public";
import { publicHomeMock } from "../../data/mocks/public-home";

export default function HomePage() {
  return <PublicHomePage content={publicHomeMock} />;
}
