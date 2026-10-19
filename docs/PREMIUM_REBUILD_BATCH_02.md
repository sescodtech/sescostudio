# SESCO STUDIO — Batch 02: Homepage portfolio and credibility

## Changes
- Replaced emoji-driven featured work cards with screenshot-led, browser-framed previews using the existing CMS `project.preview` field.
- Added clear direct live website links when `project.link` is an HTTP(S) URL.
- Added high-contrast light portfolio styling, mobile grid and accessible placeholder for missing previews.
- Replaced unverified performance statistics with qualitative delivery principles.
- Preserved CMS project records, admin modules and routes.

## Limitations and next steps
- Screenshot images must be uploaded and saved through the existing CMS. The admin upload persistence issue is not fixed in this batch.
- The case study action goes to the existing `/case-studies` listing; project-specific case study routes are planned for a later phase.
- Production build and browser checks should run before deployment.
