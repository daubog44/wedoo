# 2026-04-04 04:28 - discover-card-rose-cta

- task: estrarre la CTA card "scopri" rosa come variante riusabile
- node: 222:529
- viewport: desktop e mobile, componente CTA riusato nelle feature card della landing
- files: src/components/public/home/*, tests/e2e/public/landing-page.spec.ts, prd.md
- action: avvio task e discovery Figma completata sul bottone rosa
- figma: stessa geometria della CTA gold, con fill rosa semitrasparente, bordo rosa chiaro e chevron destro
- tests: `npm run test:e2e -- tests/e2e/public/landing-page.spec.ts`, `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts --update-snapshots`, `npm run test:all`
- note: riuso il pattern del task gold con wrapper dedicato, senza fondere gia la CTA lilla nel medesimo commit

- action: aggiunto `HomeDiscoverRoseButton` e sostituito la CTA rosa nelle feature card desktop/mobile; estesa la suite E2E con un assert puntuale sulla card `17 Obiettivi per il futuro`
- files: src/components/public/home/home-discover-rose-button.tsx, src/components/public/home/home-sections.tsx, src/components/public/home/index.ts, tests/e2e/public/landing-page.spec.ts, __screenshots__/chromium-desktop/parity/landing-page.visual.spec.ts/landing-page.png, __screenshots__/chromium-mobile/parity/landing-page.visual.spec.ts/landing-page.png
- issue: la VRT landing ha rilevato il delta intenzionale del nuovo chevron rosa, identico al caso gold
- resolution: baseline landing aggiornata solo dopo conferma che il cambiamento era confinato alla CTA rosa; nessuna PR aperta o check remota aggiuntiva da verificare
- status: task chiuso, PRD aggiornato
