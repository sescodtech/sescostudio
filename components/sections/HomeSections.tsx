'use client';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, RevealLeft, RevealRight, StaggerGrid, StaggerItem, MetricBar } from '@/components/ui/Motion';
import Button from '@/components/ui/Button';

/* ─── TRUSTED BY ─── */
const CLIENTS = ['Andus International', 'IOCONSULTS', 'Mercy Hub', 'Emunahh', 'Deon Auto', 'Olajide Property'];
export function TrustedBy() {
  return (
    <div style={{ padding: '44px 5%', textAlign: 'center', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(11,15,26,.6)', position: 'relative', zIndex: 1 }}>
      <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--gray2)', marginBottom: 18 }}>Trusted By Forward-Thinking Businesses</p>
      <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
        {CLIENTS.map(c => <span key={c} className="trusted-by-name" style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.95rem', color: 'var(--gray2)', transition: 'color .3s var(--ease)' }}>{c}</span>)}
      </div>
    </div>
  );
}

/* ─── ABOUT PREVIEW ─── */
const PILLARS = [{ ico: '⚡', t: 'Technology' }, { ico: '🎨', t: 'Design' }, { ico: '🤖', t: 'Automation' }, { ico: '📈', t: 'Growth' }];
export function AboutPreview() {
  const { data } = useCMS();
  return (
    <section className="section section-alt">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 72, alignItems: 'center' }}>
        <RevealLeft>
          <p className="section-label">Who We Are</p>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em', marginBottom: 18 }}>We Build Systems,<br/>Not Just Designs</h2>
          <p style={{ color: 'var(--gray)', fontSize: 'var(--fs-base)', lineHeight: 1.8, marginBottom: 32 }}>{data.about.missionDesc}</p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 32 }}>
            {PILLARS.map(p => (
              <div key={p.t} className="hover-lift-card" style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 12, padding: 20 }}>
                <div style={{ fontSize: '1.2rem', marginBottom: 8 }} aria-hidden="true">{p.ico}</div>
                <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.88rem' }}>{p.t}</div>
              </div>
            ))}
          </div>
          <Button href="/about" variant="outline">Learn About Us <ArrowRight size={14} /></Button>
        </RevealLeft>
        <RevealRight delay={0.2}>
          <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 20, padding: 40, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'radial-gradient(circle,rgba(47,107,255,.1) 0%,transparent 70%)' }} aria-hidden="true" />
            <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, background: 'radial-gradient(circle,rgba(200,162,74,.07) 0%,transparent 70%)' }} aria-hidden="true" />
            {[['01', 'Technology', '+'], ['02', 'Design', '+'], ['03', 'Automation', '+'], ['04', 'Growth', '=']].map(([n, name, sym]) => (
              <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderBottom: '1px solid var(--border)', position: 'relative', zIndex: 1 }}>
                <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.1em', color: 'var(--blue)', width: 30, flexShrink: 0 }}>{n}</span>
                <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1.05rem', flex: 1 }}>{name}</span>
                <span style={{ color: 'var(--gold)', fontSize: '1.2rem', fontWeight: 300 }} aria-hidden="true">{sym}</span>
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', position: 'relative', zIndex: 1 }}>
              <span style={{ color: 'var(--gold)', width: 30, flexShrink: 0 }} aria-hidden="true">✦</span>
              <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem', color: 'var(--gold)' }}>Digital Excellence</span>
            </div>
          </div>
        </RevealRight>
      </div>
    </section>
  );
}

