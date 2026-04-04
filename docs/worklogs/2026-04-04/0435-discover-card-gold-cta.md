# 2026-04-04 04:35 - discover-card-gold-cta

- task: estrarre la CTA card "scopri" gialla come variante riusabile
- node: 146:2252
- viewport: desktop e mobile, componente CTA riusato nelle feature card della landing
- files: src/components/public/home/*, tests/e2e/public/landing-page.spec.ts, prd.md
- action: avvio task, letti PRD e policy worklog, discovery Figma completata sul bottone giallo
- figma: nodo `Button` con label `scopri`, radius 8, fill giallo chiaro semi-trasparente, freccia destra; coerente con l'attuale variante `discoverGold`
- tests: `npm run test:e2e -- tests/e2e/public/landing-page.spec.ts`, `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts --update-snapshots`, `npm run test:all`
- note: estrazione prevista come wrapper dedicato sopra una primitiva condivisa per le CTA card, evitando duplicazione tra desktop e mobile

- action: aggiunto `HomeDiscoverGoldButton` e sostituito il markup duplicato della CTA gialla nelle feature card desktop/mobile; riallineata l'icona al chevron del nodo Figma
- files: src/components/public/home/home-discover-gold-button.tsx, src/components/public/home/home-primitives.tsx, src/components/public/home/home-sections.tsx, src/components/public/home/index.ts, tests/e2e/public/landing-page.spec.ts, __screenshots__/chromium-desktop/parity/landing-page.visual.spec.ts/landing-page.png, __screenshots__/chromium-mobile/parity/landing-page.visual.spec.ts/landing-page.png
- issue: il primo assert E2E contava sia la CTA visibile sia quella nascosta nell'altra viewport, perche la landing renderizza entrambe le varianti nel DOM
- resolution: test aggiornato sulla CTA gialla visibile; baseline VRT landing rigenerata solo per il delta intenzionale del nuovo chevron
- github: branch remoto presente (`origin/codex/ralph-loop-bootstrap`), nessuna PR aperta e nessuna check remota da verificare
- status: task chiuso, PRD aggiornato
