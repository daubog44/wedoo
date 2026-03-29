import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/site-utils";
import { SdgIconRow } from "./portal-cards";

const toneMap = {
  mint: {
    action:
      "border-brand-mint-deep bg-brand-mint-deep text-white hover:bg-brand-mint hover:text-brand-ink",
    outline: "border-brand-mint-deep text-brand-ink hover:bg-brand-mint-deep",
    section: "border-brand-mint-deep bg-brand-mint-50",
    shell: "bg-brand-mint-50",
  },
  violet: {
    action: "border-brand-violet bg-brand-violet text-white hover:bg-brand-violet-600",
    outline: "border-brand-violet text-brand-ink hover:bg-brand-violet hover:text-white",
    section: "border-brand-violet bg-brand-lavender-50",
    shell: "bg-brand-lavender-50",
  },
} as const;

export function DetailCard({
  children,
  tone,
}: {
  children: ReactNode;
  tone: keyof typeof toneMap;
}) {
  return (
    <div className={cn("rounded-2xl p-5 md:p-8", toneMap[tone].shell)}>
      {children}
    </div>
  );
}

export function DetailActionLink({
  children,
  className,
  to,
  tone,
  variant = "action",
}: {
  children: ReactNode;
  className?: string;
  to?: string;
  tone: keyof typeof toneMap;
  variant?: "action" | "outline";
}) {
  const sharedClassName = cn(
    "inline-flex min-w-[12.7rem] items-center justify-center rounded-xl border px-4 py-3 text-sm font-semibold transition",
    variant === "action" ? toneMap[tone].action : toneMap[tone].outline,
    className,
  );

  if (!to) {
    return (
      <button className={sharedClassName} type="button">
        {children}
      </button>
    );
  }

  return (
    <Link className={sharedClassName} to={to}>
      {children}
    </Link>
  );
}

export function DetailSection({
  children,
  title,
  tone,
}: {
  children: ReactNode;
  title: ReactNode;
  tone: keyof typeof toneMap;
}) {
  return (
    <div className="mt-6">
      <h5
        className={cn(
          "rounded-2xl border-2 border-dotted px-4 py-3 text-lg",
          toneMap[tone].section,
        )}
      >
        {title}
      </h5>
      <div className="px-2 py-3 text-sm leading-7 text-slate-700">
        {children}
      </div>
    </div>
  );
}

export function DetailBulletList({ items }: { items: string[] }) {
  return (
    <ul className="list-disc space-y-1 pl-5">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function DetailGoalRow({ ids }: { ids: string[] }) {
  return (
    <div className="mt-6 flex justify-center">
      <SdgIconRow ids={ids} />
    </div>
  );
}
