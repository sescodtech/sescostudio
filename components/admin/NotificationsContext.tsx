'use client';
import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { subscribeNotifications } from '@/lib/notificationBus';
import { usePermissions } from '@/lib/permissions';

interface Notification {
  id: string;
  type: string;
  message: string;
  time: Date;
}

interface NotificationsContextType {
  notifications: Notification[];
  unreadCount: number;
  markAllRead: () => void;
}

const NotificationsContext = createContext<NotificationsContextType | null>(null);
const LAST_SEEN_KEY = 'sesco_notif_lastseen';

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const { can } = usePermissions();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const push = useCallback((type: string, message: string) => {
    setNotifications(prev => [{ id: `${Date.now()}-${Math.random()}`, type, message, time: new Date() }, ...prev].slice(0, 30));
    setUnreadCount(c => c + 1);
  }, []);

  // Real session-live events: save/upload failures, maintenance toggles.
  useEffect(() => subscribeNotifications(e => push(e.type, e.message)), [push]);

  // Real check against Supabase for anything new since this browser's last visit.
  useEffect(() => {
    if (!can('view_submissions')) return;
    const lastSeen = localStorage.getItem(LAST_SEEN_KEY) || new Date(0).toISOString();
    (async () => {
      const [c, n] = await Promise.all([
        supabase.from('contact_submissions').select('id', { count: 'exact', head: true }).gt('created_at', lastSeen),
        supabase.from('newsletter_signups').select('id', { count: 'exact', head: true }).gt('created_at', lastSeen),
      ]);
      if (!c.error && c.count) push('new_contact', `${c.count} new contact submission${c.count > 1 ? 's' : ''} since your last visit`);
      if (!n.error && n.count) push('new_newsletter', `${n.count} new newsletter signup${n.count > 1 ? 's' : ''} since your last visit`);
      localStorage.setItem(LAST_SEEN_KEY, new Date().toISOString());
    })();
    // Runs once per admin session load — intentionally not re-polling to avoid unnecessary Supabase load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const markAllRead = () => setUnreadCount(0);

  return (
    <NotificationsContext.Provider value={{ notifications, unreadCount, markAllRead }}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error('useNotifications must be used within NotificationsProvider');
  return ctx;
}
