'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Textarea, Btn } from '@/components/admin/ui';

export default function HomepageTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
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
    if (saving) return;
    setSaving(true);
    try {
      await save({ heroHeadline: headline, heroSub: sub });
      toast('Homepage updated');
    } catch {
      toast('Failed to save — check your connection', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <Card title="Hero Section" action={<Btn variant="primary" size="sm" onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save Changes"}</Btn>}>
        <Field label="Hero Headline (use a newline for a second line)">
          <Textarea value={headline} onChange={e => setHeadline(e.target.value)} style={{ minHeight: 60 }} />
        </Field>
        <Field label="Hero Sub-description">
          <Textarea value={sub} onChange={e => setSub(e.target.value)} />
        </Field>
      </Card>

      <Card title="CMS Scope">
        <p style={{ color: 'var(--gray)', fontSize: '.85rem', lineHeight: 1.7 }}>
          This editor manages the homepage hero copy. Navigation, footer, SEO, services, projects, testimonials and FAQs have dedicated editing sections. Changes are saved to the configured CMS database.
        </p>
      </Card>
    </div>
  );
}
