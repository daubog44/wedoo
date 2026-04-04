# 2026-04-04 04:38 - discover-card-violet-cta

- task: estrarre la CTA card "scopri" lilla come variante riusabile
- node: 222:540
- viewport: desktop e mobile, componente CTA riusato nelle feature card della landing
- files: src/components/public/home/*, tests/e2e/public/landing-page.spec.ts, prd.md
- action: avvio task e discovery Figma completata sul bottone lilla
- figma: stessa geometria delle CTA gold/rose, con fill lilla pieno e chevron destro
- tests: `npm run test:e2e -- tests/e2e/public/landing-page.spec.ts`, `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts --update-snapshots`, `npm run test:all`
- note: completo il trio discover della landing con un terzo wrapper dedicato, mantenendo commit separato dal successivo task sull'icona smartphone

- action: aggiunto `HomeDiscoverVioletButton` e sostituito la CTA lilla nelle feature card desktop/mobile; estesa la suite E2E con un assert puntuale sulla route FAQ `#dubbi`
- files: src/components/public/home/home-discover-violet-button.tsx, src/components/public/home/home-sections.tsx, src/components/public/home/index.ts, tests/e2e/public/landing-page.spec.ts, __screenshots__/chromium-desktop/parity/landing-page.visual.spec.ts/landing-page.png, __screenshots__/chromium-mobile/parity/landing-page.visual.spec.ts/landing-page.png
- issue: anche questo task generava il delta VRT atteso sulla sola CTA aggiornata
- resolution: baseline landing aggiornata dopo verifica locale del gate verde; nessuna PR aperta o check remota aggiuntiva da verificare
- status: task chiuso, PRD aggiornato
