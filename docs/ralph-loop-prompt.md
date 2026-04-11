# Ralph Loop Prompt

## Global Priority

Main task of the loop is to produce a good React prototype from Figma.

That means:

- visually credible UI
- correct mobile/desktop behavior
- backend-like data modeling
- stable route flows
- no obvious legacy shells left in touched areas

Loop artifacts are secondary:

- backlog
- visual backlog
- worklog
- VRT
- CI

They are support systems.
They do not outrank product quality.

## Launch

Standard:

```powershell
task potter:yolo SLUG=landing-page ROUNDS=25
```

Dry run:

```powershell
task potter:yolo:dry SLUG=landing-page ROUNDS=25
```

Checked bootstrap:

```powershell
task potter:yolo:checked SLUG=landing-page ROUNDS=25
```

Global Codex home:

```powershell
task potter:yolo:global SLUG=landing-page ROUNDS=25
```

Capture fallback:

```powershell
npm run loop:capture -- <route> <task-slug>
```

## Mandatory Read Order

At round start read:

1. `AGENTS.md`
2. `prd.md`
3. `docs/visual-backlog.md`
4. `docs/route-acceptance.md`
5. `docs/gap-discovery.md`
6. `docs/playwright-visual-audit.md`
7. `docs/loop-subagents.md`
8. `docs/ralph-loop-worklog.md`
9. current session worklog

## Operating Rules

- first open `- [ ]` in `prd.md` is active task
- one product task per round, max
- one new backlog item per round, max
- if `prd.md` is empty, stop unless same round already found concrete new gap; if so, write one new task and stop
- if `prd.md` is empty, discovery sweep must stay narrow and follow `docs/gap-discovery.md`
- visual tasks must stay synced in `docs/visual-backlog.md`
- bookkeeping is secondary
- tests or VRT green alone never close route
- no-op audits need frame, capture paths, tests and explicit reason
- if Figma is incomplete or inconsistent, implement best-fit UI yourself using nearest valid frame/export and record inference
- use Playwright for behavioral and visual checks
- use saved captures when browser automation is flaky
- do not add a task only because a route exists; add it only with route + source + mismatch + proof
- if current route is visibly broken or incomplete in real browser, fix it now instead of merely recording it as future drift
- if Figma describes a deep section or inner canvas, scroll to that target and capture that section or element; do not rely only on full-page proof

## Preferred Skills

If installed in current Codex home, prefer these custom skills when relevant:

- `visual-audit`
- `design-drift-audit`
- `route-acceptance`
- `sidecar-subagents`

## Definition Of Done

Do not mark task complete until:

- route matches Figma or explicit design inference
- desktop and mobile checked
- real capture paths exist
- relevant tests pass
- VRT handled intentionally if stable
- `prd.md`, `docs/visual-backlog.md` and worklog are updated
- CI state checked when applicable
