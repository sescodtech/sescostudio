'use client';
import { useEffect, useRef } from 'react';

export default function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let W = 0, H = 0, raf = 0;
    const particles: Array<{ x: number; y: number; r: number; vx: number; vy: number; alpha: number; color: string }> = [];

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    const reset = (p: typeof particles[0]) => {
      p.x = Math.random() * W;
      p.y = Math.random() * H;
      p.r = Math.random() * 1.3 + 0.3;
      p.vx = (Math.random() - 0.5) * 0.22;
      p.vy = (Math.random() - 0.5) * 0.22;
      p.alpha = Math.random() * 0.5 + 0.1;
      p.color = Math.random() > 0.72 ? '#C9A227' : '#2F6BFF';
    };

    for (let i = 0; i < 70; i++) {
      const p = { x: 0, y: 0, r: 0, vx: 0, vy: 0, alpha: 0, color: '' };
      reset(p);
      particles.push(p);
    }

    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.save();
            ctx.globalAlpha = (1 - d / 110) * 0.1;
            ctx.strokeStyle = '#2F6BFF';
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
            ctx.restore();
          }
        }
      }
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W || p.y < 0 || p.y > H) reset(p);
        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', opacity: 0.38 }}
      aria-hidden="true"
    />
  );
}
