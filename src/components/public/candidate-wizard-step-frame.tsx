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
    <main className="bg-brand-page px-4 py-8 sm:px-6 md:py-12">
      <section
        className="mx-auto w-full max-w-[650px] bg-brand-page p-4 sm:p-5 md:p-10"
        data-node-id={dataNodeId}
        data-testid={testId}
      >
        <div
          className={cn(
            "bg-brand-mint-50 px-5 py-6 md:px-[30px] md:pt-[23px] md:pb-[40px]",
            panelClassName,
          )}
        >
          <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-start gap-2 md:grid-cols-[3rem_1fr_3rem] md:gap-4">
            <div aria-hidden className="h-10 w-10 md:h-12 md:w-12" />
            <h1 className="pt-0.5 text-center font-wedoo-accent text-[2rem] font-normal leading-none text-black md:text-[2.25rem]">
              {title}
            </h1>
            <Link
              aria-label={closeLabel}
              className="inline-flex h-10 w-10 items-center justify-center justify-self-end rounded-full text-brand-ink transition hover:bg-white/40 md:h-12 md:w-12"
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