/* ─── PROCESS ─── */
const STEPS = [
  { n: '01', t: 'Discover', d: 'Deep-dive into your goals, challenges, and competitive landscape to define the right direction.' },
  { n: '02', t: 'Design', d: 'Craft the strategy, visual language, and digital architecture that solves the right problems beautifully.' },
  { n: '03', t: 'Develop', d: 'Build and implement with precision — clean code, tested components, production-ready deployment.' },
  { n: '04', t: 'Grow', d: 'Monitor, optimize, and scale — ensuring your digital investment compounds over time.' },
];
export function ProcessSection() {
  return (
    <section className="section section-light">
      <div className="container" style={{ maxWidth: 1100 }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <Reveal><p className="section-label centered">How We Work</p></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em', marginBottom: 16 }}>Our Process</h2></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-base)', lineHeight: 1.8, maxWidth: 500, margin: '0 auto' }}>A disciplined four-stage framework from insight to impact.</p></Reveal>
        </div>
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 32 }}>
          {STEPS.map(s => (
            <StaggerItem key={s.n} style={{ textAlign: 'center' }}>
              <div className="process-step-circle" style={{ width: 68, height: 68, background: 'var(--navy)', border: '2px solid var(--blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 22px', fontFamily: 'Montserrat,sans-serif', fontSize: '.68rem', fontWeight: 700, letterSpacing: '.08em', color: 'var(--blue)' }}>
                {s.n}
              </div>
              <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 10 }}>{s.t}</h3>
              <p style={{ color: 'var(--gray)', fontSize: '.88rem', lineHeight: 1.65 }}>{s.d}</p>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

/* ─── WHY SESCO ─── */
const BENS = [
  { ico: '🎯', t: 'Strategic Thinking', d: 'Every project starts with your business goals. We align technology and design to your growth strategy.' },
  { ico: '⚙️', t: 'Modern Technology', d: 'We build with Next.js, React, AI APIs, and cloud infrastructure to future-proof your investment.' },
  { ico: '💎', t: 'Creative Excellence', d: 'Premium aesthetics with pixel-perfect execution. Every system communicates your brand\'s true value.' },
  { ico: '📈', t: 'Business Growth', d: 'We measure success by your results — traffic, conversions, efficiency, and revenue.' },
];
const METRICS = [
  { l: 'Client Retention Rate', v: '94%', w: 94, gold: false },
  { l: 'On-Time Project Delivery', v: '97%', w: 97, gold: false },
  { l: 'Average Performance Uplift', v: '3.5×', w: 87, gold: true },
  { l: 'Industries Served', v: '10+', w: 70, gold: true },
];
export function WhySection() {
  return (
    <section className="section section-alt">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 80, alignItems: 'center' }}>
        <RevealLeft>
          <p className="section-label">Why SESCO STUDIO</p>
          <h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em', marginBottom: 12 }}>More Than A Creative Agency</h2>
          <p style={{ color: 'var(--gray)', fontSize: '1rem', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 600, marginBottom: 32 }}>We don&apos;t just create visuals. <span style={{ color: 'var(--blue)' }}>We build digital systems.</span></p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {BENS.map(b => (
              <div key={b.t} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 42, height: 42, background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }} aria-hidden="true">{b.ico}</div>
                <div>
                  <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.95rem', marginBottom: 3 }}>{b.t}</div>
                  <div style={{ color: 'var(--gray)', fontSize: '.85rem', lineHeight: 1.6 }}>{b.d}</div>
                </div>
              </div>
            ))}
          </div>
        </RevealLeft>
        <RevealRight delay={0.2}>
          <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 20, padding: 40, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -60, right: -60, width: 240, height: 240, background: 'radial-gradient(circle,rgba(200,162,74,.1) 0%,transparent 70%)' }} aria-hidden="true" />
            {METRICS.map((m, i) => (
              <div key={m.l} style={{ position: 'relative', zIndex: 1, marginTop: i > 0 ? 24 : 0, paddingTop: i > 0 ? 24 : 0, borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gray)', marginBottom: 8 }}>{m.l}</p>
                <MetricBar width={m.w} gold={m.gold} />
                <p style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '1.5rem', marginTop: 6, color: m.gold ? 'var(--gold)' : '#fff' }}>
                  {m.v.replace(/[×%+]/, '')}<small style={{ color: m.gold ? 'var(--gold)' : 'var(--blue)', fontSize: '.9rem' }}>{m.v.match(/[×%+]/)?.[0]}</small>
                </p>
              </div>
            ))}
          </div>
        </RevealRight>
      </div>
    </section>
  );
}

