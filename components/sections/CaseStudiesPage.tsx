'use client';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';
import { ExternalLink } from 'lucide-react';
import { getProjectLiveLink } from '@/lib/projectLinks';

export default function CaseStudiesPage() {
  const { data } = useCMS();

  return (
    <>
      <section style={{ padding: '160px 5% 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><p className="section-label centered">Deep Dives</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.8rem)', letterSpacing: '-.025em', marginBottom: 20 }}>Case Studies</h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>Behind-the-scenes breakdowns of how we approached, built, and delivered each project — and the results that followed.</p></Reveal>
        </div>
      </section>

      <section style={{ padding: '20px 5% 110px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(420px,1fr))', gap: 24 }}>
            {data.projects.map(p => (
              <StaggerItem key={p.id}>
                <div style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', cursor: 'default', transition: 'transform .3s,border-color .3s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,107,255,.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}>
                  <div style={{ aspectRatio: '16/9', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', padding: 40 }}>{p.icon}</div>
                  <div style={{ padding: 28 }}>
                    <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{p.type}</p>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1.2rem', marginBottom: 10 }}>{p.title}</h3>
                    <p style={{ color: 'var(--gray)', fontSize: '.88rem', lineHeight: 1.7, marginBottom: 18 }}>
                      <strong style={{ color: 'inherit' }}>Challenge: </strong>{p.challenge}
                    </p>
                    {getProjectLiveLink(p.title, p.link) && (
                      <a href={getProjectLiveLink(p.title, p.link)} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ marginBottom: 18 }}>
                        Visit Live Project <ExternalLink size={13} />
                      </a>
                    )}
                    <div style={{ display: 'flex', gap: 24, paddingTop: 18, borderTop: '1px solid var(--border)' }}>
                      {p.r1 && (
                        <div>
                          <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '1.3rem' }}>
                            {p.r1.n.replace(/[×%+]/, '')}<em style={{ color: 'var(--blue)', fontStyle: 'normal' }}>{p.r1.n.match(/[×%+]/)?.[0]}</em>
                          </div>
                          <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray)' }}>{p.r1.l}</div>
                        </div>
                      )}
                      {p.r2 && (
                        <div>
                          <div style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '1.3rem' }}>
                            {p.r2.n.replace(/[×%+]/, '')}<em style={{ color: 'var(--blue)', fontStyle: 'normal' }}>{p.r2.n.match(/[×%+]/)?.[0]}</em>
                          </div>
                          <div style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--gray)' }}>{p.r2.l}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
