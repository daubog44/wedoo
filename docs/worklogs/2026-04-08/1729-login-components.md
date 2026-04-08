# 2026-04-08 17:29 - login-components

- task: estrarre i componenti auth `Checkbox` e `Text Link`
- node: 658:688, 658:684
- viewport: desktop
- files: src/pages/public/login-page.tsx, src/components/public/auth/**
- action: avvio sessione dopo implementazione del frame login `658:667`
- figma: `Checkbox` `23x23` con base menta, check viola e radius `4px`; `Text Link` in Roboto italic `22px`, usato per `password dimenticata`
- decision: spostare i pattern fuori dalla pagina login in componenti auth riusabili, mantenendo il dominio in `loginAuthViewModel` e senza riaprire il form shell legacy
- result: creati `AuthCheckbox` e `AuthTextLink` in `src/components/public/auth`, riusati dalla route `/accedi` al posto degli helper locali; il test login ora verifica anche il toggle del consenso
- tests-final: `npm run test:all`
- visual-review: review Playwright headless su `/accedi` desktop/mobile con geometrie coerenti, nessun overflow orizzontale; su mobile il blocco provider resta sopra il footer (`bottom 706 < footer top 780`)
- github: nessuna PR aperta per `codex/ralph-loop-bootstrap` al momento del check
