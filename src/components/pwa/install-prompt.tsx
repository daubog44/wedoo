import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export function InstallPrompt() {
  const { pathname } = useLocation();
  const [dismissed, setDismissed] = useState(false);
  const [promptEvent, setPromptEvent] =
    useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      return;
    }

    function onBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setPromptEvent(event as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstallPrompt);
    };
  }, []);

  const isAuthRoute =
    pathname === "/accedi" || pathname.startsWith("/registrati");

  if (!promptEvent || dismissed || isAuthRoute) {
    return null;
  }

  async function installApp() {
    const installEvent = promptEvent;
    if (!installEvent) {
      return;
    }

    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") {
      setPromptEvent(null);
    }
  }

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-4 z-50 md:inset-x-auto md:right-6 md:w-[24rem]">
      <div className="pointer-events-auto rounded-[2rem] border border-brand-violet-soft bg-white p-4 shadow-[0_20px_60px_rgba(15,23,42,0.18)]">
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-brand-violet">
          Installa Wedoo
        </p>
        <p className="mt-2 text-sm leading-6 text-slate-600">
          Aggiungi il sito alla schermata home per aprirlo come app e usarlo piu
          velocemente da telefono.
        </p>
        <div className="mt-4 flex gap-3">
          <button
            className="inline-flex flex-1 items-center justify-center rounded-xl border border-brand-violet bg-brand-violet px-4 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-brand-ink"
            onClick={installApp}
            type="button"
          >
            Installa
          </button>
          <button
            className="inline-flex items-center justify-center rounded-xl border border-brand-violet-soft bg-white px-4 py-3 text-sm font-semibold text-brand-ink transition hover:bg-brand-violet-soft"
            onClick={() => setDismissed(true)}
            type="button"
          >
            Dopo
          </button>
        </div>
      </div>
    </div>
  );
}
