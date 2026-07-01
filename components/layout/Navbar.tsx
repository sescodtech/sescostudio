'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import LogoMark from '@/components/ui/LogoMark';

const LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/blog', label: 'Blog' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
          height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 5%',
          background: scrolled ? 'rgba(11,15,26,.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(167,176,192,.1)' : '1px solid transparent',
          transition: 'background .4s, backdrop-filter .4s, border-color .4s',
        }}
      >
        <Link href="/" aria-label="SESCO STUDIO Home">
          <LogoMark size="md" showWordmark />
        </Link>

        {/* Desktop links */}
        <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none' }} className="hidden md:flex">
          {LINKS.map(l => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{
                  fontFamily: 'Montserrat,sans-serif',
                  fontSize: '.68rem',
                  fontWeight: 600,
                  letterSpacing: '.1em',
                  textTransform: 'uppercase',
                  color: pathname === l.href ? '#fff' : '#A7B0C0',
                  transition: 'color .2s',
                  textDecoration: 'none',
                }}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/contact"
              style={{
                fontFamily: 'Montserrat,sans-serif',
                fontSize: '.68rem',
                fontWeight: 600,
                letterSpacing: '.1em',
                textTransform: 'uppercase',
                background: '#2F6BFF',
                color: '#fff',
                padding: '9px 20px',
                borderRadius: 7,
                textDecoration: 'none',
                transition: 'opacity .2s, transform .2s',
                display: 'inline-block',
              }}
              onMouseEnter={e => { (e.target as HTMLElement).style.opacity = '.85'; }}
              onMouseLeave={e => { (e.target as HTMLElement).style.opacity = '1'; }}
            >
              Start a Project
            </Link>
          </li>
        </ul>

        {/* Hamburger */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(o => !o)}
          style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <div
        style={{
          position: 'fixed', inset: 0, zIndex: 199,
          background: 'rgba(11,15,26,.97)',
          backdropFilter: 'blur(20px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 28,
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? 'all' : 'none',
          transition: 'opacity .25s',
        }}
      >
        {[...LINKS, { href: '/contact', label: 'Contact' }].map(l => (
          <Link
            key={l.href}
            href={l.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: 'Plus Jakarta Sans,sans-serif',
              fontWeight: 700,
              fontSize: '2rem',
              color: pathname === l.href ? '#2F6BFF' : '#fff',
              textDecoration: 'none',
              transition: 'color .2s',
            }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </>
  );
}
