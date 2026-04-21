import { useId } from "react";
import { cn } from "../../../lib/site-utils";

function AuthCheckIcon() {
  return (
    <svg aria-hidden="true" className="h-[13px] w-[15px]" viewBox="0 0 15 13">
      <path
        d="M1 7.1L5.1 11L14 1.5"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

export function AuthCheckbox({
  checked,
  className,
  compact = false,
  label,
  linkHref,
  linkLabel,
  onCheckedChange,
}: {
  checked: boolean;
  className?: string;
  compact?: boolean;
  label: string;
  linkHref?: string;
  linkLabel?: string;
  onCheckedChange: (nextValue: boolean) => void;
}) {
  const labelId = useId();

  function handleToggle() {
    onCheckedChange(!checked);
  }

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <button
        aria-checked={checked}
        aria-labelledby={labelId}
        className={cn(
          "grid h-[23px] w-[23px] shrink-0 place-items-center rounded-[4px] border transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wedoo-violet)]",
          checked
            ? "border-[var(--wedoo-violet)] bg-[var(--wedoo-violet)] text-[var(--wedoo-white-soft)]"
            : "border-[var(--wedoo-line-strong)] bg-[var(--wedoo-input-bg)] text-transparent",
        )}
        onClick={handleToggle}
        role="checkbox"
        type="button"
      >
        <AuthCheckIcon />
      </button>
      <span
        className={cn(
          "font-wedoo-body text-[var(--wedoo-ink)]",
          compact ? "text-[18px] leading-none" : "text-[22px] leading-none",
        )}
        id={labelId}
      >
        <button
          className="text-left transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wedoo-violet)]"
          onClick={handleToggle}
          type="button"
        >
          {label}
        </button>
        {linkHref && linkLabel ? (
          <>
            {" "}
            <a
              className="underline transition hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--wedoo-violet)]"
              href={linkHref}
              rel="noreferrer"
              target="_blank"
            >
              {linkLabel}
            </a>
          </>
        ) : null}
      </span>
    </div>
  );
}
