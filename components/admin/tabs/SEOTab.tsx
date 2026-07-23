'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Input, Textarea, Btn, UploadZone } from '@/components/admin/ui';

export default function SEOTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [prevSeo, setPrevSeo] = useState(data.seo);
  const [title, setTitle] = useState(data.seo.defaultTitle);
  const [desc, setDesc] = useState(data.seo.defaultDescription);
  const [twitterHandle, setTwitterHandle] = useState(data.seo.twitterHandle || '');
  const [ogImage, setOgImage] = useState<string | null>(data.seo.ogImage);

  if (data.seo !== prevSeo) {
    setPrevSeo(data.seo);
    setTitle(data.seo.defaultTitle);
    setDesc(data.seo.defaultDescription);
    setTwitterHandle(data.seo.twitterHandle || '');
    setOgImage(data.seo.ogImage);
  }

  const handleSave = async () => {
    if (!title.trim()) { toast('Meta title is required', 'error'); return; }
    try {
      await save({ seo: { defaultTitle: title, defaultDescription: desc, ogImage, twitterHandle } });
      toast('SEO settings updated — live within 5 minutes');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <Card title="SEO" action={<Btn variant="primary" size="sm" onClick={handleSave}>Save Changes</Btn>}>
      <p style={{ color: 'var(--gray)', fontSize: '.82rem', marginBottom: 16 }}>
        Site-wide defaults used for search engines and social sharing previews. Changes take up to 5 minutes to appear live.
      </p>
      <Field label="Meta Title"><Input value={title} onChange={e => setTitle(e.target.value)} /></Field>
      <Field label="Meta Description"><Textarea value={desc} onChange={e => setDesc(e.target.value)} style={{ minHeight: 90 }} /></Field>
      <Field label="Twitter Handle (optional, e.g. @sescostudio)"><Input value={twitterHandle} onChange={e => setTwitterHandle(e.target.value)} placeholder="@sescostudio" /></Field>
      <Field label="Social Share Image (Open Graph)">
        <UploadZone preview={ogImage} icon="🖼️" label="Upload a 1200×630 image for link previews" hint="PNG or JPG · Shown when the site is shared on social media" onFile={setOgImage} />
      </Field>
      {ogImage && <Btn variant="outline" size="sm" onClick={() => setOgImage(null)}>Remove Image</Btn>}
    </Card>
  );
}
