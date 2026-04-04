# 2026-04-04 02:45 - public-home-response

- task: Definire `PublicHomeResponse` come contratto mock server-like per la landing pubblica
- node: n/a
- files: src/data/mocks/public-home.ts, src/pages/public/home-page.tsx, tests/integration/public-home-response.test.ts
- action: avviata analisi del modulo landing per separare response server-like e contenuto UI
- tests: `npm run test:integration -- public-home-response`, `npm run typecheck`, `npm run lint`
- note: introdotti `PublicHomeResponse`, metadata di pagina e mapper `mapPublicHomeResponseToContent`; la route `/` ora consuma il response mock invece del solo content
