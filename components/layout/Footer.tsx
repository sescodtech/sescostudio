'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Github, Mail, Globe, MapPin, ArrowRight, Check } from 'lucide-react';
import LogoMark from '@/components/ui/LogoMark';
import { useCMS } from '@/lib/CMSContext';
import { subscribeNewsletter } from '@/lib/newsletter';
import Button from '@/components/ui/Button';

export default function Footer() {
  const { data } = useCMS();
  const c = data.contact;
  const NAV = data.navigation.links.filter(l => l.href !== '/blog');
  const SERVICES = data.footer.servicesLinks;
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await subscribeNewsletter(email);
      setStatus('done');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer aria-label="Footer" style={{ background: 'var(--navy3)', borderTop: '1px solid var(--border)', padding: '72px 5% 36px', position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ padding: 0 }}>
        <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '28px 32px', marginBottom: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap' }}>
          <div>
            <p style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>Get occasional insights, not spam</p>
            <p style={{ color: 'var(--gray)', fontSize: '.85rem' }}>Systems thinking, design notes, and the occasional product update.</p>
          </div>
          {status === 'done' ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--blue)', fontSize: '.88rem', fontWeight: 600 }}>
              <Check size={16} aria-hidden="true" /> Subscribed — thank you!
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input id="newsletter-email" type="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com" className="form-input" style={{ width: '100%', maxWidth: 260, flex: '1 1 200px' }} />
              <button type="submit" disabled={status === 'submitting'} className="btn btn-primary btn-sm">
                {status === 'submitting' ? 'Joining…' : <>Subscribe <ArrowRight size={13} /></>}
              </button>
            </form>
          )}
        </div>
        {status === 'error' && <p role="alert" style={{ color: '#ef4444', fontSize: '.8rem', marginTop: -36, marginBottom: 36 }}>Something went wrong — please try again.</p>}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 48, marginBottom: 48 }}>
          <div>
            <div style={{ marginBottom: 14 }}><LogoMark size="md" showWordmark /></div>
            <p style={{ color: 'var(--gray)', fontSize: '.88rem', lineHeight: 1.7, maxWidth: 260, marginBottom: 22, whiteSpace: 'pre-line' }}>
              {data.footer.tagline}
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              {c.twitter && <SocIcon href={c.twitter} label="Twitter / X" icon={<span style={{fontSize:'.85rem'}} aria-hidden="true">𝕏</span>}/>}
              {c.linkedin && <SocIcon href={c.linkedin} label="LinkedIn" icon={<span style={{fontSize:'.75rem',fontWeight:700}} aria-hidden="true">in</span>}/>}
              {c.instagram && <SocIcon href={c.instagram} label="Instagram" icon={<span style={{fontSize:'.85rem'}} aria-hidden="true">◎</span>}/>}
              <SocIcon href={c.github || 'https://github.com/sescodtech'} label="GitHub" icon={<Github size={14} aria-hidden="true"/>}/>
            </div>
          </div>

          <nav aria-label="Footer navigation">
            <ColTitle>Navigation</ColTitle>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {NAV.map(l => <li key={l.href}><Link href={l.href} className="foot-link">{l.label}</Link></li>)}
            </ul>
          </nav>

          <nav aria-label="Services">
            <ColTitle>Services</ColTitle>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICES.map(s => <li key={s}><Link href="/services" className="foot-link">{s}</Link></li>)}
            </ul>
          </nav>

          <div>
            <ColTitle>Contact</ColTitle>
            <ContactItem icon={<Mail size={13}/>} href={`mailto:${c.email}`}>{c.email}</ContactItem>
            <ContactItem icon={<Globe size={13}/>} href={`https://${c.website}`}>{c.website}</ContactItem>
            <ContactItem icon={<MapPin size={13}/>}>{c.location}</ContactItem>
            <div style={{ marginTop: 20 }}>
              <Button href="/contact" variant="primary" size="sm">Start a Project →</Button>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: 'var(--gray)', fontSize: '.78rem' }}>
            © {new Date().getFullYear()} <span style={{ color: 'var(--blue)' }}>SESCO STUDIO</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

function ColTitle({ children }: { children: React.ReactNode }) {
  return <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: '#fff', marginBottom: 18 }}>{children}</p>;
}
function SocIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="soc-icon" style={{ width: 34, height: 34, background: 'var(--navy)', border: '1px solid var(--border)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)' }}>
      {icon}
    </a>
  );
}
function ContactItem({ icon, href, children }: { icon: React.ReactNode; href?: string; children: React.ReactNode }) {
  const content = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
      <div style={{ width: 28, height: 28, background: 'var(--blue-a)', borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', flexShrink: 0 }} aria-hidden="true">{icon}</div>
      <span style={{ color: 'var(--gray)', fontSize: '.88rem' }}>{children}</span>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>{content}</a> : content;
}
