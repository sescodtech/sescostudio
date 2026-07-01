'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';

export default function ServicesSection() {
  const { data } = useCMS();

  return (
    <section style={{ padding: '110px 5%', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Reveal><p className="section-label centered">What We Do</p></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(1.9rem,4vw,3rem)', letterSpacing: '-.02em', marginBottom: 16 }}>Our Core Capabilities</h2></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: '1rem', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>End-to-end digital solutions — from strategy to deployment. We handle every layer of your digital infrastructure.</p></Reveal>
        </div>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {data.services.map(svc => (
            <StaggerItem key={svc.id}>
              <div
                className={`card-top-line${svc.color === 'gold' ? ' gold' : ''}`}
                style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 16, padding: 40, position: 'relative', overflow: 'hidden', cursor: 'default', transition: 'border-color .3s,transform .3s,box-shadow .3s', height: '100%' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,107,255,.3)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 20px 50px rgba(0,0,0,.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}
              >
                <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16 }}>{svc.tag}</p>
                <div style={{ width: 50, height: 50, background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.2)', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', marginBottom: 20 }}>{svc.icon}</div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1.25rem', marginBottom: 10 }}>{svc.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: 22 }}>{svc.desc}</p>
                <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--blue)', textDecoration: 'none', transition: 'gap .2s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.gap = '10px'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.gap = '6px'}>
                  Learn More <ArrowRight size={12} />
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '13px 28px', borderRadius: 8, fontFamily: 'Montserrat,sans-serif', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(167,176,192,.15)', transition: 'border-color .2s' }}>
              View All Services <ArrowRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
