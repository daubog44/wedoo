import { knowledgeContent } from "../../data/core";
import type { PortalRole } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { cn } from "../../lib/site-utils";
import { Surface } from "../ui/index";

export function SideKnowledgeRail({ role }: { role: PortalRole }) {
  const cards = knowledgeContent.articles.slice(0, 2);

  return (
    <div className="grid gap-4">
      <Surface
        className={cn(
          role === "candidate" ? "bg-brand-violet text-white" : "bg-brand-mint/25",
        )}
      >
        <p
          className={cn(
            "text-sm font-semibold uppercase tracking-[0.24em]",
            role === "candidate" ? "text-white/70" : "text-brand-mint-deep",
          )}
        >
          Quick context
        </p>
        <h3 className={cn("mt-4 text-2xl", role === "candidate" ? "text-white" : "")}>
          {role === "candidate"
            ? "Leggi gli annunci come se stessi gia scegliendo il tuo prossimo ambiente."
            : "Guarda i profili con il contesto giusto, non solo per keyword."}
        </h3>
        <p
          className={cn(
            "mt-3 text-sm leading-7",
            role === "candidate" ? "text-white/72" : "text-slate-600",
          )}
        >
          Il portale raccoglie informazioni, SDG e dettagli utili in un unico
          spazio, cosi il confronto resta veloce anche da mobile.
        </p>
      </Surface>

      {cards.map((item) => (
        <Surface key={item.id}>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-violet/10 text-brand-violet">
              <AppIcon className="text-2xl" name="book-open-line" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
              Insight
            </p>
          </div>
          <h3 className="mt-4 text-xl">{item.title}</h3>
          <p className="mt-3 text-sm leading-7 text-slate-500">{item.description}</p>
        </Surface>
      ))}
    </div>
  );
}
