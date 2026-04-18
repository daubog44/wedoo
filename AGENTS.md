# Ralph Loop Contract

## Primary Objective

Primary objective is not "keep loop running".
Primary objective is:

- ship a coherent React/TypeScript prototype
- derived from Figma
- visually credible on desktop and mobile
- free of obvious legacy shells, broken layouts and fake-green validations

Everything else is secondary:

- `prd.md`
- `docs/visual-backlog.md`
- worklog
- `.codexpotter/**`
- VRT
- CI

Those tools exist to support product quality, not replace it.

If a conflict appears between "process looks healthy" and "prototype is still visually wrong", prototype wins and process must adjust.

## Read Order

Read these files in this order at every round:

1. `AGENTS.md`
2. `DESIGN.md`
3. `prd.md`
4. `docs/visual-backlog.md`
5. `docs/route-acceptance.md`
6. `docs/gap-discovery.md`
7. `docs/playwright-visual-audit.md`
8. `docs/loop-subagents.md`
9. `docs/ralph-loop-worklog.md`
10. current session worklog in `docs/worklogs/YYYY-MM-DD/HHMM-task-slug.md`

If one of the required docs is missing, treat it as setup debt and fix it before continuing.

## Product And Stack

You are autonomous frontend engineer inside Ralph Loop.

Product:

- Wedoo
- navigable prototype
- mobile friendly
- Figma-first
- backend not real yet, but code and data shapes must look backend-ready

Stack:

- React
- TypeScript
- Vite
- React Router
- Playwright
- Vitest for integration logic where useful

Do not refound project. Reuse routing, patterns, naming and architecture already present when they are not in conflict with Figma.

## Source Of Truth Priority

Use sources in this order:

1. Figma MCP
2. coherent Figma section exports in `artifacts/figma-exports/**`
3. `DESIGN.md` for Wedoo-specific inference and modernization rules
4. `prd.md`
5. real UI rendered in browser and saved captures
6. Playwright E2E and VRT
7. GitHub / CI state when available
8. existing repo code only as architectural constraint, never as visual truth

Critical rules:

- green tests do not prove correct UI
- green VRT does not prove current design if Figma moved
- existing code does not justify preserving wrong layout
- `.codexpotter/**` is bookkeeping only
- React Bits or any external UI library can support acceleration, but never outranks Figma plus `DESIGN.md`

## Core Loop Rules

- execute first open `- [ ]` task in `prd.md`
- default mode is one product task per round
- if user explicitly asks to continue across multiple routes or finish the whole app, batch mode is allowed for up to 3 tightly related route tasks in the same visual family
- batch mode still requires one coherent surface group, not unrelated route hopping
- one coherent commit per round, maximum
- bootstrap quality gate failures must be recorded, not used as early bootstrap kill-switch
- if bootstrap reaches worklog creation and then quality gate fails, loop still starts and inspects those failures first as technical evidence
- if current session worklog records `bootstrap quality gate failed`, the first concrete action after required doc reads must be rerun of the failing spec files from the gate log or rerun command in worklog
- when that bootstrap gate failure exists, do not spend time on broader repo discovery, KB updates or speculative drift review before the rerun
- if `prd.md` has no open task, default action is stop
- if user explicitly asks to continue across multiple routes, you may reopen backlog with an evidence-backed batch and keep implementing until that batch is complete
- outside explicit user override, only exception is: if same round already collected concrete evidence of a real gap, add one new task to `prd.md` and `docs/visual-backlog.md`, then stop
- do not chain unrelated closures in same round
- do not invent work because router still has pages

## Gap Discovery Rule

New tasks must come from hard evidence, not from discomfort or empty backlog.

Allowed triggers for a new task:

- exact Figma frame or coherent export conflicts with current route
- VRT clearly targets wrong canvas or preserves obsolete UI
- saved real capture proves a macroscopically wrong shell or viewport
- current frame discovery reveals a missing sibling state or child frame that cannot be closed inside active task
- route has no explicit audit yet, but this round you already opened it and compared it against a real design source

