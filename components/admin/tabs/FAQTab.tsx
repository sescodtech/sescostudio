'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Table, Tr, Td, Btn, Field, Input, Textarea } from '@/components/admin/ui';
import Modal from '@/components/admin/Modal';
import { FAQ } from '@/types/cms';

export default function FAQTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [form, setForm] = useState<Partial<FAQ>>({});

  const openAdd = () => { setEditing(null); setForm({ q: '', a: '' }); setModalOpen(true); };
  const openEdit = (f: FAQ) => { setEditing(f); setForm(f); setModalOpen(true); };
  const remove = async (id: number) => {
    if (!confirm('Delete this question?')) return;
    try {
      await save({ faq: data.faq.filter(f => f.id !== id) });
      toast('Question deleted');
    } catch {
      toast('Failed to delete — check your connection', 'error');
    }
  };
  const handleSave = async () => {
    if (!form.q?.trim() || !form.a?.trim()) { toast('Question and answer are required', 'error'); return; }
    const obj: FAQ = { id: editing?.id || Date.now(), q: form.q || '', a: form.a || '' };
    const next = editing ? data.faq.map(f => f.id === editing.id ? obj : f) : [...data.faq, obj];
    try {
      await save({ faq: next });
      setModalOpen(false);
      toast(editing ? 'Question updated' : 'Question added');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <>
      <Card title="FAQ" action={<Btn variant="primary" size="sm" onClick={openAdd}>+ Add Question</Btn>}>
        <p style={{ color: 'var(--gray)', fontSize: '.82rem', marginBottom: 16 }}>Shown on the Services page, above the closing call to action.</p>
        <Table headers={['Question', 'Answer', 'Actions']}>
          {data.faq.map(f => (
            <Tr key={f.id}>
              <Td title>{f.q}</Td>
              <Td>{f.a.length > 60 ? f.a.slice(0, 60) + '…' : f.a}</Td>
              <Td>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="outline" size="sm" onClick={() => openEdit(f)}>Edit</Btn>
                  <Btn variant="danger" size="sm" onClick={() => remove(f.id)}>Delete</Btn>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      <Modal open={modalOpen} title={editing ? 'Edit Question' : 'Add Question'} onClose={() => setModalOpen(false)}>
        <Field label="Question"><Input value={form.q || ''} onChange={e => setForm({ ...form, q: e.target.value })} /></Field>
        <Field label="Answer"><Textarea value={form.a || ''} onChange={e => setForm({ ...form, a: e.target.value })} style={{ minHeight: 100 }} /></Field>
        <Btn variant="primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSave}>{editing ? 'Save Changes' : 'Add Question'}</Btn>
      </Modal>
    </>
  );
}
