import type { CandidateDashboardProfile } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

export function CandidateDashboardProfileRail({
  profile,
}: {
  profile: CandidateDashboardProfile;
}) {
  return (
    <aside className="mx-auto w-full max-w-[22rem] xl:sticky xl:top-[6.5rem] xl:max-w-[20rem]">
      <div className="overflow-hidden rounded-[1.35rem] border border-brand-mint/20 bg-[linear-gradient(165deg,rgba(255,255,255,0.96),rgba(231,255,247,0.92))] p-4 shadow-[0_18px_42px_-30px_rgba(16,25,36,0.18)] sm:p-5">
        <div className="inline-flex rounded-full border border-brand-mint/35 bg-brand-mint/12 px-3 py-1 font-wedoo-accent text-[0.68rem] uppercase tracking-[0.16em] text-brand-ink">
          profilo candidato
        </div>
        <div className="mt-4 flex flex-col items-center text-center xl:items-start xl:text-left">
          <AppImage
            alt={profile.fullName}
            className="h-20 w-20 rounded-full border border-white/80 object-cover shadow-[0_16px_36px_-28px_rgba(16,25,36,0.2)] md:h-24 md:w-24 xl:h-[124px] xl:w-[124px]"
            priority
            src={assetPath(profile.avatar)}
          />
          <h1 className="mt-4 max-w-[13rem] font-wedoo-heading text-[1.8rem] leading-[0.96] text-black xl:text-[2.15rem]">
            {profile.fullName}
          </h1>
          <p className="mt-2 max-w-[15rem] font-wedoo-accent text-[0.84rem] leading-[1.38] text-slate-600">
            Bacheca piu leggibile, con opportunita e impatto nello stesso ritmo visivo.
          </p>
          <div className="mt-4 grid w-full gap-2.5">
            <div className="rounded-[1rem] border border-brand-mint/25 bg-white/88 px-4 py-3">
              <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">
                4 annunci
              </p>
              <p className="mt-1 font-wedoo-accent text-[0.76rem] leading-[1.35] text-slate-600">
                tono, impatto e chiarezza
              </p>
            </div>
            <div className="rounded-[1rem] border border-brand-mint/25 bg-white/88 px-4 py-3">
              <p className="font-wedoo-heading text-[1.05rem] leading-none text-brand-ink">
                17 SDG
              </p>
              <p className="mt-1 font-wedoo-accent text-[0.76rem] leading-[1.35] text-slate-600">
                leggibili nelle card
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
