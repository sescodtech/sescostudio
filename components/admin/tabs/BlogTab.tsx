'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Table, Tr, Td, Badge, Btn, Field, Input, Textarea, Select } from '@/components/admin/ui';
import Modal from '@/components/admin/Modal';
import { BlogPost } from '@/types/cms';

export default function BlogTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});

  const openAdd = () => { setEditing(null); setForm({ title: '', cat: '', date: 'Jun 2025', excerpt: '', icon: '📝', status: 'draft' }); setModalOpen(true); };
  const openEdit = (p: BlogPost) => { setEditing(p); setForm(p); setModalOpen(true); };
  const remove = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    try {
      await save({ blogPosts: data.blogPosts.filter(p => p.id !== id) });
      toast('Post deleted');
    } catch {
      toast('Failed to delete — check your connection', 'error');
    }
  };
  const handleSave = async () => {
    if (!form.title?.trim()) { toast('Post title is required', 'error'); return; }
    const obj: BlogPost = {
      id: editing?.id || Date.now(),
      title: form.title || '', cat: form.cat || '', date: form.date || 'Jun 2025',
      excerpt: form.excerpt || '', icon: form.icon || '📝',
      status: (form.status as 'published' | 'draft') || 'draft',
      bg: editing?.bg || 'linear-gradient(135deg,#0B0F1A,#161D2F)',
      readTime: editing?.readTime || '5 min read',
    };
    const next = editing ? data.blogPosts.map(p => p.id === editing.id ? obj : p) : [...data.blogPosts, obj];
    try {
      await save({ blogPosts: next });
      setModalOpen(false);
      toast(editing ? 'Post updated' : 'Post published');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <>
      <Card title="Blog Posts" action={<Btn variant="primary" size="sm" onClick={openAdd}>+ New Post</Btn>}>
        <Table headers={['#', 'Title', 'Category', 'Date', 'Status', 'Actions']}>
          {data.blogPosts.map((p, i) => (
            <Tr key={p.id}>
              <Td>{i + 1}</Td>
              <Td title>{p.title}</Td>
              <Td><Badge>{p.cat}</Badge></Td>
              <Td>{p.date}</Td>
              <Td><Badge color={p.status === 'published' ? 'green' : 'gold'}>{p.status}</Badge></Td>
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

      <Modal open={modalOpen} title={editing ? 'Edit Post' : 'New Blog Post'} onClose={() => setModalOpen(false)}>
        <Field label="Post Title"><Input value={form.title || ''} onChange={e => setForm({ ...form, title: e.target.value })} /></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Category"><Input value={form.cat || ''} onChange={e => setForm({ ...form, cat: e.target.value })} /></Field>
          <Field label="Date"><Input value={form.date || ''} onChange={e => setForm({ ...form, date: e.target.value })} /></Field>
        </div>
        <Field label="Excerpt / Summary"><Textarea value={form.excerpt || ''} onChange={e => setForm({ ...form, excerpt: e.target.value })} /></Field>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          <Field label="Icon (emoji)"><Input value={form.icon || ''} onChange={e => setForm({ ...form, icon: e.target.value })} /></Field>
          <Field label="Status">
            <Select value={form.status || 'draft'} onChange={e => setForm({ ...form, status: e.target.value as 'published' | 'draft' })}>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </Select>
          </Field>
        </div>
        <Btn variant="primary" style={{ width: '100%', justifyContent: 'center' }} onClick={handleSave}>{editing ? 'Save Changes' : 'Publish Post'}</Btn>
      </Modal>
    </>
  );
}
