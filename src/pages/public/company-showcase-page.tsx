import { ShowcaseCarousel, SiteFooter, TopLogoBar } from "../../components/site";

export default function CompanyShowcasePage() {
  return (
    <div className="min-h-screen bg-white">
      <TopLogoBar />
      <ShowcaseCarousel role="company" />
      <SiteFooter className="mt-0" />
    </div>
  );
}
