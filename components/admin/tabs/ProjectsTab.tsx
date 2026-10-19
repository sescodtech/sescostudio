'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Table, Tr, Td, Badge, Btn, Field, Input, Textarea, UploadZone } from '@/components/admin/ui';
import Modal from '@/components/admin/Modal';
import { Project } from '@/types/cms';
import { uploadProjectPreview } from '@/lib/projectMedia';

export default function ProjectsTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState<Partial<Project> & { tagsStr?: string }>({});

  const openAdd = () => { setEditing(null); setForm({ title: '', type: '', desc: '', icon: '', preview: null as any, results: '', tagsStr: '', bg: 'linear-gradient(135deg,#0B0F1A,#161D2F)' }); setModalOpen(true); };
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
    if (saving) return;
    setSaving(true);
    try {
    const previewUrl = form.preview?.startsWith('data:') ? await uploadProjectPreview(form.preview) : form.preview;
    const obj: Project = {
      id: editing?.id || Date.now(),
      title: form.title || '', type: form.type || '', desc: form.desc || '',
      icon: form.icon || '🌐', results: form.results || '',
      tags: (form.tagsStr || '').split(',').map(t => t.trim()).filter(Boolean),
      bg: form.bg || 'linear-gradient(135deg,#0B0F1A,#161D2F)',
      challenge: editing?.challenge, r1: editing?.r1, r2: editing?.r2,
      link: form.link?.trim() || undefined, preview: previewUrl || undefined,
    };
    const next = editing ? data.projects.map(p => p.id === editing.id ? obj : p) : [...data.projects, obj];
    try {
      await save({ projects: next });
      setModalOpen(false);
      toast(editing ? 'Project updated' : 'Project added');
    } catch (error) {
      toast(error instanceof Error ? error.message : 'Unable to save project', 'error');
    }
    } finally { setSaving(false); }
  };

  return (
    <>
      <Card title="Portfolio Projects" action={<Btn variant="primary" size="sm" onClick={openAdd}>+ Add Project</Btn>}>
        <Table headers={['#', 'Preview', 'Title', 'Type', 'Results', 'Actions']}>
          {data.projects.map((p, i) => (
            <Tr key={p.id}>
              <Td>{i + 1}</Td>
              <Td>{p.preview ? <img src={p.preview} alt={`${p.title} preview`} style={{ width: 88, height: 55, objectFit: 'cover', borderRadius: 7 }} /> : <span style={{ color: 'var(--gray)', fontSize: '.7rem' }}>No preview</span>}</Td>
              <Td title>{p.title}</Td>
              <Td><Badge>{p.type}</Badge></Td>
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
          <Field label="Website Preview Screenshot"><UploadZone preview={form.preview || null} icon="▣" label="Upload the live website screenshot" hint="PNG, JPG or WebP · 16:9 recommended · automatically optimized for saving" onFile={url => setForm(prev => ({ ...prev, preview: url }))} /></Field>
          <Field label="Live Website URL"><Input value={form.link || ''} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://clientwebsite.com" /></Field>
          <Field label="Icon (optional)"><Input value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} /></Field>
          <Field label="Key Results"><Input value={form.results || ''} onChange={e => setForm({ ...form, results: e.target.value })} /></Field>
        </div>
        <Field label="Technologies (comma separated)"><Input value={form.tagsStr || ''} onChange={e => setForm({ ...form, tagsStr: e.target.value })} /></Field>
        <Field label="Background CSS"><Input value={form.bg || ''} onChange={e => setForm({ ...form, bg: e.target.value })} /></Field>
        <Btn variant="primary" disabled={saving} style={{ width: '100%', justifyContent: 'center', opacity: saving ? .65 : 1 }} onClick={handleSave}>{saving ? 'Uploading & saving…' : editing ? 'Save Changes' : 'Add Project'}</Btn>
      </Modal>
    </>
  );
}
