# 2026-04-04 04:24 - company-role-cta

- task: estrarre la CTA ruolo azienda come variante secondaria viola
- node: 144:1949
- viewport: desktop
- files: src/components/public/home/*, tests/e2e/public/landing-page.spec.ts, prd.md
- action: avvio sessione successiva dopo chiusura CTA candidato; in coda anche la correzione del tracking accidentale di `.codexpotter`
- tests: non ancora eseguiti
- note: il task resta confinato alla sezione how-it-works della landing

- action: letto Figma `144:1949`; bottone desktop `189x60`, radius `8`, fill `#7447E1`, bordo scuro `1px`, label Ubuntu regular `24px`, testo chiaro
- files: src/components/public/home/home-company-role-button.tsx, src/components/public/home/home-sections.tsx, src/components/public/home/index.ts, prd.md
- decision: estratto wrapper dedicato `HomeCompanyRoleButton` simmetrico alla CTA candidato per centralizzare route `/azienda` e variante `roleCompany` senza toccare i token base del primitive layer
- tests: `npx playwright test tests/e2e/public/landing-page.spec.ts`
- review: suite verde su desktop e mobile; nessuna PR aperta sul branch `codex/ralph-loop-bootstrap`
