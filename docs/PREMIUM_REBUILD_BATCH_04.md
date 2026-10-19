# Batch 04 — Advanced portfolio and case studies

- Portfolio cards retain real uploaded screenshots and live website links.
- Added scroll-to-bottom screenshot hover effect for tall screenshots, with reduced-motion support.
- Added direct case-study links keyed by stable project ID.
- Rebuilt case-studies listing with screenshot previews and live links.
- Added dynamic `/case-studies/[id]` project detail route using existing CMS project fields.
- Removed emoji-based case-study previews and added neutral screenshot placeholders.
- Added selected-work statement and responsive detail layout.

## Known follow-up
The existing Admin image persistence/save issue needs a separate backend investigation. This batch does not claim to fix uploads or database writes. Screenshot hover works best with tall full-page screenshots; 16:9 crops have little vertical content to scroll.

## Validation
Run `npm ci`, `npm run build` and browser tests in your development environment before merging to main.
