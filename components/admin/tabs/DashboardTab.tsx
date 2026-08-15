'use client';
import { useEffect, useState } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { usePermissions, ROLE_LABELS } from '@/lib/permissions';
import { supabase } from '@/lib/supabase';
import { Card, Btn } from '@/components/admin/ui';
import { AdminTab } from '@/components/admin/Sidebar';

function StatCard({ label, value, sub, subColor }: { label: string; value: React.ReactNode; sub?: string; subColor?: string }) {
  return (
    <div style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
      <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '1.8rem' }}>{value}</div>
      {sub && <div style={{ fontSize: '.75rem', color: subColor || '#22c55e', marginTop: 4 }}>{sub}</div>}
    </div>
  );
}

function ActivityRow({ icon, bg, text, time }: { icon: string; bg: string; text: React.ReactNode; time: string }) {
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(167,176,192,.07)' }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.9rem', flexShrink: 0, background: bg }}>{icon}</div>
      <div>
        <div style={{ fontSize: '.85rem', color: 'var(--gray)', lineHeight: 1.5 }}>{text}</div>
        <div style={{ fontSize: '.72rem', color: 'var(--gray2)', marginTop: 2 }}>{time}</div>
      </div>
    </div>
  );
}

export default function DashboardTab({ onNavigate }: { onNavigate: (t: AdminTab) => void }) {
  const { data, loading } = useCMS();
  const { role } = useAdminAuth();
  const { can } = usePermissions();
  const [contactCount, setContactCount] = useState<number | null>(null);
  const [newsletterCount, setNewsletterCount] = useState<number | null>(null);
  const [recentContacts, setRecentContacts] = useState<{ first_name: string; last_name: string; service: string | null; created_at: string }[] | null>(null);
  const [submissionsError, setSubmissionsError] = useState(false);

  useEffect(() => {
    if (!can('view_submissions')) return;
    (async () => {
      const [c, n, recent] = await Promise.all([
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('newsletter_signups').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('first_name,last_name,service,created_at').order('created_at', { ascending: false }).limit(3),
      ]);
      if (c.error || n.error) { setSubmissionsError(true); return; }
      setContactCount(c.count ?? 0);
      setNewsletterCount(n.count ?? 0);
      setRecentContacts(recent.data ?? []);
    })();
  }, [can]);

  const docSizeKb = Math.round(JSON.stringify(data).length / 1024);

  return (
    <div>
      {!role && (
        <div style={{ padding: 16, marginBottom: 20, background: 'rgba(200,162,74,.1)', border: '1px solid rgba(200,162,74,.3)', borderRadius: 8, color: 'var(--gold)', fontSize: '.88rem' }}>
          No role has been assigned to your account yet — most tabs are hidden until a Super Admin assigns one.
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Projects" value={data.projects.length} sub="Live on portfolio" />
        <StatCard label="Blog Posts" value={data.blogPosts.length} sub={`${data.blogPosts.filter(p => p.status === 'published').length} published`} />
        {can('view_submissions') && (
          <StatCard
            label="Total Contacts"
            value={submissionsError ? '—' : (contactCount ?? '…')}
            sub={submissionsError ? 'Run Step 2B/2C SQL — see SUPABASE_SETUP.md' : 'All-time submissions'}
            subColor={submissionsError ? '#ef4444' : undefined}
          />
        )}
        {can('view_submissions') && (
          <StatCard label="Newsletter Subscribers" value={submissionsError ? '—' : (newsletterCount ?? '…')} sub="All-time signups" />
        )}
        <StatCard label="Media Files" value={data.media.length} sub={data.media.length ? 'In library' : 'Upload to library'} />
        <StatCard label="CMS Document Size" value={`${docSizeKb} KB`} sub={docSizeKb > 800 ? 'Getting large — consider Supabase Storage' : 'Healthy'} subColor={docSizeKb > 800 ? 'var(--gold)' : undefined} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: 20 }}>
        <Card title="Quick Actions">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {can('manage_portfolio') && <Btn variant="primary" onClick={() => onNavigate('projects')}>+ Add Project</Btn>}
            {can('create_blog') && <Btn variant="primary" onClick={() => onNavigate('blog')}>+ New Blog Post</Btn>}
            {can('manage_cms') && <Btn variant="outline" onClick={() => onNavigate('logo')}>🎨 Update Logo</Btn>}
            {can('manage_cms') && <Btn variant="outline" onClick={() => onNavigate('homepage')}>✏️ Edit Homepage</Btn>}
            {can('manage_services') && <Btn variant="outline" onClick={() => onNavigate('services')}>⚡ Edit Services</Btn>}
            <Btn variant="gold" onClick={() => window.open('/', '_blank')}>🚀 View Live Site</Btn>
          </div>
        </Card>
        <Card title="Content Snapshot">
          <ActivityRow icon="💼" bg="rgba(47,107,255,.12)" text={<>Latest project: <strong style={{ color: '#fff' }}>{data.projects[data.projects.length - 1]?.title || '—'}</strong></>} time={`${data.projects.length} total`} />
          <ActivityRow icon="📝" bg="rgba(200,162,74,.1)" text={<>Latest post: <strong style={{ color: '#fff' }}>{data.blogPosts[data.blogPosts.length - 1]?.title || '—'}</strong></>} time={`${data.blogPosts.filter(p => p.status === 'published').length} published`} />
          {can('view_submissions') && recentContacts && recentContacts.map((r, i) => (
            <ActivityRow key={i} icon="📩" bg="rgba(34,197,94,.1)" text={<>{r.first_name} {r.last_name} enquired{r.service ? <> about <strong style={{ color: '#fff' }}>{r.service}</strong></> : null}</>} time={new Date(r.created_at).toLocaleDateString()} />
          ))}
        </Card>
      </div>

      <Card title="System Status">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16 }}>
          <StatusRow label={loading ? 'Syncing with Supabase…' : 'Content synced with Supabase'} ok={!loading} />
          <StatusRow label={data.siteSettings.maintenanceMode ? 'Maintenance mode is ON' : 'Site is live'} ok={!data.siteSettings.maintenanceMode} />
          {role && <StatusRow label={`Signed in as ${ROLE_LABELS[role]}`} ok />}
        </div>
      </Card>
    </div>
  );
}

function StatusRow({ label, ok = true }: { label: string; ok?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ color: ok ? '#22c55e' : '#ef4444' }}>●</span>
      <span style={{ fontSize: '.88rem' }}>{label}</span>
    </div>
  );
}
