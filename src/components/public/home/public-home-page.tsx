import { useEffect, useState } from "react";
import type { PublicHomeContent } from "../../../data/mocks/public-home";
import {
  DesktopHomePage,
  HomeAuthDialog,
  type HomeAuthIntent,
  MobileHomePage,
} from "./home-sections";

export function PublicHomePage({ content }: { content: PublicHomeContent }) {
  const [authIntent, setAuthIntent] = useState<HomeAuthIntent | null>(null);

  useEffect(() => {
    if (!authIntent) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setAuthIntent(null);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [authIntent]);

  return (
    <div className="min-h-screen bg-[var(--wedoo-page-bg)] text-[var(--wedoo-ink)]">
      <MobileHomePage content={content} onOpenAuth={setAuthIntent} />
      <DesktopHomePage content={content} onOpenAuth={setAuthIntent} />
      <HomeAuthDialog
        intent={authIntent}
        navigation={content.navigation}
        onClose={() => setAuthIntent(null)}
      />
    </div>
  );
}
