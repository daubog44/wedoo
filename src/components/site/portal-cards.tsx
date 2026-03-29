import { Link } from "react-router-dom";
import { sdgs } from "../../data/core";
import type { CandidateEntry, JobEntry, PortalRole } from "../../data/types";
import { assetPath, cn } from "../../lib/site-utils";
import { SiteIcon } from "./site-icon";

const boardTheme = {
  candidate: {
    accent: "border-brand-mint",
    button: "border-brand-mint bg-brand-mint text-brand-ink hover:bg-white",
    icon: "text-brand-mint hover:text-brand-violet",
    navText: "text-black",
    pill: "border-brand-mint text-brand-ink hover:bg-brand-mint",
  },
  company: {
    accent: "border-brand-violet",
    button:
      "border-brand-violet bg-brand-violet text-white hover:bg-white hover:text-brand-violet",
    icon: "text-brand-violet hover:text-brand-mint",
    navText: "text-black",
    pill: "border-brand-violet text-brand-ink hover:bg-brand-violet hover:text-white",
  },
} as const;

export function BoardToolbar({ role }: { role: PortalRole }) {
  const theme = boardTheme[role];

  return (
    <div className="mt-3 flex items-center justify-center gap-4">
      <button
        className={cn("text-3xl transition", theme.icon)}
        title="filtra"
        type="button"
      >
        <SiteIcon className="h-8 w-8" name="filter" />
      </button>
      <button
        className={cn("text-3xl transition", theme.icon)}
        title="cerca"
        type="button"
      >
        <SiteIcon className="h-8 w-8" name="search" />
      </button>
    </div>
  );
}

export function SdgIconRow({ ids }: { ids: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      {ids.map((id) => {
        const entry = sdgs[id];
        if (!entry) {
          return null;
        }

        return (
          <img
            alt={entry.label}
            className="h-[75px] w-[75px] rounded-2xl object-cover"
            key={entry.id}
            src={assetPath(entry.icon)}
            title={entry.label}
          />
        );
      })}
    </div>
  );
}

export function JobBoardCard({ job }: { job: JobEntry }) {
  const theme = boardTheme.candidate;

  return (
    <article
      className={cn(
        "wedoo-portal-card rounded-[2.5rem] border-2 p-6",
        theme.accent,
      )}
    >
      <h4 className="text-2xl">{job.title}</h4>
      <div className="mt-4 flex items-center gap-3">
        <img
          alt={job.company}
          className="h-[50px] w-[50px] rounded-full object-cover"
          src={assetPath(job.logo)}
        />
        <h6 className="text-sm font-medium leading-6">
          {job.company}
          <br />
          {job.location}
        </h6>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.previewTags.map((tag) => (
          <span
            className={cn(
              "inline-flex rounded-xl border px-3 py-1.5 text-sm transition",
              theme.pill,
            )}
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <SdgIconRow ids={job.sdgs} />
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SiteIcon
          className="h-8 w-8 text-slate-400 transition hover:text-yellow-400"
          name="star"
        />
        <Link
          className={cn(
            "inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition sm:w-auto sm:min-w-[14rem]",
            theme.button,
          )}
          to={`/portale/candidato/annuncio/${job.id}`}
        >
          scopri di piu
        </Link>
      </div>
    </article>
  );
}

export function CandidateBoardCard({
  candidate,
}: {
  candidate: CandidateEntry;
}) {
  const theme = boardTheme.company;

  return (
    <article
      className={cn(
        "wedoo-portal-card rounded-[2.5rem] border-2 p-6",
        theme.accent,
      )}
    >
      <h4 className="text-2xl">{candidate.name}</h4>
      <div className="mt-4 flex items-center gap-3">
        <img
          alt={candidate.name}
          className="h-[50px] w-[50px] rounded-full object-cover"
          src={assetPath(candidate.avatar)}
        />
        <h6 className="text-sm font-medium leading-6">
          {candidate.status}
          <br />
          {candidate.city}
        </h6>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {candidate.skills.map((skill) => (
          <span
            className={cn(
              "inline-flex rounded-xl border px-3 py-1.5 text-sm transition",
              theme.pill,
            )}
            key={skill}
          >
            {skill}
          </span>
        ))}
      </div>
      <SdgIconRow ids={candidate.sdgs} />
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SiteIcon
          className="h-8 w-8 text-slate-400 transition hover:text-yellow-400"
          name="star"
        />
        <Link
          className={cn(
            "inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition sm:w-auto sm:min-w-[14rem]",
            theme.button,
          )}
          to={`/portale/azienda/candidati/${candidate.id}`}
        >
          scopri di piu
        </Link>
      </div>
    </article>
  );
}
