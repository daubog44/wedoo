# Gap Discovery

Use this file when deciding whether a new task should enter `prd.md`.

## Goal

Add real gaps.
Do not manufacture work to keep loop alive.

## Default Mode

If `prd.md` still has an open task:

- do not run broad repo discovery
- only record new gaps found while executing current task

If `prd.md` is empty:

- run one short discovery sweep
- inspect at most 3 plausible surfaces
- if no hard evidence appears, stop

Good sweep candidates:

- route already touched this round
- route with existing VRT or E2E but no explicit Figma audit
- route with known Figma node or coherent export already available

Bad sweep candidates:

- random router pages
- whole app inventory
- every route without ranking

## Hard Evidence Threshold

A new task is allowed only if you can point to at least one of:

- Figma frame mismatch
- coherent export mismatch
- saved real capture showing wrong shell or viewport
- VRT proving wrong frame target or obsolete UI
- explicit missing sibling state discovered from current frame metadata

And always include:

- route or component
- node id or export path or `no dedicated node`
- one-line mismatch summary
- artifact or test path

## Task Classification

Every new task must be one of:

- `prerequisite`: blocks current task; insert before it
- `follow-up`: discovered now but not blocking; insert after current task
- `mapping`: source of truth missing and must be clarified before real UI work

If classification is unclear, task is not ready to be added.

## Stop Rule

After adding one new evidence-backed task to an empty backlog:

- update `prd.md`
- update `docs/visual-backlog.md` if visual
- update worklog with proof
- stop round

Do not implement same round.
