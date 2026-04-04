# 2026-04-04 03:48 - landing-page

- task: implement landing page baseline
- node: 143:1822
- viewport: desktop
- files: src/components/public/home/*, src/data/mocks/public-home.ts, tests/e2e/public/landing-page.spec.ts
- action: avviata discovery Figma su frame Landing Page 1440x3109 e confronto con implementazione home corrente
- tests: not run yet
- note: il frame attivo e desktop; la review finale dovra verificare anche l'adattamento mobile della route `/`

- action: aggiunto `tests/e2e/public/landing-page.spec.ts` per coprire hero, CTA, feature card, patronage e dialog auth della landing
- files: tests/e2e/public/landing-page.spec.ts, tests/e2e/public/public-routes.spec.ts, tests/fixtures/public-copy.ts
- decision: rimosso lo smoke home dalla suite generica `public-routes` per evitare duplicazioni e usare un test dedicato al frame `143:1822`

- action: riallineato il breakpoint della landing desktop da `1456px` a `1440px` e resa accessibile la modale auth con heading semantico + `aria-labelledby`
- files: src/components/public/home/home-sections.tsx, tests/e2e/parity/landing-page.visual.spec.ts, __screenshots__/chromium-desktop/parity/landing-page.visual.spec.ts/landing-page.png
- tests: npm run test:e2e -- tests/e2e/public/landing-page.spec.ts; npx playwright test tests/e2e/parity/landing-page.visual.spec.ts --update-snapshots; npm run test:all
- decision: la baseline desktop precedente fotografava la variante mobile a `1280px`; la nuova baseline usa viewport desktop `1440px` coerente con Figma
- issue: nessuna PR aperta per `codex/ralph-loop-bootstrap`, quindi nessun check remoto specifico da validare oltre al quality gate locale
