import { NavLink } from "react-router-dom";
import type { CandidateJobDetailResponse, CompanyJobPreviewResponse } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import type { MajesticonName } from "../../lib/majesticons-map";
import { assetPath, cn } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { Button } from "../ui/actions";
import { Surface } from "../ui/surfaces";

type JobDetailResponse = CandidateJobDetailResponse | CompanyJobPreviewResponse;
type JobDetailDockTone = "candidate" | "company";

type JobDetailResetShellProps = {
  closeLabel: string;
  dataAttribute: string;
  detail: JobDetailResponse;
  dockLabel: string;
  dockTone: JobDetailDockTone;
  onCancel: () => void;
  onClose: () => void;
  onPrimary?: () => void;
  onSaveDraft: () => void;
};

const dockItems = {
  candidate: [
    { ariaLabel: "Apri dashboard candidato", icon: "home-line" as MajesticonName, kind: "link" as const, to: "/portale/candidato" },
    { ariaLabel: "Salvataggi in arrivo", icon: "star-line" as MajesticonName, kind: "button" as const },
    { ariaLabel: "Chat in arrivo", icon: "chats-line" as MajesticonName, kind: "button" as const },
    { ariaLabel: "Apri profilo candidato", icon: "user-line" as MajesticonName, kind: "link" as const, to: "/portale/candidato/cv" },
  ],
  company: [
    { ariaLabel: "Apri dashboard azienda", icon: "home-line" as MajesticonName, kind: "link" as const, to: "/portale/azienda" },
    { ariaLabel: "Preferiti azienda in arrivo", icon: "star-line" as MajesticonName, kind: "button" as const },
    { ariaLabel: "Chat recruiter in arrivo", icon: "chats-line" as MajesticonName, kind: "button" as const },
    { ariaLabel: "Annunci azienda in arrivo", icon: "briefcase-line" as MajesticonName, kind: "button" as const },
    { ariaLabel: "Profilo azienda in arrivo", icon: "user-line" as MajesticonName, kind: "button" as const },
  ],
};

function JobDetailEditor({
  body,
  toolbarLabel,
}: {
  body: string;
  toolbarLabel: string;
}) {
  return (
    <div className="overflow-hidden rounded-[1.6rem] border border-[var(--wedoo-line)] bg-[rgba(248,250,252,0.92)]">
      <div className="flex items-center gap-4 border-b border-[var(--wedoo-line)] px-4 py-3 text-sm text-[var(--wedoo-ink-muted)]">
        <span className="font-semibold text-[var(--wedoo-ink-strong)]">G</span>
        <span className="italic text-[var(--wedoo-ink-strong)]">C</span>
        <span className="underline text-[var(--wedoo-ink-strong)]">S</span>
        <span>{toolbarLabel}</span>
        <AppIcon className="ml-auto h-4 w-4" name="list-box-line" />
      </div>
      <div className="px-4 py-5 text-sm leading-7 text-[var(--wedoo-ink-muted)] sm:px-6 sm:text-[0.98rem]">
        <p>{body}</p>
      </div>
    </div>
  );
}

