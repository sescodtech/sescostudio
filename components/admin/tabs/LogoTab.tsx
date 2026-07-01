'use client';
import { useState, useRef } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Btn } from '@/components/admin/ui';

function UploadZone({ preview, icon, label, hint, onFile }: { preview: string | null; icon: string; label: string; hint: string; onFile: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  const readFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = e => onFile(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f) readFile(f); }}
      style={{ border: `2px dashed ${drag ? 'var(--blue)' : 'var(--border)'}`, borderRadius: 12, padding: 40, textAlign: 'center', cursor: 'pointer', transition: 'border-color .3s,background .3s', background: drag ? 'rgba(47,107,255,.08)' : 'transparent' }}
    >
      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) readFile(f); }} />
      {preview ? (
        <img src={preview} alt="preview" style={{ maxHeight: 120, margin: '0 auto 16px', objectFit: 'contain' }} />
      ) : (
        <span style={{ fontSize: '2.5rem', marginBottom: 12, display: 'block' }}>{icon}</span>
      )}
      <p style={{ color: 'var(--gray)', fontSize: '.88rem', marginBottom: 8 }}>{label}</p>
      <p style={{ color: 'var(--gray2)', fontSize: '.75rem' }}>{hint}</p>
    </div>
  );
}

export default function LogoTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [pendingLogo, setPendingLogo] = useState<string | null>(null);
  const [pendingFav, setPendingFav] = useState<string | null>(null);

  const handleSave = async () => {
    const updates: Partial<typeof data> = {};
    if (pendingLogo) updates.logo = pendingLogo;
    if (pendingFav) updates.favicon = pendingFav;
    try {
      await save(updates);
      setPendingLogo(null);
      setPendingFav(null);
      toast('Logo saved — now live across the whole site');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  const swatches = [
    { name: 'Deep Navy', hex: '#0B0F1A' }, { name: 'Electric Blue', hex: '#2F6BFF' },
    { name: 'Premium Gold', hex: '#C8A24A' }, { name: 'Gray', hex: '#A7B0C0' },
  ];

  return (
    <div>
      <Card title="Logo Management" action={<Btn variant="primary" size="sm" onClick={handleSave}>Save Logo</Btn>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 8 }}>Primary Logo</p>
            <UploadZone preview={pendingLogo || data.logo} icon="🎨" label="Click or drag to upload your SESCO STUDIO logo" hint="PNG, SVG, or WebP · Transparent background recommended" onFile={setPendingLogo} />
          </div>
          <div>
            <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 8 }}>Favicon</p>
            <UploadZone preview={pendingFav || data.favicon} icon="🔖" label="Upload favicon" hint="ICO, PNG · 32×32 or 64×64 recommended" onFile={setPendingFav} />
          </div>
        </div>

        <div style={{ marginTop: 20, padding: 16, background: 'var(--navy2)', borderRadius: 8, border: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 12 }}>Current Logo Preview</p>
          <div style={{ padding: 20, background: 'var(--navy)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
            {(pendingLogo || data.logo) ? (
              <img src={pendingLogo || data.logo!} alt="logo" style={{ height: 36, width: 'auto' }} />
            ) : (
              <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.95rem' }}>SESCO <span style={{ color: 'var(--blue)' }}>STUDIO</span></span>
            )}
          </div>
        </div>
      </Card>

      <Card title="Brand Colors Reference">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {swatches.map(s => (
            <div key={s.hex} style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 8, background: s.hex, border: '1px solid var(--border)', marginBottom: 6 }} />
              <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.08em', color: 'var(--gray)' }}>{s.name}</div>
              <div style={{ fontSize: '.75rem', color: 'var(--gray2)' }}>{s.hex}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