Forbidden triggers:

- route merely exists in router
- page feels suspicious but has no artifact or design comparison
- backlog is empty and loop wants to keep moving
- sidecar suggested work without route + proof

Batch-mode exception:

- if user explicitly requests continued implementation across many routes, you may map the router and open a small evidence-backed batch of adjacent routes
- batch must stay within one coherent surface family such as public marketing routes or portal candidate routes
- max 3 new route tasks added from one sweep

Before adding a new task, you must have all of:

- concrete route or component scope
- exact node id, export path, or explicit `no dedicated node`
- one-line mismatch summary
- one artifact or test path proving the gap
- classification: `prerequisite`, `follow-up`, or `mapping`

If one of these is missing, do not add the task.

## Visual Backlog Is Mandatory

`docs/visual-backlog.md` is required operational backlog for visual debt.

Rules:

- every open visual route or frame task must appear there
- every visual no-op audit must record real capture path there
- when you open a new visual task in `prd.md`, add or update matching row in visual backlog in same round
- when you close a visual task, either mark row resolved or remove it from active section
- keep it short; only active or evidence-backed items belong there

Required fields per active item:

- route
- node id or frame set
- primary viewport
- visual source used
- latest real capture path or `pending`
- concrete finding
- evidence
- next action

## Figma Rules

For every `FRAME` task:

1. read exact node from `prd.md`
2. run Figma discovery with `get_metadata`
3. read `get_design_context`
4. read `get_screenshot`
5. classify reference viewport as `mobile`, `tablet` or `desktop`
6. record viewport decision in worklog

Do not promote decorative micro-layers to standalone tasks.
Prefer parent frames, modal shells, cards, nav, inputs, CTA groups and repeated patterns.

If Figma and exports reveal new child frames, states or required components:

- update `prd.md` immediately
- update `docs/visual-backlog.md` if visual
- implement now only if strict prerequisite of active task
- if not strict prerequisite, record it as follow-up and stop at current task boundary

## Design Inference Rule

Figma may be inconsistent, partial or lagging in some sections. Do not block on that.

When design is incomplete or internally inconsistent:

- use nearest valid parent frame, sibling frame, export and existing Wedoo visual language
- keep hierarchy, spacing rhythm, typography and CTA logic coherent with surrounding screens
- prefer small, defensible inference over placeholder UI
- write explicit note in worklog describing what was inferred
- if ambiguity affects a separate route or state, add follow-up task to `prd.md`

Do not answer "design unclear" and stop if a reasonable implementation path exists.

## Existing Route Rule

When task touches route already present in repo:

- audit current UI first
- compare real page against Figma before adding new details
- if route is macroscopically wrong, fix that first
- if desktop still looks like centered stretched mobile canvas, task is not done
- if layout is visibly broken, shifted, clipped, incomplete, or still legacy while active task touches same area, auto-fix it in the same round before continuing
- do not leave a known broken shell in place just because it was not the original headline of the task

## Visual Validation Rule

For UI-sensitive work, final check must include:

- desktop real capture
- mobile real capture
- Figma screenshot or coherent export
- E2E result
- VRT result when route is stable enough
- correct target for the frame: page, section, or element/canvas

Preferred fallback when browser session is flaky:

```powershell
npm run loop:capture -- <route> <task-slug>
```

Close task only after explicit comparison between real UI and design sources.

If Figma frame sits lower in a long page, scroll and capture that section.
Do not treat a top-of-page or generic full-page screenshot as enough proof for a deep section.

If validation reveals:

- broken layout
- missing section that should obviously exist
- wrong frame target
- overflow, clipping, or overlap
- desktop/mobile shell mismatch

then default action is source fix, not backlog note, unless the fix is clearly outside current route or blocked by missing source of truth.

## No-Op Audit Gate

No-op audit is allowed only if all are true:

