import { impactCards } from "../../data/core";
import { assetPath } from "../../lib/site-utils";
import { ButtonLink, PreviewFrame, SectionIntro, Surface } from "../ui/index";

export function ImpactStoriesSection() {
  return (
    <section className="space-y-6">
      <SectionIntro
        align="center"
        description="Le tre storie centrali del brand restano identiche alla bozza: origine del progetto, lettura degli SDG e FAQ costruite per togliere ambiguita."
        eyebrow="Manifesto Wedoo"
        title="Tre sezioni chiave, piu ordine e piu presenza visiva"
      />
      <div className="grid gap-6 lg:grid-cols-3">
        {impactCards.map((card) => (
          <Surface className="flex h-full flex-col gap-5" key={card.label}>
            <PreviewFrame
              alt={card.label}
              className="aspect-[16/10]"
              src={assetPath(card.image)}
            />
            <div className="space-y-3">
              <h3 className="text-2xl">{card.label}</h3>
              <p className="text-sm leading-7 text-slate-500">
                {card.description}
              </p>
            </div>
            <div className="mt-auto">
              <ButtonLink
                className="w-full sm:w-auto"
                to={card.href}
                tone={
                  card.tone === "gold"
                    ? "gold"
                    : card.tone === "rose"
                      ? "mint"
                      : "violet"
                }
              >
                Vai alla sezione
              </ButtonLink>
            </div>
          </Surface>
        ))}
      </div>
    </section>
  );
}
