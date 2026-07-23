'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Textarea, Btn } from '@/components/admin/ui';

export default function HomepageTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [prevHeadline, setPrevHeadline] = useState(data.heroHeadline);
  const [prevSub, setPrevSub] = useState(data.heroSub);
  const [headline, setHeadline] = useState(data.heroHeadline);
  const [sub, setSub] = useState(data.heroSub);

  if (data.heroHeadline !== prevHeadline || data.heroSub !== prevSub) {
    setPrevHeadline(data.heroHeadline);
    setPrevSub(data.heroSub);
    setHeadline(data.heroHeadline);
    setSub(data.heroSub);
  }

  const handleSave = async () => {
    try {
      await save({ heroHeadline: headline, heroSub: sub });
      toast('Homepage updated');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <div>
      <Card title="Hero Section" action={<Btn variant="primary" size="sm" onClick={handleSave}>Save Changes</Btn>}>
        <Field label="Hero Headline (use a newline for a second line)">
          <Textarea value={headline} onChange={e => setHeadline(e.target.value)} style={{ minHeight: 60 }} />
        </Field>
        <Field label="Hero Sub-description">
          <Textarea value={sub} onChange={e => setSub(e.target.value)} />
        </Field>
      </Card>

      <Card title="Coming in a Future Update">
        <p style={{ color: 'var(--gray)', fontSize: '.85rem', lineHeight: 1.7 }}>
          The Stats Bar (Projects Delivered, Years Experience, etc.), CTA button labels, and per-page SEO metadata are not yet editable from here — they&apos;re still hardcoded in the site&apos;s components. These are good candidates for the next CMS expansion phase.
        </p>
      </Card>
    </div>
  );
}
