'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Check, X } from 'lucide-react';

interface Toast { id: number; msg: string; type: 'success' | 'error'; }
interface ToastContextType { toast: (msg: string, type?: 'success' | 'error') => void; }

const ToastContext = createContext<ToastContextType | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((msg: string, type: 'success' | 'error' = 'success') => {
    const id = Date.now();
    setToasts(t => [...t, { id, msg, type }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 3500);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 500, display: 'flex', flexDirection: 'column', gap: 8, pointerEvents: 'none' }}>
        {toasts.map(t => (
          <div key={t.id} style={{
            background: 'var(--navy3)', border: `1px solid ${t.type === 'success' ? 'rgba(34,197,94,.3)' : 'rgba(239,68,68,.3)'}`,
            borderRadius: 10, padding: '12px 18px', fontSize: '.88rem', display: 'flex', alignItems: 'center', gap: 10,
            pointerEvents: 'all', boxShadow: '0 8px 24px rgba(0,0,0,.3)', color: '#fff',
          }}>
            {t.type === 'success' ? <Check size={16} color="#22c55e" /> : <X size={16} color="#ef4444" />}
            {t.msg}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
