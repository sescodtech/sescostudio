'use client';
import React, { useRef, useState } from 'react';

export function Card({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 14, overflow: 'hidden', marginBottom: 20 }}>
      <div style={{ padding: '18px 22px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem' }}>{title}</span>
        {action}
      </div>
      <div style={{ padding: 22 }}>{children}</div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 7, display: 'block' }}>{label}</label>
      {children}
    </div>
  );
}

export const inputStyle: React.CSSProperties = {
  width: '100%', background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 8,
  padding: '11px 14px', color: '#fff', fontFamily: 'Inter,sans-serif', fontSize: '.9rem', outline: 'none', transition: 'border-color .2s',
};

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} style={{ ...inputStyle, ...props.style }} onFocus={e => (e.target.style.borderColor = 'var(--blue)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />;
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} style={{ ...inputStyle, minHeight: 90, resize: 'vertical', ...props.style }} onFocus={e => (e.target.style.borderColor = 'var(--blue)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />;
}
export function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} style={{ ...inputStyle, ...props.style }}>{props.children}</select>;
}

export function Btn({ variant = 'primary', size = 'md', children, ...rest }: { variant?: 'primary' | 'outline' | 'danger' | 'gold'; size?: 'sm' | 'md' } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants: Record<string, React.CSSProperties> = {
    primary: { background: 'var(--blue)', color: '#fff' },
    outline: { background: 'transparent', color: '#fff', border: '1px solid var(--border)' },
    danger: { background: 'rgba(239,68,68,.1)', color: '#ef4444', border: '1px solid rgba(239,68,68,.2)' },
    gold: { background: 'linear-gradient(135deg,#C8A24A,#e8c060)', color: '#0B0F1A' },
  };
  const sizing = size === 'sm' ? { padding: '7px 14px', fontSize: '.6rem' } : { padding: '10px 20px', fontSize: '.65rem' };
  return (
    <button {...rest} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, borderRadius: 7, fontFamily: 'Montserrat,sans-serif', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', cursor: 'pointer', border: 'none', transition: 'opacity .2s,transform .2s', ...variants[variant], ...sizing, ...rest.style }}>
      {children}
    </button>
  );
}

export function Badge({ children, color = 'blue' }: { children: React.ReactNode; color?: 'blue' | 'gold' | 'green' }) {
  const colors = {
    blue: { background: 'rgba(47,107,255,.12)', color: 'var(--blue)', border: '1px solid rgba(47,107,255,.28)' },
    gold: { background: 'rgba(200,162,74,.1)', color: 'var(--gold)', border: '1px solid rgba(200,162,74,.2)' },
    green: { background: 'rgba(34,197,94,.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,.2)' },
  };
  return <span style={{ padding: '3px 9px', borderRadius: 100, fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', ...colors[color] }}>{children}</span>;
}

export function Table({ headers, children }: { headers: string[]; children: React.ReactNode }) {
  return (
    <div style={{ width: '100%', overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}><table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {headers.map(h => <th key={h} style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray)', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table></div>
  );
}
export function Td({ children, title = false }: { children: React.ReactNode; title?: boolean }) {
  return <td style={{ padding: '12px 14px', fontSize: '.88rem', color: title ? '#fff' : 'var(--gray)', fontWeight: title ? 600 : 400, borderBottom: '1px solid rgba(167,176,192,.07)', verticalAlign: 'middle' }}>{children}</td>;
}
export function Tr({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
}

export function UploadZone({ preview, icon, label, hint, onFile }: { preview: string | null; icon: string; label: string; hint: string; onFile: (dataUrl: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const compressImage = (file: File): Promise<string> => new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('Please select an image file.'));
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Could not read the image.'));
    reader.onload = () => {
      const source = new Image();
      source.onerror = () => reject(new Error('The selected image could not be processed.'));
      source.onload = () => {
        const maxWidth = 1440;
        const maxHeight = 900;
        const scale = Math.min(1, maxWidth / source.width, maxHeight / source.height);
        const canvas = document.createElement('canvas');
        canvas.width = Math.max(1, Math.round(source.width * scale));
        canvas.height = Math.max(1, Math.round(source.height * scale));
        const ctx = canvas.getContext('2d');
        if (!ctx) return reject(new Error('Your browser could not prepare the image.'));
        ctx.drawImage(source, 0, 0, canvas.width, canvas.height);

        // Keep project screenshots compact so the CMS JSON document remains saveable.
        const qualities = [0.78, 0.68, 0.58, 0.48];
        let output = '';
        for (const quality of qualities) {
          output = canvas.toDataURL('image/webp', quality);
          if (output.length <= 420000) break;
        }
        if (output.length > 420000) output = canvas.toDataURL('image/jpeg', 0.55);
        if (output.length > 420000) return reject(new Error('This screenshot is too large after compression. Please use a smaller screenshot.'));
        resolve(output);
      };
      source.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });

  const readFile = async (file: File) => {
    setError('');
    setBusy(true);
    try {
      onFile(await compressImage(file));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      onClick={() => !busy && inputRef.current?.click()}
      onDragOver={e => { e.preventDefault(); if (!busy) setDrag(true); }}
      onDragLeave={() => setDrag(false)}
      onDrop={e => { e.preventDefault(); setDrag(false); const f = e.dataTransfer.files[0]; if (f && !busy) void readFile(f); }}
      style={{ border: `2px dashed ${drag ? 'var(--blue)' : 'var(--border)'}`, borderRadius: 12, padding: 18, textAlign: 'center', cursor: busy ? 'wait' : 'pointer', transition: 'border-color .3s,background .3s', background: drag ? 'rgba(47,107,255,.08)' : 'transparent', minHeight: 190 }}
    >
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) void readFile(f); e.currentTarget.value = ''; }} />
      {preview ? (
        <div style={{ position: 'relative', marginBottom: 12 }}>
          <img src={preview} alt="Selected website preview" style={{ width: '100%', maxHeight: 150, borderRadius: 8, objectFit: 'cover', display: 'block', border: '1px solid var(--border)' }} />
          <span style={{ position: 'absolute', left: 8, bottom: 8, background: 'rgba(11,15,26,.85)', color: '#fff', borderRadius: 6, padding: '5px 8px', fontSize: '.62rem', fontWeight: 700 }}>Preview ready</span>
        </div>
      ) : (
        <span aria-hidden="true" style={{ fontSize: '2rem', marginBottom: 8, display: 'block', opacity: .8 }}>{icon}</span>
      )}
      <p style={{ color: 'var(--white)', fontSize: '.84rem', fontWeight: 600, marginBottom: 6 }}>{busy ? 'Optimizing preview…' : label}</p>
      <p style={{ color: 'var(--gray2)', fontSize: '.72rem', lineHeight: 1.5 }}>{hint}</p>
      {error && <p style={{ color: '#ef4444', fontSize: '.7rem', marginTop: 9, lineHeight: 1.45 }}>{error}</p>}
    </div>
  );
}
