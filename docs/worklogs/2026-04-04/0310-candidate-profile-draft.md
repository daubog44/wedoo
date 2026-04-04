# 2026-04-04 03:10 - candidate-profile-draft

- task: Definire `CandidateProfileDraft` con contatti, formazione, esperienze e competenze
- node: n/a
- files: src/data/candidate-profile.ts, src/data/wizards.ts, tests/integration/candidate-profile-draft.test.ts
- action: avviata analisi del wizard candidato e dei dati profilo gia presenti nel portale
- tests: `npm run test:integration -- candidate-profile-draft`, `npm run typecheck`, `npm run lint`
- note: creato `CandidateProfileDraft` server-like e factory per `candidateWizardSteps`; il wizard dati candidato deriva ora dal draft per gli step di registrazione attuali
