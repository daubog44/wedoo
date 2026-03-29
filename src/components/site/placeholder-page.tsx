import type { ReactNode } from "react";
import { PageSection, SiteFooter, TopLogoBar } from "./branding";
import { SiteIcon } from "./site-icon";

export function PlaceholderPage({
  description,
  title,
}: {
  description: ReactNode;
  title: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-brand-page">
      <TopLogoBar />
      <PageSection className="py-16">
        <div className="rounded-[2rem] border-2 border-dashed border-brand-violet-soft px-6 py-12 text-center">
          <SiteIcon
            className="mx-auto h-12 w-12 text-brand-violet"
            name="document"
          />
          <h2 className="mt-4 text-4xl">{title}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-slate-600">
            {description}
          </p>
        </div>
      </PageSection>
      <SiteFooter />
    </div>
  );
}
