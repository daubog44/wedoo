## Design Approach

Use the existing Wedoo color identities per route family:

- candidate CV and company candidate detail stay mint-led
- candidate job detail and company job preview stay lavender-led

Do not literal-copy the old Figma polygons where they hurt responsiveness. Keep the original hierarchy:

- strong header area with close/back affordance
- hero identity block with avatar/logo, title, and quick metadata
- content sections grouped in large rounded cards
- CTA tray separated from content
- mobile dock preserved where already part of the route contract

## Shared Grammar

- use a single detail-shell language across the four routes
- emphasize large rounded surfaces, subtle shadow, and stronger type hierarchy
- keep body copy on white cards over tinted page canvases instead of raw text on flat backgrounds
- use chips and utility rows for quick summary metadata rather than scattered labels

## Testing

- route E2E remains required for each page
- parity should target the route canvas element, not the whole page, when the route includes standalone detail shells
