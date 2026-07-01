'use client';
import { useState, useMemo } from 'react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';

export default function BlogPage() {
  const { data } = useCMS();
  const [cat, setCat] = useState('all');
  const published = data.blogPosts.filter(p => p.status === 'published');
  const cats = useMemo(() => ['all', ...Array.from(new Set(published.map(p => p.cat)))], [published]);
  const filtered = cat === 'all' ? published : published.filter(p => p.cat === cat);

  return (
    <>
      <section style={{ padding: '160px 5% 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><p className="section-label centered">Insights</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(2.2rem,5vw,3.8rem)', letterSpacing: '-.025em', marginBottom: 20 }}>The SESCO Blog</h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: '1.05rem', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>Thoughts on technology, design systems, AI automation, and building digital businesses in the modern era.</p></Reveal>
        </div>
      </section>

      <section style={{ padding: '20px 5% 110px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
              {cats.map(c => (
                <button key={c} onClick={() => setCat(c)} style={{
                  padding: '8px 18px', borderRadius: 100, fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer',
                  background: cat === c ? 'var(--blue)' : 'transparent', color: cat === c ? '#fff' : 'var(--gray)',
                  border: `1px solid ${cat === c ? 'var(--blue)' : 'var(--border)'}`, transition: 'all .2s',
                }}>{c === 'all' ? 'All Posts' : c}</button>
              ))}
            </div>
          </Reveal>

          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
            {filtered.map(p => (
              <StaggerItem key={p.id}>
                <div style={{ background: 'var(--navy3)', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', cursor: 'pointer', transition: 'transform .3s,border-color .3s', height: '100%' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'; (e.currentTarget as HTMLElement).style.borderColor = 'rgba(47,107,255,.3)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; }}>
                  <div style={{ aspectRatio: '16/9', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>{p.icon}</div>
                  <div style={{ padding: 22 }}>
                    <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 8 }}>{p.cat}</p>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 8, lineHeight: 1.4 }}>{p.title}</h3>
                    <p style={{ color: 'var(--gray)', fontSize: '.85rem', lineHeight: 1.65, marginBottom: 14 }}>{p.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '.75rem', color: 'var(--gray2)' }}>
                      <span>{p.date}</span><span>·</span><span>{p.readTime || '5 min read'}</span>
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
