import type { CompanyDashboardProfile } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

export function CompanyDashboardProfileRail({
  profile,
}: {
  profile: CompanyDashboardProfile;
}) {
  return (
    <aside className="mx-auto w-full max-w-[22rem] xl:sticky xl:top-[6.5rem] xl:max-w-[20rem]">
      <div className="overflow-hidden rounded-[1.35rem] border border-brand-violet/18 bg-[linear-gradient(165deg,rgba(255,255,255,0.96),rgba(243,237,255,0.92))] p-4 shadow-[0_18px_42px_-30px_rgba(16,25,36,0.18)] sm:p-5">
        <div className="inline-flex rounded-full border border-brand-violet/28 bg-brand-violet/8 px-3 py-1 font-wedoo-accent text-[0.68rem] uppercase tracking-[0.16em] text-brand-violet-700">
          profilo azienda
        </div>
        <div className="mt-4 flex flex-col items-center text-center xl:items-start xl:text-left">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-[0_16px_36px_-28px_rgba(16,25,36,0.2)] md:h-24 md:w-24 xl:h-[124px] xl:w-[124px]">
            <AppImage
              alt={profile.companyName}
              className="h-14 w-14 object-contain md:h-16 md:w-16 xl:h-18 xl:w-18"
              priority
              src={assetPath(profile.companyLogo)}
            />
          </div>
          <h1 className="mt-4 max-w-[13rem] font-wedoo-heading text-[1.8rem] leading-[0.96] text-black xl:text-[2.15rem]">
            {profile.companyName}
          </h1>
          <p className="mt-2 max-w-[15rem] font-wedoo-accent text-[0.84rem] leading-[1.38] text-slate-600">
            Un rail recruiter piu corto, con segnali utili e meno riempitivo.
          </p>
          <div className="mt-4 grid w-full gap-2.5">
            <div className="rounded-[1rem] border border-brand-violet/20 bg-white/88 px-4 py-3">
              <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">
                4 profili
              </p>
              <p className="mt-1 font-wedoo-accent text-[0.76rem] leading-[1.35] text-slate-600">
                keywords, status e SDG
              </p>
            </div>
            <div className="rounded-[1rem] border border-brand-violet/20 bg-white/88 px-4 py-3">
              <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">
                Ricerca mirata
              </p>
              <p className="mt-1 font-wedoo-accent text-[0.76rem] leading-[1.35] text-slate-600">
                meno rumore, piu segnali utili
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
