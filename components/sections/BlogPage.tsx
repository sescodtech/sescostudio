'use client';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';
import { Reveal, StaggerGrid, StaggerItem } from '@/components/ui/Motion';

export default function BlogPage() {
  const { data } = useCMS();
  const [cat, setCat] = useState('all');
  const published = data.blogPosts.filter(p => p.status === 'published');
  const cats = useMemo(() => ['all', ...Array.from(new Set(published.map(p => p.cat)))], [published]);
  const filtered = cat === 'all' ? published : published.filter(p => p.cat === cat);
  const [featured, ...rest] = filtered;

  return (
    <>
      <section style={{ padding: '160px 5% 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div className="grid-overlay" aria-hidden="true" />
        <div style={{ position: 'relative', zIndex: 2 }}>
          <Reveal><p className="section-label centered">Insights</p></Reveal>
          <Reveal delay={0.1}><h1 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-5xl)', letterSpacing: '-.025em', marginBottom: 20 }}>The SESCO Blog</h1></Reveal>
          <Reveal delay={0.2}><p style={{ color: 'var(--gray)', fontSize: 'var(--fs-lg)', lineHeight: 1.8, maxWidth: 540, margin: '0 auto' }}>Thoughts on technology, design systems, AI automation, and building digital businesses in the modern era.</p></Reveal>
        </div>
      </section>

      <section className="section section-light" style={{ paddingTop: 'clamp(16px,3vw,24px)' }}>
        <div className="container">
          <Reveal>
            <div role="group" aria-label="Filter posts by category" style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
              {cats.map(c => (
                <button key={c} onClick={() => setCat(c)} aria-pressed={cat === c} style={{
                  padding: '8px 18px', borderRadius: 100, fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', cursor: 'pointer',
                  background: cat === c ? 'var(--blue)' : 'transparent', color: cat === c ? '#fff' : 'var(--gray)',
                  border: `1px solid ${cat === c ? 'var(--blue)' : 'var(--border)'}`,
                }}>{c === 'all' ? 'All Posts' : c}</button>
              ))}
            </div>
          </Reveal>

          {featured && (
            <Reveal>
              <div className="card card-hover blog-featured-card" style={{ overflow: 'hidden', marginBottom: 32, display: 'grid' }}>
                <div style={{ padding: 'clamp(28px,4vw,44px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span className="badge badge-gold" style={{ alignSelf: 'flex-start', marginBottom: 14 }}>Featured</span>
                  <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.6rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 10 }}>{featured.cat}</p>
                  <h2 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-2xl)', marginBottom: 12, lineHeight: 1.3 }}>{featured.title}</h2>
                  <p style={{ color: 'var(--gray)', fontSize: '.92rem', lineHeight: 1.7, marginBottom: 16 }}>{featured.excerpt}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '.78rem', color: 'var(--gray2)', marginBottom: 18 }}>
                    <span>{featured.date}</span><span aria-hidden="true">·</span><span>{featured.readTime || '5 min read'}</span>
                  </div>
                  <Link href={`/blog/${featured.id}`} className="learn-more-link btn btn-ghost" style={{ padding: 0, alignSelf: 'flex-start' }}>Read Article <ArrowRight size={12} /></Link>
                </div>
                <div style={{ background: featured.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', minHeight: 220 }}>
                  <span aria-hidden="true">{featured.icon}</span>
                </div>
              </div>
            </Reveal>
          )}

          <StaggerGrid style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: 24 }}>
            {rest.map(p => (
              <StaggerItem key={p.id}>
                <div className="card card-hover" style={{ overflow: 'hidden', height: '100%' }}>
                  <div style={{ aspectRatio: '16/9', background: p.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}><span aria-hidden="true">{p.icon}</span></div>
                  <div style={{ padding: 22 }}>
                    <p style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.58rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)', marginBottom: 8 }}>{p.cat}</p>
                    <h3 style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: '1rem', marginBottom: 8, lineHeight: 1.4 }}>{p.title}</h3>
                    <p style={{ color: 'var(--gray)', fontSize: '.85rem', lineHeight: 1.65, marginBottom: 14 }}>{p.excerpt}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '.75rem', color: 'var(--gray2)', marginBottom: 14 }}>
                      <span>{p.date}</span><span aria-hidden="true">·</span><span>{p.readTime || '5 min read'}</span>
                    </div>
                    <Link href={`/blog/${p.id}`} className="learn-more-link btn btn-ghost" style={{ padding: 0 }}>Read Article <ArrowRight size={12} /></Link>
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
