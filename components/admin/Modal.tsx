'use client';
import { X } from 'lucide-react';

export default function Modal({ open, title, onClose, children }: { open: boolean; title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 300, background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        opacity: open ? 1 : 0, pointerEvents: open ? 'all' : 'none', transition: 'opacity .2s',
      }}
    >
      <div style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 16, width: '90%', maxWidth: 580, maxHeight: '90vh', overflowY: 'auto', padding: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1.1rem' }}>{title}</span>
          <button onClick={onClose} aria-label="Close" style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', display: 'flex' }}><X size={20} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
