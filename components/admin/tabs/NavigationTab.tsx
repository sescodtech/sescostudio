'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Input, Btn, Table, Tr, Td } from '@/components/admin/ui';
import { NavLink } from '@/types/cms';

export default function NavigationTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [prevNav, setPrevNav] = useState(data.navigation);
  const [links, setLinks] = useState<NavLink[]>(data.navigation.links);
  const [ctaLabel, setCtaLabel] = useState(data.navigation.ctaLabel);

  if (data.navigation !== prevNav) {
    setPrevNav(data.navigation);
    setLinks(data.navigation.links);
    setCtaLabel(data.navigation.ctaLabel);
  }

  const updateLink = (id: number, field: 'label' | 'href', value: string) => {
    setLinks(links.map(l => l.id === id ? { ...l, [field]: value } : l));
  };
  const removeLink = (id: number) => setLinks(links.filter(l => l.id !== id));
  const addLink = () => setLinks([...links, { id: Date.now(), label: 'New Link', href: '/' }]);

  const handleSave = async () => {
    if (saving) return;
    if (links.some(l => !l.label.trim() || !l.href.trim())) { toast('Every link needs a label and a URL', 'error'); return; }
    if (links.some(l => !/^(\/|https?:\/\/|mailto:|tel:|#)/i.test(l.href.trim()))) { toast('Use a site path (/services) or a valid URL', 'error'); return; }
    setSaving(true);
    try {
      await save({ navigation: { links, ctaLabel } });
      toast('Navigation updated');
    } catch {
      toast('Failed to save — check your connection', 'error');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card title="Navigation" action={<Btn variant="primary" size="sm" onClick={handleSave} disabled={saving}>{saving ? "Saving…" : "Save Changes"}</Btn>}>
      <p style={{ color: 'var(--gray)', fontSize: '.82rem', marginBottom: 16 }}>Controls the header menu (desktop and mobile) and footer navigation column.</p>
      <Table headers={['Label', 'URL', '']}>
        {links.map(l => (
          <Tr key={l.id}>
            <Td><Input value={l.label} onChange={e => updateLink(l.id, 'label', e.target.value)} /></Td>
            <Td><Input value={l.href} onChange={e => updateLink(l.id, 'href', e.target.value)} /></Td>
            <Td><Btn variant="danger" size="sm" onClick={() => removeLink(l.id)}>Remove</Btn></Td>
          </Tr>
        ))}
      </Table>
      <Btn variant="outline" size="sm" onClick={addLink} style={{ marginTop: 12 }}>+ Add Link</Btn>

      <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border)' }}>
        <Field label="Header CTA Button Label"><Input value={ctaLabel} onChange={e => setCtaLabel(e.target.value)} /></Field>
      </div>
    </Card>
  );
}
