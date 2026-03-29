import { knowledgeContent } from "../../data/core";
import type { KnowledgeKind } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { Button, SectionIntro, Surface } from "../ui/index";

export function KnowledgeGrid({ kind }: { kind: KnowledgeKind }) {
  const items = knowledgeContent[kind];
  const copy =
    kind === "articles"
      ? {
          eyebrow: "Articoli",
          title:
            "Contenuti editoriali per leggere meglio annunci, employer branding e onboarding.",
        }
      : {
          eyebrow: "Podcast",
          title:
            "Conversazioni brevi su primi ruoli, recruiting e impatto raccontato bene.",
        };

  return (
    <div className="section-shell space-y-8 pb-12">
      <section className="section-card">
        <SectionIntro
          description="Le sezioni contenuto diventano parte attiva del prodotto: non riempitivi, ma supporto pratico per chi legge annunci o vuole pubblicarli meglio."
          eyebrow={copy.eyebrow}
          title={copy.title}
        />
      </section>
      <section className="grid gap-6 lg:grid-cols-3">
        {items.map((item) => (
          <Surface className="flex h-full flex-col" key={item.id}>
            <div className="flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-brand-violet/10 text-brand-violet">
              <AppIcon
                className="text-3xl"
                name={kind === "articles" ? "book-open-line" : "microphone-line"}
              />
            </div>
            <h3 className="mt-5 text-2xl">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              {item.description}
            </p>
            <div className="mt-auto pt-6">
              <Button tone={kind === "articles" ? "violet" : "mint"}>
                Apri scheda
              </Button>
            </div>
          </Surface>
        ))}
      </section>
    </div>
  );
}
