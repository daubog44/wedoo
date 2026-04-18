## Why

The remaining portal detail routes still look older than the rest of the prototype even when tests are green. Candidate CV, candidate job detail, company candidate detail, and company job preview all preserve an earlier visual grammar: sparse canvases, weak hierarchy, and parity that still protects outdated shells.

## What Changes

- modernize the portal detail family as one coherent visual batch
- bring candidate CV, candidate job detail, company candidate detail, and company job preview onto a shared portal-detail grammar
- retarget visual parity to the real detail canvas instead of fragile full-page snapshots where needed
- keep existing route behavior, labels, and mock-response contracts unless a small extension is needed for layout quality

## Impact

- stronger visual consistency between dashboards and detail routes
- fewer layout-shift regressions in portal pages
- more trustworthy parity coverage for the last legacy-looking portal surfaces
