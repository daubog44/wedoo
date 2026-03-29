import type { CandidateEntry } from "../../data/types";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { Button, Surface } from "../ui/index";
import { SdgStrip } from "./sdg-strip";

export function ProfileDetail({
  candidate,
  variant,
}: {
  candidate: CandidateEntry;
  variant: "candidate" | "company";
}) {
  return (
    <div className="grid gap-6">
      <Surface>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            <AppImage
              alt={candidate.name}
              className="h-20 w-20 rounded-[1.8rem] object-cover"
              src={assetPath(candidate.avatar)}
            />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-400">
                {variant === "candidate" ? "Anteprima del mio CV" : "Profilo candidato"}
              </p>
              <h1 className="mt-2 text-3xl">
                {candidate.name} - {candidate.status}
              </h1>
              <p className="mt-2 text-sm leading-7 text-slate-500">{candidate.summary}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button tone="ghost">Visualizza certificazioni</Button>
            {variant === "company" ? (
              <Button tone="ghost">CV</Button>
            ) : (
              <Button tone="ghost">Contatta</Button>
            )}
          </div>
        </div>
        <div className="mt-6">
          <SdgStrip ids={candidate.sdgs} />
        </div>
      </Surface>

      <div className="grid gap-6 xl:grid-cols-[0.45fr_0.55fr]">
        <Surface>
          <h3 className="text-2xl">Info</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-500">
            <li>{candidate.city}</li>
            <li>{candidate.email}</li>
            <li>{candidate.phone}</li>
          </ul>
          <h3 className="mt-8 text-2xl">Formazione</h3>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-500">
            {candidate.education.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Surface>

        <Surface>
          <h3 className="text-2xl">Descrizione personale</h3>
          <p className="mt-4 text-sm leading-8 text-slate-500">{candidate.bio}</p>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-lg">Hard skills</h4>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-500">
                {candidate.hardSkills.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg">Soft skills</h4>
              <ul className="mt-3 space-y-3 text-sm leading-7 text-slate-500">
                {candidate.softSkills.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {variant === "candidate" ? (
              <>
                <Button tone="ghost">Modifica</Button>
                <Button tone="mint">Pubblica</Button>
              </>
            ) : (
              <Button tone="violet">Contatta</Button>
            )}
          </div>
        </Surface>
      </div>
    </div>
  );
}
