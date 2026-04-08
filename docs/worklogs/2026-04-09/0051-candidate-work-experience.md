# 2026-04-09 00:51 - candidate-work-experience

- task: implementare `pop up esperienze lavorative`
- node: 280:860
- route: /registrati/candidato/4
- viewport: desktop confermato dal frame `650x1207`; la resa finale dovra restare verticale come modal lunga su mobile ma senza riciclare il canvas auth esistente
- figma: form mint con select `paese`/`città`/`ragione sociale`, select anno `da/ad`, helper copy geografica, editor `attività svolte` e CTA `salva`
- audit: la route `/registrati/candidato/4` ricade ancora sul form generico di registrazione; mismatch totale sia desktop sia mobile con screenshot locali `artifacts/tmp-candidate-work-before-desktop.png` e `artifacts/tmp-candidate-work-before-mobile.png`
- decision: introdotto uno step dedicato `/registrati/candidato/4`, riallineato il save dello step formazione verso questo frame e mantenuto `salva` esperienze verso `/portale/candidato` finche il frame competenze non sostituira lo step successivo
- implementation: normalizzato `CandidateWorkExperienceDraftEntry` sui campi Figma (`country`, `city`, `company`, `startYear`, `endYear`, `description`), aggiunti cataloghi dipendenti per localita/azienda e costruito `CandidateWorkExperienceStep` con layout mint, helper geografico e toolbar visuale
- tests: `npx eslint src/components/public/candidate-work-experience-step.tsx src/data/candidate-profile.ts src/pages/public/candidate-wizard-page.tsx tests/e2e/wizards/candidate-education.spec.ts tests/e2e/wizards/candidate-work-experience.spec.ts tests/fixtures/public-copy.ts tests/integration/candidate-profile-draft.test.ts`, `npx vitest run tests/integration/candidate-profile-draft.test.ts tests/integration/mock-services.test.ts`, `npx playwright test tests/e2e/wizards/candidate-education.spec.ts tests/e2e/wizards/candidate-work-experience.spec.ts --project=chromium-desktop --project=chromium-mobile`, `npm run test:all`
- visual-review: screenshot finali `artifacts/tmp-candidate-work-after-desktop.png` e `artifacts/tmp-candidate-work-after-mobile.png` confermano assenza di overflow; corretto anche il layout del blocco hint anni su desktop dopo il primo confronto con Figma
- github: branch `codex/ralph-loop-bootstrap` senza PR aperte su `daubog44/wedoo`; nessuna CI remota specifica da rincorrere oltre al quality gate locale
- status: task frame esperienze e test E2E pronti; PRD da marcare completato
