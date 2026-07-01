'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import LogoMark from '@/components/ui/LogoMark';
import { useCMS } from '@/lib/CMSContext';

const STATS = [
  { n: '50+', l: 'Projects Delivered' },
  { n: '5+', l: 'Years Experience' },
  { n: '98%', l: 'Client Satisfaction' },
  { n: '10+', l: 'Industries Served' },
];

export default function HeroSection() {
  const { data } = useCMS();
  const lines = data.heroHeadline.split('\n');

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 5% 80px', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-overlay" />
      {/* Glow */}
      <div className="glow-blue" style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 500, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="animate-float"
          style={{ marginBottom: 36, display: 'inline-block', filter: 'drop-shadow(0 0 24px rgba(47,107,255,.5))' }}
        >
          <LogoMark size="xl" showWordmark={false} />
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(47,107,255,.12)', border: '1px solid rgba(47,107,255,.3)', borderRadius: 100, padding: '5px 16px', marginBottom: 24, fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--blue)' }}
        >
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} />
          Premium Digital Innovation Studio
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.65 }}
          style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'clamp(2.4rem,5.5vw,4.4rem)', lineHeight: 1.1, letterSpacing: '-.025em', marginBottom: 22 }}
        >
          {lines.map((line, i) => (
            <span key={i}>
              {i === 0 ? (
                <>Building <span style={{ color: 'var(--blue)' }}>Digital Systems</span>
                </>
              ) : (
                <><br />for <span style={{ color: 'var(--gold)' }}>Modern Businesses</span></>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{ color: 'var(--gray)', fontSize: 'clamp(.95rem,1.6vw,1.12rem)', maxWidth: 540, margin: '0 auto 40px', lineHeight: 1.75 }}
        >
          {data.heroSub}
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.55 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'var(--blue)', color: '#fff', padding: '13px 28px', borderRadius: 8, fontFamily: 'Montserrat,sans-serif', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', transition: 'transform .2s,box-shadow .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 30px rgba(47,107,255,.4)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ''; (e.currentTarget as HTMLElement).style.boxShadow = ''; }}>
            Start a Project <ArrowRight size={14} />
          </Link>
          <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '13px 28px', borderRadius: 8, fontFamily: 'Montserrat,sans-serif', fontSize: '.72rem', fontWeight: 600, letterSpacing: '.08em', textTransform: 'uppercase', textDecoration: 'none', border: '1px solid rgba(167,176,192,.15)', transition: 'border-color .2s,transform .2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--blue)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,176,192,.15)'; (e.currentTarget as HTMLElement).style.transform = ''; }}>
            View Services
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 60, paddingTop: 40, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}
        >
          {STATS.map((s, i) => (
            <motion.div key={s.l} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 + i * 0.1 }} style={{ textAlign: 'center' }}>
              <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: '2rem', display: 'block' }}>
                {s.n.replace('+', '')}<span style={{ color: 'var(--blue)' }}>{s.n.includes('+') ? '+' : s.n.includes('%') ? '%' : ''}</span>
              </span>
              <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginTop: 4, display: 'block' }}>
                {s.l}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }}>
            <ChevronDown size={20} color="var(--gray)" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
