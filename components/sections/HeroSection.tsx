'use client';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown, Briefcase, Clock3, Smile, Globe2 } from 'lucide-react';
import Button from '@/components/ui/Button';
import { useCMS } from '@/lib/CMSContext';

const STATS = [
  { n: '50+', l: 'Projects Delivered', icon: Briefcase },
  { n: '5+', l: 'Years Experience', icon: Clock3 },
  { n: '98%', l: 'Client Satisfaction', icon: Smile },
  { n: '10+', l: 'Industries Served', icon: Globe2 },
];

export default function HeroSection() {
  const { data } = useCMS();
  const lines = data.heroHeadline.split('\n');

  return (
    <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '140px 5% 80px', position: 'relative', overflow: 'hidden' }}>
      <div className="grid-overlay" aria-hidden="true" />
      <div className="glow-blue" aria-hidden="true" style={{ position: 'absolute', top: '-5%', left: '50%', transform: 'translateX(-50%)', width: 800, height: 500, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 880 }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="badge"
          style={{ marginBottom: 24 }}
        >
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--blue)', display: 'inline-block' }} />
          Premium Digital Innovation Studio
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.65 }}
          style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-5xl)', lineHeight: 1.08, letterSpacing: '-.03em', marginBottom: 22 }}
        >
          {lines.map((line, i) => (
            <span key={i}>
              {i > 0 && <br />}
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.6 }}
          style={{ color: 'var(--gray)', fontSize: 'var(--fs-lg)', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.75 }}
        >
          {data.heroSub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.55 }}
          style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <Button href="/contact" variant="primary">Start a Project <ArrowRight size={14} /></Button>
          <Button href="/services" variant="outline">View Services</Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{ display: 'flex', gap: 0, justifyContent: 'center', marginTop: 60, paddingTop: 36, borderTop: '1px solid var(--border)', flexWrap: 'wrap' }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.08 }}
              style={{
                textAlign: 'center', padding: '0 28px',
                borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
              }}
            >
              <s.icon size={16} color="var(--blue)" style={{ marginBottom: 8 }} aria-hidden="true" />
              <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 800, fontSize: 'var(--fs-3xl)', display: 'block' }}>
                {s.n.replace('+', '')}<span style={{ color: 'var(--gold)' }}>{s.n.includes('+') ? '+' : s.n.includes('%') ? '%' : ''}</span>
              </span>
              <span style={{ fontFamily: 'Montserrat,sans-serif', fontSize: '.62rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--gray)', marginTop: 4, display: 'block' }}>
                {s.l}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          style={{ marginTop: 40, display: 'flex', justifyContent: 'center' }}
        >
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.8 }} aria-hidden="true">
            <ChevronDown size={20} color="var(--gray)" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
