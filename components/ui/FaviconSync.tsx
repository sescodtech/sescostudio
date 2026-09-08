'use client';
import { useEffect } from 'react';
import { useCMS } from '@/lib/CMSContext';

/**
 * Applies the admin-uploaded favicon (data.favicon) to the document head.
 * Falls back to the static /favicon.ico shipped in app/ when no custom
 * favicon has been uploaded yet. Renders nothing.
 */
export default function FaviconSync() {
  const { data } = useCMS();

  useEffect(() => {
    let link = document.querySelector<HTMLLinkElement>("link[rel='icon']");
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = data.favicon || '/favicon.ico';
  }, [data.favicon]);

  return null;
}
