import { AppIcon } from "../../lib/icons";
import { cn } from "../../lib/site-utils";
import { useWedooTheme } from "../../theme/wedoo-theme";

export function WedooThemeToggle({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  const { theme, toggleTheme } = useWedooTheme();
  const isDark = theme === "dark";
  const nextThemeLabel = isDark ? "chiaro" : "scuro";

  return (
    <button
      aria-label={`Attiva tema ${nextThemeLabel}`}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border border-[var(--wedoo-toggle-border)] bg-[var(--wedoo-toggle-bg)] text-[var(--wedoo-toggle-text)] shadow-[var(--wedoo-toggle-shadow)] transition hover:-translate-y-0.5 hover:border-[var(--wedoo-toggle-border-strong)] hover:bg-[var(--wedoo-toggle-bg-hover)]",
        compact ? "h-[2rem] min-w-[5rem] px-2.5 text-[0.76rem]" : "h-[2.35rem] min-w-[6.6rem] px-3.5 text-[0.82rem]",
        className,
      )}
      data-testid="wedoo-theme-toggle"
      onClick={toggleTheme}
      type="button"
    >
      <AppIcon className="h-4 w-4 shrink-0" name={isDark ? "moon-line" : "lightbulb-shine-line"} />
      <span className="font-wedoo-accent leading-none">{isDark ? "scuro" : "chiaro"}</span>
    </button>
  );
}
