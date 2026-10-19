'use client';
import { ArrowRight, Code2, Blocks, ShoppingBag, Palette, Bot, LineChart, Layers3 } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';
import Button from '@/components/ui/Button';

const serviceIcons = [Code2, Blocks, ShoppingBag, Palette, Bot, LineChart, Layers3];

export default function ServicesSection() {
  const { data } = useCMS();

  return (
    <section className="section">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <Reveal><p className="section-label centered">What We Do</p></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.02em', marginBottom: 16 }}>Our Core Capabilities</h2></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-base)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>End-to-end digital solutions — from strategy to deployment. We handle every layer of your digital infrastructure.</p></Reveal>
        </div>

        <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 20 }}>
          {data.services.map((svc, i) => (
            <StaggerItem key={svc.id}>
              <div className={`card card-hover card-top-line premium-service-card${svc.color === 'gold' ? ' gold' : ''}`} style={{ padding: 40, position: 'relative', overflow: 'hidden', height: '100%' }}>
                <span className={`badge${svc.color === 'gold' ? ' badge-gold' : ''}`} style={{ marginBottom: 20 }}>{svc.tag}</span>
                <div className="premium-service-icon" aria-hidden="true">{(() => { const Icon = serviceIcons[i % serviceIcons.length]; return <Icon size={24} strokeWidth={1.8} />; })()}</div>
                <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: 'var(--fs-xl)', marginBottom: 10 }}>{svc.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '.9rem', lineHeight: 1.7, marginBottom: 22 }}>{svc.desc}</p>
                <Button href="/services" variant="ghost" className="learn-more-link">Learn More <ArrowRight size={12} /></Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Button href="/services" variant="outline">View All Services <ArrowRight size={14} /></Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
