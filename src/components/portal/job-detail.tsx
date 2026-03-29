import type { JobEntry } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { Button, Surface } from "../ui/index";
import { SdgStrip } from "./sdg-strip";

export function JobDetail({
  job,
  variant,
}: {
  job: JobEntry;
  variant: "candidate" | "company";
}) {
  return (
    <div className="grid gap-6">
      <Surface>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            <AppImage
              alt={job.company}
              className="h-20 w-20 rounded-[1.8rem] object-cover"
              src={assetPath(job.logo)}
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                {variant === "candidate"
                  ? "Dettaglio annuncio"
                  : "Preview annuncio"}
              </p>
              <h1 className="mt-2 text-3xl">
                {job.title} - {job.company}
              </h1>
              <p className="mt-2 text-sm leading-7 text-slate-500">
                Per maggiori informazioni: {job.contact.name},{" "}
                {job.contact.email}, {job.contact.phone}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button tone="ghost">Visualizza certificazioni</Button>
            <Button tone="ghost">Contatta</Button>
            {variant === "company" ? (
              <Button tone="ghost">Modifica</Button>
            ) : null}
          </div>
        </div>
        <div className="mt-6">
          <SdgStrip ids={job.sdgs} />
        </div>
      </Surface>

      <div className="grid gap-6 xl:grid-cols-[0.4fr_0.6fr]">
        <Surface>
          <h3 className="text-2xl">Riassunto offerta</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-500">
            <li>{job.location}</li>
            <li>{job.schedule}</li>
            <li>{job.salary}</li>
            <li>{job.contract}</li>
            {job.summary.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="mt-8 text-2xl">Dettagli azienda</h3>
          <div className="mt-4 space-y-4 text-sm leading-8 text-slate-500">
            {job.companyDetails.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Surface>

        <Surface>
          <h3 className="text-2xl">Job description</h3>
          <p className="mt-4 text-sm leading-8 text-slate-500">
            {job.description}
          </p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-lg">Hard skills</h4>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-500">
                {job.hardSkills.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg">Soft skills</h4>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-500">
                {job.softSkills.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 rounded-3xl bg-slate-100 p-4 text-sm font-medium text-slate-600">
            {job.requirements}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {variant === "candidate" ? (
              <Button tone="mint">Candidati</Button>
            ) : (
              <>
                <Button tone="ghost">Salva bozza</Button>
                <Button tone="violet">Pubblica</Button>
              </>
            )}
          </div>
        </Surface>
      </div>
    </div>
  );
}
