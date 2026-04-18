## ADDED Requirements

### Requirement: Active routes must close without obvious layout instability

Routes touched by an active task SHALL not be closed while obvious layout instability remains in the audited canvas.

#### Scenario: Active audited route still shifts or clips

- GIVEN a route is under active implementation, parity investigation, or design audit
- WHEN the rendered route shows clipping, overlap, horizontal overflow, or a desktop shell that still behaves like a centered mobile canvas
- THEN the route MUST remain open
- AND the implementation MUST be corrected before task closure unless the broken area is outside the current route scope

### Requirement: Visual proof must target the real Figma canvas

Visual validation SHALL capture the correct page, section, or inner canvas based on the Figma frame being audited.

#### Scenario: Deep section or modal frame

- GIVEN a Figma frame describes a section lower in the page or an inner modal or panel
- WHEN visual proof is collected
- THEN the route MUST be captured at the matching section or element target
- AND a generic full-page screenshot alone SHALL NOT count as sufficient proof

### Requirement: Parity refreshes must be intentional

Parity baselines SHALL only be refreshed after confirming whether the mismatch is a real UI bug or a stale snapshot.

#### Scenario: Parity fails on a stable route

- GIVEN a parity test fails for a route considered stable
- WHEN the failure is investigated against Figma and real captures
- THEN the team MUST decide whether the UI is wrong or the baseline is stale
- AND the baseline SHALL only be updated when the rendered route is confirmed intentional
