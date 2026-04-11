---
name: visual-audit
description: >
  Enforce Wedoo visual audits with Figma-first comparison, real capture artifacts,
  and explicit no-op proof. Use when implementing or auditing UI routes, modals,
  dashboards, or parity work inside this repo.
---

# Visual Audit

Use with Wedoo route or frame work.

## Required Inputs

- active task from `prd.md`
- Figma node or explicit `no-source`
- route path

## Procedure

1. Read `docs/visual-backlog.md`, `docs/route-acceptance.md`, `docs/playwright-visual-audit.md`.
2. Audit existing route before editing.
3. Compare real UI against at least two visual sources:
   - Figma screenshot or design context
   - coherent section export
   - real capture artifact
   - existing VRT
4. For sensitive UI, save real captures with `npm run loop:capture -- <route> <slug>`.
5. Update `docs/visual-backlog.md` with route, source, capture path, and status.
6. Refuse no-op close unless capture path, tests, and explicit reason exist.

## Guardrails

- green VRT alone never closes task
- green E2E alone never closes task
- if route still looks visually suspicious, keep task open
- if Figma is newer than baseline, treat baseline as stale
