# VRT Policy

## Dove finiscono le immagini UI

Le baseline VRT vengono salvate in una cartella centralizzata:

- `__screenshots__/chromium-desktop/...`
- `__screenshots__/chromium-mobile/...`

Gli artifact temporanei e i diff di Playwright vengono salvati in:

- `test-results/playwright`
- `playwright-report`

## Regola per ogni route stabile

Quando una route o un frame e abbastanza stabile:

1. crea un file `*.visual.spec.ts` in `tests/e2e/parity`
2. genera baseline desktop e mobile con `npm run test:vrt:update`
3. mantieni la baseline nel repo

## Quando aggiornare una baseline

Aggiorna una baseline solo se tutte queste condizioni sono vere:

- il cambiamento visuale e intenzionale
- il risultato e coerente con Figma
- la route e abbastanza stabile da non generare churn inutile
- hai controllato desktop e mobile

Non aggiornare una baseline se:

- stai coprendo un bug reale
- la UI e ancora in forte cambiamento
- il diff visuale non e stato compreso

## Convenzioni

- un file visuale per route o macro-frame stabile
- nome file descrittivo, per esempio `landing-page.visual.spec.ts`
- niente aggiornamenti massivi di baseline senza verifica mirata
