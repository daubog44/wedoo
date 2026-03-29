export function RouteLoader() {
  return (
    <div className="section-shell py-14 sm:py-18">
      <div className="section-card overflow-hidden">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-36 rounded-full bg-slate-200" />
          <div className="h-12 w-full max-w-3xl rounded-3xl bg-slate-200" />
          <div className="grid gap-4 md:grid-cols-3">
            <div className="h-28 rounded-[1.75rem] bg-slate-100" />
            <div className="h-28 rounded-[1.75rem] bg-slate-100" />
            <div className="h-28 rounded-[1.75rem] bg-slate-100" />
          </div>
        </div>
      </div>
    </div>
  );
}
