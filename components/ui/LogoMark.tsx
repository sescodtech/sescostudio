'use client';
import { useCMS } from '@/lib/CMSContext';

interface LogoMarkProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
}

const sizes = {
  sm:  { svg: 30, textSize: '9', r1: 14, r2: 9, r3: 6.5, fontSize: '0.9rem' },
  md:  { svg: 38, textSize: '11', r1: 17, r2: 11, r3: 8,  fontSize: '1rem' },
  lg:  { svg: 64, textSize: '18', r1: 30, r2: 20, r3: 14, fontSize: '1.1rem' },
  xl:  { svg: 96, textSize: '27', r1: 46, r2: 36, r3: 27, fontSize: '1.1rem' },
};

export default function LogoMark({ size = 'md', showWordmark = true, className = '' }: LogoMarkProps) {
  const { data } = useCMS();
  const s = sizes[size];
  const cx = s.svg / 2;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {data.logo ? (
        <img src={data.logo} alt="SESCO STUDIO" style={{ height: s.svg, width: 'auto', objectFit: 'contain' }} />
      ) : (
        <svg width={s.svg} height={s.svg} viewBox={`0 0 ${s.svg} ${s.svg}`} fill="none">
          <circle cx={cx} cy={cx} r={s.r1} stroke="#2F6BFF" strokeWidth="2"/>
          {size === 'xl' && (
            <>
              <circle cx={cx} cy={cx} r={s.r2} stroke="#C8A24A" strokeWidth=".9" strokeDasharray="4 3" opacity=".7"/>
              <circle cx={cx} cy={cx} r={s.r3} fill="#0B0F1A" stroke="rgba(47,107,255,.2)" strokeWidth="1"/>
              <text x={cx} y={cx + 8} textAnchor="middle" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="800" fontSize={s.textSize} fill="#fff" letterSpacing="-1">SS</text>
              <text x={cx} y={cx + 22} textAnchor="middle" fontFamily="Montserrat,sans-serif" fontWeight="700" fontSize="5.5" fill="#C8A24A" letterSpacing="3.5">STUDIO</text>
            </>
          )}
          {size !== 'xl' && (
            <>
              <circle cx={cx} cy={cx} r={s.r2} stroke="#C8A24A" strokeWidth=".8" strokeDasharray="3 2"/>
              <text x={cx} y={cx + 4} textAnchor="middle" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="800" fontSize={s.textSize} fill="#fff">SS</text>
            </>
          )}
        </svg>
      )}
      {showWordmark && (
        <span style={{ fontFamily: 'Plus Jakarta Sans,sans-serif', fontWeight: 700, fontSize: s.fontSize, letterSpacing: '.02em' }}>
          SESCO <span style={{ color: '#2F6BFF' }}>STUDIO</span>
        </span>
      )}
    </div>
  );
}
