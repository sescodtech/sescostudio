'use client';
import { useState, useRef } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Input, Btn } from '@/components/admin/ui';
import { usePermissions } from '@/lib/permissions';

export function ContactInfoTabImpl() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [prevContact, setPrevContact] = useState(data.contact);
  const [form, setForm] = useState(data.contact);

  if (data.contact !== prevContact) {
    setPrevContact(data.contact);
    setForm(data.contact);
  }

  const handleSave = async () => {
    try {
      await save({ contact: form });
      toast('Contact info updated');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <Card title="Contact Information" action={<Btn variant="primary" size="sm" onClick={handleSave}>Save Changes</Btn>}>
      <Field label="Email Address"><Input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} /></Field>
      <Field label="Website URL"><Input value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} /></Field>
      <Field label="Location"><Input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} /></Field>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Twitter/X URL"><Input value={form.twitter || ''} onChange={e => setForm({ ...form, twitter: e.target.value })} placeholder="https://x.com/..." /></Field>
        <Field label="LinkedIn URL"><Input value={form.linkedin || ''} onChange={e => setForm({ ...form, linkedin: e.target.value })} placeholder="https://linkedin.com/..." /></Field>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Instagram URL"><Input value={form.instagram || ''} onChange={e => setForm({ ...form, instagram: e.target.value })} placeholder="https://instagram.com/..." /></Field>
        <Field label="GitHub URL"><Input value={form.github || ''} onChange={e => setForm({ ...form, github: e.target.value })} /></Field>
      </div>
      <Field label="WhatsApp Number (with country code)"><Input value={form.whatsapp || ''} onChange={e => setForm({ ...form, whatsapp: e.target.value })} placeholder="+234..." /></Field>
    </Card>
  );
}

export function CaseStudiesTabImpl() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [prevProjects, setPrevProjects] = useState(data.projects);
  const [drafts, setDrafts] = useState<Record<number, { challenge: string; r1n: string; r1l: string; r2n: string; r2l: string }>>(() => {
    const init: Record<number, { challenge: string; r1n: string; r1l: string; r2n: string; r2l: string }> = {};
    data.projects.forEach(p => {
      init[p.id] = { challenge: p.challenge || '', r1n: p.r1?.n || '', r1l: p.r1?.l || '', r2n: p.r2?.n || '', r2l: p.r2?.l || '' };
    });
    return init;
  });

  if (data.projects !== prevProjects) {
    setPrevProjects(data.projects);
    const init: typeof drafts = {};
    data.projects.forEach(p => {
      init[p.id] = { challenge: p.challenge || '', r1n: p.r1?.n || '', r1l: p.r1?.l || '', r2n: p.r2?.n || '', r2l: p.r2?.l || '' };
    });
    setDrafts(init);
  }

  const handleSaveAll = async () => {
    const next = data.projects.map(p => {
      const d = drafts[p.id];
      if (!d) return p;
      return { ...p, challenge: d.challenge, r1: { n: d.r1n, l: d.r1l }, r2: { n: d.r2n, l: d.r2l } };
    });
    try {
      await save({ projects: next });
      toast('Case study details saved');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  return (
    <Card title="Case Studies">
      <p style={{ color: 'var(--gray)', fontSize: '.88rem', marginBottom: 16 }}>Case studies are generated automatically from your portfolio projects. Add challenge details and result metrics below.</p>
      {data.projects.map(p => (
        <div key={p.id} style={{ marginBottom: 20, padding: 20, background: 'var(--navy2)', borderRadius: 12, border: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontSize: '1.2rem' }}>{p.icon}</span>
            <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700 }}>{p.title}</span>
          </div>
          <Field label="Challenge Description">
            <textarea
              style={{ width: '100%', background: 'var(--navy)', border: '1px solid var(--border)', borderRadius: 8, padding: '11px 14px', color: '#fff', fontSize: '.9rem', minHeight: 60, resize: 'vertical' }}
              value={drafts[p.id]?.challenge || ''}
              onChange={e => setDrafts({ ...drafts, [p.id]: { ...drafts[p.id], challenge: e.target.value } })}
            />
          </Field>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 14 }}>
            <Field label="Result 1 Value"><Input value={drafts[p.id]?.r1n || ''} onChange={e => setDrafts({ ...drafts, [p.id]: { ...drafts[p.id], r1n: e.target.value } })} /></Field>
            <Field label="Result 1 Label"><Input value={drafts[p.id]?.r1l || ''} onChange={e => setDrafts({ ...drafts, [p.id]: { ...drafts[p.id], r1l: e.target.value } })} /></Field>
            <Field label="Result 2 Value"><Input value={drafts[p.id]?.r2n || ''} onChange={e => setDrafts({ ...drafts, [p.id]: { ...drafts[p.id], r2n: e.target.value } })} /></Field>
            <Field label="Result 2 Label"><Input value={drafts[p.id]?.r2l || ''} onChange={e => setDrafts({ ...drafts, [p.id]: { ...drafts[p.id], r2l: e.target.value } })} /></Field>
          </div>
        </div>
      ))}
      <Btn variant="primary" onClick={handleSaveAll}>Save All Case Studies</Btn>
    </Card>
  );
}

