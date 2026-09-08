'use client';
import { useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Btn, UploadZone } from '@/components/admin/ui';

export default function LogoTab() {
  const { data, save } = useCMS();
  const { toast } = useToast();
  const [pendingLogo, setPendingLogo] = useState<string | null>(null);
  const [pendingFav, setPendingFav] = useState<string | null>(null);
  const [clearLogo, setClearLogo] = useState(false);
  const [clearFav, setClearFav] = useState(false);

  const handleSave = async () => {
    const updates: Partial<typeof data> = {};
    updates.logo = clearLogo ? null : (pendingLogo || data.logo);
    updates.favicon = clearFav ? null : (pendingFav || data.favicon);
    try {
      await save(updates);
      setPendingLogo(null);
      setPendingFav(null);
      setClearLogo(false);
      setClearFav(false);
      toast('Logo saved — now live across the whole site');
    } catch {
      toast('Failed to save — check your connection', 'error');
    }
  };

  const removeLogo = () => { setPendingLogo(null); setClearLogo(true); };
  const removeFav = () => { setPendingFav(null); setClearFav(true); };

  const swatches = [
    { name: 'Deep Navy', hex: '#0B0F1A' }, { name: 'Electric Blue', hex: '#2F6BFF' },
    { name: 'Premium Gold', hex: '#C8A24A' }, { name: 'Gray', hex: '#A7B0C0' },
  ];

  const currentLogo = clearLogo ? null : (pendingLogo || data.logo);
  const currentFav = clearFav ? null : (pendingFav || data.favicon);

  return (
    <div>
      <Card title="Logo Management" action={<Btn variant="primary" size="sm" onClick={handleSave}>Save Logo</Btn>}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 8 }}>Primary Logo</p>
            <UploadZone preview={currentLogo} icon="🎨" label="Click or drag to upload your SESCO STUDIO logo" hint="PNG, SVG, or WebP · Transparent background recommended" onFile={url => { setPendingLogo(url); setClearLogo(false); }} />
            {currentLogo && <Btn variant="outline" size="sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }} onClick={removeLogo}>Remove Logo</Btn>}
          </div>
          <div>
            <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 8 }}>Favicon</p>
            <UploadZone preview={currentFav} icon="🔖" label="Upload favicon" hint="PNG, SVG or ICO · square 64×64+ recommended" onFile={url => { setPendingFav(url); setClearFav(false); }} />
            {currentFav && <Btn variant="outline" size="sm" style={{ marginTop: 10, width: '100%', justifyContent: 'center' }} onClick={removeFav}>Remove Favicon</Btn>}
          </div>
        </div>

        <div style={{ marginTop: 20, padding: 16, background: 'var(--navy2)', borderRadius: 8, border: '1px solid var(--border)' }}>
          <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 12 }}>Current Logo Preview</p>
          <div style={{ padding: 20, background: 'var(--navy)', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 16 }}>
            {currentLogo ? (
              <img src={currentLogo} alt="logo" style={{ height: 36, width: 'auto' }} />
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
