import { Link } from "react-router-dom";
import type { JobEntry } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { SdgStrip } from "./sdg-strip";

export function JobCard({ job }: { job: JobEntry }) {
  return (
    <Link
      className="rounded-4xl border border-brand-mint/35 bg-white p-5 transition hover:-translate-y-1 hover:shadow-[0_26px_70px_-45px_rgba(16,25,36,0.65)]"
      to={`/portale/candidato/annuncio/${job.id}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <AppImage
            alt={job.company}
            className="h-14 w-14 rounded-[1.25rem] object-cover"
            src={assetPath(job.logo)}
          />
          <div>
            <h3 className="text-xl">{job.title}</h3>
            <p className="text-sm text-slate-500">{job.company}</p>
          </div>
        </div>
        <AppIcon className="text-xl text-brand-mint-deep" name="bookmark-line" />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.previewTags.map((tag) => (
          <span
            className="rounded-full bg-slate-100 px-3 py-2 text-xs font-medium text-slate-500"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-500">{job.description}</p>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SdgStrip ids={job.sdgs} />
        <span className="text-sm font-semibold text-brand-mint-deep">
          Scopri di piu
        </span>
      </div>
    </Link>
  );
}
