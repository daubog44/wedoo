import { useState } from "react";
import type { FaqGroup } from "../../data/types";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "./site-icon";

const toneMap = {
  gold: {
    accent: "text-[var(--wedoo-gold-700)]",
    shell: "bg-[var(--wedoo-gold-soft)]",
  },
  mint: {
    accent: "text-[var(--wedoo-mint-700)]",
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
    <div className="overflow-hidden rounded-[1.75rem] border border-[var(--wedoo-line)] bg-white/86 shadow-[0_26px_70px_-58px_rgba(15,23,40,0.28)]">
      {groups.map((group, groupIndex) => {
        const tone = toneMap[group.tone];

        return (
          <section className={cn(groupIndex > 0 && "border-t border-[var(--wedoo-line)]")} key={group.id}>
            <div className="grid md:grid-cols-[15rem_minmax(0,1fr)]">
              <div className={cn("flex items-center px-5 py-5 text-[1.85rem] leading-none md:px-7 md:text-[2.2rem]", "font-wedoo-accent font-bold", tone.shell, tone.accent)}>
                {group.label}
              </div>
              <div className="grid">
                {group.items.map((item, index) => {
                  const itemId = `${group.id}-${index}`;
                  const isOpen = openId === itemId;

                  return (
                    <div className={cn(index > 0 && "border-t border-[var(--wedoo-line)]")} key={itemId}>
                      <button
                        aria-expanded={isOpen}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition hover:bg-[var(--wedoo-surface-2)] md:px-7 md:py-6"
                        onClick={() => setOpenId((current) => (current === itemId ? null : itemId))}
                        type="button"
                      >
                        <span className="font-wedoo-heading text-[1.55rem] leading-[1.06] text-[var(--wedoo-ink-strong)] md:text-[2rem]">
                          {item.question}
                        </span>
                        <SiteIcon
                          className={cn("h-6 w-6 shrink-0 text-[var(--wedoo-ink-muted)] transition-transform md:h-8 md:w-8", isOpen && "rotate-180")}
                          name="chevron-down"
                        />
                      </button>
                      {isOpen ? (
                        <div className="border-t border-[var(--wedoo-line)] px-5 py-5 md:px-7 md:py-6">
                          <p className="max-w-[52rem] text-base leading-7 text-[var(--wedoo-ink-muted)] md:text-lg md:leading-8">
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
