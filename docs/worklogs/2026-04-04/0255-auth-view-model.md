# 2026-04-04 02:55 - auth-view-model

- task: Definire `AuthViewModel` per login, registrazione e stati errore
- node: n/a
- files: src/data/auth.ts, src/data/forms.ts, tests/integration/auth-view-model.test.ts
- action: avviata analisi dei flow auth correnti basati su `FormPageConfig`
- tests: `npm run test:integration -- auth-view-model`, `npm run typecheck`, `npm run lint`
- note: creato `src/data/auth.ts` con `AuthViewModel` e stato `missing-fields`; `forms.ts` deriva ora login e prime registrazioni dai view model centralizzati senza toccare gli step successivi
