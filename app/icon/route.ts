import { supabase } from '@/lib/supabase';
import { DEFAULT_CMS } from '@/lib/cms';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function parseDataUrl(value: string) {
  const match = value.match(/^data:([^;,]+)(?:;charset=[^;,]+)?;base64,(.+)$/);
  if (!match) return null;
  const bytes = Uint8Array.from(Buffer.from(match[2], 'base64'));
  return { bytes, type: match[1] };
}

export async function GET() {
  let favicon = DEFAULT_CMS.favicon;
  try {
    const { data } = await supabase.from('sesco_cms').select('content').eq('id', 1).maybeSingle();
    favicon = data?.content?.favicon || favicon;
  } catch {}

  if (favicon) {
    const parsed = parseDataUrl(favicon);
    if (parsed) return new Response(parsed.bytes, { headers: { 'Content-Type': parsed.type, 'Cache-Control': 'no-store, max-age=0' } });
  }

  return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store, max-age=0' } });
}
