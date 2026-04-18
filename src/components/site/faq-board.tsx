import { useState } from "react";
import type { FaqGroup } from "../../data/types";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "./site-icon";

const toneMap = {
  gold: {
    accent: "text-brand-violet",
    pill: "bg-brand-gold/28 text-brand-ink",
    shell: "bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,244,255,0.88))]",
  },
  mint: {
    accent: "text-brand-mint-deep",
    pill: "bg-brand-mint/28 text-brand-mint-deep",
    shell: "bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(238,253,247,0.88))]",
  },
  violet: {
    accent: "text-brand-violet",
    pill: "bg-brand-violet/10 text-brand-violet",
    shell: "bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,245,251,0.92))]",
  },
} as const;

export function FaqBoard({ groups }: { groups: readonly FaqGroup[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="grid gap-4">
      {groups.map((group) => {
        const tone = toneMap[group.tone];

        return (
          <section
            className={cn(
              "rounded-[1.4rem] border border-black/6 p-3 shadow-[0_18px_42px_-34px_rgba(16,25,36,0.18)] sm:p-4",
              tone.shell,
            )}
            key={group.id}
          >
            <div className="grid gap-3 lg:grid-cols-[180px_minmax(0,1fr)] lg:items-start">
              <div className="px-2 py-2 lg:px-3 lg:py-3">
                <span
                  className={cn(
                    "inline-flex rounded-full px-3 py-1.5 font-wedoo-accent text-[0.78rem] uppercase tracking-[0.16em]",
                    tone.pill,
                  )}
                >
                  {group.label}
                </span>
              </div>

              <div className="grid gap-2">
                {group.items.map((item, index) => {
                  const itemId = `${group.id}-${index}`;
                  const isOpen = openId === itemId;

                  return (
                    <div
                      className="rounded-[1rem] border border-black/6 bg-white/82 overflow-hidden"
                      key={itemId}
                    >
                      <button
                        aria-expanded={isOpen}
                        className="flex w-full items-start justify-between gap-4 px-4 py-4 text-left sm:px-5"
                        onClick={() =>
                          setOpenId((current) => (current === itemId ? null : itemId))
                        }
                        type="button"
                      >
                        <span className="max-w-[42rem] text-[1rem] leading-[1.3] text-brand-ink sm:text-[1.18rem]">
                          {item.question}
                        </span>
                        <SiteIcon
                          className={cn(
                            "mt-0.5 h-5 w-5 shrink-0 transition-transform sm:h-6 sm:w-6",
                            tone.accent,
                            isOpen && "rotate-180",
                          )}
                          name="chevron-down"
                        />
                      </button>

                      {isOpen ? (
                        <div className="border-t border-black/6 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                          <p className="max-w-[52rem] text-[0.92rem] leading-6 text-slate-600 sm:text-[0.98rem]">
                            {item.answer}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
