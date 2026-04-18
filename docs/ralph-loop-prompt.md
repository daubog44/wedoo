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
2. `DESIGN.md`
3. `prd.md`
4. `docs/visual-backlog.md`
5. `docs/route-acceptance.md`
6. `docs/gap-discovery.md`
7. `docs/playwright-visual-audit.md`
8. `docs/loop-subagents.md`
9. `docs/ralph-loop-worklog.md`
10. current session worklog

## Operating Rules

- first open `- [ ]` in `prd.md` is active task
- default is one product task per round
- if the user explicitly asks to continue across multiple routes or finish the app, batch mode is allowed for up to 3 tightly related routes in one surface family
- one new backlog item per round, max, unless batch mode is explicitly active
- if `prd.md` is empty, stop unless same round already found concrete new gap; if so, write one new task and stop
- if batch mode is explicitly active and backlog is empty, you may reopen with an evidence-backed batch and continue through that batch before stopping
- if `prd.md` is empty, discovery sweep must stay narrow and follow `docs/gap-discovery.md`
- visual tasks must stay synced in `docs/visual-backlog.md`
- bookkeeping is secondary
- bootstrap quality gate can fail without aborting the round; if worklog records bootstrap gate failure, inspect that first before claiming a clean start
- if session worklog contains `bootstrap quality gate failed`, first concrete action after required docs is rerun of the failing spec files from the gate log or worklog note
- when bootstrap gate failed, do not start broad discovery before that rerun; only read enough local files to understand the failing route and test
- tests or VRT green alone never close route
- no-op audits need frame, capture paths, tests and explicit reason
- if Figma is incomplete or inconsistent, implement best-fit UI yourself using nearest valid frame/export and record inference
- use `DESIGN.md` to keep those inferences modern and consistent with Wedoo instead of default AI styling
- use Playwright for behavioral and visual checks
- use saved captures when browser automation is flaky
- React Bits may be used only as a curated accent/component source; never let it override Figma shell geometry or Wedoo tokens
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
