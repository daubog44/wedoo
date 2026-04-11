import type { CompanyDashboardProfile } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

export function CompanyDashboardProfileRail({
  profile,
}: {
  profile: CompanyDashboardProfile;
}) {
  return (
    <aside className="mx-auto w-full max-w-[18rem] xl:sticky xl:top-[7.5rem] xl:max-w-[17.5rem]">
      <div className="flex flex-col items-center text-center xl:items-start xl:text-left">
        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-[0_22px_55px_-42px_rgba(16,25,36,0.65)] md:h-40 md:w-40 xl:h-[200px] xl:w-[200px]">
          <AppImage
            alt={profile.companyName}
            className="h-20 w-20 object-contain md:h-24 md:w-24 xl:h-28 xl:w-28"
            priority
            src={assetPath(profile.companyLogo)}
          />
        </div>
        <h1 className="mt-6 max-w-[12rem] font-wedoo-heading text-[2.75rem] leading-[0.94] text-black md:text-[3.4rem] xl:text-[4rem]">
          {profile.companyName}
        </h1>
      </div>
    </aside>
  );
}
