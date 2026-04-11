import { documentPath } from "../../lib/site-utils";

export function candidateOnboardingDesktopPct(value: number) {
  return `${(value / 1440) * 100}%`;
}

export function candidateOnboardingPrivacyLink() {
  return documentPath("Informativa privacy per sito.pdf");
}