- task is explicitly audit-like
- route looks credible after real browser check
- Figma and real UI match on structure and viewport
- tests executed
- real capture paths saved

Mandatory evidence for no-op close:

- frame used
- real desktop/mobile capture path
- tests executed
- precise reason no code change was needed

If route is suspicious and evidence is weak, no-op close is forbidden.

## Testing Rule

If UI changes, tests change.

Minimum:

- E2E for route or flow touched
- VRT for stable route or macro frame
- integration test when non-trivial mapping or draft logic exists

Rules:

- never update baseline to hide bug
- never weaken test to get green if bug is real
- if VRT and Figma disagree, investigate before updating baseline
- if UI and VRT agree but Figma is newer, treat VRT as stale
- bootstrap can record failing tests and continue the round; recorded failures become first investigation item, not silent debt

## Playwright Rule

Playwright remains primary runtime verifier.

Use it for:

- route reachability
- heading and CTA checks
- flow behavior
- overflow, clipping, overlap, layout shift
- real screenshot capture

Prefer targeted route specs over broad smoke tests.
Prefer route-level visual tests over full-suite snapshot churn.

## Bookkeeping Rule

Bookkeeping is secondary.

Allowed:

- align active task in tracker
- short session worklog
- KB update only for reusable knowledge

Forbidden:

- spending round mostly in `.codexpotter/**`
- minute-by-minute narration
- KB updates for ordinary audit closures
- opening or closing many bookkeeping files just to look busy

## Clear Reasoning Log Rule

Reasoning log can be short, but it must stay clear.

Each meaningful update should answer:

- what action is happening
- what finding or error appeared
- why chosen next step is correct

Good:

- `Login desktop diff only in footer prompt. Baseline stale. Updating auth copy and rerunning parity.`

Bad:

- long narration without decision
- repeated status lines with no new finding

## Worklog Rule

Real diary lives in `docs/worklogs/YYYY-MM-DD/HHMM-task-slug.md`.

Normal target:

- 3-6 meaningful entries per task

Each entry should include:

- timestamp
- task
- node id when available
- touched area
- tests run
- findings or errors
- next step or final decision

If a new task is discovered, worklog must also state:

- why the gap is real
- which artifact or route proved it
- why it became backlog now

If worklog tells story better than code, captures and tests, you over-logged.

## Subagent Rule

Read `docs/loop-subagents.md` before using sidecars.

Default:

- main agent owns implementation
- sidecars are optional and narrow
- use at most 2 sidecars in one round

Good sidecar tasks:

- Figma node search
- VRT diff interpretation
- CI log triage
- safe cleanup suggestion

Do not delegate full route implementation unless user explicitly wants that workflow.

## Git And CI Rule

- keep commits small and intentional
- do not mix unrelated changes
- do not commit incomplete task as final closure
- if branch or PR exists, check relevant CI
- if CI fails because of your diff, fix it before closing task

## Round Workflow

1. read files in required order
2. find first open task in `prd.md`
3. sync active entry in session worklog
4. sync matching row in `docs/visual-backlog.md` if task is visual
5. interrogate Figma
6. audit existing route if present
7. implement task
8. update backend-like mock data if needed
9. write or update tests
10. self-review diff
11. run relevant tests
12. run real visual validation with captures
13. compare UI vs Figma plus second visual source
14. check CI/GitHub if applicable
15. update worklog and visual backlog
16. mark task complete in `prd.md` only when all checks agree
17. if batch mode is active and next task is part of the same coherent surface family, continue
18. otherwise stop round

## Route Definition Of Done

Route is done only if all are true:

- Figma node understood
- implementation or intentional no-op justified
- desktop and mobile checked
- real capture paths exist
- tests relevant to task pass
- VRT handled intentionally if route is stable
- `docs/visual-backlog.md` updated
- `prd.md` updated
- worklog updated
- CI checked when applicable
- no additional concrete finding remains to add to `prd.md`

If one item is missing, task stays open.
