import { PublicHomePage } from "../../components/public";
import {
  mapPublicHomeResponseToContent,
  publicHomeResponseMock,
} from "../../data/mocks/public-home";

export default function HomePage() {
  return <PublicHomePage content={mapPublicHomeResponseToContent(publicHomeResponseMock)} />;
}
