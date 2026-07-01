'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, RevealLeft, RevealRight, StaggerGrid, StaggerItem } from '@/components/ui/Motion';
import { CTASection } from '@/components/sections/HomeSections';

const VALUES = [
  { ico: '⚡', t: 'Excellence', d: 'We hold ourselves to the highest standard in every project — from strategic thinking to pixel-level execution.' },
  { ico: '🔗', t: 'Systems Thinking', d: 'We design holistically. Every component connects to a larger ecosystem that serves your business goals.' },
  { ico: '🤝', t: 'Partnership', d: "We don't take jobs. We form partnerships. Your growth is our growth, and we invest in your long-term success." },
  { ico: '🚀', t: 'Innovation', d: 'We stay at the frontier of technology — adopting AI, automation, and emerging tools before they become mainstream.' },
  { ico: '🎯', t: 'Precision', d: 'We are obsessive about detail. Clean code, sharp design, and tested systems are non-negotiable for us.' },
  { ico: '🌍', t: 'Impact', d: 'Every system we deliver should measurably improve your business outcomes. Impact is the only metric that matters.' },
];
const TEAM = [
  { initials: 'OA', name: 'Olajide Oluwaseyi Ayomide', role: 'Founder & Lead Engineer', bio: 'Full-stack developer, brand designer, and digital strategist with 5+ years building systems for Nigerian businesses. Founder of SESCO STUDIO and Sescohubs.' },
  { initials: 'DS', name: 'Design Systems Unit', role: 'UI/UX & Brand Design', bio: 'A collective of premium designers crafting visual identities, UI systems, and digital experiences that communicate brand value at every touchpoint.' },
  { initials: 'AT', name: 'Automation Team', role: 'AI & Workflow Engineering', bio: 'Specialists in AI integration, workflow automation, and intelligent system design — helping businesses eliminate manual work and scale efficiently.' },
];

export default function AboutPage() {
  const { data } = useCMS();

  return (
    <>
      {/* Hero */}
      <section style={{ padding: '160px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" />
        <div className="glow-blue" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 600, height: 400 }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 720, margin: '0 auto' }}>
          <Reveal><p className="section-label centered">About Us</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.8rem)', letterSpacing: '-.025em', marginBottom: 20 }}>We Are <span style={{ color: 'var(--blue)' }}>SESCO STUDIO</span></h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'clamp(.95rem,1.6vw,1.1rem)', lineHeight: 1.8 }}>A premium digital innovation studio combining technology, creativity, and intelligent systems to help modern businesses build, automate, and grow.</p></Reveal>
        </div>
      </section>

      {/* Mission & Vision */}
      <section style={{ padding: '80px 5%', background: 'var(--navy3)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 72, alignItems: 'center' }}>
          <RevealLeft>
            <p className="section-label">Our Mission</p>
            <h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', letterSpacing: '-.02em', marginBottom: 18 }}>{data.about.missionTitle}</h2>
            <p style={{ color: 'var(--gray)', fontSize: '1rem', lineHeight: 1.8, marginBottom: 28 }}>{data.about.missionDesc}</p>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--blue)', color: '#fff', padding: '12px 24px', borderRadius: 8, fontFamily: 'Montserrat,sans-serif', fontSize: '.7rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none' }}>
              Work With Us <ArrowRight size={13} />
            </Link>
          </RevealLeft>
          <RevealRight delay={0.2}>
            <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 20, padding: 40, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'radial-gradient(circle,rgba(47,107,255,.1) 0%,transparent 70%)' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <p className="section-label">Our Vision</p>
                <p style={{ color: 'var(--gray)', fontSize: '1rem', lineHeight: 1.8 }}>{data.about.vision}</p>
              </div>
            </div>
          </RevealRight>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: '110px 5%', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Reveal><p className="section-label centered">Core Values</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,3rem)', letterSpacing: '-.02em' }}>What We Stand For</h2></Reveal>
          </div>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {VALUES.map(v => (
              <StaggerItem key={v.t}>
                <div style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 16, padding: 36, height: '100%', transition: 'border-color .3s,transform .3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,107,255,.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
                  <div style={{ fontSize: '2rem', marginBottom: 16 }}>{v.ico}</div>
                  <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1.1rem', marginBottom: 10 }}>{v.t}</h3>
                  <p style={{ color: 'var(--gray)', fontSize: '.9rem', lineHeight: 1.7 }}>{v.d}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: '110px 5%', background: 'var(--navy3)', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <Reveal><p className="section-label centered">The Team</p></Reveal>
            <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,3rem)', letterSpacing: '-.02em' }}>People Behind the Systems</h2></Reveal>
          </div>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
            {TEAM.map(m => (
              <StaggerItem key={m.name}>
                <div style={{ background: 'var(--navy2)', border: '1px solid var(--border)', borderRadius: 16, padding: 32, textAlign: 'center', height: '100%' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(47,107,255,.12)', border: '2px solid rgba(47,107,255,.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--blue)', margin: '0 auto 16px' }}>{m.initials}</div>
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
