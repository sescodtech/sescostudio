'use client';
import { useEffect } from 'react';
import { useCMS } from '@/lib/CMSContext';

/**
 * Applies the admin-uploaded favicon (data.favicon) to the document head.
 * Falls back to the server /icon route when no custom favicon has been uploaded yet.
 */
export default function FaviconSync() {
  const { data } = useCMS();

  useEffect(() => {
    document.querySelectorAll<HTMLLinkElement>("link[rel='icon'], link[rel='shortcut icon'], link[data-sesco-favicon]").forEach(node => node.remove());
    const link = document.createElement('link');
    link.rel = 'icon';
    link.setAttribute('data-sesco-favicon', 'true');
    link.type = data.favicon?.startsWith('data:image/svg+xml') ? 'image/svg+xml' : 'image/png';
    link.href = data.favicon || '/icon';
    document.head.appendChild(link);
    const shortcut = document.createElement('link');
    shortcut.rel = 'shortcut icon';
    shortcut.href = data.favicon || '/icon';
    shortcut.setAttribute('data-sesco-favicon', 'true');
    document.head.appendChild(shortcut);
    const apple = document.createElement('link');
    apple.rel = 'apple-touch-icon';
    apple.href = data.favicon || '/icon';
    apple.setAttribute('data-sesco-favicon', 'true');
    document.head.appendChild(apple);
  }, [data.favicon]);

  return null;
}
