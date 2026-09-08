'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight, LockKeyhole, ExternalLink, ShieldCheck } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';

const LIVE_LINKS: Record<string, string> = {
  'Mercy Hub': 'https://mercy-hub.vercel.app',
  'Andus International': 'https://andusinternationalng.com',
  'Olajide Property': 'https://olajide-property.vercel.app',
  'IOCONSULTS': '',
  'FinLens Analyzer': '',
  'Sescohubs VTU': '',
};

function accessMeta(p: { visibility?: 'public' | 'confidential'; accessType?: 'live' | 'client_app' | 'private_demo' | 'none'; link?: string }) {
  if (p.visibility === 'confidential' || p.accessType === 'private_demo') return { label: 'Confidential / NDA', icon: <LockKeyhole size={13} />, tone: 'gold' as const };
  if (p.accessType === 'client_app') return { label: 'Client Web Application', icon: <ShieldCheck size={13} />, tone: 'blue' as const };
  if (p.link || p.accessType === 'live') return { label: 'Live Project', icon: <ExternalLink size={13} />, tone: 'blue' as const };
  return { label: 'Selected Work', icon: <ShieldCheck size={13} />, tone: 'blue' as const };
}

export default function PortfolioPage() {
  const { data } = useCMS();
  const [filter, setFilter] = useState('all');
  const types = useMemo(() => ['all', ...Array.from(new Set(data.projects.map(p => p.type)))], [data.projects]);
  const filtered = filter === 'all' ? data.projects : data.projects.filter(p => p.type === filter);

  return (
    <>
      <section className="page-hero">
        <div className="grid-overlay" aria-hidden="true" />
        <div className="page-hero-glow" aria-hidden="true" />
        <div className="container page-hero-content">
          <Reveal><p className="section-label centered">Portfolio</p></Reveal>
          <Reveal delay={0.1}><h1>Digital products built to <span>work.</span></h1></Reveal>
          <Reveal delay={0.2}><p>Selected systems, websites, platforms and digital products delivered for businesses, institutions and growing brands.</p></Reveal>
        </div>
      </section>

      <section className="section section-light portfolio-section">
        <div className="container">
          <Reveal>
            <div className="portfolio-filter" role="group" aria-label="Filter projects by category">
              {types.map(type => <button key={type} onClick={() => setFilter(type)} aria-pressed={filter === type} className={filter === type ? 'active' : ''}>{type === 'all' ? 'All Work' : type}</button>)}
            </div>
          </Reveal>

          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
            {filtered.map(p => {
              const link = p.link || LIVE_LINKS[p.title];
              const meta = accessMeta({ ...p, link });
              const confidential = p.visibility === 'confidential' || p.accessType === 'private_demo';
              return (
                <StaggerItem key={p.id}>
                  <article className="card card-hover portfolio-card-pro">
                    <div className="portfolio-visual" style={{ background: p.bg }}>
                      <span className="portfolio-icon" aria-hidden="true">{p.icon}</span>
                      <span className={`portfolio-status ${meta.tone}`}>{meta.icon}{meta.label}</span>
                    </div>
                    <div className="portfolio-copy">
                      <div className="portfolio-type">{p.type}</div>
                      <h2>{p.title}</h2>
                      <p>{p.desc}</p>
                      <div className="portfolio-tags">{p.tags.slice(0, 4).map(t => <span key={t}>{t}</span>)}</div>
                      <div className="portfolio-actions">
                        <Link href={`/case-studies#project-${p.id}`} className="portfolio-case-link">View case study <ArrowUpRight size={15} /></Link>
                        {link && !confidential ? (
                          <a href={link} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Visit Live Site <ExternalLink size={13} /></a>
                        ) : (
                          <Link href="/contact" className="btn btn-outline btn-sm">{confidential ? 'Request Access' : 'Project Details'} <ArrowUpRight size={13} /></Link>
                        )}
                      </div>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGrid>
        </div>
      </section>
    </>
  );
}
