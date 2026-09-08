'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { usePermissions } from '@/lib/permissions';
import { Card, Table, Tr, Td, Badge, Btn, Field, Input, Textarea, Select } from '@/components/admin/ui';
import Modal from '@/components/admin/Modal';
import { BlogPost } from '@/types/cms';

export default function BlogTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const { user } = useAdminAuth();
  const { can } = usePermissions();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({});

  const canManageAll = can('manage_blog_all');
  const canOwn = (p: BlogPost) => canManageAll || (can('create_blog') && p.authorEmail === user?.email);

  const openAdd = () => { setEditing(null); setForm({ title: '', cat: '', date: 'Sep 2026', excerpt: '', content: '', icon: '📝', status: 'draft' }); setModalOpen(true); };
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
      excerpt: form.excerpt || '', content: form.content || '', icon: form.icon || '📝',
      status: (form.status as 'published' | 'draft') || 'draft',
      bg: editing?.bg || 'linear-gradient(135deg,#0B0F1A,#161D2F)',
      readTime: editing?.readTime || '5 min read',
      authorEmail: editing?.authorEmail || user?.email,
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
      <Card title="Blog Posts" action={(canManageAll || can('create_blog')) && <Btn variant="primary" size="sm" onClick={openAdd}>+ New Post</Btn>}>
        {!canManageAll && can('create_blog') && (
          <p style={{ color: 'var(--gray)', fontSize: '.82rem', marginBottom: 16 }}>You can create posts and edit your own — posts by other authors are shown but locked.</p>
        )}
        <Table headers={['#', 'Title', 'Category', 'Date', 'Status', 'Actions']}>
          {data.blogPosts.map((p, i) => (
            <Tr key={p.id}>
              <Td>{i + 1}</Td>
              <Td title>{p.title}{p.authorEmail && !canManageAll && <span style={{ color: 'var(--gray2)', fontSize: '.72rem' }}> — {p.authorEmail === user?.email ? 'you' : p.authorEmail}</span>}</Td>
              <Td><Badge>{p.cat}</Badge></Td>
              <Td>{p.date}</Td>
              <Td><Badge color={p.status === 'published' ? 'green' : 'gold'}>{p.status}</Badge></Td>
              <Td>
                {canOwn(p) ? (
                  <div style={{ display: 'flex', gap: 6 }}>
                    {p.status === 'published' && <a href={`/blog/${p.id}`} target="_blank" rel="noopener noreferrer" style={{ display:'inline-flex', alignItems:'center', padding:'7px 14px', borderRadius:7, border:'1px solid var(--border)', color:'#fff', fontFamily:'Montserrat,sans-serif', fontSize:'.6rem', fontWeight:600, letterSpacing:'.08em', textTransform:'uppercase', textDecoration:'none' }}>View</a>}<Btn variant="outline" size="sm" onClick={() => openEdit(p)}>Edit</Btn>
                    {canManageAll && <Btn variant="danger" size="sm" onClick={() => remove(p.id)}>Delete</Btn>}
                  </div>
                ) : (
                  <span style={{ color: 'var(--gray2)', fontSize: '.78rem' }}>—</span>
                )}
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
        <Field label="Article Content"><Textarea value={form.content || ''} onChange={e => setForm({ ...form, content: e.target.value })} placeholder="Write the full article here. Use blank lines between paragraphs." style={{ minHeight: 240 }} /></Field>
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
