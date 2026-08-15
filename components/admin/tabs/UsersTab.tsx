'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { useToast } from '@/components/admin/ToastContext';
import { Card, Field, Input, Btn, Table, Tr, Td } from '@/components/admin/ui';
import { Role, ROLE_LABELS } from '@/lib/permissions';

interface AdminUserRow { user_id: string; email: string; role: Role; }

const ROLES: Role[] = ['super_admin', 'admin', 'editor', 'author', 'developer', 'marketing'];

export default function UsersTab() {
  const { user, role, isBootstrap, refreshRole } = useAdminAuth();
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUserRow[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [newRole, setNewRole] = useState<Role>('editor');
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const { data, error } = await supabase.rpc('list_admin_users');
    if (error) { setError(error.message); return; }
    setUsers(data as AdminUserRow[]);
    setError(null);
  };

  useEffect(() => {
    if (isBootstrap) return;
    (async () => {
      const { data, error } = await supabase.rpc('list_admin_users');
      if (error) { setError(error.message); return; }
      setUsers(data as AdminUserRow[]);
      setError(null);
    })();
  }, [isBootstrap]);

  const claimSuperAdmin = async () => {
    if (!user?.email) return;
    setBusy(true);
    const { error } = await supabase.rpc('assign_role', { target_email: user.email, new_role: 'super_admin' });
    setBusy(false);
    if (error) { toast(error.message, 'error'); return; }
    toast('You are now Super Admin');
    await refreshRole();
    load();
  };

  const assignRole = async () => {
    if (!email.trim()) { toast('Enter the user\'s email', 'error'); return; }
    setBusy(true);
    const { error } = await supabase.rpc('assign_role', { target_email: email.trim(), new_role: newRole });
    setBusy(false);
    if (error) { toast(error.message, 'error'); return; }
    toast(`${email} assigned as ${ROLE_LABELS[newRole]}`);
    setEmail('');
    load();
  };

  const removeRole = async (row: AdminUserRow) => {
    if (!confirm(`Remove admin access for ${row.email}?`)) return;
    const { error } = await supabase.rpc('remove_role', { target_user_id: row.user_id });
    if (error) { toast(error.message, 'error'); return; }
    toast('Access removed');
    load();
  };

  if (isBootstrap) {
    return (
      <Card title="Users & Roles">
        <div style={{ padding: 24, textAlign: 'center', background: 'var(--navy2)', borderRadius: 8, border: '1px dashed var(--border)' }}>
          <p style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, marginBottom: 8 }}>No roles assigned yet</p>
          <p style={{ color: 'var(--gray)', fontSize: '.85rem', marginBottom: 16 }}>You&apos;re the first person here — claim Super Admin to unlock role management for everyone else.</p>
          <Btn variant="primary" onClick={claimSuperAdmin} disabled={busy}>{busy ? 'Claiming…' : 'Claim Super Admin'}</Btn>
        </div>
      </Card>
    );
  }

  if (role !== 'super_admin') {
    return <Card title="Users & Roles"><p style={{ color: 'var(--gray)', fontSize: '.88rem' }}>Only Super Admins can manage users and roles.</p></Card>;
  }

  return (
    <Card title="Users & Roles">
      <p style={{ color: 'var(--gray)', fontSize: '.82rem', marginBottom: 20 }}>
        Assign a role to any email that already has a login (create the Supabase Auth account first via Supabase → Authentication, then assign a role here).
      </p>

      <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <Field label="Email"><Input value={email} onChange={e => setEmail(e.target.value)} placeholder="teammate@company.com" /></Field>
        </div>
        <div>
          <Field label="Role">
            <select value={newRole} onChange={e => setNewRole(e.target.value as Role)} className="form-input" style={{ width: 'auto', padding: '10px 14px' }}>
              {ROLES.map(r => <option key={r} value={r}>{ROLE_LABELS[r]}</option>)}
            </select>
          </Field>
        </div>
        <Btn variant="primary" onClick={assignRole} disabled={busy} style={{ marginBottom: 16 }}>Assign</Btn>
      </div>

      {error && <p style={{ color: '#ef4444', fontSize: '.85rem', marginBottom: 16 }}>{error}</p>}

      {users && users.length > 0 ? (
        <Table headers={['Email', 'Role', '']}>
          {users.map(u => (
            <Tr key={u.user_id}>
              <Td title>{u.email}</Td>
              <Td>{ROLE_LABELS[u.role]}</Td>
              <Td>{u.user_id !== user?.id && <Btn variant="danger" size="sm" onClick={() => removeRole(u)}>Remove</Btn>}</Td>
            </Tr>
          ))}
        </Table>
      ) : (
        <p style={{ color: 'var(--gray)', fontSize: '.88rem' }}>No other admins assigned yet.</p>
      )}

      <p style={{ color: 'var(--gray2)', fontSize: '.75rem', marginTop: 16 }}>
        Note: role checks control what the admin UI shows and allows here. They don&apos;t yet restrict writes at the database level — any signed-in admin account can still call Supabase directly. Ask if you want that hardened with row-level security per role.
      </p>
    </Card>
  );
}
