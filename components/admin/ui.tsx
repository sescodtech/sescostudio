'use client';
import React from 'react';

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
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          {headers.map(h => <th key={h} style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray)', padding: '10px 14px', textAlign: 'left', borderBottom: '1px solid var(--border)', whiteSpace: 'nowrap' }}>{h}</th>)}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
export function Td({ children, title = false }: { children: React.ReactNode; title?: boolean }) {
  return <td style={{ padding: '12px 14px', fontSize: '.88rem', color: title ? '#fff' : 'var(--gray)', fontWeight: title ? 600 : 400, borderBottom: '1px solid rgba(167,176,192,.07)', verticalAlign: 'middle' }}>{children}</td>;
}
export function Tr({ children }: { children: React.ReactNode }) {
  return <tr>{children}</tr>;
}
