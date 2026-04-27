import { useState } from "react";
import type { FaqGroup } from "../../data/types";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "./site-icon";

const toneMap = {
  gold: {
    accent: "text-[var(--wedoo-gold)]",
    shell: "bg-[var(--wedoo-gold-soft)]",
  },
  mint: {
    accent: "text-[var(--wedoo-mint)]",
    shell: "bg-[var(--wedoo-surface-mint)]",
  },
  violet: {
    accent: "text-[var(--wedoo-violet)]",
    shell: "bg-[var(--wedoo-surface-violet)]",
  },
} as const;

export function FaqBoard({ groups }: { groups: readonly FaqGroup[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--wedoo-panel-border)] bg-[var(--wedoo-surface-1)] shadow-[var(--wedoo-panel-shadow)]">
      {groups.map((group, groupIndex) => {
        const tone = toneMap[group.tone];

        return (
          <section className={cn(groupIndex > 0 && "border-t border-[var(--wedoo-line)]")} key={group.id}>
            <div className="grid md:grid-cols-[15rem_minmax(0,1fr)]">
              <div
                className={cn(
                  "flex items-start px-5 py-5 text-[1.2rem] leading-[1.05] md:px-7 md:py-6 md:text-[1.55rem]",
                  "font-wedoo-accent font-bold",
                  tone.shell,
                  tone.accent,
                )}
              >
                {group.label}
              </div>
              <div className="grid min-w-0">
                {group.items.map((item, index) => {
                  const itemId = `${group.id}-${index}`;
                  const isOpen = openId === itemId;

                  return (
                    <div
                      className={cn(
                        index > 0 && "border-t border-[var(--wedoo-line)]",
                        isOpen && "bg-[var(--wedoo-surface-2)]",
                      )}
                      key={itemId}
                    >
                      <button
                        aria-expanded={isOpen}
                        className="flex w-full min-w-0 items-start justify-between gap-4 px-5 py-5 text-left transition hover:bg-[var(--wedoo-surface-2)] md:px-7 md:py-6"
                        onClick={() => setOpenId((current) => (current === itemId ? null : itemId))}
                        type="button"
                      >
                        <span className="min-w-0 pr-2 font-wedoo-heading text-[1.12rem] leading-[1.28] text-[var(--wedoo-ink-strong)] md:text-[1.35rem]">
                          {item.question}
                        </span>
                        <SiteIcon
                          className={cn("h-6 w-6 shrink-0 text-[var(--wedoo-ink-muted)] transition-transform md:h-8 md:w-8", isOpen && "rotate-180")}
                          name="chevron-down"
                        />
                      </button>
                      {isOpen ? (
                        <div className="border-t border-[var(--wedoo-line)] px-5 py-5 md:px-7 md:py-6">
                          <p className="max-w-[52rem] text-base leading-8 text-[var(--wedoo-ink-muted)] md:text-lg md:leading-9">
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
