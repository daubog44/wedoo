# 2026-04-09 05:40 - company-job-draft-closeout

- task: strict review finale indipendente wizard annuncio azienda
- node: 258:847, 259:1050
- viewport: desktop (frame Figma 1440px), con audit responsive mobile obbligatorio
- files: src/components/portal/company-job-draft-*.tsx, src/pages/portal/company-job-draft-page.tsx, src/data/job-draft.ts, src/data/mock-services.ts, tests/e2e/portal/company-job-draft-step-*.spec.ts, tests/e2e/parity/company-job-draft-step-*.visual.spec.ts
- action: riletti AGENTS/PRD/progress tracker, aperti metadata/design context/screenshot Figma dei due frame e confrontato il diff dal commit base `1232695e80906eeb42cf0d57151710e9f8b3ab77`
- tests: `WEDOO_DEV_PORT=4720 npm run test:all`; audit Playwright extra-route su `4721` con screenshot locali in `tmp/company-job-draft-closeout/*.png`
- note: branch locale `codex/ralph-loop-bootstrap` ahead di 24 commit su `origin`; nessuna PR aperta trovata per la head corrente
- action: confermato il match desktop dei frame Figma anche sulle coordinate chiave del browser reale; step 1 mantiene `h1 x=103 y=51` e form `x=68 y=138 w=571 h=797`, step 2 mantiene `h1 x=149 y=162` e form `x≈80 y=273 w=571 h=479`, coerenti con i frame `258:847` e `259:1050`
- resolution: nessun gap residuo trovato; quality gate completo verde (`33` integration, `50` Playwright) e audit responsive senza overflow orizzontale (`scrollWidth == clientWidth` su desktop `1440` e mobile `412`)
