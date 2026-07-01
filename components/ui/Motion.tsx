'use client';
import { motion, useInView } from 'framer-motion';
import { useRef, type ReactElement } from 'react';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Reveal({ children, delay = 0, className = '', style }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function RevealLeft({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function RevealRight({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay, ease: [0.4, 0, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function ScaleIn({ children, delay = 0, className = '' }: RevealProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-30px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, scale: 0.92 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerGrid({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      style={style}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = '', style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } } }}
    >
      {children}
    </motion.div>
  );
}

export function MetricBar({ width, gold = false }: { width: number; gold?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} style={{ background: 'rgba(255,255,255,.05)', borderRadius: 4, height: 5, overflow: 'hidden' }}>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1] }}
        style={{
          height: '100%', borderRadius: 4, transformOrigin: 'left',
          background: gold ? 'linear-gradient(90deg,#C8A24A,#2F6BFF)' : 'linear-gradient(90deg,#2F6BFF,#C8A24A)',
          width: `${width}%`,
        }}
      />
    </div>
  );
}
