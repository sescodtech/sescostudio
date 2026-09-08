'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import LogoMark from '@/components/ui/LogoMark';
import { useCMS } from '@/lib/CMSContext';

export default function Navbar() {
  const { data } = useCMS();
  const LINKS = data.navigation.links;
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <>
      <nav
        aria-label="Primary"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 5%',
          background: scrolled ? 'rgba(8,20,38,.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(167,176,192,.1)' : '1px solid transparent',
          transition: 'background .4s var(--ease), backdrop-filter .4s var(--ease), border-color .4s var(--ease)',
        }}
      >
        <Link href="/" aria-label="SESCO STUDIO Home">
          <LogoMark size="md" showWordmark />
        </Link>

        <ul style={{ alignItems: 'center', gap: 32, listStyle: 'none' }} className="hidden md:flex">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={pathname === l.href ? 'page' : undefined}
                className="nav-link"
                style={{
                  fontFamily: 'Montserrat,sans-serif',
                  fontSize: '.68rem',
                  fontWeight: 600,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: pathname === l.href ? '#fff' : 'var(--gray)',
                  textDecoration: 'none',
                  position: 'relative',
                  paddingBottom: 4,
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link href="/contact" className="btn btn-primary btn-sm">
              {data.navigation.ctaLabel}
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(o => !o)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        id="mobile-nav-menu"
        style={{
          position: 'fixed', inset: 0, zIndex: 199,
          background: 'rgba(8,20,38,.98)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transition: 'opacity .3s var(--ease)',
        }}
      >
        {[...LINKS, { href: '/contact', label: 'Contact' }].map((l, i) => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMobileOpen(false)}
            aria-current={pathname === l.href ? 'page' : undefined}
            style={{
              fontFamily: 'Plus Jakarta Sans,sans-serif',
              fontWeight: 700,
              fontSize: '2rem',
              color: pathname === l.href ? 'var(--blue)' : '#fff',
              textDecoration: 'none',
              transition: `color .2s var(--ease), opacity .3s var(--ease) ${i * 0.04}s, transform .3s var(--ease) ${i * 0.04}s`,
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(10px)',
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
