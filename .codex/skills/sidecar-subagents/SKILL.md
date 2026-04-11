---
name: sidecar-subagents
description: >
  Use subagents as narrow sidecars for Wedoo loop discovery, diff triage, Figma mapping,
  CI log inspection, or artifact inventory. Not for full route ownership.
---

# Sidecar Subagents

Read `docs/loop-subagents.md` first.

## Allowed Sidecars

- Figma node mapping
- VRT diff or screenshot bbox analysis
- CI log reading
- export or capture inventory
- test-failure clustering

## Rules

- one main agent owns task, code, and final decision
- do not delegate full implementation
- do not open more than one product task per round
- if runtime has no subagent support, continue locally
