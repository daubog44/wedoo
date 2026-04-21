# Playwright Visual Audit

Playwright remains primary execution tool for visual validation.
Use it more strictly, not more loosely.

## Standard Audit Order

1. run structural E2E for route
2. inspect route in browser automation
3. save real captures with `npm run loop:capture -- <route> <slug>` when UI is sensitive
4. run or update VRT only after confirming intended visual state

## Preferred Screenshot Targets

- use element screenshot when Figma maps to panel, modal, form canvas, drawer, or hero block
- use page screenshot only when Figma frame truly matches whole page
- avoid full-page VRT for routes where Figma only describes inner canvas

## Stability Rules

- compare desktop and mobile every time
- if first capture and second capture differ, treat route as unstable before touching baseline
- if browser automation is flaky, trust saved capture artifact over transient headed window

## Minimum Audit Proof

For visually sensitive tasks, final note should include:

- route
- frame node
- desktop check
- mobile check
- capture path
- tests run
- whether baseline was confirmed or updated

## When To Refuse Baseline Update

Do not update baseline when:

- mismatch cause is unknown
- route still has overflow, clipping, shifted layout, or wrong frame target
- Figma/export and real UI still disagree
