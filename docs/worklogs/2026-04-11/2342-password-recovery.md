# 2026-04-11 23:42 - password-recovery

- timestamp: 2026-04-11 23:42
- task: implementare il flow pubblico `password dimenticata`
- node: desktop `657:658`, mobile `660:774`, assistenza `660:725` + mobile `660:1217`
- viewport: desktop + mobile
- files: `src/pages/public/login-page.tsx`, `src/router.tsx`, `src/data/auth.ts`, `tests/e2e/public/login-page.spec.ts`, `tests/fixtures/public-copy.ts`
- action: avviata la sessione dedicata; discovery Figma completata con metadata/screenshot/design context. Confermato che il recovery e una route pubblica separata dal login, con form standalone senza footer e con link inline verso una seconda schermata `assistenza clienti`.
- tests: pending
- note: la CTA `password dimenticata` del login oggi e un bottone statico senza navigazione; il frame `660:1217` corrisponde alla variante mobile di `assistenza clienti`, non a un secondo stato del form recovery
