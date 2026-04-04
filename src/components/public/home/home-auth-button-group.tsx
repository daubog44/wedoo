import type { PublicHomeNavigationCopy } from "../../../data/mocks/public-home";
import { cn } from "../../../lib/site-utils";
import { HomeButton } from "./home-primitives";

export function HomeAuthButtonGroup({
  className,
  navigation,
  onOpenAuth,
}: {
  className?: string;
  navigation: PublicHomeNavigationCopy;
  onOpenAuth: (intent: "login" | "signup") => void;
}) {
  return (
    <div
      aria-label="Azioni autenticazione home"
      className={cn("flex w-full gap-4", className)}
      role="group"
    >
      <HomeButton
        className="h-[49px] min-w-0 flex-1 rounded-[8px] px-0 text-[24px] leading-[normal] hover:-translate-y-0"
        onClick={() => onOpenAuth("login")}
        variant="authSecondary"
      >
        {navigation.signInLabel}
      </HomeButton>
      <HomeButton
        className="h-[49px] min-w-0 flex-1 rounded-[8px] px-0 text-[24px] leading-[normal] hover:-translate-y-0"
        onClick={() => onOpenAuth("signup")}
        variant="authPrimary"
      >
        {navigation.signUpLabel}
      </HomeButton>
    </div>
  );
}
