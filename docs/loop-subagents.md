# Loop Subagents

Subagents are sidecars, not owners of the round.

## Default

- main agent owns task, diff and final decision
- use 0-2 sidecars per round
- keep sidecar prompts narrow
- treat sidecar output as evidence, not authority

## Good Sidecar Jobs

- Figma node search or frame mapping
- VRT diff interpretation
- CI log triage
- safe cleanup suggestion
- independent review of acceptance checklist

## Bad Sidecar Jobs

- full route implementation with no main-agent review
- broad repo rewrites
- duplicate bookkeeping work
- speculative backlog generation with no evidence

## Prompt Shape

Good sidecar prompt should specify:

- exact route or frame
- exact question
- no edit or edit allowed
- expected output format

Example:

- `Inspect route /portale/candidato/cv against frame 288:1266. Read-only. Return top 3 structural mismatches.`

## When To Spawn

Spawn sidecar only if it reduces risk or waiting:

- one read-only sidecar while main agent edits
- one independent validator before closing a suspicious visual task

Do not spawn sidecars just to narrate progress.
