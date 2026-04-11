import type { PortalRole } from "./types";
export { publicHomeFeatureCardsMock as homeFeatureCards } from "./mocks/public-home";

/**
 * Static portal navigation for the demo app.
 * Replace with role-aware navigation metadata only if the backend starts
 * deciding which sections are enabled for a given account.
 */
export const portalNavigation: Record<
  PortalRole,
  Array<{ disabled?: boolean; label: string; to: string }>
> = {
  candidate: [
    { label: "Bacheca annunci", to: "/portale/candidato" },
    { label: "Modifica CV", to: "/portale/candidato/cv" },
    { label: "Articoli", to: "/articoli" },
    { label: "Podcast", to: "/podcast" },
  ],
  company: [
    { label: "bacheca candidati", to: "/portale/azienda" },
    { label: "crea/modifica annuncio", to: "/portale/azienda/annunci" },
    { label: "articoli", to: "/articoli" },
    { label: "podcast", to: "/podcast" },
  ],
};

/**
 * Temporary copy for routes that do not have real editorial content yet.
 */
export const placeholderCopy = {
  articles: {
    description:
      "Nel progetto statico queste voci esistono nella navigazione ma non hanno ancora una pagina dedicata.",
    title: "Articoli in arrivo",
  },
  podcasts: {
    description:
      "Anche questa sezione resta coerente con il prototipo: navigabile, ma ancora non popolata da contenuti reali.",
    title: "Podcast in arrivo",
  },
};
