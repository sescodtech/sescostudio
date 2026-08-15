import { CMSData } from '@/types/cms';
import { supabase } from '@/lib/supabase';

export const DEFAULT_CMS: CMSData = {
  logo: null,
  favicon: null,
  heroHeadline: 'Building Digital Systems\nfor Modern Businesses',
  heroSub:
    'We design, develop, automate, and manage digital solutions that help businesses establish, scale, and grow in the digital world.',
  about: {
    missionTitle: 'Building Systems That Drive Real Business Growth',
    missionDesc:
      'SESCO STUDIO exists to give every business — from emerging startups to established enterprises — access to the same level of digital capability that powers the world\'s most successful companies. We build systems, not just designs.',
    vision:
      'To be Africa\'s leading digital innovation studio — recognized globally for building systems that transform how businesses operate, communicate, and grow in the digital age.',
  },
  faq: [
    { id: 1, q: 'How long does a typical project take?', a: 'Most landing pages and brochure sites take 2 weeks. Full digital systems with CMS/admin dashboards typically run 4–8 weeks depending on scope.' },
    { id: 2, q: 'Do you offer ongoing support after launch?', a: 'Yes — every package includes a support window (30–90 days depending on tier), and we offer ongoing retainers for maintenance, updates, and feature additions.' },
    { id: 3, q: 'Can you work with my existing brand or codebase?', a: 'Absolutely. We regularly upgrade and extend existing platforms rather than rebuilding from scratch — we always audit first before touching anything.' },
    { id: 4, q: 'What technologies do you build with?', a: 'Next.js, React, TypeScript, and Tailwind on the frontend; Node.js/Express or Supabase on the backend, with AI integrations where useful.' },
  ],
  team: [
    { id: 1, initials: 'OA', name: 'Olajide Oluwaseyi Ayomide', role: 'Founder & Lead Engineer', bio: 'Full-stack developer, brand designer, and digital strategist with 5+ years building systems for Nigerian businesses. Founder of SESCO STUDIO and Sescohubs.' },
    { id: 2, initials: 'DS', name: 'Design Systems Unit', role: 'UI/UX & Brand Design', bio: 'A collective of premium designers crafting visual identities, UI systems, and digital experiences that communicate brand value at every touchpoint.' },
    { id: 3, initials: 'AT', name: 'Automation Team', role: 'AI & Workflow Engineering', bio: 'Specialists in AI integration, workflow automation, and intelligent system design — helping businesses eliminate manual work and scale efficiently.' },
  ],
  navigation: {
    links: [
      { id: 1, label: 'Home', href: '/' },
      { id: 2, label: 'About', href: '/about' },
      { id: 3, label: 'Services', href: '/services' },
      { id: 4, label: 'Portfolio', href: '/portfolio' },
      { id: 5, label: 'Case Studies', href: '/case-studies' },
      { id: 6, label: 'Blog', href: '/blog' },
    ],
    ctaLabel: 'Start a Project',
  },
  footer: {
    tagline: 'Building digital systems for modern businesses.\nTechnology · Design · Automation · Growth.',
    servicesLinks: ['Web Development', 'Branding & Design', 'AI Solutions', 'Social Media', 'Digital Strategy'],
  },
  seo: {
    defaultTitle: 'SESCO STUDIO — Building Digital Systems for Modern Businesses',
    defaultDescription: 'SESCO STUDIO is a premium digital innovation studio. We build systems, not just designs — web development, branding, AI automation, and digital strategy.',
    ogImage: null,
    twitterHandle: '',
  },
  siteSettings: {
    maintenanceMode: false,
    maintenanceMessage: "We're currently performing scheduled maintenance. Please check back shortly.",
    ga4Id: '',
    gtmId: '',
    clarityId: '',
  },
  services: [
    {
      id: 1,
      tag: 'Digital Build',
      icon: '🌐',
      title: 'Web Development',
      desc: 'Powerful websites, web applications, e-commerce platforms, and digital products engineered for performance, scale, and results.',
      color: 'blue',
      items: ['Websites & Landing Pages', 'Web Applications', 'E-Commerce Platforms', 'Progressive Web Apps', 'CMS Systems', 'API Development'],
    },
    {
      id: 2,
      tag: 'Creative Systems',
      icon: '✦',
      title: 'Branding & Design',
      desc: 'Brand identities, UI/UX experiences, and visual systems that create lasting impact and differentiate your business in the market.',
      color: 'gold',
      items: ['Brand Identity & Logo', 'UI/UX Design', 'Product Design', 'Motion Design', 'Design Systems', 'Visual Communication'],
    },
    {
      id: 3,
      tag: 'Intelligent Automation',
      icon: '🤖',
      title: 'AI Solutions',
      desc: 'Smart workflows and automation systems that eliminate repetitive tasks, improve efficiency, and give your business a decisive advantage.',
      color: 'blue',
      items: ['AI Workflow Automation', 'Apps Script Systems', 'API Integrations', 'Process Automation', 'Data Pipelines', 'Smart Notifications'],
    },
    {
      id: 4,
      tag: 'Digital Growth',
      icon: '📱',
      title: 'Social Media Management',
      desc: 'Content strategy, social media management, audience growth, and online presence management that builds community and drives conversions.',
      color: 'gold',
      items: ['Social Media Strategy', 'Content Creation', 'Community Management', 'Analytics & Reporting', 'Paid Advertising', 'Brand Voice Development'],
    },
  ],
  projects: [
    {
      id: 1,
      title: 'Mercy Hub',
      type: 'E-Commerce',
      desc: 'Full-stack Nigerian e-commerce platform with Next.js 15, Paystack integration, PWA support, and a React Native mobile app.',
      tags: ['Next.js', 'MongoDB', 'Paystack', 'React Native', 'Expo'],
      icon: '🛒',
      bg: 'linear-gradient(135deg,#0B1F3A,#111827)',
      results: '↑ 3× conversions',
      challenge: 'Build a full-stack e-commerce platform with mobile app, Paystack integration, and admin dashboard in under 6 weeks.',
      r1: { n: '3×', l: 'Sales Growth' },
      r2: { n: '40k', l: 'Monthly Users' },
    },
    {
      id: 2,
      title: 'Andus International',
      type: 'Web Development',
      desc: 'Multi-sector conglomerate website with Node.js backend, React admin dashboard, MongoDB Atlas, and CAC registration form.',
      tags: ['Next.js', 'Node.js', 'MongoDB', 'Vercel'],
      icon: '🏢',
      bg: 'linear-gradient(135deg,#0a1628,#0B1F3A)',
      results: '↑ 85% organic traffic',
      challenge: 'Migrate a legacy site to a modern Next.js + Node.js architecture with a custom admin CMS and multi-sector content.',
      r1: { n: '85%', l: 'More Traffic' },
      r2: { n: '2.1s', l: 'Load Time' },
    },
    {
      id: 3,
      title: 'FinLens Analyzer',
      type: 'FinTech',
      desc: 'AI-powered bank statement analyzer using Claude API, pdf.js, and Chart.js with a dark fintech terminal aesthetic.',
      tags: ['Claude API', 'pdf.js', 'Chart.js', 'jsPDF'],
      icon: '📊',
      bg: 'linear-gradient(135deg,#0B0F1A,#161D2F)',
      results: '5s avg analysis time',
      challenge: 'Build an AI-powered bank statement analyzer that reads PDFs and classifies 5 transaction categories instantly.',
      r1: { n: '5s', l: 'Analysis Time' },
      r2: { n: '99%', l: 'Accuracy' },
    },
    {
      id: 4,
      title: 'Sescohubs VTU',
      type: 'E-Commerce',
      desc: 'Consumer-facing Virtual Top-Up platform with React/TypeScript frontend, Node.js backend, and multi-provider failover.',
      tags: ['React', 'TypeScript', 'Node.js', 'Paystack'],
      icon: '📡',
      bg: 'linear-gradient(135deg,#0B0F1A,#1a1025)',
      results: '₦2M+ monthly volume',
      challenge: 'Create a VTU reseller platform with multi-provider failover, admin controls, and Paystack wallet integration.',
      r1: { n: '₦2M', l: 'Monthly Vol.' },
      r2: { n: '99.9%', l: 'Uptime' },
    },
    {
      id: 5,
      title: 'Olajide Property',
      type: 'Real Estate',
      desc: 'Next.js real estate listing platform with Supabase RLS across 6 tables, PKCE auth, and custom SMTP via Resend.',
      tags: ['Next.js', 'Supabase', 'Resend', 'PostgreSQL'],
      icon: '🏠',
      bg: 'linear-gradient(135deg,#0a1a2e,#0B1F3A)',
      results: '60% faster listings',
      challenge: 'Build a real estate listing platform with Supabase RLS, auth flows, and email via Resend custom SMTP.',
      r1: { n: '60%', l: 'Faster Listings' },
      r2: { n: '4.8★', l: 'User Rating' },
    },
    {
      id: 6,
      title: 'IOCONSULTS',
      type: 'Web Development',
      desc: 'Next.js rebuild of a strategic HR consulting firm\'s website with a custom brand system and a self-contained static holding page.',
      tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      icon: '💼',
      bg: 'linear-gradient(135deg,#1a1030,#0B0F1A)',
      results: 'Full brand relaunch',
      challenge: 'Rebuild a legacy HR consulting site into a modern Next.js platform with a distinct deep-purple brand identity.',
      r1: { n: '100%', l: 'Brand Refresh' },
      r2: { n: '2.0s', l: 'Load Time' },
    },
  ],
  testimonials: [
    {
      id: 1,
      name: 'Andus International',
      role: 'Corporate Client · Web Platform',
      initials: 'AI',
      quote: "SESCO STUDIO didn't just build us a website — they gave us a complete digital identity. The system they built runs seamlessly and has directly driven new client inquiries.",
      stars: 5,
    },
    {
      id: 2,
      name: 'Mercy Hub',
      role: 'E-Commerce · Full-Stack Development',
      initials: 'MH',
      quote: 'The e-commerce platform is exactly what we envisioned — and more. The mobile app and payment integration work flawlessly. Professional team, on-time delivery.',
      stars: 5,
    },
    {
      id: 3,
      name: 'IOCONSULTS',
      role: 'HR Consulting · Web Platform',
      initials: 'IO',
      quote: 'SESCO STUDIO rebuilt our entire web presence from the ground up. The new brand identity and site finally match the caliber of the clients we serve.',
      stars: 5,
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: 'Why Nigerian Businesses Need a Digital System, Not Just a Website',
      cat: 'Strategy',
      excerpt: 'Most businesses think they need a website. What they actually need is a digital system — one that generates leads, automates tasks, and grows with them.',
      date: 'Jun 2025',
      icon: '💡',
      bg: 'linear-gradient(135deg,#0B0F1A,#161D2F)',
      status: 'published',
      readTime: '5 min read',
    },
    {
      id: 2,
      title: 'How AI Automation Saved Our Client 8 Hours a Week',
      cat: 'AI Automation',
      excerpt: "We built a Google Apps Script loan reminder system for a microfinance bank. Here's exactly how it works and the ROI it delivered.",
      date: 'Jun 2025',
      icon: '🤖',
      bg: 'linear-gradient(135deg,#0B1F3A,#0B0F1A)',
      status: 'published',
      readTime: '7 min read',
    },
    {
      id: 3,
      title: 'The Stack We Use to Build Premium Nigerian E-Commerce in 2025',
      cat: 'Engineering',
      excerpt: 'Next.js 15, MongoDB, Paystack, Cloudinary, and Expo React Native — why we chose each tool and how they fit together for scalable commerce.',
      date: 'May 2025',
      icon: '⚡',
      bg: 'linear-gradient(135deg,#0d1a0d,#0B0F1A)',
      status: 'published',
      readTime: '8 min read',
    },
    {
      id: 4,
      title: 'Building Brand Identity Systems: Beyond the Logo',
      cat: 'Branding',
      excerpt: 'A logo is just the beginning. A brand identity system includes color, typography, motion, voice, and a complete set of components that scale across every touchpoint.',
      date: 'May 2025',
      icon: '🎨',
      bg: 'linear-gradient(135deg,#1a1025,#0B0F1A)',
      status: 'published',
      readTime: '6 min read',
    },
    {
      id: 5,
      title: 'Supabase vs Firebase for Nigerian Startups: An Honest Comparison',
      cat: 'Engineering',
      excerpt: 'After building with both on live Nigerian client projects, here is our honest, opinionated take on which backend-as-a-service actually works better for African startups.',
      date: 'Apr 2025',
      icon: '🔥',
      bg: 'linear-gradient(135deg,#1a0a0a,#0B0F1A)',
      status: 'published',
      readTime: '9 min read',
    },
    {
      id: 6,
      title: 'From Idea to Launch: The SESCO Studio Project Delivery Framework',
      cat: 'Process',
      excerpt: 'Discover →  Design → Develop → Grow. Inside the four-stage framework we use to take every client project from a vague idea to a launched, live, revenue-generating system.',
      date: 'Apr 2025',
      icon: '🚀',
      bg: 'linear-gradient(135deg,#0B1F3A,#161D2F)',
      status: 'published',
      readTime: '6 min read',
    },
  ],
  contact: {
    email: 'sescodtech@gmail.com',
    website: 'sescoconcept.name.ng',
    location: 'Lagos, Nigeria',
    github: 'https://github.com/sescodtech',
    businessHours: 'Mon–Fri, 9am–6pm (WAT)',
  },
  media: [],
};

