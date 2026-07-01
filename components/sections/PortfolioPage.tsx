'use client';
import { useState, useMemo } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';
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
      {/* Hero */}
      <section style={{ padding: '160px 5% 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><p className="section-label centered">Our Work</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.8rem)', letterSpacing: '-.025em', marginBottom: 20 }}>Selected Projects</h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>Real systems, real results. A showcase of digital products we've built for businesses that chose to invest in quality.</p></Reveal>
        </div>
      </section>

      <section style={{ padding: '20px 5% 110px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Filters */}
          <Reveal>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setFilter(t)}
                  style={{
                    padding: '8px 18px', borderRadius: 100, fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer',
                    background: filter === t ? 'var(--blue)' : 'transparent',
                    color: filter === t ? '#fff' : 'var(--gray)',
                    border: `1px solid ${filter === t ? 'var(--blue)' : 'var(--border)'}`,
                    transition: 'background .2s,color .2s,border-color .2s',
                  }}
                >
                  {t === 'all' ? 'All' : t}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Grid */}
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
                  <div style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', cursor: 'default', transition: 'transform .3s,border-color .3s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,107,255,.3)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}>
                    <div style={{ aspectRatio: '4/3', background: p.bg, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                      {p.icon}
                      <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(11,15,26,.85)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderRadius: 100, padding: '3px 10px', fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)' }}>{p.type}</div>
                    </div>
                    <div style={{ padding: 20 }}>
                      <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 8 }}>{p.type}</p>
                      <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 6 }}>{p.title}</h3>
                      <p style={{ color: 'var(--blue)', fontSize: '.85rem', marginBottom: 10 }}>{p.results}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                        {p.tags.map(t => (
                          <span key={t} style={{ background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.2)', borderRadius: 100, padding: '2px 9px', fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--blue)' }}>{t}</span>
                        ))}
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
