import type { CompanyDashboardProfile } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

export function CompanyDashboardProfileRail({
  profile,
}: {
  profile: CompanyDashboardProfile;
}) {
  return (
    <aside className="mx-auto w-full max-w-[20rem] xl:sticky xl:top-[7rem] xl:max-w-[20rem]">
      <div className="wedoo-workspace-panel rounded-[1.5rem] p-5">
        <div className="flex h-28 w-28 items-center justify-center rounded-full border border-white/12 bg-white md:h-32 md:w-32">
          <AppImage alt={profile.companyName} className="h-16 w-16 object-contain md:h-20 md:w-20" priority src={assetPath(profile.companyLogo)} />
        </div>
        <span className="mt-5 inline-flex rounded-full border border-[rgba(112,72,232,0.28)] bg-[rgba(112,72,232,0.14)] px-3 py-2 text-[0.68rem] font-wedoo-accent uppercase tracking-[0.18em] text-[var(--wedoo-violet-300)]">
          company profile
        </span>
        <h1 className="mt-5 max-w-[14rem] font-wedoo-heading text-[2.8rem] leading-[0.92] text-[var(--wedoo-workspace-text)]">
          {profile.companyName}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--wedoo-workspace-muted)]">
          Il lato azienda adotta la stessa disciplina del portale candidato: meno pannelli, piu lettura.
        </p>

        <div className="mt-6 grid gap-3">
          <div className="border-t border-white/10 pt-3">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--wedoo-workspace-muted)]">
              pipeline
            </p>
            <p className="mt-2 text-lg text-[var(--wedoo-workspace-text)]">Candidati piu leggibili, meno rumore</p>
          </div>
          <div className="border-t border-white/10 pt-3">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--wedoo-workspace-muted)]">
              next action
            </p>
            <p className="mt-2 text-lg text-[var(--wedoo-workspace-text)]">Apri un profilo e verifica il matching</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
