'use client';
import { LayoutDashboard, Palette, Home, User, Zap, MessageSquare, Phone, Briefcase, ClipboardList, FileText, Image as ImageIcon, Settings, LogOut } from 'lucide-react';
import LogoMark from '@/components/ui/LogoMark';
import { useAdminAuth } from '@/lib/AdminAuthContext';

export type AdminTab = 'dashboard' | 'logo' | 'homepage' | 'about' | 'services' | 'testimonials' | 'contact-info' | 'projects' | 'casestudies' | 'blog' | 'media' | 'settings';

const NAV_GROUPS: Array<{ section: string; items: Array<{ id: AdminTab; label: string; icon: React.ReactNode }> }> = [
  { section: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> }] },
  { section: 'Brand', items: [{ id: 'logo', label: 'Logo & Favicon', icon: <Palette size={16} /> }] },
  { section: 'Content', items: [
    { id: 'homepage', label: 'Homepage', icon: <Home size={16} /> },
    { id: 'about', label: 'About', icon: <User size={16} /> },
    { id: 'services', label: 'Services', icon: <Zap size={16} /> },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={16} /> },
    { id: 'contact-info', label: 'Contact Info', icon: <Phone size={16} /> },
  ]},
  { section: 'Portfolio', items: [
    { id: 'projects', label: 'Projects', icon: <Briefcase size={16} /> },
    { id: 'casestudies', label: 'Case Studies', icon: <ClipboardList size={16} /> },
  ]},
  { section: 'Publishing', items: [{ id: 'blog', label: 'Blog Posts', icon: <FileText size={16} /> }] },
  { section: 'Media', items: [{ id: 'media', label: 'Media Library', icon: <ImageIcon size={16} /> }] },
  { section: 'System', items: [{ id: 'settings', label: 'Settings', icon: <Settings size={16} /> }] },
];

export default function Sidebar({ active, onChange }: { active: AdminTab; onChange: (tab: AdminTab) => void }) {
  const { logout, user } = useAdminAuth();
  const displayEmail = user?.email ?? 'Admin';
  const initials = displayEmail.slice(0, 2).toUpperCase();

  return (
    <aside style={{ width: 240, flexShrink: 0, background: 'var(--navy3)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }}>
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' }}>
        <LogoMark size="sm" showWordmark={false} />
        <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.95rem' }}>SESCO <span style={{ color: 'var(--blue)' }}>CMS</span></span>
      </div>

      {NAV_GROUPS.map(group => (
        <div key={group.section}>
          <p style={{ padding: '16px 12px 8px', fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gray2)' }}>{group.section}</p>
          {group.items.map(item => (
            <div
              key={item.id}
              onClick={() => onChange(item.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8, cursor: 'pointer',
                fontSize: '.88rem', margin: '2px 8px', transition: 'background .2s,color .2s',
                background: active === item.id ? 'rgba(47,107,255,.12)' : 'transparent',
                color: active === item.id ? 'var(--blue)' : 'var(--gray)',
                border: active === item.id ? '1px solid rgba(47,107,255,.28)' : '1px solid transparent',
              }}
            >
              <span style={{ width: 18, textAlign: 'center', flexShrink: 0 }}>{item.icon}</span>
              {item.label}
            </div>
          ))}
        </div>
      ))}

      <div style={{ marginTop: 'auto', padding: 16, borderTop: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.28)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.75rem', color: 'var(--blue)' }}>{initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '.82rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{displayEmail}</div>
            <div style={{ fontSize: '.7rem', color: 'var(--gray)' }}>Administrator</div>
          </div>
          <button onClick={() => logout()} title="Logout" style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer' }}>
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}
