'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Globe2 } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal } from '@/components/ui/Motion';
import { motion, AnimatePresence } from 'framer-motion';
import { getProjectLiveLink } from '@/lib/projectLinks';

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
      <section className="portfolio-hero" style={{ padding: '150px 5% 72px', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" aria-hidden="true" />
        <div className="glow-blue" aria-hidden="true" style={{ position: 'absolute', top: -120, left: '55%', width: 720, height: 520 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: 900 }}>
            <Reveal><p className="section-label">Portfolio</p></Reveal>
            <Reveal delay={0.08}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-5xl)', lineHeight: 1.05, letterSpacing: '-.04em', maxWidth: 820, marginBottom: 22 }}>Digital products built to work.</h1></Reveal>
            <Reveal delay={0.16}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-lg)', lineHeight: 1.8, maxWidth: 680, marginBottom: 30 }}>Explore selected systems, websites, platforms, and digital products delivered by SESCO STUDIO. Every live project below can be opened and inspected.</p></Reveal>
            <Reveal delay={0.24}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                <span className="portfolio-proof"><Globe2 size={14} /> Live project links</span>
                <span className="portfolio-proof">Web · Product · Automation · Growth</span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section-light" style={{ paddingTop: 'clamp(44px,6vw,72px)' }}>
        <div className="container">
          <Reveal>
            <div role="group" aria-label="Filter projects by type" style={{ display: 'flex', gap: 10, justifyContent: 'flex-start', flexWrap: 'wrap', marginBottom: 40 }}>
              {types.map(t => (
                <button key={t} onClick={() => setFilter(t)} aria-pressed={filter === t} className={`portfolio-filter ${filter === t ? 'is-active' : ''}`}>
                  {t === 'all' ? 'All Projects' : t}
                </button>
              ))}
            </div>
          </Reveal>

          <motion.div layout style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(310px,1fr))', gap: 22 }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, index) => {
                const liveLink = getProjectLiveLink(p.title, p.link);
                return (
                  <motion.article key={p.id} layout initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 18 }} transition={{ duration: 0.28 }} className="portfolio-project-card">
                    <div className="portfolio-browser" style={{ background: p.bg }}>
                      <div className="browser-bar">
                        <span /><span /><span />
                        <div className="browser-url">{liveLink ? new URL(liveLink).hostname.replace('www.', '') : 'sesco-studio.com'}</div>
                      </div>
                      <div className="browser-canvas">
                        <div className="browser-grid" aria-hidden="true" />
                        <div className="browser-project-icon" aria-hidden="true">{p.icon}</div>
                        <div className="browser-project-name">{p.title}</div>
                        {liveLink && <span className="live-chip"><span /> Live</span>}
                      </div>
                      <div className="portfolio-number">{String(index + 1).padStart(2, '0')}</div>
                    </div>

                    <div style={{ padding: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginBottom: 9 }}>
                        <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.59rem', fontWeight: 700, letterSpacing: '.13em', textTransform: 'uppercase', color: 'var(--blue)' }}>{p.type}</p>
                        {liveLink && <span className="live-label"><span /> Live</span>}
                      </div>
                      <h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '1.18rem', letterSpacing: '-.015em', marginBottom: 8 }}>{p.title}</h2>
                      <p style={{ color: 'var(--gray)', fontSize: '.88rem', lineHeight: 1.7, marginBottom: 15 }}>{p.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                        {p.tags.slice(0, 5).map(t => <span key={t} className="portfolio-tag">{t}</span>)}
                      </div>
                      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                        {liveLink ? (
                          <a href={liveLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                            Visit Live Site <ExternalLink size={13} />
                          </a>
                        ) : (
                          <span className="portfolio-no-link">Live URL coming soon</span>
                        )}
                        <Link href="/case-studies" className="btn btn-outline btn-sm">Case Study <ArrowRight size={13} /></Link>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="section portfolio-cta">
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <Reveal><p className="section-label centered">Your Turn</p></Reveal>
          <Reveal delay={0.1}><h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-4xl)', letterSpacing: '-.03em', maxWidth: 720, margin: '0 auto 16px' }}>Let&apos;s build a system your business can actually use.</h2></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', maxWidth: 560, margin: '0 auto 30px', lineHeight: 1.8 }}>Tell us what you are trying to improve. We&apos;ll help turn the idea into a polished, functional digital product.</p></Reveal>
          <Reveal delay={0.3}><Link href="/contact" className="btn btn-primary">Start a Project <ArrowRight size={14} /></Link></Reveal>
        </div>
      </section>
    </>
  );
}
