# 2026-04-09 01:16 - candidate-skills

- task: implementare `pop up competenze`
- node: 280:951
- route: /registrati/candidato/5
- viewport: desktop confermato dal frame `650x839`; su mobile il pannello va semplicemente impilato, senza riusare il canvas auth esistente
- figma: card interna compatta con heading `soft skills` e `hard skills`, liste puntate testuali, due select `scegli` e CTA finale `salva`
- audit: la route `/registrati/candidato/5` ricade ancora sul form generico di registrazione; mismatch totale sia desktop sia mobile con screenshot locali `artifacts/tmp-candidate-skills-before-desktop.png` e `artifacts/tmp-candidate-skills-before-mobile.png`
- decision: introdotto uno step dedicato `/registrati/candidato/5`, riallineato il save dello step esperienze verso questo frame e mantenuto `salva` competenze verso `/portale/candidato` come uscita finale del wizard disponibile
- implementation: riallineato `CandidateSkillsDraft` ai valori Figma per `softSkills` e `hardSkills`, aggiunti cataloghi select dedicati e costruito `CandidateSkillsStep` con card interna, liste formattate e due select accessibili
- tests: `npx eslint src/components/public/candidate-skills-step.tsx src/data/candidate-profile.ts src/pages/public/candidate-wizard-page.tsx tests/e2e/wizards/candidate-work-experience.spec.ts tests/e2e/wizards/candidate-skills.spec.ts tests/fixtures/public-copy.ts tests/integration/candidate-profile-draft.test.ts`, `npx vitest run tests/integration/candidate-profile-draft.test.ts tests/integration/mock-services.test.ts`, `npx playwright test tests/e2e/wizards/candidate-work-experience.spec.ts tests/e2e/wizards/candidate-skills.spec.ts --project=chromium-desktop --project=chromium-mobile`, `npm run test:all`
- visual-review: screenshot finali `artifacts/tmp-candidate-skills-after-desktop.png` e `artifacts/tmp-candidate-skills-after-mobile.png` confermano layout compatto, liste leggibili e CTA entro viewport
- status: task frame competenze e test E2E pronti; PRD da marcare completato
