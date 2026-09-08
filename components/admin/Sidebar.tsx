'use client';
import { useState } from 'react';
import { LayoutDashboard, Palette, Home, User, Zap, MessageSquare, Phone, Briefcase, ClipboardList, FileText, Image as ImageIcon, Settings, LogOut, HelpCircle, Users, Menu, PanelBottom, Search, Sliders, Inbox, ShieldCheck } from 'lucide-react';
import LogoMark from '@/components/ui/LogoMark';
import { useAdminAuth } from '@/lib/AdminAuthContext';
import { usePermissions, ROLE_LABELS, Capability } from '@/lib/permissions';

export type AdminTab = 'dashboard' | 'logo' | 'homepage' | 'about' | 'services' | 'testimonials' | 'faq' | 'team' | 'contact-info' | 'projects' | 'casestudies' | 'blog' | 'media' | 'navigation' | 'footer' | 'seo' | 'site-settings' | 'submissions' | 'users' | 'settings';

// requires: undefined means always visible (e.g. Dashboard, Logo which every role can at least view)
const NAV_GROUPS: Array<{ section: string; items: Array<{ id: AdminTab; label: string; icon: React.ReactNode; requires?: Capability }> }> = [
  { section: 'Overview', items: [{ id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={16} /> }] },
  { section: 'Brand', items: [{ id: 'logo', label: 'Logo & Favicon', icon: <Palette size={16} />, requires: 'manage_cms' }] },
  { section: 'Content', items: [
    { id: 'homepage', label: 'Homepage', icon: <Home size={16} />, requires: 'manage_cms' },
    { id: 'about', label: 'About', icon: <User size={16} />, requires: 'manage_cms' },
    { id: 'services', label: 'Services', icon: <Zap size={16} />, requires: 'manage_services' },
    { id: 'testimonials', label: 'Testimonials', icon: <MessageSquare size={16} />, requires: 'manage_testimonials' },
    { id: 'faq', label: 'FAQ', icon: <HelpCircle size={16} />, requires: 'manage_faq' },
    { id: 'team', label: 'Team', icon: <Users size={16} />, requires: 'manage_team' },
    { id: 'contact-info', label: 'Contact Info', icon: <Phone size={16} />, requires: 'manage_cms' },
  ]},
  { section: 'Portfolio', items: [
    { id: 'projects', label: 'Projects', icon: <Briefcase size={16} />, requires: 'manage_portfolio' },
    { id: 'casestudies', label: 'Case Studies', icon: <ClipboardList size={16} />, requires: 'manage_portfolio' },
  ]},
  { section: 'Publishing', items: [{ id: 'blog', label: 'Blog Posts', icon: <FileText size={16} />, requires: 'create_blog' }] },
  { section: 'Media', items: [{ id: 'media', label: 'Media Library', icon: <ImageIcon size={16} />, requires: 'manage_media_upload' }] },
  { section: 'Structure', items: [
    { id: 'navigation', label: 'Navigation', icon: <Menu size={16} />, requires: 'manage_navigation' },
    { id: 'footer', label: 'Footer', icon: <PanelBottom size={16} />, requires: 'manage_footer' },
  ]},
  { section: 'Leads', items: [{ id: 'submissions', label: 'Form Submissions', icon: <Inbox size={16} />, requires: 'view_submissions' }] },
  { section: 'System', items: [
    { id: 'seo', label: 'SEO', icon: <Search size={16} />, requires: 'manage_seo' },
    { id: 'site-settings', label: 'Site Settings', icon: <Sliders size={16} />, requires: 'manage_analytics' },
    { id: 'users', label: 'Users & Roles', icon: <ShieldCheck size={16} />, requires: 'manage_users' },
    { id: 'settings', label: 'Data & Security', icon: <Settings size={16} />, requires: 'manage_settings' },
  ]},
];

export default function Sidebar({ active, onChange }: { active: AdminTab; onChange: (tab: AdminTab) => void }) {
  const { logout, user, role } = useAdminAuth();
  const [open, setOpen] = useState(false);
  const { can } = usePermissions();
  const displayEmail = user?.email ?? 'Admin';
  const initials = displayEmail.slice(0, 2).toUpperCase();

  const visibleGroups = NAV_GROUPS
    .map(group => ({ ...group, items: group.items.filter(item => !item.requires || can(item.requires)) }))
    .filter(group => group.items.length > 0);

  const choose = (tab: AdminTab) => { onChange(tab); setOpen(false); };

  return <>
    <button className="admin-mobile-menu" onClick={() => setOpen(v => !v)} aria-label={open ? 'Close admin menu' : 'Open admin menu'} aria-expanded={open}>
      <Menu size={20} />
      <span>SESCO CMS</span>
    </button>
    {open && <button className="admin-mobile-backdrop" aria-label="Close menu" onClick={() => setOpen(false)} />}
    <aside className={`admin-sidebar ${open ? 'is-open' : ''}`} style={{ width: 240, flexShrink: 0, background: 'var(--navy3)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 100, overflowY: 'auto' }}>
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: 10, borderBottom: '1px solid var(--border)' }}>
        <LogoMark size="sm" showWordmark={false} />
        <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.95rem' }}>SESCO <span style={{ color: 'var(--blue)' }}>CMS</span></span>
      </div>

      {visibleGroups.map(group => (
        <div key={group.section}>
          <p style={{ padding: '16px 12px 8px', fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gray2)' }}>{group.section}</p>
          {group.items.map(item => (
            <div
              key={item.id}
              onClick={() => choose(item.id)}
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
            <div style={{ fontSize: '.7rem', color: 'var(--gray)' }}>{role ? ROLE_LABELS[role] : 'No role assigned'}</div>
          </div>
          <button onClick={() => logout()} title="Logout" style={{ background: 'none', border: 'none', color: 'var(--gray)', cursor: 'pointer' }}>
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  </>;
}
