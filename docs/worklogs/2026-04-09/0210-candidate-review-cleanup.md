# 2026-04-09 02:10 - candidate-review-cleanup

- task: review finale del blocco candidato e cleanup del legacy wizard config
- node: 281:1207, 280:1079, 280:860, 280:951
- viewport: desktop come riferimento Figma per i modal frame; verifica anche mobile via suite Playwright esistente
- files: .codexpotter/projects/2026/04/09/1/MAIN.md, src/data/forms.ts, src/pages/public/candidate-wizard-page.tsx, tests/integration/auth-view-model.test.ts
- discovery: gli screenshot Figma confermano gli step 2-5 implementati; in review stretta resta nel dominio candidato il vecchio step 2 generico dentro `candidateForms`, ormai irraggiungibile ma ancora presente con copy corrotta e CTA obsolete
- decision: rimuovere il config legacy non piu usato e lasciare esplicito solo il config reale dello step 1 candidato, riallineando i test al consumer effettivo
- implementation: introdotti `candidateRegistrationForm` in `src/data/forms.ts`, consumer step `1` semplificato in `src/pages/public/candidate-wizard-page.tsx`, rimossi `createCandidateRegistrationWizardSteps` e `candidateWizardSteps` non piu usati
- tests: `npm run test:all`
- result: quality gate verde; aggiunto controllo E2E su `/registrati/candidato/1` dal flusso pubblico per evitare regressioni sul consumer della route
