# Visual Backlog

This file tracks only active or evidence-backed visual debt.

Rules:

- keep it short
- every open visual task in `prd.md` must appear here
- every no-op audit must leave a real capture path here or in the matching resolved note
- closed items do not need a long archive; git history, PRD and worklog already hold history

## Active

| Status | Route | Node / Frames | Viewport | Visual Source | Capture Before | Capture After | Capture Target | Finding | Evidence | Next Action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Update Policy

When opening a visual task:

1. add or refresh row here
2. include latest evidence already available
3. keep finding concrete, not generic
4. include one explicit proof line or artifact path showing why this belongs in backlog now
5. decide and record the intended capture target: `page`, `section`, or `element/canvas`
6. if route already exists, prefer filling `Capture Before` immediately

When closing a visual task:

1. remove row from `Active` or mark it resolved briefly
2. ensure worklog records real capture path
3. ensure `prd.md` checkbox matches reality
4. prefer a real `Capture After` path, not just a verbal note

## Evidence Format

Use concrete paths like:

- `artifacts/loop-captures/2026-04-11/1809-candidate-dashboard-audit-final`
- `__screenshots__/chromium-desktop/...`
- `artifacts/figma-exports/...`

Do not write vague notes like `checked visually` without artifact path.

## Capture Target Rule

Choose target based on what Figma actually describes:

- `page`: only when frame is whole route
- `section`: when frame is a deep block in a long page
- `element/canvas`: when frame is modal, drawer, form shell, inner panel, or hero

If Figma describes a lower section of a long page, do not rely only on a top-of-page or full-page screenshot.
