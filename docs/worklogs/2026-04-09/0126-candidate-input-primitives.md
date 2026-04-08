# 2026-04-09 01:26 - candidate-input-primitives

- task: estrarre primitive input del wizard candidato
- nodes: 280:1093, 280:1099, 281:1255, 2:543
- figma: `280:1093` e `280:1099` condividono bordo mint `1px`, radius `8px`, testo Roboto `22px`, stesso chevron da `2:543`; `281:1255` e il text field base con placeholder `scrivi`
- note: il nodo `2:543` non rispondeva direttamente via `get_metadata`, ma il design context degli instance `280:1095/280:1101` conferma che il componente sorgente e il `Chevron down` del design system
- implementation: estratto `src/components/public/candidate-wizard-fields.tsx` con `CandidateWizardSelectField`, `CandidateWizardYearSelectField`, `CandidateWizardTextField`, `CandidateWizardFieldLabel` e chevron centralizzato; refactor dei quattro step candidato per riusare le nuove primitive
- tests: `npx eslint src/components/public/candidate-wizard-fields.tsx src/components/public/candidate-contacts-step.tsx src/components/public/candidate-education-step.tsx src/components/public/candidate-work-experience-step.tsx src/components/public/candidate-skills-step.tsx`, `npx vitest run tests/integration/candidate-profile-draft.test.ts tests/integration/mock-services.test.ts`, `npx playwright test tests/e2e/wizards/candidate-contacts.spec.ts tests/e2e/wizards/candidate-education.spec.ts tests/e2e/wizards/candidate-work-experience.spec.ts tests/e2e/wizards/candidate-skills.spec.ts --project=chromium-desktop --project=chromium-mobile`, `npm run test:all`
- status: primitive condivise pronte; PRD component tasks da marcare completate
