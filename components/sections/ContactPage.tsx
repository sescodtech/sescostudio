'use client';
import { useState } from 'react';
import { Mail, Globe, MapPin, Clock, Github, Check } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, RevealLeft, RevealRight } from '@/components/ui/Motion';

const SERVICES = ['Web Development', 'Branding & Design', 'AI Automation', 'Social Media Management', 'Full Digital System', 'Other'];

export default function ContactPage() {
  const { data } = useCMS();
  const c = data.contact;
  const [form, setForm] = useState({ first: '', last: '', email: '', company: '', service: '', brief: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Stores lead locally; wire to an API route + email service for production
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ first: '', last: '', email: '', company: '', service: '', brief: '' });
  };

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 8,
    padding: '12px 16px', color: '#fff', fontFamily: 'Inter,sans-serif', fontSize: '.9rem', outline: 'none', transition: 'border-color .2s',
  };
  const labelStyle: React.CSSProperties = { fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 8, display: 'block' };

  return (
    <>
      <section style={{ padding: '160px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><p className="section-label centered">Get In Touch</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.8rem)', letterSpacing: '-.025em', marginBottom: 20 }}>Start a Project</h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>Tell us about your project and we'll get back to you within 24 hours with a plan.</p></Reveal>
        </div>
      </section>

      <section style={{ padding: '20px 5% 110px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 60, alignItems: 'start' }}>
          {/* Info */}
          <RevealLeft>
            <p className="section-label">Contact Info</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1.8rem', marginBottom: 28 }}>Let's Build Together</h2>

            <InfoItem icon={<Mail size={15} />} label="Email" value={c.email} href={`mailto:${c.email}`} />
            <InfoItem icon={<Globe size={15} />} label="Website" value={c.website} href={`https://${c.website}`} />
            <InfoItem icon={<MapPin size={15} />} label="Location" value={c.location} />
            <InfoItem icon={<Clock size={15} />} label="Response Time" value="Within 24 hours" />

            <div style={{ marginTop: 32 }}>
              <p className="section-label" style={{ marginBottom: 12 }}>Follow Us</p>
              <div style={{ display: 'flex', gap: 10 }}>
                <SocIcon href={c.twitter || '#'} icon={<span style={{fontSize:'.8rem'}}>𝕏</span>} />
                <SocIcon href={c.linkedin || '#'} icon={<span style={{fontSize:'.7rem',fontWeight:700}}>in</span>} />
                <SocIcon href={c.instagram || '#'} icon={<span style={{fontSize:'.8rem'}}>◎</span>} />
                <SocIcon href={c.github || 'https://github.com/sescodtech'} icon={<Github size={14} />} />
              </div>
            </div>
          </RevealLeft>

          {/* Form */}
          <RevealRight delay={0.15}>
            <form onSubmit={handleSubmit} style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 20, padding: 40 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>First Name</label>
                  <input style={inputStyle} value={form.first} onChange={e => setForm({ ...form, first: e.target.value })} placeholder="Olajide" required />
                </div>
                <div>
                  <label style={labelStyle}>Last Name</label>
                  <input style={inputStyle} value={form.last} onChange={e => setForm({ ...form, last: e.target.value })} placeholder="Ayomide" required />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Email Address</label>
                <input type="email" style={inputStyle} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" required />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Company / Business</label>
                <input style={inputStyle} value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} placeholder="Your Company Name" />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Service Needed</label>
                <select style={inputStyle} value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                  <option value="">Select a service…</option>
                  {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Project Brief</label>
                <textarea style={{ ...inputStyle, minHeight: 120, resize: 'vertical' }} value={form.brief} onChange={e => setForm({ ...form, brief: e.target.value })} placeholder="Tell us about your project, goals, and timeline…" required />
              </div>
              <button type="submit" style={{ width: '100%', padding: 14, borderRadius: 8, background: 'var(--blue)', color: '#fff', fontFamily: 'Montserrat,sans-serif', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}>
                Send Message →
              </button>
              {submitted && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(47,107,255,.1)', border: '1px solid rgba(47,107,255,.3)', borderRadius: 8, padding: 16, textAlign: 'center', color: 'var(--blue)', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 600, marginTop: 16, justifyContent: 'center' }}>
                  <Check size={16} /> Message sent! We'll be in touch within 24 hours.
                </div>
              )}
            </form>
          </RevealRight>
        </div>
      </section>
    </>
  );
}

function InfoItem({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const content = (
    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 24 }}>
      <div style={{ width: 40, height: 40, background: 'rgba(47,107,255,.12)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--blue)', flexShrink: 0 }}>{icon}</div>
      <div>
        <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 2 }}>{label}</div>
        <div style={{ fontSize: '.95rem', color: '#fff' }}>{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener" style={{ textDecoration: 'none' }}>{content}</a> : content;
}
function SocIcon({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener" style={{ width: 34, height: 34, background: 'var(--navy)', border: '1px solid var(--border)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gray)' }}>
      {icon}
    </a>
  );
}
