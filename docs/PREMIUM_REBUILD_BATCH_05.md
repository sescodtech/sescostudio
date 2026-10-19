# Batch 05 — Portfolio Media & Save Reliability

## Changes
- Upload project screenshots to Supabase Storage, not as Base64 inside CMS JSON.
- Display uploaded thumbnails in the project administration table.
- Prevent duplicate save clicks and show upload progress text.
- Surface actionable upload errors and preserve the form on failure.
- Only update CMS React state and local cache after Supabase accepts the save.
- Allow horizontal scrolling for admin tables on mobile.

## Deployment prerequisite
Run `supabase/project-previews-storage.sql` in Supabase SQL Editor before uploading images. Review the insert policy: it permits any authenticated account to upload to this bucket. Tighten it to existing admin/staff permissions before exposing registration to untrusted users. The CMS table also needs appropriate RLS write restrictions. Do not put Supabase service-role keys in the browser.

## Verification
1. Sign in as an authorized admin and upload a screenshot.
2. Save, reload, and confirm the screenshot is still present on the public portfolio.
3. Try a large/invalid image and confirm an error appears without closing the editor.
4. Test from a mobile device and check project-table horizontal scrolling.
5. Run `npm ci && npm run build` and browser QA before production deployment.

## Limitations
Other image fields (logo, SEO image and media library) still use existing CMS storage and require a later migration. This batch targets project screenshots specifically.
