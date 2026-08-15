'use client';
import { useState, useRef, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '@/components/admin/NotificationsContext';

export default function NotificationsBell() {
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => { setOpen(o => !o); if (!open) markAllRead(); }}
        aria-label={`Notifications${unreadCount ? ` (${unreadCount} unread)` : ''}`}
        style={{ position: 'relative', background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer', padding: 6, display: 'flex' }}
      >
        <Bell size={18} />
        {unreadCount > 0 && (
          <span style={{ position: 'absolute', top: 2, right: 2, width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
        )}
      </button>
      {open && (
        <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: 8, width: 320, maxHeight: 360, overflowY: 'auto', background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 10, boxShadow: '0 12px 40px rgba(0,0,0,.4)', zIndex: 300 }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.85rem' }}>Notifications</div>
          {notifications.length === 0 ? (
            <p style={{ padding: 20, textAlign: 'center', color: 'var(--gray)', fontSize: '.82rem' }}>Nothing yet — you&apos;ll see new submissions, signups, and system events here as they happen.</p>
          ) : (
            notifications.map(n => (
              <div key={n.id} style={{ padding: '12px 16px', borderBottom: '1px solid rgba(167,176,192,.07)' }}>
                <p style={{ fontSize: '.82rem', color: '#fff', marginBottom: 2 }}>{n.message}</p>
                <p style={{ fontSize: '.7rem', color: 'var(--gray2)' }}>{n.time.toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
