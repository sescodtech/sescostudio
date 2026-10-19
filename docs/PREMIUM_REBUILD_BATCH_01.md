# SESCO STUDIO Premium Rebuild — Batch 01

## Included
- Premium navy/blue/gold foundation with corrected light-section contrast.
- Responsive homepage hero and capability strip.
- Portfolio-focused CTA instead of services-only CTA.
- Removed unsupported hardcoded homepage project-count/satisfaction statistics.
- Replaced selected homepage emoji illustrations with consistent Lucide icons.
- Retains existing CMS content and the prior portfolio preview/upload patch.

## Next phases
- Phase 02: Audit remaining components, shared navigation, buttons, typography, and all page contrast states.
- Phase 03: Complete premium homepage layout and CMS-driven content.
- Phase 04: Portfolio screenshot media persistence, detailed case studies, and previews.

## Deployment
Upload the repository contents (not the parent folder) to the same GitHub repo. Run `npm ci`, `npm run lint`, and `npm run build`. Configure existing Supabase environment variables in deployment settings. Do not commit `.env` files.

## Validation limits
This batch was created from the previously supplied corrected source archive, not a fresh GitHub checkout. Full production build and end-to-end browser tests were not run in this environment. Review the diff against current main before merging.
