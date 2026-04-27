import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/site-utils";
import { SiteIcon } from "../site";

type CandidateWizardStepFrameProps = {
  children: ReactNode;
  closeHref: string;
  closeLabel: string;
  contentClassName?: string;
  dataNodeId: string;
  panelClassName?: string;
  testId: string;
  title: string;
};

export function CandidateWizardStepFrame({
  children,
  closeHref,
  closeLabel,
  contentClassName,
  dataNodeId,
  panelClassName,
  testId,
  title,
}: CandidateWizardStepFrameProps) {
  return (
    <main className="wedoo-workspace min-h-screen bg-[var(--wedoo-workspace-bg)] px-4 py-8 sm:px-6 md:py-12">
      <section
        className="mx-auto w-full max-w-[760px] p-2 sm:p-4 md:p-8"
        data-node-id={dataNodeId}
        data-testid={testId}
      >
        <div
          className={cn(
            "wedoo-theme-shell rounded-[2.2rem] px-5 py-6 md:px-[30px] md:pt-[23px] md:pb-[40px]",
            panelClassName,
          )}
        >
          <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-start gap-2 md:grid-cols-[3rem_1fr_3rem] md:gap-4">
            <div aria-hidden className="h-10 w-10 md:h-12 md:w-12" />
            <h1 className="pt-0.5 text-center font-wedoo-heading text-[2rem] leading-none text-[var(--wedoo-workspace-text)] md:text-[2.25rem]">
              {title}
            </h1>
            <Link
              aria-label={closeLabel}
              className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full border border-[var(--wedoo-toggle-border)] bg-[var(--wedoo-toggle-bg)] text-[var(--wedoo-toggle-text)] transition hover:border-[var(--wedoo-violet)] hover:text-[var(--wedoo-violet)] md:h-12 md:w-12"
              to={closeHref}
            >
              <SiteIcon className="h-10 w-10 md:h-12 md:w-12" name="close" />
            </Link>
          </div>

          <div className={cn("mt-6 md:mt-[30px]", contentClassName)}>{children}</div>
        </div>
      </section>
    </main>
  );
}
