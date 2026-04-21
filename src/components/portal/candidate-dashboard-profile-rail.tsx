import type { CandidateDashboardProfile } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";

export function CandidateDashboardProfileRail({
  profile,
}: {
  profile: CandidateDashboardProfile;
}) {
  return (
    <aside className="mx-auto w-full max-w-[20rem] xl:sticky xl:top-[7rem] xl:max-w-[20rem]">
      <div className="wedoo-workspace-panel rounded-[1.5rem] p-5">
        <AppImage
          alt={profile.fullName}
          className="h-28 w-28 rounded-full border border-white/12 object-cover md:h-32 md:w-32"
          priority
          src={assetPath(profile.avatar)}
        />
        <span className="mt-5 inline-flex rounded-full border border-[rgba(87,215,180,0.28)] bg-[rgba(87,215,180,0.12)] px-3 py-2 text-[0.68rem] font-wedoo-accent uppercase tracking-[0.18em] text-[var(--wedoo-mint)]">
          profile
        </span>
        <h1 className="mt-5 max-w-[12rem] font-wedoo-heading text-[2.8rem] leading-[0.92] text-[var(--wedoo-workspace-text)]">
          {profile.fullName}
        </h1>
        <p className="mt-4 text-sm leading-7 text-[var(--wedoo-workspace-muted)]">
          Il profilo resta nello stesso workspace delle opportunita: meno rottura tra rail, lista e dettaglio.
        </p>

        <div className="mt-6 grid gap-3">
          <div className="border-t border-white/10 pt-3">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--wedoo-workspace-muted)]">
              match state
            </p>
            <p className="mt-2 text-lg text-[var(--wedoo-workspace-text)]">Curated and readable</p>
          </div>
          <div className="border-t border-white/10 pt-3">
            <p className="text-[0.68rem] uppercase tracking-[0.18em] text-[var(--wedoo-workspace-muted)]">
              next action
            </p>
            <p className="mt-2 text-lg text-[var(--wedoo-workspace-text)]">Apri un annuncio e valuta il fit reale</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
