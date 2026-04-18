export function RouteLoader() {
  return (
    <div className="section-shell py-12 sm:py-16" data-testid="route-loader">
      <div className="section-card overflow-hidden bg-[linear-gradient(165deg,rgba(255,255,255,0.96),rgba(248,245,237,0.92))]">
        <div className="animate-pulse space-y-5">
          <div className="h-3 w-24 rounded-full bg-brand-violet/12" />
          <div className="h-10 w-full max-w-xl rounded-[1.1rem] bg-slate-200/72" />
          <div className="grid gap-4 md:grid-cols-[1.08fr_0.92fr]">
            <div className="h-40 rounded-[1.2rem] bg-slate-100" />
            <div className="grid gap-3">
              <div className="h-20 rounded-[1.1rem] bg-white/78" />
              <div className="grid gap-3 md:grid-cols-2">
                <div className="h-[4.5rem] rounded-[1rem] bg-white/78" />
                <div className="h-[4.5rem] rounded-[1rem] bg-white/78" />
                <div className="h-[4.5rem] rounded-[1rem] bg-white/78" />
                <div className="h-[4.5rem] rounded-[1rem] bg-white/78" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
