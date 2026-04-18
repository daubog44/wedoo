# 2026-04-17 21:08 - vitest-pool-stability

## 21:08 - task integration gate stability - node n/a

- touched area: `npm run test:all` gate after candidate UI fixes
- tests run: `npm run test:all`
- findings or errors: lint and typecheck are green, but `vitest run` is failing on this Windows/Codex worktree because many integration files time out while waiting for `forks` workers to respond; the gate is not trustworthy until the Vitest pool is stabilized
- next step: patch Vitest config/scripts to use a more stable worker model for this environment, rerun `npm run test:integration`, then rerun the full gate

## 21:16 - task integration gate stability - node n/a

- touched area: `vitest.config.ts`, plus parity specs for candidate CV and candidate job detail to target the real shell element instead of noisy full-page screenshots
- tests run: `npm run typecheck`, `npm run test:integration`, `npm run test:all`
- findings or errors: moving Vitest integration runs to a bounded `threads` pool removed the Windows worker startup timeouts; after that, the only remaining gate blocker was stale full-page parity targeting on candidate CV, which was switched to `data-candidate-cv-layout` and re-baselined intentionally
- next step: task closed; full quality gate is green (`npm run test:all` -> 153 passed, 7 skipped, 0 failed in Playwright plus 56/56 integration green)
