import { supabase } from '@/lib/supabase';

const BUCKET = 'sesco-project-previews';

/** Upload images separately from the CMS JSON document. */
export async function uploadProjectPreview(dataUrl: string): Promise<string> {
  if (!dataUrl.startsWith('data:image/')) return dataUrl;
  const match = /^data:(image\/(?:png|jpeg|webp));base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error('Use a PNG, JPG or WebP screenshot.');
  const mime = match[1];
  const bytes = Uint8Array.from(atob(match[2]), char => char.charCodeAt(0));
  if (bytes.byteLength > 5 * 1024 * 1024) throw new Error('Screenshot exceeds 5 MB after optimization.');
  const extension = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
  const filename = `${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from(BUCKET).upload(filename, bytes, { contentType: mime, upsert: false, cacheControl: '3600' });
  if (error) throw new Error(`Screenshot upload failed: ${error.message}. Check the storage bucket and permissions.`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filename);
  return data.publicUrl;
}
