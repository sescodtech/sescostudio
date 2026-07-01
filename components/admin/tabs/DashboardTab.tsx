'use client';
import { useCMS } from '@/lib/CMSContext';
import { Card, Btn } from '@/components/admin/ui';
import { AdminTab } from '@/components/admin/Sidebar';

function StatCard({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
      <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 8 }}>{label}</div>
      <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '1.8rem' }}>{value}</div>
      {sub && <div style={{ fontSize: '.75rem', color: '#22c55e', marginTop: 4 }}>{sub}</div>}
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
  const { data } = useCMS();

  return (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 28 }}>
        <StatCard label="Total Projects" value={<>{data.projects.length}<em style={{ color: 'var(--blue)', fontStyle: 'normal' }}>+</em></>} sub="Live on portfolio" />
        <StatCard label="Blog Posts" value={data.blogPosts.length} sub={`${data.blogPosts.filter(p => p.status === 'published').length} published`} />
        <StatCard label="Testimonials" value={data.testimonials.length} sub="All published" />
        <StatCard label="Media Files" value={data.media.length} sub={data.media.length ? 'In library' : 'Upload to library'} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1.5fr) minmax(0,1fr)', gap: 20 }}>
        <Card title="Quick Actions">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Btn variant="primary" onClick={() => onNavigate('projects')}>+ Add Project</Btn>
            <Btn variant="primary" onClick={() => onNavigate('blog')}>+ New Blog Post</Btn>
            <Btn variant="outline" onClick={() => onNavigate('logo')}>🎨 Update Logo</Btn>
            <Btn variant="outline" onClick={() => onNavigate('homepage')}>✏️ Edit Homepage</Btn>
            <Btn variant="outline" onClick={() => onNavigate('services')}>⚡ Edit Services</Btn>
            <Btn variant="gold" onClick={() => window.open('/', '_blank')}>🚀 View Live Site</Btn>
          </div>
        </Card>
        <Card title="Recent Activity">
          <ActivityRow icon="💼" bg="rgba(47,107,255,.12)" text={<><strong style={{ color: '#fff' }}>{data.projects[0]?.title || 'Project'}</strong> updated</>} time="Just now" />
          <ActivityRow icon="📝" bg="rgba(200,162,74,.1)" text={<><strong style={{ color: '#fff' }}>Blog post</strong> created</>} time="Today" />
          <ActivityRow icon="⚡" bg="rgba(34,197,94,.1)" text={<><strong style={{ color: '#fff' }}>Services</strong> section saved</>} time="Yesterday" />
          <ActivityRow icon="🎨" bg="rgba(47,107,255,.12)" text={<><strong style={{ color: '#fff' }}>Brand colors</strong> confirmed</>} time="This week" />
        </Card>
      </div>

      <Card title="System Status">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(180px,1fr))', gap: 16 }}>
          <StatusRow label="CMS Storage Active" />
          <StatusRow label="Live Site Online" />
          <StatusRow label="All Content Synced" />
        </div>
      </Card>
    </div>
  );
}

function StatusRow({ label }: { label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span style={{ color: '#22c55e' }}>●</span>
      <span style={{ fontSize: '.88rem' }}>{label}</span>
    </div>
  );
}
