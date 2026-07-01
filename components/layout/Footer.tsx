'use client';
import Link from 'next/link';
import { Github, Mail, Globe, MapPin } from 'lucide-react';
import LogoMark from '@/components/ui/LogoMark';
import { useCMS } from '@/lib/CMSContext';

const NAV = [
  { href: '/', label: 'Home' }, { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' }, { href: '/portfolio', label: 'Portfolio' },
  { href: '/case-studies', label: 'Case Studies' },
];
const SERVICES = ['Web Development', 'Branding & Design', 'AI Solutions', 'Social Media', 'Digital Strategy'];

export default function Footer() {
  const { data } = useCMS();
  const c = data.contact;

  return (
    <footer style={{ background: 'var(--navy3)', borderTop: '1px solid var(--border)', padding: '72px 5% 36px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 48, marginBottom: 48 }}>
          {/* Brand */}
          <div>
            <div style={{ marginBottom: 14 }}><LogoMark size="md" showWordmark /></div>
            <p style={{ color: 'var(--gray)', fontSize: '.88rem', lineHeight: 1.7, maxWidth: 260, marginBottom: 22 }}>
              Building digital systems for modern businesses.<br/>Technology · Design · Automation · Growth.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {c.twitter && <SocIcon href={c.twitter} icon={<span style={{fontSize:'.85rem'}}>𝕏</span>}/>}
              {c.linkedin && <SocIcon href={c.linkedin} icon={<span style={{fontSize:'.75rem',fontWeight:700}}>in</span>}/>}
              {c.instagram && <SocIcon href={c.instagram} icon={<span style={{fontSize:'.85rem'}}>◎</span>}/>}
              {c.github && <SocIcon href={c.github} icon={<Github size={14}/>}/>}
              {!c.twitter && !c.linkedin && !c.instagram && !c.github && (
                <>
                  <SocIcon href="#" icon={<span style={{fontSize:'.85rem'}}>𝕏</span>}/>
                  <SocIcon href="#" icon={<span style={{fontSize:'.75rem',fontWeight:700}}>in</span>}/>
                  <SocIcon href="#" icon={<span style={{fontSize:'.85rem'}}>◎</span>}/>
                  <SocIcon href="https://github.com/sescodtech" icon={<Github size={14}/>}/>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <ColTitle>Navigation</ColTitle>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NAV.map(l => <li key={l.href}><FootLink href={l.href}>{l.label}</FootLink></li>)}
            </ul>
          </div>

          {/* Services */}
          <div>
            <ColTitle>Services</ColTitle>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICES.map(s => <li key={s}><FootLink href="/services">{s}</FootLink></li>)}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColTitle>Contact</ColTitle>
            <ContactItem icon={<Mail size={13}/>} href={`mailto:${c.email}`}>{c.email}</ContactItem>
            <ContactItem icon={<Globe size={13}/>} href={`https://${c.website}`}>{c.website}</ContactItem>
            <ContactItem icon={<MapPin size={13}/>}>{c.location}</ContactItem>
            <div style={{ marginTop: 20 }}>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'var(--blue)', color: '#fff', padding: '9px 18px',
                borderRadius: 7, fontFamily: 'Montserrat,sans-serif', fontSize: '.65rem',
                fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none',
              }}>
                Start a Project →
              </Link>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--gray)', fontSize: '.78rem' }}>
            © 2025 <span style={{ color: 'var(--blue)' }}>SESCO STUDIO</span>. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            <FootLink href="#">Privacy</FootLink>
            <FootLink href="#">Terms</FootLink>
            <FootLink href="/admin">Admin</FootLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

function ColTitle({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff', marginBottom: 18 }}>{children}</p>;
}
function FootLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} style={{ color: 'var(--gray)', fontSize: '.88rem', textDecoration: 'none', transition: 'color .2s' }} onMouseEnter={e=>(e.target as HTMLElement).style.color='#fff'} onMouseLeave={e=>(e.target as HTMLElement).style.color='var(--gray)'}>{children}</Link>;
}
function SocIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" style={{ width: 34, height: 34, background: 'var(--navy)', border: '1px solid var(--border)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)', transition: 'border-color .2s,color .2s' }} onMouseEnter={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--blue)';(e.currentTarget as HTMLElement).style.color='var(--blue)'}} onMouseLeave={e=>{(e.currentTarget as HTMLElement).style.borderColor='var(--border)';(e.currentTarget as HTMLElement).style.color='var(--gray)'}}>
      {icon}
    </a>
  );
}
function ContactItem({ icon, href, children }: { icon: React.ReactNode; href?: string; children: React.ReactNode }) {
  const content = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <div style={{ width: 28, height: 28, background: 'var(--blue-a)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', flexShrink: 0 }}>{icon}</div>
      <span style={{ color: 'var(--gray)', fontSize: '.88rem' }}>{children}</span>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>{content}</a> : content;
}
