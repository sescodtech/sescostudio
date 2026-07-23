'use client';
import { useState } from 'react';
import { ToastProvider } from '@/components/admin/ToastContext';
import Sidebar, { AdminTab } from '@/components/admin/Sidebar';
import DashboardTab from '@/components/admin/tabs/DashboardTab';
import LogoTab from '@/components/admin/tabs/LogoTab';
import HomepageTab from '@/components/admin/tabs/HomepageTab';
import AboutTab from '@/components/admin/tabs/AboutTab';
import ServicesTab from '@/components/admin/tabs/ServicesTab';
import TestimonialsTab from '@/components/admin/tabs/TestimonialsTab';
import ContactInfoTab from '@/components/admin/tabs/ContactInfoTab';
import ProjectsTab from '@/components/admin/tabs/ProjectsTab';
import CaseStudiesTab from '@/components/admin/tabs/CaseStudiesTab';
import BlogTab from '@/components/admin/tabs/BlogTab';
import MediaTab from '@/components/admin/tabs/MediaTab';
import SettingsTab from '@/components/admin/tabs/SettingsTab';
import FAQTab from '@/components/admin/tabs/FAQTab';
import TeamTab from '@/components/admin/tabs/TeamTab';
import NavigationTab from '@/components/admin/tabs/NavigationTab';
import FooterTab from '@/components/admin/tabs/FooterTab';
import SEOTab from '@/components/admin/tabs/SEOTab';
import SiteSettingsTab from '@/components/admin/tabs/SiteSettingsTab';
import SubmissionsTab from '@/components/admin/tabs/SubmissionsTab';

const TITLES: Record<AdminTab, string> = {
  dashboard: 'Dashboard', logo: 'Logo & Favicon', homepage: 'Homepage', about: 'About Section',
  services: 'Services', testimonials: 'Testimonials', faq: 'FAQ', team: 'Team', 'contact-info': 'Contact Info',
  projects: 'Portfolio Projects', casestudies: 'Case Studies', blog: 'Blog Posts',
  media: 'Media Library', navigation: 'Navigation', footer: 'Footer', seo: 'SEO',
  'site-settings': 'Site Settings', submissions: 'Form Submissions', settings: 'Data & Security',
};

function DashboardInner() {
  const [tab, setTab] = useState<AdminTab>('dashboard');

  const renderTab = () => {
    switch (tab) {
      case 'dashboard': return <DashboardTab onNavigate={setTab} />;
      case 'logo': return <LogoTab />;
      case 'homepage': return <HomepageTab />;
      case 'about': return <AboutTab />;
      case 'services': return <ServicesTab />;
      case 'testimonials': return <TestimonialsTab />;
      case 'faq': return <FAQTab />;
      case 'team': return <TeamTab />;
      case 'contact-info': return <ContactInfoTab />;
      case 'projects': return <ProjectsTab />;
      case 'casestudies': return <CaseStudiesTab />;
      case 'blog': return <BlogTab />;
      case 'media': return <MediaTab />;
      case 'navigation': return <NavigationTab />;
      case 'footer': return <FooterTab />;
      case 'seo': return <SEOTab />;
      case 'site-settings': return <SiteSettingsTab />;
      case 'submissions': return <SubmissionsTab />;
      case 'settings': return <SettingsTab />;
      default: return null;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar active={tab} onChange={setTab} />
      <main style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div style={{ height: 60, background: 'rgba(17,24,39,.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px', position: 'sticky', top: 0, zIndex: 50 }}>
          <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem' }}>{TITLES[tab]}</span>
          <div
            onClick={() => window.open('/', '_blank')}
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: 6, background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.28)', color: 'var(--blue)', fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} className="pulse-dot" />
            View Live Site
          </div>
        </div>
        <div style={{ padding: 28, flex: 1 }}>
          {renderTab()}
        </div>
      </main>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ToastProvider>
      <DashboardInner />
    </ToastProvider>
  );
}
