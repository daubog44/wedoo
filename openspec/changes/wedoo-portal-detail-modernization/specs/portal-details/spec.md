## ADDED Requirements

### Requirement: Portal detail family uses one coherent visual grammar

The candidate CV, candidate job detail, company candidate detail, and company job preview routes MUST share a consistent portal-detail visual language while preserving their route-specific color identity and CTA behavior.

#### Scenario: Candidate CV uses modern portal-detail shell

- **WHEN** the user opens `/portale/candidato/cv`
- **THEN** the route renders a clear hero identity panel, structured content surfaces, and a stable mobile dock

#### Scenario: Candidate job detail uses modern detail canvas

- **WHEN** the user opens `/portale/candidato/annuncio/:jobId`
- **THEN** the route renders a strong company/title hero, grouped detail sections, and a separated CTA tray

#### Scenario: Company candidate detail uses modern recruiter detail canvas

- **WHEN** the user opens `/portale/azienda/candidati/:candidateId`
- **THEN** the route renders a recruiter-focused mint shell with grouped sections and consistent CTA hierarchy

#### Scenario: Company job preview uses modern recruiter preview canvas

- **WHEN** the user opens `/portale/azienda/annunci/:jobId`
- **THEN** the route renders the recruiter preview in the same detail-shell grammar as the candidate job page, adapted to recruiter CTAs
