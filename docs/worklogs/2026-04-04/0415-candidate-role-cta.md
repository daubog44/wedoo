# 2026-04-04 04:15 - candidate-role-cta

- task: estrarre la CTA ruolo candidato come variante secondaria menta
- node: 144:1944
- viewport: desktop
- files: src/components/public/home/*, tests/e2e/public/landing-page.spec.ts, prd.md
- action: avvio sessione, raccolta contesto locale e apertura nodo Figma per allineare stile, misure e riuso
- tests: non ancora eseguiti
- note: il worktree contiene modifiche non correlate; il task resta confinato alla landing pubblica

- action: letto Figma `144:1944`; bottone desktop `189x60`, radius `8`, fill `#69F2C4`, label Ubuntu regular `24px`, nessun bordo
- files: src/components/public/home/home-candidate-role-button.tsx, src/components/public/home/home-sections.tsx, src/components/public/home/index.ts, tests/e2e/public/landing-page.spec.ts, prd.md
- decision: estratto wrapper dedicato `HomeCandidateRoleButton` sopra `HomeRouteButton` per centralizzare route e variante menta senza anticipare il task separato della CTA azienda viola
- tests: `npx playwright test tests/e2e/public/landing-page.spec.ts`
- review: suite verde su desktop e mobile; il branch locale e tracciato su `origin/codex/ralph-loop-bootstrap` ma non ha PR aperta, quindi nessuna check CI specifica da verificare in questa chiusura
