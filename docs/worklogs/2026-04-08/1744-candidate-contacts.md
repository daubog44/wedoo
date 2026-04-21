# 2026-04-08 17:44 - candidate-contacts

- task: implementare `pop up contatti`
- node: 281:1207
- viewport: desktop
- files: src/pages/public/candidate-wizard-page.tsx, src/data/candidate-profile.ts, tests/e2e/wizards/candidate-contacts.spec.ts
- action: avviata discovery del frame Figma e audit della route `/registrati/candidato/2`
- figma: frame `650x839`, pannello mint con card interna border `#58cba5`; summary contatti sopra a campi editabili; CTA `salva`; close in alto a destra
- issue: la route corrente usa ancora `FormPageContent` e uno step generico non allineato al frame
- decision: trattare il frame come modal-step desktop centrato, con adattamento mobile dedicato e mock contatti derivati da `CandidateProfileDraft`
- tests: in preparazione `tests/e2e/wizards/candidate-contacts.spec.ts`
