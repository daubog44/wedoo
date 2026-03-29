import { ShowcaseCarousel, SiteFooter, TopLogoBar } from "../../components/site";

export default function CandidateShowcasePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopLogoBar />
      <ShowcaseCarousel role="candidate" />
      <SiteFooter className="mt-0" />
    </div>
  );
}
