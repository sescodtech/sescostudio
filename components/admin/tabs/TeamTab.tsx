'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Table, Tr, Td, Btn, Field, Input, Textarea } from '@/components/admin/ui';
import Modal from '@/components/admin/Modal';
import { TeamMember } from '@/types/cms';

export default function TeamTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [form, setForm] = useState<Partial<TeamMember>>({});

  const openAdd = () => { setEditing(null); setForm({ initials: '', name: '', role: '', bio: '' }); setModalOpen(true); };
  const openEdit = (m: TeamMember) => { setEditing(m); setForm(m); setModalOpen(true); };
  const remove = async (id: number) => {
    if (!confirm('Remove this team member?')) return;
    try {
      await save({ team: data.team.filter(m => m.id !== id) });
      toast('Team member removed');
    } catch {
      toast('Failed to delete — check your connection', 'error');
    }
  };
  const handleSave = async () => {
    if (!form.name?.trim()) { toast('Name is required', 'error'); return; }
    const obj: TeamMember = { id: editing?.id || Date.now(), initials: form.initials || '', name: form.name || '', role: form.role || '', bio: form.bio || '' };
    const next = editing ? data.team.map(m => m.id === editing.id ? obj : m) : [...data.team, obj];
    try {
      await save({ team: next });
      setModalOpen(false);
      toast(editing ? 'Team member updated' : 'Team member added');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <>
      <Card title="Team" action={<Btn variant="primary" size="sm" onClick={openAdd}>+ Add Team Member</Btn>}>
        <p style={{ color: 'var(--gray)', fontSize: '.82rem', marginBottom: 16 }}>Shown on the About page.</p>
        <Table headers={['Avatar', 'Name', 'Role', 'Actions']}>
          {data.team.map(m => (
            <Tr key={m.id}>
              <Td><div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.72rem', color: 'var(--blue)' }}>{m.initials}</div></Td>
              <Td title>{m.name}</Td>
              <Td>{m.role}</Td>
              <Td>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="outline" size="sm" onClick={() => openEdit(m)}>Edit</Btn>
                  <Btn variant="danger" size="sm" onClick={() => remove(m.id)}>Delete</Btn>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      <Modal open={modalOpen} title={editing ? 'Edit Team Member' : 'Add Team Member'} onClose={() => setModalOpen(false)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 16 }}>
          <Field label="Initials"><Input maxLength={2} value={form.initials || ''} onChange={e => setForm({ ...form, initials: e.target.value })} /></Field>
          <Field label="Name"><Input value={form.name || ''} onChange={e => setForm({ ...form, name: e.target.value })} /></Field>
        </div>
        <Field label="Role"><Input value={form.role || ''} onChange={e => setForm({ ...form, role: e.target.value })} /></Field>
        <Field label="Bio"><Textarea value={form.bio || ''} onChange={e => setForm({ ...form, bio: e.target.value })} /></Field>
        <Btn variant="primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSave}>{editing ? 'Save Changes' : 'Add Team Member'}</Btn>
      </Modal>
    </>
  );
}
