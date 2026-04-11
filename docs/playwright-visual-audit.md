# Playwright Visual Audit

Playwright remains primary execution tool for visual validation.
Use it more strictly, not more loosely.

## Standard Audit Order

1. run structural E2E for route
2. inspect route in browser automation
3. decide capture target: `page`, `section`, or `element`
4. save real captures with `npm run loop:capture -- <route> <slug>` when UI is sensitive
5. if frame is below the fold, scroll to real section and capture that target
6. run or update VRT only after confirming intended visual state

If step 2 or 3 shows obvious breakage, stop audit mode and switch to fix mode.

## Preferred Screenshot Targets

- use element screenshot when Figma maps to panel, modal, form canvas, drawer, or hero block
- use section-target screenshot when Figma maps to a block lower in a long page
- use page screenshot only when Figma frame truly matches whole page
- avoid full-page VRT for routes where Figma only describes inner canvas
- avoid top-of-page screenshots as proof for sections that live lower in the route

## Before And After Discipline

For visually sensitive tasks prefer both:

- `before` capture when route already exists
- `after` capture before closing task

If you skip `before`, record why.

## Stability Rules

- compare desktop and mobile every time
- if first capture and second capture differ, treat route as unstable before touching baseline
- if browser automation is flaky, trust saved capture artifact over transient headed window
- if capture shows broken or incomplete layout, do not open a separate drift task by default; fix same route now if current round already owns it

## Minimum Audit Proof

For visually sensitive tasks, final note should include:

- route
- frame node
- desktop check
- mobile check
- capture before path when route pre-existed
- capture after path
- capture target used
- tests run
- whether baseline was confirmed or updated

## When To Refuse Baseline Update

Do not update baseline when:

- mismatch cause is unknown
- route still has overflow, clipping, shifted layout, or wrong frame target
- Figma/export and real UI still disagree
