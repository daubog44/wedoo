import { useState } from "react";
import type { FaqGroup } from "../../data/types";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "./site-icon";

const toneMap = {
  gold: {
    left: "bg-brand-lavender-400",
    right: "bg-brand-lavender-400",
  },
  mint: {
    left: "bg-brand-lavender-300",
    right: "bg-brand-lavender-300",
  },
  violet: {
    left: "bg-brand-violet-soft",
    right: "bg-brand-violet-soft",
  },
} as const;

export function FaqBoard({ groups }: { groups: readonly FaqGroup[] }) {
  const [openId, setOpenId] = useState<string | null>(`${groups[0]?.id}-0`);

  return (
    <div className="flex flex-col">
      {groups.map((group) => {
        const tone = toneMap[group.tone];

        return (
          <div className="grid overflow-hidden md:grid-cols-[1fr_2fr]" key={group.id}>
            <div className={cn("flex items-center justify-center px-6 py-8 text-center text-xl font-bold", tone.left)}>
              <b>{group.label.toLowerCase()}</b>
            </div>
            <div className="bg-brand-rose-50">
              {group.items.map((item, index) => {
                const itemId = `${group.id}-${index}`;
                const isOpen = openId === itemId;

                return (
                  <div key={itemId}>
                    <button
                      className={cn(
                        "flex w-full items-center justify-between px-5 py-4 text-left text-base transition",
                        tone.right,
                      )}
                      onClick={() => setOpenId((current) => (current === itemId ? null : itemId))}
                      type="button"
                    >
                      <span>{item.question.toLowerCase()}</span>
                      <SiteIcon
                        className="h-5 w-5"
                        name={isOpen ? "chevron-up" : "chevron-down"}
                      />
                    </button>
                    {isOpen ? (
                      <div className="bg-brand-rose-50 px-5 py-4 text-sm leading-7 text-slate-700">{item.answer}</div>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
