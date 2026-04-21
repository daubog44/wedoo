# Ralph Loop Worklog Policy

Worklog is short operational diary, not transcript.

Real files live in:

- `docs/worklogs/YYYY-MM-DD/HHMM-task-slug.md`

## Target Size

For normal task:

- 3-6 meaningful updates

If file becomes minute-by-minute reasoning log, it is too long.

## Each Entry Must Say

- timestamp
- active task
- node id when relevant
- area touched
- test or command run
- finding or error
- next step or final decision

Good shape:

- `22:10 - task /accedi - node 658:667 - parity diff only in prompt text - updating auth copy and rerunning VRT`

## Do Not Log

- every tiny edit
- full diff copies
- long self-congratulation
- repeated "now I am checking" lines with no new finding

## Mandatory When Closing Visual Task

- final tests
- real capture path in `artifacts/loop-captures/**` or equivalent artifact
- note if VRT was confirmed or intentionally updated
