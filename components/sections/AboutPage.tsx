'use client';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, RevealLeft, RevealRight, StaggerGrid, StaggerItem } from '@/components/ui/Motion';
import { CTASection } from '@/components/sections/HomeSections';
import Button from '@/components/ui/Button';

const VALUES = [
  { ico: '⚡', t: 'Excellence', d: 'We hold ourselves to the highest standard in every project — from strategic thinking to pixel-level execution.' },
  { ico: '🔗', t: 'Systems Thinking', d: 'We design holistically. Every component connects to a larger ecosystem that serves your business goals.' },
  { ico: '🤝', t: 'Partnership', d: "We don't take jobs. We form partnerships. Your growth is our growth, and we invest in your long-term success." },
  { ico: '🚀', t: 'Innovation', d: 'We stay at the frontier of technology — adopting AI, automation, and emerging tools before they become mainstream.' },
  { ico: '🎯', t: 'Precision', d: 'We are obsessive about detail. Clean code, sharp design, and tested systems are non-negotiable for us.' },
  { ico: '🌍', t: 'Impact', d: 'Every system we deliver should measurably improve your business outcomes. Impact is the only metric that matters.' },
];

export default function AboutPage() {
  const { data } = useCMS();

  return (
    <>
      <section style={{ padding: '160px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" aria-hidden="true" />
        <div className="glow-blue" aria-hidden="true" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto' }}>
          <Reveal><p className="section-label centered">About Us</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-5xl)', letterSpacing: '-.025em', marginBottom: 20 }}>We Are <span style={{ color: 'var(--blue)' }}>SESCO STUDIO</span></h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-lg)', lineHeight: 1.8 }}>A premium digital innovation studio combining technology, creativity, and intelligent systems to help modern businesses build, automate, and grow.</p></Reveal>
        </div>
      </section>

      <section className="section section-alt" style={{ paddingBlock: 'clamp(56px,7vw,88px)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 72, alignItems: 'center' }}>
          <RevealLeft>
            <p className="section-label">Our Mission</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-3xl)', letterSpacing: '-.02em', marginBottom: 18 }}>{data.about.missionTitle}</h2>
            <p style={{ color: 'var(--gray)', fontSize: 'var(--fs-base)', lineHeight: 1.8, marginBottom: 28 }}>{data.about.missionDesc}</p>
            <Button href="/contact" variant="primary" size="sm">Work With Us <ArrowRight size={13} /></Button>
          </RevealLeft>
          <RevealRight delay={0.2}>
            <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 20, padding: 40, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'radial-gradient(circle,rgba(47,107,255,.1) 0%,transparent 70%)' }} aria-hidden="true" />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p className="section-label">Our Vision</p>
                <p style={{ color: 'var(--gray)', fontSize: 'var(--fs-base)', lineHeight: 1.8 }}>{data.about.vision}</p>
              </div>
            </div>
          </RevealRight>
        </div>
      </section>

      <section className="section section-light">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Reveal><p className="section-label centered">Core Values</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em' }}>What We Stand For</h2></Reveal>
          </div>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {VALUES.map(v => (
              <StaggerItem key={v.t}>
                <div className="card card-hover" style={{ padding: 36, height: '100%' }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }} aria-hidden="true">{v.ico}</div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>{v.t}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '.9rem', lineHeight: 1.7 }}>{v.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Reveal><p className="section-label centered">The Team</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em' }}>People Behind the Systems</h2></Reveal>
          </div>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {data.team.map(m => (
              <StaggerItem key={m.id}>
                <div className="card card-hover" style={{ padding: 32, textAlign: 'center', height: '100%', background: 'var(--navy2)' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(47,107,255,.12)', border: '2px solid rgba(47,107,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--blue)', margin: '0 auto 16px' }} aria-hidden="true">{m.initials}</div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{m.name}</h3>
                  <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12 }}>{m.role}</p>
                  <p style={{ color: 'var(--gray)', fontSize: '.85rem', lineHeight: 1.65 }}>{m.bio}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      <CTASection />
    </>
  );
}
