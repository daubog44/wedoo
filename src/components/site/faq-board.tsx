import { useState } from "react";
import type { FaqGroup } from "../../data/types";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "./site-icon";

const toneMap = {
  gold: {
    answer: "bg-brand-lavender-100",
    shell: "bg-brand-lavender-300",
  },
  mint: {
    answer: "bg-brand-lavender-100",
    shell: "bg-brand-lavender-200",
  },
  violet: {
    answer: "bg-brand-lavender-100",
    shell: "bg-brand-lavender-300",
  },
} as const;

export function FaqBoard({ groups }: { groups: readonly FaqGroup[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-[28px] border border-brand-lavender-200/80">
      {groups.map((group) => {
        const tone = toneMap[group.tone];

        return (
          <section
            className="border-b border-brand-lavender-100 last:border-b-0"
            key={group.id}
          >
            <div className="grid md:grid-cols-[270px_minmax(0,1fr)]">
              <div
                className={cn(
                  "flex items-center px-6 py-8 text-[26px] leading-none text-brand-ink md:justify-center md:px-8 md:text-[34px]",
                  "font-wedoo-accent font-bold",
                  tone.shell,
                )}
              >
                {group.label}
              </div>
              <div className={cn("grid", tone.shell)}>
                {group.items.map((item, index) => {
                  const itemId = `${group.id}-${index}`;
                  const isOpen = openId === itemId;

                  return (
                    <div
                      className="border-t border-brand-lavender-100 first:border-t-0"
                      key={itemId}
                    >
                      <button
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left md:px-8 md:py-7"
                        onClick={() =>
                          setOpenId((current) => (current === itemId ? null : itemId))
                        }
                        type="button"
                      >
                        <span className="font-wedoo-heading text-[24px] leading-[1.12] text-brand-ink md:text-[33px]">
                          {item.question}
                        </span>
                        <SiteIcon
                          className={cn(
                            "h-7 w-7 shrink-0 text-brand-ink transition-transform md:h-9 md:w-9",
                            isOpen && "rotate-180",
                          )}
                          name="chevron-down"
                        />
                      </button>
                      {isOpen ? (
                        <div
                          className={cn(
                            "px-6 pb-6 pt-0 md:px-8 md:pb-8",
                            tone.answer,
                          )}
                        >
                          <p className="max-w-[820px] text-base leading-7 text-slate-700 md:text-lg md:leading-8">
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
