# Batch 06 — CMS save reliability and editing UX

Based on Batch 05.

- Serialize CMS writes to prevent concurrent editors from overwriting each other with stale React state.
- Add pending save states and duplicate-click prevention to homepage, navigation and footer editors.
- Validate navigation destinations as relative site paths or absolute HTTP(S), mailto, tel or fragment links.
- Clarify homepage editor scope rather than suggesting that existing separate CMS modules are missing.

## Outstanding work

This is an incremental CMS reliability release, **not** the full visual CMS. Existing global CMS payload storage remains; further per-section editing, media authorization, mobile audits and publish workflows require additional phases.

## Deployment

Install dependencies, run `npm run build`, check permissions and verify CMS persistence against your configured Supabase project before merging into main. No SQL migration is required for this batch.
