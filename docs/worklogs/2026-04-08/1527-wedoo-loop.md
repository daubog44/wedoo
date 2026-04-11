# 2026-04-08 15:27 - wedoo-loop

- task: n/a
- node: n/a
- files: n/a
- action: session created
- tests: n/a
- note: n/a

- task: bootstrap Ralph loop e prompt operativa
- node: n/a
- files: Taskfile.yml, scripts/potter-yolo.ps1, scripts/codex-wrapper.ps1, docs/ralph-loop-prompt.md, AGENTS.md, prd.md
- action: verificati dry-run e preflight reali del bootstrap; allineata la prompt al reasoning `xhigh` e aggiunta nota esplicita sul prerequisito `GITHUB_PAT_TOKEN`
- tests: `powershell -NoProfile -ExecutionPolicy Bypass -File .\scripts\potter-yolo.ps1 -Slug landing-page -Rounds 25 -DryRun`; `task potter:preflight SLUG=landing-page ROUNDS=1`
- note: `loop:ready`, `npm run test:all`, Playwright locale e preflight MCP Figma/GitHub passano; emerso che la documentazione doveva esplicitare il token GitHub richiesto dallo script
