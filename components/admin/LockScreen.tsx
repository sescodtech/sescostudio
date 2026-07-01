'use client';
import { useState } from 'react';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import LogoMark from '@/components/ui/LogoMark';

export default function LockScreen() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setErr('Please enter your email and password.'); return; }
    setLoading(true);
    setErr('');
    const { error } = await login(email, password);
    if (error) {
      setErr(error);
      setLoading(false);
    }
    // On success, AdminApp re-renders automatically via auth state change
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--navy2)', border: '1px solid var(--border)',
    borderRadius: 8, padding: '12px 16px', color: '#fff', fontFamily: 'Inter,sans-serif',
    fontSize: '.9rem', outline: 'none', marginBottom: 14,
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600,
    letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)',
    marginBottom: 7, display: 'block',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 999, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 20, padding: '48px 40px', width: 400, textAlign: 'center' }}>
        <div style={{ marginBottom: 28, display: 'flex', justifyContent: 'center' }}>
          <LogoMark size="lg" showWordmark={false} />
        </div>
        <h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '1.5rem', marginBottom: 6 }}>
          SESCO STUDIO
        </h1>
        <p style={{ color: 'var(--gray)', fontSize: '.88rem', marginBottom: 32 }}>
          Admin Dashboard — Sign in to continue
        </p>

        <form onSubmit={handle} style={{ textAlign: 'left' }}>
          <div>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="sescodtech@gmail.com"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              disabled={loading}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              style={inputStyle}
              onFocus={e => (e.target.style.borderColor = 'var(--blue)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              disabled={loading}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%', padding: 13, borderRadius: 8,
              background: loading ? 'rgba(47,107,255,.5)' : 'var(--blue)',
              color: '#fff', fontFamily: 'Montserrat,sans-serif', fontSize: '.72rem',
              fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer', border: 'none',
              transition: 'background .2s',
            }}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        {err && (
          <p style={{ color: '#ef4444', fontSize: '.82rem', marginTop: 14, background: 'rgba(239,68,68,.08)', border: '1px solid rgba(239,68,68,.2)', borderRadius: 8, padding: '10px 14px', textAlign: 'left' }}>
            {err}
          </p>
        )}

        <p style={{ color: 'var(--gray2)', fontSize: '.75rem', marginTop: 20 }}>
          Admin access is managed via Supabase Auth.<br />
          See <strong style={{ color: 'var(--gray)' }}>SUPABASE_SETUP.md</strong> to create your account.
        </p>
      </div>
    </div>
  );
}