const CMS_KEY = 'sesco_cms';
const TABLE = 'sesco_cms';
const ROW_ID = 1; // single-row table holding the whole CMS document

/**
 * Synchronous read used for the very first paint (from local cache).
 * Always call refreshCMSData() afterwards to pull the latest from Supabase.
 */
export function getCMSData(): CMSData {
  if (typeof window === 'undefined') return DEFAULT_CMS;
  try {
    const stored = localStorage.getItem(CMS_KEY);
    if (!stored) return DEFAULT_CMS;
    return { ...DEFAULT_CMS, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_CMS;
  }
}

/** Writes to the local cache only — used internally as an optimistic update. */
function cacheLocally(data: CMSData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CMS_KEY, JSON.stringify(data));
}

/** Pulls the latest CMS document from Supabase and updates the local cache. */
export async function fetchCMSData(): Promise<CMSData> {
  const { data, error } = await supabase
    .from(TABLE)
    .select('content')
    .eq('id', ROW_ID)
    .maybeSingle();

  if (error) {
    console.error('Supabase fetch error:', error.message);
    return getCMSData();
  }
  if (!data) {
    // No row yet — seed it with defaults so future writes have something to update.
    await supabase.from(TABLE).insert({ id: ROW_ID, content: DEFAULT_CMS });
    cacheLocally(DEFAULT_CMS);
    return DEFAULT_CMS;
  }

  const merged = { ...DEFAULT_CMS, ...(data.content as Partial<CMSData>) };
  cacheLocally(merged);
  return merged;
}

/** Persists a partial or full CMS update to Supabase (and the local cache). */
export async function saveCMSData(data: CMSData): Promise<void> {
  cacheLocally(data); // optimistic local update so the UI feels instant
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, content: data, updated_at: new Date().toISOString() });

  if (error) {
    console.error('Supabase save error:', error.message);
    throw error;
  }
}

export async function resetCMSData(): Promise<void> {
  if (typeof window !== 'undefined') localStorage.removeItem(CMS_KEY);
  const { error } = await supabase
    .from(TABLE)
    .upsert({ id: ROW_ID, content: DEFAULT_CMS, updated_at: new Date().toISOString() });
  if (error) console.error('Supabase reset error:', error.message);
}
