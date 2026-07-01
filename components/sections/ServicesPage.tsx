'use client';
import Link from 'next/link';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';
import { CTASection } from '@/components/sections/HomeSections';

const PRICING = [
  { tier: 'Starter', tag: 'Small Projects', items: ['Landing page or brochure site', 'Brand identity design', '3 revisions included', '2-week delivery', '30-day support'], cta: 'Get a Quote', style: 'outline' },
  { tier: 'Growth', tag: 'Full Digital System', featured: true, items: ['Full-stack web application', 'Complete brand system', 'Admin CMS dashboard', 'SEO & performance setup', 'AI/automation integration', '90-day support'], cta: 'Start a Project →', style: 'primary' },
  { tier: 'Enterprise', tag: 'Strategic Partnership', items: ['Full digital transformation', 'Multi-platform systems', 'AI automation suite', 'Social media management', 'Dedicated project manager', 'Ongoing retainer'], cta: "Let's Talk →", style: 'gold' },
];

export default function ServicesPage() {
  const { data } = useCMS();

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '160px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><p className="section-label centered">What We Do</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.8rem)', letterSpacing: '-.025em', marginBottom: 20 }}>Our Services</h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 560, margin: '0 auto' }}>Full-spectrum digital capabilities — from concept to deployment. We handle every layer of your digital infrastructure.</p></Reveal>
        </div>
      </section>

      {/* Service Cards */}
      <section style={{ padding: '40px 5% 110px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 22 }}>
            {data.services.map((svc, i) => (
              <StaggerItem key={svc.id}>
                <div className={`card-top-line${svc.color === 'gold' ? ' gold' : ''}`} style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 16, padding: 44, position: 'relative', overflow: 'hidden', height: '100%', transition: 'border-color .3s,transform .3s,box-shadow .3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,107,255,.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(0,0,0,.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
                  <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 16 }}>0{i + 1}</p>
                  <div style={{ width: 52, height: 52, background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.2)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: 20 }}>{svc.icon}</div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1.3rem', marginBottom: 10 }}>{svc.title}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '.92rem', lineHeight: 1.75, marginBottom: 22 }}>{svc.desc}</p>
                  {svc.items && (
                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 9 }}>
                      {svc.items.map(item => (
                        <li key={item} style={{ color: 'var(--gray)', fontSize: '.88rem', paddingLeft: 18, position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 0, color: 'var(--blue)' }}>→</span>{item}
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

      {/* Pricing */}
      <section style={{ padding: '110px 5%', background: 'var(--navy3)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Reveal><p className="section-label centered">Pricing</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,3rem)', letterSpacing: '-.02em', marginBottom: 16 }}>Transparent Pricing</h2></Reveal>
            <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 480, margin: '0 auto' }}>Flexible packages designed to meet you where you are — with room to scale.</p></Reveal>
          </div>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 20 }}>
            {PRICING.map(p => (
              <StaggerItem key={p.tier}>
                <div style={{ background: p.featured ? 'linear-gradient(135deg,rgba(47,107,255,.08),rgba(11,15,26,0))' : 'var(--navy2)', border: `1px solid ${p.featured ? 'rgba(47,107,255,.4)' : 'var(--border)'}`, borderRadius: 16, padding: 40, textAlign: 'center', position: 'relative', overflow: 'hidden', height: '100%' }}>
                  {p.featured && <div style={{ position: 'absolute', top: 0, right: 0, background: 'var(--blue)', color: '#fff', fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', padding: '4px 12px', borderBottomLeftRadius: 8 }}>Most Popular</div>}
                  <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{p.tier}</p>
                  <p style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '2.5rem', marginBottom: 4 }}>Custom</p>
                  <p style={{ color: 'var(--gray)', fontSize: '.8rem', marginBottom: 24 }}>{p.tag}</p>
                  <ul style={{ listStyle: 'none', textAlign: 'left', marginBottom: 28, display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {p.items.map(item => (
                      <li key={item} style={{ color: 'var(--gray)', fontSize: '.88rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: 'var(--blue)', fontWeight: 700, flexShrink: 0 }}>✓</span>{item}
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" style={{ display: 'block', width: '100%', padding: '12px', borderRadius: 8, fontFamily: 'Montserrat,sans-serif', fontSize: '.7rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', textAlign: 'center', ...(p.style === 'primary' ? { background: 'var(--blue)', color: '#fff' } : p.style === 'gold' ? { background: 'linear-gradient(135deg,var(--gold),#e8c060)', color: '#0B0F1A' } : { background: 'transparent', color: '#fff', border: '1px solid var(--border)' }) }}>
                    {p.cta}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 5%', textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at center,rgba(47,107,255,.1) 0%,transparent 70%)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Reveal><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-.02em', marginBottom: 16 }}>Not Sure Which Service You Need?</h2></Reveal>
          <Reveal delay={0.1}><p style={{ color: 'var(--gray)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 520, margin: '0 auto 32px' }}>Book a free 30-minute strategy call. We'll diagnose your situation and recommend the right system.</p></Reveal>
          <Reveal delay={0.2}><Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--blue)', color: '#fff', padding: '13px 28px', borderRadius: 8, fontFamily: 'Montserrat,sans-serif', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none' }}>Book a Free Call →</Link></Reveal>
        </div>
      </section>
    </>
  );
}
