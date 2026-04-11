import { documentPath } from "../../lib/site-utils";

export const companyWizardDesktopPct = (value: number) => `${(value / 1440) * 100}%`;

export function companyWizardPrivacyLink() {
  return documentPath("Informativa privacy per sito.pdf");
}
