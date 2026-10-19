'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
                  <article className="portfolio-project-card">
                    <div className="portfolio-browser-frame">
                      <div className="portfolio-browser-bar">
                        <span className="portfolio-browser-dot" />
                        <span className="portfolio-browser-dot" />
                        <span className="portfolio-browser-dot" />
                        <div className="portfolio-browser-address">{p.link ? p.link.replace(/^https?:\/\//, '').replace(/\/$/, '') : 'Website preview'}</div>
                      </div>
                      <div className="portfolio-project-preview portfolio-scroll-preview">
                        {p.preview ? (
                          <img src={p.preview} alt={`${p.title} website screenshot`} loading="lazy" />
                        ) : (
                          <div className="portfolio-preview-placeholder">
                            <strong>Website Preview</strong>
                            <small>Project screenshot will appear here</small>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="portfolio-project-body">
                      <div className="portfolio-project-meta">
                        <span className="portfolio-project-type">{p.type}</span>
                        <span className="portfolio-result">{p.results}</span>
                      </div>
                      <h3>{p.title}</h3>
                      <p className="portfolio-project-desc">{p.desc}</p>
                      <div className="portfolio-tech-list">
                        {p.tags.map(t => <span key={t} className="portfolio-tech">{t}</span>)}
                      </div>
                      <div className="portfolio-actions">
                        {p.link && <a href={p.link} target="_blank" rel="noopener noreferrer" className="portfolio-visit-btn">View Live Site <ArrowRight size={13} /></a>}
                        <Link href={`/case-studies/${p.id}`} className="portfolio-case-btn">Case Study <ArrowRight size={13} /></Link>
                      </div>
                    </div>
                  </article>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
          <p className="portfolio-curation-note">This portfolio is a selection of our work. Additional websites, digital products and custom business systems are not included in this public showcase.</p>
      </section>
    </>
  );
}
