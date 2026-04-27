import type { CompanyDashboardProfile } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

export function CompanyDashboardProfileRail({
  compact = false,
  profile,
}: {
  compact?: boolean;
  profile: CompanyDashboardProfile;
}) {
  if (compact) {
    return (
      <aside className="rounded-[1.1rem] border border-[var(--wedoo-workspace-line)] bg-[var(--wedoo-workspace-surface)] p-3.5 shadow-[var(--wedoo-workspace-card-shadow)]">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[0.9rem] border border-white/10 bg-white">
            <AppImage alt={profile.companyName} className="h-8 w-8 object-contain" priority src={assetPath(profile.companyLogo)} />
          </div>
          <div className="min-w-0">
            <p className="text-[0.62rem] font-semibold uppercase tracking-normal text-[var(--wedoo-violet-300)]">
              Company profile
            </p>
            <h2 className="mt-1 truncate text-lg leading-tight text-[var(--wedoo-workspace-text)]">
              {profile.companyName}
            </h2>
            <p className="mt-1 text-sm leading-5 text-[var(--wedoo-workspace-muted)]">
              Pipeline candidati attiva
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="mx-auto w-full max-w-[18.5rem] xl:sticky xl:top-[6.4rem]">
      <div className="wedoo-workspace-panel rounded-[1.25rem] p-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-[1.2rem] border border-white/12 bg-white">
          <AppImage alt={profile.companyName} className="h-12 w-12 object-contain" priority src={assetPath(profile.companyLogo)} />
        </div>
        <span className="mt-4 inline-flex rounded-full border border-[rgba(112,72,232,0.28)] bg-[rgba(112,72,232,0.14)] px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-normal text-[var(--wedoo-violet-300)]">
          company profile
        </span>
        <h2 className="mt-4 max-w-[13rem] text-[2rem] leading-[1.02] text-[var(--wedoo-workspace-text)]">
          {profile.companyName}
        </h2>
        <p className="mt-3 text-sm leading-6 text-[var(--wedoo-workspace-muted)]">
          Profilo e candidati restano nello stesso contesto, senza pannelli dominanti.
        </p>

        <div className="mt-5 grid gap-3">
          <div className="rounded-[1rem] border border-white/10 bg-white/4 px-3 py-3">
            <p className="text-[0.68rem] uppercase tracking-normal text-[var(--wedoo-workspace-muted)]">
              pipeline
            </p>
            <p className="mt-1 text-base leading-6 text-[var(--wedoo-workspace-text)]">Candidati leggibili</p>
          </div>
          <div className="rounded-[1rem] border border-white/10 bg-white/4 px-3 py-3">
            <p className="text-[0.68rem] uppercase tracking-normal text-[var(--wedoo-workspace-muted)]">
              next action
            </p>
            <p className="mt-1 text-base leading-6 text-[var(--wedoo-workspace-text)]">Apri il matching</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
