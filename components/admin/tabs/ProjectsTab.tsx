'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Table, Tr, Td, Badge, Btn, Field, Input, Textarea } from '@/components/admin/ui';
import Modal from '@/components/admin/Modal';
import { Project } from '@/types/cms';

export default function ProjectsTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project> & { tagsStr?: string }>({});

  const openAdd = () => { setEditing(null); setForm({ title: '', type: '', desc: '', icon: '🌐', results: '', tagsStr: '', bg: 'linear-gradient(135deg,#081426,#132640)', visibility: 'public', accessType: 'live', link: '' }); setModalOpen(true); };
  const openEdit = (p: Project) => { setEditing(p); setForm({ ...p, tagsStr: p.tags.join(', ') }); setModalOpen(true); };
  const remove = async (id: number) => {
    if (!confirm('Delete this project?')) return;
    try {
      await save({ projects: data.projects.filter(p => p.id !== id) });
      toast('Project deleted');
    } catch {
      toast('Failed to delete — check your connection', 'error');
    }
  };
  const handleSave = async () => {
    if (!form.title?.trim()) { toast('Project title is required', 'error'); return; }
    const obj: Project = {
      id: editing?.id || Date.now(),
      title: form.title || '', type: form.type || '', desc: form.desc || '',
      icon: form.icon || '🌐', results: form.results || '',
      tags: (form.tagsStr || '').split(',').map(t => t.trim()).filter(Boolean),
      bg: form.bg || 'linear-gradient(135deg,#081426,#132640)',
      link: form.link?.trim() || undefined,
      visibility: form.visibility || 'public',
      accessType: form.accessType || 'live',
      challenge: editing?.challenge, r1: editing?.r1, r2: editing?.r2,
    };
    const next = editing ? data.projects.map(p => p.id === editing.id ? obj : p) : [...data.projects, obj];
    try {
      await save({ projects: next });
      setModalOpen(false);
      toast(editing ? 'Project updated' : 'Project added');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <>
      <Card title="Portfolio Projects" action={<Btn variant="primary" size="sm" onClick={openAdd}>+ Add Project</Btn>}>
        <Table headers={['#', 'Icon', 'Title', 'Type', 'Results', 'Actions']}>
          {data.projects.map((p, i) => (
            <Tr key={p.id}>
              <Td>{i + 1}</Td>
              <Td><span style={{ fontSize: '1.2rem' }}>{p.icon}</span></Td>
              <Td title>{p.title}</Td>
              <Td><div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}><Badge>{p.type}</Badge>{p.visibility === 'confidential' && <Badge color="gold">NDA</Badge>}</div></Td>
              <Td><span style={{ color: '#22c55e' }}>{p.results || '—'}</span></Td>
              <Td>
                <div style={{ display: 'flex', gap: 6 }}>
                  <Btn variant="outline" size="sm" onClick={() => openEdit(p)}>Edit</Btn>
                  <Btn variant="danger" size="sm" onClick={() => remove(p.id)}>Delete</Btn>
                </div>
              </Td>
            </Tr>
          ))}
        </Table>
      </Card>

      <Modal open={modalOpen} title={editing ? 'Edit Project' : 'Add Project'} onClose={() => setModalOpen(false)}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Project Title"><Input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} /></Field>
          <Field label="Type / Category"><Input value={form.type || ''} onChange={e => setForm({ ...form, type: e.target.value })} /></Field>
        </div>
        <Field label="Description"><Textarea value={form.desc || ''} onChange={e => setForm({ ...form, desc: e.target.value })} /></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Icon (emoji)"><Input value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} /></Field>
          <Field label="Key Results"><Input value={form.results || ''} onChange={e => setForm({ ...form, results: e.target.value })} /></Field>
        </div>
        <Field label="Technologies (comma separated)"><Input value={form.tagsStr || ''} onChange={e => setForm({ ...form, tagsStr: e.target.value })} /></Field>
        <Field label="Live / Access URL"><Input value={form.link || ''} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://example.com" /><p style={{ color: 'var(--gray)', fontSize: '.72rem', marginTop: 6 }}>Leave empty for NDA, private or offline projects.</p></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Portfolio Visibility"><select className="form-input" value={form.visibility || 'public'} onChange={e => setForm({ ...form, visibility: e.target.value as Project['visibility'] })}><option value="public">Public — show normally</option><option value="confidential">Confidential / NDA — show without restricted access</option></select></Field>
          <Field label="Access Type"><select className="form-input" value={form.accessType || 'live'} onChange={e => setForm({ ...form, accessType: e.target.value as Project['accessType'] })}><option value="live">Live public website</option><option value="client_app">Client web application</option><option value="private_demo">Private / NDA demo</option><option value="none">No public access</option></select></Field>
        </div>
        <Field label="Background CSS"><Input value={form.bg || ''} onChange={e => setForm({ ...form, bg: e.target.value })} /></Field>
        <Btn variant="primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSave}>{editing ? 'Save Changes' : 'Add Project'}</Btn>
      </Modal>
    </>
  );
}
