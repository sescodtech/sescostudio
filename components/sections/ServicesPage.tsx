'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';
import Button from '@/components/ui/Button';

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, padding: '18px 22px', background: 'none', border: 'none', color: '#fff', textAlign: 'left', cursor: 'pointer', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.95rem' }}
      >
        {q}
        <ChevronDown size={16} color="var(--gray)" aria-hidden="true" style={{ flexShrink: 0, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .25s var(--ease)' }} />
      </button>
      <div style={{ maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height .3s var(--ease)' }}>
        <p style={{ color: 'var(--gray)', fontSize: '.88rem', lineHeight: 1.7, padding: '0 22px 20px' }}>{a}</p>
      </div>
    </div>
  );
}

const PRICING = [
  { tier: 'Starter', tag: 'Small Projects', items: ['Landing page or brochure site', 'Brand identity design', '3 revisions included', '2-week delivery', '30-day support'], cta: 'Get a Quote', style: 'outline' },
  { tier: 'Growth', tag: 'Full Digital System', featured: true, items: ['Full-stack web application', 'Complete brand system', 'Admin CMS dashboard', 'SEO & performance setup', 'AI/automation integration', '90-day support'], cta: 'Start a Project →', style: 'primary' },
  { tier: 'Enterprise', tag: 'Strategic Partnership', items: ['Full digital transformation', 'Multi-platform systems', 'AI automation suite', 'Social media management', 'Dedicated project manager', 'Ongoing retainer'], cta: "Let's Talk →", style: 'gold' },
];

export default function ServicesPage() {
  const { data } = useCMS();

  return (
    <>
      <section style={{ padding: '160px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" aria-hidden="true" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><p className="section-label centered">What We Do</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-5xl)', letterSpacing: '-.025em', marginBottom: 20 }}>Our Services</h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-lg)', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>Full-spectrum digital capabilities — from concept to deployment. We handle every layer of your digital infrastructure.</p></Reveal>
        </div>
      </section>

      <section className="section section-light" style={{ paddingTop: 'clamp(24px,4vw,40px)' }}>
        <div className="container">
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 22 }}>
            {data.services.map((svc, i) => (
              <StaggerItem key={svc.id}>
                <div className={`card card-hover card-top-line${svc.color === 'gold' ? ' gold' : ''}`} style={{ padding: 44, position: 'relative', overflow: 'hidden', height: '100%' }}>
                  <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 16 }}>0{i + 1}</p>
                  <div style={{ width: 52, height: 52, background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 20 }} aria-hidden="true">{svc.icon}</div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: 'var(--fs-xl)', marginBottom: 10 }}>{svc.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '.92rem', lineHeight: 1.75, marginBottom: 22 }}>{svc.desc}</p>
                  {svc.items && (
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {svc.items.map(item => (
                        <li key={item} style={{ color: 'var(--gray)', fontSize: '.88rem', paddingLeft: 18, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--blue)' }} aria-hidden="true">→</span>{item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Reveal><p className="section-label centered">Pricing</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em', marginBottom: 16 }}>Transparent Pricing</h2></Reveal>
            <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-base)', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>Flexible packages designed to meet you where you are — with room to scale.</p></Reveal>
          </div>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20, alignItems: 'center' }}>
            {PRICING.map(p => (
              <StaggerItem key={p.tier}>
                <div
                  className={`card-hover${p.featured ? ' pricing-card-featured' : ''}`}
                  style={{
                    background: p.featured ? 'linear-gradient(135deg,rgba(47,107,255,.1),rgba(11,15,26,0))' : 'var(--navy2)',
                    border: `1px solid ${p.featured ? 'rgba(47,107,255,.45)' : 'var(--border)'}`,
                    borderRadius: 'var(--radius-md)', padding: p.featured ? '48px 40px' : 40, textAlign: 'center', position: 'relative', overflow: 'hidden', height: '100%',
                    boxShadow: p.featured ? 'var(--shadow-blue)' : undefined,
                    zIndex: p.featured ? 1 : undefined,
                  }}
                >
                  {p.featured && <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--blue)', color: '#fff', fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderBottomLeftRadius: 8 }}>Most Popular</div>}
                  <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{p.tier}</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-3xl)', marginBottom: 4 }}>Custom</p>
                  <p style={{ color: 'var(--gray)', fontSize: '.8rem', marginBottom: 24 }}>{p.tag}</p>
                  <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {p.items.map(item => (
                      <li key={item} style={{ color: 'var(--gray)', fontSize: '.88rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }} aria-hidden="true">✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  <Button href="/contact" className={p.style === 'gold' ? 'btn-gold' : ''} variant={p.style === 'primary' ? 'primary' : p.style === 'gold' ? 'primary' : 'outline'} style={{ width: '100%' }}>{p.cta}</Button>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {data.faq && data.faq.length > 0 && (
        <section className="section">
          <div className="container" style={{ maxWidth: 800 }}>
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <Reveal><p className="section-label centered">FAQ</p></Reveal>
              <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-3xl)', letterSpacing: '-.02em' }}>Common Questions</h2></Reveal>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {data.faq.map(f => <FAQItem key={f.id} q={f.q} a={f.a} />)}
            </div>
          </div>
        </section>
      )}

      <section className="section" style={{ textAlign: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(47,107,255,.1) 0%,transparent 70%)' }} aria-hidden="true" />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <Reveal><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-3xl)', letterSpacing: '-.02em', marginBottom: 16 }}>Not Sure Which Service You Need?</h2></Reveal>
          <Reveal delay={0.1}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-base)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 32px' }}>Book a free 30-minute strategy call. We&apos;ll diagnose your situation and recommend the right system.</p></Reveal>
          <Reveal delay={0.2}><Button href="/contact" variant="primary">Book a Free Call →</Button></Reveal>
        </div>
      </section>
    </>
  );
}
