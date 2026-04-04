# 2026-04-04 04:08 - download-app-cta

- task: estrarre CTA download app landing
- node: 143:1908
- viewport: desktop
- files: src/components/public/home/*, tests/e2e/public/landing-page.spec.ts, prd.md
- action: avviata sessione dedicata alla CTA download app della hero landing, subito dopo l'estrazione del button group auth
- tests: not run yet
- note: da verificare il perimetro rispetto al task separato sull'icona `Smartphone`

- action: Figma `143:1908` conferma CTA viola `186x49`, bordo scuro, raggio `8px`, label `scarica l'app` e icona smartphone a sinistra; estratto `HomeDownloadAppButton` sopra il primitive anchor esistente
- files: src/components/public/home/home-download-app-button.tsx, src/components/public/home/home-sections.tsx, src/components/public/home/index.ts
- decision: mantenuto `smartphone-apps-line` come implementazione corrente senza chiudere il task separato `2:414`, che resta il punto di riallineamento definitivo dell'icona

- action: rinforzato il test landing con controllo esplicito dell'attributo `download`
- files: tests/e2e/public/landing-page.spec.ts, prd.md
- tests: npm run test:e2e -- tests/e2e/public/landing-page.spec.ts; npm run test:all
- note: nessuna PR aperta su GitHub per `codex/ralph-loop-bootstrap`, quindi nessun controllo CI remoto aggiuntivo oltre al gate locale
