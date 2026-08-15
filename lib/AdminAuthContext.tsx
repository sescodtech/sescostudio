'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';
import type { Role } from '@/lib/permissions';

interface AdminAuthContextType {
  user: User | null;
  role: Role | null;
  isBootstrap: boolean; // true when no roles exist yet system-wide (first-run state)
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  logout: () => Promise<void>;
  refreshRole: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role | null>(null);
  const [isBootstrap, setIsBootstrap] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadRole = async (u: User | null) => {
    if (!u) { setRole(null); setIsBootstrap(false); return; }
    const { data: roleRow } = await supabase.from('user_roles').select('role').eq('user_id', u.id).maybeSingle();
    if (roleRow) {
      setRole(roleRow.role as Role);
      setIsBootstrap(false);
      return;
    }
    // No role row for this user — check whether ANY roles exist yet.
    const { count } = await supabase.from('user_roles').select('*', { count: 'exact', head: true });
    if (!count) {
      // First-run: nobody has a role yet. Grant provisional Super Admin in this
      // session so the person can open Users and formally claim the role via
      // the assign_role() RPC (which persists it to the database).
      setRole('super_admin');
      setIsBootstrap(true);
    } else {
      setRole(null);
      setIsBootstrap(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      const u = data.session?.user ?? null;
      setUser(u);
      await loadRole(u);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      await loadRole(u);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    return { error: null };
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  const refreshRole = async () => { await loadRole(user); };

  return (
    <AdminAuthContext.Provider value={{ user, role, isBootstrap, loading, login, logout, refreshRole }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return ctx;
}