export function MediaTabImpl() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const { can } = usePermissions();
  const inputRef = useRef<HTMLInputElement>(null);
  const replaceRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [replaceIdx, setReplaceIdx] = useState<number | null>(null);

  const handleFiles = (files: FileList) => {
    const arr = Array.from(files);
    let done = 0;
    const newMedia: typeof data.media = [];
    setUploading(true);
    arr.forEach(file => {
      const reader = new FileReader();
      reader.onload = async e => {
        newMedia.push({ url: e.target?.result as string, name: file.name, type: file.type });
        done++;
        if (done === arr.length) {
          try {
            await save({ media: [...data.media, ...newMedia] });
            toast(`${arr.length} file(s) uploaded`);
          } catch {
            toast('Upload failed — check your connection', 'error');
          } finally {
            setUploading(false);
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeMedia = async (idx: number) => {
    if (!confirm('Remove this image?')) return;
    const next = [...data.media];
    next.splice(idx, 1);
    try {
      await save({ media: next });
      toast('Image removed');
    } catch {
      toast('Failed to remove — check your connection', 'error');
    }
  };

  const startReplace = (idx: number) => { setReplaceIdx(idx); replaceRef.current?.click(); };
  const handleReplace = (file: File) => {
    if (replaceIdx === null) return;
    const reader = new FileReader();
    reader.onload = async e => {
      const next = [...data.media];
      next[replaceIdx] = { url: e.target?.result as string, name: file.name, type: file.type };
      try {
        await save({ media: next });
        toast('Image replaced');
      } catch {
        toast('Failed to replace — check your connection', 'error');
      } finally {
        setReplaceIdx(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const types = Array.from(new Set(data.media.map(m => m.type.split('/')[0] || 'file')));
  const filtered = data.media
    .map((m, i) => ({ ...m, idx: i }))
    .filter(m => (typeFilter === 'all' || m.type.startsWith(typeFilter)) && m.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <Card title="Media Library" action={<Btn variant="primary" size="sm" onClick={() => inputRef.current?.click()} disabled={uploading}>{uploading ? 'Uploading…' : '+ Upload'}</Btn>}>
      <input ref={inputRef} type="file" accept="image/*" multiple style={{ display: 'none' }} onChange={e => e.target.files && handleFiles(e.target.files)} />
      <input ref={replaceRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleReplace(f); e.target.value = ''; }} />
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={e => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={e => { e.preventDefault(); setDrag(false); if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files); }}
        style={{ border: `2px dashed ${drag ? 'var(--blue)' : 'var(--border)'}`, borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer', marginBottom: 20, transition: 'border-color .3s' }}
      >
        <span style={{ fontSize: '2rem', display: 'block', marginBottom: 10 }}>🖼️</span>
        <p style={{ color: 'var(--gray)', fontSize: '.88rem' }}>Click or drag images to upload</p>
        <p style={{ color: 'var(--gray2)', fontSize: '.75rem' }}>PNG, JPG, WebP, SVG — Multiple files supported</p>
      </div>

      {data.media.length > 0 && (
        <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by filename…" style={{ maxWidth: 240 }} />
          <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="form-input" style={{ width: 'auto', padding: '10px 14px' }}>
            <option value="all">All types</option>
            {types.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      )}

      {!data.media.length ? (
        <p style={{ color: 'var(--gray)', fontSize: '.88rem' }}>No media uploaded yet.</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: 'var(--gray)', fontSize: '.88rem' }}>No files match your search.</p>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(130px,1fr))', gap: 12 }}>
          {filtered.map(m => (
            <div key={m.idx} className="media-item" style={{ aspectRatio: '1', borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
              <img src={m.url} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div className="media-item-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(11,15,26,.82)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, opacity: 0, transition: 'opacity .2s' }}>
                <p style={{ color: '#fff', fontSize: '.68rem', padding: '0 8px', textAlign: 'center', wordBreak: 'break-all', maxHeight: 32, overflow: 'hidden' }}>{m.name}</p>
                <div style={{ display: 'flex', gap: 6 }}>
                  {can('manage_media_delete') && <button onClick={() => startReplace(m.idx)} title="Replace" style={{ width: 24, height: 24, background: 'var(--blue)', borderRadius: 5, border: 'none', color: '#fff', fontSize: '.65rem', cursor: 'pointer' }}>⟳</button>}
                  {can('manage_media_delete') && <button onClick={() => removeMedia(m.idx)} title="Delete" style={{ width: 24, height: 24, background: 'rgba(239,68,68,.9)', borderRadius: 5, border: 'none', color: '#fff', fontSize: '.65rem', cursor: 'pointer' }}>✕</button>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export function SettingsTabImpl() {
  const { data, save, reset } = useCMS();
  const { toast } = useToast();
  const importRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `sesco-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    toast('Data exported');
  };

  const importData = (file: File) => {
    const reader = new FileReader();
    reader.onload = async e => {
      try {
        const parsed = JSON.parse(e.target?.result as string);
        await save(parsed);
        toast('Data imported successfully');
      } catch {
        toast('Invalid JSON file or save failed', 'error');
      }
    };
    reader.readAsText(file);
  };

  const handleReset = async () => {
    if (!confirm('Reset all CMS data to defaults? This cannot be undone.')) return;
    try {
      await reset();
      toast('Reset to defaults');
    } catch {
      toast('Failed to reset — check your connection', 'error');
    }
  };

  return (
    <div>
      <Card title="Security">
        <p style={{ color: 'var(--gray)', fontSize: '.85rem' }}>
          Admin access is managed by Supabase Auth (email + password) — see <strong style={{ color: 'var(--gray2)' }}>SUPABASE_SETUP.md</strong> to add or remove admin users. Content is protected by Supabase Row Level Security policies.
        </p>
      </Card>

      <Card title="Data Management">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Btn variant="outline" onClick={exportData}>⬇ Export All Data</Btn>
          <Btn variant="outline" onClick={() => importRef.current?.click()}>⬆ Import Data</Btn>
          <input ref={importRef} type="file" accept=".json" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && importData(e.target.files[0])} />
          <Btn variant="danger" onClick={handleReset}>⚠ Reset to Defaults</Btn>
        </div>
      </Card>

      <Card title="Site Preferences">
        <p style={{ color: 'var(--gray)', fontSize: '.85rem' }}>Particle background, scroll reveal animations, and footer branding toggles are configured directly in code for this build — request changes here if you&apos;d like them surfaced in the dashboard.</p>
      </Card>
    </div>
  );
}
