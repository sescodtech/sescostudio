'use client';
import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { useCMS } from '@/lib/CMSContext';

/**
 * Persistent floating WhatsApp contact button.
 * Hidden on /admin (no reason to chat-with-us inside the CMS) and while the
 * site is in maintenance mode (nothing to talk about yet).
 */
export default function FloatingWhatsApp() {
  const { data } = useCMS();
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) return null;
  if (data.siteSettings.maintenanceMode) return null;

  const raw = data.contact.whatsapp;
  if (!raw) return null;

  const digits = raw.replace(/[^\d]/g, '');
  if (!digits) return null;

  const message = encodeURIComponent("Hi SESCO STUDIO, I'd like to talk about a project.");
  const href = `https://wa.me/${digits}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with SESCO STUDIO on WhatsApp"
      className="floating-whatsapp-btn"
    >
      <MessageCircle size={26} strokeWidth={2} fill="#fff" color="#25D366" aria-hidden="true" />
    </a>
  );
}
