import { useState } from "react";
import { faqGroups } from "../../data/core";
import { AppIcon } from "../../lib/icons";
import { cn } from "../../lib/site-utils";
import { SectionIntro, Surface } from "../ui/index";

export function FaqSection() {
  const [openFaq, setOpenFaq] = useState<string | null>(
    faqGroups[0]?.items[0]?.question ?? null,
  );

  return (
    <section className="space-y-6" id="dubbi">
      <SectionIntro
        align="center"
        description="Le FAQ servono a chiarire annunci, verifica delle aziende e logica di matching senza nascondersi dietro parole vaghe."
        eyebrow="Dubbi? Le FAQ aiutano"
        title="Risposte brevi alle domande che contano davvero"
      />
      <div className="grid gap-6 xl:grid-cols-[0.34fr_0.66fr]">
        <Surface className="space-y-4">
          {faqGroups.map((group) => (
            <button
              className={cn(
                "flex w-full items-center justify-between rounded-3xl px-4 py-4 text-left transition",
                group.tone === "mint"
                  ? "bg-brand-mint/20 hover:bg-brand-mint/30"
                  : group.tone === "gold"
                    ? "bg-brand-gold/35 hover:bg-brand-gold/50"
                    : "bg-brand-violet/10 hover:bg-brand-violet/20",
              )}
              key={group.id}
              onClick={() => setOpenFaq(group.items[0]?.question ?? null)}
              type="button"
            >
              <span className="font-semibold text-brand-ink">
                {group.label}
              </span>
              <AppIcon
                className="text-lg text-slate-500"
                name="chevron-right-line"
              />
            </button>
          ))}
        </Surface>

        <div className="grid gap-4">
          {faqGroups.flatMap((group) =>
            group.items.map((item) => {
              const isOpen = openFaq === item.question;

              return (
                <div
                  className={cn(
                    "rounded-[1.75rem] border p-5 transition",
                    isOpen
                      ? "border-brand-violet/30 bg-white shadow-[0_24px_60px_-40px_rgba(16,25,36,0.45)]"
                      : "border-slate-200 bg-white/75",
                  )}
                  key={item.question}
                >
                  <button
                    className="flex w-full items-start justify-between gap-4 text-left"
                    onClick={() => setOpenFaq(isOpen ? null : item.question)}
                    type="button"
                  >
                    <span className="text-lg font-semibold text-brand-ink">
                      {item.question}
                    </span>
                    <AppIcon
                      className={cn(
                        "mt-1 text-xl text-slate-400 transition-transform",
                        isOpen && "rotate-90 text-brand-violet",
                      )}
                      name="chevron-right-line"
                    />
                  </button>
                  {isOpen ? (
                    <p className="mt-4 text-sm leading-7 text-slate-500">
                      {item.answer}
                    </p>
                  ) : null}
                </div>
              );
            }),
          )}
        </div>
      </div>
    </section>
  );
}
