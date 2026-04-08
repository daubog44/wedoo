# 2026-04-09 00:26 - candidate-education

- task: implementare `pop up formazione`
- node: 280:1079
- viewport: desktop confermato dal frame `650x2169`; la resa reale è una vista verticale lunga che su mobile va semplicemente impilata, non centrata come canvas desktop
- files: src/components/public/candidate-education-step.tsx, src/components/public/candidate-contacts-step.tsx, src/pages/public/candidate-wizard-page.tsx, src/data/candidate-profile.ts, tests/e2e/wizards/candidate-education.spec.ts, tests/e2e/wizards/candidate-contacts.spec.ts, tests/integration/candidate-profile-draft.test.ts, tests/fixtures/public-copy.ts
- figma: pannello mint lungo con summary per titolo/campo/istituto/attività/corsi, select anno `da/ad`, sezione Erasmus guidata da helper copy e blocco `project work` con toolbar visuale
- audit: la route `/registrati/candidato/3` ricadeva ancora sul form generico di step `1`; mismatch totale sia su desktop sia su mobile
- decision: introdurre uno step dedicato `/registrati/candidato/3`, aggiornare il flow del frame contatti verso questo step e mantenere `salva` di formazione verso `/portale/candidato` finché gli step successivi non esistono
- implementation: esteso `CandidateEducationDraftEntry` con degree type, activities, Erasmus, project work e corsi specifici; aggiunto `CandidateEducationStep` con select grandi, select anno compatti, helper contestuali, toolbar `project work` e save finale
- tests: `npx eslint src/components/public/candidate-contacts-step.tsx src/components/public/candidate-education-step.tsx src/pages/public/candidate-wizard-page.tsx src/data/candidate-profile.ts tests/e2e/wizards/candidate-contacts.spec.ts tests/e2e/wizards/candidate-education.spec.ts tests/integration/candidate-profile-draft.test.ts tests/fixtures/public-copy.ts`, `npx vitest run tests/integration/candidate-profile-draft.test.ts tests/integration/mock-services.test.ts`, `npx playwright test tests/e2e/wizards/candidate-education.spec.ts --project=chromium-desktop --project=chromium-mobile`, `npm run test:all`
- visual-review: screenshot desktop e mobile di `/registrati/candidato/3` confermano lunghezza coerente, assenza di overflow e toolbar `project work` leggibile; verificato anche che `/registrati/candidato/2` navighi ora correttamente allo step `3`
- status: task frame formazione pronto; PRD aggiornato anche per il test E2E formazione già coperto
