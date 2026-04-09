# 2026-04-09 17:28 - landing-page

- task: n/a
- node: n/a
- files: n/a
- action: session created
- tests: n/a
- note: n/a

- action: preflight ok
- note: Figma MCP e GitHub MCP rispondono; Playwright locale apre correttamente http://127.0.0.1:4600.

- task: bootstrap Ralph loop e variante global
- node: n/a
- files: scripts/potter-yolo.ps1, scripts/loop-ready.mjs, docs/ralph-loop-prompt.md
- action: strict review bootstrap conclusa; corretto `potter:yolo:global` per usare davvero `%USERPROFILE%\\.codex`, bypassare il wrapper locale nel dry-run e nel preflight, e allineare `loop:ready` alla modalita `global`
- tests: `task potter:yolo:checked:dry SLUG=landing-page ROUNDS=1`; `task potter:yolo:global:checked:dry SLUG=landing-page ROUNDS=1`
- note: il bootstrap locale continua a iniettare GitHub MCP via wrapper; la variante `global` ora valida la config reale della home globale e stampa un dry-run coerente con il comando eseguito
