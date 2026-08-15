'use client';
import { useState } from 'react';
import { Mail, Globe, MapPin, Clock, Github, Check, AlertCircle } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { submitContactForm } from '@/lib/contact';
import { Reveal, RevealLeft, RevealRight } from '@/components/ui/Motion';

const SERVICES = ['General Enquiry', 'Website Development', 'Branding', 'UI/UX Design', 'Automation', 'AI Solutions', 'Data Analysis', 'Digital Marketing', 'Consultation', 'Quote Request', 'Technical Support'];

export default function ContactPage() {
  const { data } = useCMS();
  const c = data.contact;
  const [form, setForm] = useState({ first: '', last: '', email: '', company: '', service: '', brief: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitContactForm(form);
      setStatus('submitted');
      setForm({ first: '', last: '', email: '', company: '', service: '', brief: '' });
      setTimeout(() => setStatus('idle'), 6000);
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <section style={{ padding: '160px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" aria-hidden="true" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><p className="section-label centered">Get In Touch</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-5xl)', letterSpacing: '-.025em', marginBottom: 20 }}>Start a Project</h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-lg)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto 32px' }}>Tell us about your project and we&apos;ll get back to you within 24 hours with a plan.</p></Reveal>
          <Reveal delay={0.3}>
            <div style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['24-Hour Response', 'Free Discovery Call', 'No Obligation Quote'].map(t => (
                <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'Montserrat,sans-serif', fontSize: '.68rem', fontWeight: 600, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--gray)' }}>
                  <Check size={13} color="var(--blue)" aria-hidden="true" /> {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'clamp(16px,3vw,24px)' }}>
        <div className="container" style={{ maxWidth: 1100, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 60, alignItems: 'start' }}>
          <RevealLeft>
            <div className="card" style={{ padding: 32 }}>
              <p className="section-label">Contact Info</p>
              <h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: 'var(--fs-2xl)', marginBottom: 28 }}>Let&apos;s Build Together</h2>

              <InfoItem icon={<Mail size={15} />} label="Email" value={c.email} href={`mailto:${c.email}`} />
              <InfoItem icon={<Globe size={15} />} label="Website" value={c.website} href={`https://${c.website}`} />
              <InfoItem icon={<MapPin size={15} />} label="Location" value={c.location} />
              <InfoItem icon={<Clock size={15} />} label="Response Time" value="Within 24 hours" last />

              <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
                <p className="section-label" style={{ marginBottom: 12 }}>Follow Us</p>
                <div style={{ display: 'flex', gap: 10 }}>
                  {c.twitter && <SocIcon href={c.twitter} label="Twitter / X" icon={<span style={{fontSize:'.8rem'}} aria-hidden="true">𝕏</span>} />}
                  {c.linkedin && <SocIcon href={c.linkedin} label="LinkedIn" icon={<span style={{fontSize:'.7rem',fontWeight:700}} aria-hidden="true">in</span>} />}
                  {c.instagram && <SocIcon href={c.instagram} label="Instagram" icon={<span style={{fontSize:'.8rem'}} aria-hidden="true">◎</span>} />}
                  <SocIcon href={c.github || 'https://github.com/sescodtech'} label="GitHub" icon={<Github size={14} aria-hidden="true" />} />
                </div>
              </div>
            </div>
          </RevealLeft>

          <RevealRight delay={0.15}>
            <form onSubmit={handleSubmit} className="card" style={{ padding: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label className="form-label" htmlFor="first-name">First Name</label>
                  <input id="first-name" className="form-input" value={form.first} onChange={e => setForm({ ...form, first: e.target.value })} placeholder="Olajide" required />
                </div>
                <div>
                  <label className="form-label" htmlFor="last-name">Last Name</label>
                  <input id="last-name" className="form-input" value={form.last} onChange={e => setForm({ ...form, last: e.target.value })} placeholder="Ayomide" required />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="form-label" htmlFor="email">Email Address</label>
                <input id="email" type="email" className="form-input" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" required />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="form-label" htmlFor="company">Company / Business</label>
                <input id="company" className="form-input" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Company Name" />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="form-label" htmlFor="service">Service Needed</label>
                <select id="service" className="form-input" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label className="form-label" htmlFor="brief">Project Brief</label>
                <textarea id="brief" className="form-input" style={{ minHeight: 120, resize: 'vertical' }} value={form.brief} onChange={e => setForm({ ...form, brief: e.target.value })} placeholder="Tell us about your project, goals, and timeline…" required />
              </div>
              <button type="submit" disabled={status === 'submitting'} className="btn btn-primary" style={{ width: '100%' }}>
                {status === 'submitting' ? 'Sending…' : <>Send Message →</>}
              </button>
              {status === 'submitted' && (
                <div role="status" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(47,107,255,.1)', border: '1px solid rgba(47,107,255,.3)', borderRadius: 8, padding: 16, textAlign: 'center', color: 'var(--blue)', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 600, marginTop: 16, justifyContent: 'center' }}>
                  <Check size={16} aria-hidden="true" /> Message sent! We&apos;ll be in touch within 24 hours.
                </div>
              )}
              {status === 'error' && (
                <div role="alert" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(239,68,68,.1)', border: '1px solid rgba(239,68,68,.3)', borderRadius: 8, padding: 16, textAlign: 'center', color: '#ef4444', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 600, marginTop: 16, justifyContent: 'center' }}>
                  <AlertCircle size={16} aria-hidden="true" /> Something went wrong — please email {c.email} directly.
                </div>
              )}
            </form>
          </RevealRight>
        </div>
      </section>
    </>
  );
}

function InfoItem({ icon, label, value, href, last }: { icon: React.ReactNode; label: string; value: string; href?: string; last?: boolean }) {
  const content = (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: last ? 0 : 24 }}>
      <div style={{ width: 40, height: 40, background: 'rgba(47,107,255,.12)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', flexShrink: 0 }} aria-hidden="true">{icon}</div>
      <div>
        <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: '.95rem', color: '#fff' }}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} style={{ textDecoration: 'none' }}>{content}</a> : content;
}
function SocIcon({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="soc-icon" style={{ width: 34, height: 34, background: 'var(--navy)', border: '1px solid var(--border)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)' }}>
      {icon}
    </a>
  );
}