/* ─── PORTFOLIO PREVIEW ─── */
export function PortfolioPreview() {
  const { data } = useCMS();
  const featured = data.projects.slice(0, 3);
  return (
    <section className="section selected-work-section">
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20, marginBottom: 48 }}>
          <div>
            <Reveal><p className="section-label">Selected Work</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em' }}>Our Projects</h2></Reveal>
          </div>
          <Reveal delay={0.2}><Button href="/portfolio" variant="outline" size="sm">View All <ArrowRight size={13} /></Button></Reveal>
        </div>
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {featured.map(p => (
            <StaggerItem key={p.id}>
              <Link href="/case-studies" className="card card-hover portfolio-card selected-work-card" style={{ overflow: 'hidden', display: 'block', textDecoration: 'none', color: 'inherit' }}>
                <div style={{ aspectRatio: '16/9', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.2rem', position: 'relative' }}>
                  <span aria-hidden="true">{p.icon}</span>
                  <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(11,15,26,.85)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderRadius: 100, padding: '3px 10px', fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)' }}>{p.type}</div>
                  <div className="portfolio-card-overlay" style={{ position: 'absolute', inset: 0, background: 'rgba(11,15,26,.82)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, opacity: 0, transition: 'opacity .3s var(--ease)', fontFamily: 'Montserrat,sans-serif', fontSize: '.68rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)' }}>
                    View Case Study <ArrowRight size={14} />
                  </div>
                </div>
                <div style={{ padding: 22 }}>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>{p.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '.85rem', lineHeight: 1.6, marginBottom: 10 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {p.tags.slice(0,3).map(t => <span key={t} className="badge">{t}</span>)}
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGrid>
        <div className="portfolio-more-work" style={{ marginTop: 46 }}>
          <div>
            <p className="section-label">More Work</p>
            <h3>Our portfolio is a selection, not the full story.</h3>
            <p>{data.siteSettings.portfolioNote || 'We have delivered additional websites, digital platforms, business systems, and custom solutions that are not included in this public showcase. Our portfolio represents a selection of work, not everything we have built.'}</p>
          </div>
          <Button href="/contact" variant="primary">Discuss Your Project <ArrowRight size={14} /></Button>
        </div>
      </div>
    </section>
  );
}

/* ─── TESTIMONIALS ─── */
export function TestimonialsSection() {
  const { data } = useCMS();
  return (
    <section className="section section-alt">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <Reveal><p className="section-label centered">Client Feedback</p></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em' }}>What Our Clients Say</h2></Reveal>
        </div>
        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {data.testimonials.map(t => (
            <StaggerItem key={t.id}>
              <div className="card card-hover" style={{ padding: 34, height: '100%' }}>
                <div style={{ color: 'var(--gold)', fontSize: '.85rem', marginBottom: 16 }} aria-label={`${t.stars} out of 5 stars`}>{'★'.repeat(t.stars)}</div>
                <p style={{ color: 'var(--gray)', fontSize: '.92rem', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 24 }}>&quot;{t.quote}&quot;</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(47,107,255,.12)', border: '2px solid rgba(47,107,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.8rem', color: 'var(--blue)', flexShrink: 0 }} aria-hidden="true">{t.initials}</div>
                  <div>
                    <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '.88rem' }}>{t.name}</div>
                    <div style={{ fontSize: '.75rem', color: 'var(--gray)' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </section>
  );
}

/* ─── CTA ─── */
export function CTASection() {
  return (
    <section className="section" style={{ textAlign: 'center', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 900, height: 400, background: 'radial-gradient(ellipse,rgba(47,107,255,.12) 0%,transparent 70%)', pointerEvents: 'none' }} aria-hidden="true" />
      <div className="container" style={{ position: 'relative', zIndex: 1, maxWidth: 680 }}>
        <Reveal><p className="section-label centered">Let&apos;s Build Together</p></Reveal>
        <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em', marginBottom: 16 }}>Ready to Build Your<br/>Digital Future?</h2></Reveal>
        <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-base)', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 40px' }}>Turn your vision into a system that works — beautifully, reliably, at scale. Tell us about your project today.</p></Reveal>
        <Reveal delay={0.3}>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href="/contact" variant="primary">Start Your Project <ArrowRight size={14} /></Button>
            <Button href="/portfolio" className="btn-gold">View Our Work</Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
