# 2026-04-09 16:57 - wedoo-loop

- task: n/a
- node: n/a
- files: n/a
- action: session created
- tests: n/a
- note: n/a

- task: bootstrap Ralph loop e prompt operativa
- node: n/a
- files: Taskfile.yml, scripts/potter-yolo.ps1, scripts/codex-wrapper.ps1, scripts/capture-route-screenshots.mjs, docs/ralph-loop-prompt.md, AGENTS.md, docs/figma-export-assets.md
- action: ripresa sessione per strict review del bootstrap e verifica reale dei comandi documentati
- tests: in corso
- note: backlog prodotto in `prd.md` chiuso; focus spostato sulla robustezza del bootstrap, del preflight e dell'audit screenshot

- task: bootstrap Ralph loop e prompt operativa
- node: n/a
- files: scripts/loop-ready.mjs, AGENTS.md, docs/ralph-loop-prompt.md, .codexpotter/kb/loop-bootstrap.md
- action: corretto il check GitHub MCP di `loop-ready` per riconoscere il bootstrap locale tramite wrapper e riallineata la documentazione di `loop:capture` agli argomenti posizionali realmente stabili su npm/Windows
- tests: `task potter:yolo:checked:dry SLUG=landing-page ROUNDS=1`; `task potter:yolo:global:checked:dry SLUG=landing-page ROUNDS=1`; `npm run loop:capture -- / bootstrap-audit`
- note: artifact verificati in `artifacts/loop-captures/2026-04-09/1706-bootstrap-audit`; il warning fuorviante su `config.toml` non compare piu nella variante `global`

- task: bootstrap Ralph loop e prompt operativa
- node: n/a
- files: .github/workflows/ci.yml, docs/vrt-policy.md, package.json, .codexpotter/kb/loop-bootstrap.md
- action: verificato lo split tra suite funzionale e VRT usato in CI e consolidata la documentazione del bootstrap con i comandi realmente passati
- tests: `npm run test:e2e:functional`
- note: 30 test verdi; il gate funzionale puo restare separato dalla suite visuale Windows senza introdurre regressioni locali
