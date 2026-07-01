'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Table, Tr, Td, Badge, Btn, Field, Input, Textarea, Select } from '@/components/admin/ui';
import Modal from '@/components/admin/Modal';
import { Service } from '@/types/cms';

export default function ServicesTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [form, setForm] = useState<Partial<Service>>({});

  const openAdd = () => { setEditing(null); setForm({ tag: '', icon: '🌐', title: '', desc: '', color: 'blue' }); setModalOpen(true); };
  const openEdit = (s: Service) => { setEditing(s); setForm(s); setModalOpen(true); };
  const remove = async (id: number) => {
    if (!confirm('Delete this service?')) return;
    try {
      await save({ services: data.services.filter(s => s.id !== id) });
      toast('Service deleted');
    } catch {
      toast('Failed to delete — check your connection', 'error');
    }
  };
  const handleSave = async () => {
    const obj: Service = {
      id: editing?.id || Date.now(),
      tag: form.tag || '', icon: form.icon || '🌐', title: form.title || '',
      desc: form.desc || '', color: (form.color as 'blue' | 'gold') || 'blue',
    };
    const next = editing ? data.services.map(s => s.id === editing.id ? obj : s) : [...data.services, obj];
    try {
      await save({ services: next });
      setModalOpen(false);
      toast(editing ? 'Service updated' : 'Service added');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <>
      <Card title="Services" action={<Btn variant="primary" size="sm" onClick={openAdd}>+ Add Service</Btn>}>
        <Table headers={['#', 'Icon', 'Tag', 'Title', 'Color', 'Actions']}>
          {data.services.map((s, i) => (
            <Tr key={s.id}>
              <Td>{i + 1}</Td>
              <Td><span style={{ fontSize: '1.2rem' }}>{s.icon}</span></Td>
              <Td><Badge color="gold">{s.tag}</Badge></Td>
              <Td title>{s.title}</Td>
              <Td><Badge color={s.color}>{s.color}</Badge></Td>
              <Td>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="outline" size="sm" onClick={() => openEdit(s)}>Edit</Btn>
                  <Btn variant="danger" size="sm" onClick={() => remove(s.id)}>Delete</Btn>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      <Modal open={modalOpen} title={editing ? 'Edit Service' : 'Add Service'} onClose={() => setModalOpen(false)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Tag"><Input value={form.tag || ''} onChange={e => setForm({ ...form, tag: e.target.value })} /></Field>
          <Field label="Icon (emoji)"><Input value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} /></Field>
        </div>
        <Field label="Title"><Input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} /></Field>
        <Field label="Description"><Textarea value={form.desc || ''} onChange={e => setForm({ ...form, desc: e.target.value })} /></Field>
        <Field label="Accent Color">
          <Select value={form.color || 'blue'} onChange={e => setForm({ ...form, color: e.target.value as 'blue' | 'gold' })}>
            <option value="blue">Electric Blue</option>
            <option value="gold">Gold</option>
          </Select>
        </Field>
        <Btn variant="primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSave}>{editing ? 'Save Changes' : 'Add Service'}</Btn>
      </Modal>
    </>
  );
}
