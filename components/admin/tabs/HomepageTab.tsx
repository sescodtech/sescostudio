'use client';
import { useState, useEffect } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Input, Textarea, Btn } from '@/components/admin/ui';

export default function HomepageTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [headline, setHeadline] = useState(data.heroHeadline);
  const [sub, setSub] = useState(data.heroSub);

  useEffect(() => { setHeadline(data.heroHeadline); setSub(data.heroSub); }, [data.heroHeadline, data.heroSub]);

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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="CTA Button 1 Text"><Input defaultValue="Start a Project" /></Field>
          <Field label="CTA Button 2 Text"><Input defaultValue="View Services" /></Field>
        </div>
      </Card>

      <Card title="Stats Bar">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
          <Field label="Stat 1 Number"><Input defaultValue="50+" /></Field>
          <Field label="Stat 1 Label"><Input defaultValue="Projects Delivered" /></Field>
          <Field label="Stat 2 Number"><Input defaultValue="5+" /></Field>
          <Field label="Stat 2 Label"><Input defaultValue="Years Experience" /></Field>
          <Field label="Stat 3 Number"><Input defaultValue="98%" /></Field>
          <Field label="Stat 3 Label"><Input defaultValue="Client Satisfaction" /></Field>
        </div>
      </Card>

      <Card title="SEO">
        <Field label="Page Title"><Input defaultValue="SESCO STUDIO — Building Digital Systems for Modern Businesses" /></Field>
        <Field label="Meta Description"><Textarea defaultValue="SESCO STUDIO is a premium digital innovation studio. We build systems, not just designs." style={{ minHeight: 70 }} /></Field>
      </Card>
    </div>
  );
}
