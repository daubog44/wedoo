import type { CandidateDashboardProfile } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

export function CandidateDashboardProfileRail({
  profile,
}: {
  profile: CandidateDashboardProfile;
}) {
  return (
    <aside className="mx-auto w-full max-w-[18rem] xl:sticky xl:top-[7.5rem] xl:max-w-[17.5rem]">
      <div className="flex flex-col items-center text-center xl:items-start xl:text-left">
        <AppImage
          alt={profile.fullName}
          className="h-32 w-32 rounded-full object-cover md:h-40 md:w-40 xl:h-[200px] xl:w-[200px]"
          priority
          src={assetPath(profile.avatar)}
        />
        <h1 className="mt-6 max-w-[12rem] font-wedoo-heading text-[2.75rem] leading-[0.94] text-black md:text-[3.4rem] xl:text-[4rem]">
          {profile.fullName}
        </h1>
      </div>
    </aside>
  );
}
