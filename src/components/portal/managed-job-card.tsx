import type { JobEntry } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { Button, ButtonLink, Surface } from "../ui/index";

export function ManagedJobCard({ job }: { job: JobEntry }) {
  return (
    <Surface className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <AppImage
            alt={job.company}
            className="h-14 w-14 rounded-[1.25rem] object-cover"
            src={assetPath(job.logo)}
          />
          <div>
            <h3 className="text-2xl">{job.title}</h3>
            <p className="text-sm text-slate-500">{job.company}</p>
          </div>
        </div>
        <span className="rounded-full bg-brand-violet/10 px-3 py-2 text-xs font-semibold text-brand-violet">
          Pubblicato
        </span>
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
      <div className="mt-auto flex flex-wrap gap-3 pt-6">
        <ButtonLink to={`/portale/azienda/annunci/${job.id}`} tone="ghost">
          Apri preview
        </ButtonLink>
        <Button tone="violet">Modifica</Button>
      </div>
    </Surface>
  );
}