function JobDetailList({
  items,
}: {
  items: readonly string[];
}) {
  return (
    <ul className="space-y-3 text-sm leading-7 text-[var(--wedoo-ink-muted)] sm:text-[0.98rem]">
      {items.map((item) => (
        <li className="flex gap-3" key={item}>
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--wedoo-violet)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function JobDetailDock({
  label,
  tone,
}: {
  label: string;
  tone: JobDetailDockTone;
}) {
  return (
    <nav
      aria-label={label}
      className="mt-6 flex items-center justify-between rounded-[1.5rem] border border-white/12 bg-[rgba(9,14,24,0.96)] px-4 py-3"
    >
      {dockItems[tone].map((item) =>
        item.kind === "link" ? (
          <NavLink
            aria-label={item.ariaLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
            key={item.ariaLabel}
            to={item.to}
          >
            <AppIcon className="h-5 w-5" name={item.icon} />
          </NavLink>
        ) : (
          <button
            aria-label={item.ariaLabel}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
            key={item.ariaLabel}
            type="button"
          >
            <AppIcon className="h-5 w-5" name={item.icon} />
          </button>
        ),
      )}
    </nav>
  );
}

function JobDetailContent({
  detail,
  isMobile,
  onCancel,
  onPrimary,
  onSaveDraft,
}: {
  detail: JobDetailResponse;
  isMobile: boolean;
  onCancel: () => void;
  onPrimary?: () => void;
  onSaveDraft: () => void;
}) {
  return (
    <div className={cn("grid gap-5", !isMobile && "xl:grid-cols-[minmax(0,1.08fr)_21.5rem] xl:items-start")}>
      <div className="space-y-5">
        <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(145deg,rgba(13,18,30,0.98),rgba(26,34,52,0.94))] p-6 text-white shadow-[0_34px_90px_-58px_rgba(0,0,0,0.72)]">
          <div className={cn("grid gap-6", !isMobile && "lg:grid-cols-[7rem_minmax(0,1fr)] lg:items-start")}>
            <div className="flex h-24 w-24 items-center justify-center rounded-[1.6rem] border border-white/10 bg-white/95 shadow-[0_18px_40px_-28px_rgba(255,255,255,0.4)]">
              <AppImage
                alt={detail.company.name}
                className="h-12 w-12 object-contain"
                priority
                src={assetPath(detail.company.logo)}
              />
            </div>
            <div className="space-y-5">
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/46">job preview</p>
                <h1 className={cn("font-wedoo-heading leading-[0.88] text-white", isMobile ? "text-[2rem]" : "text-[3.4rem]")}>
                  {detail.title}
                </h1>
                <p className="font-wedoo-accent text-[1.15rem] text-white/74">Settore: {detail.company.sectorLabel}</p>
              </div>
              <p className="max-w-3xl text-sm leading-7 text-white/68 sm:text-[0.98rem]">{detail.contactLine}</p>
              <div className="flex flex-wrap gap-3">
                <Button className="min-h-[3.25rem] min-w-[12rem]" tone="ghost">
                  {detail.ctas.certificationsLabel}
                </Button>
                <Button className="min-h-[3.25rem] min-w-[8.75rem]" tone="ghost">
                  {detail.ctas.contactLabel}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className={cn("grid gap-5", !isMobile && "lg:grid-cols-2")}>
          <Surface>
            <p className="wedoo-kicker">{detail.sections.summaryTitle}</p>
            <h2 className="mt-4 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">Il ruolo in breve</h2>
            <div className="mt-5">
              <JobDetailList items={detail.sections.summaryItems} />
            </div>
          </Surface>

          <Surface className="bg-[linear-gradient(180deg,rgba(244,241,255,0.95),rgba(255,255,255,0.92))]">
            <p className="wedoo-kicker">{detail.skills.hardTitle}</p>
            <h2 className="mt-4 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">Competenze richieste</h2>
            <div className="mt-5 space-y-5">
              <JobDetailList items={detail.skills.hardItems} />
              <div className="h-px bg-[var(--wedoo-line)]" />
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--wedoo-ink-muted)]">{detail.skills.softTitle}</p>
                <div className="mt-3">
                  <JobDetailList items={detail.skills.softItems} />
                </div>
              </div>
            </div>
          </Surface>
        </div>

        <Surface>
          <p className="wedoo-kicker">{detail.sections.companyTitle}</p>
          <h2 className="mt-4 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">Perche questo brand e credibile</h2>
          <div className="mt-5">
            <JobDetailEditor body={detail.sections.companyBody} toolbarLabel={detail.editorToolbarLabel} />
          </div>
        </Surface>

        <Surface>
          <p className="wedoo-kicker">{detail.sections.offerTitle}</p>
          <h2 className="mt-4 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">Cosa include l'offerta</h2>
          <div className="mt-5">
            <JobDetailList items={detail.sections.offerItems} />
          </div>
        </Surface>

        <Surface>
          <p className="wedoo-kicker">{detail.sections.descriptionTitle}</p>
          <h2 className="mt-4 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">Dettaglio operativo</h2>
          <div className="mt-5">
            <JobDetailEditor body={detail.sections.descriptionBody} toolbarLabel={detail.editorToolbarLabel} />
          </div>
        </Surface>
      </div>

      <div className="space-y-5">
        <Surface className="bg-[linear-gradient(180deg,rgba(247,248,252,0.96),rgba(255,255,255,0.96))]">
          <p className="wedoo-kicker">company</p>
          <h2 className="mt-4 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">{detail.company.name}</h2>
          <p className="mt-4 text-sm leading-7 text-[var(--wedoo-ink-muted)]">{detail.requirementsLabel}</p>
          <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--wedoo-ink-muted)]">
            {detail.footnotes.map((note) => (
              <p key={note}>{note}</p>
            ))}
          </div>
        </Surface>

        <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,14,24,0.96),rgba(19,27,42,0.94))] p-6 text-white shadow-[0_34px_90px_-64px_rgba(0,0,0,0.54)]">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">actions</p>
          <h2 className="mt-4 text-2xl leading-tight text-white">Scegli il prossimo passo</h2>
          <div className="mt-6 grid gap-3">
            <Button className="min-h-[3.4rem] w-full" onClick={onPrimary} tone="violet">
              {detail.ctas.primaryLabel}
            </Button>
            <Button className="min-h-[3.25rem] w-full" onClick={onSaveDraft} tone="ghost">
              {detail.ctas.saveDraftLabel}
            </Button>
            <Button className="min-h-[3.25rem] w-full" onClick={onCancel} tone="ghost">
              {detail.ctas.cancelLabel}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function JobDetailResetShell({
  closeLabel,
  dataAttribute,
  detail,
  dockLabel,
  dockTone,
  onCancel,
  onClose,
  onPrimary,
  onSaveDraft,
}: JobDetailResetShellProps) {
  return (
    <>
      <section className="hidden lg:block" {...{ [dataAttribute]: "desktop" }}>
        <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-8 pb-8 pt-7 shadow-[0_48px_120px_-72px_rgba(0,0,0,0.85)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/42">Wedoo workspace</p>
              <p className="mt-2 text-sm text-white/58">{detail.company.name}</p>
            </div>
            <button
              aria-label={closeLabel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition hover:bg-white/10"
              onClick={onClose}
              type="button"
            >
              <AppIcon className="h-5 w-5" name="close-line" />
            </button>
          </div>
          <JobDetailContent detail={detail} isMobile={false} onCancel={onCancel} onPrimary={onPrimary} onSaveDraft={onSaveDraft} />
        </div>
      </section>

      <section className="lg:hidden" {...{ [dataAttribute]: "mobile" }}>
        <div className="mx-auto max-w-[390px] px-4 pb-6 pt-4">
          <div className="rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-4 pb-4 pt-4 shadow-[0_40px_100px_-70px_rgba(0,0,0,0.8)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Wedoo workspace</p>
              <button
                aria-label={closeLabel}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72"
                onClick={onClose}
                type="button"
              >
                <AppIcon className="h-5 w-5" name="close-line" />
              </button>
            </div>
            <JobDetailContent detail={detail} isMobile onCancel={onCancel} onPrimary={onPrimary} onSaveDraft={onSaveDraft} />
            <JobDetailDock label={dockLabel} tone={dockTone} />
          </div>
        </div>
      </section>
    </>
  );
}
