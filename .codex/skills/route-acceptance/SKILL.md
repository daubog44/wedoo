---
name: route-acceptance
description: >
  Apply Wedoo route closeout criteria before marking PRD tasks done. Use when a route,
  wizard step, modal, or dashboard looks ready and needs a rigorous final acceptance pass.
---

# Route Acceptance

Read `docs/route-acceptance.md` first.

## Required Checks

- node understood or `no-source` explicitly documented
- desktop and mobile verified
- real capture path available for visually sensitive routes
- tests relevant to task pass
- VRT was confirmed or intentionally updated
- `prd.md`, `docs/visual-backlog.md`, and worklog are synced
- no additional concrete finding remains to add to `prd.md`

## Guardrails

- if route still has layout drift, task stays open
- if no-op audit lacks capture path, task stays open
- if Figma is incomplete, implement smallest coherent continuation and log inference
