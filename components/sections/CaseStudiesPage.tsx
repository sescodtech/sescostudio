'use client';
import { ExternalLink, LockKeyhole, ShieldCheck } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';

const LIVE_LINKS: Record<string, string> = {
  'Mercy Hub': 'https://mercy-hub.vercel.app',
  'Andus International': 'https://andusinternationalng.com',
  'Olajide Property': 'https://olajide-property.vercel.app',
};

export default function CaseStudiesPage() {
  const { data } = useCMS();
  return (
    <>
      <section className="page-hero page-hero-compact">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="container page-hero-content">
          <Reveal><p className="section-label centered">Case Studies</p></Reveal>
          <Reveal delay={0.1}><h1>How we turn ideas into <span>working systems.</span></h1></Reveal>
          <Reveal delay={0.2}><p>Selected project stories, delivery challenges and outcomes. Confidential engagements are intentionally presented without restricted client details.</p></Reveal>
        </div>
      </section>
      <section className="section section-light">
        <div className="container">
          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))', gap: 24 }}>
            {data.projects.map(p => {
              const confidential = p.visibility === 'confidential' || p.accessType === 'private_demo';
              const link = p.link || LIVE_LINKS[p.title];
              return <StaggerItem key={p.id}>
                <article id={`project-${p.id}`} className="card card-hover case-card-pro">
                  <div className="case-visual" style={{ background: p.bg }}><span aria-hidden="true">{p.icon}</span></div>
                  <div className="case-copy">
                    <div className="case-meta-row"><span className="portfolio-type">{p.type}</span><span className={confidential ? 'badge badge-gold' : 'badge'}>{confidential ? <><LockKeyhole size={12}/> NDA / Confidential</> : p.accessType === 'client_app' ? <><ShieldCheck size={12}/> Client Access</> : <><ExternalLink size={12}/> Public Project</>}</span></div>
                    <h2>{p.title}</h2>
                    <p className="case-description">{p.desc}</p>
                    <p className="case-challenge"><strong>{confidential ? 'Engagement:' : 'Challenge:'}</strong> {confidential ? 'Confidential engagement. Selected technical details are withheld under client agreement.' : p.challenge || 'Digital product strategy, design and engineering focused on measurable business outcomes.'}</p>
                    <div className="case-results">
                      {p.r1 && <div><strong>{p.r1.n}</strong><span>{p.r1.l}</span></div>}
                      {p.r2 && <div><strong>{p.r2.n}</strong><span>{p.r2.l}</span></div>}
                      {p.results && <div><strong>{p.results}</strong><span>Project outcome</span></div>}
                    </div>
                    {link && !confidential && <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm" style={{ marginTop: 20 }}>Visit Live Project <ExternalLink size={13}/></a>}
                  </div>
                </article>
              </StaggerItem>;
            })}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
