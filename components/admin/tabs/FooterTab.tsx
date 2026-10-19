'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Textarea, Btn } from '@/components/admin/ui';

export default function FooterTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [prevFooter, setPrevFooter] = useState(data.footer);
  const [tagline, setTagline] = useState(data.footer.tagline);
  const [servicesLinks, setServicesLinks] = useState(data.footer.servicesLinks.join('\n'));

  if (data.footer !== prevFooter) {
    setPrevFooter(data.footer);
    setTagline(data.footer.tagline);
    setServicesLinks(data.footer.servicesLinks.join('\n'));
  }

  const handleSave = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await save({ footer: { tagline, servicesLinks: servicesLinks.split('\n').map(s => s.trim()).filter(Boolean) } });
      toast('Footer updated');
    } catch {
      toast('Failed to save — check your connection', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Footer" action={<Btn variant="primary" size="sm" onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save Changes"}</Btn>}>
      <Field label="Tagline (use a newline for a second line)">
        <Textarea value={tagline} onChange={e => setTagline(e.target.value)} style={{ minHeight: 70 }} />
      </Field>
      <Field label="Services List (one per line)">
        <Textarea value={servicesLinks} onChange={e => setServicesLinks(e.target.value)} style={{ minHeight: 130 }} />
      </Field>
      <p style={{ color: 'var(--gray)', fontSize: '.8rem' }}>Logo, social links, and contact details are managed on the Logo and Contact Info tabs.</p>
    </Card>
  );
}
