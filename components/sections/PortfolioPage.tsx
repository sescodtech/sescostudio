'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, LockKeyhole } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal } from '@/components/ui/Motion';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioPage() {
  const { data } = useCMS();
  const [filter, setFilter] = useState('all');

  const types = useMemo(() => {
    const unique = Array.from(new Set(data.projects.map(p => p.type)));
    return ['all', ...unique];
  }, [data.projects]);

  const filtered = filter === 'all' ? data.projects : data.projects.filter(p => p.type === filter);

  return (
    <>
      <section style={{ padding: '160px 5% 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" aria-hidden="true" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><p className="section-label centered">Our Work</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-5xl)', letterSpacing: '-.025em', marginBottom: 20 }}>Selected Projects</h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-lg)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>Real systems, real results. A showcase of digital products we&apos;ve built for businesses that chose to invest in quality.</p></Reveal>
        </div>
      </section>

      <section className="section section-light" style={{ paddingTop: 'clamp(16px,3vw,24px)' }}>
        <div className="container">
          <Reveal>
            <div role="group" aria-label="Filter projects by type" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  aria-pressed={filter === t}
                  style={{
                    padding: '8px 18px', borderRadius: 100, fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer',
                    background: filter === t ? 'var(--blue)' : 'transparent',
                    color: filter === t ? '#fff' : 'var(--gray)',
                    border: `1px solid ${filter === t ? 'var(--blue)' : 'var(--border)'}`,
                  }}
                >
                  {t === 'all' ? 'All' : t}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 20 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map(p => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="card card-hover" style={{ overflow: 'hidden' }}>
                    <div style={{ aspectRatio: '4/3', background: p.bg, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                      <span aria-hidden="true">{p.icon}</span>
                      <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(11,15,26,.85)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderRadius: 100, padding: '3px 10px', fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)' }}>{p.type}</div>
                    </div>
                    <div style={{ padding: 20 }}>
                      <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{p.type}</p>
                      <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>{p.title}</h3>
                      <p style={{ color: 'var(--blue)', fontSize: '.85rem', marginBottom: 10 }}>{p.results}</p>
                      <div style={{ marginBottom: 14 }}><span className="badge" style={{ color: p.accessType === 'nda' || p.accessType === 'private' ? 'var(--gold)' : p.accessType === 'client' ? 'var(--blue)' : '#16a34a', borderColor: p.accessType === 'nda' || p.accessType === 'private' ? 'rgba(200,162,74,.28)' : undefined }}>{p.accessLabel || (p.accessType === 'nda' ? 'NDA / Confidential' : p.accessType === 'client' ? 'Client application' : p.accessType === 'private' ? 'Private project' : 'Live project')}</span></div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
                        {p.tags.map(t => <span key={t} className="badge">{t}</span>)}
                      </div>
                      <div style={{ display:'flex', gap:14, alignItems:'center', flexWrap:'wrap' }}>
                        <Link href="/case-studies" className="learn-more-link btn btn-ghost" style={{ padding: 0 }}>View Case Study <ArrowRight size={12} /></Link>
                        {p.link && p.accessType !== 'nda' && p.accessType !== 'private' ? <a href={p.link} target="_blank" rel="noopener noreferrer" className="learn-more-link btn btn-ghost" style={{ padding:0 }}>Open {p.accessType === 'client' ? 'Portal' : 'Live Site'} <ExternalLink size={12}/></a> : <span style={{fontSize:'.7rem',color:'var(--gray)',display:'inline-flex',alignItems:'center',gap:5}}><LockKeyhole size={12}/> Access restricted</span>}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </>
  );
}
