'use client';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import LockScreen from '@/components/admin/LockScreen';
import Dashboard from '@/components/admin/Dashboard';

export default function AdminApp() {
  const { user, loading } = useAdminAuth();

  if (loading) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'var(--navy)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 40, height: 40, border: '2px solid var(--border)', borderTopColor: 'var(--blue)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <p style={{ color: 'var(--gray)', fontSize: '.88rem', fontFamily: 'Inter,sans-serif' }}>Loading…</p>
        </div>
      </div>
    );
  }

  return user ? <Dashboard /> : <LockScreen />;
}
