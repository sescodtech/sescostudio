'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CMSData } from '@/types/cms';
import { getCMSData, fetchCMSData, saveCMSData, resetCMSData } from '@/lib/cms';
import { emitNotification } from '@/lib/notificationBus';

interface CMSContextType {
  data: CMSData;
  loading: boolean;
  update: (partial: Partial<CMSData>) => void;
  save: (partial: Partial<CMSData>) => Promise<void>;
  reset: () => Promise<void>;
}

const CMSContext = createContext<CMSContextType | null>(null);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<CMSData>(getCMSData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Paint instantly from local cache (set above via getCMSData)
    // 2. Then reconcile with the source of truth in Supabase
    fetchCMSData()
      .then(fresh => setData(fresh))
      .catch(err => console.error('CMS fetch failed:', err))
      .finally(() => setLoading(false));
  }, []);

  const update = (partial: Partial<CMSData>) => {
    setData(prev => ({ ...prev, ...partial }));
  };

  const save = async (partial: Partial<CMSData>) => {
    const next = { ...data, ...partial };
    setData(next); // optimistic UI update
    try {
      await saveCMSData(next);
    } catch (err) {
      const isMediaChange = 'media' in partial || 'logo' in partial || 'favicon' in partial;
      emitNotification({
        type: isMediaChange ? 'upload_failed' : 'save_failed',
        message: isMediaChange ? 'An upload failed to save to Supabase' : 'A content save failed to sync to Supabase',
      });
      throw err;
    }
  };

  const reset = async () => {
    await resetCMSData();
    const fresh = await fetchCMSData();
    setData(fresh);
  };

  return (
    <CMSContext.Provider value={{ data, loading, update, save, reset }}>
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const ctx = useContext(CMSContext);
  if (!ctx) throw new Error('useCMS must be used within CMSProvider');
  return ctx;
}
