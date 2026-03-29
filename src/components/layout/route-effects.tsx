import { useEffect, useEffectEvent } from "react";
import { useLocation } from "react-router-dom";

export function RouteEffects() {
  const location = useLocation();

  const syncScroll = useEffectEvent(() => {
    if (location.hash) {
      const target = document.getElementById(location.hash.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.scrollTo({ behavior: "auto", top: 0 });
  });

  useEffect(() => {
    syncScroll();
  }, [location.hash, location.pathname]);

  return null;
}
