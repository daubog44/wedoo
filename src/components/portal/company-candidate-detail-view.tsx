import { NavLink } from "react-router-dom";
import type { CompanyCandidateDetailResponse } from "../../data/types";
import { AppIcon } from "../../lib/icons";
import { assetPath } from "../../lib/site-utils";
import { AppImage } from "../media/app-image";
import { Button } from "../ui/actions";
import { Surface } from "../ui/surfaces";

function CandidateDetailList({
  items,
}: {
  items: readonly string[];
}) {
  return (
    <ul className="space-y-3 text-sm leading-7 text-[var(--wedoo-ink-muted)] sm:text-[0.98rem]">
      {items.map((item) => (
        <li className="flex gap-3" key={item}>
          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--wedoo-mint-700)]" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CandidateDetailEditor({
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

function CompanyCandidateDock({ label }: { label: string }) {
  return (
    <nav
      aria-label={label}
      className="mt-6 flex items-center justify-between rounded-[1.5rem] border border-white/12 bg-[rgba(9,14,24,0.96)] px-4 py-3"
    >
      <NavLink
        aria-label="Apri dashboard azienda"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        to="/portale/azienda"
      >
        <AppIcon className="h-5 w-5" name="home-line" />
      </NavLink>
      <button
        aria-label="Candidati salvati in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="star-line" />
      </button>
      <button
        aria-label="Chat recruiter in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="chats-line" />
      </button>
      <button
        aria-label="Messaggi recruiter in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="mail-line" />
      </button>
      <button
        aria-label="Profilo azienda in arrivo"
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/76"
        type="button"
      >
        <AppIcon className="h-5 w-5" name="user-line" />
      </button>
    </nav>
  );
}

function CompanyCandidateHero({ detail }: { detail: CompanyCandidateDetailResponse }) {
  return (
    <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(145deg,rgba(13,18,30,0.98),rgba(26,34,52,0.94))] p-6 text-white shadow-[0_34px_90px_-58px_rgba(0,0,0,0.72)]">
      <div className="grid gap-6 lg:grid-cols-[8rem_minmax(0,1fr)] lg:items-start">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/95">
          <AppImage
            alt={detail.candidate.fullName}
            className="h-32 w-32 object-cover"
            priority
            src={assetPath(detail.candidate.avatar)}
          />
        </div>
        <div className="space-y-5">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/46">candidate review</p>
            <h1 className="font-wedoo-heading text-[2.4rem] leading-[0.88] text-white sm:text-[3.2rem]">
              {detail.candidate.fullName}
            </h1>
            <p className="font-wedoo-accent text-[1.15rem] text-white/74">{detail.candidate.statusLabel}</p>
          </div>

          <div className="space-y-3 text-sm leading-7 text-white/68 sm:text-[0.98rem]">
            {detail.contactItems.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompanyCandidateSections({ detail }: { detail: CompanyCandidateDetailResponse }) {
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <Surface>
        <p className="wedoo-kicker">{detail.sections.descriptionTitle}</p>
        <h2 className="mt-4 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">Profilo personale</h2>
        <div className="mt-5">
          <CandidateDetailEditor body={detail.sections.descriptionBody} toolbarLabel={detail.editorToolbarLabel} />
        </div>
      </Surface>

      <Surface className="bg-[linear-gradient(180deg,rgba(238,255,249,0.9),rgba(255,255,255,0.95))]">
        <p className="wedoo-kicker">availability</p>
        <h2 className="mt-4 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">{detail.availabilityLabel}</h2>
        <p className="mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-[var(--wedoo-ink-muted)]">
          {detail.sections.certificationsTitle}
        </p>
        <div className="mt-5 space-y-5">
          <CandidateDetailList items={detail.sections.certificationsItems} />
          <Button className="min-h-[3.2rem] min-w-[13rem]" tone="mint">
            {detail.ctas.certificationLabel}
          </Button>
        </div>
      </Surface>

      <Surface>
        <p className="wedoo-kicker">{detail.sections.educationTitle}</p>
        <CandidateDetailList items={detail.sections.educationItems} />
      </Surface>

      <Surface>
        <p className="wedoo-kicker">{detail.sections.experienceTitle}</p>
        <CandidateDetailList items={detail.sections.experienceItems} />
      </Surface>

      <Surface>
        <p className="wedoo-kicker">{detail.sections.softSkillsTitle}</p>
        <CandidateDetailList items={detail.sections.softSkillItems} />
      </Surface>

      <Surface>
        <p className="wedoo-kicker">{detail.sections.hardSkillsTitle}</p>
        <CandidateDetailList items={detail.sections.hardSkillItems} />
      </Surface>
    </div>
  );
}

export function CompanyCandidateDetailView({
  detail,
  onCancel,
  onClose,
  onSaveDraft,
}: {
  detail: CompanyCandidateDetailResponse;
  onCancel: () => void;
  onClose: () => void;
  onSaveDraft: () => void;
}) {
  return (
    <>
      <section className="hidden lg:block" data-company-candidate-detail-layout="desktop">
        <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-8 pb-8 pt-7 shadow-[0_48px_120px_-72px_rgba(0,0,0,0.85)]">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/42">Wedoo recruiter review</p>
            <button
              aria-label={detail.ctas.closeLabel}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72 transition hover:bg-white/10"
              onClick={onClose}
              type="button"
            >
              <AppIcon className="h-5 w-5" name="close-line" />
            </button>
          </div>

          <div className="grid gap-5 xl:grid-cols-[minmax(0,1.08fr)_22rem]">
            <div className="space-y-5">
              <CompanyCandidateHero detail={detail} />
              <CompanyCandidateSections detail={detail} />
              <Surface>
                <p className="text-sm leading-7 text-[var(--wedoo-ink-muted)]">{detail.footnote}</p>
              </Surface>
            </div>

            <div className="space-y-5">
              <Surface className="bg-[linear-gradient(180deg,rgba(247,248,252,0.96),rgba(255,255,255,0.96))]">
                <p className="wedoo-kicker">availability</p>
                <h2 className="mt-4 text-2xl leading-tight text-[var(--wedoo-ink-strong)]">Profilo pronto al contatto</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--wedoo-ink-muted)]">
                  {detail.availabilityLabel}. Profilo pronto per un primo colloquio, con informazioni essenziali leggibili in pochi secondi.
                </p>
              </Surface>

              <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,14,24,0.96),rgba(19,27,42,0.94))] p-6 text-white shadow-[0_34px_90px_-64px_rgba(0,0,0,0.54)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">actions</p>
                <h2 className="mt-4 text-2xl leading-tight text-white">Gestisci il contatto</h2>
                <div className="mt-6 grid gap-3">
                  <Button className="min-h-[3.4rem] w-full" tone="mint">
                    {detail.ctas.primaryLabel}
                  </Button>
                  <Button className="min-h-[3.25rem] w-full" tone="ghost">
                    {detail.ctas.resumeLabel}
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
        </div>
      </section>

      <section className="lg:hidden" data-company-candidate-detail-layout="mobile">
        <div className="mx-auto max-w-[390px] px-4 pb-6 pt-4">
          <div className="rounded-[1.9rem] border border-white/8 bg-[linear-gradient(180deg,#050913,#0d1524)] px-4 pb-4 pt-4 shadow-[0_40px_100px_-70px_rgba(0,0,0,0.8)]">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/42">Wedoo recruiter review</p>
              <button
                aria-label={detail.ctas.closeLabel}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/72"
                onClick={onClose}
                type="button"
              >
                <AppIcon className="h-5 w-5" name="close-line" />
              </button>
            </div>

            <div className="space-y-5">
              <CompanyCandidateHero detail={detail} />
              <CompanyCandidateSections detail={detail} />
              <Surface>
                <p className="text-sm leading-7 text-[var(--wedoo-ink-muted)]">{detail.footnote}</p>
              </Surface>
              <div className="overflow-hidden rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(9,14,24,0.96),rgba(19,27,42,0.94))] p-6 text-white shadow-[0_34px_90px_-64px_rgba(0,0,0,0.54)]">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/45">actions</p>
                <h2 className="mt-4 text-2xl leading-tight text-white">Gestisci il contatto</h2>
                <div className="mt-6 grid gap-3">
                  <Button className="min-h-[3.4rem] w-full" tone="mint">
                    {detail.ctas.primaryLabel}
                  </Button>
                  <Button className="min-h-[3.25rem] w-full" tone="ghost">
                    {detail.ctas.resumeLabel}
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

            <CompanyCandidateDock label={detail.mobileDockLabel} />
          </div>
        </div>
      </section>
    </>
  );
}
