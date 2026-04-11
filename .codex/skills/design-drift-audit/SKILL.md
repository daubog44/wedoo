---
name: design-drift-audit
description: >
  Manage real design drift in Wedoo. Use when PRD is empty, Figma changed, exports
  disagree with code, or a route looks legacy and needs evidence-backed backlog updates.
---

# Design Drift Audit

Use when backlog is empty or design drift is suspected.

## Procedure

1. Inspect current route, Figma node or export, and current tests/VRT.
2. Decide whether gap is real, stale baseline, or missing source of truth.
3. If gap is real, add one concrete task to `prd.md`.
4. Mirror that route in `docs/visual-backlog.md`.
5. If `prd.md` was empty before this discovery, stop after writing evidence and new task.

## Guardrails

- do not invent chains of new tasks
- do not redesign source-less routes
- do not close drift because existing VRT is green
- hard evidence only: node id, export, or clearly wrong route capture
