# 2026-04-04 05:10 - feature-cards

- task: rifinire le tre feature card
- node: 143:1822
- viewport: desktop
- files: src/components/public/home/home-sections.tsx, tests/e2e/public/landing-page.spec.ts
- action: avvio sessione; verifica geometria delle tre card rispetto ai nodi `143:1924`, `222:527`, `222:537` e al raccordo con la sezione video
- figma: le tre card partono a `y: 1074` e il loro bordo inizia `20px` sotto l'inizio sezione; rispetto alla sezione precedente il wrapper corrente era troppo lungo e spingeva card e video piu in basso del frame
- decision: portato `DesktopFeatureCard` a `top: 20` e ridotto `DesktopFeatureSection` a `471px`, cosi le card cadono sulla quota dei rettangoli Figma e il video non resta sospeso troppo in basso
- tests: `npm run test:e2e -- tests/e2e/public/landing-page.spec.ts`; `npx playwright test tests/e2e/parity/landing-page.visual.spec.ts --project=chromium-desktop --update-snapshots`; `npm run test:all`
- visual-review: desktop piu vicino ai nodi `143:1924/222:527/222:537`; mobile invariato, baseline VRT desktop aggiornata intenzionalmente
- github: nessuna PR aperta trovata per `head:codex/ralph-loop-bootstrap`
