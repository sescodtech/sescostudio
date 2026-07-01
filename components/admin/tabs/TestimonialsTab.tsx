'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Table, Tr, Td, Btn, Field, Input, Textarea, Select } from '@/components/admin/ui';
import Modal from '@/components/admin/Modal';
import { Testimonial } from '@/types/cms';

export default function TestimonialsTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [form, setForm] = useState<Partial<Testimonial>>({});

  const openAdd = () => { setEditing(null); setForm({ name: '', initials: '', role: '', quote: '', stars: 5 }); setModalOpen(true); };
  const openEdit = (t: Testimonial) => { setEditing(t); setForm(t); setModalOpen(true); };
  const remove = async (id: number) => {
    if (!confirm('Delete this testimonial?')) return;
    try {
      await save({ testimonials: data.testimonials.filter(t => t.id !== id) });
      toast('Testimonial deleted');
    } catch {
      toast('Failed to delete — check your connection', 'error');
    }
  };
  const handleSave = async () => {
    const obj: Testimonial = {
      id: editing?.id || Date.now(),
      name: form.name || '', initials: form.initials || '', role: form.role || '',
      quote: form.quote || '', stars: Number(form.stars) || 5,
    };
    const next = editing ? data.testimonials.map(t => t.id === editing.id ? obj : t) : [...data.testimonials, obj];
    try {
      await save({ testimonials: next });
      setModalOpen(false);
      toast(editing ? 'Testimonial updated' : 'Testimonial added');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <>
      <Card title="Testimonials" action={<Btn variant="primary" size="sm" onClick={openAdd}>+ Add Testimonial</Btn>}>
        <Table headers={['Avatar', 'Name', 'Role', 'Stars', 'Actions']}>
          {data.testimonials.map(t => (
            <Tr key={t.id}>
              <Td><div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.72rem', color: 'var(--blue)' }}>{t.initials}</div></Td>
              <Td title>{t.name}</Td>
              <Td>{t.role}</Td>
              <Td>{'★'.repeat(t.stars)}</Td>
              <Td>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="outline" size="sm" onClick={() => openEdit(t)}>Edit</Btn>
                  <Btn variant="danger" size="sm" onClick={() => remove(t.id)}>Delete</Btn>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      <Modal open={modalOpen} title={editing ? 'Edit Testimonial' : 'Add Testimonial'} onClose={() => setModalOpen(false)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Client / Company Name"><Input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="Initials"><Input maxLength={2} value={form.initials || ''} onChange={e => setForm({ ...form, initials: e.target.value })} /></Field>
        </div>
        <Field label="Role / Project Type"><Input value={form.role || ''} onChange={e => setForm({ ...form, role: e.target.value })} /></Field>
        <Field label="Quote"><Textarea value={form.quote || ''} onChange={e => setForm({ ...form, quote: e.target.value })} /></Field>
        <Field label="Star Rating">
          <Select value={form.stars || 5} onChange={e => setForm({ ...form, stars: Number(e.target.value) })}>
            <option value={5}>★★★★★ 5 stars</option>
            <option value={4}>★★★★ 4 stars</option>
            <option value={3}>★★★ 3 stars</option>
          </Select>
        </Field>
        <Btn variant="primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSave}>{editing ? 'Save Changes' : 'Add Testimonial'}</Btn>
      </Modal>
    </>
  );
}
