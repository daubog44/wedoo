# Visual Backlog

This file tracks only active or evidence-backed visual debt.

Rules:

- keep it short
- every open visual task in `prd.md` must appear here
- every no-op audit must leave a real capture path here or in the matching resolved note
- closed items do not need a long archive; git history, PRD and worklog already hold history

## Active

| Status | Route | Node / Frames | Viewport | Visual Source | Real Capture | Finding | Next Action |
| --- | --- | --- | --- | --- | --- | --- | --- |

## Resolved

| Status | Route | Node / Frames | Viewport | Visual Source | Real Capture | Finding | Next Action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| resolved | `/` | `143:1822` landing home hero + header | desktop + mobile | Figma MCP `143:1822` + user screenshots + live captures on `4601` | `artifacts/loop-captures/2026-04-21/1653-landing-theme-card-final`, `1654-landing-theme-card-light` | the landing no longer hides the shared theme toggle, the hero no longer mixes a washed-out light slab into the dark shell, and the workspace preview copy now sits on a dedicated backdrop so both dark and light modes stay readable | none |
| resolved | `/accedi`, `/registrati`, `/registrati/azienda/:stepIndex`, `/password-dimenticata`, `/assistenza-clienti`, `/portale/*` | shared theme tokens + auth shells + company onboarding shell + portal navbar/layout | desktop + mobile | user screenshots + live benchmark direction adapted to Wedoo + real captures on `4601` | `artifacts/loop-captures/2026-04-21/1636-login-theme-governance-final`, `1636-register-theme-governance-final`, `1636-company-theme-governance-final`, `1636-recovery-theme-governance-final`, `1636-support-theme-governance-final`, `1636-candidate-portal-theme-governance-final`, `1636-company-portal-theme-governance-final` | the mixed light/dark reset was replaced with a governed theme system: shared tokens now drive one coherent default dark surface stack, the theme toggle persists across routes, CTA contrast is stable, and the company step 5 heading plus helper panel no longer break the layout rhythm | none |
| resolved | `/articoli`, `/podcast`, `/registrati/azienda/:stepIndex`, `/portale/candidato/cv`, `/portale/candidato/annuncio/:jobId`, `/portale/azienda/annunci`, `/portale/azienda/annunci/:jobId`, `/portale/azienda/candidati/:candidateId` | shared knowledge hub, `337:701`, `288:1266`, `172:1273`, `185:1738`, `271:938`, `181:608` | desktop + mobile | live benchmark direction adapted to Wedoo + real captures on `4601` | `artifacts/loop-captures/2026-04-21/1601-articles-hardcoded-v2`, `1601-podcasts-hardcoded-v2`, `1543-wedoo-deep-routes-company-wizard-step1`, `1543-wedoo-deep-routes-company-wizard-step5`, `1555-wedoo-deep-routes-candidate-cv-v2`, `1544-wedoo-deep-routes-candidate-job`, `1544-wedoo-deep-routes-company-jobs`, `1604-company-published-jobs-hardcoded`, `1555-wedoo-deep-routes-company-job-preview-v2`, `1555-wedoo-deep-routes-company-candidate-v2` | the remaining deep routes were rebuilt into the same reset language used for the visible product surfaces, then revalidated with route tests and refreshed parity baselines on the real `4601` server | none |
| resolved | `/`, `/accedi`, `/registrati`, `/password-dimenticata`, `/assistenza-clienti`, `/candidato`, `/azienda`, `/info`, `/portale/*` | `143:1822`, `658:667`, `336:593`, `657:658`, `660:725`, public exports + portal shells | desktop + mobile | Figma MCP + real captures | `artifacts/loop-captures/2026-04-20/2323-wedoo-reset-home-v4`, `2321-wedoo-reset-register-v3`, `2321-wedoo-reset-login-v3`, `2321-wedoo-reset-recovery-v3`, `2321-wedoo-reset-support-v3`, `2321-wedoo-reset-info-v3`, `2321-wedoo-reset-candidate-showcase-v3`, `2321-wedoo-reset-company-showcase-v3`, `2321-wedoo-reset-candidate-portal-v3`, `2321-wedoo-reset-company-portal-v3` | the old hybrid references were removed from the visible product surfaces and replaced with one shared system for tokens, CTA grammar, auth, info, showcase and portal composition, validated on real captures after the final reset pass | none |
| resolved | `/password-dimenticata` | `657:658`, `660:774`, `660:1217`, `660:725` | desktop + mobile | Figma MCP | `artifacts/loop-captures/2026-04-20/2150-password-recovery-final-v2`, `artifacts/loop-captures/2026-04-20/2150-customer-support-final-v3` | recovery flow implemented end-to-end, support page aligned to the coherent frame pair, and auth parity baselines updated intentionally | none |

## Update Policy

When opening a visual task:

1. add or refresh row here
2. include latest evidence already available
3. keep finding concrete, not generic

When closing a visual task:

1. remove row from `Active` or mark it resolved briefly
2. ensure worklog records real capture path
3. ensure `prd.md` checkbox matches reality

## Evidence Format

Use concrete paths like:

- `artifacts/loop-captures/2026-04-11/1809-candidate-dashboard-audit-final`
- `__screenshots__/chromium-desktop/...`
- `artifacts/figma-exports/...`

Do not write vague notes like `checked visually` without artifact path.
