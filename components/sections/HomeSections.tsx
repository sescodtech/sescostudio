'use client';
import { ArrowRight, ExternalLink, Monitor, Zap, Palette, Bot, TrendingUp, Target, Settings2, Gem } from 'lucide-react';
import Link from 'next/link';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, RevealLeft, RevealRight, StaggerGrid, StaggerItem } from '@/components/ui/Motion';
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
const PILLARS = [{ ico: Zap, t: 'Technology' }, { ico: Palette, t: 'Design' }, { ico: Bot, t: 'Automation' }, { ico: TrendingUp, t: 'Growth' }];
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
                <div style={{ fontSize: '1.2rem', marginBottom: 8 }} aria-hidden="true"><p.ico size={23} color="var(--blue)" /></div>
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
  { ico: Target, t: 'Strategic Thinking', d: 'Every project starts with your business goals. We align technology and design to your growth strategy.' },
  { ico: Settings2, t: 'Modern Technology', d: 'We build with Next.js, React, AI APIs, and cloud infrastructure to future-proof your investment.' },
  { ico: Gem, t: 'Creative Excellence', d: 'Premium aesthetics with pixel-perfect execution. Every system communicates your brand\'s true value.' },
  { ico: TrendingUp, t: 'Business Growth', d: 'We measure success by your results — traffic, conversions, efficiency, and revenue.' },
];
const DELIVERY_VALUES = [
  { number: '01', title: 'Purpose-led strategy', detail: 'A clear brief and measurable business objectives before design begins.' },
  { number: '02', title: 'Thoughtful engineering', detail: 'Responsive interfaces, maintainable systems and sensible integrations.' },
  { number: '03', title: 'Long-term partnership', detail: 'A focus on usability, support and sustainable improvements.' },
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
                <div style={{ width: 42, height: 42, background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.2)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }} aria-hidden="true"><b.ico size={24} color="var(--blue)" /></div>
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
            <p className="section-label">Our commitment</p>
            <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontSize: 'clamp(1.4rem,2vw,2rem)', lineHeight: 1.2, marginBottom: 24 }}>Beautiful on the surface. Built to work underneath.</h3>
            {DELIVERY_VALUES.map(item => (
              <div key={item.number} className="sesco-value-row">
                <span>{item.number}</span>
                <div><h4>{item.title}</h4><p>{item.detail}</p></div>
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
  const featured = data.projects.slice(0, 4);
  return (
    <section className="section section-light sesco-featured-work" id="featured-work">
      <div className="container">
        <div className="sesco-featured-heading">
          <div>
            <Reveal><p className="section-label">Selected Work / Our Portfolio</p></Reveal>
            <Reveal delay={0.1}><h2>Digital experiences.<br/><span>Built for real businesses.</span></h2></Reveal>
            <p>Explore a selection of websites and digital products we have developed. Our public showcase is only part of the work we do.</p>
          </div>
          <Button href="/portfolio" variant="outline" size="sm">Explore all projects <ArrowRight size={15} /></Button>
        </div>
        <div className="sesco-featured-grid">
          {featured.map((project, index) => (
            <article className="sesco-work-card" key={project.id}>
              <div className="sesco-work-visual">
                <div className="sesco-browser-bar" aria-hidden="true"><span/><span/><span/><div>{project.link ? (() => { try { return new URL(project.link).hostname; } catch { return 'Project preview'; } })() : 'Project preview'}</div></div>
                {project.preview ? <img src={project.preview} alt={`${project.title} website screenshot`} loading="lazy" /> : <div className="sesco-preview-placeholder"><Monitor size={38} strokeWidth={1.3}/><span>Website preview coming soon</span></div>}
                <span className="sesco-work-number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <div className="sesco-work-content">
                <span className="sesco-work-category">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
                <div className="sesco-work-tags">{project.tags.slice(0,3).map(tag => <span key={tag}>{tag}</span>)}</div>
                <div className="sesco-work-actions">
                  {project.link && /^https?:\/\//i.test(project.link) && <a href={project.link} target="_blank" rel="noopener noreferrer" className="sesco-work-live">Visit live website <ExternalLink size={15}/></a>}
                  <Link href="/case-studies" className="sesco-work-case">Explore case studies <ArrowRight size={15}/></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="sesco-featured-footnote">Have a project in mind? <Link href="/contact">Let’s create something exceptional <ArrowRight size={14}/></Link></p>
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
